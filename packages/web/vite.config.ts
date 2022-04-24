import { defineConfig } from "vite";
import type { ManifestOptions, VitePWAOptions } from "vite-plugin-pwa";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

const pwaOptions: Partial<VitePWAOptions> = {
  mode: "development",
  base: "/",
  devOptions: {
    enabled: process.env.SW_DEV === "true",
    type: "module",
    navigateFallback: "index.html",
  },
  srcDir: "src",
  filename: "sw.ts",
};

export default defineConfig({
  build: {
    sourcemap: process.env.SOURCE_MAP === "true",
  },
  server: {
    host: true,
  },
  plugins: [react(), VitePWA(pwaOptions)],
});
