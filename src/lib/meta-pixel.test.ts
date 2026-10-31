import { beforeEach, describe, expect, it, vi } from "vitest";

const store = new Map<string, string>();
let insertedScripts: string[];

const localStorageStub = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => void store.set(k, v),
  removeItem: (k: string) => void store.delete(k),
  clear: () => store.clear(),
};

const documentStub = {
  createElement: () => ({ async: false, src: "" }),
  getElementsByTagName: () => [
    { parentNode: { insertBefore: (s: { src: string }) => insertedScripts.push(s.src) } },
  ],
  head: { appendChild: (s: { src: string }) => insertedScripts.push(s.src) },
};

async function loadModule() {
  vi.resetModules();
  return await import("./meta-pixel");
}

beforeEach(() => {
  store.clear();
  insertedScripts = [];
  vi.stubGlobal("window", { localStorage: localStorageStub });
  vi.stubGlobal("document", documentStub);
});

describe("meta-pixel consent gating", () => {
  it("loads the base code with consent revoked when not accepted", async () => {
    const mp = await loadModule();
    expect(mp.initMetaPixel()).toBe(false);
    const fbq = (window as { fbq: { queue: unknown[][] } }).fbq;
    expect(fbq.queue[0]).toEqual(["consent", "revoke"]);
    expect(fbq.queue).not.toContainEqual(["consent", "grant"]);
    expect(insertedScripts).toHaveLength(1);
  });

  it("does not send events without consent", async () => {
    const mp = await loadModule();
    mp.trackLead();
    mp.trackContact();
    mp.trackPageView();
    const q = (window as { fbq?: { queue: unknown[][] } }).fbq?.queue ?? [];
    expect(q.filter((a) => a[0] === "track")).toHaveLength(0);
  });

  it("initializes once with the lovable agent after consent", async () => {
    store.set("cookie-consent", "accepted");
    const mp = await loadModule();
    expect(mp.initMetaPixel()).toBe(true);
    expect(mp.initMetaPixel()).toBe(true);
    expect(insertedScripts).toEqual(["https://connect.facebook.net/en_US/fbevents.js"]);
    const fbq = (window as { fbq: { queue: unknown[][] } }).fbq;
    expect(fbq.queue).toContainEqual(["consent", "grant"]);
    expect(fbq.queue).toContainEqual(["init", mp.META_PIXEL_ID, {}, { agent: "lovable" }]);
    expect(fbq.queue.filter((a) => a[0] === "init")).toHaveLength(1);
  });

  it("sends events only after consent", async () => {
    store.set("cookie-consent", "accepted");
    const mp = await loadModule();
    mp.trackContact();
    mp.trackLead();
    mp.trackViewContent("Sécurité Incendie");
    const fbq = (window as { fbq: { queue: unknown[][] } }).fbq;
    expect(fbq.queue).toContainEqual(["track", "Contact"]);
    expect(fbq.queue).toContainEqual(["track", "Lead"]);
    expect(fbq.queue).toContainEqual(["track", "ViewContent", { content_name: "Sécurité Incendie" }]);
  });
});
