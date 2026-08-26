import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { ChalkArrow, ChalkCircle, ChalkText } from "../chalk";
import { useTutorialStore } from "../store/tutorialStore";
import { useShoppingStore } from "../store/shoppingStore";
import { useToastStore } from "../store/toastStore";
import { BEATS, type Beat, type ContestoTutorial } from "./beats";

/** Bersagli rotondi: il cerchio di gesso e il ritaglio dello spotlight seguono la forma reale del bottone. */
const BERSAGLI_CIRCOLARI = new Set(["hub", "profilo-avatar", "scanner-btn"]);
const FINESTRA_TAP_RAPIDI_MS = 700;
const SOGLIA_TAP_RAPIDI = 3;
const LARGHEZZA_ANNOTAZIONE = 300;

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
 */
export function TutorialEngine() {
  const location = useLocation();
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

  const isTap = beat.avanzamento.tipo === "tap";
  const isCircolare = beat.target ? BERSAGLI_CIRCOLARI.has(beat.target) : false;
  const padding = isCircolare ? 10 : 7;

  return createPortal(
    // pointer-events:none sul contenitore: di default il tutorial non intercetta NULLA.
    // Solo l'overlay scuro (nei passi informativi) si riattiva esplicitamente sotto.
    <div className="fixed inset-0 z-[999] pointer-events-none" aria-live="polite">
      {/* Overlay scuro leggerissimo: l'app resta visibile e viva sotto. Cattura il tap solo nei passi informativi. */}
      <div
        className="absolute inset-0 bg-[#140c08]/25"
        style={{ pointerEvents: isTap ? "auto" : "none" }}
        onClick={isTap ? () => avanza() : undefined}
      />

      {rect && beat.evidenzia && (
        <div
          className="absolute"
          style={{
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
            borderRadius: isCircolare ? "999px" : "18px",
            boxShadow: "0 0 0 9999px rgba(20,12,8,0.42)",
            pointerEvents: "none",
          }}
        >
          <ChalkCircle attivo animaKey={beat.id} className="absolute inset-0 h-full w-full" />
        </div>
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
  const GAP = 16;

  const orizzontale: CSSProperties = {
    left: clamp(centroX - LARGHEZZA_ANNOTAZIONE / 2, 12, vw - LARGHEZZA_ANNOTAZIONE - 12),
    width: LARGHEZZA_ANNOTAZIONE,
  };

  let posizione: CSSProperties;
  if (beat.posizione === "sopra") {
    posizione = { ...orizzontale, bottom: vh - rect.top + GAP };
  } else if (beat.posizione === "sotto") {
    posizione = { ...orizzontale, top: rect.top + rect.height + GAP };
  } else if (beat.posizione === "sinistra") {
    posizione = { top: clamp(rect.top + rect.height / 2 - 50, 12, vh - 100), right: vw - rect.left + GAP, width: LARGHEZZA_ANNOTAZIONE };
  } else {
    posizione = { top: clamp(rect.top + rect.height / 2 - 50, 12, vh - 100), left: rect.left + rect.width + GAP, width: LARGHEZZA_ANNOTAZIONE };
  }

  const testo = (
    <ChalkText attivo animaKey={beat.id} centrato className={beat.evidenzia ? "text-xl leading-snug" : "text-lg leading-snug"}>
      {beat.testo}
    </ChalkText>
  );
  const freccia = beat.evidenzia && (
    <ChalkArrow attivo animaKey={beat.id} variante={beat.freccia} ritardo={0.5} className="mx-auto h-12 w-12" />
  );

  return (
    <div className="absolute z-10 text-center" style={{ ...posizione, pointerEvents: "none" }}>
      {beat.posizione === "sotto" ? (
        <>
          {freccia}
          {testo}
        </>
      ) : (
        <>
          {testo}
          {freccia}
        </>
      )}
    </div>
  );
}
