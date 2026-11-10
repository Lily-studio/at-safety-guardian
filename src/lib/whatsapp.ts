import { enquirySchema } from "./enquiry-schema";

export const COMPANY_WHATSAPP = "212666249070";

export const WHATSAPP_GREETING =
  "Bonjour AT SAFETY PRIVE, je souhaite obtenir des informations sur vos services.";

export type WhatsAppInquiry = {
  name: string;
  company?: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

export function buildWhatsAppMessage(d: WhatsAppInquiry): string {
  d = enquirySchema.parse(d);
  return [
    "Bonjour AT SAFETY PRIVE,",
    "",
    "Je souhaite vous contacter concernant une demande de service.",
    "",
    `Nom : ${d.name}`,
    `Entreprise : ${d.company?.trim() || "—"}`,
    `Téléphone : ${d.phone}`,
    `E-mail : ${d.email}`,
    `Service demandé : ${d.subject}`,
    `Message : ${d.message}`,
    "",
    "Merci de me recontacter concernant ma demande.",
    "",
    "Cordialement,",
    d.name,
  ].join("\n");
}

export function buildWhatsAppUrl(d: WhatsAppInquiry): string {
  return `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(buildWhatsAppMessage(d))}`;
}
