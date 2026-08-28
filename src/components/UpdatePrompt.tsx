import { RefreshCw } from "lucide-react";
import { useRegisterSW } from "virtual:pwa-register/react";

/** Ogni quanto controllare se è uscito un aggiornamento mentre l'app resta aperta. */
const INTERVALLO_CONTROLLO_MS = 30 * 60 * 1000;

/**
 * Aggiornamenti PWA mai silenziosi. Il service worker nuovo resta IN ATTESA
 * (vedi registerType: "prompt" in vite.config.ts) finché non è l'utente a
 * dare il via toccando questo banner — mai uno scambio di versione sotto i
 * piedi mentre l'app è già aperta.
 *
 * Chi invece la riapre da zero, con nessuna scheda della versione precedente
 * rimasta indietro, la ottiene comunque in automatico: è il browser stesso
 * ad attivare da solo il service worker in attesa non appena l'ultima scheda
 * vecchia si chiude — questo componente in quel caso non mostra nulla.
 */
export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      if (!registration) return;
      // Controllo periodico: senza, il browser scoprirebbe un nuovo deploy solo
      // alla prossima navigazione o dopo ore — con una SPA come questa, che
      // resta aperta a lungo, l'aggiornamento arriverebbe troppo tardi.
      window.setInterval(() => registration.update(), INTERVALLO_CONTROLLO_MS);
    },
  });

  if (!needRefresh) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[200] flex justify-center px-4 pt-[calc(env(safe-area-inset-top)+12px)]">
      <button
        type="button"
        onClick={() => updateServiceWorker(true)}
        className="flex items-center gap-2 rounded-full bg-primary-800 px-5 py-3 text-body-sm font-semibold text-paper-50 shadow-elevated active:bg-primary-900"
      >
        <RefreshCw size={16} />
        È disponibile una nuova versione, tocca per aggiornare
      </button>
    </div>
  );
}
