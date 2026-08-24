import { GIORNI, PASTI, chiaveSlot, type Piano } from "../types";

export function chiaviVuoteSelezionabili(pianoAttuale: Piano): string[] {
  return GIORNI.flatMap((g) => PASTI.map((p) => chiaveSlot(g, p))).filter((c) => !pianoAttuale[c]);
}

export function chiaviNonBloccate(pianoAttuale: Piano): string[] {
  return GIORNI.flatMap((g) => PASTI.map((p) => chiaveSlot(g, p))).filter((c) => !pianoAttuale[c]?.lockata);
}
