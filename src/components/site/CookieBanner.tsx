import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export function CookieBanner() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("cookie-consent")) setShow(true);
  }, []);
  if (!show) return null;
  const decide = (v: string) => {
    localStorage.setItem("cookie-consent", v);
    setShow(false);
  };
  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:left-auto md:max-w-md z-40 rounded-lg bg-white border border-border shadow-2xl p-4 fade-up">
      <p className="text-sm text-foreground">{t("cookie.text")}</p>
      <div className="mt-3 flex gap-2 justify-end">
        <button onClick={() => decide("declined")} className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
          {t("cookie.decline")}
        </button>
        <button onClick={() => decide("accepted")} className="btn-accent text-sm px-4 py-1.5">
          {t("cookie.accept")}
        </button>
      </div>
    </div>
  );
}
