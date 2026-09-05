import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { pick, useSection } from "@/lib/cms";

export function CTASection() {
  const { t, lang } = useI18n();
  const section = useSection("home", "cta");
  return (
    <section className="relative overflow-hidden bg-accent text-accent-foreground section-y">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 20% 30%, white 0.5px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />
      <div className="container-x relative text-center">
        <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
          {pick(lang, section?.title_fr, section?.title_en) || t("cta.title")}
        </h2>
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
          {pick(lang, section?.subtitle_fr, section?.subtitle_en) || t("cta.subtitle")}
        </p>
        <Link
          to={section?.cta_href || "/contact"}
          className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-md bg-white text-accent font-semibold shadow-xl hover:scale-[1.02] transition-transform"
        >
          {pick(lang, section?.cta_label_fr, section?.cta_label_en) || t("cta.btn")} <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
