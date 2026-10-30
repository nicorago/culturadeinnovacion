import { createFileRoute, Link } from "@tanstack/react-router";
import path from "@/assets/discovery-path.jpg";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Mis oportunidades — Brújula" },
      { name: "description", content: "Tu tablero de oportunidades en Brújula: persona, árbol, experimentos y entrevistas." },
      { property: "og:title", content: "Mis oportunidades — Brújula" },
      { property: "og:description", content: "Gestiona tu Product Discovery basado en evidencia." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppHome,
});

const stages = ["Oportunidad", "Tu boceto", "Entrevistas", "Persona", "Árbol (OST)", "Supuestos", "Experimento", "Decisión"];

const opps = [
  { n: 7, t: "Planes distintos para esta noche", stage: 3, note: "1 de 5 entrevistas" },
  { n: 5, t: "Necesito confiar que la decisión de compra de departamento es la correcta para mí", stage: 2, note: "Responde como tu cliente" },
  { n: 4, t: "Biblioteca infantil online", stage: 2, note: "Responde como tu cliente" },
  { n: 3, t: "Maximizar productos de alta rotación en cadenas grandes", stage: 6, note: "Prototipo en curso · día 3 de 5" },
  { n: 2, t: "Resolver rápidamente las consultas de los clientes en locales de cadenas grandes", stage: 8, note: "✓ Decidido: invertir" },
];

const news = [
  ["Tu Customer Persona.", "Junta tu boceto y tus entrevistas en una sola ficha: en verde lo que dijo un cliente, en ámbar lo que crees."],
  ["La AI arma tu árbol y tu guía.", "Padres e hijas, un outcome direccional y la guía de entrevista lista, en un paso."],
  ["Tablero de oportunidades.", "Mueve, edita y ramifica tus oportunidades como en una pizarra."],
];

function AppHome() {
  return (
    <div className="min-h-screen">
      {/* App bar */}
      <header className="border-b-2 border-dashed">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="sketch grid h-10 w-10 place-items-center bg-highlight text-xl">🧭</span>
            <span className="leading-none">
              <span className="font-display text-lg font-bold">Brújula</span>
              <br />
              <span className="text-xs tracking-widest text-muted-foreground">CULTURA DE INNOVACIÓN</span>
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <span className="underline decoration-accent decoration-2 underline-offset-4">Oportunidades</span>
            <span>Aprendizajes</span>
            <span>Entrevistas</span>
            <span>Coach AI</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">nicolas@empresa.com</span>
            <span className="sketch grid h-9 w-9 place-items-center bg-accent font-hand text-xl">N</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1fr_300px]">
        <section>
          <p className="font-hand text-2xl text-accent">¡hola, Nicolás! 👋</p>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-extrabold md:text-5xl">
              Mis <span className="marker">oportunidades</span>
            </h1>
            <button className="sketch sketch-shadow wobble bg-primary px-5 py-3 font-semibold text-primary-foreground">
              💡 Tengo una idea
            </button>
          </div>

          <ul className="mt-8 space-y-5">
            {opps.map((o, i) => (
              <li key={o.n} className={`sketch wobble cursor-pointer bg-card p-5 ${i % 2 ? "md:rotate-[0.4deg]" : "md:-rotate-[0.4deg]"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-muted-foreground">OPORTUNIDAD {o.n}</p>
                    <h2 className="mt-1 text-lg font-bold">{o.t}</h2>
                  </div>
                  <span className="font-hand text-3xl">→</span>
                </div>
                {/* Stage progress */}
                <div className="mt-4 flex gap-1">
                  {stages.map((s, idx) => (
                    <span
                      key={s}
                      title={s}
                      className={`h-2 flex-1 rounded-full border border-foreground ${idx < o.stage ? (o.stage === 8 ? "bg-accent" : "bg-highlight") : "bg-background"}`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  <span className="sketch bg-highlight px-2 py-0.5 text-xs font-semibold">
                    Etapa {o.stage} · {stages[o.stage - 1]}
                  </span>
                  <span className="text-muted-foreground">{o.note}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-6">
          <div className="sketch bg-highlight p-6 -rotate-1">
            <p className="text-xs font-semibold tracking-widest">NOVEDADES EN BRÚJULA</p>
            <ul className="mt-3 space-y-3 text-sm">
              {news.map(([t, d]) => (
                <li key={t}>
                  <b>{t}</b> {d}
                </li>
              ))}
            </ul>
            <button className="sketch mt-4 bg-card px-4 py-1.5 text-sm font-semibold">Entendido</button>
          </div>

          <div className="sketch bg-card p-6">
            <p className="font-hand text-2xl">tu semana en números</p>
            <dl className="mt-3 grid grid-cols-2 gap-4">
              {[["12", "entrevistas"], ["34", "aprendizajes"], ["3", "experimentos"], ["1", "decisión"]].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-bold">{n}</dt>
                  <dd className="text-sm text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="sketch bg-primary p-6 text-primary-foreground">
            <p className="font-hand text-2xl text-highlight">coach AI 🤖</p>
            <p className="mt-2 text-sm">
              "En la oportunidad 7 aún no escuchas a 5 clientes. ¿Agendamos 2 entrevistas más antes de idear?"
            </p>
            <button className="sketch mt-4 bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">Preparar guía</button>
          </div>

          <img src={path} alt="Camino de descubrimiento dibujado" width={1600} height={800} loading="lazy" className="w-full mix-blend-multiply" />
        </aside>
      </div>
    </div>
  );
}
