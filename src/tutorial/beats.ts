import type { VarianteFreccia } from "../chalk";

/** Cosa sa l'engine del mondo, ricalcolato a ogni tick: le condizioni di avanzamento leggono solo da qui. */
export type ContestoTutorial = {
  pathname: string;
  /** Step corrente del wizard di generazione (0-6), null se non ci si è dentro. */
  wizardStep: number | null;
  /** Quante voci ha la lista della spesa in questo momento. */
  vociSpesaCount: number;
};

export type Beat = {
  id: string;
  testo: string;
  /** Valore di data-tutorial dell'elemento reale a cui l'annotazione si aggancia. null = nessun aggancio, resta un messaggio libero. */
  target: string | null;
  posizione: "sopra" | "sotto" | "sinistra" | "destra";
  /** Se true, disegna anche il cerchio di gesso attorno al target: solo per gli elementi DA TOCCARE. */
  evidenzia: boolean;
  freccia: VarianteFreccia;
  /** "tap": un tocco qualsiasi sullo schermo avanza. "azione": avanza da solo quando `verifica` diventa vera — il tocco reale va all'app sottostante. */
  avanzamento: { tipo: "tap" } | { tipo: "azione"; verifica: (ctx: ContestoTutorial) => boolean };
};

/**
 * La sequenza fedele del tutorial (vedi PROMPT landing+tutorial): si spiega
 * mentre si fa, mai un passo in più. L'ordine qui È l'ordine mostrato.
 */
export const BEATS: Beat[] = [
  {
    id: "hub",
    testo: "Creiamo la tua prima settimana →",
    target: "hub",
    posizione: "sopra",
    evidenzia: true,
    freccia: "curva-giu",
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/meal-prep/genera" },
  },
  {
    id: "wizard-0",
    testo: "Lo stile guida le ricette: scegli e continua",
    target: "wizard-continua",
    posizione: "sotto",
    evidenzia: true,
    freccia: "curva-su",
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 0 },
  },
  {
    id: "wizard-1",
    testo: "Richieste puntuali in più, se vuoi",
    target: "wizard-continua",
    posizione: "sotto",
    evidenzia: true,
    freccia: "curva-su",
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 1 },
  },
  {
    id: "wizard-2",
    testo: "Solo per questa settimana, non cambia il profilo",
    target: "wizard-continua",
    posizione: "sotto",
    evidenzia: true,
    freccia: "curva-su",
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 2 },
  },
  {
    id: "wizard-3",
    testo: "Quanto vuoi spendere in totale",
    target: "wizard-continua",
    posizione: "sotto",
    evidenzia: true,
    freccia: "curva-su",
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 3 },
  },
  {
    id: "wizard-4",
    testo: "I pasti già assegnati restano come sono",
    target: "wizard-continua",
    posizione: "sotto",
    evidenzia: true,
    freccia: "curva-su",
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 4 },
  },
  {
    id: "wizard-5",
    testo: "Aiuta a stimare meglio i prezzi",
    target: "wizard-continua",
    posizione: "sotto",
    evidenzia: true,
    freccia: "curva-su",
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 5 },
  },
  {
    id: "wizard-6",
    testo: "Controllalo, poi accetta per salvarlo davvero",
    target: "wizard-accetta",
    posizione: "sotto",
    evidenzia: true,
    freccia: "curva-su",
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/meal-prep" },
  },
  {
    id: "piano-1",
    testo: "Eccola: la tua settimana, pronta",
    target: "meal-list",
    posizione: "sopra",
    evidenzia: false,
    freccia: "curva-su",
    avanzamento: { tipo: "tap" },
  },
  {
    id: "piano-2",
    testo: "Tocca un pasto per cambiarlo o bloccarlo",
    target: "meal-list",
    posizione: "sopra",
    evidenzia: false,
    freccia: "curva-su",
    avanzamento: { tipo: "tap" },
  },
  {
    id: "vai-ricettario",
    testo: "Gira la ruota verso il Ricettario →",
    target: "wheel-nav",
    posizione: "sopra",
    evidenzia: true,
    freccia: "curva-giu",
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/ricettario" },
  },
  {
    id: "ricettario-1",
    testo: "Le ricette sono tue: modifica, vota, fissa",
    target: "header-ricettario",
    posizione: "sotto",
    evidenzia: false,
    freccia: "curva-su",
    avanzamento: { tipo: "tap" },
  },
  {
    id: "ricettario-2",
    testo: "Le stelle contano nella prossima generazione",
    target: "header-ricettario",
    posizione: "sotto",
    evidenzia: false,
    freccia: "curva-su",
    avanzamento: { tipo: "tap" },
  },
  {
    id: "torna-mealprep",
    testo: "Torna indietro, verso il Piano Pasti ←",
    target: "wheel-nav",
    posizione: "sopra",
    evidenzia: true,
    freccia: "curva-giu",
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/meal-prep" },
  },
  {
    id: "aggiorna-spesa",
    testo: "Aggiorna la lista della spesa",
    target: "banner-aggiorna",
    posizione: "sotto",
    evidenzia: true,
    freccia: "curva-su",
    avanzamento: { tipo: "azione", verifica: (c) => c.vociSpesaCount > 0 },
  },
  {
    id: "vai-spesa",
    testo: "Ora gira a sinistra, verso la Spesa ←",
    target: "wheel-nav",
    posizione: "sopra",
    evidenzia: true,
    freccia: "curva-giu",
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/spesa" },
  },
  {
    id: "spesa-1",
    testo: "La lista è divisa per reparti del supermercato",
    target: "header-spesa",
    posizione: "sotto",
    evidenzia: false,
    freccia: "curva-su",
    avanzamento: { tipo: "tap" },
  },
  {
    id: "spesa-2",
    testo: "Al supermercato, batti i codici come al salvatempo",
    target: "scanner-btn",
    posizione: "sopra",
    evidenzia: true,
    freccia: "curva-giu",
    avanzamento: { tipo: "tap" },
  },
  {
    id: "vai-dispensa",
    testo: "Ancora a sinistra, verso la Dispensa ←",
    target: "wheel-nav",
    posizione: "sopra",
    evidenzia: true,
    freccia: "curva-giu",
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/dispensa" },
  },
  {
    id: "dispensa-1",
    testo: "Quello che hai già in casa, sempre sott'occhio",
    target: "header-dispensa",
    posizione: "sotto",
    evidenzia: false,
    freccia: "curva-su",
    avanzamento: { tipo: "tap" },
  },
  {
    id: "dispensa-2",
    testo: "Anche qui: batti i codici e riempila",
    target: "scanner-btn",
    posizione: "sopra",
    evidenzia: true,
    freccia: "curva-giu",
    avanzamento: { tipo: "tap" },
  },
  {
    id: "profilo-1",
    testo: "Qui trovi e modifichi tutto di te",
    target: "profilo-avatar",
    posizione: "sotto",
    evidenzia: true,
    freccia: "curva-su",
    avanzamento: { tipo: "tap" },
  },
  {
    id: "profilo-2",
    testo: "Buon meal prep, da qui in poi tocca a te 🌿",
    target: "profilo-avatar",
    posizione: "sotto",
    evidenzia: false,
    freccia: "curva-su",
    avanzamento: { tipo: "tap" },
  },
];
