import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  brujulaLd,
  canonicalLink,
  organizationLd,
  pageUrl,
  podcastLd,
  serviciosLd,
  shareImageMeta,
} from "@/lib/seo";

const PAGES = ["/", "/brujula", "/servicios", "/podcast", "/planes"];

describe("SEO", () => {
  it("la URL canónica es la raíz sin www", () => {
    expect(pageUrl("/")).toBe("https://culturadeinnovacion.com/");
    expect(canonicalLink("/brujula")).toEqual({
      rel: "canonical",
      href: "https://culturadeinnovacion.com/brujula",
    });
  });

  it("el sitemap lista todas las páginas públicas y robots.txt lo anuncia", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    for (const p of PAGES) expect(sitemap).toContain(`<loc>${pageUrl(p)}</loc>`);
    expect(sitemap).not.toContain("www.culturadeinnovacion");
    expect(readFileSync("public/robots.txt", "utf8")).toContain(
      "Sitemap: https://culturadeinnovacion.com/sitemap.xml",
    );
  });
});

describe("imagen al compartir (KAN-9)", () => {
  it.each(["inicio", "brujula", "servicios", "podcast", "planes"])(
    "%s tiene su imagen 1200x630 en public/og",
    (slug) => {
      expect(existsSync(`public/og/${slug}.jpg`)).toBe(true);
      const meta = shareImageMeta(slug, "alt");
      expect(meta).toContainEqual({
        property: "og:image",
        content: `https://culturadeinnovacion.com/og/${slug}.jpg`,
      });
      expect(meta).toContainEqual({
        name: "twitter:image",
        content: `https://culturadeinnovacion.com/og/${slug}.jpg`,
      });
    },
  );
});

describe("datos estructurados (KAN-10)", () => {
  const parse = (s: { children: string }) => JSON.parse(s.children);
  it("son JSON válido de schema.org y no tienen precios", () => {
    for (const ld of [organizationLd, brujulaLd, serviciosLd, podcastLd]) {
      expect(ld.type).toBe("application/ld+json");
      const data = parse(ld);
      expect(data["@context"]).toBe("https://schema.org");
      expect(ld.children).not.toMatch(/"price|offers/i);
    }
  });
  it("Brújula se llama por su nombre completo", () => {
    expect(parse(brujulaLd).name).toBe("Brújula de Innovación");
  });
});
