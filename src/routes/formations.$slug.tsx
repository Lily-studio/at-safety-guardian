import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, Award, BookOpen, CheckCircle2, ClipboardCheck, Clock, Download, GraduationCap, Target, Users,
} from "lucide-react";
import { getFormation } from "@/lib/cms.functions";
import { asArray } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/formations/$slug")({
  loader: async ({ params }) => {
    const formation = await getFormation({ data: { slug: params.slug } });
    if (!formation) throw notFound();
    return { formation };
  },
  head: ({ loaderData }) => {
    const f = loaderData?.formation;
    if (!f) {
      return { meta: [{ title: "Formation introuvable — AT Safety Prive" }, { name: "robots", content: "noindex" }] };
    }
    const title = f.seo_title || `${f.title_fr} — Formation HSE au Maroc | AT Safety Prive`;
    const desc = (f.seo_description || `${f.objectif ?? ""} ${f.duree ? `Durée : ${f.duree}.` : ""} Formation animée au Maroc par AT SAFETY PRIVE.`).slice(0, 158);
    const url = `${SITE_URL}/formations/${f.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: f.title_fr,
            description: f.objectif ?? desc,
            url,
            inLanguage: "fr",
            provider: { "@type": "Organization", name: "AT SAFETY PRIVE", url: SITE_URL, areaServed: "MA" },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "onsite",
              courseWorkload: f.duree ?? undefined,
              location: { "@type": "Country", name: "Maroc" },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Formations", item: `${SITE_URL}/formations` },
              { "@type": "ListItem", position: 3, name: f.title_fr, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="text-3xl font-bold text-primary">Formation introuvable</h1>
      <Link to="/formations" className="mt-6 inline-flex btn-accent">Retour aux formations</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="text-2xl font-semibold">Une erreur est survenue</h1>
      <Link to="/formations" className="mt-6 inline-flex btn-accent">Retour aux formations</Link>
    </div>
  ),
  component: TrainingDetail,
});

type ExtraSection = { title?: string; body?: string; items?: string[] };

function TrainingDetail() {
  const { formation: f } = Route.useLoaderData();
  const programme = asArray<string>(f.programme);
  const extras = asArray<ExtraSection>(f.extra_sections);

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary to-primary-light text-white pt-32 pb-16">
        <div className="container-x">
          <Link to="/formations" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent">
            <ArrowLeft size={16} /> Retour aux formations
          </Link>
          <div className="mt-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-accent">Fiche Technique</div>
            <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">{f.title_fr}</h1>
            {f.description_fr && <p className="mt-4 text-lg text-white/85 max-w-2xl">{f.description_fr}</p>}
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-x max-w-5xl">
          <div className="space-y-10">
            {f.objectif && (
              <FicheBlock icon={Target} title="Objectif général">
                <p className="text-foreground leading-relaxed">{f.objectif}</p>
              </FicheBlock>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {f.audience && <MetaCard icon={Users} label="Public" value={f.audience} />}
              {f.prerequis && <MetaCard icon={CheckCircle2} label="Prérequis" value={f.prerequis} />}
              {f.duree && <MetaCard icon={Clock} label="Durée" value={f.duree} />}
              {f.attestation && <MetaCard icon={Award} label="Attestation" value={f.attestation} />}
            </div>

            {programme.length > 0 && (
              <FicheBlock icon={BookOpen} title="Programme">
                <ul className="space-y-3">
                  {programme.map((step, i) => (
                    <li key={`${step}-${i}`} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </FicheBlock>
            )}

            {f.methodes && (
              <FicheBlock icon={GraduationCap} title="Méthodes">
                <p className="text-foreground leading-relaxed">{f.methodes}</p>
              </FicheBlock>
            )}

            {f.evaluation && (
              <FicheBlock icon={ClipboardCheck} title="Évaluation">
                <p className="text-foreground leading-relaxed">{f.evaluation}</p>
              </FicheBlock>
            )}

            {extras.map((s, i) => (
              <FicheBlock key={i} icon={BookOpen} title={s.title ?? ""}>
                {s.body && <p className="text-foreground leading-relaxed">{s.body}</p>}
                {Array.isArray(s.items) && s.items.length > 0 && (
                  <ul className="space-y-3 mt-3">
                    {s.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground">{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </FicheBlock>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3 border-t border-border pt-8">
            <Link to="/formations" className="btn-primary-outline text-primary justify-center">
              <ArrowLeft size={16} /> Retour aux formations
            </Link>
            {f.pdf_url && (
              <a href={f.pdf_url} target="_blank" rel="noopener noreferrer" className="btn-primary-outline text-primary justify-center">
                <Download size={16} /> Télécharger la fiche
              </a>
            )}
            <Link to="/contact" className="btn-accent justify-center">Demander un devis</Link>
          </div>
        </div>
      </section>
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
