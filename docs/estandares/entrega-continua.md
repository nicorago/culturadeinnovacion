# Entrega continua · cómo trabajamos

Basado en dos libros de referencia de Nico (copias privadas en `Referencias-web/libros/`, fuera del repo):

- **Accelerate** (Forsgren, Humble, Kim, 2018): investigación que identifica 24 capacidades que mejoran el desempeño de entrega de software, y cómo medirlo.
- **Continuous Delivery** (Humble, Farley, 2010): cómo construir un pipeline de despliegue confiable.

Aquí no se resumen los libros. Se dice **qué aplicamos en esta web y cómo**, proporcional a un sitio de contenido con una persona de negocio y un agente de IA.

## 1. Cómo medimos si trabajamos bien (las 4 métricas de Accelerate)

| Métrica | Qué significa aquí | Meta razonable |
|---|---|---|
| **Frecuencia de despliegue** | Cuántas veces publicamos en producción | Cada cambio aprobado se publica el mismo día |
| **Tiempo de entrega** | Desde que se pide un cambio hasta que está en producción | Cambios livianos: horas, no días |
| **Tasa de cambios fallidos** | % de publicaciones que hubo que corregir o revertir | Baja; cada falla deja una lección en `docs/lecciones.md` |
| **Tiempo de recuperación** | Cuánto tardamos en volver a un estado sano | Minutos: rollback documentado en `docs/runbook.md` |

Se revisan de forma liviana con el historial de PRs y el CHANGELOG. No hace falta un tablero.

## 2. Capacidades que aplicamos

### Entrega continua
- **Todo en control de versiones:** código, configuración (`wrangler.jsonc`), documentación y decisiones. Lo que no está en Git no existe. Excepción: los secretos.
- **Automatizar casi todo:** lint, tests, build y deploy los corre la CI, no una persona.
- **Integración continua:** cada PR corre lint, test y build. Si falla, **se para la línea**: arreglar es lo primero.
- **Trunk-based:** ramas que viven horas o pocos días, `main` siempre publicable. Nunca commits directos a `main`.
- **Tests automatizados** en lo que importa: rutas que cargan y enlaces críticos (CTAs a la app Brújula, contacto). Sin obsesión por la cobertura.
- **Seguridad desde el inicio** (*shift left*): repo público sin secretos, tokens con permisos mínimos, la web sin datos personales.
- **Entrega continua:** cada cambio en `main` puede publicarse en cualquier momento y se publica automáticamente.

### Producto y proceso
- **Trabajar en lotes pequeños:** un PR = un cambio entendible. Más fácil de revisar, probar y revertir.
- **Feedback del visitante:** las decisiones de contenido se apoyan en evidencia (pruebas de 5 segundos, conversaciones, analítica), no en opiniones.
- **Experimentación:** validar lo riesgoso de forma barata antes de construir (ver el roadmap por outcomes).
- **Visualizar el trabajo:** tablero Jira KAN con columnas claras y pocas cosas en curso a la vez.

### Gestión liviana
- **Aprobación de cambios liviana:** la revisión es el PR con su preview y los checks en verde, más el OK de Nico. No hay comités.
- **Monitoreo:** saber si la web está arriba y si algo falla. Hoy: verificación manual después de cada deploy. Pendiente: Cloudflare Web Analytics y alertas.

### Cultura
- **Aprender de los errores sin culpas:** cada falla genera una lección escrita, no un culpable.
- **Hecho = publicado:** algo está "listo" cuando está en producción y verificado, no cuando el código está escrito.

## 3. El pipeline de esta web

```text
rama corta → PR → CI (lint · test · build) → preview → OK de Nico → merge a main → deploy automático → verificación
```

Principios de Continuous Delivery que aplica:
- **Construir una sola vez y publicar lo mismo que se probó:** la CI construye y despliega lo mismo que pasó las pruebas.
- **Publicar siempre de la misma forma:** el deploy es un comando (`bun run deploy`) y lo corre la CI, no una persona con pasos manuales.
- **Smoke test después de publicar:** comprobar que las 5 páginas responden 200 y que la app Brújula sigue respondiendo.
- **Si algo duele, hacerlo más seguido:** publicar seguido y en lotes chicos hace cada publicación aburrida y segura.
- **Rollback rápido:** volver a la versión anterior del Worker en Cloudflare o revertir el PR (ver `docs/runbook.md`).

## 4. Lo que todavía no tenemos (y su orden)

Ya está (desde 2026-11-06): CI en cada PR, preview por PR, deploy automático desde `main` con el mismo build y smoke test (`.github/workflows/ci.yml`).

Ya está (desde 2026-11-07): `main` protegida en GitHub (ver `docs/runbook.md` → "Protección de main").

Falta:
1. Prerender de páginas, para no gastar CPU del plan gratis.
2. Analítica liviana sin cookies (Cloudflare Web Analytics) y alerta si la web cae.
