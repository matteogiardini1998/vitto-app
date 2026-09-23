import type { Area, Dispensa, Giorno, Pasto, Piano, Portata, Profilo, ProteinaPrincipale, Ricetta } from "../types";
import { GIORNI, PASTI, chiaveSlot } from "../types";
import { dietaCompatibileCalcolata } from "./recipeDisplay";
import { risolviIngrediente } from "./nutrizione";
import { punteggioBilanciamento, registraPasto, statoRegoleVuoto, type StatoRegoleSettimana } from "./bilanciamento";
import { trovaCorrispondenzaDispensa } from "./dispensaMatch";
import { mesiStagioneConArea } from "../data/recipeSchema";
import { PESI_GENERATORE } from "../data/pesiGeneratore";

export type TagPreferenza =
  | "veloce"
  | "ricercata"
  | "leggera"
  | "estiva"
  | "invernale"
  | "comfort"
  | "proteica"
  | "gut-friendly"
  | "ipocalorica"
  | "vegetariana"
  | "vegana";

export const TAG_PREFERENZA_LABEL: Record<TagPreferenza, string> = {
  veloce: "Veloci",
  ricercata: "Ricercati",
  leggera: "Leggeri",
  estiva: "Estivi",
  invernale: "Invernali",
  comfort: "Comfort",
  proteica: "Proteici-atletici",
  "gut-friendly": "Gut-friendly",
  ipocalorica: "Ipocalorici e a basso zucchero",
  vegetariana: "Vegetariani (anche se non sei vegetariano)",
  vegana: "Vegani (anche se non sei vegano)",
};

export type TipoVincolo = "almeno" | "massimo" | "poco" | "molto";

export const TIPO_VINCOLO_LABEL: Record<TipoVincolo, string> = {
  almeno: "Almeno",
  massimo: "Al massimo",
  poco: "Poco",
  molto: "Molto",
};

export type VincoloPuntuale = {
  id: string;
  testo: string;
  tipo: TipoVincolo;
  volte: number;
};

export type PreferenzeGenerazione = {
  tags: TagPreferenza[];
  vincoli: VincoloPuntuale[];
  esclusioniTemporanee: string[];
  budgetTotale: number;
  supermercato: string[];
};

export type CandidatoAperto = {
  ricettaId: string;
  motivo: string;
};

export type SlotAperto = {
  candidati: CandidatoAperto[];
};

export type RisultatoGenerazione = {
  piano: Piano;
  /** Stima netta: già scontata di quanto risparmiato grazie a ciò che è già in dispensa. */
  spesaStimata: number;
  /** Quanto di quella stima è "gratis" perché lo hai già in dispensa. */
  risparmioDispensa: number;
  /**
   * Slot rimasti aperti perché nessuna ricetta ha superato la soglia minima
   * di qualità: mai forzati con una scelta mediocre (Fase R2, regola d'oro).
   * Per ognuno, le migliori 3 candidate trovate comunque, con il motivo per
   * cui non sono perfette, così l'utente può scegliere lui.
   */
  slotsAperti: Record<string, SlotAperto>;
};

const WEEKEND = new Set<Giorno>(["Sab", "Dom"]);
/** Gruppi alimentari considerati "freschi" per il bonus di riuso ingredienti in settimana. */
const GRUPPI_FRESCHI = new Set(["verdura", "frutta", "carne-rossa", "carne-bianca", "pesce"]);
/** Sequenza dei pasti principali della settimana, nell'ordine in cui si mangiano: per "stessa proteina non due pasti consecutivi". */
const SEQUENZA_PRINCIPALI: string[] = GIORNI.flatMap((g) => [chiaveSlot(g, "pranzo"), chiaveSlot(g, "cena")]);

function testoCorrisponde(ricetta: Ricetta, testo: string): boolean {
  const q = testo.trim().toLowerCase();
  if (!q) return false;
  return ricetta.nome.toLowerCase().includes(q) || ricetta.tags.some((t) => t.toLowerCase().includes(q));
}

function tempoDisponibile(giorno: Giorno, profilo: Profilo): number {
  return WEEKEND.has(giorno) ? (profilo.tempoMaxCucinaWeekend ?? profilo.tempoMaxCucina) : profilo.tempoMaxCucina;
}

/** Giorni trascorsi dalla sessione di meal prep settimanale al giorno in cui si mangia, 0 = lo stesso giorno. */
function giorniDalMealPrep(giorno: Giorno, giornoPrep: Giorno): number {
  const iGiorno = GIORNI.indexOf(giorno);
  const iPrep = GIORNI.indexOf(giornoPrep);
  return (iGiorno - iPrep + 7) % 7;
}

/** --- generatori pseudocasuali deterministici: stessa settimana e stessi input devono dare lo stesso piano --- */
function mulberry32(seedIniziale: number): () => number {
  let seed = seedIniziale | 0;
  return function random() {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStringa(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function numeroSettimanaIso(d: Date): number {
  const data = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const giornoSettimana = (data.getUTCDay() + 6) % 7;
  data.setUTCDate(data.getUTCDate() - giornoSettimana + 3);
  const primoGiovedi = new Date(Date.UTC(data.getUTCFullYear(), 0, 4));
  const diff = data.getTime() - primoGiovedi.getTime();
  return 1 + Math.round(diff / (7 * 24 * 3600 * 1000));
}

/** Seed di default: cambia ogni settimana solare e a ogni cambio di input rilevante; "Rigenera" passa un seed esplicito diverso. */
function seedDiDefault(profilo: Profilo, preferenze: PreferenzeGenerazione, slotSelezionati: string[]): number {
  const chiaveInput = JSON.stringify({
    area: profilo.area,
    dieta: profilo.dieta,
    persone: profilo.nucleo.persone,
    tempo: profilo.tempoMaxCucina,
    tempoWeekend: profilo.tempoMaxCucinaWeekend,
    fuoriCasa: profilo.pranzoFuoriCasa,
    preferenze,
    slot: [...slotSelezionati].sort(),
  });
  return hashStringa(`${numeroSettimanaIso(new Date())}|${chiaveInput}`);
}

type ContestoGenerazione = {
  profilo: Profilo;
  preferenze: PreferenzeGenerazione;
  dispensa: Dispensa | undefined;
  mese: number;
  usoSettimanale: Map<string, number>;
  usatePrincipali: Set<string>;
  proteinaAllaChiave: Map<string, ProteinaPrincipale>;
  pesantezzaAllaChiave: Map<string, Ricetta["pesantezza"]>;
  proteinaBilancio: Map<ProteinaPrincipale, number>;
  portataCena: Map<Portata, number>;
  ingredientiFreschiSettimana: Set<string>;
  statoRegole: StatoRegoleSettimana;
  conteggiVincoli: Map<string, number>;
  spesaAccumulata: number;
  risparmioAccumulato: number;
};

/**
 * Filtri rigidi (Fase R2, Step 3): una ricetta è candidata per uno slot solo
 * se supera TUTTI questi controlli. Priorità più assolute della gerarchia:
 * sfavorita, pasto ammesso, dieta e esclusioni, tempo del giorno, pranzo
 * fuori casa → trasportabile, conservabilità rispetto al meal prep, rating
 * minimo. La ripetizione della stessa ricetta a pranzo/cena in settimana è
 * anch'essa un filtro rigido (non una preferenza): si tiene fuori qui sotto,
 * nel chiamante, perché dipende da quali slot sono già stati assegnati.
 */
function ricettaEleggibile(
  ricetta: Ricetta,
  giorno: Giorno,
  pasto: Pasto,
  ctx: ContestoGenerazione,
): boolean {
  const { profilo, preferenze } = ctx;
  if (ricetta.sfavorita) return false;
  if (!ricetta.pasto.includes(pasto)) return false;
  if (!dietaCompatibileCalcolata(profilo.dieta, ricetta.dieteCalcolate)) return false;
  if (ricetta.tempoMin > tempoDisponibile(giorno, profilo)) return false;
  if (profilo.incisivitaVoti === "solo-minimo" && ricetta.rating < profilo.incisivitaVotiMinimo) return false;

  if (pasto === "pranzo" && profilo.pranzoFuoriCasa.includes(giorno) && !ricetta.trasportabile) return false;

  // La conservabilità conta solo per i pasti principali: la colazione è per
  // sua natura più spesso cucinata al momento (vedi Step 4, "logica diversa").
  if (profilo.giornoMealPrep && (pasto === "pranzo" || pasto === "cena")) {
    const giorni = giorniDalMealPrep(giorno, profilo.giornoMealPrep);
    if (giorni > ricetta.conservabilitaGiorni && !ricetta.congelabile) return false;
  }

  const esclusioni = [...profilo.esclusioniAssolute, ...preferenze.esclusioniTemporanee]
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const violaEsclusione = esclusioni.some(
    (escl) =>
      ricetta.nome.toLowerCase().includes(escl) ||
      ricetta.ingredienti.some((i) => i.nome.toLowerCase().includes(escl)),
  );
  if (violaEsclusione) return false;

  return true;
}

function punteggioPreferenze(ricetta: Ricetta, preferenze: PreferenzeGenerazione, profilo: Profilo): number {
  let s = 0;
  for (const tag of preferenze.tags) {
    if (tag === "veloce") s += ricetta.stile === "veloce" ? 2 : 0;
    else if (tag === "ricercata") s += ricetta.stile === "ricercata" ? 2 : 0;
    else if (tag === "vegetariana") s += ricetta.dieta === "vegetariana" || ricetta.dieta === "vegana" ? 2 : 0;
    else if (tag === "vegana") s += ricetta.dieta === "vegana" ? 2 : 0;
    else if (tag === "proteica") s += ricetta.tags.includes("proteica") ? 2 : 0;
    else if (tag === "ipocalorica") s += ricetta.tags.includes("ipocalorica") ? 2 : 0;
    else s += ricetta.tags.includes(tag) ? 2 : 0;
  }
  for (const v of preferenze.vincoli) {
    if (!testoCorrisponde(ricetta, v.testo)) continue;
    if (v.tipo === "molto") s += 3;
    if (v.tipo === "poco") s -= 3;
  }
  // Le preferenze negative del profilo (non le esclusioni assolute) sono un
  // disincentivo morbido, non un filtro: raccolte in onboarding ma finora
  // mai lette dal generatore — un piccolo gap che sistemiamo qui, stesso
  // meccanismo già in uso per il vincolo "poco" del wizard.
  const preferenzeNegative = profilo.preferenzeNegative.map((p) => p.trim().toLowerCase()).filter(Boolean);
  if (preferenzeNegative.some((p) => ricetta.nome.toLowerCase().includes(p) || ricetta.ingredienti.some((i) => i.nome.toLowerCase().includes(p)))) {
    s -= 3;
  }
  if (ricetta.preferita) s += 2;
  s += ricetta.rating * (profilo.incisivitaVoti === "preferisci-ben-votate" ? 1.5 : 0.5);
  return s;
}

/** Bonus se la ricetta usa cose già in dispensa (di più se da consumare presto), o ingredienti freschi già usati altrove in settimana. */
function punteggioRiuso(ricetta: Ricetta, dispensa: Dispensa | undefined, ingredientiFreschiSettimana: Set<string>): { punteggio: number; ingredienteRiuso: string | null; ingredienteDispensa: string | null } {
  let punteggio = 0;
  let ingredienteRiuso: string | null = null;
  let ingredienteDispensa: string | null = null;
  for (const ing of ricetta.ingredienti) {
    const voce = dispensa ? trovaCorrispondenzaDispensa(ing.nome, dispensa) : null;
    if (voce) {
      if (voce.daConsumarePresto) {
        punteggio += PESI_GENERATORE.riuso.bonusDispensaInScadenza;
        ingredienteDispensa ??= ing.nome;
      } else if (voce.deperibile) {
        punteggio += PESI_GENERATORE.riuso.bonusDispensaDeperibile;
      }
    }
    const risolto = risolviIngrediente(ing.nome);
    if (risolto && GRUPPI_FRESCHI.has(risolto.gruppo) && ingredientiFreschiSettimana.has(risolto.nome)) {
      punteggio += PESI_GENERATORE.riuso.bonusIngredienteFrescoGiaInLista;
      ingredienteRiuso ??= risolto.nome;
    }
  }
  return { punteggio, ingredienteRiuso, ingredienteDispensa };
}

function punteggioStagionalita(ricetta: Ricetta, area: Area, mese: number): { punteggio: number; pienamenteDiStagione: boolean } {
  if (ricetta.mesiStagione.length >= 12) return { punteggio: 0, pienamenteDiStagione: false }; // "tutto l'anno": neutra
  const mesiEffettivi = mesiStagioneConArea(ricetta.mesiStagione, area);
  if (mesiEffettivi.includes(mese)) {
    return { punteggio: PESI_GENERATORE.stagionalita.bonusPienaStagione, pienamenteDiStagione: true };
  }
  // Ingrediente fresco principale chiaramente fuori stagione: penalità forte
  // solo se la proteina principale stessa fa parte degli ingredienti stagionali
  // (altrimenti un contorno di stagione sbagliato pesa meno di un secondo intero fuori stagione).
  return { punteggio: -PESI_GENERATORE.stagionalita.penalitaFuoriStagione, pienamenteDiStagione: false };
}

function punteggioArea(ricetta: Ricetta, areaProfilo: Area): number {
  if (ricetta.area === "internazionale") return 0;
  if (ricetta.area === areaProfilo) return PESI_GENERATORE.area.bonusAreaPropria;
  if (ricetta.area === "nazionale") return PESI_GENERATORE.area.bonusNazionale;
  return 0;
}

/** Stessa proteina principale nel pasto principale immediatamente precedente o successivo (anche a cavallo di due giorni). */
function punteggioVarietaProteica(ricetta: Ricetta, chiave: string, proteinaAllaChiave: Map<string, ProteinaPrincipale>): number {
  if (ricetta.proteinaPrincipale === "nessuna") return 0;
  const i = SEQUENZA_PRINCIPALI.indexOf(chiave);
  if (i < 0) return 0;
  const vicine = [SEQUENZA_PRINCIPALI[i - 1], SEQUENZA_PRINCIPALI[i + 1]].filter(Boolean) as string[];
  const ripete = vicine.some((v) => proteinaAllaChiave.get(v) === ricetta.proteinaPrincipale);
  return ripete ? -PESI_GENERATORE.varieta.penalitaProteinaConsecutiva : 0;
}

function punteggioBilancioProteico(ricetta: Ricetta, pasto: Pasto, proteinaBilancio: Map<ProteinaPrincipale, number>): number {
  if (pasto !== "pranzo" && pasto !== "cena") return 0;
  const regole = PESI_GENERATORE.varieta.bilancioSettimanale;
  const regola = (regole as Record<string, { tipo: "almeno" | "massimo"; volte: number; peso: number }>)[ricetta.proteinaPrincipale];
  if (!regola) return 0;
  const attuale = proteinaBilancio.get(ricetta.proteinaPrincipale) ?? 0;
  if (regola.tipo === "almeno") return attuale < regola.volte ? regola.peso : 0;
  return attuale >= regola.volte ? -regola.peso : 0;
}

/** Non 5 cene della stessa portata (es. tutta pasta): penalizza oltre una soglia di ripetizioni della stessa portata a cena. */
function punteggioVarietaPortata(ricetta: Ricetta, pasto: Pasto, portataCena: Map<Portata, number>): number {
  if (pasto !== "cena") return 0;
  const attuale = portataCena.get(ricetta.portata) ?? 0;
  return attuale >= PESI_GENERATORE.varieta.sogliaPortataRipetutaCena ? -PESI_GENERATORE.varieta.penalitaPortataRipetutaCena : 0;
}

/** Se il pranzo dello stesso giorno è "sostanziosa" la cena dovrebbe essere leggera/media, e viceversa. */
function punteggioCoerenzaGiornata(ricetta: Ricetta, giorno: Giorno, pasto: Pasto, pesantezzaAllaChiave: Map<string, Ricetta["pesantezza"]>): number {
  if (pasto !== "pranzo" && pasto !== "cena") return 0;
  if (ricetta.pesantezza !== "sostanziosa") return 0;
  const altroPasto: Pasto = pasto === "pranzo" ? "cena" : "pranzo";
  const pesantezzaAltro = pesantezzaAllaChiave.get(chiaveSlot(giorno, altroPasto));
  return pesantezzaAltro === "sostanziosa" ? -PESI_GENERATORE.coerenzaGiornata.penalitaDueSostanziose : 0;
}

type EsitoPunteggio = {
  ricetta: Ricetta;
  punteggio: number;
  pienamenteDiStagione: boolean;
  ingredienteRiuso: string | null;
  ingredienteDispensa: string | null;
};

function calcolaPunteggio(
  ricetta: Ricetta,
  chiave: string,
  giorno: Giorno,
  pasto: Pasto,
  ctx: ContestoGenerazione,
  budgetCtx?: { budgetRimanente: number; slotsRimasti: number },
): EsitoPunteggio {
  // Base 0-100: una ricetta senza fattori né positivi né negativi è "va bene così" (60, sopra
  // soglia) — sotto soglia ci deve finire solo chi accumula veri problemi (fuori stagione,
  // proteina ripetuta, giornata sbilanciata...), non chi semplicemente non ha bonus da offrire.
  let s = 60;
  s += punteggioPreferenze(ricetta, ctx.preferenze, ctx.profilo);
  s -= (ctx.usoSettimanale.get(ricetta.id) ?? 0) * 4;

  if (budgetCtx && budgetCtx.slotsRimasti > 0) {
    const budgetPerSlot = budgetCtx.budgetRimanente / budgetCtx.slotsRimasti;
    if (ricetta.costoStimatoPorzione > budgetPerSlot) {
      s -= (ricetta.costoStimatoPorzione - budgetPerSlot) * 2;
    }
  }

  s += punteggioBilanciamento(ricetta, pasto, ctx.statoRegole);

  const { punteggio: pRiuso, ingredienteRiuso, ingredienteDispensa } = punteggioRiuso(ricetta, ctx.dispensa, ctx.ingredientiFreschiSettimana);
  s += pRiuso;

  const { punteggio: pStagione, pienamenteDiStagione } = punteggioStagionalita(ricetta, ctx.profilo.area, ctx.mese);
  s += pStagione;

  s += punteggioArea(ricetta, ctx.profilo.area);
  s += punteggioVarietaProteica(ricetta, chiave, ctx.proteinaAllaChiave);
  s += punteggioBilancioProteico(ricetta, pasto, ctx.proteinaBilancio);
  s += punteggioVarietaPortata(ricetta, pasto, ctx.portataCena);
  s += punteggioCoerenzaGiornata(ricetta, giorno, pasto, ctx.pesantezzaAllaChiave);
  s = Math.max(0, Math.min(100, s));

  return { ricetta, punteggio: s, pienamenteDiStagione, ingredienteRiuso, ingredienteDispensa };
}

/** "Perché questo piatto": un'unica frase breve, dal fattore di punteggio più rilevante per QUESTA scelta. */
function generaMotivo(esito: EsitoPunteggio, giorno: Giorno, profilo: Profilo): string {
  const { ricetta, pienamenteDiStagione, ingredienteRiuso, ingredienteDispensa } = esito;
  if (ingredienteRiuso) return `Usa ${ingredienteRiuso} che hai già in lista questa settimana`;
  if (ingredienteDispensa) return `Usa ${ingredienteDispensa} dalla tua dispensa, da consumare presto`;
  if (pienamenteDiStagione) {
    const nomi = ricetta.ingredientiStagionali;
    if (nomi.length > 0) {
      const elenco = nomi.length === 1 ? nomi[0] : `${nomi.slice(0, -1).join(", ")} e ${nomi[nomi.length - 1]}`;
      return `${elenco} ${nomi.length > 1 ? "sono" : "è"} di stagione questo mese`;
    }
    return "È pienamente di stagione questo mese";
  }
  if (ricetta.area !== "nazionale" && ricetta.area !== "internazionale" && ricetta.area === profilo.area) {
    return "Un piatto tipico della tua zona";
  }
  if (profilo.giornoMealPrep && ricetta.conservabilitaGiorni >= 3 && (ricetta.pasto.includes("pranzo") || ricetta.pasto.includes("cena"))) {
    return `Si conserva ${ricetta.conservabilitaGiorni} giorni, perfetto per ${giorno}`;
  }
  const regole = PESI_GENERATORE.varieta.bilancioSettimanale;
  if (ricetta.proteinaPrincipale === "legumi" || ricetta.proteinaPrincipale === "pesce") {
    void regole;
    return ricetta.proteinaPrincipale === "legumi" ? "Aggiunge legumi, utili per il bilancio della settimana" : "Aggiunge pesce, utile per il bilancio della settimana";
  }
  if (ricetta.preferita) return "È tra i tuoi piatti preferiti";
  return "Si adatta bene al resto della settimana";
}

function motivoScarto(ricetta: Ricetta, giorno: Giorno, pasto: Pasto, ctx: ContestoGenerazione, punteggio: number): string {
  const { pienamenteDiStagione } = punteggioStagionalita(ricetta, ctx.profilo.area, ctx.mese);
  if (ricetta.mesiStagione.length < 12 && !pienamenteDiStagione) return "Non è pienamente di stagione questo mese";
  if (punteggioVarietaProteica(ricetta, chiaveSlot(giorno, pasto), ctx.proteinaAllaChiave) < 0) {
    return "Ripete la stessa proteina del pasto precedente";
  }
  if (punteggioCoerenzaGiornata(ricetta, giorno, pasto, ctx.pesantezzaAllaChiave) < 0) {
    return "Renderebbe la giornata troppo pesante insieme all'altro pasto";
  }
  if (punteggioVarietaPortata(ricetta, pasto, ctx.portataCena) < 0) {
    return "Questa settimana ha già troppe cene simili";
  }
  return `Punteggio ${Math.round(punteggio)}/100 — non ideale, ma è la scelta più vicina disponibile`;
}

function registraAssegnazione(ctx: ContestoGenerazione, chiave: string, pasto: Pasto, ricetta: Ricetta, porzioni: number): void {
  ctx.usoSettimanale.set(ricetta.id, (ctx.usoSettimanale.get(ricetta.id) ?? 0) + 1);
  ctx.spesaAccumulata += ricetta.costoStimatoPorzione * porzioni;
  ctx.risparmioAccumulato += risparmioRicetta(ricetta, porzioni, ctx.dispensa);
  registraPasto(ctx.statoRegole, ricetta, pasto);
  for (const v of ctx.preferenze.vincoli) {
    if (testoCorrisponde(ricetta, v.testo)) ctx.conteggiVincoli.set(v.id, (ctx.conteggiVincoli.get(v.id) ?? 0) + 1);
  }
  if (pasto === "pranzo" || pasto === "cena") {
    ctx.usatePrincipali.add(ricetta.id);
    ctx.proteinaAllaChiave.set(chiave, ricetta.proteinaPrincipale);
    if (ricetta.proteinaPrincipale !== "nessuna") {
      ctx.proteinaBilancio.set(ricetta.proteinaPrincipale, (ctx.proteinaBilancio.get(ricetta.proteinaPrincipale) ?? 0) + 1);
    }
  }
  ctx.pesantezzaAllaChiave.set(chiave, ricetta.pesantezza);
  if (pasto === "cena") {
    ctx.portataCena.set(ricetta.portata, (ctx.portataCena.get(ricetta.portata) ?? 0) + 1);
  }
  for (const ing of ricetta.ingredienti) {
    const risolto = risolviIngrediente(ing.nome);
    if (risolto && GRUPPI_FRESCHI.has(risolto.gruppo)) ctx.ingredientiFreschiSettimana.add(risolto.nome);
  }
}

/** Quanto di questa ricetta è già in dispensa, in euro: una stima onesta, non un conteggio esatto ingrediente per ingrediente. */
function risparmioRicetta(ricetta: Ricetta, porzioni: number, dispensa: Dispensa | undefined): number {
  if (!dispensa || ricetta.ingredienti.length === 0) return 0;
  const inDispensa = ricetta.ingredienti.filter((i) => trovaCorrispondenzaDispensa(i.nome, dispensa)).length;
  return ricetta.costoStimatoPorzione * porzioni * (inDispensa / ricetta.ingredienti.length);
}

/** Sceglie fra le candidate sopra soglia (le migliori 3, sorteggio pesato verso l'alto e deterministico dato il seed). `null` se nessuna supera la soglia. */
function scegliSopraSoglia(scored: EsitoPunteggio[], rng: () => number): EsitoPunteggio | null {
  const sopraSoglia = scored.filter((c) => c.punteggio >= PESI_GENERATORE.sogliaMinima).sort((a, b) => b.punteggio - a.punteggio);
  if (sopraSoglia.length === 0) return null;
  const top = sopraSoglia.slice(0, 3);
  const pesi = top.map((_, i) => top.length - i);
  const pesoTotale = pesi.reduce((a, b) => a + b, 0);
  let scelta = rng() * pesoTotale;
  for (let i = 0; i < top.length; i++) {
    scelta -= pesi[i];
    if (scelta <= 0) return top[i];
  }
  return top[0];
}

/**
 * Colazione: logica diversa dagli altri pasti (Step 4). Le persone
 * ripetono la colazione — non ha senso applicare qui la stessa varietà
 * rigida di pranzo/cena. Si sceglie un piccolo gruppo (di norma 3) di
 * colazioni idonee a tutti i giorni da generare e lo si alterna.
 */
function costruisciRotazioneColazione(
  candidatiPerGiorno: Map<Giorno, Ricetta[]>,
  ctx: ContestoGenerazione,
): Ricetta[] {
  const tuttiIGiorni = Array.from(candidatiPerGiorno.keys());
  if (tuttiIGiorni.length === 0) return [];
  // Una colazione entra in rotazione solo se è candidabile in TUTTI i giorni da generare
  // (rispetta quindi anche il tempo più stretto fra feriale e weekend, se misti).
  const primeCandidate = candidatiPerGiorno.get(tuttiIGiorni[0]) ?? [];
  const inTutti = primeCandidate.filter((r) => tuttiIGiorni.every((g) => (candidatiPerGiorno.get(g) ?? []).some((c) => c.id === r.id)));
  const pool = inTutti.length > 0 ? inTutti : primeCandidate;
  const scored = pool
    .map((r) => calcolaPunteggio(r, chiaveSlot(tuttiIGiorni[0], "colazione"), tuttiIGiorni[0], "colazione", ctx))
    .sort((a, b) => b.punteggio - a.punteggio);
  const n = Math.min(PESI_GENERATORE.colazione.numeroDaAlternare, scored.length);
  // Alterna dolce/salata quando possibile invece di prendere semplicemente le prime N per punteggio.
  const dolci = scored.filter((s) => s.ricetta.portata === "colazione_dolce");
  const salate = scored.filter((s) => s.ricetta.portata === "colazione_salata");
  const altre = scored.filter((s) => s.ricetta.portata !== "colazione_dolce" && s.ricetta.portata !== "colazione_salata");
  const rotazione: Ricetta[] = [];
  let iD = 0, iS = 0, iA = 0;
  while (rotazione.length < n && (iD < dolci.length || iS < salate.length || iA < altre.length)) {
    if (iS < salate.length) rotazione.push(salate[iS++].ricetta);
    if (rotazione.length < n && iD < dolci.length) rotazione.push(dolci[iD++].ricetta);
    if (rotazione.length < n && iD >= dolci.length && iS >= salate.length && iA < altre.length) rotazione.push(altre[iA++].ricetta);
  }
  return rotazione;
}

export function generaPiano(params: {
  ricette: Ricetta[];
  profilo: Profilo;
  pianoAttuale: Piano;
  preferenze: PreferenzeGenerazione;
  slotSelezionati: string[];
  dispensa?: Dispensa;
  /** Mese 1-12 usato per la stagionalità: di default il mese corrente (per test/esempi riproducibili). */
  mese?: number;
  /** Seed per il sorteggio fra le migliori candidate: di default deterministico su settimana+input, "Rigenera" ne passa uno nuovo. */
  seed?: number;
}): RisultatoGenerazione {
  const { ricette, profilo, pianoAttuale, preferenze, slotSelezionati, dispensa } = params;
  const mese = params.mese ?? new Date().getMonth() + 1;
  const rng = mulberry32(params.seed ?? seedDiDefault(profilo, preferenze, slotSelezionati));

  const tutteChiavi = GIORNI.flatMap((giorno) =>
    PASTI.map((pasto) => ({ chiave: chiaveSlot(giorno, pasto), giorno, pasto })),
  );

  const nuovoPiano: Piano = { ...pianoAttuale };
  const selezionati = new Set(slotSelezionati);
  const slotsDaGenerare = tutteChiavi.filter(
    ({ chiave }) => selezionati.has(chiave) && !pianoAttuale[chiave]?.lockata,
  );
  for (const { chiave } of slotsDaGenerare) delete nuovoPiano[chiave];

  const ctx: ContestoGenerazione = {
    profilo,
    preferenze,
    dispensa,
    mese,
    usoSettimanale: new Map(),
    usatePrincipali: new Set(),
    proteinaAllaChiave: new Map(),
    pesantezzaAllaChiave: new Map(),
    proteinaBilancio: new Map(),
    portataCena: new Map(),
    ingredientiFreschiSettimana: new Set(),
    statoRegole: statoRegoleVuoto(),
    conteggiVincoli: new Map(),
    spesaAccumulata: 0,
    risparmioAccumulato: 0,
  };
  const slotsAperti: Record<string, SlotAperto> = {};

  // I pasti già presenti e non selezionati per la rigenerazione restano nel piano finale:
  // devono comunque contare per varietà, vincoli, budget e bilanciamento.
  for (const { chiave, pasto } of tutteChiavi) {
    if (selezionati.has(chiave) && !pianoAttuale[chiave]?.lockata) continue;
    const slot = pianoAttuale[chiave];
    if (!slot) continue;
    const r = ricette.find((x) => x.id === slot.ricettaId);
    if (!r) continue;
    registraAssegnazione(ctx, chiave, pasto, r, slot.porzioni);
  }

  const porzioniDefault = Math.max(1, profilo.nucleo.persone);

  const assegna = (chiave: string, pasto: Pasto, ricetta: Ricetta, motivo: string, pienamenteDiStagione: boolean) => {
    nuovoPiano[chiave] = { ricettaId: ricetta.id, porzioni: porzioniDefault, lockata: false, motivo, diStagione: pienamenteDiStagione };
    registraAssegnazione(ctx, chiave, pasto, ricetta, porzioniDefault);
  };

  // Step "voglio che ci sia" (vincoli "almeno"): stessa priorità di prima, sopra alla generazione libera.
  for (const v of preferenze.vincoli) {
    if (v.tipo !== "almeno") continue;
    let attuale = ctx.conteggiVincoli.get(v.id) ?? 0;
    if (attuale >= v.volte) continue;
    for (const slotInfo of slotsDaGenerare) {
      if (attuale >= v.volte) break;
      if (nuovoPiano[slotInfo.chiave]) continue;
      const candidati = ricette.filter(
        (r) =>
          ricettaEleggibile(r, slotInfo.giorno, slotInfo.pasto, ctx) &&
          testoCorrisponde(r, v.testo) &&
          !((slotInfo.pasto === "pranzo" || slotInfo.pasto === "cena") && ctx.usatePrincipali.has(r.id)),
      );
      if (candidati.length === 0) continue;
      const scored = candidati.map((r) => calcolaPunteggio(r, slotInfo.chiave, slotInfo.giorno, slotInfo.pasto, ctx));
      const esito = scegliSopraSoglia(scored, rng) ?? scored.sort((a, b) => b.punteggio - a.punteggio)[0];
      assegna(slotInfo.chiave, slotInfo.pasto, esito.ricetta, generaMotivo(esito, slotInfo.giorno, profilo), esito.pienamenteDiStagione);
      attuale++;
      ctx.conteggiVincoli.set(v.id, attuale);
    }
  }

  let restanti = slotsDaGenerare.filter(({ chiave }) => !nuovoPiano[chiave]);

  // Colazione: rotazione alternata invece di uno scoring indipendente per ogni slot (Step 4).
  const slotColazione = restanti.filter(({ pasto }) => pasto === "colazione");
  if (slotColazione.length > 0) {
    const candidatiPerGiorno = new Map<Giorno, Ricetta[]>();
    for (const { giorno } of slotColazione) {
      candidatiPerGiorno.set(giorno, ricette.filter((r) => ricettaEleggibile(r, giorno, "colazione", ctx)));
    }
    const rotazione = costruisciRotazioneColazione(candidatiPerGiorno, ctx);
    let indiceRotazione = 0;
    for (const { chiave, giorno } of slotColazione) {
      const disponibiliQui = candidatiPerGiorno.get(giorno) ?? [];
      let scelta: Ricetta | undefined;
      for (let tentativo = 0; tentativo < rotazione.length; tentativo++) {
        const candidata = rotazione[(indiceRotazione + tentativo) % rotazione.length];
        if (disponibiliQui.some((r) => r.id === candidata.id)) {
          scelta = candidata;
          indiceRotazione = indiceRotazione + tentativo + 1;
          break;
        }
      }
      if (scelta) {
        const esito = calcolaPunteggio(scelta, chiave, giorno, "colazione", ctx);
        assegna(chiave, "colazione", scelta, generaMotivo(esito, giorno, profilo), esito.pienamenteDiStagione);
      } else if (disponibiliQui.length > 0) {
        const scored = disponibiliQui.map((r) => calcolaPunteggio(r, chiave, giorno, "colazione", ctx));
        const esito = scegliSopraSoglia(scored, rng);
        if (esito) assegna(chiave, "colazione", esito.ricetta, generaMotivo(esito, giorno, profilo), esito.pienamenteDiStagione);
        else {
          scored.sort((a, b) => b.punteggio - a.punteggio);
          slotsAperti[chiave] = {
            candidati: scored.slice(0, 3).map((s) => ({ ricettaId: s.ricetta.id, motivo: motivoScarto(s.ricetta, giorno, "colazione", ctx, s.punteggio) })),
          };
        }
      }
    }
  }
  restanti = restanti.filter(({ pasto }) => pasto !== "colazione");

  // Pranzo/cena: prima gli slot più vincolati (meno candidate eleggibili) — è così che gli
  // "obbligati" (fuori casa, poco tempo) vengono coperti prima di consumare le poche ricette adatte.
  const conCandidati = restanti.map((slotInfo) => ({
    slotInfo,
    candidati: ricette.filter(
      (r) => ricettaEleggibile(r, slotInfo.giorno, slotInfo.pasto, ctx) && !ctx.usatePrincipali.has(r.id),
    ),
  }));
  conCandidati.sort((a, b) => a.candidati.length - b.candidati.length);

  let slotsRimasti = conCandidati.length;
  for (const { slotInfo, candidati: candidatiIniziali } of conCandidati) {
    let candidati = candidatiIniziali.filter((r) => !ctx.usatePrincipali.has(r.id));
    candidati = candidati.filter((r) => {
      for (const v of preferenze.vincoli) {
        if (v.tipo !== "massimo") continue;
        if (testoCorrisponde(r, v.testo) && (ctx.conteggiVincoli.get(v.id) ?? 0) >= v.volte) return false;
      }
      return true;
    });
    slotsRimasti--;
    if (candidati.length === 0) continue;

    const scored = candidati.map((r) =>
      calcolaPunteggio(r, slotInfo.chiave, slotInfo.giorno, slotInfo.pasto, ctx, {
        budgetRimanente: preferenze.budgetTotale - ctx.spesaAccumulata,
        slotsRimasti: slotsRimasti + 1,
      }),
    );
    const esito = scegliSopraSoglia(scored, rng);
    if (esito) {
      assegna(slotInfo.chiave, slotInfo.pasto, esito.ricetta, generaMotivo(esito, slotInfo.giorno, profilo), esito.pienamenteDiStagione);
      for (const v of preferenze.vincoli) {
        if (v.tipo === "massimo" && testoCorrisponde(esito.ricetta, v.testo)) {
          ctx.conteggiVincoli.set(v.id, (ctx.conteggiVincoli.get(v.id) ?? 0) + 1);
        }
      }
    } else {
      // Regola d'oro: mai forzare. Lo slot resta aperto con le 3 migliori candidate e il perché non sono perfette.
      scored.sort((a, b) => b.punteggio - a.punteggio);
      slotsAperti[slotInfo.chiave] = {
        candidati: scored.slice(0, 3).map((s) => ({
          ricettaId: s.ricetta.id,
          motivo: motivoScarto(s.ricetta, slotInfo.giorno, slotInfo.pasto, ctx, s.punteggio),
        })),
      };
    }
  }

  return {
    piano: nuovoPiano,
    spesaStimata: Math.max(0, ctx.spesaAccumulata - ctx.risparmioAccumulato),
    risparmioDispensa: ctx.risparmioAccumulato,
    slotsAperti,
  };
}
