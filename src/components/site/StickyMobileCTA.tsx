import { Link } from "@tanstack/react-router";
import { Phone, FileText } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { pick, useCompany, useNav } from "@/lib/cms";

export function StickyMobileCTA() {
  const { t, lang } = useI18n();
  const company = useCompany();
  const cta = useNav("header_cta")[0];
  const phone = (company.phone || "+212 666 249 070").replace(/\s/g, "");
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-white/95 backdrop-blur px-3 py-2 flex gap-2">
      <a href={`tel:${phone}`} className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-md border border-primary text-primary text-sm font-semibold">
        <Phone size={16} /> {t("contact.info.phone")}
      </a>
      <Link to={cta?.href || "/contact"} className="flex-1 btn-accent text-sm py-2.5">
        <FileText size={16} /> {cta ? pick(lang, cta.label_fr, cta.label_en) : t("nav.quote")}
      </Link>
    </div>
  );
}
