# Cultura de Innovación — Guía para Claude Code

Sitio web de **Cultura de Innovación** (empresa de Nicolás Ramírez) que presenta sus productos y servicios:
- **Brújula** — plataforma de Product Discovery basada en evidencia (Teresa Torres, Marty Cagan, Jake Knapp, Lean Startup). App real: https://brujula.culturadeinnovacion.com
- **Podcast Cultura de Innovación** — conversaciones con referentes de innovación en productos (Spotify, Apple Podcasts, YouTube).
- **Servicios** — Consultoría de Innovación y Discovery + programa Human Momentum (7 semanas).

Público principal: directores y gerentes de innovación y producto. También PMs, gerentes generales y emprendedores que validan ideas.

Este proyecto se creó en Lovable y está sincronizado con GitHub. Lee también `AGENTS.md`.

---

## 1. Stack

| Capa | Tecnología |
| --- | --- |
| Framework | TanStack Start v1 (React 19, SSR, server functions) |
| Build | Vite (config vía `@lovable.dev/vite-tanstack-config` en `vite.config.ts`) |
| Router | TanStack Router basado en archivos (`src/routes/`) |
| Estilos | Tailwind CSS v4, configurado solo en `src/styles.css` (`@theme`, sin `tailwind.config.js`) |
| UI | shadcn/ui (Radix) + lucide-react |
| Datos | @tanstack/react-query v5 (no hay backend/base de datos todavía) |
| Formularios | react-hook-form + zod |
| Tests | Vitest + Testing Library + jsdom (`src/test/`) |
| Runtime de producción | Edge (Cloudflare Workers / workerd), no Node |
| Lenguaje | TypeScript, alias `@/` → `src/` |

### Comandos
```bash
bun install        # o npm install
bun run dev        # servidor de desarrollo
bun run test       # vitest run
bun run build      # build de producción
bun run lint
```

---

## 2. Arquitectura

```text
src/
├── routes/
│   ├── __root.tsx        # Layout global, <head>, fuentes Google, Header/Footer (ocultos en /app/*)
│   ├── index.tsx         # Home: propuesta de valor, Brújula + Podcast, audiencias, CTA
│   ├── brujula.tsx       # Landing Brújula: flujo de discovery, walkthrough animado, planes completos
│   ├── planes.tsx        # Planes Startup / Plus / Empresarial (sin precios)
│   ├── podcast.tsx       # Podcast + episodio destacado con Christina Wodtke
│   ├── servicios.tsx     # Consultoría Discovery + Human Momentum
│   ├── registro.tsx      # Registro demo (nombre, email, celular)
│   ├── app.tsx           # DEMO: dashboard "Mis oportunidades"
│   └── app_.idea.tsx     # DEMO: flujo "Tengo una idea" a pantalla completa (/app/idea)
├── components/
│   ├── site.tsx                # Header, Footer, SketchButton, Hand, constante LINKS
│   ├── discovery-preview.tsx   # Walkthrough animado de 5 escenas (play/pausa/escenas)
│   ├── discovery-workflow.tsx  # Flujo interactivo: idea → hipótesis → entrevista → artefactos AI → OST → soluciones → experimento
│   ├── discovery-controls.tsx  # SketchAction, EditableText, HypothesisTag
│   └── ui/                     # shadcn/ui
├── lib/
│   └── discovery-demo.ts       # Datos del ejemplo (parqueo en centros comerciales) compartidos por demo y walkthrough
├── assets/                     # Ilustraciones sketchy (hero-team, podcast-sketch, discovery-path)
├── styles.css                  # Tokens de diseño y utilidades sketchy
└── routeTree.gen.ts            # GENERADO — no editar
```

### Reglas técnicas
- Usar solo `@tanstack/react-router` (`Link`, `useNavigate`, `createFileRoute`). Nunca `react-router-dom`, ni `src/pages`, ni `App.tsx`.
- Cada ruta nueva = archivo en `src/routes/`. Cada página debe definir su propio `head()` (title, description, og:title, og:description).
- `app_.idea.tsx` es una ruta no anidada (el `_` evita heredar el layout de `app.tsx`).
- El demo de discovery es 100% cliente y está marcado como demo: la "AI" es simulada (no hay llamadas a modelos) y la autoentrevista nunca cuenta como evidencia real.
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
  - `/app` y `/app/idea` de este sitio son **solo demo de diseño**, accesibles desde el walkthrough ("Explorar el ejemplo").
- **Contacto:** `hola@culturadeinnovacion.com` en todos los CTA de contacto.
- **Human Momentum:** 7 semanas reales — Pausar, Humanizar, Observar, Empatizar, Escuchar, Comunicar, Motivarse. Fases: 1 Auto-conexión (sem. 1–2), 2 Inter-conexión (sem. 3–5), 3 Sostener los hábitos (sem. 6–7). 15 min de práctica diaria, 1 h de capacitación semanal, workshop de 4 h. Entregables: certificado de participación, certificado de horas en Comunicación No Violenta, libro digital.
- **Podcast:** conducido por Nicolás Ramírez.
  - Spotify: https://open.spotify.com/show/6097vhyGcbi3YMUUQUANE1
  - YouTube: https://www.youtube.com/@culturadeinnovacion
  - Episodio destacado con Christina Wodtke: https://open.spotify.com/episode/7mZjqPUe2lz5lvY3FNpPtj
- **Ejemplo del demo:** contenido inventado autorizado (idea de parqueo en centros comerciales, persona "Valeria"). Las entrevistas simuladas son hipótesis, no evidencia validada.

---

## 5. Trabajo con Git y Lovable

- La rama conectada se sincroniza en ambos sentidos con Lovable: mantenerla siempre compilando.
- No hacer `git push --force` ni reescribir commits ya publicados (rebase, amend, squash): se pierde el historial en Lovable.
- No editar `src/routeTree.gen.ts` a mano.
- Antes de terminar un cambio: `bun run test` y `bun run build`.
