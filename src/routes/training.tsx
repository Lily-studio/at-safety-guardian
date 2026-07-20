import { createFileRoute } from "@tanstack/react-router";
import { TrainingGrid } from "@/components/site/TrainingGrid";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Formations HSE — AT Safety Prive" },
      { name: "description", content: "Formations Santé & Sécurité au Travail : incendie, secourisme, travail en hauteur, risques électriques et chimiques." },
      { property: "og:title", content: "Formations HSE — AT Safety Prive" },
      { property: "og:url", content: "/training" },
    ],
    links: [{ rel: "canonical", href: "/training" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Health & Safety Training",
        provider: { "@type": "Organization", name: "AT SAFETY PRIVE" },
        areaServed: "MA",
      }),
    }],
  }),
  component: TrainingPage,
});

function TrainingPage() {
  return (
    <>
      <PageHero titleKey="training.title" subtitleKey="training.subtitle" eyebrow="03" />
      <TrainingGrid />
      <CTASection />
    </>
  );
}
