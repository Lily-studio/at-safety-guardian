import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/logo.png.asset.json";
import { useI18n, type Lang } from "@/lib/i18n";
import { pick, useNav, useSettings } from "@/lib/cms";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const branding = useSettings("branding");
  const logoUrl = (branding.logo_url as string) || logoAsset.url;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dbLinks = useNav("header");
  const ctaItems = useNav("header_cta");
  const cta = ctaItems[0];

  const links = dbLinks.length
    ? dbLinks.map((n) => ({ to: n.href, label: pick(lang, n.label_fr, n.label_en) }))
    : [
        { to: "/", label: t("nav.home") },
        { to: "/about", label: t("nav.about") },
        { to: "/formations", label: t("nav.training") },
        { to: "/consulting", label: t("nav.consulting") },
        { to: "/references", label: t("nav.references") },
        { to: "/contact", label: t("nav.contact") },
      ];

  const ctaLabel = cta ? pick(lang, cta.label_fr, cta.label_en) : t("nav.quote");
  const ctaHref = cta?.href || "/contact";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-x flex items-center justify-between h-18 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="AT Safety Prive - Accueil">
          <img src={logoUrl} alt="AT Safety Prive" className="h-12 w-auto" width={512} height={512} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-primary/80 hover:text-accent transition-colors relative"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-accent" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center rounded-md border border-border overflow-hidden text-xs font-semibold">
            {(["fr", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === l ? "bg-primary text-primary-foreground" : "bg-white text-primary hover:bg-secondary"
                }`}
                aria-label={`Switch to ${l.toUpperCase()}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link to={ctaHref} className="hidden md:inline-flex btn-accent text-sm">
            {ctaLabel}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-primary"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-border shadow-lg">
          <nav className="container-x py-4 flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-base font-medium text-primary hover:bg-secondary rounded-md"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              {(["fr", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-semibold border ${
                    lang === l ? "bg-primary text-primary-foreground border-primary" : "border-border"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Link to={ctaHref} onClick={() => setOpen(false)} className="btn-accent mt-2">
              {ctaLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
