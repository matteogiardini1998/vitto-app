/**
 * Fase R2 — tutti i pesi e le soglie dell'algoritmo di generazione in un
 * unico oggetto, per poterli ritoccare senza cercare nel codice.
 */
export const PESI_GENERATORE = {
  /** Punteggio (0-100) sotto il quale una ricetta non viene assegnata automaticamente. */
  sogliaMinima: 55,

  stagionalita: {
    bonusPienaStagione: 18,
    /** Penalità per un ingrediente fresco principale chiaramente fuori stagione. */
    penalitaFuoriStagione: 14,
  },

  area: {
    bonusAreaPropria: 8,
    bonusNazionale: 3,
  },

  varieta: {
    /** Stessa proteina principale in due pasti principali consecutivi (pranzo/cena, anche a cavallo di due giorni). */
    penalitaProteinaConsecutiva: 10,
    /** Oltre questa soglia di occorrenze della stessa portata a cena in settimana, si penalizza (es. non 5 cene di pasta). */
    sogliaPortataRipetutaCena: 2,
    penalitaPortataRipetutaCena: 6,
    /** Bilancio settimanale indicativo sulle proteine principali (pranzo+cena). */
    bilancioSettimanale: {
      legumi: { tipo: "almeno" as const, volte: 3, peso: 6 },
      pesce: { tipo: "almeno" as const, volte: 2, peso: 6 },
      uova: { tipo: "massimo" as const, volte: 2, peso: 5 },
      carne_rossa: { tipo: "massimo" as const, volte: 1, peso: 6 },
      carne_bianca: { tipo: "massimo" as const, volte: 3, peso: 4 },
    },
  },

  coerenzaGiornata: {
    /** Pranzo e cena entrambi "sostanziosa" lo stesso giorno. */
    penalitaDueSostanziose: 14,
  },

  riuso: {
    bonusIngredienteFrescoGiaInLista: 4,
    bonusDispensaInScadenza: 3,
    bonusDispensaDeperibile: 1,
  },

  colazione: {
    numeroDaAlternare: 3,
  },
} as const;
