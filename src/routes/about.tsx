import { createFileRoute } from "@tanstack/react-router";
import { buildHead, loadSeo } from "@/lib/seo";
import { AboutSection } from "@/components/site/AboutSection";
import { StatsSection } from "@/components/site/StatsSection";
import { ProcessSection } from "@/components/site/ProcessSection";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/about")({
  loader: ({ context }) => loadSeo(context.queryClient, "/about"),
  head: ({ loaderData }) =>
    buildHead("/about", loaderData?.seo, {
      title: "À propos — AT Safety Prive",
      description: "Notre mission, nos valeurs et notre équipe d'experts HSE au service des entreprises marocaines.",
    }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero page="about" titleKey="nav.about" subtitleKey="about.p1" eyebrow="01" />
      <AboutSection />
      <StatsSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
