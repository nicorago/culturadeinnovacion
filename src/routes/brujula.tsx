import { createFileRoute } from "@tanstack/react-router";
import path from "@/assets/discovery-path.jpg";
import { Hand, LINKS, SketchButton } from "@/components/site";

export const Route = createFileRoute("/brujula")({
  head: () => ({
    meta: [
      { title: "Brújula — Product Discovery basado en evidencia" },
      { name: "description", content: "De la oportunidad a la decisión: customer persona, journey map, árbol de oportunidades, experimentos y entrevistas en una sola plataforma." },
      { property: "og:title", content: "Brújula — Product Discovery basado en evidencia" },
      { property: "og:description", content: "La plataforma de Cultura de Innovación para decidir en qué invertir con evidencia de tus clientes." },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Brujula,
});

const steps = [
  ["Entiende al cliente", "Construye tu Customer Persona: en verde lo que dijo un cliente, en ámbar lo que tú crees."],
  ["Mapea su journey", "Descubre dónde duele de verdad la experiencia de tus clientes."],
  ["Arma tu árbol (OST)", "Organiza todas las oportunidades en un Opportunity Solution Tree y elige con foco."],
  ["Idea con diferenciadores", "Genera soluciones innovadoras que tengan algo valioso y distinto."],
  ["Expón supuestos y riesgos", "Valor, usabilidad, viabilidad y factibilidad: qué tiene que ser cierto."],
  ["Experimenta en < 1 semana", "Diseña un prototipo funcional que tus clientes usen sin construir todo el producto."],
  ["Entrevista y aprende", "Guías de entrevista listas y una base de datos viva de aprendizajes."],
  ["Decide con evidencia", "Invierte tiempo y dinero donde los clientes ya te dieron señales reales."],
];

const plans = [
  ["Startup", "Gratis", "Para validar tu primera idea.", "ghost"],
  ["Plus", "Consúltanos", "Para founders con varias ideas en marcha.", "solid"],
  ["Empresarial", "A medida", "Para equipos de innovación y producto.", "accent"],
] as const;

function Brujula() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-10 text-center">
        <Hand>🧭 la plataforma</Hand>
        <h1 className="mt-2 text-5xl font-extrabold leading-tight md:text-6xl">
          Brújula: deja de adivinar <span className="marker">qué construir</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Un flujo de Product Discovery estructurado, inspirado en Teresa Torres, Marty Cagan, Jake Knapp y Lean
          Startup, con un Coach AI que te acompaña en cada etapa.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <SketchButton href={LINKS.planes}>Empezar gratis →</SketchButton>
          <SketchButton href={LINKS.brujula} variant="ghost">Entrar</SketchButton>
        </div>
      </section>

      <img src={path} alt="Camino de descubrimiento dibujado a mano" width={1600} height={800} className="mx-auto mt-10 w-full max-w-5xl px-6 mix-blend-multiply" />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold md:text-4xl">El camino, paso a paso</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className={`sketch wobble bg-card p-6 ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
              <span className="font-hand text-4xl text-accent">{i + 1}</span>
              <h3 className="mt-1 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Planes</h2>
          <p className="mt-2 font-hand text-2xl text-accent">empieza gratis, cambia cuando lo necesites</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map(([name, price, desc, v]) => (
            <div key={name} className={`sketch bg-card p-8 ${v === "solid" ? "sketch-shadow" : ""}`}>
              <p className="font-semibold">{name}</p>
              <p className="mt-2 font-display text-3xl font-bold">{price}</p>
              <p className="mt-2 text-muted-foreground">{desc}</p>
              <p className="mt-4 text-sm">✓ Todo el flujo de discovery<br />✓ Coach AI incluido</p>
              <div className="mt-6">
                <SketchButton href={LINKS.planes} variant={v}>
                  {name === "Empresarial" ? "Contactar" : "Elegir"}
                </SketchButton>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
