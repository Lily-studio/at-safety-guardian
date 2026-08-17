import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { trainingPrograms } from "@/components/site/TrainingGrid";

const BASE_URL = "https://at-safety-guardian.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/about", priority: "0.8", changefreq: "monthly" },
          { path: "/formations", priority: "0.9", changefreq: "monthly" },
          { path: "/consulting", priority: "0.9", changefreq: "monthly" },
          { path: "/references", priority: "0.7", changefreq: "monthly" },
          { path: "/contact", priority: "0.8", changefreq: "monthly" },
          ...trainingPrograms.map((p) => ({ path: `/formations/${p.slug}`, priority: "0.7", changefreq: "monthly" })),
        ];
        const urls = entries.map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
