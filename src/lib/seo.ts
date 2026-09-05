import { siteContentQuery } from "./cms";
import type { QueryClient } from "@tanstack/react-query";
import type { Tables } from "@/integrations/supabase/types";

export const SITE_URL = "https://at-safety-guardian.lovable.app";

export type SeoRow = Tables<"seo_pages">;

/** Route loader helper: resolves the CMS-managed SEO record for a page path. */
export async function loadSeo(queryClient: QueryClient, path: string) {
  const content = await queryClient.ensureQueryData(siteContentQuery);
  const seo = content.seo.find((p) => p.path === path) ?? null;
  return { seo };
}

type Fallback = { title: string; description: string; ogType?: string };

export function buildHead(path: string, seo: SeoRow | null | undefined, fallback: Fallback) {
  const title = seo?.title || fallback.title;
  const description = seo?.description || fallback.description;
  const canonical = seo?.canonical || `${SITE_URL}${path}`;
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: seo?.og_title || title },
    { property: "og:description", content: seo?.og_description || description },
    { property: "og:type", content: fallback.ogType ?? "website" },
    { property: "og:url", content: canonical },
    { name: "twitter:card", content: "summary_large_image" },
  ];
  if (seo?.og_image) {
    meta.push({ property: "og:image", content: seo.og_image });
    meta.push({ name: "twitter:image", content: seo.og_image });
  }
  if (seo?.noindex) meta.push({ name: "robots", content: "noindex,nofollow" });
  return { meta, links: [{ rel: "canonical", href: canonical }] };
}
