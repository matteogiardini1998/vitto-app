/**
 * Divide una riga di ingrediente scritta in linguaggio naturale (come la
 * espone `recipeIngredient` in JSON-LD, es. "200 g di farina 00", o una riga
 * di testo incollato a mano) in quantità/unità/nome. Usato sia dal percorso
 * JSON-LD/microdata sia da `parseRecipeText.ts` (testo libero incollato).
 *
 * Un parser di questo tipo è per natura euristico: se non riconosce un
 * pattern chiaro, restituisce l'intera riga come nome e segna
 * `daVerificare: true` — mai un numero indovinato.
 */

export type IngredienteParsato = {
  nome: string;
  qta: number | null;
  unita: string;
  nota?: string;
  daVerificare: boolean;
};

const NUMERI_PAROLA: Record<string, number> = {
  un: 1, uno: 1, una: 1, un_: 1,
  mezzo: 0.5, mezza: 0.5,
  due: 2, tre: 3, quattro: 4, cinque: 5,
};

const UNITA_NOTE = new Set(["q.b.", "qb", "pizzico", "pizzichi", "manciata", "manciate", "mazzetto", "mazzetti"]);

/** Trattini, pallini ed emoji usati come marcatore di elenco davanti a un ingrediente: vanno via prima di ogni altro parsing. */
const REGEX_PREFISSO_DECORATIVO = /^[\s\-–—*•▪·‣●○◦]+|^\p{Extended_Pictographic}️?\s*/u;

const MAPPA_UNITA: Record<string, string> = {
  g: "g",
  gr: "g",
  grammi: "g",
  grammo: "g",
  kg: "kg",
  chilo: "kg",
  chili: "kg",
  chilogrammi: "kg",
  ml: "ml",
  millilitri: "ml",
  l: "l",
  litro: "l",
  litri: "l",
  cucchiaio: "cucchiai",
  cucchiai: "cucchiai",
  cucchiaino: "cucchiaini",
  cucchiaini: "cucchiaini",
  tazza: "tazza",
  tazze: "tazze",
  pizzico: "pizzico",
  pizzichi: "pizzico",
  manciata: "pizzico",
  manciate: "pizzico",
  spicchio: "spicchi",
  spicchi: "spicchi",
  fetta: "fette",
  fette: "fette",
  foglia: "foglie",
  foglie: "foglie",
  pezzo: "pz",
  pezzi: "pz",
  pz: "pz",
  bicchiere: "bicchiere",
  bicchieri: "bicchieri",
  mazzetto: "mazzetto",
  mazzetti: "mazzetto",
};

const UNITA_REGEX = Object.keys(MAPPA_UNITA)
  .sort((a, b) => b.length - a.length)
  .join("|");

const PAROLE_NUMERO_REGEX = Object.keys(NUMERI_PAROLA)
  .filter((p) => p !== "un_")
  .join("|");

// Fra il numero e l'unità lo spazio è opzionale ("80g" tanto quanto "80 g", comunissimo
// scrivendo veloce su telefono o social) — solo lì: altrove resta obbligatorio.
const REGEX_QUANTITA_UNITA = new RegExp(
  `^\\s*(?:(\\d+(?:[.,]\\d+)?)(?:\\s*[-–a]\\s*\\d+(?:[.,]\\d+)?)?|(\\d+)\\s*\\/\\s*(\\d+)|(${PAROLE_NUMERO_REGEX})\\s+)\\s*(${UNITA_REGEX})\\b\\.?\\s*(?:di\\s+|d['’])?(.*)$`,
  "i",
);

const REGEX_SOLO_QUANTITA = /^\s*(\d+(?:[.,]\d+)?)(?:\s*[-–]\s*\d+(?:[.,]\d+)?)?\s+(?:di\s+|d['’])?(.+)$/i;
const REGEX_FRAZIONE_SENZA_UNITA = /^\s*(\d+)\s*\/\s*(\d+)\s+(?:di\s+|d['’])?(.+)$/i;

// "una cipolla", "due uova", "mezza cipolla": un numero in parola senza unità esplicita, l'unità è "un pezzo".
const REGEX_NUMERO_PAROLA = new RegExp(`^(${PAROLE_NUMERO_REGEX})\\s+(.+)$`, "i");

// Molti siti italiani (GialloZafferano, Cookaround, Fatto in casa da Benedetta...) scrivono
// l'ingrediente PRIMA e quantità/unità DOPO ("Riso Carnaroli 320 g", non "320 g Riso Carnaroli").
const REGEX_QUANTITA_UNITA_IN_CODA = new RegExp(`^(.+?)\\s+(\\d+(?:[.,]\\d+)?)\\s*(${UNITA_REGEX})\\b\\.?\\s*$`, "i");
const REGEX_SOLO_QUANTITA_IN_CODA = /^(.+?)\s+(\d+(?:[.,]\d+)?)\s*$/;

const REGEX_QB_IN_CODA = /^(.*?)[,;]?\s*(?:q\.?b\.?|quanto\s+basta)\s*$/i;
const REGEX_QB_IN_TESTA = /^\s*(?:q\.?b\.?|quanto\s+basta)\s*(?:di\s+|d['’])?(.+)$/i;

/** Un qualificatore fra parentesi ("guanciale (o pancetta)") va nella nota, non nel nome: si stacca a parte, dopo il parsing di quantità/unità. */
function estraiQualificatore(risultato: IngredienteParsato): IngredienteParsato {
  const m = risultato.nome.match(/^(.*?)\s*\(([^)]+)\)\s*(.*)$/);
  if (!m) return risultato;
  const nome = `${m[1]} ${m[3]}`.trim();
  if (!nome) return risultato; // la parte fra parentesi ERA l'unico contenuto: non svuotare il nome.
  const nota = risultato.nota ? `${risultato.nota} (${m[2]})` : m[2].trim();
  return { ...risultato, nome, nota };
}

export function parsaIngredienteLibero(riga: string): IngredienteParsato {
  return estraiQualificatore(parsaRigaSenzaQualificatori(riga));
}

function parsaRigaSenzaQualificatori(riga: string): IngredienteParsato {
  const senzaPrefisso = riga.replace(REGEX_PREFISSO_DECORATIVO, "");
  const testo = senzaPrefisso.trim().replace(/\s+/g, " ");
  if (!testo) return { nome: "", qta: null, unita: "", daVerificare: true };

  if (/^(?:q\.?b\.?|quanto\s+basta)$/i.test(testo)) {
    return { nome: testo, qta: null, unita: "q.b.", daVerificare: true };
  }
  const matchQbTesta = testo.match(REGEX_QB_IN_TESTA);
  if (matchQbTesta) {
    return { nome: matchQbTesta[1].trim(), qta: null, unita: "q.b.", nota: testo, daVerificare: false };
  }
  const matchQb = testo.match(REGEX_QB_IN_CODA);
  if (matchQb && matchQb[1].trim().length > 0 && matchQb[1].trim().length < testo.length) {
    return { nome: matchQb[1].trim(), qta: null, unita: "q.b.", nota: testo, daVerificare: false };
  }

  const matchUnita = testo.match(REGEX_QUANTITA_UNITA);
  if (matchUnita) {
    const [, numDecimale, numeratore, denominatore, parola, unitaGrezza, resto] = matchUnita;
    let qta: number;
    if (numDecimale) qta = Number(numDecimale.replace(",", "."));
    else if (numeratore && denominatore) qta = Number(numeratore) / Number(denominatore);
    else qta = NUMERI_PAROLA[parola.toLowerCase()] ?? 1;

    const unita = MAPPA_UNITA[unitaGrezza.toLowerCase()] ?? unitaGrezza.toLowerCase();
    const nome = resto.trim() || testo;
    const vago = UNITA_NOTE.has(unitaGrezza.toLowerCase());
    return { nome, qta, unita, nota: vago ? testo : undefined, daVerificare: false };
  }

  // Niente unità riconosciuta, ma c'è comunque un numero in testa ("2 uova", "3 pomodori").
  const matchSoloNumero = testo.match(REGEX_SOLO_QUANTITA);
  if (matchSoloNumero) {
    return { nome: matchSoloNumero[2].trim(), qta: Number(matchSoloNumero[1].replace(",", ".")), unita: "pz", daVerificare: false };
  }

  // Frazione senza unità ("1/2 cipolla", "1/4 limone").
  const matchFrazione = testo.match(REGEX_FRAZIONE_SENZA_UNITA);
  if (matchFrazione) {
    return { nome: matchFrazione[3].trim(), qta: Number(matchFrazione[1]) / Number(matchFrazione[2]), unita: "pz", daVerificare: false };
  }

  // Numero in parola senza unità esplicita ("una cipolla", "due uova").
  const matchNumeroParola = testo.match(REGEX_NUMERO_PAROLA);
  if (matchNumeroParola) {
    const qta = NUMERI_PAROLA[matchNumeroParola[1].toLowerCase()];
    return { nome: matchNumeroParola[2].trim(), qta, unita: "pz", daVerificare: false };
  }

  const matchUnitaCoda = testo.match(REGEX_QUANTITA_UNITA_IN_CODA);
  if (matchUnitaCoda) {
    const [, nome, numero, unitaGrezza] = matchUnitaCoda;
    const unita = MAPPA_UNITA[unitaGrezza.toLowerCase()] ?? unitaGrezza.toLowerCase();
    const vago = UNITA_NOTE.has(unitaGrezza.toLowerCase());
    return { nome: nome.trim(), qta: Number(numero.replace(",", ".")), unita, nota: vago ? testo : undefined, daVerificare: false };
  }

  const matchSoloNumeroCoda = testo.match(REGEX_SOLO_QUANTITA_IN_CODA);
  if (matchSoloNumeroCoda) {
    return { nome: matchSoloNumeroCoda[1].trim(), qta: Number(matchSoloNumeroCoda[2].replace(",", ".")), unita: "pz", daVerificare: false };
  }

  return { nome: testo, qta: null, unita: "", daVerificare: true };
}
