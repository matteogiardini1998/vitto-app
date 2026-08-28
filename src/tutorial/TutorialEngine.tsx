import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/cn";
import { ChalkFumetto } from "../chalk";
import { useTutorialStore } from "../store/tutorialStore";
import { useShoppingStore } from "../store/shoppingStore";
import { useToastStore } from "../store/toastStore";
import { APP_NAME, APP_TAGLINE } from "../config/app";
import iconHero from "../assets/icon-hero.webp";
import { BEATS, type Beat, type ContestoTutorial } from "./beats";

/** Bersagli rotondi: il glow segue la forma reale del bottone. */
const BERSAGLI_CIRCOLARI = new Set(["hub", "profilo-avatar", "scanner-btn"]);
const FINESTRA_TAP_RAPIDI_MS = 700;
const SOGLIA_TAP_RAPIDI = 3;
const LARGHEZZA_ANNOTAZIONE = 260;
/** Solo per il clamp verticale: altezza "tipica" di un fumetto a 1-2 righe, mai il layout reale (che resta auto-height). */
const ALTEZZA_ANNOTAZIONE_STIMATA = 140;

type Rect = { top: number; left: number; width: number; height: number };

function leggiRect(el: Element | null): Rect | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

function stessoRect(a: Rect | null, b: Rect | null) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height;
}

function leggiWizardStep(): number | null {
  const el = document.querySelector("[data-wizard-step]");
  if (!el) return null;
  const v = el.getAttribute("data-wizard-step");
  return v === null ? null : Number(v);
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/**
 * Motore del tutorial: un solo componente, montato una volta in cima
 * all'app, che pilota tutti i passi. Non conosce le schermate — trova i
 * bersagli reali via `data-tutorial="..."` e li osserva a intervalli
 * brevi, così segue l'app ovunque l'utente la porti invece di dettarle il
 * percorso. Se un bersaglio non è (ancora) in pagina, si mette da parte in
 * silenzio: nessun overlay orfano, nessun blocco.
 *
 * Velo scuro: UNO solo, leggero, sempre uguale — mai un "buco" scuro che fa
 * sembrare il resto dello schermo spento. L'evidenziazione di un bersaglio è
 * un alone pulsante (pulse-glow) sul bersaglio reale, mai una scuritura
 * aggiuntiva né una freccia: il contenuto reale (tag da scegliere, liste,
 * bottoni) resta sempre leggibile e chiaramente toccabile a vista.
 */
export function TutorialEngine() {
  const location = useLocation();
  const navigate = useNavigate();
  const attivo = useTutorialStore((s) => s.attivo);
  const passoCorrente = useTutorialStore((s) => s.passoCorrente);
  const eraReplay = useTutorialStore((s) => s.eraReplay);
  const avanza = useTutorialStore((s) => s.avanza);
  const salta = useTutorialStore((s) => s.salta);
  const vociSpesaCount = useShoppingStore((s) => s.voci.length);
  const showToast = useToastStore((s) => s.show);

  const beat = BEATS.find((b) => b.id === passoCorrente) ?? null;
  const [rect, setRect] = useState<Rect | null>(null);
  const tapTimestamps = useRef<number[]>([]);

  // Riposiziona sul bersaglio reale e valuta l'avanzamento "azione" a intervalli
  // brevi: il layout dell'app sotto non è sotto il nostro controllo, quindi non
  // ci si affida a un solo render per accorgersi che l'utente ha agito.
  useEffect(() => {
    if (!attivo || !beat) {
      setRect(null);
      return;
    }
    const tick = () => {
      const el = beat.target ? document.querySelector(`[data-tutorial="${beat.target}"]`) : null;
      const next = leggiRect(el);
      setRect((prev) => (stessoRect(prev, next) ? prev : next));

      if (beat.avanzamento.tipo === "azione") {
        const ctx: ContestoTutorial = {
          pathname: location.pathname,
          wizardStep: leggiWizardStep(),
          vociSpesaCount,
        };
        if (beat.avanzamento.verifica(ctx)) avanza();
      }
    };
    tick();
    const id = window.setInterval(tick, 150);
    window.addEventListener("resize", tick);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("resize", tick);
    };
  }, [attivo, beat, location.pathname, vociSpesaCount, avanza]);

  // Tap rapidi ripetuti: solo se questa è la RIVISITA di un tutorial già
  // completato in passato, tre tap ravvicinati saltano tutto. Alla prima
  // volta assoluta questo listener non è nemmeno attivo: i tap rapidi restano
  // solo "prossima annotazione", mai uno skip.
  useEffect(() => {
    if (!attivo || !eraReplay) return;
    const onPointerDown = () => {
      const ora = Date.now();
      const recenti = [...tapTimestamps.current, ora].filter((t) => ora - t < FINESTRA_TAP_RAPIDI_MS);
      tapTimestamps.current = recenti;
      if (recenti.length >= SOGLIA_TAP_RAPIDI) {
        tapTimestamps.current = [];
        salta();
        showToast("Tutorial saltato — lo ritrovi nel profilo");
      }
    };
    window.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () => window.removeEventListener("pointerdown", onPointerDown, { capture: true });
  }, [attivo, eraReplay, salta, showToast]);

  if (!attivo || !beat) return null;

  if (beat.chiusura) {
    // Chiude il tutorial e porta subito dove si inizia davvero a usare l'app.
    return createPortal(<Chiusura onFine={() => { avanza(); navigate("/meal-prep"); }} />, document.body);
  }

  const isTap = beat.avanzamento.tipo === "tap";
  const isCircolare = beat.target ? BERSAGLI_CIRCOLARI.has(beat.target) : false;
  const padding = isCircolare ? 10 : 7;

  return createPortal(
    // pointer-events:none sul contenitore: di default il tutorial non intercetta NULLA.
    // Solo l'overlay scuro (nei passi "tap") si riattiva esplicitamente sotto.
    <div className="fixed inset-0 z-[999] pointer-events-none" aria-live="polite">
      {/* Un solo velo, leggero, sempre uguale: segnala "modalità guidata attiva"
          senza mai far sembrare l'app spenta o non toccabile. */}
      <div
        className="absolute inset-0 bg-[#140c08]/12"
        style={{ pointerEvents: isTap ? "auto" : "none" }}
        onClick={isTap ? () => avanza() : undefined}
      />

      {/* Evidenziazione = un solo alone pulsante sul bersaglio reale, mai una
          scuritura aggiuntiva né una freccia: richiama l'attenzione senza
          spegnere il resto e senza bisogno di puntare da lontano. */}
      {rect && beat.evidenzia && (
        <div
          className={cn("absolute tutorial-glow", isCircolare ? "rounded-full" : "rounded-2xl")}
          style={{
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
            pointerEvents: "none",
          }}
        />
      )}

      {rect && <Annotazione beat={beat} rect={rect} />}
    </div>,
    document.body,
  );
}

function Annotazione({ beat, rect }: { beat: Beat; rect: Rect }) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const centroX = rect.left + rect.width / 2;
  const centroY = rect.top + rect.height / 2;
  const GAP = 18;

  const orizzontale: CSSProperties = {
    left: clamp(centroX - LARGHEZZA_ANNOTAZIONE / 2, 8, vw - LARGHEZZA_ANNOTAZIONE - 8),
    width: LARGHEZZA_ANNOTAZIONE,
  };

  let posizione: CSSProperties;
  let puntaOffset: number;
  if (beat.posizione === "sopra") {
    posizione = { ...orizzontale, top: clamp(rect.top - GAP - ALTEZZA_ANNOTAZIONE_STIMATA, 8, vh - ALTEZZA_ANNOTAZIONE_STIMATA - 8) };
    puntaOffset = ((centroX - (orizzontale.left as number)) / LARGHEZZA_ANNOTAZIONE);
  } else if (beat.posizione === "sotto") {
    posizione = { ...orizzontale, top: clamp(rect.top + rect.height + GAP, 8, vh - ALTEZZA_ANNOTAZIONE_STIMATA - 8) };
    puntaOffset = ((centroX - (orizzontale.left as number)) / LARGHEZZA_ANNOTAZIONE);
  } else if (beat.posizione === "sinistra") {
    const top = clamp(centroY - ALTEZZA_ANNOTAZIONE_STIMATA / 2, 12, vh - ALTEZZA_ANNOTAZIONE_STIMATA - 12);
    posizione = { top, right: vw - rect.left + GAP, width: LARGHEZZA_ANNOTAZIONE };
    puntaOffset = (centroY - top) / ALTEZZA_ANNOTAZIONE_STIMATA;
  } else {
    const top = clamp(centroY - ALTEZZA_ANNOTAZIONE_STIMATA / 2, 12, vh - ALTEZZA_ANNOTAZIONE_STIMATA - 12);
    posizione = { top, left: rect.left + rect.width + GAP, width: LARGHEZZA_ANNOTAZIONE };
    puntaOffset = (centroY - top) / ALTEZZA_ANNOTAZIONE_STIMATA;
  }

  // Il lato del fumetto dice da che parte sta il bersaglio (per la punta); la
  // punta scorre poi lungo quel bordo fino al punto reale del bersaglio —
  // anche quando è in un angolo (es. l'avatar profilo), invece di restare
  // sempre fissa al centro del fumetto.
  const lato = beat.posizione === "sopra" ? "sotto" : beat.posizione === "sotto" ? "sopra" : beat.posizione === "sinistra" ? "destra" : "sinistra";

  return (
    <div className="absolute z-10 text-center" style={{ ...posizione, pointerEvents: "none" }}>
      <ChalkFumetto attivo animaKey={beat.id} lato={lato} puntaOffset={puntaOffset}>
        {beat.testo}
      </ChalkFumetto>
    </div>
  );
}

/**
 * Schermata di chiusura: non un fumetto d'angolo come tutti gli altri passi,
 * ma un momento riconoscibile — icona, nome, claim e conferma esplicita che
 * il tutorial è finito. L'ultimo passo (`beat.chiusura`) usa questo invece
 * della normale `Annotazione`.
 */
function Chiusura({ onFine }: { onFine: () => void }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#140c08]/55 px-6" onClick={onFine}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="flex max-w-xs flex-col items-center gap-3 rounded-3xl bg-paper-50 px-7 py-8 text-center shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={iconHero} alt="" className="h-14 w-14" />
        <p className="font-display text-title-md font-bold uppercase tracking-wide text-primary-700">Tutorial completato</p>
        <h2 className="font-display text-display-sm font-bold text-paper-900">{APP_NAME}</h2>
        <p className="text-body-md text-paper-700">{APP_TAGLINE}</p>
        <button
          type="button"
          onClick={onFine}
          className="mt-2 flex items-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-body-md font-bold text-paper-50 active:bg-primary-800"
        >
          Inizia a cucinare <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
}
