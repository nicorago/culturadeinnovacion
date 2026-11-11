// Dirección canónica del sitio: la raíz, sin www (SEO: una sola versión de cada página).
export const SITE_URL = "https://culturadeinnovacion.com";
export const pageUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;
export const canonicalLink = (path: string) => ({ rel: "canonical", href: pageUrl(path) });

/**
 * Imagen al compartir en LinkedIn, WhatsApp, X, etc. (KAN-9). Las imágenes viven en public/og/
 * (1200x630) y se generan con la plantilla de .tmp/og (ver docs/marca/README.md).
 */
export const shareImageMeta = (slug: string, alt: string) => {
  const url = `${SITE_URL}/og/${slug}.jpg`;
  return [
    { property: "og:image", content: url },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: alt },
    { name: "twitter:image", content: url },
    { name: "twitter:image:alt", content: alt },
  ];
};

/** Datos estructurados (schema.org) como <script type="application/ld+json"> (KAN-10). */
export const jsonLd = (data: Record<string, unknown>) => ({
  type: "application/ld+json",
  children: JSON.stringify({ "@context": "https://schema.org", ...data }),
});

const ORG_ID = `${SITE_URL}/#organizacion`;
const PERSON_ID = `${SITE_URL}/#nicolas-ramirez`;
const SPOTIFY = "https://open.spotify.com/show/6097vhyGcbi3YMUUQUANE1";
const YOUTUBE = "https://www.youtube.com/@culturadeinnovacion";
const APPLE = "https://podcasts.apple.com/cl/podcast/cultura-de-innovaci%C3%B3n/id1775589584";
const LINKEDIN = "https://www.linkedin.com/company/cultura-de-innovacion";
const AREA = [
  { "@type": "Country", name: "Ecuador" },
  { "@type": "Place", name: "Latinoamérica" },
];

/** Quiénes somos: va en todas las páginas. Sin precios ni datos que no estén en la web. */
export const organizationLd = jsonLd({
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Cultura de Innovación",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo-ci.png`,
      email: "hola@culturadeinnovacion.com",
      founder: { "@id": PERSON_ID },
      areaServed: AREA,
      sameAs: [LINKEDIN, SPOTIFY, APPLE, YOUTUBE],
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Nicolás Ramírez",
      worksFor: { "@id": ORG_ID },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#sitio`,
      name: "Cultura de Innovación",
      url: `${SITE_URL}/`,
      inLanguage: "es",
      publisher: { "@id": ORG_ID },
    },
  ],
});

export const brujulaLd = jsonLd({
  "@type": "SoftwareApplication",
  name: "Brújula de Innovación",
  url: "https://brujula.culturadeinnovacion.com/",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "es",
  description:
    "Valida tu idea con clientes reales antes de construirla: guía para entrevistar, convertir lo que escuchas en oportunidades y decidir con evidencia.",
  publisher: { "@id": ORG_ID },
});

export const serviciosLd = jsonLd({
  "@graph": [
    {
      "@type": "Service",
      name: "Consultoría de Innovación y Discovery",
      serviceType: "Consultoría de innovación",
      provider: { "@id": ORG_ID },
      areaServed: AREA,
      url: pageUrl("/servicios"),
    },
    {
      "@type": "Service",
      name: "Human Momentum",
      serviceType: "Programa de inteligencia emocional y comunicación empática",
      description:
        "Programa de 7 semanas: 15 minutos diarios, 1 hora semanal y un workshop de 4 horas.",
      provider: { "@id": ORG_ID },
      areaServed: AREA,
      url: `${pageUrl("/servicios")}#human-momentum`,
    },
  ],
});

export const podcastLd = jsonLd({
  "@type": "PodcastSeries",
  name: "Cultura de Innovación",
  url: pageUrl("/podcast"),
  inLanguage: "es",
  author: { "@id": PERSON_ID },
  publisher: { "@id": ORG_ID },
  sameAs: [SPOTIFY, APPLE, YOUTUBE],
});
