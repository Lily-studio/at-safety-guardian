import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { StickyMobileCTA } from "@/components/site/StickyMobileCTA";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page introuvable / Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page recherchée n'existe pas. The page you're looking for doesn't exist.
        </p>
        <a href="/" className="mt-6 inline-flex btn-accent">Retour à l'accueil / Go home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Une erreur est survenue</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Veuillez réessayer ou revenir à l'accueil.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-accent">Réessayer</button>
          <a href="/" className="btn-primary-outline text-primary">Accueil</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AT Safety Prive — Formation & Conseil HSE au Maroc" },
      {
        name: "description",
        content:
          "Cabinet marocain de conseil en Santé et Sécurité au Travail : formations HSE, audits, prévention des risques et conformité réglementaire.",
      },
      { name: "author", content: "AT SAFETY PRIVE" },
      { name: "theme-color", content: "#0B2C4D" },
      { property: "og:site_name", content: "AT SAFETY PRIVE" },
      { property: "og:title", content: "AT Safety Prive — Formation & Conseil HSE" },
      {
        property: "og:description",
        content:
          "Formations Santé & Sécurité au Travail, audits HSE et conseil en conformité réglementaire au Maroc.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_MA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AT Safety Prive — HSE Consulting" },
      {
        name: "twitter:description",
        content: "Formations HSE, audits et conseil au Maroc.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AT SAFETY PRIVE",
          description:
            "Cabinet marocain de conseil en Santé et Sécurité au Travail, formations HSE, audits et conformité.",
          areaServed: "MA",
          address: { "@type": "PostalAddress", addressCountry: "MA" },
          email: "atsafetyprive@gmail.com",
          telephone: "+212666249070",
          sameAs: [],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "AT SAFETY PRIVE",
          image: "https://at-safety-guardian.lovable.app/brand/logo.jpeg",
          telephone: "+212666249070",
          email: "atsafetyprive@gmail.com",
          priceRange: "$$",
          address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const isAdmin = useRouterState({ select: (s) => s.location.pathname.startsWith("/admin") });
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        {isAdmin ? (
          <Outlet />
        ) : (
          <>
            <Header />
            <main id="main" className="pt-18">
              <Outlet />
            </main>
            <Footer />
            <CookieBanner />
            <StickyMobileCTA />
          </>
        )}
        <Toaster position="top-right" />
      </I18nProvider>
    </QueryClientProvider>
  );
}
