import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Piano } from "../types";

type PlanState = {
  piano: Piano;
  setSlot: (chiave: string, ricettaId: string, porzioni: number) => void;
  removeSlot: (chiave: string) => void;
  setPorzioni: (chiave: string, porzioni: number) => void;
  toggleLock: (chiave: string) => void;
  applyPiano: (piano: Piano) => void;
  svuotaPiano: () => void;
};

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      piano: {},
      setSlot: (chiave, ricettaId, porzioni) =>
        set((s) => ({
          piano: { ...s.piano, [chiave]: { ricettaId, porzioni, lockata: false } },
        })),
      removeSlot: (chiave) =>
        set((s) => {
          const { [chiave]: _rimosso, ...resto } = s.piano;
          return { piano: resto };
        }),
      setPorzioni: (chiave, porzioni) =>
        set((s) => {
          const slot = s.piano[chiave];
          if (!slot) return s;
          return { piano: { ...s.piano, [chiave]: { ...slot, porzioni } } };
        }),
      toggleLock: (chiave) =>
        set((s) => {
          const slot = s.piano[chiave];
          if (!slot) return s;
          return { piano: { ...s.piano, [chiave]: { ...slot, lockata: !slot.lockata } } };
        }),
      applyPiano: (piano) => set({ piano }),
      svuotaPiano: () => set({ piano: {} }),
    }),
    { name: "mealprep-piano" },
  ),
);
