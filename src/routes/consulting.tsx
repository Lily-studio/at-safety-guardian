import { createFileRoute } from "@tanstack/react-router";
import { ConsultingSection } from "@/components/site/ConsultingSection";
import { IndustriesSection } from "@/components/site/IndustriesSection";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/consulting")({
  head: () => ({
    meta: [
      { title: "Conseil HSE & Audits — AT Safety Prive" },
      { name: "description", content: "Audits de sécurité, conformité réglementaire et systèmes de management HSE pour les entreprises marocaines." },
      { property: "og:title", content: "Conseil HSE & Audits — AT Safety Prive" },
      { property: "og:url", content: "https://at-safety-guardian.lovable.app/consulting" },
      { property: "og:description", content: "Audit HSE, conseil en prévention des risques professionnels et conformité réglementaire au Maroc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://at-safety-guardian.lovable.app/consulting" }],
  }),
  component: ConsultingPage,
});

function ConsultingPage() {
  return (
    <>
      <PageHero titleKey="consulting.title" subtitleKey="consulting.subtitle" eyebrow="04" />
      <ConsultingSection />
      <IndustriesSection />
      <CTASection />
    </>
  );
}
