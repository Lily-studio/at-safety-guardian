import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { FieldInput, type FieldDef } from "@/components/admin/fields";
import { saveSetting, useSettingsRows } from "@/lib/admin";
import { useQueryClient } from "@tanstack/react-query";

type Group = { key: string; title: string; description?: string; fields: FieldDef[] };

const GROUPS: Group[] = [
  {
    key: "company",
    title: "Coordonnées de l'entreprise",
    description: "Utilisées dans l'en-tête, le pied de page, la page contact et les données structurées.",
    fields: [
      { name: "name", label: "Nom", type: "text" },
      { name: "phone", label: "Téléphone", type: "text" },
      { name: "email", label: "E-mail", type: "text" },
      { name: "whatsapp", label: "WhatsApp", type: "text" },
      { name: "address", label: "Adresse", type: "text" },
      { name: "location_fr", label: "Ville / pays (FR)", type: "text" },
      { name: "location_en", label: "Ville / pays (EN)", type: "text" },
      { name: "hours_fr", label: "Horaires (FR)", type: "text" },
      { name: "hours_en", label: "Horaires (EN)", type: "text" },
      { name: "linkedin", label: "LinkedIn", type: "text" },
      { name: "facebook", label: "Facebook", type: "text" },
      { name: "instagram", label: "Instagram", type: "text" },
      { name: "map_embed", label: "Lien carte (iframe src)", type: "textarea", full: true },
    ],
  },
  {
    key: "branding",
    title: "Identité visuelle",
    fields: [
      { name: "logo_url", label: "Logo", type: "image" },
      { name: "logo_footer_url", label: "Logo pied de page", type: "image" },
      { name: "favicon_url", label: "Favicon", type: "image" },
    ],
  },
  {
    key: "footer",
    title: "Pied de page",
    fields: [
      { name: "tagline_fr", label: "Accroche (FR)", type: "textarea", full: true },
      { name: "tagline_en", label: "Accroche (EN)", type: "textarea", full: true },
      { name: "copyright", label: "Mention de copyright", type: "text", full: true },
    ],
  },
  {
    key: "brochure",
    title: "Brochure / fiche générale",
    fields: [
      { name: "pdf_url", label: "Fichier PDF", type: "file" },
      { name: "label_fr", label: "Libellé du bouton (FR)", type: "text" },
      { name: "label_en", label: "Libellé du bouton (EN)", type: "text" },
    ],
  },
];

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

function SettingsPage() {
  const { data: rows = [], isLoading } = useSettingsRows();
  const qc = useQueryClient();
  const [state, setState] = useState<Record<string, Record<string, unknown>>>({});

  useEffect(() => {
    if (!rows.length) return;
    const next: Record<string, Record<string, unknown>> = {};
    rows.forEach((r) => {
      next[r.key] = (r.value && typeof r.value === "object" && !Array.isArray(r.value)
        ? (r.value as Record<string, unknown>)
        : {});
    });
    setState((prev) => (Object.keys(prev).length ? prev : next));
  }, [rows]);

  const save = async (key: string) => {
    const ok = await saveSetting(key, state[key] ?? {});
    if (ok) {
      await qc.invalidateQueries({ queryKey: ["admin", "site_settings"] });
      await qc.invalidateQueries({ queryKey: ["site-content"] });
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-primary">Paramètres du site</h1>
        <p className="text-sm text-muted-foreground mt-1">Coordonnées, identité visuelle, pied de page et brochure.</p>
      </header>
      {isLoading && <p className="text-sm text-muted-foreground">Chargement…</p>}
      {GROUPS.map((g) => (
        <section key={g.key} className="rounded-xl border border-border bg-white p-5">
          <h2 className="text-lg font-semibold text-primary">{g.title}</h2>
          {g.description && <p className="text-sm text-muted-foreground mt-1">{g.description}</p>}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {g.fields.map((f) => (
              <label key={f.name} className={`block ${f.full || f.type === "textarea" ? "sm:col-span-2" : ""}`}>
                <span className="block text-sm font-medium text-primary mb-1.5">{f.label}</span>
                <FieldInput
                  field={f}
                  value={state[g.key]?.[f.name]}
                  onChange={(v) => setState((p) => ({ ...p, [g.key]: { ...(p[g.key] ?? {}), [f.name]: v } }))}
                />
              </label>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <button onClick={() => save(g.key)} className="btn-accent text-sm"><Save size={16} /> Enregistrer</button>
          </div>
        </section>
      ))}
    </div>
  );
}
