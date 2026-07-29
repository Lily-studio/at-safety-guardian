import { createFileRoute } from "@tanstack/react-router";
import { TrainingGrid } from "@/components/site/TrainingGrid";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/formations")({
  head: () => ({
    meta: [
      { title: "Nos Formations HSE — AT Safety Prive" },
      { name: "description", content: "Consultez les formations HSE AT Safety Prive et accédez à chaque fiche technique dédiée." },
      { property: "og:title", content: "Nos Formations HSE — AT Safety Prive" },
      { property: "og:description", content: "Formations HSE avec fiches techniques dédiées : incendie, secourisme, manutention, hauteur, espace confiné, RPS, HACCP, arbre des causes et bruit/ARI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/formations" }],
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
  component: FormationsPage,
});

function FormationsPage() {
  return (
    <>
      <PageHero titleKey="training.title" subtitleKey="training.subtitle" eyebrow="03" />
      <TrainingGrid />
    </>
  );
}