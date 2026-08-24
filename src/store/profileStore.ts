import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profilo } from "../types";

export const PROFILO_VUOTO: Profilo = {
  nome: "",
  cognome: "",
  eta: 30,
  residenza: "",
  avatarId: null,
  nucleo: { persone: 1, tipo: "single" },
  tempoMaxCucina: 45,
  dieta: "onnivora",
  esclusioniAssolute: [],
  preferenzeNegative: [],
  supermercatoPreferito: "",
  incisivitaVoti: "off",
  incisivitaVotiMinimo: 3,
  onboardingCompletato: false,
};

type ProfileState = {
  profilo: Profilo;
  setProfilo: (profilo: Profilo) => void;
  updateProfilo: (patch: Partial<Profilo>) => void;
  resetProfilo: () => void;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profilo: PROFILO_VUOTO,
      setProfilo: (profilo) => set({ profilo }),
      updateProfilo: (patch) => set((s) => ({ profilo: { ...s.profilo, ...patch } })),
      resetProfilo: () => set({ profilo: PROFILO_VUOTO }),
    }),
    { name: "mealprep-profilo" },
  ),
);
