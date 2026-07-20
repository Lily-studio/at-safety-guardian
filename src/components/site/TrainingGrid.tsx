import { useI18n } from "@/lib/i18n";
import {
  Flame, HeartPulse, PackageOpen, MoveUp, Zap, FlaskConical, Car, ShieldCheck,
} from "lucide-react";

export const trainingPrograms = [
  {
    icon: Flame,
    fr: { title: "Sécurité Incendie", desc: "Prévention incendie, formation aux extincteurs, évacuation d'urgence." },
    en: { title: "Fire Safety", desc: "Fire prevention, extinguisher training, emergency evacuation." },
  },
  {
    icon: HeartPulse,
    fr: { title: "Secourisme au Travail", desc: "SST, RCP, intervention d'urgence, prise en charge des blessés." },
    en: { title: "First Aid at Work", desc: "First aid, CPR, emergency response, patient care." },
  },
  {
    icon: PackageOpen,
    fr: { title: "Manutention & Ergonomie", desc: "Prévention des troubles musculo-squelettiques et gestes sûrs." },
    en: { title: "Manual Handling & Ergonomics", desc: "Prevention of musculoskeletal disorders and safe postures." },
  },
  {
    icon: MoveUp,
    fr: { title: "Travail en Hauteur", desc: "Harnais, échafaudages, plateformes mobiles et PEMP." },
    en: { title: "Working at Height", desc: "Harness, scaffolding, mobile platforms and MEWPs." },
  },
  {
    icon: Zap,
    fr: { title: "Habilitation Électrique", desc: "Risques électriques, consignation, procédures LOTO." },
    en: { title: "Electrical Safety", desc: "Electrical risks, lockout/tagout procedures." },
  },
  {
    icon: FlaskConical,
    fr: { title: "Risques Chimiques", desc: "Matières dangereuses, fiches de données de sécurité (FDS)." },
    en: { title: "Chemical Risks", desc: "Hazardous materials, safety data sheets (SDS)." },
  },
  {
    icon: Car,
    fr: { title: "Sécurité Routière", desc: "Conduite défensive et prévention des accidents routiers." },
    en: { title: "Road Safety", desc: "Defensive driving and road accident prevention." },
  },
  {
    icon: ShieldCheck,
    fr: { title: "Culture Sécurité", desc: "Sensibilisation, comportements sûrs et animation HSE." },
    en: { title: "Safety Culture", desc: "Awareness, safe behaviors and HSE facilitation." },
  },
];

export function TrainingGrid() {
  const { t, lang } = useI18n();
  return (
    <section id="training" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeader eyebrow="03" title={t("training.title")} subtitle={t("training.subtitle")} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainingPrograms.map((p, i) => {
            const Icon = p.icon;
            const c = p[lang];
            return (
              <article
                key={i}
                className="group bg-white rounded-xl p-6 border border-border hover:border-accent/40 hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </article>
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
