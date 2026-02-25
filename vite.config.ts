import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const swDev = env.SW_DEV;

  return {
    plugins: [
      devtools(),
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
        routesDirectory: "src/routes",
        generatedRouteTree: "src/codegen/router/route-tree.gen.ts",
        enableRouteGeneration: true,
        quoteStyle: "double",
        semicolons: true,
      }),
      viteReact(),
      tailwindcss(),
      tsconfigPaths(),
      svgr({ include: "**/*.svg" }),
      VitePWA({
        mode: mode as "development" | "production",
        base: "/",
        includeAssets: ["favicon.svg"],
        registerType: "autoUpdate",
        devOptions: {
          enabled: swDev === "true",
          type: "module",
        },
        manifest: {
          id: "genario",
          name: "Genario - AI Scenario generator",
          short_name: "Genario",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          start_url: "/home",
          related_applications: [
            {
              platform: "webapp",
              url: "https://app.genario.ru/manifest.webmanifest",
            },
          ],
          icons: [
            {
              src: "favicon.ico",
              type: "image/x-icon",
              sizes: "64x64 32x32 24x24 16x16",
            },
            {
              src: "logo-192.png",
              type: "image/png",
              sizes: "192x192",
            },
            {
              src: "logo-512.png",
              type: "image/png",
              sizes: "512x512",
            },
          ],
        },
      }),
    ],
  };
});
