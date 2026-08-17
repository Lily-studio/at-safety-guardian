import { createFileRoute } from "@tanstack/react-router";
import { ReferencesSection } from "@/components/site/ReferencesSection";
import { IndustriesSection } from "@/components/site/IndustriesSection";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/references")({
  head: () => ({
    meta: [
      { title: "Nos Références — AT Safety Prive" },
      { name: "description", content: "Ils nous font confiance : entreprises industrielles, logistiques et de services à travers le Maroc." },
      { property: "og:title", content: "Nos Références — AT Safety Prive" },
      { property: "og:url", content: "https://at-safety-guardian.lovable.app/references" },
      { property: "og:description", content: "Entreprises et institutions au Maroc qui font confiance à AT SAFETY PRIVE pour leurs formations et audits HSE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://at-safety-guardian.lovable.app/references" }],
  }),
  component: RefPage,
});

function RefPage() {
  return (
    <>
      <PageHero titleKey="references.title" subtitleKey="references.subtitle" eyebrow="08" />
      <ReferencesSection />
      <IndustriesSection />
      <CTASection />
    </>
  );
}
