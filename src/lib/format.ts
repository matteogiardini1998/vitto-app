import type { Giorno, Pasto } from "../types";
import { PASTO_LABEL } from "./recipeDisplay";

export function formattaQuantita(qta: number): string {
  const arrotondata = Math.round(qta * 10) / 10;
  return Number.isInteger(arrotondata) ? String(arrotondata) : arrotondata.toFixed(1);
}

export function formattaChiaveSlot(chiave: string): string {
  const [giorno, pasto] = chiave.split("|") as [Giorno, Pasto];
  return `${giorno} ${PASTO_LABEL[pasto]?.toLowerCase() ?? pasto}`;
}
