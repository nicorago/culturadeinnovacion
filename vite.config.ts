import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Standard Vite + TanStack Start setup. Nitro builds a Cloudflare Workers bundle
// (preset "cloudflare-module") into .output/server with publishable pages in dist/.
export default defineConfig(({ command }) => ({
  server: { host: "::", port: 8080 },
  resolve: { dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"] },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    // src/server.ts wraps TanStack Start's server entry with an SSR error page.
    tanstackStart({ server: { entry: "server" } }),
    ...(command === "build"
      ? [
          nitro({
            preset: "cloudflare-module",
            output: { publicDir: "dist" },
            prerender: { routes: ["/", "/brujula", "/planes", "/podcast", "/servicios"] },
          }),
        ]
      : []),
    viteReact(),
  ],
}));
