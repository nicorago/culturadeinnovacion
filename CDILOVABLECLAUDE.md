# Cultura de Innovación — Guía para Claude Code

Sitio web de **Cultura de Innovación** (empresa de Nicolás Ramírez) que presenta sus productos y servicios:
- **Brújula** — plataforma de Product Discovery basada en evidencia (Teresa Torres, Marty Cagan, Jake Knapp, Lean Startup). App real: https://brujula.culturadeinnovacion.com
- **Podcast Cultura de Innovación** — conversaciones con referentes de innovación en productos (Spotify, Apple Podcasts, YouTube).
- **Servicios** — Consultoría de Innovación y Discovery + programa Human Momentum (7 semanas).

Público principal: directores y gerentes de innovación y producto. También PMs, gerentes generales y emprendedores que validan ideas.

Este proyecto se creó en Lovable y ya no depende de Lovable: es un proyecto estándar Vite + TanStack Start que se despliega en Cloudflare Workers con wrangler. Lee también `AGENTS.md` y `README.md`.

Este sitio **no pide ni guarda datos personales**: no hay registro propio ni demo del producto. Todo registro/login ocurre en la app real de Brújula.

---

## 1. Stack

| Capa | Tecnología |
| --- | --- |
| Framework | TanStack Start v1 (React 19, SSR, server functions) |
| Build | Vite estándar (`vite.config.ts`: tanstackStart, @vitejs/plugin-react, @tailwindcss/vite, vite-tsconfig-paths, nitro solo en build) |
| Router | TanStack Router basado en archivos (`src/routes/`) |
| Estilos | Tailwind CSS v4, configurado solo en `src/styles.css` (`@theme`, sin `tailwind.config.js`) |
| UI | shadcn/ui (Radix) + lucide-react |
| Datos | @tanstack/react-query v5 (no hay backend/base de datos todavía) |
| Formularios | react-hook-form + zod |
| Tests | Vitest + Testing Library + jsdom (`src/test/`) |
| Runtime de producción | Cloudflare Workers (workerd), no Node. Nitro preset `cloudflare-module` → `.output/server`; páginas públicas y assets → `dist/` |
| Despliegue | wrangler (`wrangler.jsonc`) |
| Lenguaje | TypeScript, alias `@/` → `src/` |

### Comandos
```bash
bun install        # o npm install
bun run dev        # servidor de desarrollo
bun run test       # vitest run
bun run build      # build de producción
bun run lint
bun run deploy     # build + wrangler deploy (requiere `bunx wrangler login`)
```

---

## 2. Arquitectura

```text
src/
├── routes/
│   ├── __root.tsx        # Layout global, <head>, fuentes Google, Header/Footer
│   ├── index.tsx         # Home: propuesta de valor, Brújula + Podcast, audiencias, CTA
│   ├── brujula.tsx       # Landing Brújula: flujo de discovery, walkthrough animado, planes completos
│   ├── planes.tsx        # Planes Startup / Plus / Empresarial (sin precios)
│   ├── podcast.tsx       # Podcast + episodio destacado con Christina Wodtke
│   └── servicios.tsx     # Consultoría Discovery + Human Momentum
├── components/
│   ├── site.tsx                # Header, Footer, SketchButton, Hand, constante LINKS
│   ├── discovery-preview.tsx   # Walkthrough animado de 5 escenas (play/pausa/escenas)
│   ├── discovery-controls.tsx  # SketchAction y controles usados por el walkthrough
│   └── ui/                     # shadcn/ui
├── lib/
│   └── discovery-demo.ts       # Datos del ejemplo (parqueo en centros comerciales) usados por el walkthrough
├── assets/                     # Ilustraciones sketchy (hero-team, podcast-sketch, discovery-path)
├── styles.css                  # Tokens de diseño y utilidades sketchy
├── server.ts / start.ts       # Entrada SSR con página de error y middlewares
└── routeTree.gen.ts            # GENERADO — no editar
```

### Reglas técnicas
- Usar solo `@tanstack/react-router` (`Link`, `useNavigate`, `createFileRoute`). Nunca `react-router-dom`, ni `src/pages`, ni `App.tsx`.
- Cada ruta nueva = archivo en `src/routes/`. Cada página debe definir su propio `head()` (title, description, og:title, og:description).
- No existen rutas `/app`, `/app/idea` ni `/registro`: no volver a crearlas. El sitio no debe pedir ni guardar datos personales.
- El walkthrough de `/brujula` es ilustrativo: la "AI" es simulada y la autoentrevista nunca cuenta como evidencia real.
- Sin dependencias de Lovable (`@lovable.dev/*`, `lovable-tagger`): no agregarlas.
- Los datos del ejemplo viven en `src/lib/discovery-demo.ts`, no en las rutas.
- El walkthrough es animación de interfaz accesible (no video), respeta `prefers-reduced-motion`.
- Código de servidor corre en workerd: evitar APIs exclusivas de Node.
- Colores siempre con tokens semánticos de `styles.css`; no hardcodear `bg-[#...]`, `text-white`, etc.
- Fuentes web se cargan con `<link>` en `__root.tsx`, nunca `@import` remoto en `styles.css`.

---

## 3. Sistema de diseño "sketchy" (estilo libro Design Sprint)

Simple, minimalista, cálido y algo divertido, con dibujos hechos a mano.

- **Tipografías:** Bricolage Grotesque (títulos), Figtree (texto), Caveat (manuscrita, `.font-hand`).
- **Paleta:** fondo crema (~`#f6f1e7`), tinta oscura, acento terracota/naranja, amarillo rotulador.
- **Utilidades en `styles.css`:** `.sketch` (bordes irregulares a mano), `.sketch-shadow` (sombra sólida desplazada), `.marker` (subrayado rotulador), `.wobble` (rotación leve), más `.discovery-progress`, `.ost-stem` y keyframes del walkthrough.
- **Componentes:** `SketchButton` (3 variantes; agrega `target="_blank"` solo a URLs externas), `Hand` (texto manuscrito).
- Ilustraciones nuevas: estilo boceto a tinta sobre fondo crema, coherente con `src/assets/`.

---

## 4. Reglas de negocio (fuentes de verdad)

- **No inventar contenido** sobre Human Momentum o Brújula: tomarlo de humanmomentum.org/momentum, humanmomentum.org/empresas, brujula.culturadeinnovacion.com, o preguntar a Nicolás.
- **Precios:** nunca mostrar precios.
  - Startup: Gratis (1 usuario, 1 idea).
  - Plus: "Consúltanos" (1 usuario, hasta 100 ideas) — recomendado.
  - Empresarial: "A medida · consúltanos" (varios usuarios y roles, ideas sin límite, onboarding acompañado).
  - Todos: Coach AI incluido (Product Discovery, Lean Startup, análisis de viabilidad, outcome-based roadmaps).
- **Enlaces a la app real:**
  - "Empezar gratis" / "Elegir Plus" / "Contactar a ventas" → `https://brujula.culturadeinnovacion.com/registro?plan=startup|plus|empresarial`
  - "Entrar" → `https://brujula.culturadeinnovacion.com/login`
  - Los enlaces externos se abren en pestaña nueva (`target="_blank" rel="noreferrer"`).
- **Contacto:** `hola@culturadeinnovacion.com` en todos los CTA de contacto.
- **Human Momentum:** 7 semanas reales — Pausar, Humanizar, Observar, Empatizar, Escuchar, Comunicar, Motivarse. Fases: 1 Auto-conexión (sem. 1–2), 2 Inter-conexión (sem. 3–5), 3 Sostener los hábitos (sem. 6–7). 15 min de práctica diaria, 1 h de capacitación semanal, workshop de 4 h. Entregables: certificado de participación, certificado de horas en Comunicación No Violenta, libro digital.
- **Podcast:** conducido por Nicolás Ramírez.
  - Spotify: https://open.spotify.com/show/6097vhyGcbi3YMUUQUANE1
  - YouTube: https://www.youtube.com/@culturadeinnovacion
  - Episodio destacado con Christina Wodtke: https://open.spotify.com/episode/7mZjqPUe2lz5lvY3FNpPtj
- **Ejemplo del walkthrough:** contenido inventado autorizado (idea de parqueo en centros comerciales, persona "Valeria"). Las entrevistas simuladas son hipótesis, no evidencia validada.

---

## 5. Despliegue y Git

- Despliegue: `bun run deploy` (o `bun run build && bunx wrangler deploy`). Nitro genera `.output/server/wrangler.json`; `wrangler.jsonc` en la raíz define nombre, flags y assets en `dist/`. Las cinco rutas públicas se prerenderizan en `dist/` para permitir también publicación estática en Lovable, sin paquetes propios de Lovable.
- Dominio: configurar `culturadeinnovacion.com` como Custom Domain del Worker en el panel de Cloudflare.
- Si la sincronización con Lovable sigue activa: no hacer `git push --force` ni reescribir commits publicados.
- No editar `src/routeTree.gen.ts` a mano.
- Antes de terminar un cambio: `bun run test`, `bun run lint` y `bun run build`.
