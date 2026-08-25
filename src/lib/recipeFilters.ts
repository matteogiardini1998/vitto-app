import type { Ricetta } from "../types";
import type { Filtri, Ordinamento } from "./filtriRicette";
import { tagNutrizionaliCalcolati, TAG_NUTRIZIONALE_LABEL } from "./nutrizione";

function punteggioConsigliati(r: Ricetta): number {
  return r.rating + (r.preferita ? 2 : 0) - (r.sfavorita ? 3 : 0);
}

function confronta(a: Ricetta, b: Ricetta, ordinamento: Ordinamento): number {
  switch (ordinamento) {
    case "nome":
      return a.nome.localeCompare(b.nome, "it");
    case "tempo":
      return a.tempoMin - b.tempoMin;
    case "costo":
      return a.costoStimatoPorzione - b.costoStimatoPorzione;
    case "rating":
      return b.rating - a.rating;
    case "consigliati":
    default:
      return punteggioConsigliati(b) - punteggioConsigliati(a);
  }
}

export function filtraEOrdinaRicette(
  ricette: Ricetta[],
  ricerca: string,
  filtri: Filtri,
  ordinamento: Ordinamento,
): Ricetta[] {
  const query = ricerca.trim().toLowerCase();

  const filtrate = ricette.filter((r) => {
    if (query) {
      const tagCalcolatiLabel = tagNutrizionaliCalcolati(r).map((t) => TAG_NUTRIZIONALE_LABEL[t].toLowerCase());
      const corrisponde =
        r.nome.toLowerCase().includes(query) ||
        r.tags.some((t) => t.toLowerCase().includes(query)) ||
        tagCalcolatiLabel.some((t) => t.includes(query));
      if (!corrisponde) return false;
    }
    if (filtri.pasto.length && !filtri.pasto.some((p) => r.pasto.includes(p))) return false;
    if (filtri.stile.length && !filtri.stile.includes(r.stile)) return false;
    if (filtri.dieta.length && !filtri.dieta.includes(r.dieta)) return false;
    if (filtri.ratingMinimo > 0 && r.rating < filtri.ratingMinimo) return false;
    if (filtri.soloPreferite && !r.preferita) return false;
    return true;
  });

  const fissate = filtrate.filter((r) => r.fissata).sort((a, b) => confronta(a, b, ordinamento));
  const resto = filtrate.filter((r) => !r.fissata).sort((a, b) => confronta(a, b, ordinamento));

  return [...fissate, ...resto];
}
