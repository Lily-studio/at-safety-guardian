import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AT Safety Prive" },
      { name: "description", content: "Contactez notre équipe pour un devis, une formation ou un audit HSE. Réponse sous 24h." },
      { property: "og:title", content: "Contact — AT Safety Prive" },
      { property: "og:url", content: "https://at-safety-guardian.lovable.app/contact" },
      { property: "og:description", content: "Demandez un devis pour une formation HSE ou un audit sécurité au Maroc : +212 666 249 070." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://at-safety-guardian.lovable.app/contact" }],
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
