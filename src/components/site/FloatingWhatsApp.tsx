import { MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { COMPANY_WHATSAPP, WHATSAPP_GREETING } from "@/lib/whatsapp";
import { trackContact } from "@/lib/meta-pixel";

/**
 * Permanent floating WhatsApp button, bottom-right. Sits above the sticky
 * mobile CTA bar on small screens and under the cookie banner (z-30).
 */
export function FloatingWhatsApp() {
  const { t } = useI18n();
  const url = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_GREETING)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("wa.aria")}
      onClick={() => trackContact()}
      className="fixed z-30 right-4 bottom-28 lg:right-6 lg:bottom-6 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[var(--shadow-card)] hover:scale-105 transition-transform"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
