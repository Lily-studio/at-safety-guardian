import { ClipboardCheck, ScrollText, Settings2, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";

export function ConsultingSection() {
  const { t, lang } = useI18n();
  const blocks = [
    {
      icon: ClipboardCheck,
      fr: { t: "Audits de Sécurité", items: ["Évaluation des risques", "Inspections de sécurité", "Audits de conformité HSE"] },
      en: { t: "Safety Audits", items: ["Risk Assessment", "Safety Inspections", "HSE Compliance Audits"] },
    },
    {
      icon: ScrollText,
      fr: { t: "Conformité Réglementaire", items: ["Réglementations SST", "Procédures de sécurité", "Document Unique (DUERP)", "Audits de conformité HSE"] },
      en: { t: "Regulatory Compliance", items: ["Occupational Safety Regulations", "Safety Procedures", "Risk Assessment Document", "HSE Compliance Audits"] },
    },
    {
      icon: Settings2,
      fr: { t: "Systèmes de Management HSE", items: ["Politique sécurité", "Plans d'urgence", "Plans d'évacuation", "Amélioration continue"] },
      en: { t: "HSE Management Systems", items: ["Safety Policy", "Emergency Plans", "Evacuation Plans", "Continuous Improvement"] },
    },
  ];
  return (
    <section id="consulting" className="section-y bg-white">
      <div className="container-x">
        <SectionHeader eyebrow="04" title={t("consulting.title")} subtitle={t("consulting.subtitle")} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            const c = b[lang];
            return (
              <article
                key={i}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-[var(--shadow-card)]"
              >
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-accent text-white flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{c.t}</h3>
                  <ul className="mt-4 space-y-2">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm text-white/85">
                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
