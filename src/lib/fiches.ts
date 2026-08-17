// Fiches techniques — content provided by the client (verbatim).
// Only trainings listed here have a full technical sheet.

export type Fiche = {
  slug: string;
  title: string;
  objectif: string;
  public?: string;
  prerequis?: string;
  duree: string;
  programme: string[];
  methodes?: string;
  evaluation: string;
  attestation?: string;
};

export const fiches: Fiche[] = [
  {
    slug: "securite-incendie",
    title: "Sécurité Incendie",
    objectif: "Prévenir le risque incendie, maîtriser un départ de feu et assurer une évacuation efficace.",
    public: "Tout salarié, Équipiers de Première Intervention (EPI), Responsables HSE.",
    prerequis: "Aucun.",
    duree: "1 journée (7 h) ou 2 jours avec exercices pratiques.",
    programme: [
      "Réglementation",
      "Triangle et propagation du feu",
      "Classes de feu",
      "Moyens d'extinction",
      "Extincteurs et RIA",
      "Organisation de l'évacuation",
      "Exercices pratiques sur feux réels",
    ],
    methodes: "Exposés interactifs, Études de cas, Démonstrations, Exercices pratiques.",
    evaluation: "QCM + exercices pratiques.",
    attestation: "Attestation de formation.",
  },
  {
    slug: "secourisme-travail",
    title: "Secourisme au Travail",
    objectif: "Acquérir les gestes de premiers secours.",
    public: "Tous les salariés.",
    duree: "2 jours (14 h).",
    programme: [
      "Protection et alerte",
      "Hémorragies",
      "Étouffement",
      "Malaises",
      "Brûlures",
      "Plaies",
      "Traumatisme",
      "Victime inconsciente",
      "Arrêt cardio-respiratoire",
      "Défibrillateur Automatisé Externe (DAE)",
    ],
    methodes: "Cas pratiques, Simulations, Mannequins de réanimation.",
    evaluation: "Mises en situation.",
    attestation: "Attestation de formation.",
  },
  {
    slug: "manutention-ergonomie",
    title: "Manutention Manuelle et Ergonomie",
    objectif: "Prévenir les troubles musculo-squelettiques et les accidents liés à la manutention.",
    duree: "1 journée.",
    programme: [
      "Les structures anatomiques les plus vulnérables",
      "TMS",
      "Gestes et postures",
      "Ergonomie du poste",
      "Techniques de levage",
      "Ergonomie du poste",
    ],
    methodes: "Démonstrations, Exercices sur poste.",
    evaluation: "Observation pratique.",
  },
  {
    slug: "travail-en-hauteur",
    title: "Travail en Hauteur",
    objectif:
      "Prévenir les chutes de hauteur par l’identification des risques, l’application des mesures de prévention et la maîtrise des équipements de protection.",
    public: "Personnel intervenant en hauteur : échelles, échafaudages, plateformes, PEMP/nacelles et toitures.",
    duree: "1 jour (7 h)",
    programme: [
      "Risques et mesures de prévention ;",
      "Protection collective et EPI antichute ;",
      "Contrôle et utilisation du harnais, longe, absorbeur et systèmes d’ancrage ;",
      "Règles de sécurité pour échelles, échafaudages et PEMP ;",
      "Exercices pratiques et mise en situation.",
    ],
    evaluation: "Théorique et pratique",
    attestation: "Attestation de formation",
  },
  {
    slug: "espace-confine",
    title: "Travail en Espace Confiné",
    objectif: "Maîtriser les risques liés aux espaces confinés.",
    duree: "1 journée.",
    programme: [
      "Définition",
      "Atmosphères dangereuses",
      "Permis de travail",
      "Détection de gaz",
      "Ventilation",
      "Surveillance",
      "Sauvetage",
      "Exercices pratiques",
    ],
    evaluation: "Cas pratiques.",
  },
  {
    slug: "rps",
    title: "Risques Psychosociaux",
    objectif: "Prévenir les risques psychosociaux et améliorer la qualité de vie au travail.",
    duree: "1 journée.",
    programme: [
      "Stress",
      "Burn-out",
      "Harcèlement",
      "Violence",
      "Charge mentale",
      "Prévention primaire, secondaire et tertiaire",
    ],
    evaluation: "Étude de cas.",
  },
  {
    slug: "haccp",
    title: "Hygiène Alimentaire – HACCP",
    objectif: "Garantir la sécurité sanitaire des aliments.",
    duree: "2 jours.",
    programme: [
      "Microbiologie alimentaire",
      "Hygiène du personnel",
      "Nettoyage et désinfection",
      "Marche en avant",
      "Les 7 principes HACCP",
      "CCP",
      "Traçabilité",
    ],
    evaluation: "QCM + étude de cas.",
  },
  {
    slug: "arbre-des-causes",
    title: "Analyse des Accidents du Travail par l'Arbre des Causes",
    objectif: "Maîtriser la méthode de l'arbre des causes pour analyser les accidents du travail.",
    duree: "1 journée.",
    programme: [
      "Accident, Incident et Presqu'accident",
      "Recueil des informations",
      "Méthodologie de l'arbre des causes",
      "Exercices d'application",
      "Plan d'actions",
    ],
    evaluation: "Étude de cas.",
  },
  {
    slug: "bruit-ari",
    title: "Bruit au Travail et Protection Respiratoire",
    objectif: "Prévenir les risques liés au bruit et aux atmosphères dangereuses.",
    duree: "1 journée.",
    programme: [
      "Bruit : Réglementation, Mesure de l'exposition, Effets sur la santé, Protecteurs auditifs.",
      "Appareil Respiratoire Isolant (ARI) : Risques respiratoires, Composition de l'ARI, Vérifications avant utilisation, Mise en œuvre, Déplacement sous ARI, Entretien et stockage, Exercices pratiques.",
    ],
    evaluation: "QCM + exercices pratiques.",
    attestation: "Attestation de formation.",
  },
];

export const getFiche = (slug: string) => fiches.find((f) => f.slug === slug);
