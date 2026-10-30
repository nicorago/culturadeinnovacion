import { createFileRoute, useNavigate } from "@tanstack/react-router";
import hero from "@/assets/hero-team.jpg";
import { Hand } from "@/components/site";

export const Route = createFileRoute("/registro")({
  validateSearch: (s: Record<string, unknown>) => ({ plan: typeof s["plan"] === "string" ? (s["plan"] as string) : "Startup" }),
  head: () => ({
    meta: [
      { title: "Crea tu cuenta — Brújula" },
      { name: "description", content: "Regístrate en Brújula con tu nombre, correo y celular y empieza a hacer Product Discovery hoy." },
      { property: "og:title", content: "Crea tu cuenta — Brújula" },
      { property: "og:description", content: "Empieza a validar ideas con evidencia de tus clientes." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Registro,
});

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="font-hand text-2xl">{label}</span>
      <input type={type} placeholder={placeholder} className="sketch mt-1 w-full bg-background px-4 py-3 outline-none focus:bg-highlight/30" />
    </label>
  );
}

function Registro() {
  const { plan } = Route.useSearch();
  const navigate = useNavigate();
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-6 md:grid-cols-2">
      <div className="hidden md:block">
        <img src={hero} alt="Equipo trabajando alrededor de una brújula dibujada" width={1280} height={960} className="w-full mix-blend-multiply" />
        <p className="text-center font-hand text-3xl">tu primera oportunidad te espera →</p>
      </div>
      <form
        className="sketch sketch-shadow bg-card p-8 md:p-10"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/app" });
        }}
      >
        <span className="sketch inline-block bg-highlight px-3 py-1 text-sm font-semibold">Plan {plan}</span>
        <h1 className="mt-4 text-4xl font-extrabold">Crea tu cuenta</h1>
        <p className="mt-2 text-muted-foreground">Menos de un minuto. Lo prometemos.</p>
        <div className="mt-8 space-y-5">
          <Field label="tu nombre" type="text" placeholder="Nicolás Ramírez" />
          <Field label="tu correo" type="email" placeholder="nicolas@empresa.com" />
          <Field label="tu celular" type="tel" placeholder="+593 99 123 4567" />
        </div>
        <button type="submit" className="sketch wobble mt-8 w-full bg-primary py-3 font-semibold text-primary-foreground">
          Empezar a usar Brújula →
        </button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta? <span className="underline decoration-accent decoration-2">Entrar</span>
        </p>
        <Hand className="mt-2 block text-center text-xl">sin tarjeta de crédito</Hand>
      </form>
    </section>
  );
}
