import { Link } from "@tanstack/react-router";
import { Phone, FileText } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function StickyMobileCTA() {
  const { t } = useI18n();
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-white/95 backdrop-blur px-3 py-2 flex gap-2">
      <a href="tel:+2125000000" className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-md border border-primary text-primary text-sm font-semibold">
        <Phone size={16} /> {t("contact.info.phone")}
      </a>
      <Link to="/contact" className="flex-1 btn-accent text-sm py-2.5">
        <FileText size={16} /> {t("nav.quote")}
      </Link>
    </div>
  );
}
