import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-team.jpg";
import path from "@/assets/discovery-path.jpg";
import podcast from "@/assets/podcast-sketch.jpg";
import { Hand, LINKS, SketchButton } from "@/components/site";
import { canonicalLink, pageUrl, shareImageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [canonicalLink("/")],
    meta: [
      { property: "og:url", content: pageUrl("/") },
      ...shareImageMeta(
        "inicio",
        "Cultura de Innovación: innova con evidencia, no con corazonadas. Equipo dibujado alrededor de una pizarra con una brújula.",
      ),
      { title: "Cultura de Innovación — Innovación basada en evidencia" },
      {
        name: "description",
        content:
          "Ayudamos a líderes de innovación y producto a decidir en qué invertir con evidencia real de sus clientes. Conoce Brújula y el podcast.",
      },
      { property: "og:title", content: "Cultura de Innovación — Innovación basada en evidencia" },
      {
        property: "og:description",
        content:
          "Brújula, la plataforma de Product Discovery, y el podcast Cultura de Innovación con Nicolás Ramírez.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pains = [
  "Proyectos que se aprueban por opinión, no por evidencia.",
  "Meses construyendo algo que ningún cliente pidió.",
  "Aprendizajes de clientes perdidos en slides y correos.",
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-8 md:grid-cols-2">
        <div>
          <Hand>para líderes de innovación y producto</Hand>
          <h1 className="mt-2 text-5xl font-extrabold leading-[1.05] md:text-6xl">
            Innova con <span className="marker">evidencia</span>, no con corazonadas.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            En Cultura de Innovación ayudamos a empresas a entender a sus clientes, probar ideas en
            días y decidir en qué invertir tiempo y dinero.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <SketchButton href={LINKS.planes}>Probar Brújula gratis →</SketchButton>
            <SketchButton href={LINKS.spotify} variant="ghost">
              🎧 Escuchar el podcast
            </SketchButton>
          </div>
        </div>
        <img
          src={hero}
          alt="Equipo dibujado alrededor de una pizarra con una brújula y notas adhesivas"
          width={1280}
          height={960}
          className="w-full mix-blend-multiply"
        />
      </section>

      {/* Pains */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">¿Te suena familiar?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pains.map((p, i) => (
            <div
              key={p}
              className={`sketch bg-card p-6 text-lg ${i === 1 ? "md:rotate-1" : "md:-rotate-1"}`}
            >
              <span className="font-hand text-3xl text-accent">✗</span>
              <p className="mt-2">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two products */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Hand>dos formas de acompañarte</Hand>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">
            Una herramienta y una conversación
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <article className="sketch sketch-shadow bg-card p-8">
            <span className="sketch inline-block bg-highlight px-3 py-1 text-sm font-semibold">
              La plataforma
            </span>
            <h3 className="mt-4 text-3xl font-bold">🧭 Brújula</h3>
            <p className="mt-3 text-muted-foreground">
              Product Discovery estructurado, de la oportunidad a la decisión. Inspirado en Teresa
              Torres, Marty Cagan, Jake Knapp y Lean Startup, con un Coach AI que te guía en cada
              paso.
            </p>
            <img
              src={path}
              alt="Camino de descubrimiento dibujado: cliente, árbol de oportunidades, idea, prototipo y bandera"
              width={1600}
              height={800}
              loading="lazy"
              className="my-6 w-full mix-blend-multiply"
            />
            <div className="flex flex-wrap gap-3">
              <SketchButton href={LINKS.planes}>Empezar gratis</SketchButton>
              <Link
                to="/brujula"
                className="px-4 py-3 font-semibold underline decoration-accent decoration-2 underline-offset-4"
              >
                Cómo funciona
              </Link>
            </div>
          </article>
          <article className="sketch sketch-shadow bg-card p-8">
            <span className="sketch inline-block bg-accent px-3 py-1 text-sm font-semibold">
              El podcast
            </span>
            <h3 className="mt-4 text-3xl font-bold">🎙️ Cultura de Innovación</h3>
            <p className="mt-3 text-muted-foreground">
              Conversaciones de Nicolás Ramírez con referentes de producto e innovación,
              emprendedores y coaches de negocio sobre cómo se construyen productos que importan.
            </p>
            <img
              src={podcast}
              alt="Dos personas conversando con micrófonos y audífonos"
              width={1200}
              height={960}
              loading="lazy"
              className="my-6 mx-auto w-4/5 mix-blend-multiply"
            />
            <div className="flex flex-wrap gap-3">
              <SketchButton href={LINKS.spotify} variant="accent">
                Spotify
              </SketchButton>
              <SketchButton href={LINKS.youtube} variant="ghost">
                YouTube
              </SketchButton>
              <Link
                to="/podcast"
                className="px-4 py-3 font-semibold underline decoration-accent decoration-2 underline-offset-4"
              >
                Ver más
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Audience */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-bold md:text-4xl">Hecho para quienes apuestan por lo nuevo</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="sketch bg-highlight p-6 md:col-span-1">
            <p className="font-hand text-2xl">principalmente…</p>
            <h3 className="mt-1 text-xl font-bold">
              Directores y gerentes de innovación y producto
            </h3>
            <p className="mt-2">
              Que necesitan más aciertos, menos apuestas a ciegas y un portafolio respaldado por
              clientes reales.
            </p>
          </div>
          <div className="sketch bg-card p-6">
            <h3 className="text-xl font-bold">Product managers y gerentes generales</h3>
            <p className="mt-2 text-muted-foreground">
              Que quieren un lenguaje común para decidir qué construir y por qué.
            </p>
          </div>
          <div className="sketch bg-card p-6">
            <h3 className="text-xl font-bold">Emprendedores</h3>
            <p className="mt-2 text-muted-foreground">
              Que quieren validar su idea de negocio antes de invertir sus ahorros.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6">
        <div className="sketch sketch-shadow bg-primary p-10 text-center text-primary-foreground md:p-14">
          <h2 className="text-3xl font-bold md:text-4xl">Tu próxima gran idea merece evidencia.</h2>
          <p className="mt-3 font-hand text-2xl text-highlight">empieza gratis, hoy mismo</p>
          <div className="mt-6">
            <SketchButton href={LINKS.planes} variant="accent">
              Ver planes de Brújula
            </SketchButton>
          </div>
        </div>
      </section>
    </>
  );
}
