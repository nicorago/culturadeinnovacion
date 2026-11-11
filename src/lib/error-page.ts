// Página de error grave (500): se muestra cuando la web no puede dibujarse, así que no puede usar
// el CSS del sitio. Repite a mano la marca sketchy: colores de styles.css (crema, tinta, terracota,
// rotulador), las tres tipografías y la brújula de las páginas 404/410.
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Esta página no cargó · Cultura de Innovación</title>
    <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Caveat:wght@600&family=Figtree:wght@500;600&display=swap" />
    <style>
      :root { --bg: oklch(0.964 0.017 85); --fg: oklch(0.2 0.01 60); --card: oklch(0.985 0.01 85);
        --accent: oklch(0.7 0.17 50); --hl: oklch(0.88 0.15 95); --muted: oklch(0.45 0.02 60); }
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 2rem 1rem;
        background: var(--bg); color: var(--fg); font: 16px/1.5 Figtree, system-ui, sans-serif; text-align: center; }
      main { width: 100%; max-width: 36rem; min-width: 0; }
      svg { width: 9rem; height: 9rem; }
      .needle { transform-origin: 60px 60px; animation: lost 6s ease-in-out infinite; }
      @keyframes lost { 0%,100% { transform: rotate(-35deg) } 20% { transform: rotate(60deg) }
        45% { transform: rotate(-120deg) } 60% { transform: rotate(-95deg) } 80% { transform: rotate(200deg) } }
      @media (prefers-reduced-motion: reduce) { .needle { animation: none } }
      .code { font: 800 3.5rem/1 "Bricolage Grotesque", system-ui, sans-serif; margin: 1.5rem 0 0; }
      .mk { background: linear-gradient(transparent 55%, var(--hl) 55%, var(--hl) 90%, transparent 90%); padding: 0 .1em; }
      h1 { font: 700 1.9rem/1.15 "Bricolage Grotesque", system-ui, sans-serif; margin: 1rem 0 .5rem; }
      .hand { font: 600 1.6rem/1.2 Caveat, cursive; color: var(--accent); margin: 0; }
      .actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }
      .btn { font: 600 1rem Figtree, system-ui, sans-serif; padding: .75rem 1.5rem; cursor: pointer; text-decoration: none;
        color: var(--fg); background: var(--card); border: 2px solid var(--fg);
        border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; box-shadow: 5px 5px 0 0 var(--fg);
        transition: transform .25s ease; }
      .btn:hover, .btn:focus-visible { transform: rotate(-1.5deg) translateY(-2px); }
      .btn:focus-visible { outline: 2px solid var(--fg); outline-offset: 4px; }
      .solid { background: var(--fg); color: var(--bg); }
    </style>
  </head>
  <body>
    <main>
      <svg viewBox="0 0 120 120" role="img" aria-label="Brújula dibujada a mano, con la aguja dando vueltas" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M60 9c27 1 51 22 51 51s-23 52-52 51C31 110 9 88 9 60 10 32 33 9 60 9Z" stroke-width="3" />
        <path d="M58 13c25-1 48 21 49 47 1 27-21 48-48 48-26 0-46-22-46-48 0-25 20-46 45-47Z" stroke-width="1.2" opacity=".5" />
        <path d="M60 18v8M60 94v8M18 60h8M94 60h8" stroke-width="2.5" />
        <g class="needle">
          <path d="M60 60 L54 58 L60 26 L66 58 Z" fill="oklch(0.7 0.17 50)" stroke-width="2" />
          <path d="M60 60 L66 62 L60 94 L54 62 Z" fill="oklch(0.985 0.01 85)" stroke-width="2" />
          <circle cx="60" cy="60" r="3.5" fill="currentColor" stroke-width="1.5" />
        </g>
      </svg>
      <p class="code"><span class="mk">¡Ups!</span></p>
      <h1>Esta página no cargó</h1>
      <p class="hand">Se nos rompió la punta del lápiz. Ya la estamos afilando.</p>
      <div class="actions">
        <button class="btn solid" onclick="location.reload()">Intentar de nuevo</button>
        <a class="btn" href="/">Volver al inicio</a>
      </div>
    </main>
  </body>
</html>`;
}
