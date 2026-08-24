import { create } from "zustand";
import { persist } from "zustand/middleware";

type Tema = "chiaro" | "scuro";

type UiState = {
  tema: Tema;
  setTema: (tema: Tema) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      tema: "chiaro",
      setTema: (tema) => set({ tema }),
    }),
    { name: "mealprep-ui" },
  ),
);
