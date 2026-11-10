import { z } from "zod";

/** Shared browser/server validation for the existing enquiry fields. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Veuillez indiquer votre nom (2 caractères min.)").max(100, "Nom : 100 caractères maximum."),
  company: z.string().trim().max(120, "Entreprise : 120 caractères maximum.").optional().or(z.literal("")),
  phone: z.string().trim().regex(/^\+?[0-9\s().-]{6,30}$/, "Numéro de téléphone invalide"),
  email: z.string().trim().email("Adresse e-mail invalide").max(255, "E-mail : 255 caractères maximum."),
  subject: z.string().trim().min(2, "Veuillez préciser le service ou la formation souhaité(e)").max(150, "Objet : 150 caractères maximum."),
  message: z.string().trim().min(10, "Votre message doit contenir au moins 10 caractères").max(2000, "Message : 2000 caractères maximum."),
});

export const leadSchema = enquirySchema.extend({
  form_type: z.string().trim().min(1).max(40).default("contact"),
});