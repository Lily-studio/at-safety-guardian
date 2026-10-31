import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { hasAdsConsent, initMetaPixel, loadMetaPixelBase, trackPageView } from "@/lib/meta-pixel";

/**
 * Fires one PageView per visited path (including client-side navigation),
 * only when the visitor has accepted cookies.
 */
export function MetaPixelTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    loadMetaPixelBase();
    if (!hasAdsConsent()) {
      lastPath.current = null;
      return;
    }
    if (!initMetaPixel()) return;
    if (lastPath.current === pathname) return; // no duplicate PageView
    lastPath.current = pathname;
    trackPageView();
  }, [pathname]);

  return null;
}
