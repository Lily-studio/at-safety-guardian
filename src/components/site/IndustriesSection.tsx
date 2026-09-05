import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";
import { pick, useSection, useSiteContent } from "@/lib/cms";
import { getIcon } from "@/lib/icons";

export function IndustriesSection() {
  const { t, lang } = useI18n();
  const content = useSiteContent();
  const section = useSection("home", "sectors");
  const sectors = content?.sectors ?? [];

  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <SectionHeader
          eyebrow={section?.eyebrow ?? "06"}
          title={pick(lang, section?.title_fr, section?.title_en) || t("industries.title")}
          subtitle={pick(lang, section?.subtitle_fr, section?.subtitle_en) || t("industries.subtitle")}
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {sectors.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <div
                key={s.id}
                className="group flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-surface hover:bg-primary transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 rounded-full bg-white group-hover:bg-accent flex items-center justify-center text-primary group-hover:text-white transition-colors">
                  <Icon size={26} />
                </div>
                <p className="text-sm font-semibold text-primary group-hover:text-white transition-colors">
                  {pick(lang, s.title_fr, s.title_en)}
                </p>
                {pick(lang, s.description_fr, s.description_en) && (
                  <p className="text-xs text-muted-foreground group-hover:text-white/80">
                    {pick(lang, s.description_fr, s.description_en)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
