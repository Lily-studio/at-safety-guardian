import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 mt-0">
      <div className="container-x grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logo} alt="AT Safety Prive" className="h-14 w-auto bg-white rounded-md p-1" width={512} height={512} />
          <p className="mt-4 text-sm text-white/70 leading-relaxed">{t("footer.tagline")}</p>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="LinkedIn" className="p-2 rounded-md bg-white/10 hover:bg-accent transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="p-2 rounded-md bg-white/10 hover:bg-accent transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">{t("footer.quick")}</h3>
          <ul className="space-y-2 text-sm text-white/75">
            <li><Link to="/about" className="hover:text-accent">{t("nav.about")}</Link></li>
            <li><Link to="/training" className="hover:text-accent">{t("nav.training")}</Link></li>
            <li><Link to="/consulting" className="hover:text-accent">{t("nav.consulting")}</Link></li>
            <li><Link to="/references" className="hover:text-accent">{t("nav.references")}</Link></li>
            <li><Link to="/contact" className="hover:text-accent">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">{t("footer.trainingCol")}</h3>
          <ul className="space-y-2 text-sm text-white/75">
            <li>Fire Safety</li>
            <li>First Aid / CPR</li>
            <li>Working at Height</li>
            <li>Electrical Safety</li>
            <li>Chemical Risks</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">{t("footer.contactCol")}</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-accent" /> Casablanca, Maroc</li>
            <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-accent" /> +212 5XX XX XX XX</li>
            <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-accent" /> contact@atsafetyprive.ma</li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
        <p>© {year} AT SAFETY PRIVE. {t("footer.rights")}</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-accent">{t("footer.privacy")}</Link>
          <Link to="/terms" className="hover:text-accent">{t("footer.terms")}</Link>
        </div>
      </div>
    </footer>
  );
}
