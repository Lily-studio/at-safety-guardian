import { ShieldAlert, Award, Wrench, HeartHandshake, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";

export function AboutSection() {
  const { t, lang } = useI18n();
  const values = [
    { icon: ShieldAlert, t: t("about.value1.t"), d: t("about.value1.d") },
    { icon: Award, t: t("about.value2.t"), d: t("about.value2.d") },
    { icon: Wrench, t: t("about.value3.t"), d: t("about.value3.d") },
    { icon: HeartHandshake, t: t("about.value4.t"), d: t("about.value4.d") },
  ];
  const bullets = lang === "fr"
    ? ["Formations Santé & Sécurité", "Prévention des risques", "Conseil HSE", "Audits de sécurité", "Conformité réglementaire", "Systèmes de management HSE"]
    : ["Health & Safety Training", "Risk Prevention", "HSE Consulting", "Safety Audits", "Regulatory Compliance", "HSE Management Systems"];

  return (
    <section id="about" className="section-y bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
        <div>
          <SectionHeader eyebrow="02" title={t("about.title")} center={false} />
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">{t("about.p1")}</p>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">{t("about.p2")}</p>
          <p className="mt-6 font-semibold text-primary">{t("about.support")}</p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl bg-surface border border-border hover:-translate-y-1 hover:shadow-[var(--shadow-card)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-primary">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
