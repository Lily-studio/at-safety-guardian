import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";
import { useI18n } from "@/lib/i18n";
import { pick, useCompany, useNav, useSettings, useSiteContent } from "@/lib/cms";

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();
  const company = useCompany();
  const footer = useSettings("footer");
  const branding = useSettings("branding");
  const content = useSiteContent();
  const quick = useNav("footer", "quick");
  const legal = useNav("footer", "legal");
  const formations = (content?.formations ?? []).slice(0, 6);

  const logoUrl = (branding.logo_url as string) || logoAsset.url;
  const tagline = pick(lang, footer.tagline_fr as string, footer.tagline_en as string) || t("footer.tagline");
  const rights = pick(lang, footer.copyright_fr as string, footer.copyright_en as string) || t("footer.rights");

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 mt-0">
      <div className="container-x grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logoUrl} alt={company.name || "AT Safety Prive"} className="h-14 w-auto bg-white rounded-md p-1" width={512} height={512} />
          <p className="mt-4 text-sm text-white/70 leading-relaxed">{tagline}</p>
          <div className="flex gap-3 mt-5">
            {company.linkedin && (
              <a href={company.linkedin} aria-label="LinkedIn" className="p-2 rounded-md bg-white/10 hover:bg-accent transition-colors">
                <Linkedin size={18} />
              </a>
            )}
            {company.facebook && (
              <a href={company.facebook} aria-label="Facebook" className="p-2 rounded-md bg-white/10 hover:bg-accent transition-colors">
                <Facebook size={18} />
              </a>
            )}
            {company.instagram && (
              <a href={company.instagram} aria-label="Instagram" className="p-2 rounded-md bg-white/10 hover:bg-accent transition-colors">
                <Instagram size={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            {pick(lang, footer.quick_title_fr as string, footer.quick_title_en as string) || t("footer.quick")}
          </h3>
          <ul className="space-y-2 text-sm text-white/75">
            {quick.map((l) => (
              <li key={l.id}>
                <Link to={l.href} className="hover:text-accent">{pick(lang, l.label_fr, l.label_en)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            {pick(lang, footer.training_title_fr as string, footer.training_title_en as string) || t("footer.trainingCol")}
          </h3>
          <ul className="space-y-2 text-sm text-white/75">
            {formations.map((f) => (
              <li key={f.id}>
                <Link to="/formations/$slug" params={{ slug: f.slug }} className="hover:text-accent">
                  {pick(lang, f.title_fr, f.title_en)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            {pick(lang, footer.contact_title_fr as string, footer.contact_title_en as string) || t("footer.contactCol")}
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
            {company.address && (
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-accent" /> {company.address}</li>
            )}
            {company.phone && (
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-accent" />
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-accent">{company.phone}</a>
              </li>
            )}
            {company.email && (
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-accent" />
                <a href={`mailto:${company.email}`} className="hover:text-accent">{company.email}</a>
              </li>
            )}
            {pick(lang, company.hours_fr, company.hours_en) && (
              <li className="text-white/60">{pick(lang, company.hours_fr, company.hours_en)}</li>
            )}
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
        <p>© {year} {company.name || "AT SAFETY PRIVE"}. {rights}</p>
        <div className="flex gap-4">
          {(legal.length
            ? legal.map((l) => ({ href: l.href, label: pick(lang, l.label_fr, l.label_en) }))
            : [
                { href: "/privacy", label: t("footer.privacy") },
                { href: "/terms", label: t("footer.terms") },
              ]
          ).map((l) => (
            <Link key={l.href} to={l.href} className="hover:text-accent">{l.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
