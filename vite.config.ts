import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { APP_NAME, APP_SHORT_NAME, APP_DESCRIPTION, APP_ICONS } from "./src/config/app.ts";

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
      // "prompt", non "autoUpdate": un nuovo service worker resta IN ATTESA
      // finché non è l'utente a dare il via (banner in UpdatePrompt.tsx) —
      // mai uno scambio di versione silenzioso mentre l'app è già aperta.
      // Chi la riapre da zero (nessuna scheda rimasta indietro) la ottiene
      // comunque in automatico: è il browser stesso ad attivare il service
      // worker in attesa non appena l'ultima scheda della versione precedente
      // si chiude — nessun prompt necessario in quel caso.
      registerType: "prompt",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: APP_NAME,
        short_name: APP_SHORT_NAME,
        description: APP_DESCRIPTION,
        lang: "it",
        theme_color: "#234a36",
        background_color: "#fbf8f2",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          { src: APP_ICONS.icon192, sizes: "192x192", type: "image/png", purpose: "any" },
          { src: APP_ICONS.icon512, sizes: "512x512", type: "image/png", purpose: "any" },
          { src: APP_ICONS.iconMaskable192, sizes: "192x192", type: "image/png", purpose: "maskable" },
          { src: APP_ICONS.iconMaskable512, sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff,woff2}"],
        navigateFallback: "/index.html",
        // Non salta l'attesa da solo (coerente con registerType: "prompt" — è il
        // messaggio SKIP_WAITING di updateServiceWorker() a farlo scattare) ma,
        // una volta attivato, prende il controllo di tutte le schede subito:
        // basta la reload che l'app fa già dopo l'ok dell'utente, non due.
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
