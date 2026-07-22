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

function Row({ items, duration, reverse = false }: { items: string[]; duration: number; reverse?: boolean }) {
  return (
    <div className="group relative overflow-hidden py-2">
      <div
        className="flex gap-6 w-max animate-[marquee_var(--d)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ ["--d" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((n, i) => (
          <div
            key={`${n}-${i}`}
            className="shrink-0 h-20 min-w-[180px] px-6 flex items-center justify-center rounded-lg bg-surface border border-border text-center text-sm font-bold text-primary/70 hover:text-accent hover:border-accent/40 transition-colors"
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReferencesSection() {
  const { t } = useI18n();
  const half = Math.ceil(logos.length / 2);
  const row1 = logos.slice(0, half);
  const row2 = logos.slice(half);
  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <SectionHeader eyebrow="08" title={t("references.title")} subtitle={t("references.subtitle")} />
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div className="mt-12 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Row items={row1} duration={45} />
        <Row items={row2} duration={55} reverse />
      </div>
    </section>
  );
}
