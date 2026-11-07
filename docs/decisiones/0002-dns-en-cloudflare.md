# 0002 · El DNS de culturadeinnovacion.com se maneja en Cloudflare

- **Fecha:** 2026-11-06
- **Estado:** aceptada
- **Carril:** completo (plan, verificación previa y rollback aprobados por Nico; revisado con el chat de la app Brújula)

## Contexto

Hasta el 6-nov-2026, el DNS vivía en el hosting de Namecheap (cPanel, `dns1/dns2.namecheaphosting.com`). Para publicar la web en la raíz del dominio con Workers, Cloudflare necesita manejar la zona. Además, tener el DNS dentro del hosting era un riesgo: si el hosting vencía, se caían la web, el correo y **la app Brújula** (riesgo BRU-28 del lado de Brújula).

## Decisión

- Nameservers en Namecheap (el registro del dominio sigue en Namecheap): `hugh.ns.cloudflare.com` y `jewel.ns.cloudflare.com`.
- **Todos los registros en "DNS only" (nube gris).** En especial `brujula` (CNAME → Vercel): con proxy, Vercel puede fallar al renovar su certificado.
- La web se conecta como **Custom Domain** del Worker, **solo** para `culturadeinnovacion.com` y `www`. Nunca rutas con comodín.

## Alternativas descartadas

- **Mantener el DNS en cPanel:** no permite usar Workers en la raíz y mantiene el riesgo de depender del hosting.
- **Namecheap BasicDNS:** habría sido una mudanza intermedia sin ventaja; igual había que llegar a Cloudflare.

## Cómo se hizo (sin cortes)

1. Cloudflare escaneó los registros, pero **no copió `brujula`**: se agregó a mano. Se apagó el proxy en 12 registros.
2. Antes de cambiar los nameservers, se verificó cada registro preguntando directo a hugh/jewel.
3. Cambio de nameservers después de la demo con Citec, por precaución. La app Brújula y el correo siguieron respondiendo durante todo el proceso.
4. Con la zona activa: se borraron solo el A de la raíz y el CNAME `www` viejos, y se publicó el Worker con sus dominios.

## Costo

US$0. Pendiente: cancelar el hosting de Namecheap después de ~2 semanas estables (y preguntar por reembolso proporcional).

## Rollback

Ver [`docs/runbook.md`](../runbook.md#rollback).
