import { useEffect, useMemo, useState } from "react";
import { Download, Share, SquarePlus, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/cn";
import { APP_NAME } from "../../../config/app";

declare global {
  interface Window {
    /** Evento beforeinstallprompt intercettato in main.tsx, in attesa del tap dell'utente. */
    __promptInstallPwa?: { prompt: () => void; userChoice: Promise<unknown> } | null;
  }
}

type Sistema = "ios" | "android" | "altro";

function rilevaSistema(): Sistema {
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "altro";
}

/** Mini-illustrazione di un passaggio: icona + didascalia corta. */
function Step({ n, icon, children }: { n: number; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex flex-col items-center gap-1.5 text-center">
      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
        {icon}
        <span className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-700 text-[11px] font-bold text-paper-50">
          {n}
        </span>
      </span>
      <span className="text-caption text-paper-600 leading-snug">{children}</span>
    </li>
  );
}

/** Icona "app sulla schermata Home": una piccola griglia con la nuova arrivata evidenziata. */
function IconaHome() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3.5" y="3.5" width="6" height="6" rx="1.6" opacity="0.4" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1.6" opacity="0.4" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1.6" opacity="0.4" />
      <rect x="14.5" y="14.5" width="6" height="6" rx="1.6" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

/**
 * Le due card di installazione (iPhone/iPad e Android): passaggi illustrati,
 * card del sistema dell'utente in evidenza, bottone "Installa ora" diretto
 * quando il browser espone l'evento di installazione PWA.
 */
export function InstallSection() {
  const sistema = useMemo(rilevaSistema, []);
  const [installabile, setInstallabile] = useState(() => Boolean(window.__promptInstallPwa));

  useEffect(() => {
    const onInstallabile = () => setInstallabile(true);
    window.addEventListener("pwa-installabile", onInstallabile);
    return () => window.removeEventListener("pwa-installabile", onInstallabile);
  }, []);

  const installaOra = async () => {
    const evento = window.__promptInstallPwa;
    if (!evento) return;
    evento.prompt();
    await evento.userChoice;
    window.__promptInstallPwa = null;
    setInstallabile(false);
  };

  const cardIos = (
    <CardInstall evidenziata={sistema === "ios"} titolo="iPhone e iPad" sottotitolo="da Safari">
      <ol className="grid grid-cols-3 gap-2">
        <Step n={1} icon={<Share size={22} strokeWidth={1.8} />}>Tocca Condividi</Step>
        <Step n={2} icon={<SquarePlus size={22} strokeWidth={1.8} />}>"Aggiungi a schermata Home"</Step>
        <Step n={3} icon={<IconaHome />}>{APP_NAME} è tra le tue app</Step>
      </ol>
    </CardInstall>
  );

  const cardAndroid = (
    <CardInstall evidenziata={sistema === "android"} titolo="Android" sottotitolo="da Chrome">
      <ol className="grid grid-cols-3 gap-2">
        <Step n={1} icon={<MoreVertical size={22} strokeWidth={1.8} />}>Apri il menu ⋮</Step>
        <Step n={2} icon={<SquarePlus size={22} strokeWidth={1.8} />}>"Aggiungi a schermata Home"</Step>
        <Step n={3} icon={<IconaHome />}>{APP_NAME} è tra le tue app</Step>
      </ol>
      {installabile && (
        <button
          type="button"
          onClick={installaOra}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary-700 py-3 text-body-md font-semibold text-paper-50 active:bg-primary-800"
        >
          <Download size={18} /> Installa ora
        </button>
      )}
    </CardInstall>
  );

  // La card del sistema rilevato viene prima: su mobile è la prima che si vede.
  const cards = sistema === "android" ? [cardAndroid, cardIos] : [cardIos, cardAndroid];

  return (
    <section aria-label="Come installare l'app" className="grid gap-4 md:grid-cols-2">
      {cards[0]}
      {cards[1]}
    </section>
  );
}

function CardInstall({
  evidenziata,
  titolo,
  sottotitolo,
  children,
}: {
  evidenziata: boolean;
  titolo: string;
  sottotitolo: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "rounded-3xl bg-paper-0 p-5 shadow-card border",
        evidenziata ? "border-primary-400 ring-2 ring-primary-300/60" : "border-paper-100",
      )}
    >
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h3 className="font-display text-title-lg text-paper-900">{titolo}</h3>
        <span className="text-caption text-paper-500">{sottotitolo}</span>
      </div>
      {evidenziata && (
        <p className="mb-3 -mt-2 text-caption font-semibold text-primary-700 dark:text-primary-300">Per il tuo dispositivo</p>
      )}
      {children}
    </motion.div>
  );
}
