import { createFileRoute } from "@tanstack/react-router";
import { buildHead, loadSeo } from "@/lib/seo";
import { ConsultingSection } from "@/components/site/ConsultingSection";
import { IndustriesSection } from "@/components/site/IndustriesSection";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/consulting")({
  loader: ({ context }) => loadSeo(context.queryClient, "/consulting"),
  head: ({ loaderData }) =>
    buildHead("/consulting", loaderData?.seo, {
      title: "Conseil HSE & Audits — AT Safety Prive",
      description: "Audits de sécurité, conformité réglementaire et systèmes de management HSE pour les entreprises marocaines.",
    }),
  component: ConsultingPage,
});

function ConsultingPage() {
  return (
    <>
      <PageHero page="consulting" titleKey="consulting.title" subtitleKey="consulting.subtitle" eyebrow="04" />
      <ConsultingSection />
      <IndustriesSection />
      <CTASection />
    </>
  );
}
