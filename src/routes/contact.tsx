import { createFileRoute } from "@tanstack/react-router";
import { buildHead, loadSeo } from "@/lib/seo";
import { ContactForm } from "@/components/site/ContactForm";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  loader: ({ context }) => loadSeo(context.queryClient, "/contact"),
  head: ({ loaderData }) =>
    buildHead("/contact", loaderData?.seo, {
      title: "Contact — AT Safety Prive",
      description: "Contactez notre équipe pour un devis, une formation ou un audit HSE. Réponse sous 24h.",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero page="contact" titleKey="contact.title" subtitleKey="contact.subtitle" eyebrow="10" />
      <ContactForm />
    </>
  );
}
