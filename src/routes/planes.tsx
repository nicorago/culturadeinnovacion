import { createFileRoute, Link } from "@tanstack/react-router";
import { Hand } from "@/components/site";

export const Route = createFileRoute("/planes")({
  head: () => ({
    meta: [
      { title: "Planes de Brújula — Empieza gratis" },
      { name: "description", content: "Elige tu plan de Brújula: Startup gratis, Plus o Empresarial a medida para equipos de innovación." },
      { property: "og:title", content: "Planes de Brújula — Empieza gratis" },
      { property: "og:description", content: "Product Discovery basado en evidencia. Empieza gratis y cambia de plan cuando lo necesites." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planes,
});

const coach = "Coach AI incluido: Product Discovery, Lean Startup, análisis de viabilidad y Outcome-based roadmaps.";
const plans = [
  { name: "Startup", price: "Gratis", desc: "Para validar tu primera idea.", items: ["1 usuario", "1 idea", "Todo el flujo de discovery", coach], cta: "Empezar gratis", tilt: "md:-rotate-1", bg: "bg-card" },
  { name: "Plus", price: "Consúltanos", desc: "Para founders con varias ideas en marcha.", items: ["1 usuario", "Hasta 100 ideas", "Todo el flujo de discovery", coach], cta: "Elegir Plus", tilt: "", bg: "bg-card", featured: true },
  { name: "Empresarial", price: "A medida · consúltanos", desc: "Para equipos de innovación y producto. Te armamos una propuesta según tu equipo.", items: ["Varios usuarios y roles", "Ideas sin límite", "Onboarding acompañado y soporte prioritario", coach], cta: "Contactar a ventas", tilt: "md:rotate-1", bg: "bg-card" },
];

function Planes() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-8">
      <div className="text-center">
        <Hand>🧭 brújula</Hand>
        <h1 className="mt-1 text-5xl font-extrabold md:text-6xl">
          Elige tu <span className="marker">plan</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">Empieza gratis. Cambia de plan cuando lo necesites.</p>
      </div>
      <div className="mt-14 grid items-start gap-8 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className={`relative sketch ${p.bg} p-8 ${p.tilt} ${p.featured ? "sketch-shadow md:-mt-4" : ""}`}>
            {p.featured && (
              <span className="sketch absolute -top-4 left-6 bg-highlight px-3 py-1 font-hand text-xl">¡recomendado!</span>
            )}
            <p className="font-semibold">{p.name}</p>
            <p className="mt-2 font-display text-3xl font-bold">{p.price}</p>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {p.items.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-hand text-xl leading-none text-accent">✓</span>
                  {i}
                </li>
              ))}
            </ul>
            <Link
              to="/registro"
              search={{ plan: p.name }}
              className={`sketch wobble mt-8 block py-3 text-center font-semibold ${p.featured ? "bg-primary text-primary-foreground" : "bg-background"}`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center font-hand text-2xl text-muted-foreground">sin tarjeta de crédito para empezar ✏️</p>
    </section>
  );
}
