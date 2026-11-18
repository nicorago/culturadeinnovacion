import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-team.jpg";
import { Hand, LINKS, SketchButton } from "@/components/site";
import { canonicalLink, consultoriaLd, pageUrl, shareImageMeta } from "@/lib/seo";

const TITLE = "Consultoría de innovación para empresas · Quito y Latam";
const DESCRIPTION =
  "Implementamos un modelo de producto e innovación, formamos a tu equipo en Product Discovery y facilitamos Design Sprints. Presencial en Quito y remoto en Latam.";
const CONTACTO = "mailto:hola@culturadeinnovacion.com?subject=Consultoría de innovación";

// Formatos que Nico vende hoy (KAN-19, 18-nov-2026). Sin precios.
const formatos = [
  {
    tag: "mínimo 3 meses",
    title: "Modelo de producto e innovación",
    text: "Instalamos en tu empresa una forma de trabajar que parte de los clientes: cómo se descubren oportunidades, cómo se prueban ideas y cómo se decide en qué invertir.",
  },
  {
    tag: "mínimo 3 meses",
    title: "Formación y coaching en Product Discovery",
    text: "Acompañamos a Product Managers y Product Designers mientras trabajan en sus productos reales: entrevistas a clientes, oportunidades, experimentos y decisiones con evidencia.",
  },
  {
    tag: "5 días",
    title: "Workshop de innovación con Design Sprint",
    text: "Una semana para llevar un desafío importante desde la pregunta hasta un prototipo probado con clientes reales. Facilitamos el sprint y dejamos a tu equipo listo para repetirlo.",
  },
];

const pasos = [
  ["Conversamos", "Nos cuentas tu desafío y en qué momento está tu equipo."],
  ["Elegimos el formato", "Modelo, formación o sprint, según lo que necesitas resolver."],
  [
    "Trabajamos sobre algo real",
    "Siempre con un producto o desafío de tu empresa, no con casos de ejemplo.",
  ],
];

export const Route = createFileRoute("/consultoria-de-innovacion")({
  head: () => ({
    links: [canonicalLink("/consultoria-de-innovacion")],
    scripts: [consultoriaLd],
    meta: [
      { property: "og:url", content: pageUrl("/consultoria-de-innovacion") },
      ...shareImageMeta(
        "servicios",
        "Consultoría de innovación de Cultura de Innovación. Equipo dibujado en una pizarra y dos personas conversando.",
      ),
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Consultoria,
});

function Consultoria() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-8 md:grid-cols-2">
        <div>
          <Hand>consultoría ✏️</Hand>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            <span className="mb-3 block font-sans text-lg font-semibold leading-snug text-muted-foreground md:text-xl">
              Consultoría de innovación para empresas · Quito y Latam
            </span>
            Innovar con tus clientes, <span className="marker">no a ciegas</span>.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Ayudamos a líderes y equipos de producto a entender a sus clientes, probar ideas antes
            de construirlas y decidir con evidencia en qué invertir.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <SketchButton href={CONTACTO}>Conversemos →</SketchButton>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Presencial en Quito · remoto en toda Latinoamérica
          </p>
        </div>
        <img
          src={hero}
          alt="Equipo dibujado trabajando con notas adhesivas alrededor de una pizarra"
          width={1280}
          height={960}
          className="w-full mix-blend-multiply"
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Hand>tres formas de trabajar juntos</Hand>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">
          Elige según lo que necesitas resolver
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {formatos.map((f, i) => (
            <article
              key={f.title}
              className={`sketch sketch-shadow bg-card p-6 ${i % 2 ? "md:rotate-1" : "md:-rotate-1"}`}
            >
              <span className="sketch inline-block bg-highlight px-3 py-1 font-hand text-lg">
                {f.tag}
              </span>
              <h3 className="mt-4 text-2xl font-bold">{f.title}</h3>
              <p className="mt-3 text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="sketch sketch-shadow bg-card p-8 md:p-12">
          <span className="sketch inline-block bg-accent px-3 py-1 font-hand text-xl text-accent-foreground">
            caso de éxito
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">PPM</h2>
          <ul className="mt-6 space-y-3 text-lg">
            <li>✏️ Incorporamos un modelo de producto e innovación.</li>
            <li>✏️ Capacitamos a Product Managers y Product Designers en Product Discovery.</li>
            <li>
              ✏️ Facilitamos Design Sprints y entrenamos al equipo para hacerlos por su cuenta.
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <Hand>cómo empezamos</Hand>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {pasos.map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="font-display text-4xl font-extrabold text-accent">{i + 1}</span>
              <div>
                <p className="text-xl font-bold">{t}</p>
                <p className="text-muted-foreground">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-4">
          <SketchButton href={CONTACTO}>Escríbenos a hola@culturadeinnovacion.com</SketchButton>
          <SketchButton href={LINKS.brujula} variant="ghost">
            Conoce Brújula de Innovación
          </SketchButton>
        </div>
      </section>
    </>
  );
}
