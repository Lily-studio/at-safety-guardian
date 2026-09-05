import { createFileRoute } from "@tanstack/react-router";
import { TrainingGrid } from "@/components/site/TrainingGrid";
import { PageHero } from "@/components/site/PageHero";
import { buildHead, loadSeo } from "@/lib/seo";

export const Route = createFileRoute("/formations/")({
  loader: ({ context }) => loadSeo(context.queryClient, "/formations"),
  head: ({ loaderData }) => {
    const head = buildHead("/formations", loaderData?.seo, {
      title: "Nos Formations HSE — AT Safety Prive",
      description:
        "Consultez les formations HSE AT Safety Prive et accédez à chaque fiche technique dédiée.",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Health & Safety Training",
            provider: { "@type": "Organization", name: "AT SAFETY PRIVE" },
            areaServed: "MA",
          }),
        },
      ],
    };
  },
  component: FormationsPage,
});

function FormationsPage() {
  return (
    <>
      <PageHero page="formations" titleKey="training.title" subtitleKey="training.subtitle" eyebrow="03" />
      <TrainingGrid />
    </>
  );
}
