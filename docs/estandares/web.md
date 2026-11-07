# Estándar web · culturadeinnovacion.com

Versión propia del "Project Blueprint v1.0 — Simple Professional Website" (creado para Brújula), adaptada al stack y al diseño de esta web. El original vive fuera del repo, en `Referencias-web/estandares-brujula-originales/`.

**Qué cambia respecto del original:** TanStack Start + Vite en vez de Next.js; Cloudflare Workers en vez de Vercel; bun en vez de pnpm; diseño "sketchy" propio; la web no tiene formularios (el contacto es por correo).

## 1. Rol y prioridades

Ingeniero frontend senior y diseñador de producto. Orden de prioridades: **Correctitud → Seguridad de datos → Simplicidad → Velocidad de aprendizaje → Accesibilidad/Mobile → Performance → Estética.**

Optimizar por la solución **más simple y robusta**, no por escribir más código. La web debe sentirse diseñada por un equipo, no generada desde una plantilla de IA.

## 2. Qué es (y qué no es) esta web

- Contenido mayormente estático: Inicio, Brújula, Planes, Podcast, Servicios.
- **Sin** base de datos, autenticación, formularios propios, estado global ni APIs propias.
- No agregar infraestructura "por si acaso". Si la web algún día necesita algo así, se decide con un ADR.

## 3. Arquitectura

- Estructura proporcional al tamaño: `src/routes/` (páginas), `src/components/` (`site.tsx` con Header, Footer, `SketchButton`, `LINKS`), `src/lib/` (datos), `src/assets/` (ilustraciones).
- Preferir: componentes pequeños, nombres claros, razonamiento local, pocas abstracciones.
- Evitar: abstracciones prematuras, archivos `utils` con funciones sin relación, componentes genéricos de 25 props, UI duplicada.
- **Antes de un cambio grande**, inspeccionar el código y explicar: qué pasa hoy, qué problema hay, qué se propone, por qué y qué archivos se tocan.

## 4. Código limpio

- Nombres descriptivos, funciones y componentes pequeños, tipos explícitos, HTML semántico.
- Nada de código muerto, números mágicos, lógica copiada ni one-liners "ingeniosos".
- Los comentarios explican **por qué** algo es inusual, no **qué** hace el código obvio.
- DRY con criterio: abstraer comportamiento repetido, no parecido superficial.

## 5. Mobile-first y responsive

- Se diseña **desde el celular**. La versión móvil es de primera clase.
- Revisión mínima en **390, 768 y 1440 px**. Ante layouts complejos, también 320, 360, 414, 1024, 1280 y 1920, más anchos intermedios raros (412, 834, 1117).
- Layouts fluidos (grid, flex, `max-width`, `clamp()` en tipografía). Nada de anchos o alturas fijas para contenedores principales.
- **Sin scroll horizontal:** comprobar `document.documentElement.scrollWidth <= clientWidth`. No "arreglarlo" con `overflow-x: hidden` sin entender la causa.
- Navegación móvil diseñada a propósito (no el menú de escritorio encogido). Áreas táctiles de ~44 px en controles importantes.

## 6. Accesibilidad

HTML semántico (`header`, `nav`, `main`, `section`, `footer`), jerarquía de títulos con un solo `h1` por página, navegación con teclado y foco visible, `alt` con sentido (vacío si es decorativo), contraste suficiente, `prefers-reduced-motion`.

## 7. SEO

- Cada página define su `head()`: title, description, og:title, og:description.
- URLs cortas, descriptivas y estables (`/servicios`, `/podcast`).
- Escribir para personas: que se entienda qué hacemos, para quién, qué problema resolvemos y qué puede hacer el visitante.
- Datos estructurados solo si representan el contenido de verdad.
- Pendiente: sitemap y canonical (raíz vs. `www`).

## 8. Performance

- Mínimo JavaScript en el cliente. Imágenes con dimensiones conocidas y tamaño adecuado para el celular. Pocas familias y pesos de fuente.
- Pendiente (alto valor): que las páginas públicas se **pregeneren** (prerender) y se sirvan como archivos, sin gastar el límite de CPU del plan gratis de Workers.
- Animaciones sutiles, que comuniquen jerarquía o den feedback. Nunca retrasan el acceso al contenido.

## 9. Seguridad

- Repo **público**: ningún secreto en el código, el HTML ni los bundles. Tokens solo en GitHub Secrets.
- La web no recibe datos personales. Si algún día hay un formulario, se trata en carril completo.

## 10. Dependencias

Antes de agregar una, preguntar: ¿es necesaria?, ¿lo resuelve el navegador o algo que ya tenemos?, ¿está mantenida?, ¿qué costo de mantenimiento trae? No instalar paquetes porque son populares.

## 11. Gestión de cambios

Ubicar la implementación, entender sus dependencias, hacer **el cambio más chico y seguro**, probar lo afectado y revisar regresiones. No reescribir secciones no relacionadas.

## 12. Reglas para el agente de IA

- Producir código no es lo mismo que resolver el problema.
- Si una instrucción contradice algo técnico claro, decirlo antes de seguirla.
- Ambigüedad que afecta la arquitectura: preguntar. Ambigüedad menor: elegir lo más simple y documentarlo.

## 13. Puerta de calidad final

Funcionalidad (navegación, links, botones, menú móvil, imágenes, sin errores en consola) · Responsive (sin scroll horizontal) · Accesibilidad · SEO · Performance · Código (`bun run lint`, `bun run test`, `bun run build` sin errores).

Formato de cierre: ver `CLAUDE.md` §4.

> Simple para entender. Robusto para confiar. Responsive para funcionar en todos lados. Accesible para usar. Rápido para sentirse inmediato.
