import type { Pasto, Dieta, DietaCalcolata, DietaRicetta } from "../types";

export const DIETA_RICETTA_LABEL: Record<DietaRicetta, string> = {
  onnivora: "Onnivora",
  vegetariana: "Vegetariana",
  vegana: "Vegana",
};

export const PASTO_LABEL: Record<Pasto, string> = {
  colazione: "Colazione",
  pranzo: "Pranzo",
  cena: "Cena",
};

export function dietaCompatibile(dietaProfilo: Dieta, dietaRicetta: DietaRicetta): boolean {
  switch (dietaProfilo) {
    case "vegana":
    case "fruttariana":
    case "crudista":
      return dietaRicetta === "vegana";
    case "vegetariana":
      return dietaRicetta === "vegetariana" || dietaRicetta === "vegana";
    case "pescetariana":
    case "onnivora":
    default:
      return true;
  }
}

/**
 * Fase R2: stessa funzione di sopra ma sulle diete calcolate dagli
 * ingredienti (`Ricetta.dieteCalcolate`), che distinguono correttamente il
 * pesce dalla carne — a differenza del campo legacy a 3 valori, dove una
 * ricetta di solo pesce risultava "onnivora" e un profilo pescetariana
 * poteva quindi ricevere carne. Usata dal generatore; `dietaCompatibile`
 * resta per i punti UI che lavorano ancora sul tipo a 3 valori.
 */
export function dietaCompatibileCalcolata(dietaProfilo: Dieta, dieteRicetta: DietaCalcolata[]): boolean {
  switch (dietaProfilo) {
    case "vegana":
    case "fruttariana":
    case "crudista":
      return dieteRicetta.includes("vegana");
    case "vegetariana":
      return dieteRicetta.includes("vegetariana");
    case "pescetariana":
      return dieteRicetta.includes("pescetariana");
    case "onnivora":
    default:
      return true;
  }
}

export function formattaTag(tag: string): string {
  return tag
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
