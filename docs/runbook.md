# Runbook · deploy, DNS y verificación

## Cuentas

| Servicio | Cuenta | Notas |
|---|---|---|
| GitHub | `nicorago` · repo `nicorago/culturadeinnovacion` (público) | En esta PC `gh` tiene activa otra cuenta: usar el token de nicorago solo por comando (ver `CLAUDE.md` §0) |
| Cloudflare | `hola@culturadeinnovacion.com` · plan Free | Worker `culturadeinnovacion`, zona `culturadeinnovacion.com`. Requiere 2FA |
| Registro del dominio | Namecheap | Solo nameservers. El hosting de Namecheap queda sin uso (cancelar tras ~2 semanas estables) |
| Correo | Zoho Mail (Forever Free) · `hola@culturadeinnovacion.com` | Solo web y app móvil (sin IMAP) |

## Deploy

**Automático (lo normal):** GitHub Actions (`.github/workflows/ci.yml`).

| Evento | Qué corre |
|---|---|
| PR | Revisiones (lint · test · build) → **preview** en `https://pr-<N>-culturadeinnovacion.hola-83e.workers.dev` (no toca producción) |
| Merge a `main` | Revisiones → **deploy a producción** con el mismo build → smoke test (5 páginas, www y login de la app Brújula) |

Secrets del repo (los carga Nico en GitHub → Settings → Secrets and variables → Actions):
- `CLOUDFLARE_API_TOKEN`: token `github-ci-culturadeinnovacion` (plantilla "Edit Cloudflare Workers"), limitado a la cuenta y la zona `culturadeinnovacion.com`. **Sin permisos de DNS. Vence el 6-nov-2027:** renovarlo antes (Cloudflare → My Profile → API Tokens → Roll) y actualizar el secret.
- `CLOUDFLARE_ACCOUNT_ID`: ID de la cuenta de Cloudflare.

### Protección de main (GitHub → Settings → Branches)

Desde 2026-11-07, `main` solo cambia por PR:

| Regla | Para qué |
|---|---|
| PR obligatorio (0 aprobaciones: Nico no puede aprobar sus propios PRs; su OK va en el chat) | Nadie publica sin pasar por un PR |
| Check obligatorio **"Revisiones (lint · test · build)"**, con la rama al día | No se mezcla nada que no compile o falle las pruebas |
| Aplica también a administradores | Ni Nico ni Claude se la saltan por error |
| Historial lineal, sin force push ni borrado de `main` | El historial no se reescribe |
| Conversaciones del PR resueltas | No quedan comentarios pendientes |
| Repo: solo squash merge y borrar la rama al hacer merge | Un commit por PR en `main` |

Emergencia (la CI caída y la web rota): primero `bunx wrangler rollback`, que no necesita GitHub. Desactivar la protección solo con OK de Nico, y volver a activarla enseguida.

**Manual (plan B, si la CI no está disponible)**, solo desde `main` actualizado:

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
- [ ] Prerender de páginas.
- [ ] Redirección `www` → raíz (o canonical) para SEO.
