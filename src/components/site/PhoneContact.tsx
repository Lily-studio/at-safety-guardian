import { useEffect, useRef, useState, type ReactNode } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { COMPANY_WHATSAPP, WHATSAPP_GREETING } from "@/lib/whatsapp";
import { trackContact } from "@/lib/meta-pixel";

type Props = {
  phone: string;
  className?: string;
  /** Open the menu upwards (for bars pinned to the bottom of the screen). */
  up?: boolean;
  /** Custom trigger content; defaults to the phone number. */
  display?: ReactNode;
};

/**
 * Clickable phone number offering two options: call (tel:) or WhatsApp (wa.me).
 */
export function PhoneContact({ phone, className = "", up = false, display }: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const tel = phone.replace(/[\s().-]/g, "");
  const waUrl = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_GREETING)}`;
  const item =
    "flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium text-primary hover:bg-secondary transition-colors whitespace-nowrap";

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={className}
      >
        {display ?? phone}
      </button>
      {open && (
        <span
          role="menu"
          className={`absolute z-50 ${up ? "bottom-full mb-2" : "top-full mt-2"} left-0 block w-max rounded-lg border border-border bg-white shadow-xl p-1.5`}
        >
          <a role="menuitem" href={`tel:${tel}`} onClick={() => setOpen(false)} className={item}>
            <Phone size={16} className="text-accent shrink-0" aria-hidden="true" />
            {t("phone.call")} — {phone}
          </a>
          <a
            role="menuitem"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackContact();
              setOpen(false);
            }}
            className={item}
          >
            <MessageCircle size={16} className="text-accent shrink-0" aria-hidden="true" />
            {t("phone.whatsapp")}
          </a>
        </span>
      )}
    </span>
  );
}
