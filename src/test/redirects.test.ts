import { describe, expect, it } from "vitest";
import { isLegacyGone, legacyRedirect, markLegacyGone, wwwRedirect } from "@/lib/redirects";
import { renderErrorPage } from "@/lib/error-page";

const BASE = "https://culturadeinnovacion.com";

describe("direcciones del sitio anterior (KAN-30)", () => {
  it.each([
    ["/about/", "/"],
    ["/experiencia-mindfulness", "/servicios#human-momentum"],
    ["/experiencia-mindfulness/", "/servicios#human-momentum"],
    ["/category/uncategorized/", "/"],
    ["/author/breathinout/", "/"],
  ])("%s responde 301 a %s", (from, to) => {
    const res = legacyRedirect(BASE + from);
    expect(res?.status).toBe(301);
    expect(res?.headers.get("location")).toBe(BASE + to);
  });

  it.each([
    "/",
    "/servicios",
    "/brujula",
    "/sitemap.xml",
    "/wp-login.php",
    "/habitacion-compartida",
  ])("%s no se redirige", (path) => {
    expect(legacyRedirect(BASE + path)).toBeNull();
  });

  it.each(["/habitacion-compartida", "/habitacion-compartida/"])(
    "%s: el 404 del sitio se convierte en 410",
    (path) => {
      expect(isLegacyGone(path)).toBe(true);
      const page = new Response("<html>ya no existe</html>", {
        status: 404,
        headers: { "content-type": "text/html" },
      });
      expect(markLegacyGone(BASE + path, page).status).toBe(410);
    },
  );

  it("un 404 normal sigue siendo 404", () => {
    const page = new Response("x", { status: 404 });
    expect(markLegacyGone(BASE + "/no-existe", page).status).toBe(404);
  });

  it("la página de error grave está en español y con la marca", () => {
    const html = renderErrorPage();
    expect(html).toContain('lang="es"');
    expect(html).toContain("Esta página no cargó");
    expect(html).toContain("Caveat");
  });
});

describe("www a la raíz (KAN-8)", () => {
  it("www responde 301 a la misma ruta en la raíz, con parámetros", () => {
    const res = wwwRedirect("https://www.culturadeinnovacion.com/podcast?utm_source=x");
    expect(res?.status).toBe(301);
    expect(res?.headers.get("location")).toBe(
      "https://culturadeinnovacion.com/podcast?utm_source=x",
    );
  });
  it.each([
    "https://culturadeinnovacion.com/",
    "https://culturadeinnovacion.hola-83e.workers.dev/",
    "https://pr-9-culturadeinnovacion.hola-83e.workers.dev/servicios",
    "https://brujula.culturadeinnovacion.com/login",
  ])("%s no se toca", (u) => {
    expect(wwwRedirect(u)).toBeNull();
  });
});
