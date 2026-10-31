// Meta Pixel (ID 4581382645443350) for AT SAFETY PRIVE.
// The pixel script is loaded ONLY after the visitor explicitly accepts cookies
// (localStorage "cookie-consent" === "accepted"). Without consent nothing is
// loaded and no event is sent. No personal form data is ever sent to Meta.

export const META_PIXEL_ID = "4581382645443350";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let scriptLoaded = false;

export function hasAdsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("cookie-consent") === "accepted";
  } catch {
    return false;
  }
}

function dispatch(args: unknown[]) {
  const fbq = window.fbq;
  if (!fbq) return;
  if (typeof fbq.callMethod === "function") fbq.callMethod.apply(fbq, args);
  else fbq.queue.push(args);
}

let granted = false;

/**
 * Meta Consent Mode: loads the base code once with consent REVOKED by default,
 * so Meta's tools can detect the pixel, but no hits are sent until the visitor accepts.
 */
export function loadMetaPixelBase(): void {
  if (typeof window === "undefined") return;
  if (!window.fbq) {
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod.apply(n, args);
      else n.queue.push(args);
    } as Fbq;
    n.queue = [];
    n.loaded = true;
    n.version = "2.0";
    window.fbq = n;
    if (!window._fbq) window._fbq = n;
  }
  if (!scriptLoaded) {
    scriptLoaded = true;
    // Returning visitors who already accepted start granted. Queuing
    // revoke -> init -> grant before fbevents.js loads silently breaks the pixel.
    if (hasAdsConsent()) {
      granted = true;
      dispatch(["consent", "grant"]);
    } else {
      dispatch(["consent", "revoke"]);
    }
    dispatch(["init", META_PIXEL_ID, {}, { agent: "lovable" }]);
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    const first = document.getElementsByTagName("script")[0];
    if (first?.parentNode) first.parentNode.insertBefore(s, first);
    else document.head.appendChild(s);
  }
}

/** Grants consent when the visitor accepted. Returns false when consent is missing. */
export function initMetaPixel(): boolean {
  if (typeof window === "undefined") return false;
  loadMetaPixelBase();
  if (!hasAdsConsent()) return false;
  if (!granted) {
    granted = true;
    dispatch(["consent", "grant"]);
  }
  return true;
}

/** Stops pixel hits when the visitor withdraws consent. */
export function revokeMetaPixelConsent() {
  granted = false;
  if (typeof window === "undefined" || !window.fbq) return;
  dispatch(["consent", "revoke"]);
}

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !hasAdsConsent()) return;
  if (!initMetaPixel()) return;
  dispatch(params ? ["track", event, params] : ["track", event]);
}

export const trackPageView = () => track("PageView");
export const trackViewContent = (contentName: string) =>
  track("ViewContent", { content_name: contentName });
export const trackContact = () => track("Contact");
export const trackLead = () => track("Lead");
