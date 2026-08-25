import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Dispensa, VoceDispensa, IconaDispensa, NutrizionePer100g, Reparto } from "../types";
import { generaId } from "../lib/id";
import { deperibilePropostoPer } from "../lib/dispensa";

function nuovaDispensa(nome: string, icona: IconaDispensa): Dispensa {
  return { id: generaId(), nome, icona, voci: [], creataIl: new Date().toISOString() };
}

const DISPENSA_INIZIALE = nuovaDispensa("Casa", "casa");

type NuovaVoceInput = {
  nome: string;
  qta?: number | null;
  unita?: string | null;
  categoria?: Reparto;
  deperibile?: boolean;
  daConsumarePresto?: boolean;
  barcode?: string | null;
  marca?: string | null;
  nutrizionePer100g?: NutrizionePer100g | null;
};

type DispensaState = {
  dispense: Dispensa[];
  dispensaAttivaId: string;

  dispensaAttiva: () => Dispensa;
  setDispensaAttiva: (id: string) => void;
  creaDispensa: (nome: string, icona: IconaDispensa) => string;
  rinominaDispensa: (id: string, nome: string) => void;
  cambiaIconaDispensa: (id: string, icona: IconaDispensa) => void;
  svuotaDispensa: (id: string) => void;
  eliminaDispensa: (id: string) => void;

  aggiungiVoce: (dispensaId: string, voce: NuovaVoceInput) => string;
  aggiornaVoce: (dispensaId: string, voceId: string, patch: Partial<VoceDispensa>) => void;
  rimuoviVoce: (dispensaId: string, voceId: string) => void;
  spostaVoce: (voceId: string, daDispensaId: string, aDispensaId: string) => void;
};

export const useDispensaStore = create<DispensaState>()(
  persist(
    (set, get) => ({
      dispense: [DISPENSA_INIZIALE],
      dispensaAttivaId: DISPENSA_INIZIALE.id,

      dispensaAttiva: () => {
        const s = get();
        return s.dispense.find((d) => d.id === s.dispensaAttivaId) ?? s.dispense[0];
      },

      setDispensaAttiva: (id) => set({ dispensaAttivaId: id }),

      creaDispensa: (nome, icona) => {
        const d = nuovaDispensa(nome.trim() || "Nuova dispensa", icona);
        set((s) => ({ dispense: [...s.dispense, d] }));
        return d.id;
      },

      rinominaDispensa: (id, nome) =>
        set((s) => ({
          dispense: s.dispense.map((d) => (d.id === id ? { ...d, nome: nome.trim() || d.nome } : d)),
        })),

      cambiaIconaDispensa: (id, icona) =>
        set((s) => ({ dispense: s.dispense.map((d) => (d.id === id ? { ...d, icona } : d)) })),

      svuotaDispensa: (id) =>
        set((s) => ({ dispense: s.dispense.map((d) => (d.id === id ? { ...d, voci: [] } : d)) })),

      eliminaDispensa: (id) =>
        set((s) => {
          if (s.dispense.length <= 1) return s; // l'ultima dispensa non si elimina, solo si svuota
          const restanti = s.dispense.filter((d) => d.id !== id);
          const attivaId = s.dispensaAttivaId === id ? restanti[0].id : s.dispensaAttivaId;
          return { dispense: restanti, dispensaAttivaId: attivaId };
        }),

      aggiungiVoce: (dispensaId, voce) => {
        const categoria = voce.categoria ?? "altro";
        const nuova: VoceDispensa = {
          id: generaId(),
          nome: voce.nome.trim(),
          qta: voce.qta ?? null,
          unita: voce.unita ?? null,
          categoria,
          deperibile: voce.deperibile ?? deperibilePropostoPer(categoria),
          daConsumarePresto: voce.daConsumarePresto ?? false,
          aggiuntaIl: new Date().toISOString(),
          barcode: voce.barcode ?? null,
          marca: voce.marca ?? null,
          nutrizionePer100g: voce.nutrizionePer100g ?? null,
        };
        set((s) => ({
          dispense: s.dispense.map((d) => (d.id !== dispensaId ? d : { ...d, voci: [...d.voci, nuova] })),
        }));
        return nuova.id;
      },

      aggiornaVoce: (dispensaId, voceId, patch) =>
        set((s) => ({
          dispense: s.dispense.map((d) =>
            d.id !== dispensaId
              ? d
              : { ...d, voci: d.voci.map((v) => (v.id === voceId ? { ...v, ...patch } : v)) },
          ),
        })),

      rimuoviVoce: (dispensaId, voceId) =>
        set((s) => ({
          dispense: s.dispense.map((d) =>
            d.id !== dispensaId ? d : { ...d, voci: d.voci.filter((v) => v.id !== voceId) },
          ),
        })),

      spostaVoce: (voceId, daDispensaId, aDispensaId) =>
        set((s) => {
          if (daDispensaId === aDispensaId) return s;
          const origine = s.dispense.find((d) => d.id === daDispensaId);
          const voce = origine?.voci.find((v) => v.id === voceId);
          if (!voce) return s;
          return {
            dispense: s.dispense.map((d) => {
              if (d.id === daDispensaId) return { ...d, voci: d.voci.filter((v) => v.id !== voceId) };
              if (d.id === aDispensaId) return { ...d, voci: [...d.voci, voce] };
              return d;
            }),
          };
        }),
    }),
    { name: "mealprep-dispensa" },
  ),
);
