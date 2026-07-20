import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, GraduationCap } from "lucide-react";
import heroImg from "@/assets/hero-hse.jpg";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">
      <img
        src={heroImg}
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
            {t("hero.eyebrow")}
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
            {t("hero.title1")}
            <span className="block text-accent mt-2">{t("hero.title2")} · {t("hero.title3")}</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/training" className="btn-accent">
              <GraduationCap size={18} /> {t("hero.cta1")}
            </Link>
            <Link to="/contact" className="btn-primary-outline text-white">
              {t("hero.cta2")} <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white/90 hover:text-accent transition-colors">
              {t("hero.cta3")} →
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {[
              { icon: CheckCircle2, key: "hero.badge1" },
              { icon: ShieldCheck, key: "hero.badge2" },
              { icon: MapPin, key: "hero.badge3" },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex items-center gap-2 text-sm text-white/90">
                  <Icon size={18} className="text-accent" />
                  {t(b.key)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
