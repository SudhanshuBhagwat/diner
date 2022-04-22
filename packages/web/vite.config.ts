import { defineConfig } from "vite";
import type { ManifestOptions, VitePWAOptions } from "vite-plugin-pwa";
import { VitePWA } from "vite-plugin-pwa";
import replace from "@rollup/plugin-replace";
import react from "@vitejs/plugin-react";

const pwaOptions: Partial<VitePWAOptions> = {
  mode: "development",
  base: "/",
  includeAssets: ["favicon.svg"],
  manifest: {
    name: "Diner App",
    short_name: "Diner",
    theme_color: "#ffffff",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  strategies: "injectManifest",
  srcDir: "src",
  filename: "sw.js",
};

export default defineConfig({
  build: {
    sourcemap: process.env.SOURCE_MAP === "true",
  },
  plugins: [react(), VitePWA(pwaOptions)],
});
