import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";
import { asArray, pick, useSection, useSiteContent } from "@/lib/cms";
import { getIcon } from "@/lib/icons";

type Bullet = { fr?: string; en?: string };

export function ConsultingSection() {
  const { t, lang } = useI18n();
  const content = useSiteContent();
  const section = useSection("home", "consulting");
  const services = content?.services ?? [];

  return (
    <section id="consulting" className="section-y bg-white">
      <div className="container-x">
        <SectionHeader
          eyebrow={section?.eyebrow ?? "04"}
          title={pick(lang, section?.title_fr, section?.title_en) || t("consulting.title")}
          subtitle={pick(lang, section?.subtitle_fr, section?.subtitle_en) || t("consulting.subtitle")}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => {
            const Icon = getIcon(s.icon);
            const bullets = asArray<Bullet>(s.bullets);
            return (
              <article
                key={s.id}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-[var(--shadow-card)]"
              >
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-accent text-white flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{pick(lang, s.title_fr, s.title_en)}</h3>
                  {pick(lang, s.description_fr, s.description_en) && (
                    <p className="mt-3 text-sm text-white/85">{pick(lang, s.description_fr, s.description_en)}</p>
                  )}
                  <ul className="mt-4 space-y-2">
                    {bullets.map((it, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/85">
                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" /> {pick(lang, it.fr, it.en)}
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
