import type { Dispensa, VoceDispensa } from "../types";
import { risolviIngrediente, normalizza } from "./nutrizione";

export function canonicalizza(nome: string): string {
  const ingrediente = risolviIngrediente(nome);
  return (ingrediente?.nome ?? normalizza(nome)).toLowerCase();
}

function paroleDi(testo: string): string[] {
  return testo.split(/\s+/).filter(Boolean);
}

/**
 * Vero se le due chiavi coincidono, oppure se la più corta compare per
 * intero come parola dentro la più lunga: serve a far combaciare un nome
 * breve da lista della spesa ("mele") con il nome verboso di un prodotto
 * scansionato ("Mela Golden 1kg"), che il dizionario ingredienti da solo
 * non riesce a risolvere.
 */
function corrispondonoApprossimativamente(a: string, b: string): boolean {
  if (!a || !b) return false;
  if (a === b) return true;
  const [corta, lunga] = a.length <= b.length ? [paroleDi(a), paroleDi(b)] : [paroleDi(b), paroleDi(a)];
  return corta.some((parola) => parola.length > 2 && lunga.includes(parola));
}

/** Trova la voce di dispensa che corrisponde a un nome libero (lista della spesa), stesso matching tollerante dello smistamento. */
export function trovaCorrispondenzaDispensa(nome: string, dispensa: Dispensa | undefined): VoceDispensa | null {
  if (!dispensa) return null;
  const chiave = canonicalizza(nome);
  if (!chiave) return null;
  return dispensa.voci.find((v) => corrispondonoApprossimativamente(chiave, canonicalizza(v.nome))) ?? null;
}
