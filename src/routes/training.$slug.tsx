import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Download, ArrowLeft, CheckCircle2, Clock, Users, Award } from "lucide-react";
import { trainingPrograms } from "@/components/site/TrainingGrid";
import { useI18n } from "@/lib/i18n";
import { CTASection } from "@/components/site/CTASection";
import fichePdf from "@/assets/fiche_technique_ATSAFETY.pdf.asset.json";

export const Route = createFileRoute("/training/$slug")({
  loader: ({ params }) => {
    const program = trainingPrograms.find((p) => p.slug === params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.program;
    const title = p ? `${p.fr.title} — Formation HSE | AT Safety Prive` : "Formation HSE";
    const desc = p?.fr.desc ?? "Formation HSE proposée par AT Safety Prive.";
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
  const { program } = Route.useLoaderData();
  const { lang } = useI18n();
  const c = program[lang];
  const isFr = lang === "fr";

  const meta = [
    { icon: Clock, label: isFr ? "Durée" : "Duration", value: isFr ? "1 à 3 jours" : "1 to 3 days" },
    { icon: Users, label: isFr ? "Public" : "Audience", value: isFr ? "Tous salariés" : "All employees" },
    { icon: Award, label: isFr ? "Certification" : "Certificate", value: isFr ? "Attestation officielle" : "Official certificate" },
  ];
  const objectives = isFr
    ? ["Comprendre les risques liés à l'activité", "Maîtriser les mesures de prévention", "Adopter les bons réflexes en situation", "Répondre aux obligations réglementaires"]
    : ["Understand activity-related risks", "Master prevention measures", "Adopt the right reflexes on site", "Meet regulatory requirements"];
  const content = isFr
    ? ["Cadre réglementaire et responsabilités", "Analyse des risques et évaluation", "Moyens de prévention et EPI", "Cas pratiques et mises en situation", "Évaluation et remise d'attestation"]
    : ["Regulatory framework and responsibilities", "Risk analysis and assessment", "Prevention measures and PPE", "Case studies and simulations", "Evaluation and certificate delivery"];

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary to-primary-light text-white pt-32 pb-16">
        <div className="container-x">
          <Link to="/training" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent">
            <ArrowLeft size={16} /> {isFr ? "Toutes les formations" : "All training"}
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <div className="w-16 h-16 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
              <program.icon size={32} />
            </div>
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-accent">
                {isFr ? "Fiche Technique" : "Technical Sheet"}
              </div>
              <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">{c.title}</h1>
              <p className="mt-4 text-lg text-white/85 max-w-2xl">{c.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div className="grid sm:grid-cols-3 gap-4">
              {meta.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div key={i} className="p-5 rounded-xl bg-surface border border-border">
                    <Icon size={22} className="text-accent" />
                    <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground font-semibold">{m.label}</p>
                    <p className="mt-1 text-primary font-semibold">{m.value}</p>
                  </div>
                );
              })}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary">{isFr ? "Objectifs pédagogiques" : "Learning objectives"}</h2>
              <ul className="mt-5 space-y-3">
                {objectives.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-foreground">
                    <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" /> <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary">{isFr ? "Programme" : "Program"}</h2>
              <ol className="mt-5 space-y-3">
                {content.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="pt-1 text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-2xl bg-surface border border-border shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-semibold text-primary">
                {isFr ? "Télécharger la fiche technique" : "Download the technical sheet"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {isFr ? "Programme détaillé, durée, prérequis et modalités." : "Detailed program, duration, prerequisites and terms."}
              </p>
              <a
                href={fichePdf.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="mt-5 btn-accent w-full justify-center"
              >
                <Download size={16} /> PDF
              </a>
              <Link to="/contact" className="mt-3 btn-primary-outline text-primary w-full justify-center">
                {isFr ? "Demander un devis" : "Request a quote"}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  );
}
