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
      { property: "og:url", content: "/consulting" },
    ],
    links: [{ rel: "canonical", href: "/consulting" }],
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
