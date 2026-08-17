import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/site/AboutSection";
import { StatsSection } from "@/components/site/StatsSection";
import { ProcessSection } from "@/components/site/ProcessSection";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — AT Safety Prive" },
      { name: "description", content: "Notre mission, nos valeurs et notre équipe d'experts HSE au service des entreprises marocaines." },
      { property: "og:title", content: "À propos — AT Safety Prive" },
      { property: "og:url", content: "https://at-safety-guardian.lovable.app/about" },
      { property: "og:description", content: "AT SAFETY PRIVE, cabinet marocain de formation et conseil HSE : mission, valeurs et méthode d'intervention." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://at-safety-guardian.lovable.app/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero titleKey="nav.about" subtitleKey="about.p1" eyebrow="01" />
      <AboutSection />
      <StatsSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
