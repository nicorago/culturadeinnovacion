# 0001 · La web se aloja en Cloudflare Workers (plan gratis)

- **Fecha:** 2026-11-06
- **Estado:** aceptada
- **Carril:** completo

## Contexto

La web nació en Lovable (TanStack Start + Vite), que ya la dejó preparada para Cloudflare Workers (`wrangler.jsonc`). Nico necesitaba la web en culturadeinnovacion.com rápido, sin costo y sin tocar la app Brújula (Vercel + Supabase).

## Decisión

Publicar la web como Worker `culturadeinnovacion` en la cuenta de Cloudflare de `hola@culturadeinnovacion.com`, plan **Free**, con dominios propios `culturadeinnovacion.com` y `www.culturadeinnovacion.com`, más la dirección de prueba `culturadeinnovacion.hola-83e.workers.dev`.

## Alternativas descartadas

| Alternativa | Por qué no |
|---|---|
| **Vercel** (como la app Brújula) | El plan gratis (Hobby) es para uso **no comercial**. Para la web de la empresa habría que pagar Pro (~US$20/mes). |
| **Hosting de Namecheap** (pagado hasta 2028) | La configuración de Lovable no genera las páginas como archivos estáticos, y arreglarlo era más lento e incierto. Además, mantener el hosting acopla la web a un servicio que se quiere dejar. |
| **Migrar también la app Brújula a Cloudflare** | Fuera de alcance. Es una app Next.js con IA y datos, y el plan gratis de Workers da 10 ms de CPU por solicitud, poco para una app. Lo decide el chat de Brújula. |

## Costo

US$0. Límite del plan Free: 100.000 solicitudes al día al Worker (los archivos estáticos no cuentan). Si se supera, la web da error hasta la medianoche UTC; **no hay cobro**. Plan pagado, si algún día hiciera falta: ~US$5/mes.

## Consecuencias

- El DNS del dominio pasa a Cloudflare (ver [0002](0002-dns-en-cloudflare.md)).
- La cuenta de Cloudflare se vuelve crítica: necesita 2FA, y también la cuenta de correo hola@ (Zoho), porque recibe las recuperaciones de contraseña.
- Pendiente: CI con deploy automático desde `main` (token de Cloudflare con permiso solo de Workers, en GitHub Secrets) y prerender de páginas.
- Salida: el código es estándar; moverlo a otro hosting toma horas.
