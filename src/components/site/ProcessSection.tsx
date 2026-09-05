import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";
import { asArray, asObject, pick, useSection } from "@/lib/cms";

type Step = { title_fr?: string; title_en?: string; desc_fr?: string; desc_en?: string };

export function ProcessSection() {
  const { t, lang } = useI18n();
  const section = useSection("home", "process");
  const steps = asArray<Step>(asObject(section?.data).steps);

  return (
    <section className="section-y bg-surface">
      <div className="container-x">
        <SectionHeader
          eyebrow={section?.eyebrow ?? "07"}
          title={pick(lang, section?.title_fr, section?.title_en) || t("process.title")}
          subtitle={pick(lang, section?.subtitle_fr, section?.subtitle_en) || t("process.subtitle")}
        />
        <div className="mt-14 relative">
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />
          <div className="grid gap-8 lg:grid-cols-5">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="relative z-10 mx-auto w-16 h-16 rounded-full bg-white border-2 border-accent flex items-center justify-center text-xl font-bold text-accent shadow-lg">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-base font-semibold text-primary">{pick(lang, s.title_fr, s.title_en)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pick(lang, s.desc_fr, s.desc_en)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
