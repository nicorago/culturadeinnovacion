import { createFileRoute } from "@tanstack/react-router";
import podcast from "@/assets/podcast-sketch.jpg";
import { Hand, LINKS, SketchButton } from "@/components/site";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Podcast Cultura de Innovación — con Nicolás Ramírez" },
      { name: "description", content: "Conversaciones con referentes de producto e innovación, emprendedores y coaches de negocio. En Spotify, Apple Podcasts y YouTube." },
      { property: "og:title", content: "Podcast Cultura de Innovación — con Nicolás Ramírez" },
      { property: "og:description", content: "Cómo se construyen productos que importan, contado por quienes lo hacen." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Podcast,
});

const topics = ["Product Discovery", "Cultura de experimentación", "Liderazgo de producto", "OKRs y outcomes", "Emprendimiento", "Innovación corporativa"];

function Podcast() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-8 md:grid-cols-2">
        <div>
          <Hand>🎙️ con Nicolás Ramírez</Hand>
          <h1 className="mt-2 text-5xl font-extrabold leading-tight md:text-6xl">
            Conversaciones que <span className="marker">mueven</span> la innovación.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Charlas con referentes del mundo de producto e innovación —autores como Christina Wodtke—,
            emprendedores, líderes de empresa y coaches de negocio sobre lo que realmente funciona.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <SketchButton href={LINKS.spotify} variant="accent">Escuchar en Spotify</SketchButton>
            <SketchButton href={LINKS.youtube} variant="ghost">Ver en YouTube</SketchButton>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">También en Apple Podcasts.</p>
        </div>
        <img src={podcast} alt="Dos personas conversando en un podcast, dibujo a mano" width={1200} height={960} className="w-full mix-blend-multiply" />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold">De qué hablamos</h2>
        <div className="mt-8 flex flex-wrap gap-4">
          {topics.map((t, i) => (
            <span key={t} className={`sketch px-5 py-2 text-lg ${i % 3 === 0 ? "bg-highlight" : "bg-card"} ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="sketch sketch-shadow overflow-hidden bg-card p-2">
          <iframe
            title="Podcast Cultura de Innovación en Spotify"
            src="https://open.spotify.com/embed/show/6097vhyGcbi3YMUUQUANE1"
            width="100%"
            height="352"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="rounded-xl border-0"
          />
        </div>
        <p className="mt-8 text-center font-hand text-2xl">¿Quieres ser invitado o proponer a alguien? Escríbenos por nuestras redes.</p>
      </section>
    </>
  );
}
