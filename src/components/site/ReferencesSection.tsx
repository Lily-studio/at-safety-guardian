import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";

const logos = [
  "OCP Group", "ONCF", "Managem", "Cosumar", "Lesieur", "Renault", "Marjane", "Alliances",
];

export function ReferencesSection() {
  const { t } = useI18n();
  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <SectionHeader eyebrow="08" title={t("references.title")} subtitle={t("references.subtitle")} />
        <div className="mt-12 overflow-hidden relative" aria-hidden="true">
          <div className="flex gap-12 animate-[scroll_30s_linear_infinite] w-max" style={{ animationName: "scroll" }}>
            {[...logos, ...logos].map((n, i) => (
              <div
                key={i}
                className="h-20 min-w-48 flex items-center justify-center rounded-lg bg-surface border border-border text-xl font-bold text-primary/60 hover:text-accent transition-colors"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  );
}
