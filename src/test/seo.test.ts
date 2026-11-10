import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { canonicalLink, pageUrl } from "@/lib/seo";

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
