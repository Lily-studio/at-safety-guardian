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
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
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
