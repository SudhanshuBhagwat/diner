import { defineConfig } from "vite";
import type { VitePWAOptions } from "vite-plugin-pwa";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

const pwaOptions: Partial<VitePWAOptions> = {
  includeAssets: ["favicon.svg"],
  manifest: {
    name: "Diner App",
    short_name: "Diner",
    theme_color: "#F9FAFB",
    background_color: "#F9FAFB",
    scope: "/",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  strategies: "injectManifest",
  srcDir: "src",
  filename: "sw.js",
};

export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],
});
