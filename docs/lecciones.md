# Lecciones

Lo que aprendimos, para no repetir errores. Sin culpas. Lo más nuevo arriba. No se editan entradas históricas.

## 2026-11-06 · Verificar el DNS preguntando directo al servidor nuevo
Después de publicar, la PC seguía mostrando la web vieja porque Windows guardaba la dirección anterior en caché. Preguntando directo a `hugh.ns.cloudflare.com` (o forzando la IP con `curl --resolve`) se vio que estaba bien. **Regla:** para validar un cambio de DNS, consultar el servidor autoritativo, no el resolvedor de la PC.

## 2026-11-06 · El escaneo de Cloudflare no copia todo
Al agregar el dominio, Cloudflare importó 30 registros, pero **no `brujula`**. Si se hubieran cambiado los nameservers sin revisar, la app Brújula habría dejado de abrir. **Regla:** antes de mudar el DNS, comparar registro por registro y verificar contra los nameservers nuevos.

## 2026-11-06 · Botones que giran: dibujar en una capa
Rotar cajas con bordes curvos irregulares dejaba costuras (halos y líneas finas), sobre todo en Firefox. Recortar el fondo (`background-clip`) solo movió el problema; quitar el giro lo resolvía, pero perdía la gracia. Lo que funcionó: `will-change: transform` + `backface-visibility: hidden` (el navegador dibuja la caja completa y gira la imagen) + `outline` transparente de 1 px (suaviza el borde). **Regla:** atacar la causa, no el síntoma; y revisar en el navegador de Nico (Firefox), no solo en Chromium.

## 2026-11-06 · Saltos de línea de Windows
`core.autocrlf=true` (global en la PC) convertía todo a CRLF y el lint marcaba más de 6.000 errores falsos. **Regla:** `.gitattributes` con `eol=lf` en el repo y `core.autocrlf=false` local.

## 2026-11-06 · Conector de Jira y sitios nuevos de Atlassian
Autorizar el conector para un sitio nuevo requiere que un **admin del sitio** apruebe la app. Intentarlo dejó sin sesión a otro proyecto por un rato. **Regla:** no volver a intentarlo sin un plan; mientras tanto, las tarjetas se crean o importan a mano.

## 2026-11-05 · Las cuentas de GitHub de esta PC
`gh` y `git` globales apuntan a nicolasramirezgo (Human Momentum). **Regla:** configuración solo local (`git config --local`) y token de nicorago por comando. Nunca `gh auth switch`.
