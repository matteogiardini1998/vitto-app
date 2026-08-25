import type { GruppoAlimentare } from "./ingredienti";
import type { TagNutrizionaleCalcolato } from "../lib/nutrizione";

/**
 * Regole di una settimana equilibrata in stile mediterraneo, ispirate alle
 * linee guida italiane per una sana alimentazione. Contate sui pasti
 * principali (pranzo e cena) della settimana — la colazione non entra nel
 * conteggio. Tarabili qui, senza toccare la logica di valutazione.
 */
export type Regola = {
  id: string;
  descrizione: string;
  gruppo: GruppoAlimentare | "carne-totale";
  tipo: "almeno" | "massimo";
  /** Occorrenze richieste sui pasti principali della settimana (o soglia settimanale
   * equivalente, per le regole "in media al giorno"). */
  occorrenze: number;
  peso: number;
  /** Se presente, la regola non conta occorrenze ma la percentuale (0-1) di
   * pranzi/cene in cui il gruppo è presente. */
  percentualePastiMinima?: number;
  /** Se presente, la regola conta quanti ingredienti DIVERSI di questo
   * gruppo compaiono in settimana (rotazione), non le occorrenze del gruppo. */
  varietaMinima?: number;
  /** Se presente, la regola riguarda un tag nutrizionale calcolato invece
   * che un gruppo alimentare. */
  tagMedioAlGiorno?: TagNutrizionaleCalcolato;
  messaggioOk: string;
  messaggioKo: string;
};

export const REGOLE_BILANCIAMENTO: Regola[] = [
  {
    id: "pesce-almeno-2",
    descrizione: "Pesce almeno 2 volte a settimana",
    gruppo: "pesce",
    tipo: "almeno",
    occorrenze: 2,
    peso: 15,
    messaggioOk: "Pesce {n} {volte} — perfetto",
    messaggioKo: "Pesce solo {n} {volte} — prova ad aggiungerne un po'",
  },
  {
    id: "legumi-almeno-2",
    descrizione: "Legumi almeno 2 volte a settimana",
    gruppo: "legumi",
    tipo: "almeno",
    occorrenze: 2,
    peso: 15,
    messaggioOk: "Legumi {n} {volte} — bene così",
    messaggioKo: "Legumi solo {n} {volte} — un piatto di ceci o lenticchie in più aiuta",
  },
  {
    id: "carne-rossa-massimo-2",
    descrizione: "Carne rossa non più di 2 volte a settimana",
    gruppo: "carne-rossa",
    tipo: "massimo",
    occorrenze: 2,
    peso: 10,
    messaggioOk: "Carne rossa {n} {volte} — nella norma",
    messaggioKo: "Carne rossa {n} {volte} — un po' tanto questa settimana",
  },
  {
    id: "carne-totale-massimo-5",
    descrizione: "Carne in totale non più di 5 volte a settimana",
    gruppo: "carne-totale",
    tipo: "massimo",
    occorrenze: 5,
    peso: 10,
    messaggioOk: "Carne {n} {volte} in tutto — equilibrato",
    messaggioKo: "Carne {n} {volte} in tutto — prova a lasciarle spazio con pesce o legumi",
  },
  {
    id: "verdura-70-percento-pasti",
    descrizione: "Verdura in almeno il 70% dei pranzi e delle cene",
    gruppo: "verdura",
    tipo: "almeno",
    occorrenze: 10,
    peso: 20,
    percentualePastiMinima: 0.7,
    messaggioOk: "Verdura nel {n}% dei pasti principali — ottimo",
    messaggioKo: "Verdura solo nel {n}% dei pasti principali — aggiungine un po'",
  },
  {
    id: "cereali-varieta-3",
    descrizione: "Almeno 3 cereali diversi in settimana",
    gruppo: "cereali",
    tipo: "almeno",
    occorrenze: 3,
    peso: 10,
    varietaMinima: 3,
    messaggioOk: "{n} cereali diversi in settimana — bella varietà",
    messaggioKo: "Solo {n} tipi di cereali — prova a variare pasta, riso, farro o altro",
  },
  {
    id: "uova-massimo-4",
    descrizione: "Uova non più di 4 volte a settimana",
    gruppo: "uova",
    tipo: "massimo",
    occorrenze: 4,
    peso: 8,
    messaggioOk: "Uova {n} {volte} — nella norma",
    messaggioKo: "Uova {n} {volte} — potresti alternarle con altre proteine",
  },
  {
    id: "fibre-media-giornaliera",
    descrizione: "In media almeno un pasto ricco di fibre al giorno",
    gruppo: "verdura",
    tipo: "almeno",
    occorrenze: 7,
    peso: 12,
    tagMedioAlGiorno: "ricca-di-fibre",
    messaggioOk: "Pasti ricchi di fibre quasi ogni giorno — bene così",
    messaggioKo: "Pochi pasti ricchi di fibre ({n} questa settimana) — un'insalata o dei legumi in più aiutano",
  },
];
