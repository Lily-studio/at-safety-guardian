import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { AboutSection } from "@/components/site/AboutSection";
import { TrainingGrid } from "@/components/site/TrainingGrid";
import { ConsultingSection } from "@/components/site/ConsultingSection";
import { StatsSection } from "@/components/site/StatsSection";
import { IndustriesSection } from "@/components/site/IndustriesSection";
import { ProcessSection } from "@/components/site/ProcessSection";
import { ReferencesSection } from "@/components/site/ReferencesSection";
import { CTASection } from "@/components/site/CTASection";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AT Safety Prive — Formation & Conseil HSE au Maroc" },
      {
        name: "description",
        content:
          "Cabinet marocain de conseil HSE : formations Santé & Sécurité au Travail, audits, prévention des risques et conformité réglementaire.",
      },
      { property: "og:title", content: "AT Safety Prive — Formation & Conseil HSE" },
      { property: "og:url", content: "https://at-safety-guardian.lovable.app/" },
      { property: "og:description", content: "Formations HSE, audits et conseil en santé et sécurité au travail pour les entreprises au Maroc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://at-safety-guardian.lovable.app/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <TrainingGrid />
      <ConsultingSection />
      <StatsSection />
      <IndustriesSection />
      <ProcessSection />
      <ReferencesSection />
      <CTASection />
      <ContactForm />
    </>
  );
}
