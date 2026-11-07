# Runbook · deploy, DNS y verificación

## Cuentas

| Servicio | Cuenta | Notas |
|---|---|---|
| GitHub | `nicorago` · repo `nicorago/culturadeinnovacion` (público) | En esta PC `gh` tiene activa otra cuenta: usar el token de nicorago solo por comando (ver `CLAUDE.md` §0) |
| Cloudflare | `hola@culturadeinnovacion.com` · plan Free | Worker `culturadeinnovacion`, zona `culturadeinnovacion.com`. Requiere 2FA |
| Registro del dominio | Namecheap | Solo nameservers. El hosting de Namecheap queda sin uso (cancelar tras ~2 semanas estables) |
| Correo | Zoho Mail (Forever Free) · `hola@culturadeinnovacion.com` | Solo web y app móvil (sin IMAP) |

## Deploy

Hoy, mientras no exista la CI, se hace manual y **solo desde `main` actualizado**:

```bash
git switch main && git pull --ff-only
bun run build
bunx wrangler deploy          # requiere `bunx wrangler login` con hola@
```

Publica en `culturadeinnovacion.com`, `www.culturadeinnovacion.com` y `culturadeinnovacion.hola-83e.workers.dev`.

## Verificación después de publicar (smoke test)

```bash
for p in / /brujula /planes /podcast /servicios; do curl -s -o /dev/null -w "$p %{http_code}\n" https://culturadeinnovacion.com$p; done
curl -s -o /dev/null -w "www %{http_code}\n" https://www.culturadeinnovacion.com/
curl -s -o /dev/null -w "app Brújula login %{http_code}\n" https://brujula.culturadeinnovacion.com/login
```

Todo debe dar `200`. Si tu PC muestra la web vieja después de un cambio de DNS, es caché local: `ipconfig /flushdns`, o probar con el celular usando datos móviles.

## DNS (Cloudflare → culturadeinnovacion.com → DNS → Records)

Reglas:
- **Todo en "DNS only" (nube gris).** Nunca usar el botón "Proxy DNS records".
- `brujula` **no se toca** (es la app Brújula en Vercel). Cualquier cambio cerca de ese registro se avisa al chat de Brújula.
- La raíz y `www` los crea el Worker (Custom Domains). No crear A/CNAME manuales para ellos.
- Sin registros CAA (si alguna vez hace falta uno, debe incluir `letsencrypt.org`).

Registros clave:

| Nombre | Tipo | Valor | Para qué |
|---|---|---|---|
| `culturadeinnovacion.com`, `www` | Worker | Custom Domain del Worker `culturadeinnovacion` | La web |
| `brujula` | CNAME | `d098d1d501530c0c.vercel-dns-017.com` (DNS only) | App Brújula (Vercel) |
| raíz | MX | `mx.zoho.com` 10 · `mx2.zoho.com` 20 · `mx3.zoho.com` 50 | Correo |
| raíz | TXT | `v=spf1 include:zohomail.com ~all` | SPF (uno solo) |
| `zmail._domainkey` | TXT | `v=DKIM1; k=rsa; p=…` | DKIM de Zoho |
| `_dmarc` | TXT | `v=DMARC1; p=none;` | DMARC |
| raíz | TXT | `zoho-verification=…`, `google-site-verification=…` | Verificaciones |

Quedan registros viejos del hosting de cPanel (cpanel, webmail, autoconfig, etc.). Son inofensivos y se pueden limpiar cuando se cancele el hosting.

Comprobar un registro directo en Cloudflare (sin caché):

```bash
nslookup -type=CNAME brujula.culturadeinnovacion.com hugh.ns.cloudflare.com
nslookup -type=MX culturadeinnovacion.com hugh.ns.cloudflare.com
```

## Rollback

| Qué falló | Cómo volver |
|---|---|
| Un deploy rompió la web | `bunx wrangler rollback` (vuelve a la versión anterior del Worker) o revertir el PR y publicar de nuevo |
| La web en el dominio (Custom Domain) | Cloudflare → Workers → `culturadeinnovacion` → Settings → Domains: quitar el dominio y recrear A `culturadeinnovacion.com` → `162.254.39.71` y CNAME `www` → `culturadeinnovacion.com` (DNS only). Mientras exista el hosting de Namecheap, eso vuelve a la web vieja |
| El DNS completo | Namecheap → Domain List → Manage → Nameservers → "Namecheap Web Hosting DNS" (`dns1/dns2.namecheaphosting.com`). Solo funciona mientras el hosting siga activo |

## Pendiente

- [ ] Cancelar el hosting de Namecheap (~20-nov-2026, si todo sigue estable). Antes: revisar que no tenga archivos ni casillas en uso.
- [ ] CI con deploy automático desde `main` (token de Cloudflare solo con permiso de Workers, en GitHub Secrets).
- [ ] Prerender de páginas.
- [ ] Redirección `www` → raíz (o canonical) para SEO.
