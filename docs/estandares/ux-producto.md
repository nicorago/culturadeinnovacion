# Principios de UX y producto · culturadeinnovacion.com

Versión propia de "UX - Product Design Principles" (creado para Brújula), adaptada a una web de contenido con diseño "sketchy". El original vive fuera del repo, en `Referencias-web/estandares-brujula-originales/`.

El objetivo no es que se vea lindo: es que **quien visita entienda, decida y actúe**.

## 1. Centrado en quien visita

Antes de diseñar una página o sección, responder: ¿quién la visita?, ¿qué quiere lograr?, ¿qué necesita saber?, ¿qué decisión está tomando?, ¿cuál es su siguiente paso?, ¿qué podría confundirlo?

Visitantes (hipótesis a validar):
- **Líder de innovación o producto** en una empresa mediana o grande → busca ayuda para instalar innovación (consultoría o programa).
- **Emprendedor o intraemprendedor** con una idea → quiere validarla sin gastar de más (app Brújula).
- **Oyente del podcast** o quien llega desde LinkedIn o la app Brújula → quiere saber quién es Nico y si vale la pena seguirlo.

No diseñar desde "lo que la empresa quiere decir", sino desde lo que el visitante necesita.

## 2. Un objetivo principal por página

| Página | Objetivo principal | CTA principal |
|---|---|---|
| Inicio | Entender en 10 segundos qué hacemos y para quién | Probar Brújula / Conversemos |
| Brújula | Entender cómo la app ayuda a validar ideas | Empezar gratis |
| Planes | Elegir cómo empezar | Empezar gratis |
| Servicios | Decidir si conversar con Nico | Conversemos (correo a hola@) |
| Podcast | Escuchar un episodio | Escuchar en Spotify |

La jerarquía visual debe hacer obvio ese objetivo. No todo tiene la misma importancia.

## 3. Arquitectura de información y carga cognitiva

- Navegación simple: no crear páginas solo porque existe información.
- Revelar la complejidad de a poco: primero la propuesta, después el detalle.
- Evitar: demasiadas opciones, CTAs que compiten, terminología poco clara, decoración que no aporta, bloques de texto largos sin estructura.
- Claridad antes que ingenio.

## 4. Llamados a la acción

- Un CTA principal claro por página, distinguible de los secundarios.
- El texto dice la acción y, si ayuda, el beneficio ("Probar Brújula gratis", mejor que "Ver más").
- **Nunca prometer** en un CTA algo que la app Brújula no tiene hoy.

## 5. Interacción

Cada elemento interactivo comunica si se puede usar, qué hace y en qué estado está: hover, foco visible (teclado), activo. Nada que el visitante tenga que descubrir por accidente.

## 6. Mobile

El celular no es un escritorio chico: pensar en el alcance del pulgar, áreas táctiles, lectura vertical y prioridad del contenido. Las acciones importantes quedan fáciles de alcanzar.

## 7. Sistema de diseño "sketchy" (liviano)

Estilo libro Design Sprint: simple, cálido, algo divertido, dibujado a mano.

| Token | Valor |
|---|---|
| Tipografías | Bricolage Grotesque (títulos), Figtree (texto), Caveat (`.font-hand`, notas a mano) |
| Colores semánticos | `background` crema, `foreground` tinta, `primary` tinta, `accent` terracota, `highlight` amarillo rotulador, `card`, `muted`. **Siempre tokens** de `src/styles.css`, nunca hex sueltos |
| Bordes | `.sketch`: borde de 2 px con radios irregulares |
| Sombra | `.sketch-shadow`: sombra sólida desplazada 5 px |
| Resaltado | `.marker`: subrayado de rotulador |
| Movimiento | `.wobble`: giro de -1,5° al pasar el mouse, dibujado en una sola capa |
| Ilustraciones | Boceto a tinta sobre fondo crema, coherente con `src/assets/` |

- Los componentes iguales se comportan igual: `SketchButton` tiene 3 variantes (solid, ghost, accent). No crear variantes nuevas sin una razón de UX.
- **Restricción visual:** antes de agregar un gradiente, sombra, animación o forma decorativa, preguntar si mejora la comprensión, la jerarquía, el feedback o la marca. Si no, no va.

## 8. Diseñar antes de implementar

Para páginas o secciones importantes, definir primero: objetivo del visitante, objetivo del negocio, jerarquía de información, CTA principal, estructura, comportamiento responsive y componentes necesarios.

## 9. Revisión de diseño (antes de "listo")

- ¿Se entiende el propósito de inmediato?
- ¿Lo más importante domina visualmente?
- ¿Un visitante nuevo sabe qué hacer después? ¿El CTA es obvio?
- ¿Sobra información o decoración?
- ¿Es coherente con el resto del sitio?
- ¿Funciona igual de bien en 390 px?
- ¿Algo se siente "generado por IA"?

Si alguna respuesta es no, se mejora antes de declarar terminado.
