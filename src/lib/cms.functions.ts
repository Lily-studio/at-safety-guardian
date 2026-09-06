import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/integrations/supabase/types";
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

const EMPTY_CONTENT = {
  settings: {} as Record<string, Json>,
  nav: [] as never[],
  sections: [] as never[],
  formations: [] as never[],
  services: [] as never[],
  sectors: [] as never[],
  references: [] as never[],
  seo: [] as never[],
};


export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const [settings, nav, sections, formations, services, sectors, references, seo] = await Promise.all([
    sb.from("site_settings").select("key,value"),
    sb.from("nav_items").select("*").order("sort_order"),
    sb.from("sections").select("*").order("sort_order"),
    sb
      .from("formations")
      .select("id,slug,title_fr,title_en,description_fr,description_en,extra_sections,image_url,sort_order")
      .order("sort_order"),
    sb.from("services").select("*").order("sort_order"),
    sb.from("sectors").select("*").order("sort_order"),
    sb.from("client_references").select("*").order("sort_order"),
    sb.from("seo_pages").select("*"),
  ]);

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
});

export const getFormation = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug) }))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: row } = await sb
      .from("formations")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .eq("visible", true)
      .maybeSingle();
    return row ?? null;
  });

export const getPublicFormationSlugs = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data } = await sb
    .from("formations")
    .select("slug,updated_at")
    .eq("status", "published")
    .eq("visible", true)
    .order("sort_order");
  return data ?? [];
});

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
    const sb = publicClient();
    const { error } = await sb.from("leads").insert(data);
    if (error) {
      console.error("submitLead failed", error);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
