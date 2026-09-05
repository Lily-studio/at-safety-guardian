import { createFileRoute } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { buildHead, loadSeo } from "@/lib/seo";
import { siteContentQuery } from "@/lib/cms";

const COMPONENTS: Record<string, ComponentType> = {
  hero: Hero,
  about: AboutSection,
  trainings: TrainingGrid,
  consulting: ConsultingSection,
  stats: StatsSection,
  sectors: IndustriesSection,
  process: ProcessSection,
  references: ReferencesSection,
  cta: CTASection,
  contact: ContactForm,
};

export const Route = createFileRoute("/")({
  loader: ({ context }) => loadSeo(context.queryClient, "/"),
  head: ({ loaderData }) =>
    buildHead("/", loaderData?.seo, {
      title: "AT Safety Prive — Formation & Conseil HSE au Maroc",
      description:
        "Cabinet marocain de conseil HSE : formations Santé & Sécurité au Travail, audits, prévention des risques et conformité réglementaire.",
    }),
  component: Home,
});

function Home() {
  const { data } = useQuery(siteContentQuery);
  const sections = (data?.sections ?? []).filter((s) => s.page === "home");
  const blocks = sections.length
    ? sections.map((s) => ({ key: s.id, component: s.component || s.block_key }))
    : Object.keys(COMPONENTS).map((key) => ({ key, component: key }));

  return (
    <>
      {blocks.map((b) => {
        const Component = COMPONENTS[b.component];
        return Component ? <Component key={b.key} /> : null;
      })}
    </>
  );
}
