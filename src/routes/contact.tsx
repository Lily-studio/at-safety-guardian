import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AT Safety Prive" },
      { name: "description", content: "Contactez notre équipe pour un devis, une formation ou un audit HSE. Réponse sous 24h." },
      { property: "og:title", content: "Contact — AT Safety Prive" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero titleKey="contact.title" subtitleKey="contact.subtitle" eyebrow="10" />
      <ContactForm />
    </>
  );
}
