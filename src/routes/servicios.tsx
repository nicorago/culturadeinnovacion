import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-team.jpg";
import { Hand, SketchButton } from "@/components/site";
import { canonicalLink, pageUrl, shareImageMeta, serviciosLd } from "@/lib/seo";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    links: [canonicalLink("/servicios")],
    scripts: [serviciosLd],
    meta: [
      { property: "og:url", content: pageUrl("/servicios") },
      ...shareImageMeta(
        "servicios",
        "Servicios de Cultura de Innovación: consultoría y Human Momentum. Equipo dibujado en una pizarra y dos personas conversando.",
      ),
      { title: "Servicios — Consultoría de Discovery y Human Momentum" },
      {
        name: "description",
        content:
          "Consultoría de Innovación y Discovery para líderes y equipos, y Human Momentum: 7 semanas para entrenar inteligencia emocional y comunicación empática.",
      },
      { property: "og:title", content: "Servicios — Cultura de Innovación" },
      {
        property: "og:description",
        content: "Te acompañamos a innovar con tus clientes y a crecer como personas y equipos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Servicios,
});

const consult = [
  [
    "🔍",
    "Entender",
    "Conversaciones reales con tus clientes para descubrir qué les duele de verdad.",
  ],
  [
    "🧪",
    "Probar",
    "Tu solución frente a clientes en menos de una semana, con un prototipo simple.",
  ],
  ["📈", "Decidir", "Feedback concreto para invertir tiempo, esfuerzo y dinero donde sí importa."],
];

const phases = [
  ["Fase 1", "semanas 1–2", "Auto-conexión"],
  ["Fase 2", "semanas 3–5", "Inter-conexión"],
  ["Fase 3", "semanas 6–7", "Sostener los hábitos"],
];

const weeks = [
  ["Pausar", "Regular el estrés y responder en lugar de reaccionar."],
  ["Humanizar", "Simpatizar, humanizar y conectar con las demás personas."],
  ["Observar", "Separar los hechos de nuestros juicios e interpretaciones."],
  ["Empatizar", "Reconocer emociones propias y ajenas."],
  ["Escuchar", "Comprender las necesidades humanas y saber escuchar."],
  ["Comunicar", "Resolver conflictos y llegar a acuerdos."],
  ["Motivarse", "Cultivar la motivación intrínseca."],
];

function Servicios() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-8 text-center">
        <Hand>servicios ✏️</Hand>
        <h1 className="mt-2 text-5xl font-extrabold leading-tight md:text-6xl">
          Te <span className="marker">acompañamos</span> en el camino.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Además de herramientas, trabajamos codo a codo con líderes, equipos y emprendedores: para
          innovar con evidencia y para crecer como personas.
        </p>
      </section>

      {/* Consultoría */}
      <section className="mx-auto mt-20 grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
        <div>
          <span className="sketch inline-block bg-highlight px-3 py-1 font-hand text-xl">
            01 · consultoría
          </span>
          <h2 className="mt-4 text-4xl font-bold">Innovación y Discovery</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Guío a tu equipo a entender a sus clientes y a reducir el riesgo de innovar: exponemos
            la solución a clientes reales en menos de una semana y volvemos con aprendizajes, no con
            suposiciones.
          </p>
          <div className="mt-6 space-y-4">
            {consult.map(([e, t, d], i) => (
              <div key={t} className={`sketch bg-card p-4 ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
                <p className="font-semibold">
                  {e} {t}
                </p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <SketchButton href="mailto:hola@culturadeinnovacion.com?subject=Consultoría de Discovery">
              Conversemos →
            </SketchButton>
          </div>
        </div>
        <img
          src={hero}
          alt="Equipo dibujado trabajando en una pizarra"
          width={1280}
          height={960}
          className="w-full mix-blend-multiply"
        />
      </section>

      {/* Human Momentum */}
      <section id="human-momentum" className="mx-auto mt-24 max-w-6xl scroll-mt-8 px-6">
        <div className="sketch sketch-shadow bg-card p-8 md:p-12">
          <span className="sketch inline-block bg-accent px-3 py-1 font-hand text-xl text-accent-foreground">
            02 · programa
          </span>
          <h2 className="mt-4 text-4xl font-bold">Human Momentum 🧠💛</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Un programa de 7 semanas para entrenar la inteligencia emocional y la comunicación
            empática. Piénsalo como un <span className="marker">gimnasio para la mente</span>: 15
            minutos de práctica diaria guiada, una hora de capacitación virtual cada semana y un
            workshop inicial de 4 horas con tu grupo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {phases.map(([f, s, t], i) => (
              <span
                key={f}
                className={`sketch bg-highlight px-4 py-2 ${i % 2 ? "rotate-1" : "-rotate-1"}`}
              >
                <span className="font-hand text-lg text-accent">{f}</span> · {s}:{" "}
                <strong>{t}</strong>
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {weeks.map(([t, d], i) => (
              <div
                key={t}
                className={`sketch bg-background p-4 ${i % 2 ? "rotate-1" : "-rotate-1"}`}
              >
                <p className="font-hand text-lg text-accent">semana {i + 1}</p>
                <p className="font-semibold">{t}</p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Y te llevas certificado de participación, certificado de horas en Comunicación No
            Violenta y un libro digital con la metodología.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <SketchButton href="https://humanmomentum.org/momentum" variant="accent">
              Para personas
            </SketchButton>
            <SketchButton href="https://humanmomentum.org/empresas" variant="ghost">
              Para empresas
            </SketchButton>
          </div>
        </div>
      </section>
    </>
  );
}
