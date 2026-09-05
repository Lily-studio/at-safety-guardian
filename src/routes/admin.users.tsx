import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/lib/admin";

export const Route = createFileRoute("/admin/users")({ component: UsersPage });

function UsersPage() {
  const { email } = useAdminSession();
  const { data: roles = [] } = useQuery({
    queryKey: ["admin", "user_roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("*");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-primary">Administrateurs</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vous êtes connecté en tant que <strong className="text-primary">{email}</strong>.
        </p>
      </header>

      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="text-lg font-semibold text-primary">Comptes autorisés</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {roles.length} accès enregistré{roles.length > 1 ? "s" : ""} pour l'administration du site.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {roles.map((r) => (
            <li key={r.id} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
              <span className="font-mono text-xs text-muted-foreground break-all">{r.user_id}</span>
              <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-primary">{r.role}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Pour ajouter un nouvel administrateur, créez d'abord son compte puis demandez l'attribution du rôle
          d'administration : cette opération est volontairement protégée pour éviter tout accès non autorisé.
        </p>
      </section>
    </div>
  );
}
