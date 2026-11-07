# Cultura de Innovación · la web

Sitio de [culturadeinnovacion.com](https://culturadeinnovacion.com): la app Brújula, el podcast y los servicios de consultoría. Construido con **TanStack Start v1** (React 19 + Vite) y **Tailwind CSS v4**, publicado en **Cloudflare Workers**.

- Guía para agentes y desarrolladores: [`CLAUDE.md`](CLAUDE.md)
- Deploy, DNS y rollback: [`docs/runbook.md`](docs/runbook.md)
- Estándares: [`docs/estandares/`](docs/estandares/) · Decisiones: [`docs/decisiones/`](docs/decisiones/)

## Requisitos

- [Bun](https://bun.sh) 1.x
- Cuenta de Cloudflare (solo para publicar)

## Correr en local

```sh
bun install
bun run dev        # http://localhost:8080
```

## Revisar antes de un PR

```sh
bun run lint
bun run test
bun run build      # genera .output/server (Worker) y dist/ (archivos estáticos)
```

## Publicar

Ver [`docs/runbook.md`](docs/runbook.md). En resumen, desde `main` actualizado:

```sh
bunx wrangler login     # una sola vez, con la cuenta de Cloudflare del sitio
bun run deploy          # = vite build && wrangler deploy
```
