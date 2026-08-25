import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // HTTPS in dev con certificato locale auto-generato: la fotocamera dello
    // scanner barcode richiede un "secure context", quindi serve anche
    // testando da telefono sull'IP di rete locale, non solo su localhost.
    // (HTTP_ONLY=1 disattiva l'https per verifiche rapide in ambienti che non
    // possono accettare un certificato self-signed, es. browser automatizzati.)
    ...(process.env.HTTP_ONLY ? [] : [basicSsl()]),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "MealPrep",
        short_name: "MealPrep",
        description: "Pianifica la settimana, scopri ricette italiane e genera la lista della spesa.",
        lang: "it",
        theme_color: "#234a36",
        background_color: "#fbf8f2",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "icons/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
          { src: "icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        navigateFallback: "/index.html",
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
