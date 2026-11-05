import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const LINKS = {
  brujula: "https://brujula.culturadeinnovacion.com/",
  login: "https://brujula.culturadeinnovacion.com/login",
  registro: (plan: string) => `https://brujula.culturadeinnovacion.com/registro?plan=${plan.toLowerCase()}`,
  planes: "/planes",
  spotify: "https://open.spotify.com/show/6097vhyGcbi3YMUUQUANE1?si=7102920dd3ad4597",
  youtube: "https://www.youtube.com/@culturadeinnovacion",
};

export function SketchButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "accent";
}) {
  const styles = {
    solid: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
    ghost: "bg-card text-foreground",
  }[variant];
  return (
    <a
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`sketch sketch-shadow wobble inline-flex items-center gap-2 px-6 py-3 font-semibold ${styles}`}
    >
      {children}
    </a>
  );
}

export function Header() {
  const nav = "font-medium hover:underline decoration-accent decoration-2 underline-offset-4";
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="sketch grid h-10 w-10 place-items-center bg-highlight font-hand text-2xl">ci</span>
        <span className="font-display text-lg font-bold leading-none">
          Cultura de <br />
          Innovación
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link to="/brujula" className={nav} activeProps={{ className: "underline" }}>
          Brújula
        </Link>
        <Link to="/servicios" className={nav} activeProps={{ className: "underline" }}>
          Servicios
        </Link>
        <Link to="/podcast" className={nav} activeProps={{ className: "underline" }}>
          Podcast
        </Link>
        <a href={LINKS.planes} className="sketch hidden bg-primary px-4 py-2 font-semibold text-primary-foreground sm:inline-block">
          Probar gratis
        </a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-dashed">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="font-hand text-2xl">Innovar es aprender de tus clientes, más rápido. ✏️</p>
        <div className="flex flex-wrap gap-5 text-sm">
          <a href={LINKS.brujula} target="_blank" rel="noreferrer" className="hover:underline">Brújula</a>
          <a href={LINKS.spotify} target="_blank" rel="noreferrer" className="hover:underline">Spotify</a>
          <a href={LINKS.youtube} target="_blank" rel="noreferrer" className="hover:underline">YouTube</a>
          <span className="text-muted-foreground">© {new Date().getFullYear()} Cultura de Innovación</span>
        </div>
      </div>
    </footer>
  );
}

export function Hand({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-hand text-2xl text-accent ${className}`}>{children}</span>;
}
