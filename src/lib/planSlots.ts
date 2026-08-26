import { GIORNI, PASTI, chiaveSlot, type Piano } from "../types";

/** Slot senza nessuna ricetta assegnata: liberi, generabili senza toccare nulla. */
export function chiaviVuoteSelezionabili(pianoAttuale: Piano): string[] {
  return GIORNI.flatMap((g) => PASTI.map((p) => chiaveSlot(g, p))).filter((c) => !pianoAttuale[c]);
}

/** Slot con una ricetta già assegnata (a mano o da una generazione precedente) e non bloccati con lucchetto: "già preparati". */
export function chiaviPreparate(pianoAttuale: Piano): string[] {
  return GIORNI.flatMap((g) => PASTI.map((p) => chiaveSlot(g, p))).filter(
    (c) => pianoAttuale[c] && !pianoAttuale[c].lockata,
  );
}
