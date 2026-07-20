import { useI18n } from "@/lib/i18n";

export function PageHero({ titleKey, subtitleKey, eyebrow }: { titleKey: string; subtitleKey?: string; eyebrow?: string }) {
  const { t } = useI18n();
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/25 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="container-x relative py-20 md:py-28">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent">
            <span className="w-8 h-px bg-accent" /> {eyebrow}
          </div>
        )}
        <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl leading-tight">{t(titleKey)}</h1>
        {subtitleKey && <p className="mt-4 text-lg text-white/80 max-w-2xl">{t(subtitleKey)}</p>}
      </div>
    </section>
  );
}
