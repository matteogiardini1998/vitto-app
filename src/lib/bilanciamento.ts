import type { Piano, Ricetta, Pasto } from "../types";
import { GIORNI, chiaveSlot } from "../types";
import { REGOLE_BILANCIAMENTO, type Regola } from "../data/regoleBilanciamento";
import { SOGLIA_GRAMMI_GRUPPO_NEL_PASTO } from "../data/soglieNutrizionali";
import type { GruppoAlimentare } from "../data/ingredienti";
import { grammiPerGruppo, risolviIngrediente, quantitaInGrammi, tagNutrizionaliCalcolati, type TagNutrizionaleCalcolato } from "./nutrizione";

/** Solo pranzo e cena contano per le regole di bilanciamento — la colazione no. */
const PASTI_PRINCIPALI: Pasto[] = ["pranzo", "cena"];

/**
 * Stato di avanzamento delle regole, accumulato pasto per pasto. Usato sia
 * per il report finale (`valutaSettimana`) sia — mutato in diretta — dal
 * generatore, per sapere quali regole sono ancora scoperte mentre riempie
 * il piano.
 */
export type StatoRegoleSettimana = {
  pastiPrincipaliTotali: number;
  occorrenzeGruppo: Partial<Record<GruppoAlimentare, number>>;
  varietaGruppo: Partial<Record<GruppoAlimentare, Set<string>>>;
  occorrenzeTag: Partial<Record<TagNutrizionaleCalcolato, number>>;
};

export function statoRegoleVuoto(): StatoRegoleSettimana {
  return { pastiPrincipaliTotali: 0, occorrenzeGruppo: {}, varietaGruppo: {}, occorrenzeTag: {} };
}

function contieneGruppo(gruppo: GruppoAlimentare, grammi: Partial<Record<GruppoAlimentare, number>>): boolean {
  const soglia = SOGLIA_GRAMMI_GRUPPO_NEL_PASTO[gruppo];
  const g = grammi[gruppo] ?? 0;
  return soglia != null ? g >= soglia : g > 0;
}

/** Aggiorna lo stato con un pasto assegnato. Va chiamata una volta per ogni slot pranzo/cena occupato. */
export function registraPasto(stato: StatoRegoleSettimana, ricetta: Ricetta, pasto: Pasto): void {
  if (!PASTI_PRINCIPALI.includes(pasto)) return;
  stato.pastiPrincipaliTotali += 1;

  const grammi = grammiPerGruppo(ricetta);
  for (const gruppo of Object.keys(grammi) as GruppoAlimentare[]) {
    if (contieneGruppo(gruppo, grammi)) {
      stato.occorrenzeGruppo[gruppo] = (stato.occorrenzeGruppo[gruppo] ?? 0) + 1;
    }
  }

  const sogliaCereali = SOGLIA_GRAMMI_GRUPPO_NEL_PASTO.cereali ?? 0;
  for (const voce of ricetta.ingredienti) {
    const ing = risolviIngrediente(voce.nome);
    if (!ing || ing.gruppo !== "cereali") continue;
    const esito = quantitaInGrammi(voce.qta, voce.unita, ing);
    if (!esito.calcolabile || esito.grammi < sogliaCereali) continue;
    const set = stato.varietaGruppo.cereali ?? new Set<string>();
    set.add(ing.id);
    stato.varietaGruppo.cereali = set;
  }

  for (const tag of tagNutrizionaliCalcolati(ricetta)) {
    stato.occorrenzeTag[tag] = (stato.occorrenzeTag[tag] ?? 0) + 1;
  }
}

function occorrenzeGruppoRegola(regola: Regola, stato: StatoRegoleSettimana): number {
  if (regola.gruppo === "carne-totale") {
    return (stato.occorrenzeGruppo["carne-rossa"] ?? 0) + (stato.occorrenzeGruppo["carne-bianca"] ?? 0);
  }
  return stato.occorrenzeGruppo[regola.gruppo] ?? 0;
}

function pluralizzaVolte(n: number): string {
  return n === 1 ? "volta" : "volte";
}

function formattaMessaggio(template: string, n: number): string {
  return template.replace("{n}", String(n)).replace("{volte}", pluralizzaVolte(n));
}

export type RisultatoRegola = {
  regola: Regola;
  conteggio: number;
  stato: "soddisfatta" | "quasi" | "mancata";
  grado: number;
  messaggio: string;
};

function valutaRegola(regola: Regola, stato: StatoRegoleSettimana): RisultatoRegola {
  let conteggio: number;
  let grado: number;

  if (regola.tagMedioAlGiorno) {
    conteggio = stato.occorrenzeTag[regola.tagMedioAlGiorno] ?? 0;
    grado = Math.min(1, conteggio / regola.occorrenze);
  } else if (regola.percentualePastiMinima != null) {
    const presenze = occorrenzeGruppoRegola(regola, stato);
    const percentuale = stato.pastiPrincipaliTotali > 0 ? presenze / stato.pastiPrincipaliTotali : 0;
    conteggio = Math.round(percentuale * 100);
    grado = Math.min(1, percentuale / regola.percentualePastiMinima);
  } else if (regola.varietaMinima != null) {
    conteggio = stato.varietaGruppo[regola.gruppo as GruppoAlimentare]?.size ?? 0;
    grado = Math.min(1, conteggio / regola.varietaMinima);
  } else {
    conteggio = occorrenzeGruppoRegola(regola, stato);
    if (regola.tipo === "almeno") {
      grado = Math.min(1, conteggio / regola.occorrenze);
    } else {
      grado = conteggio <= regola.occorrenze ? 1 : Math.max(0, 1 - (conteggio - regola.occorrenze) / regola.occorrenze);
    }
  }

  const statoRegola: RisultatoRegola["stato"] = grado >= 1 ? "soddisfatta" : grado >= 0.5 ? "quasi" : "mancata";
  const messaggio = formattaMessaggio(statoRegola === "soddisfatta" ? regola.messaggioOk : regola.messaggioKo, conteggio);

  return { regola, conteggio, stato: statoRegola, grado, messaggio };
}

export type ReportBilanciamento = {
  punteggio: number;
  regole: RisultatoRegola[];
};

function reportDaStato(stato: StatoRegoleSettimana): ReportBilanciamento {
  const regole = REGOLE_BILANCIAMENTO.map((r) => valutaRegola(r, stato));
  const pesoTotale = REGOLE_BILANCIAMENTO.reduce((tot, r) => tot + r.peso, 0);
  const punteggio = pesoTotale > 0 ? Math.round((regole.reduce((tot, r) => tot + r.grado * r.regola.peso, 0) / pesoTotale) * 100) : 0;
  return { punteggio, regole };
}

/** Valuta un piano completo (usato dalla UI e per verificare i piani generati). */
export function valutaSettimana(piano: Piano, ricette: Ricetta[]): ReportBilanciamento {
  const stato = statoRegoleVuoto();
  for (const giorno of GIORNI) {
    for (const pasto of PASTI_PRINCIPALI) {
      const slot = piano[chiaveSlot(giorno, pasto)];
      if (!slot) continue;
      const ricetta = ricette.find((r) => r.id === slot.ricettaId);
      if (ricetta) registraPasto(stato, ricetta, pasto);
    }
  }
  return reportDaStato(stato);
}

/**
 * Bonus/penalità di bilanciamento per un candidato in un dato slot, dato lo
 * stato del piano fin qui costruito: premia chi copre regole ancora
 * scoperte ("almeno" non ancora raggiunte), penalizza chi spingerebbe oltre
 * un tetto ("massimo") già raggiunto. Zero per la colazione: le regole non
 * la riguardano.
 */
export function punteggioBilanciamento(ricetta: Ricetta, pasto: Pasto, stato: StatoRegoleSettimana): number {
  if (!PASTI_PRINCIPALI.includes(pasto)) return 0;

  const grammi = grammiPerGruppo(ricetta);
  let punteggio = 0;

  for (const regola of REGOLE_BILANCIAMENTO) {
    if (regola.tagMedioAlGiorno) {
      const attuale = stato.occorrenzeTag[regola.tagMedioAlGiorno] ?? 0;
      if (attuale < regola.occorrenze && tagNutrizionaliCalcolati(ricetta).includes(regola.tagMedioAlGiorno)) {
        punteggio += 4;
      }
      continue;
    }

    const gruppoCandidato: GruppoAlimentare | null =
      regola.gruppo === "carne-totale"
        ? contieneGruppo("carne-rossa", grammi)
          ? "carne-rossa"
          : contieneGruppo("carne-bianca", grammi)
            ? "carne-bianca"
            : null
        : contieneGruppo(regola.gruppo, grammi)
          ? regola.gruppo
          : null;

    if (regola.varietaMinima != null) {
      if (!gruppoCandidato) continue;
      const varietaAttuale = stato.varietaGruppo[regola.gruppo as GruppoAlimentare]?.size ?? 0;
      if (varietaAttuale >= regola.varietaMinima) continue;
      const idsGiaVisti = stato.varietaGruppo[regola.gruppo as GruppoAlimentare];
      const portaNovita = ricetta.ingredienti.some((voce) => {
        const ing = risolviIngrediente(voce.nome);
        return ing?.gruppo === regola.gruppo && !idsGiaVisti?.has(ing.id);
      });
      if (portaNovita) punteggio += 3;
      continue;
    }

    if (regola.percentualePastiMinima != null) {
      const presenze = occorrenzeGruppoRegola(regola, stato);
      const percentualeAttuale = stato.pastiPrincipaliTotali > 0 ? presenze / stato.pastiPrincipaliTotali : 0;
      if (gruppoCandidato && percentualeAttuale < regola.percentualePastiMinima) punteggio += 4;
      continue;
    }

    const attuale = occorrenzeGruppoRegola(regola, stato);
    if (regola.tipo === "almeno") {
      if (gruppoCandidato && attuale < regola.occorrenze) punteggio += 5;
    } else {
      if (gruppoCandidato && attuale >= regola.occorrenze) punteggio -= 5;
    }
  }

  return punteggio;
}
