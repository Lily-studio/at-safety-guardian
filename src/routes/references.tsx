import { createFileRoute } from "@tanstack/react-router";
import { buildHead, loadSeo } from "@/lib/seo";
import { ReferencesSection } from "@/components/site/ReferencesSection";
import { IndustriesSection } from "@/components/site/IndustriesSection";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/references")({
  loader: ({ context }) => loadSeo(context.queryClient, "/references"),
  head: ({ loaderData }) =>
    buildHead("/references", loaderData?.seo, {
      title: "Nos Références — AT Safety Prive",
      description: "Ils nous font confiance : entreprises industrielles, logistiques et de services à travers le Maroc.",
    }),
  component: RefPage,
});

function RefPage() {
  return (
    <>
      <PageHero page="references" titleKey="references.title" subtitleKey="references.subtitle" eyebrow="08" />
      <ReferencesSection />
      <IndustriesSection />
      <CTASection />
    </>
  );
}
