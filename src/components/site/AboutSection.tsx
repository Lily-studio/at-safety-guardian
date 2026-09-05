import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";
import { asArray, asObject, pick, useSection } from "@/lib/cms";
import { getIcon } from "@/lib/icons";

type Bullet = { fr?: string; en?: string };
type Value = { icon?: string; title_fr?: string; title_en?: string; desc_fr?: string; desc_en?: string };

export function AboutSection() {
  const { t, lang } = useI18n();
  const section = useSection("home", "about");
  const data = asObject(section?.data);
  const bullets = asArray<Bullet>(data.bullets);
  const values = asArray<Value>(data.values);

  return (
    <section id="about" className="section-y bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
        <div>
          <SectionHeader
            eyebrow={section?.eyebrow ?? "02"}
            title={pick(lang, section?.title_fr, section?.title_en) || t("about.title")}
            center={false}
          />
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            {pick(lang, section?.body_fr, section?.body_en) || t("about.p1")}
          </p>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            {pick(lang, data.p2_fr as string, data.p2_en as string) || t("about.p2")}
          </p>
          <p className="mt-6 font-semibold text-primary">
            {pick(lang, data.support_fr as string, data.support_en as string) || t("about.support")}
          </p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" /> {pick(lang, b.fr, b.en)}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {values.map((v, i) => {
            const Icon = getIcon(v.icon);
            return (
              <div
                key={i}
                className="p-6 rounded-xl bg-surface border border-border hover:-translate-y-1 hover:shadow-[var(--shadow-card)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-primary">{pick(lang, v.title_fr, v.title_en)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{pick(lang, v.desc_fr, v.desc_en)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
