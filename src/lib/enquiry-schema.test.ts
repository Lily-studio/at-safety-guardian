import { describe, expect, it } from "vitest";
import { enquirySchema, leadSchema } from "./enquiry-schema";

const valid = { name: "Élodie", company: "ACME", phone: "+212 666 249 070", email: "test@example.com", subject: "Formation HSE", message: "Devis pour dix personnes" };
describe("shared enquiry validation", () => {
  for (const field of ["name", "email", "phone", "subject", "message"]) {
    it(`requires ${field} on client and server`, () => {
      expect(enquirySchema.safeParse({ ...valid, [field]: "" }).success).toBe(false);
      expect(leadSchema.safeParse({ ...valid, [field]: "" }).success).toBe(false);
    });
  }
  it("rejects over-limit values instead of truncating client enquiries", () => {
    for (const [field, max] of Object.entries({ name: 100, company: 120, phone: 30, email: 255, subject: 150, message: 2000 })) {
      expect(leadSchema.safeParse({ ...valid, [field]: "x".repeat(max + 1) }).success).toBe(false);
    }
  });
  it("preserves every completed field and the WhatsApp lead type", () => {
    expect(leadSchema.parse({ ...valid, form_type: "contact_whatsapp" })).toEqual({ ...valid, form_type: "contact_whatsapp" });
  });
});