import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["*.svg", "*.png"],
      mode: "development",
      base: "/",
      srcDir: "src",
      filename: "sw.ts",
      strategies: "injectManifest",
      registerType: "autoUpdate",
      injectRegister: "inline",
      workbox: {
        cleanupOutdatedCaches: false,
        sourcemap: true,
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
