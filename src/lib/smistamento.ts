import type { Reparto, VoceSpesa } from "../types";
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

// --- Matching prodotto scansionato -> voce della lista della spesa -------
//
// Bug reale che questo risolve: "salsa di soia" in lista, si scansiona una
// boccetta di salsa di soia riconosciuta come "Salsa di soia Kikkoman
// 150ml" e il matching letterale (nome intero contro nome intero) non
// combacia mai. Un solo cervello, a cascata, dal più a colpo sicuro al più
// approssimativo.

/** Rimuove marca e formato (es. "150ml", "1 kg", "6x125g") da un nome prodotto, per confrontarlo pulito. */
const PATTERN_FORMATO_INLINE = /\b\d+([.,]\d+)?\s*(x\s*\d+([.,]\d+)?)?\s*(ml|cl|dl|l|g|kg|pz|pezzi)\b\.?/gi;

function pulisciNomeProdotto(nome: string, marca: string | null): string {
  let pulito = normalizza(nome);
  const marcaNormalizzata = marca ? normalizza(marca) : "";
  if (marcaNormalizzata) pulito = pulito.replace(marcaNormalizzata, " ");
  pulito = pulito.replace(PATTERN_FORMATO_INLINE, " ");
  return pulito.replace(/\s+/g, " ").trim();
}

function contenimentoBidirezionale(a: string, b: string): boolean {
  if (!a || !b) return false;
  return a.includes(b) || b.includes(a);
}

/** Come risolviIngrediente, ma se il nome intero non risolve prova a togliere parole in coda (utile sui nomi-prodotto con code descrittive). */
function risolviViaDizionarioConTronconi(nome: string) {
  const diretto = risolviIngrediente(nome);
  if (diretto) return diretto;
  const parole = nome.split(" ").filter(Boolean);
  for (let n = parole.length - 1; n >= 1; n--) {
    const tentativo = risolviIngrediente(parole.slice(0, n).join(" "));
    if (tentativo) return tentativo;
  }
  return null;
}

function distanzaLevenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const riga = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let diagonale = riga[0];
    riga[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = riga[j];
      riga[j] = a[i - 1] === b[j - 1] ? diagonale : 1 + Math.min(diagonale, riga[j], riga[j - 1]);
      diagonale = temp;
    }
  }
  return riga[n];
}

function similarita(a: string, b: string): number {
  if (!a && !b) return 1;
  const massimo = Math.max(a.length, b.length, 1);
  return 1 - distanzaLevenshtein(a, b) / massimo;
}

/**
 * Similarità a livello di token, non di frase intera: per ogni parola della
 * frase più corta cerca la sua migliore corrispondenza fra le parole
 * dell'altra frase, poi fa la media. Così le parole IN PIÙ nella frase più
 * lunga (formati, aggettivi, "di bufala"...) non annacquano il punteggio di
 * un confronto Levenshtein sull'intera stringa, e un refuso su una singola
 * parola chiave ("mozarela" per "mozzarella") resta rilevabile.
 */
function tokenSortRatio(a: string, b: string): number {
  const paroleA = a.split(" ").filter(Boolean);
  const paroleB = b.split(" ").filter(Boolean);
  if (paroleA.length === 0 || paroleB.length === 0) return 0;
  const [corte, lunghe] = paroleA.length <= paroleB.length ? [paroleA, paroleB] : [paroleB, paroleA];
  const punteggi = corte.map((parola) => Math.max(...lunghe.map((altra) => similarita(parola, altra))));
  return punteggi.reduce((tot, p) => tot + p, 0) / punteggi.length;
}

const SOGLIA_FUZZY_ALTA = 0.82;
const SOGLIA_FUZZY_MEDIA = 0.6;

export type EsitoMatchLista =
  | { tipo: "match"; voce: VoceSpesa }
  | { tipo: "conferma"; voce: VoceSpesa }
  | { tipo: "nessuno" };

/**
 * Trova la voce della lista della spesa che corrisponde a un prodotto
 * scansionato, a cascata: 1) barcode già associato in passato, 2) nome
 * pulito (senza marca/formato) contenuto nella voce o viceversa, 3) ponte
 * dizionario ingredienti (risolve entrambi verso lo stesso ingrediente),
 * 4) similarità fuzzy — sopra soglia alta è un match, in fascia intermedia
 * va confermato con un tap.
 */
export function trovaVoceListaCorrispondente(
  prodotto: { barcode: string; nome: string; marca: string | null },
  vociLista: VoceSpesa[],
): EsitoMatchLista {
  if (vociLista.length === 0) return { tipo: "nessuno" };

  const associata = useSmistamentoStore.getState().cercaAssociazioneLista(prodotto.barcode);
  if (associata) {
    const voce = vociLista.find((v) => normalizza(v.nome) === associata);
    if (voce) return { tipo: "match", voce };
  }

  const nomeProdotto = pulisciNomeProdotto(prodotto.nome, prodotto.marca);
  if (!nomeProdotto) return { tipo: "nessuno" };

  for (const voce of vociLista) {
    if (contenimentoBidirezionale(nomeProdotto, normalizza(voce.nome))) {
      impareAssociazioneLista(prodotto.barcode, voce.nome);
      return { tipo: "match", voce };
    }
  }

  const ingredienteProdotto = risolviViaDizionarioConTronconi(nomeProdotto);
  if (ingredienteProdotto) {
    for (const voce of vociLista) {
      const ingredienteVoce = risolviViaDizionarioConTronconi(normalizza(voce.nome));
      if (ingredienteVoce && ingredienteVoce.nome === ingredienteProdotto.nome) {
        impareAssociazioneLista(prodotto.barcode, voce.nome);
        return { tipo: "match", voce };
      }
    }
  }

  let migliore: { voce: VoceSpesa; punteggio: number } | null = null;
  for (const voce of vociLista) {
    const punteggio = tokenSortRatio(nomeProdotto, normalizza(voce.nome));
    if (!migliore || punteggio > migliore.punteggio) migliore = { voce, punteggio };
  }
  if (migliore && migliore.punteggio >= SOGLIA_FUZZY_ALTA) {
    impareAssociazioneLista(prodotto.barcode, migliore.voce.nome);
    return { tipo: "match", voce: migliore.voce };
  }
  if (migliore && migliore.punteggio >= SOGLIA_FUZZY_MEDIA) return { tipo: "conferma", voce: migliore.voce };

  return { tipo: "nessuno" };
}

/** Ricorda un match confermato (automatico o dopo "Sì"): la prossima volta questo barcode trova subito la voce giusta. */
export function impareAssociazioneLista(barcode: string, nomeVoce: string): void {
  const chiave = normalizza(nomeVoce);
  if (!chiave) return;
  useSmistamentoStore.getState().impareAssociazioneLista(barcode, chiave);
}
