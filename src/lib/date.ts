import { GIORNI, type Giorno } from "../types";

export function giornoOggi(): Giorno {
  const idx = (new Date().getDay() + 6) % 7;
  return GIORNI[idx];
}

export const GIORNO_LABEL_FULL: Record<Giorno, string> = {
  Lun: "Lunedì",
  Mar: "Martedì",
  Mer: "Mercoledì",
  Gio: "Giovedì",
  Ven: "Venerdì",
  Sab: "Sabato",
  Dom: "Domenica",
};
