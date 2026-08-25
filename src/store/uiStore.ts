import { create } from "zustand";
import { persist } from "zustand/middleware";

type Tema = "chiaro" | "scuro";

/** Temporaneo: le tre varianti di design della ruota in prova, vedi WheelNav. */
export type WheelVariant = "legno" | "ceramica" | "quadrante";

type UiState = {
  tema: Tema;
  setTema: (tema: Tema) => void;
  wheelVariant: WheelVariant;
  setWheelVariant: (variant: WheelVariant) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      tema: "chiaro",
      setTema: (tema) => set({ tema }),
      wheelVariant: "legno",
      setWheelVariant: (wheelVariant) => set({ wheelVariant }),
    }),
    { name: "mealprep-ui" },
  ),
);
