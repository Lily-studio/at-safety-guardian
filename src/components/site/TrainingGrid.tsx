import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { pick, useSection, useSiteContent } from "@/lib/cms";

export function TrainingGrid() {
  const { t, lang } = useI18n();
  const content = useSiteContent();
  const section = useSection("home", "trainings");
  const formations = content?.formations ?? [];

  return (
    <section id="training" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeader
          eyebrow={section?.eyebrow ?? "03"}
          title={pick(lang, section?.title_fr, section?.title_en) || t("training.title")}
          subtitle={pick(lang, section?.subtitle_fr, section?.subtitle_en) || t("training.subtitle")}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {formations.map((f) => (
            <Link
              key={f.id}
              to="/formations/$slug"
              params={{ slug: f.slug }}
              className="group bg-white rounded-xl p-6 border border-border hover:border-accent/40 hover:shadow-[var(--shadow-elegant)] transition-all duration-300 flex min-h-32 items-center justify-center text-center"
            >
              <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                {pick(lang, f.title_fr, f.title_en)}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow, title, subtitle, center = true, light = false,
}: { eyebrow?: string | null; title: string; subtitle?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={`${center ? "text-center max-w-3xl mx-auto" : ""}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent">
          <span className="w-8 h-px bg-accent" /> {eyebrow}
        </div>
      )}
      <h2 className={`mt-3 text-3xl md:text-4xl font-bold leading-tight ${light ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg ${light ? "text-white/80" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
