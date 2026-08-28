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
  /** Se true, disegna anche l'alone pulsante attorno al target: solo per gli elementi DA TOCCARE. */
  evidenzia: boolean;
  /** "tap": un tocco qualsiasi sullo schermo avanza. "azione": avanza da solo quando `verifica` diventa vera — il tocco reale va all'app sottostante. */
  avanzamento: { tipo: "tap" } | { tipo: "azione"; verifica: (ctx: ContestoTutorial) => boolean };
  /** Solo sull'ultimo passo: invece del solito fumetto, un momento di chiusura riconoscibile (icona+nome+claim+conferma). */
  chiusura?: true;
};

/**
 * La sequenza fedele del tutorial (vedi PROMPT landing+tutorial): si spiega
 * mentre si fa, mai un passo in più. L'ordine qui È l'ordine mostrato.
 *
 * Le frasi dicono l'azione da fare, non vendono il beneficio — un tutorial
 * guida, non fa slogan.
 */
export const BEATS: Beat[] = [
  {
    id: "hub",
    testo: "Tocca qui per creare la tua prima settimana",
    target: "hub",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/meal-prep/genera" },
  },
  {
    id: "wizard-0",
    testo: "Tocca i tag che ti interessano, poi Continua",
    target: "wizard-continua",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 0 },
  },
  {
    id: "wizard-1",
    testo: "Scrivi richieste puntuali, se vuoi, poi Continua",
    target: "wizard-continua",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 1 },
  },
  {
    id: "wizard-2",
    testo: "Segna cosa evitare solo questa settimana",
    target: "wizard-continua",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 2 },
  },
  {
    id: "wizard-3",
    testo: "Imposta quanto vuoi spendere in totale",
    target: "wizard-continua",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 3 },
  },
  {
    id: "wizard-4",
    testo: "Scegli quali pasti generare: gli altri restano intatti",
    target: "wizard-continua",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 4 },
  },
  {
    id: "wizard-5",
    testo: "Indica il tuo supermercato, poi genera",
    target: "wizard-continua",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => (c.wizardStep ?? -1) > 5 },
  },
  {
    id: "wizard-6",
    testo: "Controlla il piano, poi Accetta per salvarlo",
    target: "wizard-accetta",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/meal-prep" },
  },
  {
    id: "piano-1",
    testo: "Eccola: la tua settimana è pronta",
    target: "meal-list",
    posizione: "sopra",
    evidenzia: false,
    avanzamento: { tipo: "tap" },
  },
  {
    id: "piano-2",
    testo: "Tocca un pasto per cambiarlo o bloccarlo",
    target: "meal-list",
    posizione: "sopra",
    evidenzia: false,
    avanzamento: { tipo: "tap" },
  },
  {
    id: "vai-ricettario",
    testo: "Gira la ruota per aprire il Ricettario",
    target: "wheel-nav",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/ricettario" },
  },
  {
    id: "ricettario-1",
    testo: "Le ricette sono tue: modifica, vota, fissa",
    target: "header-ricettario",
    posizione: "sotto",
    evidenzia: false,
    avanzamento: { tipo: "tap" },
  },
  {
    id: "ricettario-2",
    testo: "Le stelle contano nella prossima generazione",
    target: "header-ricettario",
    posizione: "sotto",
    evidenzia: false,
    avanzamento: { tipo: "tap" },
  },
  {
    id: "torna-mealprep",
    testo: "Gira di nuovo per tornare al Piano Pasti",
    target: "wheel-nav",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/meal-prep" },
  },
  {
    id: "aggiorna-spesa",
    testo: "Tocca Aggiorna per generare la lista della spesa",
    target: "banner-aggiorna",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => c.vociSpesaCount > 0 },
  },
  {
    id: "vai-spesa",
    testo: "Gira la ruota per aprire la Spesa",
    target: "wheel-nav",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/spesa" },
  },
  {
    id: "spesa-1",
    testo: "La lista è divisa per reparti del supermercato",
    target: "header-spesa",
    posizione: "sotto",
    evidenzia: false,
    avanzamento: { tipo: "tap" },
  },
  {
    id: "spesa-2",
    testo: "Al supermercato, tocca qui per battere i codici",
    target: "scanner-btn",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "tap" },
  },
  {
    id: "vai-dispensa",
    testo: "Gira ancora per aprire la Dispensa",
    target: "wheel-nav",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "azione", verifica: (c) => c.pathname === "/dispensa" },
  },
  {
    id: "dispensa-1",
    testo: "Quello che hai già in casa, sempre sott'occhio",
    target: "header-dispensa",
    posizione: "sotto",
    evidenzia: false,
    avanzamento: { tipo: "tap" },
  },
  {
    id: "dispensa-2",
    testo: "Anche qui: tocca per battere i codici e riempirla",
    target: "scanner-btn",
    posizione: "sopra",
    evidenzia: true,
    avanzamento: { tipo: "tap" },
  },
  {
    id: "profilo-1",
    testo: "Qui trovi e modifichi tutto di te",
    target: "profilo-avatar",
    posizione: "sotto",
    evidenzia: true,
    avanzamento: { tipo: "tap" },
  },
  {
    id: "profilo-2",
    testo: "",
    target: null,
    posizione: "sotto",
    evidenzia: false,
    avanzamento: { tipo: "tap" },
    chiusura: true,
  },
];
