import { Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap } from "lucide-react";
import heroImg from "@/assets/hero-hse.jpg";
import { useI18n } from "@/lib/i18n";
import { asArray, asObject, pick, useSection } from "@/lib/cms";
import { getIcon } from "@/lib/icons";

type Badge = { icon?: string; label_fr?: string; label_en?: string };

export function Hero() {
  const { t, lang } = useI18n();
  const section = useSection("home", "hero");
  const data = asObject(section?.data);
  const badges = asArray<Badge>(data.badges);

  const eyebrow = section?.eyebrow || t("hero.eyebrow");
  const title = pick(lang, section?.title_fr, section?.title_en) || t("hero.title1");
  const accent = pick(lang, data.accent_fr as string, data.accent_en as string) ||
    `${t("hero.title2")} · ${t("hero.title3")}`;
  const subtitle = pick(lang, section?.subtitle_fr, section?.subtitle_en) || t("hero.subtitle");
  const cta1 = pick(lang, section?.cta_label_fr, section?.cta_label_en) || t("hero.cta1");
  const cta1Href = section?.cta_href || "/formations";
  const cta2 = pick(lang, data.cta2_label_fr as string, data.cta2_label_en as string) || t("hero.cta2");
  const cta3 = pick(lang, data.cta3_label_fr as string, data.cta3_label_en as string) || t("hero.cta3");

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">
      <img
        src={section?.image_url || heroImg}
        alt="Professionnels HSE portant des EPI en environnement industriel"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

      <div className="container-x relative z-10 py-16 md:py-24 text-white">
        <div className="max-w-3xl fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 backdrop-blur-sm text-xs font-semibold text-accent uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {eyebrow}
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
            {title}
            <span className="block text-accent mt-2">{accent}</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={cta1Href} className="btn-accent">
              <GraduationCap size={18} /> {cta1}
            </Link>
            <Link to={(data.cta2_href as string) || "/contact"} className="btn-primary-outline text-white">
              {cta2} <ArrowRight size={16} />
            </Link>
            <Link
              to={(data.cta3_href as string) || "/contact"}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white/90 hover:text-accent transition-colors"
            >
              {cta3} →
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {badges.map((b, i) => {
              const Icon = getIcon(b.icon);
              return (
                <div key={i} className="flex items-center gap-2 text-sm text-white/90">
                  <Icon size={18} className="text-accent" />
                  {pick(lang, b.label_fr, b.label_en)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
