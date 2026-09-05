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
import { buildHead, loadSeo } from "@/lib/seo";
import { siteContentQuery } from "@/lib/cms";
import { useQuery } from "@tanstack/react-query";

const COMPONENTS: Record<string, () => JSX.Element> = {
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
  const ordered = sections.length
    ? sections
    : Object.keys(COMPONENTS).map((block_key, i) => ({ id: block_key, block_key, component: block_key, sort_order: i }) as never);

  return (
    <>
      {ordered.map((s) => {
        const Component = COMPONENTS[s.component] ?? COMPONENTS[s.block_key];
        if (!Component) return null;
        return <Component key={s.id} />;
      })}
    </>
  );
}
