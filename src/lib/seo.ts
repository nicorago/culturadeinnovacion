// Dirección canónica del sitio: la raíz, sin www (SEO: una sola versión de cada página).
export const SITE_URL = "https://culturadeinnovacion.com";
export const pageUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;
export const canonicalLink = (path: string) => ({ rel: "canonical", href: pageUrl(path) });
