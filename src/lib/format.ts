import type { Giorno, Pasto } from "../types";
import { PASTO_LABEL } from "./recipeDisplay";

export function formattaQuantita(qta: number): string {
  const arrotondata = Math.round(qta * 10) / 10;
  return Number.isInteger(arrotondata) ? String(arrotondata) : arrotondata.toFixed(1);
}

/** Per i "pezzi" il numero basta da solo ("4 uova", non "4 pz uova"): l'unità si vede solo quando aggiunge davvero informazione. */
export function formattaQtaUnita(qta: number | null, unita: string | null | undefined): string {
  const u = unita?.trim() ?? "";
  if (qta == null) return u;
  const numero = formattaQuantita(qta);
  if (!u || u === "pz") return numero;
  return `${numero} ${u}`;
}

export function formattaChiaveSlot(chiave: string): string {
  const [giorno, pasto] = chiave.split("|") as [Giorno, Pasto];
  return `${giorno} ${PASTO_LABEL[pasto]?.toLowerCase() ?? pasto}`;
}
