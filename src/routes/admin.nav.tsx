import { createFileRoute } from "@tanstack/react-router";
import { CollectionEditor, type CollectionConfig } from "@/components/admin/CollectionEditor";

const config: CollectionConfig = {
  table: "nav_items",
  title: "Menu & pied de page",
  description: "Liens du menu principal, du bouton de devis et des colonnes du pied de page.",
  labelField: "label_fr",
  hasVisibility: true,
  defaults: { location: "header", label_fr: "", label_en: "", href: "/", visible: true },
  fields: [
    { name: "label_fr", label: "Libellé (FR)", type: "text" },
    { name: "label_en", label: "Libellé (EN)", type: "text" },
    { name: "href", label: "Lien", type: "text" },
    {
      name: "location",
      label: "Emplacement",
      type: "select",
      options: [
        { value: "header", label: "Menu principal" },
        { value: "header_cta", label: "Bouton de devis" },
        { value: "footer", label: "Pied de page" },
        { value: "footer_legal", label: "Pied de page — mentions" },
      ],
    },
    { name: "group_key", label: "Groupe (colonne)", type: "text" },
    { name: "visible", label: "Visible", type: "bool" },
  ],
};

export const Route = createFileRoute("/admin/nav")({
  component: () => <CollectionEditor config={config} />,
});
