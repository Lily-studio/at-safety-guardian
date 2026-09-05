import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./TrainingGrid";
import { pick, useSection, useSiteContent, type ReferenceRow } from "@/lib/cms";

function Row({ items, duration, reverse = false }: { items: ReferenceRow[]; duration: number; reverse?: boolean }) {
  return (
    <div className="group relative overflow-hidden py-3">
      <div
        className="flex w-max items-center gap-10 sm:gap-14 animate-[marquee_var(--d)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ ["--d" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((logo, i) => (
          <img
            key={`${logo.id}-${i}`}
            src={logo.logo_url ?? ""}
            alt={`Logo ${logo.name} — client d'AT SAFETY PRIVE`}
            loading="lazy"
            decoding="async"
            aria-hidden={i >= items.length ? true : undefined}
            className="h-10 sm:h-12 w-auto max-w-[150px] shrink-0 object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
          />
        ))}
      </div>
    </div>
  );
}

export function ReferencesSection() {
  const { t, lang } = useI18n();
  const content = useSiteContent();
  const section = useSection("home", "references");
  const logos = (content?.references ?? []).filter((r) => !!r.logo_url);
  const half = Math.ceil(logos.length / 2);
  const row1 = logos.slice(0, half);
  const row2 = logos.slice(half);

  return (
    <section id="references" className="section-y bg-white">
      <div className="container-x">
        <SectionHeader
          eyebrow={section?.eyebrow ?? "08"}
          title={pick(lang, section?.title_fr, section?.title_en) || t("references.title")}
          subtitle={pick(lang, section?.subtitle_fr, section?.subtitle_en) || t("references.subtitle")}
        />
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div className="mt-12 space-y-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {row1.length > 0 && <Row items={row1} duration={40} />}
        {row2.length > 0 && <Row items={row2} duration={50} reverse />}
      </div>
    </section>
  );
}
