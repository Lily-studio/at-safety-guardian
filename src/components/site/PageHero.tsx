import { useI18n } from "@/lib/i18n";
import { pick, useSection } from "@/lib/cms";

export function PageHero({
  titleKey,
  subtitleKey,
  eyebrow,
  page,
}: {
  titleKey: string;
  subtitleKey?: string;
  eyebrow?: string;
  page?: string;
}) {
  const { t, lang } = useI18n();
  const section = useSection(page ?? "__none", "hero");
  const title = pick(lang, section?.title_fr, section?.title_en) || t(titleKey);
  const subtitle = pick(lang, section?.subtitle_fr, section?.subtitle_en) || (subtitleKey ? t(subtitleKey) : "");
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/25 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="container-x relative py-20 md:py-28">
        {(section?.eyebrow || eyebrow) && (
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent">
            <span className="w-8 h-px bg-accent" /> {section?.eyebrow || eyebrow}
          </div>
        )}
        <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl leading-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-white/80 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
