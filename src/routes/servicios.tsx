import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-team.jpg";
import { Hand, SketchButton } from "@/components/site";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — Consultoría de Discovery y Human Momentum" },
      { name: "description", content: "Consultoría de Innovación y Discovery para líderes y equipos, y Human Momentum: 7 semanas para entrenar inteligencia emocional y comunicación empática." },
      { property: "og:title", content: "Servicios — Cultura de Innovación" },
      { property: "og:description", content: "Te acompañamos a innovar con tus clientes y a crecer como personas y equipos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Servicios,
});

const consult = [
  ["🔍", "Entender", "Conversaciones reales con tus clientes para descubrir qué les duele de verdad."],
  ["🧪", "Probar", "Tu solución frente a clientes en menos de una semana, con un prototipo simple."],
  ["📈", "Decidir", "Feedback concreto para invertir tiempo, esfuerzo y dinero donde sí importa."],
];

const weeks = ["Autoconciencia", "Emociones", "Escucha", "Empatía", "Conversaciones difíciles", "Hábitos", "Momentum"];

function Servicios() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-8 text-center">
        <Hand>servicios ✏️</Hand>
        <h1 className="mt-2 text-5xl font-extrabold leading-tight md:text-6xl">
          Te <span className="marker">acompañamos</span> en el camino.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Además de herramientas, trabajamos codo a codo con líderes, equipos y emprendedores: para innovar con
          evidencia y para crecer como personas.
        </p>
      </section>

      {/* Consultoría */}
      <section className="mx-auto mt-20 grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
        <div>
          <span className="sketch inline-block bg-highlight px-3 py-1 font-hand text-xl">01 · consultoría</span>
          <h2 className="mt-4 text-4xl font-bold">Innovación y Discovery</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Guío a tu equipo a entender a sus clientes y a reducir el riesgo de innovar: exponemos la solución a
            clientes reales en menos de una semana y volvemos con aprendizajes, no con suposiciones.
          </p>
          <div className="mt-6 space-y-4">
            {consult.map(([e, t, d], i) => (
              <div key={t} className={`sketch bg-card p-4 ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
                <p className="font-semibold">{e} {t}</p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <SketchButton href="mailto:hola@culturadeinnovacion.com?subject=Consultoría de Discovery">Conversemos →</SketchButton>
          </div>
        </div>
        <img src={hero} alt="Equipo dibujado trabajando en una pizarra" width={1280} height={960} className="w-full mix-blend-multiply" />
      </section>

      {/* Human Momentum */}
      <section className="mx-auto mt-24 max-w-6xl px-6">
        <div className="sketch sketch-shadow bg-card p-8 md:p-12">
          <span className="sketch inline-block bg-accent px-3 py-1 font-hand text-xl text-accent-foreground">02 · programa</span>
          <h2 className="mt-4 text-4xl font-bold">Human Momentum 🧠💛</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Un programa de 7 semanas para entrenar la inteligencia emocional y la comunicación empática. Piénsalo como
            un <span className="marker">gimnasio para la mente</span>: pequeñas prácticas que se vuelven hábitos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {weeks.map((w, i) => (
              <span key={w} className={`sketch px-4 py-2 ${i % 3 === 0 ? "bg-highlight" : "bg-background"} ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
                <span className="font-hand text-lg text-accent">sem {i + 1}</span> {w}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">*Temas por semana ilustrativos.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <SketchButton href="https://humanmomentum.org/momentum" variant="accent">Para personas</SketchButton>
            <SketchButton href="https://humanmomentum.org/empresas" variant="ghost">Para empresas</SketchButton>
          </div>
        </div>
      </section>
    </>
  );
}
