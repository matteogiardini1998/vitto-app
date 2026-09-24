/**
 * Fase R3b — parser di testo libero, deterministico, senza alcuna chiamata
 * di rete: prende un blocco di testo (una didascalia social, il testo di
 * una pagina, o incollato a mano da una foto tramite l'OCR nativo del
 * telefono) e ne ricava una bozza di ricetta con una confidenza per campo.
 *
 * Regola generale sulla confidenza: alta quando un'informazione viene da
 * un'intestazione esplicita ("Ingredienti:", "3 porzioni"), bassa quando è
 * dedotta solo dalla FORMA del testo (una riga corta con un numero davanti,
 * un paragrafo lungo) — mai indovinata a caso.
 */
import { normalizzaRigheLibere } from "./normalizeRicetta";
import { parsaIngredienteLibero } from "./parseIngredienteLibero";
import type { Ingrediente, Pasto } from "../types";

export type BozzaTesto = {
  nome: string;
  descrizione: string;
  porzioniBase: number | null;
  tempoMin: number | null;
  pasto?: Pasto[];
  ingredienti: Ingrediente[];
  passi: string[];
  confidenza: {
    nome: number;
    porzioniBase: number;
    tempoMin: number;
    ingredienti: number;
    passi: number;
  };
};

// Intestazione riconosciuta anche con un breve qualificatore sulla stessa riga
// ("Ingredienti 3/4 persone", "Ingredienti per 4 persone", "Ingredienti:") — non solo
// la parola secca: sui siti reali è la forma più comune, non l'eccezione.
const INTESTAZIONI_INGREDIENTI = /^(?:ingredienti|ingredients|occorrente)\b.{0,40}$|^per\s+(?:la|il|lo|i|gli|le)\s+\S.{0,40}$/i;
const INTESTAZIONI_PROCEDIMENTO = /^(?:procedimento|preparazione|come\s+si\s+prepara|istruzioni|instructions|method|steps|directions)\b.{0,40}$/i;

const REGEX_SOLO_HASHTAG_EMOJI = /^[\s#@\p{Extended_Pictographic}️]+$/u;
const PAROLE_CTA = /\b(seguimi|seguici|link in bio|salva (questa )?ricetta|salvala|iscriviti|commenta|condividi|tagga|doppio tap|like)\b/i;

function eRigaScartabile(riga: string): boolean {
  const t = riga.trim();
  if (!t) return true;
  if (REGEX_SOLO_HASHTAG_EMOJI.test(t)) return true;
  if (PAROLE_CTA.test(t)) return true;
  return false;
}

/** Una riga "ha la forma" di un ingrediente: corta, e il parser di riga ci trova davvero una quantità o un'unità. */
function sembraIngrediente(riga: string): boolean {
  const t = riga.trim();
  if (!t || t.length >= 60) return false;
  if (eRigaScartabile(t)) return false;
  return !parsaIngredienteLibero(t).daVerificare;
}

/** Titolo: prima riga utile, corta e senza numeri di quantità in testa — altrimenti un titolo neutro, a bassa confidenza. */
function estraiTitolo(righe: string[]): { nome: string; confidenza: number } {
  for (const riga of righe) {
    const t = riga.trim();
    if (!t || eRigaScartabile(t)) continue;
    if (t.length < 60 && !/^\d/.test(t) && !sembraIngrediente(t)) {
      return { nome: t.replace(/[.:]+$/, ""), confidenza: 0.7 };
    }
    break; // la prima riga utile non è un titolo plausibile: non continuare a cercare più giù nel testo.
  }
  return { nome: "Ricetta importata", confidenza: 0.2 };
}

type Sezioni = {
  ingredienti: string[];
  procedimento: string[];
  /** Indipendenti: un testo può avere l'intestazione "Ingredienti" ma non "Procedimento", o viceversa. */
  ingredientiDaIntestazione: boolean;
  procedimentoDaIntestazione: boolean;
};

function individuaSezioni(righe: string[]): Sezioni {
  const ingredienti: string[] = [];
  const procedimento: string[] = [];
  // Righe viste prima di trovare la PRIMA intestazione di qualunque tipo (o, se
  // non ne compare mai nessuna, tutte le righe): non sappiamo ancora se siano
  // ingredienti o procedimento, si classificano per forma alla fine.
  const primaDiOgniIntestazione: string[] = [];
  let modalita: "nessuna" | "ingredienti" | "procedimento" = "nessuna";
  let headerIngredientiTrovato = false;
  let headerProcedimentoTrovato = false;

  for (const riga of righe) {
    const t = riga.trim();
    if (INTESTAZIONI_INGREDIENTI.test(t)) {
      modalita = "ingredienti";
      headerIngredientiTrovato = true;
      continue;
    }
    if (INTESTAZIONI_PROCEDIMENTO.test(t)) {
      modalita = "procedimento";
      headerProcedimentoTrovato = true;
      continue;
    }
    if (!t) continue;
    if (modalita === "ingredienti") ingredienti.push(t);
    else if (modalita === "procedimento") procedimento.push(t);
    else primaDiOgniIntestazione.push(t);
  }

  // Un'intestazione "Ingredienti" esplicita è il segnale forte: se c'è, ci si fida di lei
  // sola per gli ingredienti. Il procedimento invece, se non ha una sua intestazione (siti
  // che vanno dritti dagli ingredienti ai passi numerati, senza dire "Procedimento"), si
  // recupera classificando per forma quel che resta prima della prima intestazione.
  if (headerIngredientiTrovato) {
    return {
      ingredienti,
      procedimento: headerProcedimentoTrovato ? procedimento : primaDiOgniIntestazione.filter((r) => !eRigaScartabile(r) && !sembraIngrediente(r)),
      ingredientiDaIntestazione: true,
      procedimentoDaIntestazione: headerProcedimentoTrovato,
    };
  }

  // Nessuna intestazione "Ingredienti" trovata da nessuna parte (anche se il procedimento
  // magari sì, es. solo "Preparazione"): si separa per forma tutto quello che è rimasto
  // prima di qualunque intestazione, che è dove finiscono gli ingredienti in quel caso.
  const perForma: { ingredienti: string[]; procedimento: string[] } = { ingredienti: [], procedimento: [] };
  for (const riga of primaDiOgniIntestazione) {
    if (eRigaScartabile(riga)) continue;
    if (sembraIngrediente(riga)) perForma.ingredienti.push(riga.trim());
    else perForma.procedimento.push(riga.trim());
  }
  return {
    ingredienti: perForma.ingredienti,
    procedimento: [...perForma.procedimento, ...procedimento],
    ingredientiDaIntestazione: false,
    procedimentoDaIntestazione: headerProcedimentoTrovato,
  };
}

const REGEX_PASSO_NUMERATO = /(?:^|\n)\s*(?:\d{1,2}[.)]|step\s*\d{1,2}\s*[:.]?)\s*/gim;

function raggruppaFrasi(frasi: string[], dimensione: number): string[] {
  const gruppi: string[] = [];
  for (let i = 0; i < frasi.length; i += dimensione) {
    gruppi.push(frasi.slice(i, i + dimensione).join(". ").trim());
  }
  return gruppi.filter(Boolean);
}

/** Spezza il blocco di procedimento in passi: prima i numeri progressivi, poi i paragrafi, poi le frasi raggruppate. */
function estraiPassi(testoProcedimento: string): { passi: string[]; confidenza: number } {
  const pulito = testoProcedimento.trim();
  if (!pulito) return { passi: [], confidenza: 0 };

  const perNumero = pulito
    .split(REGEX_PASSO_NUMERATO)
    .map((s) => s.trim())
    .filter((s) => s && !eRigaScartabile(s));
  if (perNumero.length >= 2) return { passi: perNumero, confidenza: 0.85 };

  const perParagrafo = pulito
    .split(/\n\s*\n/)
    .map((s) => s.replace(/\n/g, " ").trim())
    .filter((s) => s && !eRigaScartabile(s));
  if (perParagrafo.length >= 2) return { passi: perParagrafo, confidenza: 0.6 };

  const righeSingole = pulito
    .split(/\n/)
    .map((s) => s.trim())
    .filter((s) => s && !eRigaScartabile(s));
  if (righeSingole.length >= 2) return { passi: righeSingole, confidenza: 0.5 };

  // Ultima spiaggia: frasi separate dal punto fermo, raggruppate in blocchi da 2-3 (pura euristica, confidenza bassa).
  const frasi = pulito
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3 && !eRigaScartabile(s));
  if (frasi.length === 0) return { passi: [], confidenza: 0 };
  return { passi: raggruppaFrasi(frasi, frasi.length > 6 ? 3 : 2), confidenza: 0.35 };
}

const REGEX_PORZIONI = /(?:per\s+(\d{1,2})\s+person[ae]|(\d{1,2})\s+porzion[ei]|dosi\s+per\s+(\d{1,2}))/i;
const REGEX_TEMPO_MIN = /(\d{1,3})\s*(?:min\b|minuti|')/i;
const REGEX_TEMPO_ORE = /(\d{1,2})\s*(?:ore|h\b)/i;

function estraiPorzioni(testo: string): number | null {
  const m = testo.match(REGEX_PORZIONI);
  if (!m) return null;
  const n = Number(m[1] ?? m[2] ?? m[3]);
  return n > 0 && n <= 20 ? n : null;
}

function estraiTempoMin(testo: string): number | null {
  const ore = testo.match(REGEX_TEMPO_ORE);
  const min = testo.match(REGEX_TEMPO_MIN);
  const totale = (ore ? Number(ore[1]) * 60 : 0) + (min ? Number(min[1]) : 0);
  return totale > 0 && totale <= 600 ? totale : null;
}

/** Punto d'ingresso: nessuna chiamata di rete, tutto sincrono. Usato sia da "Incolla testo" sia dal fallback del percorso link. */
export function parseRecipeText(testoGrezzo: string): BozzaTesto {
  const testo = testoGrezzo.replace(/\r\n/g, "\n").trim();
  const righe = testo.split("\n");

  const { nome, confidenza: confidenzaNome } = estraiTitolo(righe);
  const sezioni = individuaSezioni(righe);

  // La riga già usata come titolo non deve anche ripresentarsi come primo "passo".
  const testoProcedimento = sezioni.procedimento.filter((r) => r !== nome).join("\n");
  const { passi, confidenza: confidenzaPassiPerForma } = estraiPassi(testoProcedimento);
  const confidenzaPassi = sezioni.procedimentoDaIntestazione ? Math.max(confidenzaPassiPerForma, 0.7) : confidenzaPassiPerForma;

  const ingredienti = normalizzaRigheLibere(sezioni.ingredienti);

  const porzioniBase = estraiPorzioni(testo);
  const tempoMin = estraiTempoMin(testo);

  return {
    nome,
    descrizione: "",
    porzioniBase,
    tempoMin,
    ingredienti,
    passi,
    confidenza: {
      nome: confidenzaNome,
      porzioniBase: porzioniBase ? 0.8 : 0.2,
      tempoMin: tempoMin ? 0.8 : 0.2,
      ingredienti: ingredienti.length === 0 ? 0 : sezioni.ingredientiDaIntestazione ? 0.85 : 0.4,
      passi: passi.length === 0 ? 0 : confidenzaPassi,
    },
  };
}
