import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { uploadMedia } from "@/lib/admin";

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "textarea" | "list" | "image" | "file" | "bool" | "select" | "number" | "json";
  options?: Array<{ value: string; label: string }>;
  help?: string;
  full?: boolean;
};

export const input =
  "w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  switch (field.type) {
    case "textarea":
      return <textarea rows={4} className={input} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
    case "list":
      return (
        <textarea
          rows={6}
          className={input}
          placeholder="Une ligne par élément"
          value={Array.isArray(value) ? (value as string[]).join("\n") : ""}
          onChange={(e) => onChange(e.target.value.split("\n").map((l) => l.trim()).filter(Boolean))}
        />
      );
    case "json":
      return (
        <textarea
          rows={8}
          className={`${input} font-mono text-xs`}
          defaultValue={JSON.stringify(value ?? {}, null, 2)}
          onBlur={(e) => {
            try {
              onChange(JSON.parse(e.target.value || "{}"));
            } catch {
              /* keep previous value on invalid JSON */
            }
          }}
        />
      );
    case "bool":
      return (
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
          <span className="text-muted-foreground">{field.help ?? "Activé"}</span>
        </label>
      );
    case "select":
      return (
        <select className={input} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {(field.options ?? []).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      );
    case "number":
      return <input type="number" className={input} value={Number(value ?? 0)} onChange={(e) => onChange(Number(e.target.value))} />;
    case "image":
    case "file":
      return <FileField value={String(value ?? "")} onChange={(v) => onChange(v)} preview={field.type === "image"} />;
    default:
      return <input className={input} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
  }
}

function FileField({ value, onChange, preview }: { value: string; onChange: (v: string) => void; preview: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input className={input} value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL du fichier" />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="inline-flex items-center gap-2 shrink-0 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-secondary"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} Importer
        </button>
      </div>
      <input
        ref={ref}
        type="file"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setBusy(true);
          const res = await uploadMedia(file);
          setBusy(false);
          if (res?.url) onChange(res.url);
          e.target.value = "";
        }}
      />
      {preview && value && (
        <img src={value} alt="" className="h-16 w-auto max-w-[180px] object-contain rounded border border-border bg-white p-1" />
      )}
    </div>
  );
}
