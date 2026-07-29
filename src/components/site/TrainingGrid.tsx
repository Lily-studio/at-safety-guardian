import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";
import {
  Flame, HeartPulse, PackageOpen, MoveUp, Box, Brain, Utensils, GitBranch, Volume2,
} from "lucide-react";

export type TrainingProgram = {
  slug: string;
  icon: React.ComponentType<{ size?: number | string }>;
  fr: { title: string; desc: string };
  en: { title: string; desc: string };
};

export const trainingPrograms: TrainingProgram[] = [
  {
    slug: "securite-incendie",
    icon: Flame,
    fr: { title: "Sécurité Incendie", desc: "Prévention incendie, formation aux extincteurs, évacuation d'urgence." },
    en: { title: "Fire Safety", desc: "Fire prevention, extinguisher training, emergency evacuation." },
  },
  {
    slug: "secourisme-travail",
    icon: HeartPulse,
    fr: { title: "Secourisme au Travail", desc: "Gestes de premiers secours, RCP et intervention d'urgence." },
    en: { title: "First Aid at Work", desc: "First aid, CPR and emergency response." },
  },
  {
    slug: "manutention-ergonomie",
    icon: PackageOpen,
    fr: { title: "Manutention Manuelle et Ergonomie", desc: "Prévention des TMS et gestes sûrs." },
    en: { title: "Manual Handling & Ergonomics", desc: "MSD prevention and safe postures." },
  },
  {
    slug: "travail-en-hauteur",
    icon: MoveUp,
    fr: { title: "Travail en Hauteur", desc: "Harnais, échafaudages, plateformes mobiles." },
    en: { title: "Working at Height", desc: "Harness, scaffolding, mobile platforms." },
  },
  {
    slug: "espace-confine",
    icon: Box,
    fr: { title: "Travail en Espace Confiné", desc: "Prévention, permis de travail et procédures de sauvetage." },
    en: { title: "Confined Space Work", desc: "Prevention, work permits and rescue procedures." },
  },
  {
    slug: "rps",
    icon: Brain,
    fr: { title: "Risques Psychosociaux", desc: "Stress, burn-out, harcèlement et qualité de vie au travail." },
    en: { title: "Psychosocial Risks", desc: "Stress, burnout, harassment and workplace wellbeing." },
  },
  {
    slug: "haccp",
    icon: Utensils,
    fr: { title: "Hygiène Alimentaire – HACCP", desc: "Sécurité sanitaire des aliments et méthode HACCP." },
    en: { title: "HACCP Food Hygiene", desc: "Food safety and the HACCP methodology." },
  },
  {
    slug: "arbre-des-causes",
    icon: GitBranch,
    fr: { title: "Analyse des Accidents du Travail par l'Arbre des Causes", desc: "Méthodologie d'analyse des accidents du travail." },
    en: { title: "Accident Analysis — Causes Tree Method", desc: "Workplace accident analysis methodology." },
  },
  {
    slug: "bruit-ari",
    icon: Volume2,
    fr: { title: "Bruit au Travail et Protection Respiratoire", desc: "Prévention du bruit et utilisation des appareils respiratoires isolants." },
    en: { title: "Workplace Noise & Respiratory Protection", desc: "Noise prevention and self-contained breathing apparatus." },
  },
];

export function TrainingGrid() {
  const { t, lang } = useI18n();
  return (
    <section id="training" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeader eyebrow="03" title={t("training.title")} subtitle={t("training.subtitle")} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainingPrograms.map((p) => {
            const Icon = p.icon;
            const c = p[lang];
            return (
              <Link
                key={p.slug}
                to="/training/$slug"
                params={{ slug: p.slug }}
                className="group bg-white rounded-xl p-6 border border-border hover:border-accent/40 hover:shadow-[var(--shadow-elegant)] transition-all duration-300 flex flex-col"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  {t("training.learn")} <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow, title, subtitle, center = true, light = false,
}: { eyebrow?: string; title: string; subtitle?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={`${center ? "text-center max-w-3xl mx-auto" : ""}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase ${light ? "text-accent" : "text-accent"}`}>
          <span className="w-8 h-px bg-accent" /> {eyebrow}
        </div>
      )}
      <h2 className={`mt-3 text-3xl md:text-4xl font-bold leading-tight ${light ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg ${light ? "text-white/80" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
