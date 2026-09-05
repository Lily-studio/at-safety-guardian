import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

const CARDS = [
  { to: "/admin/formations", table: "formations", label: "Formations" },
  { to: "/admin/references", table: "client_references", label: "Références" },
  { to: "/admin/services", table: "services", label: "Services" },
  { to: "/admin/sectors", table: "sectors", label: "Secteurs" },
  { to: "/admin/sections", table: "sections", label: "Sections de pages" },
  { to: "/admin/leads", table: "leads", label: "Demandes reçues" },
] as const;

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["admin", "counts"],
    queryFn: async () => {
      const entries = await Promise.all(
        CARDS.map(async (c) => {
          const { count } = await supabase.from(c.table).select("id", { count: "exact", head: true });
          return [c.table, count ?? 0] as const;
        }),
      );
      return Object.fromEntries(entries) as Record<string, number>;
    },
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-primary">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gérez l'ensemble du contenu du site : textes, formations, fiches techniques, logos, menus, SEO et demandes.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <Link key={c.to} to={c.to} className="rounded-xl border border-border bg-white p-5 hover:border-accent/50 transition-colors">
            <p className="text-3xl font-bold text-accent">{data?.[c.table] ?? "—"}</p>
            <p className="mt-1 text-sm font-medium text-primary">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
