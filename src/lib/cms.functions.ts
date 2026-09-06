import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database, Json, Tables } from "@/integrations/supabase/types";
import { supabasePublishableKey, supabaseUrl } from "./runtime-env";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

/** New Supabase API keys are opaque strings, not bearer JWTs. */
function supabaseFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, name) => headers.set(name, value));
    }
    if (isNewSupabaseApiKey(key) && headers.get("Authorization") === `Bearer ${key}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}

function publicClient() {
  const url = supabaseUrl();
  const key = supabasePublishableKey();
  if (!url || !key) {
    throw new Error("Missing Supabase configuration (SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY)");
  }
  return createClient<Database>(url, key, {
    global: { fetch: supabaseFetch(key) },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

type FormationCard = Pick<
  Tables<"formations">,
  | "id"
  | "slug"
  | "title_fr"
  | "title_en"
  | "description_fr"
  | "description_en"
  | "extra_sections"
  | "image_url"
  | "sort_order"
>;

export type SiteContentPayload = {
  settings: Record<string, Json>;
  nav: Tables<"nav_items">[];
  sections: Tables<"sections">[];
  formations: FormationCard[];
  services: Tables<"services">[];
  sectors: Tables<"sectors">[];
  references: Tables<"client_references">[];
  seo: Tables<"seo_pages">[];
};

const EMPTY_CONTENT: SiteContentPayload = {
  settings: {},
  nav: [],
  sections: [],
  formations: [],
  services: [],
  sectors: [],
  references: [],
  seo: [],
};

export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContentPayload> => {
    try {
      const sb = publicClient();
      const [settings, nav, sections, formations, services, sectors, references, seo] =
        await Promise.all([
          sb.from("site_settings").select("key,value"),
          sb.from("nav_items").select("*").order("sort_order"),
          sb.from("sections").select("*").order("sort_order"),
          sb
            .from("formations")
            .select(
              "id,slug,title_fr,title_en,description_fr,description_en,extra_sections,image_url,sort_order",
            )
            .order("sort_order"),
          sb.from("services").select("*").order("sort_order"),
          sb.from("sectors").select("*").order("sort_order"),
          sb.from("client_references").select("*").order("sort_order"),
          sb.from("seo_pages").select("*"),
        ]);

      for (const result of [settings, nav, sections, formations, services, sectors, references, seo]) {
        if (result.error) console.error("getSiteContent query failed", result.error);
      }

      const settingsMap: Record<string, Json> = {};
      for (const row of settings.data ?? []) {
        settingsMap[row.key] = row.value ?? {};
      }

      return {
        settings: settingsMap,
        nav: nav.data ?? [],
        sections: sections.data ?? [],
        formations: formations.data ?? [],
        services: services.data ?? [],
        sectors: sectors.data ?? [],
        references: references.data ?? [],
        seo: seo.data ?? [],
      };
    } catch (error) {
      // Never let a backend hiccup take the whole page down — components fall
      // back to their built-in French/English content.
      console.error("getSiteContent failed", error);
      return EMPTY_CONTENT;
    }
  },
);



export const getFormation = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug) }))
  .handler(async ({ data }): Promise<Tables<"formations"> | null> => {
    try {
      const sb = publicClient();
      const { data: row, error } = await sb
        .from("formations")
        .select("*")
        .eq("slug", data.slug)
        .eq("status", "published")
        .eq("visible", true)
        .maybeSingle();
      if (error) console.error("getFormation failed", error);
      return row ?? null;
    } catch (error) {
      console.error("getFormation failed", error);
      return null;
    }
  });

export const getPublicFormationSlugs = createServerFn({ method: "GET" }).handler(
  async (): Promise<Array<{ slug: string; updated_at: string | null }>> => {
    try {
      const sb = publicClient();
      const { data } = await sb
        .from("formations")
        .select("slug,updated_at")
        .eq("status", "published")
        .eq("visible", true)
        .order("sort_order");
      return data ?? [];
    } catch (error) {
      console.error("getPublicFormationSlugs failed", error);
      return [];
    }
  },
);

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: Record<string, unknown>) => {
    const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
    const name = str(data.name, 100);
    const email = str(data.email, 255);
    if (name.length < 2) throw new Error("invalid_name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("invalid_email");
    return {
      name,
      email,
      company: str(data.company, 120),
      phone: str(data.phone, 30),
      subject: str(data.subject, 150),
      message: str(data.message, 2000),
      form_type: str(data.form_type, 40) || "contact",
    };
  })
  .handler(async ({ data }) => {
    try {
      const sb = publicClient();
      const { error } = await sb.from("leads").insert(data);
      if (error) {
        console.error("submitLead failed", error);
        return { ok: false as const };
      }
      return { ok: true as const };
    } catch (error) {
      console.error("submitLead failed", error);
      return { ok: false as const };
    }
  });
