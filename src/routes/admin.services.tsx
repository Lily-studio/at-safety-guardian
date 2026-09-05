import { createFileRoute } from "@tanstack/react-router";
import { CollectionEditor, type CollectionConfig } from "@/components/admin/CollectionEditor";
import { iconNames } from "@/lib/icons";

const config: CollectionConfig = {
  table: "services",
  title: "Conseil & audits",
  description: "Prestations affichées dans la section Conseil & Audit.",
  labelField: "title_fr",
  hasVisibility: true,
  hasStatus: true,
  defaults: { title_fr: "", bullets: [], status: "published", visible: true, icon: "shield-check" },
  fields: [
    { name: "title_fr", label: "Titre (FR)", type: "text" },
    { name: "title_en", label: "Titre (EN)", type: "text" },
    { name: "icon", label: "Icône", type: "select", options: iconNames.map((n) => ({ value: n, label: n })) },
    { name: "status", label: "Statut", type: "select", options: [{ value: "published", label: "Publié" }, { value: "draft", label: "Brouillon" }] },
    { name: "description_fr", label: "Description (FR)", type: "textarea" },
    { name: "description_en", label: "Description (EN)", type: "textarea" },
    { name: "bullets", label: "Points clés", type: "json", help: '[{"fr":"Audit HSE","en":"HSE audit"}]' },
    { name: "image_url", label: "Image", type: "image" },
    { name: "visible", label: "Visible", type: "bool" },
  ],
};

export const Route = createFileRoute("/admin/services")({
  component: () => <CollectionEditor config={config} />,
});
