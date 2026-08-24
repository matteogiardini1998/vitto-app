import type { Piano, Reparto, Ricetta, VoceSpesa } from "../types";
import { generaId } from "./id";

type Aggregato = {
  nome: string;
  unita: string;
  reparto: Reparto;
  qta: number | null;
  usataDa: { ricettaNome: string; chiaveSlot: string }[];
};

export function chiaveIngrediente(nome: string, unita: string): string {
  return `${nome.trim().toLowerCase()}|${unita.trim().toLowerCase()}`;
}

export function generaVociAutomatiche(piano: Piano, ricette: Ricetta[]): VoceSpesa[] {
  const aggregati = new Map<string, Aggregato>();

  for (const [chiave, slot] of Object.entries(piano)) {
    const ricetta = ricette.find((r) => r.id === slot.ricettaId);
    if (!ricetta) continue;
    const scala = slot.porzioni / ricetta.porzioniBase;

    for (const ing of ricetta.ingredienti) {
      const chiaveAggregato = chiaveIngrediente(ing.nome, ing.unita);
      const qtaScalata = ing.qta != null ? ing.qta * scala : null;
      const esistente = aggregati.get(chiaveAggregato);

      if (esistente) {
        if (qtaScalata != null) esistente.qta = (esistente.qta ?? 0) + qtaScalata;
        esistente.usataDa.push({ ricettaNome: ricetta.nome, chiaveSlot: chiave });
      } else {
        aggregati.set(chiaveAggregato, {
          nome: ing.nome,
          unita: ing.unita,
          reparto: ing.reparto,
          qta: qtaScalata,
          usataDa: [{ ricettaNome: ricetta.nome, chiaveSlot: chiave }],
        });
      }
    }
  }

  return Array.from(aggregati.values()).map((v) => ({
    id: generaId(),
    nome: v.nome,
    qta: v.qta != null ? Math.round(v.qta * 100) / 100 : null,
    unita: v.unita,
    reparto: v.reparto,
    presa: false,
    manuale: false,
    usataDa: v.usataDa,
  }));
}
