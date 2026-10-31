import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Compass,
  MessageCircle,
  Pause,
  Play,
  Wand2,
  Lightbulb,
} from "lucide-react";
import { SketchAction } from "@/components/discovery-controls";
import {
  ideaQuestions,
  interviewQuestions,
  initialOpportunities,
  initialOutcome,
  initialPersona,
  initialSolutions,
} from "@/lib/discovery-demo";

const scenes = ["Tu idea", "La entrevista", "Los artefactos", "Tu oportunidad", "Una prueba"];

export function DiscoveryPreview() {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setScene((s) => (s + 1) % scenes.length), 4000);
    return () => window.clearInterval(timer);
  }, [playing]);
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="font-hand text-2xl text-accent">
            de una idea a una prueba, sin perder el hilo
          </p>
          <h2 className="mt-2 text-3xl font-bold">Brújula, en movimiento.</h2>
        </div>
        <SketchAction asChild variant="outline">
          <Link to="/app/idea">
            Explorar el ejemplo
            <ArrowRight />
          </Link>
        </SketchAction>
      </div>
      <div
        className="sketch sketch-shadow overflow-hidden bg-card"
        aria-label="Recorrido animado de Brújula"
      >
        <div className="flex items-center justify-between gap-3 border-b-2 border-dashed bg-background px-5 py-4">
          <span className="flex items-center gap-2 font-display font-bold">
            <Compass className="text-accent" size={20} />
            Brújula
          </span>
          <span className="text-xs text-muted-foreground">Encontrar parqueo sin dar vueltas</span>
        </div>
        <div className="preview-stage">
          <div
            key={scene}
            className="preview-scene grid h-full content-start gap-8 p-5 sm:p-8 md:grid-cols-[210px_1fr]"
          >
            <aside>
              <p className="font-hand text-4xl text-accent">0{scene + 1} →</p>
              <h3 className="mt-3 text-2xl font-bold">{scenes[scene]}</h3>
              <p className="mt-4 text-xs text-muted-foreground">
                Ejemplo ficticio · hipótesis sin validar
              </p>
            </aside>
            <div className="min-w-0">
              {scene === 0 && (
                <>
                  <p className="mb-4 text-xs font-semibold text-muted-foreground">
                    PREGUNTA 2 DE 7
                  </p>
                  <h3 className="text-xl font-bold">¿Qué necesita resolver tu cliente?</h3>
                  <div className="sketch mt-6 bg-background p-5 text-sm leading-relaxed">
                    {ideaQuestions[1]?.answer}
                    <span className="preview-cursor" aria-hidden="true">
                      ▏
                    </span>
                  </div>
                  <div className="mt-5 text-right font-hand text-xl text-accent">Siguiente →</div>
                </>
              )}
              {scene === 1 && (
                <>
                  <p className="mb-4 flex items-center gap-2 text-sm font-semibold">
                    <MessageCircle size={18} />
                    Tu boceto de entrevista
                  </p>
                  <h3 className="text-xl font-bold">{interviewQuestions[2]?.question}</h3>
                  <blockquote className="sketch mt-6 bg-highlight/30 p-5 font-hand text-2xl">
                    “{interviewQuestions[2]?.answer}”
                  </blockquote>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Relato simulado · 0 entrevistas reales
                  </p>
                </>
              )}
              {scene === 2 && (
                <>
                  <p className="flex items-center gap-2 text-lg font-bold">
                    <Wand2 size={20} className="text-accent" />
                    Crear artefactos con AI
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Persona", initialPersona.name],
                      ["Journey", "Llegar → Buscar → Estacionar"],
                      ["Job to be done", "Llegar tranquila y a tiempo"],
                    ].map(([title, copy], i) => (
                      <article
                        key={title}
                        className={`preview-artifact preview-artifact-${i} sketch bg-background p-4`}
                      >
                        <Check size={18} className="text-accent" />
                        <h4 className="mt-3 font-semibold">{title}</h4>
                        <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
                      </article>
                    ))}
                  </div>
                  <p className="mt-5 text-xs text-muted-foreground">
                    Borradores editables · generación simulada
                  </p>
                </>
              )}
              {scene === 3 && (
                <>
                  <div className="sketch bg-background px-4 py-3 text-sm font-semibold">
                    {initialOutcome}
                  </div>
                  <div className="ost-stem" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {initialOpportunities.slice(1, 3).map((o, i) => (
                      <div
                        key={o.id}
                        className={`sketch p-4 text-sm ${i === 0 ? "bg-highlight/40" : "bg-background"}`}
                      >
                        <p className="mb-2 font-hand text-lg text-accent">
                          {i === 0 ? "✓ oportunidad target" : "otra oportunidad"}
                        </p>
                        {o.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {scene === 4 && (
                <>
                  <p className="flex items-center gap-2 font-hand text-2xl text-accent">
                    <Lightbulb size={22} />
                    antes de construir…
                  </p>
                  <h3 className="mt-3 text-xl font-bold">{initialSolutions[0]?.title}</h3>
                  <p className="mt-5 text-sm leading-relaxed">{initialSolutions[0]?.test}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {["Prototipo manual", "Observar clientes", "Decidir con evidencia"].map((t) => (
                      <span key={t} className="border-b-2 border-accent pb-2 text-sm font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-xs text-muted-foreground">
                    Prueba propuesta · todavía no ejecutada
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed px-4 py-3">
          <div className="flex flex-wrap gap-1" aria-label="Pantallas del recorrido">
            {scenes.map((s, i) => (
              <SketchAction
                key={s}
                variant="ghost"
                className={`min-h-9 px-3 py-2 text-xs ${scene === i ? "bg-highlight/50" : ""}`}
                aria-current={scene === i ? "step" : undefined}
                onClick={() => {
                  setScene(i);
                  setPlaying(false);
                }}
              >
                {i + 1}. {s}
              </SketchAction>
            ))}
          </div>
          <SketchAction
            variant="ghost"
            size="icon"
            className="h-10 w-10 p-0"
            aria-label={playing ? "Pausar animación" : "Reproducir animación"}
            title={playing ? "Pausar animación" : "Reproducir animación"}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause /> : <Play />}
          </SketchAction>
        </div>
      </div>
    </section>
  );
}
