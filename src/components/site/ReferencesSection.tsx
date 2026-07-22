import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";

const logos = [
  "REDAL", "Safran", "Danone", "Coca-Cola", "OCP Group", "ONCF", "Managem", "Cosumar",
  "Lesieur Cristal", "Renault", "Marjane", "Alliances", "Lafarge", "Holcim", "Nestlé",
  "Centrale Danone", "Maroc Telecom", "ONEE", "Attijariwafa Bank", "BMCE Bank",
  "Royal Air Maroc", "CTM", "Marsa Maroc", "Somaca", "Peugeot Maroc", "Yazaki",
  "Delphi", "Bombardier", "STMicroelectronics", "Alstom", "Colgate-Palmolive",
  "Procter & Gamble", "Unilever",
];

export function ReferencesSection() {
  const { t } = useI18n();
  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <SectionHeader eyebrow="08" title={t("references.title")} subtitle={t("references.subtitle")} />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {logos.map((n) => (
            <div
              key={n}
              className="h-20 flex items-center justify-center rounded-lg bg-surface border border-border px-3 text-center text-sm font-bold text-primary/70 hover:text-accent hover:border-accent/40 transition-colors"
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
