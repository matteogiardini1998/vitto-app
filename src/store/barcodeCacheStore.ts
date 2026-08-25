import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NutrizionePer100g, Reparto } from "../types";

export type ProdottoBarcode = {
  barcode: string;
  nome: string;
  marca: string | null;
  formato: string | null;
  scaffale: Reparto;
  nutrizionePer100g: NutrizionePer100g | null;
  fonte: "off" | "manuale";
};

type BarcodeCacheState = {
  prodotti: Record<string, ProdottoBarcode>;
  /** Codici letti offline (o con OFF irraggiungibile) senza corrispondenza in cache: ritentati al ritorno della rete. */
  codaDaRiconoscere: string[];
  salva: (prodotto: ProdottoBarcode) => void;
  cerca: (barcode: string) => ProdottoBarcode | null;
  accoda: (barcode: string) => void;
  rimuoviDallaCoda: (barcode: string) => void;
};

export const useBarcodeCacheStore = create<BarcodeCacheState>()(
  persist(
    (set, get) => ({
      prodotti: {},
      codaDaRiconoscere: [],
      salva: (prodotto) =>
        set((s) => ({
          prodotti: { ...s.prodotti, [prodotto.barcode]: prodotto },
          codaDaRiconoscere: s.codaDaRiconoscere.filter((b) => b !== prodotto.barcode),
        })),
      cerca: (barcode) => get().prodotti[barcode] ?? null,
      accoda: (barcode) =>
        set((s) => (s.codaDaRiconoscere.includes(barcode) ? s : { codaDaRiconoscere: [...s.codaDaRiconoscere, barcode] })),
      rimuoviDallaCoda: (barcode) =>
        set((s) => ({ codaDaRiconoscere: s.codaDaRiconoscere.filter((b) => b !== barcode) })),
    }),
    { name: "mealprep-barcode-cache" },
  ),
);
