/**
 * Soglie per i tag nutrizionali calcolati e per il motore di bilanciamento.
 * Un solo posto da tarare — vedi lib/nutrizione.ts e lib/bilanciamento.ts.
 */

/** Sotto questa copertura di ingredienti risolti, i valori non si mostrano come "stima" ma come "dati incompleti". */
export const COPERTURA_MINIMA_STIMA = 0.85;

export const SOGLIE_TAG_NUTRIZIONALI = {
  proteicaMinGrammi: 25,
  proteicaMinQuotaKcal: 0.25,
  ipocaloricaMaxKcal: 450,
  bassoZuccheroMaxG: 8,
  riccaDiFibreMinG: 7,
};

/** Grammi minimi perché un ingrediente "conti" come presenza di un gruppo in un pasto. */
export const SOGLIA_GRAMMI_GRUPPO_NEL_PASTO: Record<string, number> = {
  pesce: 60,
  legumi: 60,
  "carne-rossa": 50,
  "carne-bianca": 50,
  verdura: 40,
  cereali: 30,
  latticini: 30,
  uova: 40,
  frutta: 40,
};
