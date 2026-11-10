import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl } from "./whatsapp";
const d = { name: "Élodie", company: "ACME", phone: "+212 600", email: "a@b.ma", subject: "Travail en hauteur", message: "Devis pour 10 personnes" };
describe("whatsapp", () => {
  it("targets company number", () => expect(buildWhatsAppUrl(d).startsWith("https://wa.me/212666249070?text=")).toBe(true));
  it("encodes all details", () => {
    const text = decodeURIComponent(buildWhatsAppUrl(d).split("text=")[1]);
    for (const v of Object.values(d)) expect(text).toContain(v);
  });
  it("encodes accents, ampersands, plus signs and line breaks without creating URL parameters", () => {
    const inquiry = { ...d, message: "Devis sécurité & audit + rappel\nÉquipe de Casablanca" };
    const url = new URL(buildWhatsAppUrl(inquiry));
    expect([...url.searchParams.keys()]).toEqual(["text"]);
    expect(url.searchParams.get("text")).toContain(inquiry.message);
  });
  it("rejects invalid required fields before building an external URL", () => {
    for (const field of ["name", "email", "phone", "subject", "message"]) {
      expect(() => buildWhatsAppUrl({ ...d, [field]: "" })).toThrow();
    }
  });
});
