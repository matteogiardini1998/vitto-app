import type { Reparto } from "../types";
import { risolviIngrediente, normalizza } from "./nutrizione";
import { useSmistamentoStore } from "../store/smistamentoStore";

/** Ordine fisso degli scaffali in Dispensa e delle chip di smistamento: dal più comune al più raro. */
export const ORDINE_SCAFFALI: { value: Reparto; label: string; icona: string }[] = [
  { value: "dispensa", label: "Dispensa", icona: "package" },
  { value: "frutta-verdura", label: "Frutta e verdura", icona: "apple" },
  { value: "latticini-uova", label: "Latticini e uova", icona: "milk" },
  { value: "carne-pesce", label: "Carne e pesce", icona: "beef" },
  { value: "surgelati", label: "Surgelati", icona: "snowflake" },
  { value: "pane-forno", label: "Pane e forno", icona: "croissant" },
  { value: "bevande", label: "Bevande", icona: "cup-soda" },
  { value: "condimenti-spezie", label: "Condimenti e spezie", icona: "flask-conical" },
  { value: "altro", label: "Altro", icona: "sparkles" },
];

const INDIZI: { categoria: Reparto; parole: string[] }[] = [
  { categoria: "surgelati", parole: ["surgelat", "gelato", "ghiacc"] },
  { categoria: "bevande", parole: ["succo", "bevand", "acqua", "vino", "birra", "bibita", "the", "tè", "caffe", "caffè"] },
  { categoria: "pane-forno", parole: ["pane", "biscott", "fett", "grissin", "panin", "focacc"] },
  { categoria: "latticini-uova", parole: ["latte", "formagg", "yogurt", "uov", "burro", "panna", "mozzarell"] },
  { categoria: "carne-pesce", parole: ["carne", "pesce", "pollo", "manzo", "maiale", "tacchino", "salmone", "tonno", "salsicc", "prosciutt"] },
  { categoria: "frutta-verdura", parole: ["frutta", "verdur", "insalat", "pomodor", "mela", "banana", "patata", "cipolla"] },
  { categoria: "condimenti-spezie", parole: ["sale", "pepe", "spezi", "olio", "aceto", "spezie", "curry", "peperoncino"] },
  { categoria: "altro", parole: ["detersiv", "sapone", "carta igienic", "spugn", "candeggin", "detergent", "shampoo"] },
];

/** Piccolo indizio testuale per pre-evidenziare la chip più probabile: non è mai autoritativo, solo un suggerimento. */
export function indizioCategoria(nomeLibero: string): Reparto | null {
  const n = normalizza(nomeLibero);
  if (!n) return null;
  for (const { categoria, parole } of INDIZI) {
    if (parole.some((p) => n.includes(p))) return categoria;
  }
  return null;
}

export type EsitoSmistamento = { trovato: true; categoria: Reparto } | { trovato: false };

/**
 * Il "cervello" unico di smistamento: prova prima il dizionario ingredienti (matching tollerante),
 * poi la mappa appresa dall'utente. Usato sia da Dispensa che dalla lista della spesa.
 */
export function risolviCategoria(nomeLibero: string): EsitoSmistamento {
  const ingrediente = risolviIngrediente(nomeLibero);
  if (ingrediente) return { trovato: true, categoria: ingrediente.reparto };

  const appresa = useSmistamentoStore.getState().cerca(nomeLibero);
  if (appresa) return { trovato: true, categoria: appresa };

  return { trovato: false };
}

/** Ricorda la scelta (manuale o via chip) per i prossimi inserimenti dello stesso prodotto, ovunque nell'app. */
export function impareCategoria(nomeLibero: string, categoria: Reparto): void {
  useSmistamentoStore.getState().impara(nomeLibero, categoria);
}
