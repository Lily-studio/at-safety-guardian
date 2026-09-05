import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  LayoutDashboard, FileText, GraduationCap, Briefcase, Factory, Images, Building2,
  Navigation, Search, Settings, Inbox, Users, LogOut, Menu, X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/lib/admin";

const NAV = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { to: "/admin/sections", label: "Pages & sections", icon: FileText },
  { to: "/admin/formations", label: "Formations & fiches", icon: GraduationCap },
  { to: "/admin/services", label: "Conseil & audits", icon: Briefcase },
  { to: "/admin/sectors", label: "Secteurs", icon: Factory },
  { to: "/admin/references", label: "Références", icon: Building2 },
  { to: "/admin/media", label: "Médiathèque", icon: Images },
  { to: "/admin/nav", label: "Menu & pied de page", icon: Navigation },
  { to: "/admin/seo", label: "SEO", icon: Search },
  { to: "/admin/settings", label: "Paramètres & brochure", icon: Settings },
  { to: "/admin/leads", label: "Demandes reçues", icon: Inbox },
  { to: "/admin/users", label: "Administrateurs", icon: Users },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { email } = useAdminSession();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  };

  return (
    <div className="min-h-dvh bg-surface lg:flex">
      <div className="lg:hidden flex items-center justify-between bg-primary text-primary-foreground px-4 py-3">
        <span className="font-semibold">Administration</span>
        <button onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>

      <aside className={`${open ? "block" : "hidden"} lg:block lg:w-64 shrink-0 bg-primary text-primary-foreground lg:min-h-dvh`}>
        <div className="hidden lg:block px-5 py-5 border-b border-white/10">
          <p className="font-semibold">AT SAFETY PRIVE</p>
          <p className="text-xs text-white/60 mt-0.5">Espace d'administration</p>
        </div>
        <nav className="p-3 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = "exact" in item && item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                  active ? "bg-accent text-white font-semibold" : "text-white/80 hover:bg-white/10"
                }`}
              >
                <Icon size={17} /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 mt-2 border-t border-white/10 space-y-1">
          <a href="/" target="_blank" rel="noreferrer" className="block rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10">
            Voir le site
          </a>
          <button onClick={signOut} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10">
            <LogOut size={17} /> Se déconnecter
          </button>
          {email && <p className="px-3 pt-2 text-xs text-white/50 break-all">{email}</p>}
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 max-w-full overflow-x-hidden">{children}</main>
    </div>
  );
}
