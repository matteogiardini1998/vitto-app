import type { Piano, Profilo, Ricetta } from "../types";
import { GIORNI, PASTI, chiaveSlot } from "../types";
import { dietaCompatibile } from "./recipeDisplay";

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
  | "vegetariana";

export const TAG_PREFERENZA_LABEL: Record<TagPreferenza, string> = {
  veloce: "Veloci",
  ricercata: "Ricercati",
  leggera: "Leggeri",
  estiva: "Estivi",
  invernale: "Invernali",
  comfort: "Comfort-pesanti",
  proteica: "Proteici-atletici",
  "gut-friendly": "Gut-friendly",
  ipocalorica: "Ipocalorici e a basso zucchero",
  vegetariana: "Vegetariani (anche se non sei vegetariano)",
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
    else s += ricetta.tags.includes(tag) ? 2 : 0;
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
  preferenze: PreferenzeGenerazione,
  profilo: Profilo,
  usoRicetta: Map<string, number>,
  budgetCtx?: { budgetRimanente: number; slotsRimasti: number },
): Ricetta {
  const scored = candidati.map((r) => {
    let s = punteggioPreferenze(r, preferenze, profilo.incisivitaVoti);
    s -= (usoRicetta.get(r.id) ?? 0) * 4;
    if (budgetCtx && budgetCtx.slotsRimasti > 0) {
      const budgetPerSlot = budgetCtx.budgetRimanente / budgetCtx.slotsRimasti;
      if (r.costoStimatoPorzione > budgetPerSlot) {
        s -= (r.costoStimatoPorzione - budgetPerSlot) * 2;
      }
    }
    return { r, s };
  });
  scored.sort((a, b) => b.s - a.s);
  const top = scored.slice(0, Math.min(3, scored.length));
  return top[Math.floor(Math.random() * top.length)].r;
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
  let spesaAccumulata = 0;

  // Conta anche i pasti già presenti e non selezionati per la rigenerazione: restano nel piano
  // finale, quindi devono comunque pesare su varietà, vincoli e budget.
  for (const { chiave } of tutteChiavi) {
    if (selezionati.has(chiave) && !pianoAttuale[chiave]?.lockata) continue;
    const slot = pianoAttuale[chiave];
    if (!slot) continue;
    const r = ricette.find((x) => x.id === slot.ricettaId);
    if (!r) continue;
    usoRicetta.set(r.id, (usoRicetta.get(r.id) ?? 0) + 1);
    spesaAccumulata += r.costoStimatoPorzione * slot.porzioni;
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
      const scelta = scegliCandidato(candidati, preferenze, profilo, usoRicetta);
      nuovoPiano[slotInfo.chiave] = { ricettaId: scelta.id, porzioni: porzioniDefault, lockata: false };
      usoRicetta.set(scelta.id, (usoRicetta.get(scelta.id) ?? 0) + 1);
      spesaAccumulata += scelta.costoStimatoPorzione * porzioniDefault;
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

    const scelta = scegliCandidato(candidati, preferenze, profilo, usoRicetta, {
      budgetRimanente: preferenze.budgetTotale - spesaAccumulata,
      slotsRimasti: slotsRimasti + 1,
    });
    nuovoPiano[slotInfo.chiave] = { ricettaId: scelta.id, porzioni: porzioniDefault, lockata: false };
    usoRicetta.set(scelta.id, (usoRicetta.get(scelta.id) ?? 0) + 1);
    spesaAccumulata += scelta.costoStimatoPorzione * porzioniDefault;
    for (const v of preferenze.vincoli) {
      if (v.tipo === "massimo" && testoCorrisponde(scelta, v.testo)) {
        conteggiVincoli.set(v.id, (conteggiVincoli.get(v.id) ?? 0) + 1);
      }
    }
  }

  return { piano: nuovoPiano, spesaStimata: spesaAccumulata };
}
