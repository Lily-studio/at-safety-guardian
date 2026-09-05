import { createFileRoute } from "@tanstack/react-router";
import { CollectionEditor, type CollectionConfig } from "@/components/admin/CollectionEditor";

const config: CollectionConfig = {
  table: "sections",
  title: "Pages & sections",
  description:
    "Titres, textes, images, boutons et ordre des sections de la page d'accueil et des autres pages. Glissez pour réordonner.",
  labelField: "block_key",
  hasVisibility: true,
  hasStatus: true,
  defaults: { page: "home", block_key: "", component: "custom", data: {}, status: "published", visible: true },
  fields: [
    { name: "page", label: "Page", type: "text", help: "home, about, formations, consulting, references, contact" },
    { name: "block_key", label: "Clé de la section", type: "text", help: "hero, about, trainings, consulting, stats, sectors, process, references, cta, contact" },
    { name: "component", label: "Type d'affichage", type: "text", help: "Doit correspondre à la clé pour les sections d'accueil." },
    { name: "eyebrow", label: "Surtitre", type: "text" },
    { name: "status", label: "Statut", type: "select", options: [{ value: "published", label: "Publié" }, { value: "draft", label: "Brouillon" }] },
    { name: "title_fr", label: "Titre (FR)", type: "text" },
    { name: "title_en", label: "Titre (EN)", type: "text" },
    { name: "subtitle_fr", label: "Sous-titre (FR)", type: "textarea" },
    { name: "subtitle_en", label: "Sous-titre (EN)", type: "textarea" },
    { name: "body_fr", label: "Texte (FR)", type: "textarea" },
    { name: "body_en", label: "Texte (EN)", type: "textarea" },
    { name: "image_url", label: "Image", type: "image" },
    { name: "cta_label_fr", label: "Bouton (FR)", type: "text" },
    { name: "cta_label_en", label: "Bouton (EN)", type: "text" },
    { name: "cta_href", label: "Lien du bouton", type: "text" },
    { name: "data", label: "Contenu structuré", type: "json", help: "Statistiques, étapes, listes de valeurs…" },
    { name: "visible", label: "Visible", type: "bool" },
  ],
};

export const Route = createFileRoute("/admin/sections")({
  component: () => <CollectionEditor config={config} />,
});
