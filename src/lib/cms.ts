import { queryOptions, useQuery } from "@tanstack/react-query";
import { getSiteContent } from "./cms.functions";
import type { Lang } from "./i18n";
import type { Tables } from "@/integrations/supabase/types";

export type SectionRow = Tables<"sections">;
export type ServiceRow = Tables<"services">;
export type SectorRow = Tables<"sectors">;
export type ReferenceRow = Tables<"client_references">;
export type NavRow = Tables<"nav_items">;
export type FormationRow = Tables<"formations">;

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 60_000,
});

export function useSiteContent() {
  const { data } = useQuery(siteContentQuery);
  return data;
}

export function useSection(page: string, blockKey: string) {
  const content = useSiteContent();
  return content?.sections.find((s) => s.page === page && s.block_key === blockKey);
}

/** Bilingual field picker: falls back to French when the English value is empty. */
export function pick(lang: Lang, fr?: string | null, en?: string | null): string {
  if (lang === "en") return (en && en.trim()) || fr || "";
  return fr || en || "";
}

export function pickLocalized<T extends Record<string, unknown>>(
  lang: Lang,
  obj: T | undefined | null,
  base: string,
): string {
  if (!obj) return "";
  const fr = obj[`${base}_fr`] as string | undefined;
  const en = obj[`${base}_en`] as string | undefined;
  return pick(lang, fr, en);
}

export function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export type CompanySettings = {
  name?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  location_fr?: string;
  location_en?: string;
  hours_fr?: string;
  hours_en?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  map_embed?: string;
};

export function useCompany(): CompanySettings {
  const content = useSiteContent();
  return (content?.settings?.company ?? {}) as CompanySettings;
}

export function useSettings(key: string): Record<string, unknown> {
  const content = useSiteContent();
  return (content?.settings?.[key] ?? {}) as Record<string, unknown>;
}

export function useNav(location: string, group?: string) {
  const content = useSiteContent();
  return (content?.nav ?? []).filter(
    (n) => n.location === location && (group ? n.group_key === group : true),
  );
}

export const SITE_URL = "https://at-safety-guardian.lovable.app";
