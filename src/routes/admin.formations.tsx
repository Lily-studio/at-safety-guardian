import { createFileRoute } from "@tanstack/react-router";
import { CollectionEditor, type CollectionConfig } from "@/components/admin/CollectionEditor";

const config: CollectionConfig = {
  table: "formations",
  title: "Formations & fiches techniques",
  description:
    "Chaque formation possède sa fiche technique et sa page dédiée (/formations/identifiant). Glissez pour réordonner.",
  labelField: "title_fr",
  hasVisibility: true,
  hasStatus: true,
  defaults: {
    slug: "",
    title_fr: "",
    programme: [],
    extra_sections: [],
    status: "published",
    visible: true,
  },
  fields: [
    { name: "title_fr", label: "Titre (FR)", type: "text" },
    { name: "title_en", label: "Titre (EN)", type: "text" },
    { name: "slug", label: "Identifiant d'URL", type: "text", help: "Ex. securite-incendie → /formations/securite-incendie" },
    { name: "status", label: "Statut", type: "select", options: [{ value: "published", label: "Publié" }, { value: "draft", label: "Brouillon" }] },
    { name: "description_fr", label: "Description (FR)", type: "textarea" },
    { name: "description_en", label: "Description (EN)", type: "textarea" },
    { name: "objectif", label: "Objectif", type: "textarea" },
    { name: "audience", label: "Public", type: "text" },
    { name: "prerequis", label: "Prérequis", type: "text" },
    { name: "duree", label: "Durée", type: "text" },
    { name: "programme", label: "Programme", type: "list", help: "Une ligne par point du programme." },
    { name: "methodes", label: "Méthodes", type: "textarea" },
    { name: "evaluation", label: "Évaluation", type: "text" },
    { name: "attestation", label: "Attestation / livrable", type: "text" },
    { name: "extra_sections", label: "Sections additionnelles", type: "json", help: '[{"title":"...","body":"...","items":["..."]}]' },
    { name: "image_url", label: "Image", type: "image" },
    { name: "pdf_url", label: "Fiche PDF", type: "file" },
    { name: "seo_title", label: "Titre SEO", type: "text" },
    { name: "seo_description", label: "Description SEO", type: "textarea" },
    { name: "visible", label: "Visible", type: "bool" },
  ],
};

export const Route = createFileRoute("/admin/formations")({
  component: () => <CollectionEditor config={config} />,
});
