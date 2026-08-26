import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App.tsx";

// L'evento di installazione PWA arriva presto, spesso prima che la landing
// monti: lo si intercetta qui e lo si tiene da parte per il bottone
// "Installa ora" (vedi InstallSection).
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  window.__promptInstallPwa = e as unknown as Window["__promptInstallPwa"];
  window.dispatchEvent(new Event("pwa-installabile"));
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
