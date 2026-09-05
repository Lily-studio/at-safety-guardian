import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useAdminMutations, useAdminRows } from "@/lib/admin";

export const Route = createFileRoute("/admin/leads")({ component: LeadsPage });

const STATUS = [
  { value: "new", label: "Nouvelle" },
  { value: "in_progress", label: "En cours" },
  { value: "won", label: "Gagnée" },
  { value: "closed", label: "Clôturée" },
];

function LeadsPage() {
  const { data: rows = [], isLoading } = useAdminRows("leads", "created_at");
  const m = useAdminMutations("leads");
  const list = [...rows].reverse();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-primary">Demandes reçues</h1>
        <p className="text-sm text-muted-foreground mt-1">Messages et demandes de devis envoyés depuis le site.</p>
      </header>

      {isLoading && <p className="text-sm text-muted-foreground">Chargement…</p>}

      <ul className="space-y-3">
        {list.map((row) => (
          <li key={row.id} className="rounded-xl border border-border bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-primary">{String(row["name"] ?? "")}</p>
                <p className="text-xs text-muted-foreground">
                  {String(row["company"] ?? "")} · {String(row["email"] ?? "")} · {String(row["phone"] ?? "")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="rounded-md border border-input bg-white px-2 py-1.5 text-xs"
                  value={String(row["status"] ?? "new")}
                  onChange={(e) => m.update(row.id, { status: e.target.value })}
                >
                  {STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <button
                  onClick={() => { if (confirm("Supprimer cette demande ?")) m.remove(row.id); }}
                  className="rounded border border-border p-1.5 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            {row["subject"] ? <p className="mt-3 text-sm font-medium text-primary">{String(row["subject"])}</p> : null}
            <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{String(row["message"] ?? "")}</p>
            <textarea
              rows={2}
              placeholder="Notes internes"
              defaultValue={String(row["notes"] ?? "")}
              onBlur={(e) => {
                if (e.target.value !== String(row["notes"] ?? "")) m.update(row.id, { notes: e.target.value });
              }}
              className="mt-3 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {new Date(String(row["created_at"])).toLocaleString("fr-FR")}
            </p>
          </li>
        ))}
        {!isLoading && list.length === 0 && (
          <li className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Aucune demande pour le moment.
          </li>
        )}
      </ul>
    </div>
  );
}
