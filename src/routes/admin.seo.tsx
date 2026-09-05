import { createFileRoute } from "@tanstack/react-router";
import { CollectionEditor, type CollectionConfig } from "@/components/admin/CollectionEditor";

const config: CollectionConfig = {
  table: "seo_pages",
  title: "SEO",
  description: "Titre, description, URL canonique, partage social et indexation pour chaque page.",
  labelField: "path",
  reorder: false,
  defaults: { path: "/", noindex: false },
  fields: [
    { name: "path", label: "Chemin de la page", type: "text", help: "/, /about, /formations, /consulting, /references, /contact" },
    { name: "title", label: "Titre SEO", type: "text" },
    { name: "description", label: "Meta description", type: "textarea" },
    { name: "canonical", label: "URL canonique", type: "text" },
    { name: "og_title", label: "Titre de partage", type: "text" },
    { name: "og_description", label: "Description de partage", type: "textarea" },
    { name: "og_image", label: "Image de partage", type: "image" },
    { name: "noindex", label: "Ne pas indexer", type: "bool" },
  ],
};

export const Route = createFileRoute("/admin/seo")({
  component: () => <CollectionEditor config={config} />,
});
