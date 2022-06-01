import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { VitePWAOptions } from "vite-plugin-pwa";
import { VitePWA } from "vite-plugin-pwa";

const pwaOptions: Partial<VitePWAOptions> = {
  mode: "development",
  base: "/",
  devOptions: {
    enabled: process.env.SW_DEV === "true",
    type: "module",
    navigateFallback: "index.html",
  },
};

if (process.env.SW === "true") {
  pwaOptions.srcDir = "src";
  pwaOptions.filename = "sw.ts";
}

export default defineConfig({
  build: {
    sourcemap: process.env.SOURCE_MAP === "true",
  },
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "react-native": "react-native-web",
    },
  },
  plugins: [react(), VitePWA(pwaOptions)],
});
