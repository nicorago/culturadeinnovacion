// Direcciones del sitio anterior (WordPress) que Google todavía conoce (KAN-30).
// Decisión de Nico (10-nov-2026). Agregar aquí nuevas direcciones viejas; no borrar sin revisar Search Console.

/** Dirección vieja (sin "/" final, en minúsculas) → página nueva. Responden 301. */
export const LEGACY_REDIRECTS: Record<string, string> = {
  "/about": "/",
  "/experiencia-mindfulness": "/servicios#human-momentum",
  "/category/uncategorized": "/",
  "/author/breathinout": "/",
};

/**
 * Direcciones viejas sin equivalente. El sitio las dibuja con la página "ya no existe"
 * (estilo sketchy) y el servidor cambia el código a 410 para que Google las olvide rápido.
 */
export const LEGACY_GONE = new Set(["/habitacion-compartida"]);

function normalize(pathname: string): string {
  const lower = pathname.toLowerCase();
  return lower.length > 1 ? lower.replace(/\/+$/, "") : lower;
}

export function isLegacyGone(pathname: string): boolean {
  return LEGACY_GONE.has(normalize(pathname));
}

/** Redirección 301 para una dirección del sitio viejo, o null si no corresponde. */
export function legacyRedirect(requestUrl: string): Response | null {
  const url = new URL(requestUrl);
  const target = LEGACY_REDIRECTS[normalize(url.pathname)];
  if (!target) return null;
  return new Response(null, {
    status: 301,
    headers: { location: new URL(target, url.origin).toString() },
  });
}

/** Convierte el 404 que dibuja el sitio en 410 cuando la dirección vieja ya no existe. */
export function markLegacyGone(requestUrl: string, response: Response): Response {
  if (response.status !== 404 || !isLegacyGone(new URL(requestUrl).pathname)) return response;
  return new Response(response.body, { status: 410, headers: response.headers });
}

/** www.culturadeinnovacion.com → la raíz, con la misma ruta y parámetros (KAN-8). */
export function wwwRedirect(requestUrl: string): Response | null {
  const url = new URL(requestUrl);
  if (url.hostname !== "www.culturadeinnovacion.com") return null;
  return new Response(null, {
    status: 301,
    headers: { location: `https://culturadeinnovacion.com${url.pathname}${url.search}` },
  });
}
