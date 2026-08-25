import { create } from "zustand";
import { persist } from "zustand/middleware";

type BarcodeUiState = {
  spiegazioneVista: boolean;
  segnaSpiegazioneVista: () => void;
};

/** Piccolo stato UI dello scanner: solo "ho già spiegato perché serve la fotocamera?". */
export const useBarcodeStore = create<BarcodeUiState>()(
  persist(
    (set) => ({
      spiegazioneVista: false,
      segnaSpiegazioneVista: () => set({ spiegazioneVista: true }),
    }),
    { name: "mealprep-barcode-ui" },
  ),
);
