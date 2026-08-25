import type { Piano, Profilo, Ricetta } from "../types";
import { GIORNI, PASTI, chiaveSlot } from "../types";
import { dietaCompatibile } from "./recipeDisplay";
import { tagNutrizionaliCalcolati } from "./nutrizione";
import { punteggioBilanciamento, registraPasto, statoRegoleVuoto, type StatoRegoleSettimana } from "./bilanciamento";

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
  supermercato: string;
};

export type RisultatoGenerazione = {
  piano: Piano;
  spesaStimata: number;
};

function testoCorrisponde(ricetta: Ricetta, testo: string): boolean {
  const q = testo.trim().toLowerCase();
  if (!q) return false;
  return ricetta.nome.toLowerCase().includes(q) || ricetta.tags.some((t) => t.toLowerCase().includes(q));
}

/**
 * Gerarchia delle priorità del generatore (dalla più assoluta alla più
 * negoziabile): 1) esclusioni assolute, 2) dieta, 3) attrezzatura in cucina,
 * 4) esclusioni temporanee, 5) vincoli "voglio che ci sia", 6) budget,
 * 7) tempo, 8) sfavorite escluse, 9) bilanciamento settimanale,
 * 10) preferenze/tag del wizard e rating, 11) varietà.
 *
 * Le prime otto sono filtri duri (qui sotto e nei due cicli di
 * `generaPiano`); bilanciamento, preferenze e varietà sono invece punteggi
 * morbidi in `scegliCandidato`, che si sommano e si bilanciano fra loro.
 *
 * Il punto 3 (attrezzatura in cucina) non ha ancora un filtro dedicato:
 * arriverà quando Profilo avrà `elettrodomestici` e Ricetta `attrezzatura`.
 * Finché quei campi non esistono, ogni ricetta è eleggibile su questo fronte.
 */
function ricettaEleggibile(
  ricetta: Ricetta,
  pasto: (typeof PASTI)[number],
  profilo: Profilo,
  preferenze: PreferenzeGenerazione,
): boolean {
  if (ricetta.sfavorita) return false;
  if (!ricetta.pasto.includes(pasto)) return false;
  if (!dietaCompatibile(profilo.dieta, ricetta.dieta)) return false;
  if (ricetta.tempoMin > profilo.tempoMaxCucina) return false;
  if (profilo.incisivitaVoti === "solo-minimo" && ricetta.rating < profilo.incisivitaVotiMinimo) return false;

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

function punteggioPreferenze(ricetta: Ricetta, preferenze: PreferenzeGenerazione, incisivita: Profilo["incisivitaVoti"]): number {
  let s = 0;
  for (const tag of preferenze.tags) {
    if (tag === "veloce") s += ricetta.stile === "veloce" ? 2 : 0;
    else if (tag === "ricercata") s += ricetta.stile === "ricercata" ? 2 : 0;
    else if (tag === "vegetariana") s += ricetta.dieta === "vegetariana" || ricetta.dieta === "vegana" ? 2 : 0;
    else if (tag === "vegana") s += ricetta.dieta === "vegana" ? 2 : 0;
    else if (tag === "proteica") {
      const calcolati = tagNutrizionaliCalcolati(ricetta);
      s += ricetta.tags.includes("proteica") || calcolati.includes("proteica") ? 2 : 0;
    } else if (tag === "ipocalorica") {
      const calcolati = tagNutrizionaliCalcolati(ricetta);
      s += ricetta.tags.includes("ipocalorica") || calcolati.includes("ipocalorica") || calcolati.includes("basso-zucchero") ? 2 : 0;
    } else s += ricetta.tags.includes(tag) ? 2 : 0;
  }
  for (const v of preferenze.vincoli) {
    if (!testoCorrisponde(ricetta, v.testo)) continue;
    if (v.tipo === "molto") s += 3;
    if (v.tipo === "poco") s -= 3;
  }
  if (ricetta.preferita) s += 2;
  s += ricetta.rating * (incisivita === "preferisci-ben-votate" ? 1.5 : 0.5);
  return s;
}

function scegliCandidato(
  candidati: Ricetta[],
  pasto: (typeof PASTI)[number],
  preferenze: PreferenzeGenerazione,
  profilo: Profilo,
  usoRicetta: Map<string, number>,
  statoRegole: StatoRegoleSettimana,
  budgetCtx?: { budgetRimanente: number; slotsRimasti: number },
): Ricetta {
  const scored = candidati.map((r) => {
    // Priorità 10 (preferenze/tag/rating) e 11 (varietà, penalità ripetizione):
    let s = punteggioPreferenze(r, preferenze, profilo.incisivitaVoti);
    s -= (usoRicetta.get(r.id) ?? 0) * 4;
    // Priorità 6 (budget):
    if (budgetCtx && budgetCtx.slotsRimasti > 0) {
      const budgetPerSlot = budgetCtx.budgetRimanente / budgetCtx.slotsRimasti;
      if (r.costoStimatoPorzione > budgetPerSlot) {
        s -= (r.costoStimatoPorzione - budgetPerSlot) * 2;
      }
    }
    // Priorità 9 (bilanciamento settimanale): un consiglio forte, non imposto —
    // premia chi copre regole ancora scoperte, prima delle pure preferenze.
    const bilancio = punteggioBilanciamento(r, pasto, statoRegole);
    s += bilancio;
    return { r, s, bilancio };
  });
  scored.sort((a, b) => b.s - a.s);
  const top = scored.slice(0, Math.min(3, scored.length));

  // A parità (fra i migliori) vince chi equilibra meglio la settimana: il
  // sorteggio resta per dare varietà a "Rigenera", ma pesato verso l'alto
  // della classifica invece che uniforme.
  const pesi = top.map((_, i) => top.length - i);
  const pesoTotale = pesi.reduce((a, b) => a + b, 0);
  let scelta = Math.random() * pesoTotale;
  for (let i = 0; i < top.length; i++) {
    scelta -= pesi[i];
    if (scelta <= 0) return top[i].r;
  }
  return top[0].r;
}

export function generaPiano(params: {
  ricette: Ricetta[];
  profilo: Profilo;
  pianoAttuale: Piano;
  preferenze: PreferenzeGenerazione;
  slotSelezionati: string[];
}): RisultatoGenerazione {
  const { ricette, profilo, pianoAttuale, preferenze, slotSelezionati } = params;

  const tutteChiavi = GIORNI.flatMap((giorno) =>
    PASTI.map((pasto) => ({ chiave: chiaveSlot(giorno, pasto), giorno, pasto })),
  );

  const nuovoPiano: Piano = { ...pianoAttuale };
  const selezionati = new Set(slotSelezionati);
  const slotsDaGenerare = tutteChiavi.filter(
    ({ chiave }) => selezionati.has(chiave) && !pianoAttuale[chiave]?.lockata,
  );
  for (const { chiave } of slotsDaGenerare) delete nuovoPiano[chiave];

  const usoRicetta = new Map<string, number>();
  const conteggiVincoli = new Map<string, number>();
  const statoRegole = statoRegoleVuoto();
  let spesaAccumulata = 0;

  // Conta anche i pasti già presenti e non selezionati per la rigenerazione: restano nel piano
  // finale, quindi devono comunque pesare su varietà, vincoli, budget e bilanciamento.
  for (const { chiave, pasto } of tutteChiavi) {
    if (selezionati.has(chiave) && !pianoAttuale[chiave]?.lockata) continue;
    const slot = pianoAttuale[chiave];
    if (!slot) continue;
    const r = ricette.find((x) => x.id === slot.ricettaId);
    if (!r) continue;
    usoRicetta.set(r.id, (usoRicetta.get(r.id) ?? 0) + 1);
    spesaAccumulata += r.costoStimatoPorzione * slot.porzioni;
    registraPasto(statoRegole, r, pasto);
    for (const v of preferenze.vincoli) {
      if (testoCorrisponde(r, v.testo)) conteggiVincoli.set(v.id, (conteggiVincoli.get(v.id) ?? 0) + 1);
    }
  }

  const porzioniDefault = Math.max(1, profilo.nucleo.persone);

  for (const v of preferenze.vincoli) {
    if (v.tipo !== "almeno") continue;
    let attuale = conteggiVincoli.get(v.id) ?? 0;
    if (attuale >= v.volte) continue;
    for (const slotInfo of slotsDaGenerare) {
      if (attuale >= v.volte) break;
      if (nuovoPiano[slotInfo.chiave]) continue;
      const candidati = ricette.filter(
        (r) => ricettaEleggibile(r, slotInfo.pasto, profilo, preferenze) && testoCorrisponde(r, v.testo),
      );
      if (candidati.length === 0) continue;
      const scelta = scegliCandidato(candidati, slotInfo.pasto, preferenze, profilo, usoRicetta, statoRegole);
      nuovoPiano[slotInfo.chiave] = { ricettaId: scelta.id, porzioni: porzioniDefault, lockata: false };
      usoRicetta.set(scelta.id, (usoRicetta.get(scelta.id) ?? 0) + 1);
      spesaAccumulata += scelta.costoStimatoPorzione * porzioniDefault;
      registraPasto(statoRegole, scelta, slotInfo.pasto);
      attuale++;
      conteggiVincoli.set(v.id, attuale);
    }
  }

  const restanti = slotsDaGenerare.filter(({ chiave }) => !nuovoPiano[chiave]);
  let slotsRimasti = restanti.length;

  for (const slotInfo of restanti) {
    let candidati = ricette.filter((r) => ricettaEleggibile(r, slotInfo.pasto, profilo, preferenze));
    candidati = candidati.filter((r) => {
      for (const v of preferenze.vincoli) {
        if (v.tipo !== "massimo") continue;
        if (testoCorrisponde(r, v.testo) && (conteggiVincoli.get(v.id) ?? 0) >= v.volte) return false;
      }
      return true;
    });
    slotsRimasti--;
    if (candidati.length === 0) continue;

    const scelta = scegliCandidato(candidati, slotInfo.pasto, preferenze, profilo, usoRicetta, statoRegole, {
      budgetRimanente: preferenze.budgetTotale - spesaAccumulata,
      slotsRimasti: slotsRimasti + 1,
    });
    nuovoPiano[slotInfo.chiave] = { ricettaId: scelta.id, porzioni: porzioniDefault, lockata: false };
    usoRicetta.set(scelta.id, (usoRicetta.get(scelta.id) ?? 0) + 1);
    spesaAccumulata += scelta.costoStimatoPorzione * porzioniDefault;
    registraPasto(statoRegole, scelta, slotInfo.pasto);
    for (const v of preferenze.vincoli) {
      if (v.tipo === "massimo" && testoCorrisponde(scelta, v.testo)) {
        conteggiVincoli.set(v.id, (conteggiVincoli.get(v.id) ?? 0) + 1);
      }
    }
  }

  return { piano: nuovoPiano, spesaStimata: spesaAccumulata };
}
