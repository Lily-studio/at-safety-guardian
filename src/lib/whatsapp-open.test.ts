import { afterEach, describe, expect, it, vi } from "vitest";
import { openWhatsApp } from "./whatsapp-open";

afterEach(() => vi.unstubAllGlobals());
describe("WhatsApp user-gesture opening", () => {
  it("opens the destination immediately and detaches the opener", () => {
    const replace = vi.fn();
    const tab = { closed: false, opener: {}, location: { replace } };
    const open = vi.fn(() => tab);
    vi.stubGlobal("window", { open });
    expect(openWhatsApp("https://wa.me/212666249070?text=Bonjour")).toBe(true);
    expect(open).toHaveBeenCalledWith("", "_blank");
    expect(tab.opener).toBeNull();
    expect(replace).toHaveBeenCalledWith("https://wa.me/212666249070?text=Bonjour");
  });
  it("reports popup blocking", () => {
    vi.stubGlobal("window", { open: () => null });
    expect(openWhatsApp("https://wa.me/212666249070?text=Bonjour")).toBe(false);
  });
  it("reports opening exceptions", () => {
    vi.stubGlobal("window", { open: () => { throw new Error("blocked"); } });
    expect(openWhatsApp("https://wa.me/212666249070?text=Bonjour")).toBe(false);
  });
});