<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the walkthrough's simulated artifact generation illustrative; it must never imply a real model call or validated customer evidence.
- Store shared discovery example data independently of routes so the walkthrough stays decoupled from page code.
- Render the public product walkthrough as accessible animated interface screens with pause and scene controls, rather than a generated video, to keep the demo faithful to the product and avoid video-generation cost.
- No in-site product demo or sign-up routes: the site must not collect personal data.
- Build with standard Vite + TanStack Start and deploy to Cloudflare Workers via nitro + wrangler; no Lovable packages, so the repo runs anywhere.
- Plan CTAs and "Entrar" link to the real Brújula app (brujula.culturadeinnovacion.com/registro?plan=… and /login) and open in a new tab.
