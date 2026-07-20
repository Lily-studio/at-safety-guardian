import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — AT Safety Prive" },
      { name: "description", content: "Politique de confidentialité et traitement des données personnelles." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero titleKey="footer.privacy" />
      <section className="section-y bg-white">
        <div className="container-x max-w-3xl prose prose-slate">
          <p className="text-muted-foreground">Dernière mise à jour : {new Date().getFullYear()}</p>
          <h2 className="text-2xl font-bold text-primary mt-8">1. Collecte des données</h2>
          <p className="mt-2 text-foreground/80">AT SAFETY PRIVE collecte les informations que vous nous fournissez volontairement via nos formulaires (nom, email, téléphone, entreprise, message) uniquement pour répondre à vos demandes.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">2. Utilisation</h2>
          <p className="mt-2 text-foreground/80">Vos données sont utilisées exclusivement pour vous recontacter, établir des devis et vous fournir nos services. Elles ne sont jamais vendues à des tiers.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">3. Cookies</h2>
          <p className="mt-2 text-foreground/80">Notre site utilise des cookies essentiels au fonctionnement et à la mémorisation de vos préférences (langue, consentement).</p>
          <h2 className="text-2xl font-bold text-primary mt-8">4. Vos droits</h2>
          <p className="mt-2 text-foreground/80">Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contactez-nous à contact@atsafetyprive.ma.</p>
        </div>
      </section>
    </>
  );
}
