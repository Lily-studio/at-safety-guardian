import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Conditions générales — AT Safety Prive" },
      { name: "description", content: "Conditions générales d'utilisation du site AT Safety Prive." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero titleKey="footer.terms" />
      <section className="section-y bg-white">
        <div className="container-x max-w-3xl">
          <p className="text-muted-foreground">Dernière mise à jour : {new Date().getFullYear()}</p>
          <h2 className="text-2xl font-bold text-primary mt-8">1. Objet</h2>
          <p className="mt-2 text-foreground/80">Les présentes conditions régissent l'utilisation du site atsafetyprive.ma édité par AT SAFETY PRIVE.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">2. Propriété intellectuelle</h2>
          <p className="mt-2 text-foreground/80">L'ensemble des contenus (textes, images, logos) est la propriété exclusive d'AT SAFETY PRIVE. Toute reproduction non autorisée est interdite.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">3. Responsabilité</h2>
          <p className="mt-2 text-foreground/80">AT SAFETY PRIVE s'efforce d'assurer l'exactitude des informations diffusées mais ne peut être tenue responsable des erreurs, omissions ou interruptions de service.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">4. Droit applicable</h2>
          <p className="mt-2 text-foreground/80">Les présentes conditions sont soumises au droit marocain.</p>
        </div>
      </section>
    </>
  );
}
