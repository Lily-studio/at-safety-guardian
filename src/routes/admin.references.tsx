import { createFileRoute } from "@tanstack/react-router";
import { CollectionEditor, type CollectionConfig } from "@/components/admin/CollectionEditor";

const config: CollectionConfig = {
  table: "client_references",
  title: "Références clients",
  description: "Logos affichés dans le bandeau défilant. Glissez pour changer l'ordre.",
  labelField: "name",
  hasVisibility: true,
  defaults: { name: "", logo_url: "", visible: true, dark_logo: false },
  fields: [
    { name: "name", label: "Nom de l'entreprise", type: "text" },
    { name: "logo_url", label: "Logo", type: "image" },
    { name: "website", label: "Site web", type: "text" },
    { name: "visible", label: "Visible", type: "bool" },
  ],
};

export const Route = createFileRoute("/admin/references")({
  component: () => <CollectionEditor config={config} />,
});
