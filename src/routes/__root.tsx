import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header, Footer } from "@/components/site";
import { LostPage } from "@/components/lost-page";
import { isLegacyGone } from "@/lib/redirects";
import { organizationLd } from "@/lib/seo";

function NotFoundComponent() {
  const { pathname } = useLocation();
  // Direcciones del sitio anterior sin equivalente: el servidor responde 410 con esta misma página.
  if (isLegacyGone(pathname)) {
    return (
      <LostPage
        code="410"
        title="Esta página ya no existe"
        note="Era parte del sitio anterior. Nos mudamos, y ella no vino con nosotros."
      />
    );
  }
  return (
    <LostPage
      code="404"
      title="Esta página se perdió en el mapa"
      note="Hasta las mejores brújulas se marean a veces."
    />
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <LostPage
      code="¡Ups!"
      title="Esta página no cargó"
      note="Se nos rompió la punta del lápiz. Ya la estamos afilando."
    >
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="sketch sketch-shadow wobble mt-8 bg-accent px-6 py-3 font-semibold text-accent-foreground"
      >
        Intentar de nuevo
      </button>
    </LostPage>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cultura de Innovación" },
      {
        name: "description",
        content:
          "Innovación basada en evidencia con clientes: Brújula y el podcast Cultura de Innovación.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Cultura de Innovación" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    // Quiénes somos para Google (schema.org, KAN-10).
    scripts: [organizationLd],
    links: [
      { rel: "stylesheet", href: appCss },
      // Logo "Ci" con la C y la i acentuadas (fuente en docs/marca/): .ico 16/32/48, PNG 192 y PNG para iPhone.
      { rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { rel: "icon", href: "/icon.png", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Caveat:wght@500;700&family=Figtree:wght@400;500;600&display=swap",
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
    <html lang="es">
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
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
