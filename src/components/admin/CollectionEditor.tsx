import { useState } from "react";
import { GripVertical, Pencil, Plus, Save, Trash2, X, Eye, EyeOff } from "lucide-react";
import { FieldInput, type FieldDef } from "./fields";
import { useAdminMutations, useAdminRows, type AdminTable, type Row } from "@/lib/admin";

export type CollectionConfig = {
  table: AdminTable;
  title: string;
  description?: string;
  labelField: string;
  fields: FieldDef[];
  defaults: Record<string, unknown>;
  hasVisibility?: boolean;
  hasStatus?: boolean;
  reorder?: boolean;
};

export function CollectionEditor({ config }: { config: CollectionConfig }) {
  const { data: rows = [], isLoading } = useAdminRows(config.table);
  const m = useAdminMutations(config.table);
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [order, setOrder] = useState<string[] | null>(null);

  const list = order ? order.map((id) => rows.find((r) => r.id === id)!).filter(Boolean) : rows;

  const onDrop = async (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const ids = list.map((r) => r.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(targetId);
    ids.splice(to, 0, ids.splice(from, 1)[0]!);
    setOrder(ids);
    setDragId(null);
    await m.reorder(ids);
    setOrder(null);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">{config.title}</h1>
          {config.description && <p className="text-sm text-muted-foreground mt-1">{config.description}</p>}
        </div>
        <button onClick={() => { setCreating(true); setEditing(null); }} className="btn-accent text-sm">
          <Plus size={16} /> Ajouter
        </button>
      </header>

      {isLoading && <p className="text-sm text-muted-foreground">Chargement…</p>}

      <ul className="space-y-2">
        {list.map((row) => (
          <li
            key={row.id}
            draggable={config.reorder !== false}
            onDragStart={() => setDragId(row.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(row.id)}
            className="flex items-center gap-3 rounded-lg border border-border bg-white px-3 py-3"
          >
            {config.reorder !== false && <GripVertical size={16} className="text-muted-foreground cursor-grab shrink-0" />}
            <span className="flex-1 text-sm font-medium text-primary truncate">
              {String(row[config.labelField] ?? "—")}
            </span>
            {config.hasStatus && (
              <span className="text-xs rounded px-2 py-0.5 bg-secondary text-muted-foreground">{String(row["status"] ?? "")}</span>
            )}
            {config.hasVisibility && (
              <button
                title={row["visible"] ? "Masquer" : "Afficher"}
                onClick={() => m.update(row.id, { visible: !row["visible"] })}
                className="p-2 rounded hover:bg-secondary text-muted-foreground"
              >
                {row["visible"] ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            )}
            <button onClick={() => { setEditing(row); setCreating(false); }} className="p-2 rounded hover:bg-secondary text-primary">
              <Pencil size={16} />
            </button>
            <button
              onClick={() => { if (confirm("Supprimer définitivement ?")) m.remove(row.id); }}
              className="p-2 rounded hover:bg-destructive/10 text-destructive"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
        {!isLoading && list.length === 0 && (
          <li className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Aucun élément pour le moment.
          </li>
        )}
      </ul>

      {(editing || creating) && (
        <RowForm
          config={config}
          row={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSave={async (values) => {
            if (editing) await m.update(editing.id, values);
            else await m.create({ ...config.defaults, ...values, sort_order: list.length });
            setEditing(null);
            setCreating(false);
          }}
        />
      )}
    </div>
  );
}

function RowForm({
  config, row, onClose, onSave,
}: {
  config: CollectionConfig;
  row: Row | null;
  onClose: () => void;
  onSave: (values: Record<string, unknown>) => Promise<void>;
}) {
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const base: Record<string, unknown> = { ...config.defaults };
    config.fields.forEach((f) => { base[f.name] = row ? row[f.name] ?? base[f.name] : base[f.name]; });
    return base;
  });
  const [busy, setBusy] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl my-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">
            {row ? "Modifier" : "Nouvel élément"} — {config.title}
          </h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-secondary"><X size={18} /></button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {config.fields.map((f) => (
            <label key={f.name} className={`block ${f.full || f.type === "list" || f.type === "textarea" || f.type === "json" ? "sm:col-span-2" : ""}`}>
              <span className="block text-sm font-medium text-primary mb-1.5">{f.label}</span>
              <FieldInput field={f} value={values[f.name]} onChange={(v) => setValues((p) => ({ ...p, [f.name]: v }))} />
              {f.help && f.type !== "bool" && <span className="mt-1 block text-xs text-muted-foreground">{f.help}</span>}
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2 border-t border-border pt-5">
          <button onClick={onClose} className="btn-primary-outline text-primary text-sm">Annuler</button>
          <button
            disabled={busy}
            onClick={async () => { setBusy(true); await onSave(values); setBusy(false); }}
            className="btn-accent text-sm disabled:opacity-60"
          >
            <Save size={16} /> Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
