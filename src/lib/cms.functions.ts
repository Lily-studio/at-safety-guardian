import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

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

  const settingsMap: Record<string, Record<string, unknown>> = {};
  for (const row of settings.data ?? []) {
    settingsMap[row.key] = (row.value ?? {}) as Record<string, unknown>;
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
      .maybeSingle();
    return row ?? null;
  });

export const getPublicFormationSlugs = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data } = await sb.from("formations").select("slug,updated_at").order("sort_order");
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
    if (error) return { ok: false as const };
    return { ok: true as const };
  });
