import { HardHat, Truck, UtensilsCrossed, Factory, Warehouse, Stethoscope, Zap, Building2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";

const industries = [
  { icon: HardHat, fr: "BTP & Construction", en: "Construction" },
  { icon: Truck, fr: "Logistique & Transport", en: "Logistics" },
  { icon: Building2, fr: "Hôtellerie", en: "Hospitality" },
  { icon: UtensilsCrossed, fr: "Agroalimentaire", en: "Food Industry" },
  { icon: Factory, fr: "Industrie manufacturière", en: "Manufacturing" },
  { icon: Warehouse, fr: "Entrepôts", en: "Warehouses" },
  { icon: Stethoscope, fr: "Santé", en: "Healthcare" },
  { icon: Zap, fr: "Énergie", en: "Energy" },
];

export function IndustriesSection() {
  const { t, lang } = useI18n();
  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <SectionHeader eyebrow="06" title={t("industries.title")} subtitle={t("industries.subtitle")} />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-surface hover:bg-primary transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 rounded-full bg-white group-hover:bg-accent flex items-center justify-center text-primary group-hover:text-white transition-colors">
                  <Icon size={26} />
                </div>
                <p className="text-sm font-semibold text-primary group-hover:text-white transition-colors">
                  {s[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
