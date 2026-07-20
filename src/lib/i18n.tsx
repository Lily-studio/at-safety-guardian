import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

type Dict = Record<string, string | string[] | Record<string, string>>;

const dict: Record<Lang, Dict> = {
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.training": "Formations",
    "nav.consulting": "Conseil HSE",
    "nav.references": "Références",
    "nav.contact": "Contact",
    "nav.quote": "Demander un devis",

    "hero.eyebrow": "AT SAFETY PRIVE",
    "hero.title1": "Formations Santé & Sécurité",
    "hero.title2": "Conseil",
    "hero.title3": "Audits HSE",
    "hero.subtitle":
      "AT SAFETY PRIVE est un cabinet marocain de conseil spécialisé en Santé et Sécurité au Travail, prévention des risques, conformité réglementaire et systèmes de management HSE.",
    "hero.cta1": "Découvrir nos formations",
    "hero.cta2": "Demander un devis",
    "hero.cta3": "Nous contacter",
    "hero.badge1": "Formateurs expérimentés",
    "hero.badge2": "Conformité réglementaire",
    "hero.badge3": "Interventions dans tout le Maroc",

    "about.title": "À propos d'AT SAFETY PRIVE",
    "about.p1":
      "AT SAFETY PRIVE est un cabinet marocain de conseil spécialisé en Santé et Sécurité au Travail.",
    "about.p2":
      "Créé par des experts issus de la Protection Civile, de l'ingénierie HSE et de la Médecine du Travail, notre mission est d'aider les entreprises à prévenir les accidents du travail, protéger leurs collaborateurs et construire une véritable culture sécurité.",
    "about.support": "Nous accompagnons les organisations à travers :",
    "about.value1.t": "Prévention",
    "about.value1.d": "Anticiper les risques avant qu'ils ne deviennent des accidents.",
    "about.value2.t": "Professionnalisme",
    "about.value2.d": "Une exigence de qualité à chaque étape de notre accompagnement.",
    "about.value3.t": "Expertise Terrain",
    "about.value3.d": "Une connaissance pratique des environnements industriels.",
    "about.value4.t": "Engagement Sécurité",
    "about.value4.d": "La sécurité des personnes au cœur de toutes nos actions.",

    "training.title": "Nos Formations",
    "training.subtitle": "Des programmes conçus pour vos équipes et vos environnements de travail.",
    "training.learn": "En savoir plus",

    "consulting.title": "Conseil & Audits",
    "consulting.subtitle": "Un accompagnement structuré pour bâtir une organisation sûre et conforme.",

    "why.title": "Pourquoi nous choisir",
    "why.subtitle": "Des résultats mesurables au service de la sécurité de vos équipes.",
    "why.stat1": "Collaborateurs formés",
    "why.stat2": "Entreprises accompagnées",
    "why.stat3": "Satisfaction client",
    "why.stat4": "Années d'expérience",

    "industries.title": "Secteurs d'activité",
    "industries.subtitle": "Notre expertise s'adapte aux enjeux spécifiques de chaque secteur.",

    "process.title": "Notre Processus",
    "process.subtitle": "Une méthodologie éprouvée en 5 étapes.",
    "process.s1.t": "Analyse des besoins",
    "process.s1.d": "Écoute de vos enjeux et cadrage du projet.",
    "process.s2.t": "Visite de site",
    "process.s2.d": "Diagnostic terrain de vos installations.",
    "process.s3.t": "Proposition sur mesure",
    "process.s3.d": "Une offre adaptée à votre contexte.",
    "process.s4.t": "Formation / Audit",
    "process.s4.d": "Déploiement opérationnel par nos experts.",
    "process.s5.t": "Certification & Suivi",
    "process.s5.d": "Attestations et accompagnement continu.",

    "references.title": "Nos Références",
    "references.subtitle":
      "La confiance d'entreprises à travers le Maroc, dans de nombreux secteurs.",

    "cta.title": "Améliorons ensemble la sécurité au travail.",
    "cta.subtitle": "Obtenez une proposition personnalisée sous 48 heures.",
    "cta.btn": "Demander votre devis gratuit",

    "contact.title": "Contactez-nous",
    "contact.subtitle": "Notre équipe vous répond sous 24 heures ouvrées.",
    "contact.name": "Nom complet",
    "contact.company": "Entreprise",
    "contact.phone": "Téléphone",
    "contact.email": "E-mail",
    "contact.subject": "Objet",
    "contact.message": "Message",
    "contact.send": "Envoyer la demande",
    "contact.sent": "Merci ! Votre demande a bien été envoyée.",
    "contact.info.phone": "Téléphone",
    "contact.info.email": "E-mail",
    "contact.info.location": "Localisation",
    "contact.info.locationVal": "Maroc",

    "footer.tagline":
      "Cabinet marocain de conseil en Santé et Sécurité au Travail. Formations, audits et systèmes de management HSE.",
    "footer.quick": "Liens rapides",
    "footer.trainingCol": "Formations",
    "footer.consultingCol": "Conseil",
    "footer.contactCol": "Contact",
    "footer.rights": "Tous droits réservés.",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions générales",

    "cookie.text":
      "Nous utilisons des cookies pour améliorer votre expérience. En poursuivant votre navigation, vous acceptez notre politique.",
    "cookie.accept": "J'accepte",
    "cookie.decline": "Refuser",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.training": "Training",
    "nav.consulting": "HSE Consulting",
    "nav.references": "References",
    "nav.contact": "Contact",
    "nav.quote": "Request a Quote",

    "hero.eyebrow": "AT SAFETY PRIVE",
    "hero.title1": "Health & Safety Training",
    "hero.title2": "Consulting",
    "hero.title3": "HSE Audits",
    "hero.subtitle":
      "AT SAFETY PRIVE is a Moroccan consulting firm specialized in Occupational Health and Safety Training, Risk Prevention, Regulatory Compliance and HSE Management Systems.",
    "hero.cta1": "Discover our Training",
    "hero.cta2": "Request a Quote",
    "hero.cta3": "Contact Us",
    "hero.badge1": "Experienced Trainers",
    "hero.badge2": "Regulatory Compliance",
    "hero.badge3": "Nationwide Services",

    "about.title": "About AT SAFETY PRIVE",
    "about.p1":
      "AT SAFETY PRIVE is a Moroccan consulting firm specialized in Occupational Health and Safety.",
    "about.p2":
      "Created by experts from Civil Protection, HSE Engineering and Occupational Medicine, our mission is to help companies prevent workplace accidents, protect employees and build a strong safety culture.",
    "about.support": "We support organizations through:",
    "about.value1.t": "Prevention",
    "about.value1.d": "Anticipate risks before they turn into accidents.",
    "about.value2.t": "Professionalism",
    "about.value2.d": "A commitment to quality at every step.",
    "about.value3.t": "Field Expertise",
    "about.value3.d": "Deep knowledge of industrial environments.",
    "about.value4.t": "Commitment to Safety",
    "about.value4.d": "People's safety at the core of everything we do.",

    "training.title": "Our Training Programs",
    "training.subtitle": "Programs tailored to your teams and working environments.",
    "training.learn": "Learn More",

    "consulting.title": "Consulting & Audits",
    "consulting.subtitle": "Structured support to build a safe and compliant organization.",

    "why.title": "Why Choose Us",
    "why.subtitle": "Measurable results in service of your teams' safety.",
    "why.stat1": "Employees Trained",
    "why.stat2": "Companies Supported",
    "why.stat3": "Client Satisfaction",
    "why.stat4": "Years of Experience",

    "industries.title": "Industries We Serve",
    "industries.subtitle": "Our expertise adapts to the specific challenges of each sector.",

    "process.title": "Our Process",
    "process.subtitle": "A proven 5-step methodology.",
    "process.s1.t": "Needs Assessment",
    "process.s1.d": "Understanding your challenges and scoping the project.",
    "process.s2.t": "Site Visit",
    "process.s2.d": "On-site diagnostic of your facilities.",
    "process.s3.t": "Customized Proposal",
    "process.s3.d": "An offer tailored to your context.",
    "process.s4.t": "Training / Audit",
    "process.s4.d": "Operational delivery by our experts.",
    "process.s5.t": "Certification & Follow-up",
    "process.s5.d": "Certificates and ongoing support.",

    "references.title": "Client References",
    "references.subtitle":
      "Trusted by companies across Morocco in multiple industries.",

    "cta.title": "Let's Improve Workplace Safety Together.",
    "cta.subtitle": "Get a personalized proposal within 48 hours.",
    "cta.btn": "Request Your Free Quote",

    "contact.title": "Contact Us",
    "contact.subtitle": "Our team replies within one business day.",
    "contact.name": "Full Name",
    "contact.company": "Company",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Request",
    "contact.sent": "Thank you! Your request has been sent.",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.location": "Location",
    "contact.info.locationVal": "Morocco",

    "footer.tagline":
      "Moroccan consulting firm in Occupational Health and Safety. Training, audits and HSE management systems.",
    "footer.quick": "Quick Links",
    "footer.trainingCol": "Training",
    "footer.consultingCol": "Consulting",
    "footer.contactCol": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",

    "cookie.text":
      "We use cookies to improve your experience. By continuing you accept our policy.",
    "cookie.accept": "Accept",
    "cookie.decline": "Decline",
  },
};

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "fr",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (stored === "fr" || stored === "en") setLangState(stored);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };
  const t = (k: string) => {
    const v = dict[lang][k];
    return typeof v === "string" ? v : k;
  };
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
