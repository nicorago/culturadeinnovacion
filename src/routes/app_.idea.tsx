import { createFileRoute } from "@tanstack/react-router";
import { DiscoveryWorkflow } from "@/components/discovery-workflow";

export const Route = createFileRoute("/app_/idea")({
  head: () => ({
    meta: [
      { title: "Tu primera idea — Discovery con Brújula" },
      {
        name: "description",
        content:
          "Un recorrido ilustrativo de una idea a su hipótesis, entrevista, persona, journey, árbol de oportunidades y experimento.",
      },
      { property: "og:title", content: "Tu primera idea — Discovery con Brújula" },
      {
        property: "og:description",
        content:
          "Explora el ejemplo de Product Discovery de Brújula, desde el cliente hasta una prueba pequeña.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DiscoveryWorkflow,
});
