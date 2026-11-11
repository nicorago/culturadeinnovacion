# Changelog

Una línea por cambio publicado. Lo más nuevo arriba. No se editan entradas históricas.

## 2026-11-10

- **feat(seo):** las direcciones del sitio anterior (WordPress) llevan a su página nueva con 301; `/habitacion-compartida` responde 410. Páginas 404, 410 y de error con el estilo sketchy: brújula dibujada a mano que gira desorientada (respeta movimiento reducido). (KAN-30)
- **docs(jira):** acceso de Claude a Jira KAN con token propio de hola@ (sin el conector compartido con la app Brújula). Plan SEO cargado como 5 épicas y 24 tarjetas (KAN-1 a KAN-29). `.claude/` fuera de git.
- **feat(seo):** `sitemap.xml`, línea Sitemap en `robots.txt`, canonical y `og:url` en las 5 páginas, apuntando a la raíz sin www.

## 2026-11-09

- **fix(marca):** favicon e íconos con fondo blanco (sin fondo no se veían bien en pestañas oscuras). Banners de LinkedIn en `docs/marca/`.
- **feat(marca):** logo "Ci" dibujado a mano en el header (PNG transparente sobre el crema). Favicon con el mismo logo y la C y la i acentuadas (reemplaza la brújula de #2). En celular el header muestra solo el logo para no chocar con el menú. Originales en `docs/marca/`.

## 2026-11-07

- **chore(github):** `main` protegida: solo por PR con "Revisiones" en verde, también para administradores; solo squash merge y la rama se borra al mezclar.

## 2026-11-06

- **ci:** GitHub Actions: lint, test y build en cada PR; preview por PR; deploy automático desde `main` con el mismo build y smoke test.
- **docs:** `CLAUDE.md` propio (aislamiento, flujo, carriles, Jira, contenido), estándares de web, UX y entrega continua, ADRs 0001–0002, runbook, lecciones. Se eliminan `AGENTS.md`, `roadmap.md` y `.lovable/` (restos de Lovable).
- **feat(dominio):** la web nueva está en `culturadeinnovacion.com` y `www` (Cloudflare Workers, Custom Domains sin comodín). DNS movido a Cloudflare sin cortar la app Brújula ni el correo. (#5)
- **fix(estilos):** vuelve el giro de los botones sketch, dibujado en una sola capa para no dejar costuras. (#4)
- **fix(estilos):** botones sketch sin rotación (reemplazado por #4). (#3)
- **feat(marca):** favicon de brújula (el mismo de la app Brújula) en vez del de Lovable. (#2)
- **fix(planes):** "Empezar gratis" lleva a la app Brújula; Plus y Empresarial abren un correo a hola@. `.gitattributes` con LF (el lint pasa de ~6.150 errores falsos a 0). (#1)
- **infra:** primer deploy del Worker en `culturadeinnovacion.hola-83e.workers.dev`.

## 2026-11-05

- **repo:** el código de Lovable se sube a `nicorago/culturadeinnovacion` y se hace público. Lovable queda desconectado.
- **correo:** `hola@culturadeinnovacion.com` pasa de un forward del hosting a Zoho Mail (MX, SPF, DKIM).
