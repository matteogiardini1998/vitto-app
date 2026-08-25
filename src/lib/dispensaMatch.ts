import type { Dispensa, VoceDispensa } from "../types";
import { risolviIngrediente, normalizza } from "./nutrizione";

function canonicalizza(nome: string): string {
  return risolviIngrediente(nome)?.nome ?? normalizza(nome);
}

/** Trova la voce di dispensa che corrisponde a un nome libero (lista della spesa), stesso matching tollerante dello smistamento. */
export function trovaCorrispondenzaDispensa(nome: string, dispensa: Dispensa | undefined): VoceDispensa | null {
  if (!dispensa) return null;
  const chiave = canonicalizza(nome);
  if (!chiave) return null;
  return dispensa.voci.find((v) => canonicalizza(v.nome) === chiave) ?? null;
}
