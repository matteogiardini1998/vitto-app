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
  // Lista della spesa leggibile: "1,2 kg" invece di "1183.3 g", "350 g" invece di "347.5 g".
  if ((u === "g" || u === "ml") && qta >= 1000) {
    const grande = Math.round(qta / 100) / 10;
    return `${grande.toLocaleString("it-IT")} ${u === "g" ? "kg" : "l"}`;
  }
  if ((u === "g" || u === "ml") && qta >= 100) return `${Math.round(qta / 10) * 10} ${u}`;
  if (u === "g" || u === "ml") return `${Math.round(qta)} ${u}`;
  const numero = formattaQuantita(qta);
  if (!u || u === "pz") return numero;
  return `${numero} ${u}`;
}

export function formattaChiaveSlot(chiave: string): string {
  const [giorno, pasto] = chiave.split("|") as [Giorno, Pasto];
  return `${giorno} ${PASTO_LABEL[pasto]?.toLowerCase() ?? pasto}`;
}
