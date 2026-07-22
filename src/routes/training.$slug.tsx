import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock, Users, Award, Target, BookOpen, GraduationCap, ClipboardCheck, Printer } from "lucide-react";
import { trainingPrograms } from "@/components/site/TrainingGrid";
import { getFiche } from "@/lib/fiches";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/training/$slug")({
  loader: ({ params }) => {
    const program = trainingPrograms.find((p) => p.slug === params.slug);
    if (!program) throw notFound();
    const fiche = getFiche(params.slug);
    return { program, fiche };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.program;
    const title = p ? `${p.fr.title} — Fiche Technique | AT Safety Prive` : "Fiche Technique";
    const desc = p?.fr.desc ?? "Fiche technique de formation HSE proposée par AT Safety Prive.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
      ],
      links: p ? [{ rel: "canonical", href: `/training/${p.slug}` }] : [],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="text-3xl font-bold text-primary">Formation introuvable</h1>
      <Link to="/training" className="mt-6 inline-flex btn-accent">Voir toutes les formations</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="text-2xl font-semibold">Une erreur est survenue</h1>
      <Link to="/training" className="mt-6 inline-flex btn-accent">Retour aux formations</Link>
    </div>
  ),
  component: TrainingDetail,
});

function TrainingDetail() {
  const { program, fiche } = Route.useLoaderData();

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary to-primary-light text-white pt-32 pb-16">
        <div className="container-x">
          <Link to="/training" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent">
            <ArrowLeft size={16} /> Toutes les formations
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <div className="w-16 h-16 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
              <program.icon size={32} />
            </div>
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-accent">Fiche Technique</div>
              <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">{fiche?.title ?? program.fr.title}</h1>
              <p className="mt-4 text-lg text-white/85 max-w-2xl">{program.fr.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {fiche ? (
        <section className="section-y bg-white">
          <div className="container-x grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              <FicheBlock icon={Target} title="Objectif général">
                <p className="text-foreground leading-relaxed">{fiche.objectif}</p>
              </FicheBlock>

              <div className="grid sm:grid-cols-2 gap-4">
                {fiche.public && <MetaCard icon={Users} label="Public concerné" value={fiche.public} />}
                {fiche.prerequis && <MetaCard icon={CheckCircle2} label="Prérequis" value={fiche.prerequis} />}
                <MetaCard icon={Clock} label="Durée" value={fiche.duree} />
                {fiche.attestation && <MetaCard icon={Award} label="Attestation" value={fiche.attestation} />}
              </div>

              <FicheBlock icon={BookOpen} title="Programme">
                <ul className="space-y-3">
                  {fiche.programme.map((step) => (
                    <li key={step} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </FicheBlock>

              {fiche.methodes && (
                <FicheBlock icon={GraduationCap} title="Méthodes pédagogiques">
                  <p className="text-foreground leading-relaxed">{fiche.methodes}</p>
                </FicheBlock>
              )}

              <FicheBlock icon={ClipboardCheck} title="Évaluation">
                <p className="text-foreground leading-relaxed">{fiche.evaluation}</p>
              </FicheBlock>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-28 p-6 rounded-2xl bg-surface border border-border shadow-[var(--shadow-card)]">
                <h3 className="text-lg font-semibold text-primary">Intéressé par cette formation ?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Recevez une proposition personnalisée sous 48h.
                </p>
                <Link to="/contact" className="mt-5 btn-accent w-full justify-center">Demander un devis</Link>
                <Link to="/contact" className="mt-3 btn-primary-outline text-primary w-full justify-center">Nous contacter</Link>
                <button
                  onClick={() => typeof window !== "undefined" && window.print()}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Printer size={14} /> Imprimer la fiche
                </button>
              </div>
            </aside>
          </div>
        </section>
      ) : (
        <section className="section-y bg-white">
          <div className="container-x max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-primary">Fiche technique en cours de préparation</h2>
            <p className="mt-4 text-muted-foreground">
              Le contenu détaillé de cette formation sera publié prochainement.
              Contactez-nous pour recevoir le programme complet.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Link to="/contact" className="btn-accent">Demander un devis</Link>
              <Link to="/contact" className="btn-primary-outline text-primary">Nous contacter</Link>
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

function FicheBlock({ icon: Icon, title, children }: { icon: React.ComponentType<{ size?: number }>; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
          <Icon size={20} />
        </div>
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function MetaCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; value: string }) {
  return (
    <div className="p-5 rounded-xl bg-surface border border-border">
      <Icon size={22} className="text-accent" />
      <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground font-semibold">{label}</p>
      <p className="mt-1 text-primary font-semibold">{value}</p>
    </div>
  );
}
