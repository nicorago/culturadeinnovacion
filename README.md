# Cultura de Innovación

Sitio web de Cultura de Innovación: Brújula, el podcast y los servicios. Construido con **TanStack Start v1** (React 19 + Vite) y **Tailwind CSS v4**, desplegado en **Cloudflare Workers**. Guía detallada para agentes/desarrolladores: `CDILOVABLECLAUDE.md`.

## Requisitos

- [Bun](https://bun.sh) 1.x (o Node.js 22+ con npm)
- Cuenta de Cloudflare (solo para desplegar)

## Instalar y correr en local

```sh
bun install
bun run dev        # http://localhost:8080
```

## Tests, lint y build

```sh
bun run test       # Vitest
bun run lint       # ESLint + Prettier
bun run build      # genera .output/server (Worker) y dist/ (páginas y archivos estáticos)
bun run preview    # sirve el build localmente
```

## Desplegar en Cloudflare Workers

La configuración está en `wrangler.jsonc`. El build usa Nitro con el preset `cloudflare-module` y deja el Worker en `.output/server` y los assets en `dist/`. Las cinco páginas públicas se prerenderizan en `dist/`, compatible también con publicación estática en Lovable, sin dependencias de Lovable.

```sh
bunx wrangler login     # una sola vez
bun run deploy          # = vite build && wrangler deploy
```

Para usar el dominio propio, en el panel de Cloudflare abre el Worker `culturadeinnovacion` → Settings → Domains & Routes → Add Custom Domain (`culturadeinnovacion.com`). El dominio debe estar gestionado en Cloudflare.

Para desplegar automáticamente desde GitHub, conecta el repositorio en Cloudflare (Workers → Create → Import a repository) con build command `bun run build` y deploy command `bunx wrangler deploy`.
