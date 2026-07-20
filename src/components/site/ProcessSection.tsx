import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";

export function ProcessSection() {
  const { t } = useI18n();
  const steps = [1, 2, 3, 4, 5].map((n) => ({
    n,
    title: t(`process.s${n}.t`),
    desc: t(`process.s${n}.d`),
  }));
  return (
    <section className="section-y bg-surface">
      <div className="container-x">
        <SectionHeader eyebrow="07" title={t("process.title")} subtitle={t("process.subtitle")} />
        <div className="mt-14 relative">
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />
          <div className="grid gap-8 lg:grid-cols-5">
            {steps.map((s) => (
              <div key={s.n} className="relative text-center">
                <div className="relative z-10 mx-auto w-16 h-16 rounded-full bg-white border-2 border-accent flex items-center justify-center text-xl font-bold text-accent shadow-lg">
                  {s.n.toString().padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-base font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
