import type { Pasto, Dieta, DietaRicetta } from "../types";

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

export function formattaTag(tag: string): string {
  return tag
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
