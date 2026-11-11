import type { ReactNode } from "react";
import { Hand, LINKS, SketchButton } from "@/components/site";

/** Brújula dibujada a mano: trazo doble e irregular y una aguja que gira sin rumbo. */
export function LostCompass({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Brújula dibujada a mano, con la aguja dando vueltas"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Aro, dibujado dos veces como a lápiz */}
      <path
        d="M60 9c27 1 51 22 51 51s-23 52-52 51C31 110 9 88 9 60 10 32 33 9 60 9Z"
        strokeWidth="3"
      />
      <path
        d="M58 13c25-1 48 21 49 47 1 27-21 48-48 48-26 0-46-22-46-48 0-25 20-46 45-47Z"
        strokeWidth="1.2"
        opacity="0.5"
      />
      {/* Marcas cardinales */}
      <path d="M60 18v8M60 94v8M18 60h8M94 60h8" strokeWidth="2.5" />
      <text
        x="60"
        y="38"
        textAnchor="middle"
        fontSize="13"
        fill="currentColor"
        stroke="none"
        className="font-hand"
      >
        N
      </text>
      <text
        x="88"
        y="64"
        textAnchor="middle"
        fontSize="11"
        fill="currentColor"
        stroke="none"
        className="font-hand"
      >
        ¿?
      </text>
      {/* Aguja */}
      <g className="compass-needle">
        <path d="M60 60 L54 58 L60 26 L66 58 Z" className="fill-accent" strokeWidth="2" />
        <path d="M60 60 L66 62 L60 94 L54 62 Z" className="fill-card" strokeWidth="2" />
        <circle cx="60" cy="60" r="3.5" className="fill-foreground" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/** Rastro punteado que termina en una X: "estabas aquí". */
function Trail() {
  return (
    <svg
      viewBox="0 0 220 60"
      aria-hidden="true"
      className="h-12 w-56 text-muted-foreground"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path
        d="M6 44c22-26 40 8 62-6s24-30 50-18 30 22 52 10"
        strokeWidth="2.5"
        strokeDasharray="2 9"
      />
      <path d="M178 22l14 14M192 22l-14 14" strokeWidth="3" className="stroke-accent" />
    </svg>
  );
}

export function LostPage({
  code,
  title,
  note,
  children,
}: {
  code: string;
  title: ReactNode;
  note: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center md:py-24">
      <LostCompass className="h-36 w-36 text-foreground md:h-44 md:w-44" />
      <p className="mt-6 font-display text-6xl font-extrabold md:text-7xl">
        <span className="marker">{code}</span>
      </p>
      <h1 className="mt-4 text-3xl font-bold md:text-4xl">{title}</h1>
      <Hand className="mt-3 block">{note}</Hand>
      <div className="mt-2">
        <Trail />
      </div>
      {children}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <SketchButton href="/">Volver al inicio</SketchButton>
        <SketchButton href="/servicios" variant="ghost">
          Ver servicios
        </SketchButton>
        <SketchButton href={LINKS.spotify} variant="ghost">
          🎧 Escuchar el podcast
        </SketchButton>
      </div>
    </section>
  );
}
