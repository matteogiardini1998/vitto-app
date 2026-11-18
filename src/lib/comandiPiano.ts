/**
 * Comandi in linguaggio naturale sul piano pasti ("aggiungi un po' di carne",
 * "la cena di venerdì più veloce", "niente pesce questa settimana").
 *
 * Nessuna AI e nessuna API a pagamento: un parser a regole, deterministico,
 * per l'italiano parlato di tutti i giorni. Il testo arriva dalla tastiera o
 * dalla dettatura (del browser o del telefono): per il parser è uguale.
 * Quando non capisce lo dice, invece di indovinare.
 */
import { GIORNI, PASTI, chiaveSlot, type Giorno, type Pasto, type Piano, type Profilo, type Ricetta, type Dispensa } from "../types";
import {
  categoriaDaTesto,
  ricettaHaStile,
  ricettaInCategoria,
  rigeneraSlot,
  type CategoriaPiatto,
  type PreferenzeGenerazione,
  type StileRichiesto,
  type VincoloSlot,
} from "./generator";
import { giornoOggi } from "./date";

export type AzioneComando =
  /** Metti X in N pasti (pranzo/cena) sparsi nella settimana. */
  | { tipo: "aggiungi"; categoria: CategoriaPiatto; quanti: number; giorni: Giorno[]; pasti: Pasto[] }
  /** Togli X: tutti ("niente", "senza") o circa metà ("meno"). */
  | { tipo: "togli"; categoria: CategoriaPiatto; tutti: boolean; giorni: Giorno[]; pasti: Pasto[] }
  /** Cambia pasti precisi, opzionalmente con uno stile o una categoria. */
  | { tipo: "cambia"; giorni: Giorno[]; pasti: Pasto[]; stile?: StileRichiesto; vuole?: CategoriaPiatto }
  /** "Tutto più veloce": cambia i pasti che non rispettano lo stile. */
  | { tipo: "stile"; stile: StileRichiesto; giorni: Giorno[]; pasti: Pasto[] };

export const ESEMPI_COMANDI = [
  "Aggiungi un po' di carne",
  "La cena di venerdì più veloce",
  "Niente pesce",
  "Cambia il pranzo di martedì",
  "Più legumi a cena",
];

const LABEL_CATEGORIA: Record<CategoriaPiatto, string> = {
  carne: "carne",
  carne_rossa: "carne rossa",
  carne_bianca: "carne bianca",
  pesce: "pesce",
  legumi: "legumi",
  uova: "uova",
  latticini: "formaggi",
  tofu_tempeh: "tofu o tempeh",
  vegetariana: "piatti vegetariani",
  vegana: "piatti vegani",
};

const LABEL_STILE: Record<StileRichiesto, string> = {
  veloce: "più veloce",
  leggera: "più leggero",
  sostanziosa: "più sostanzioso",
};

const LABEL_PASTO: Record<Pasto, string> = { colazione: "colazione", pranzo: "pranzo", cena: "cena" };

function normalizza(testo: string): string {
  return testo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’`]/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const GIORNI_PAROLE: { re: RegExp; giorni: (oggi: Giorno) => Giorno[] }[] = [
  { re: /\blunedi\b/, giorni: () => ["Lun"] },
  { re: /\bmartedi\b/, giorni: () => ["Mar"] },
  { re: /\bmercoledi\b/, giorni: () => ["Mer"] },
  { re: /\bgiovedi\b/, giorni: () => ["Gio"] },
  { re: /\bvenerdi\b/, giorni: () => ["Ven"] },
  { re: /\bsabato\b/, giorni: () => ["Sab"] },
  { re: /\bdomenica\b/, giorni: () => ["Dom"] },
  { re: /\b(weekend|fine settimana|fine-settimana)\b/, giorni: () => ["Sab", "Dom"] },
  { re: /\bin settimana\b|\bferial/, giorni: () => ["Lun", "Mar", "Mer", "Gio", "Ven"] },
  { re: /\bdopodomani\b/, giorni: (oggi) => [GIORNI[(GIORNI.indexOf(oggi) + 2) % 7]] },
  { re: /\bdomani\b/, giorni: (oggi) => [GIORNI[(GIORNI.indexOf(oggi) + 1) % 7]] },
  { re: /\boggi\b|\bstasera\b/, giorni: (oggi) => [oggi] },
];

function trovaGiorni(t: string, oggi: Giorno): Giorno[] {
  const out: Giorno[] = [];
  // "dopodomani" contiene "domani": va controllato e rimosso prima.
  let resto = t;
  for (const g of GIORNI_PAROLE) {
    if (g.re.test(resto)) {
      for (const giorno of g.giorni(oggi)) if (!out.includes(giorno)) out.push(giorno);
      resto = resto.replace(g.re, " ");
    }
  }
  return out;
}

function trovaPasti(t: string): Pasto[] {
  const out: Pasto[] = [];
  if (/\bcolazion/.test(t)) out.push("colazione");
  if (/\bpranz/.test(t)) out.push("pranzo");
  if (/\bcen[ae]\b|\bstasera\b/.test(t)) out.push("cena");
  return out;
}

function trovaStile(t: string): StileRichiesto | undefined {
  if (/\b(veloc|rapid|svelt|sbrigativ|in fretta|poco tempo)/.test(t)) return "veloce";
  if (/\b(legger|light|meno pesant)/.test(t)) return "leggera";
  if (/\b(sostanzios|abbondant|piu pesant|comfort|sazi)/.test(t)) return "sostanziosa";
  return undefined;
}

const NUMERI: Record<string, number> = { un: 1, uno: 1, una: 1, due: 2, tre: 3, quattro: 4, cinque: 5, sei: 6, sette: 7 };

function trovaQuanti(t: string): number {
  const cifra = t.match(/\b([1-7])\b/);
  if (cifra) return Number(cifra[1]);
  const parola = t.match(/\b(due|tre|quattro|cinque|sei|sette)\b(?! (?:giorni|cene|pranzi) fa)/);
  if (parola) return NUMERI[parola[1]];
  if (/\b(molt[oa]|tant[oa]|parecchi)/.test(t)) return 4;
  if (/\b(una volta|un pasto|una cena|un pranzo)\b/.test(t)) return 1;
  if (/\bun po\b/.test(t)) return 3;
  return 2; // "qualche", "più": un paio di pasti
}

const RE_NEGAZIONE = /\b(niente|senza|togli|toglimi|elimina|basta|zero|no|non voglio|evita)\b/;
const RE_MENO = /\bmeno\b/;
const RE_CAMBIA = /\b(cambia|cambiami|sostituisci|rigenera|rifai|un altr[oa]|non mi piace|diverso|diversa)\b/;
const RE_AGGIUNGI = /\b(aggiungi|aggiungimi|metti|mettimi|inserisci|voglio|vorrei|piu|un po|qualche|anche|ci sia)\b/;

/** Divide un comando composto ("aggiungi carne e togli il pesce") in frasi singole. */
function spezza(t: string): string[] {
  return t
    .split(/\s*(?:,|;|\bpoi\b|\be poi\b|\binoltre\b|\be (?=(?:aggiung|togli|meno|piu|metti|cambia|niente|senza|elimina|rifai|sostituisci)))\s*/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function interpretaComando(testo: string, oggi: Giorno = giornoOggi()): AzioneComando[] {
  const azioni: AzioneComando[] = [];
  for (const frase of spezza(normalizza(testo))) {
    const giorni = trovaGiorni(frase, oggi);
    const pasti = trovaPasti(frase);
    const stile = trovaStile(frase);
    const categoria = categoriaDaTesto(frase);

    if (categoria && (RE_NEGAZIONE.test(frase) || RE_MENO.test(frase))) {
      azioni.push({ tipo: "togli", categoria, tutti: !RE_MENO.test(frase), giorni, pasti });
      continue;
    }
    const slotPrecisi = giorni.length > 0 && (pasti.length > 0 || giorni.length <= 2);
    if (RE_CAMBIA.test(frase) || (slotPrecisi && (stile || categoria))) {
      if (giorni.length > 0 || pasti.length > 0) {
        azioni.push({ tipo: "cambia", giorni, pasti, stile, vuole: categoria ?? undefined });
        continue;
      }
    }
    if (categoria && (RE_AGGIUNGI.test(frase) || frase.split(" ").length <= 3)) {
      azioni.push({ tipo: "aggiungi", categoria, quanti: trovaQuanti(frase), giorni, pasti });
      continue;
    }
    if (stile) {
      azioni.push({ tipo: "stile", stile, giorni, pasti });
    }
  }
  return azioni;
}

/** Ordine "naturale" dei pasti della settimana, per distribuire le modifiche lontane l'una dall'altra. */
function slotInOrdine(giorni: Giorno[], pasti: Pasto[]): { chiave: string; giorno: Giorno; pasto: Pasto }[] {
  const gg = giorni.length > 0 ? giorni : [...GIORNI];
  const pp = pasti.length > 0 ? pasti : (["pranzo", "cena"] as Pasto[]);
  return GIORNI.filter((g) => gg.includes(g)).flatMap((giorno) =>
    PASTI.filter((p) => pp.includes(p)).map((pasto) => ({ chiave: chiaveSlot(giorno, pasto), giorno, pasto })),
  );
}

/** Sceglie n elementi distribuiti in modo uniforme (non tutti di fila a inizio settimana). */
function sparsi<T>(lista: T[], n: number): T[] {
  if (n >= lista.length) return lista;
  const passo = lista.length / n;
  return Array.from({ length: n }, (_, i) => lista[Math.floor(i * passo + passo / 2)]);
}

export type ContestoComando = {
  ricette: Ricetta[];
  profilo: Profilo;
  preferenze: PreferenzeGenerazione;
  dispensa?: Dispensa;
};

export type EsitoComando = {
  piano: Piano;
  /** Frase da mostrare all'utente: cosa è stato fatto, o perché no. */
  messaggio: string;
  capito: boolean;
  slotCambiati: string[];
};

function etichettaSlot(chiave: string): string {
  const [giorno, pasto] = chiave.split("|") as [Giorno, Pasto];
  return `${giorno} ${LABEL_PASTO[pasto] ?? pasto}`;
}

function elenco(chiavi: string[]): string {
  const nomi = chiavi.map(etichettaSlot);
  if (nomi.length <= 1) return nomi.join("");
  return `${nomi.slice(0, -1).join(", ")} e ${nomi[nomi.length - 1]}`;
}

/**
 * Applica le azioni al piano, una dopo l'altra, rigenerando solo i pasti
 * coinvolti (mai quelli bloccati con il lucchetto). Restituisce il nuovo
 * piano e una frase che spiega cosa è cambiato.
 */
export function applicaComando(testo: string, piano: Piano, ctx: ContestoComando, oggi?: Giorno): EsitoComando {
  const azioni = interpretaComando(testo, oggi);
  if (azioni.length === 0) {
    return {
      piano,
      capito: false,
      slotCambiati: [],
      messaggio: `Non ho capito. Prova con frasi tipo «${ESEMPI_COMANDI[0]}» o «${ESEMPI_COMANDI[1]}».`,
    };
  }

  let pianoCorrente = piano;
  const cambiati: string[] = [];
  const frasi: string[] = [];
  const ricettaDi = (chiave: string) => {
    const slot = pianoCorrente[chiave];
    return slot ? ctx.ricette.find((r) => r.id === slot.ricettaId) : undefined;
  };

  const rigenera = (chiave: string, vincolo: VincoloSlot): boolean => {
    const attuale = pianoCorrente[chiave];
    const esito = rigeneraSlot({
      ricette: ctx.ricette,
      profilo: ctx.profilo,
      piano: pianoCorrente,
      preferenze: ctx.preferenze,
      chiave,
      dispensa: ctx.dispensa,
      vincolo: { ...vincolo, escludiRicette: [...(vincolo.escludiRicette ?? []), ...(attuale ? [attuale.ricettaId] : [])] },
    });
    if (!esito.ricettaId) return false;
    pianoCorrente = esito.piano;
    if (!cambiati.includes(chiave)) cambiati.push(chiave);
    return true;
  };

  for (const azione of azioni) {
    const candidati = slotInOrdine(azione.giorni, azione.pasti).filter(({ chiave }) => !pianoCorrente[chiave]?.lockata);

    if (azione.tipo === "aggiungi") {
      const daCambiare = candidati.filter(({ chiave }) => {
        const r = ricettaDi(chiave);
        return !r || !ricettaInCategoria(r, azione.categoria);
      });
      const fatti: string[] = [];
      // Si prova su più slot del necessario: non tutti accettano la categoria (tempo, dieta...).
      for (const { chiave } of sparsi(daCambiare, Math.min(daCambiare.length, azione.quanti * 2))) {
        if (fatti.length >= azione.quanti) break;
        if (rigenera(chiave, { vuole: azione.categoria })) fatti.push(chiave);
      }
      frasi.push(
        fatti.length > 0
          ? `Ho messo ${LABEL_CATEGORIA[azione.categoria]} in ${elenco(fatti)}.`
          : `Non ho trovato ricette con ${LABEL_CATEGORIA[azione.categoria]} adatte al tuo profilo per questi pasti.`,
      );
    } else if (azione.tipo === "togli") {
      const conCategoria = candidati.filter(({ chiave }) => {
        const r = ricettaDi(chiave);
        return r && ricettaInCategoria(r, azione.categoria);
      });
      const quanti = azione.tutti ? conCategoria.length : Math.ceil(conCategoria.length / 2);
      const fatti = sparsi(conCategoria, quanti).filter(({ chiave }) => rigenera(chiave, { evita: azione.categoria })).map((c) => c.chiave);
      frasi.push(
        conCategoria.length === 0
          ? `Non c'è ${LABEL_CATEGORIA[azione.categoria]} nel piano.`
          : `Ho tolto ${LABEL_CATEGORIA[azione.categoria]} da ${elenco(fatti)}.`,
      );
    } else if (azione.tipo === "cambia") {
      const fatti = candidati
        .filter(({ chiave }) => pianoCorrente[chiave] || azione.pasti.length > 0)
        .filter(({ chiave }) => rigenera(chiave, { stile: azione.stile, vuole: azione.vuole }))
        .map((c) => c.chiave);
      const dettaglio = azione.stile ? ` con qualcosa di ${LABEL_STILE[azione.stile]}` : azione.vuole ? ` con ${LABEL_CATEGORIA[azione.vuole]}` : "";
      frasi.push(fatti.length > 0 ? `Ho cambiato ${elenco(fatti)}${dettaglio}.` : `Non ho trovato alternative adatte${dettaglio}.`);
    } else {
      const daCambiare = candidati.filter(({ chiave }) => {
        const r = ricettaDi(chiave);
        return r && !ricettaHaStile(r, azione.stile);
      });
      const fatti = daCambiare.filter(({ chiave }) => rigenera(chiave, { stile: azione.stile })).map((c) => c.chiave);
      frasi.push(
        daCambiare.length === 0
          ? `Il piano è già tutto ${LABEL_STILE[azione.stile].replace("più ", "")}.`
          : fatti.length > 0
            ? `Ho reso ${LABEL_STILE[azione.stile]} ${elenco(fatti)}.`
            : `Non ho trovato alternative ${LABEL_STILE[azione.stile]}.`,
      );
    }
  }

  return { piano: pianoCorrente, capito: true, slotCambiati: cambiati, messaggio: frasi.join(" ") };
}
