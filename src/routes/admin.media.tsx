import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Copy, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { deleteMedia, uploadMedia, useAdminRows } from "@/lib/admin";

export const Route = createFileRoute("/admin/media")({ component: MediaPage });

function MediaPage() {
  const { data: rows = [], isLoading } = useAdminRows("media", "created_at");
  const qc = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin", "media"] });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Médiathèque</h1>
          <p className="text-sm text-muted-foreground mt-1">Images, logos et documents PDF utilisés sur le site.</p>
        </div>
        <button onClick={() => ref.current?.click()} className="btn-accent text-sm">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} Importer un fichier
        </button>
        <input
          ref={ref}
          type="file"
          multiple
          className="hidden"
          onChange={async (e) => {
            const files = Array.from(e.target.files ?? []);
            if (!files.length) return;
            setBusy(true);
            for (const f of files) await uploadMedia(f);
            setBusy(false);
            e.target.value = "";
            refresh();
          }}
        />
      </header>

      {isLoading && <p className="text-sm text-muted-foreground">Chargement…</p>}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((row) => {
          const url = String(row["url"] ?? "");
          const isImage = String(row["mime_type"] ?? "").startsWith("image/");
          return (
            <li key={row.id} className="rounded-xl border border-border bg-white p-3">
              <div className="h-28 flex items-center justify-center rounded bg-surface overflow-hidden">
                {isImage ? (
                  <img src={url} alt={String(row["name"] ?? "")} className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-xs text-muted-foreground">PDF / document</span>
                )}
              </div>
              <p className="mt-2 truncate text-xs font-medium text-primary">{String(row["name"] ?? "")}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => { navigator.clipboard.writeText(url); toast.success("Lien copié"); }}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded border border-border py-1.5 text-xs hover:bg-secondary"
                >
                  <Copy size={13} /> Copier
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Supprimer ce fichier ?")) return;
                    if (await deleteMedia(row.id, String(row["path"] ?? ""))) refresh();
                  }}
                  className="rounded border border-border p-1.5 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </li>
          );
        })}
        {!isLoading && rows.length === 0 && (
          <li className="sm:col-span-2 lg:col-span-4 rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Aucun fichier importé.
          </li>
        )}
      </ul>
    </div>
  );
}
