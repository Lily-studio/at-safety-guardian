import { createFileRoute } from "@tanstack/react-router";
import { CollectionEditor, type CollectionConfig } from "@/components/admin/CollectionEditor";
import { iconNames } from "@/lib/icons";

const config: CollectionConfig = {
  table: "sectors",
  title: "Secteurs d'activité",
  labelField: "title_fr",
  hasVisibility: true,
  defaults: { title_fr: "", visible: true, icon: "Factory" },
  fields: [
    { name: "title_fr", label: "Titre (FR)", type: "text" },
    { name: "title_en", label: "Titre (EN)", type: "text" },
    { name: "icon", label: "Icône", type: "select", options: iconNames.map((n) => ({ value: n, label: n })) },
    { name: "description_fr", label: "Description (FR)", type: "textarea" },
    { name: "description_en", label: "Description (EN)", type: "textarea" },
    { name: "image_url", label: "Image", type: "image" },
    { name: "visible", label: "Visible", type: "bool" },
  ],
};

export const Route = createFileRoute("/admin/sectors")({
  component: () => <CollectionEditor config={config} />,
});
