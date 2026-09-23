import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profilo } from "../types";

export const PROFILO_VUOTO: Profilo = {
  nome: "",
  cognome: "",
  eta: 30,
  residenza: "",
  avatarId: null,
  fotoAvatar: null,
  nucleo: { persone: 1, tipo: "single" },
  tempoMaxCucina: 45,
  dieta: "onnivora",
  esclusioniAssolute: [],
  preferenzeNegative: [],
  supermercatoPreferito: [],
  incisivitaVoti: "off",
  incisivitaVotiMinimo: 3,
  onboardingCompletato: false,
  area: "nazionale",
  pranzoFuoriCasa: [],
  giornoMealPrep: "Dom",
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
    {
      name: "mealprep-profilo",
      version: 2,
      // v0→v1: supermercatoPreferito da singola stringa ad array (multi-select).
      // v1→v2 (Fase R2): nuovi campi area/pranzoFuoriCasa/giornoMealPrep, assenti nei profili già salvati.
      migrate: (persisted, version) => {
        const p = persisted as { profilo?: Profilo & { supermercatoPreferito?: unknown } };
        if (version < 1 && p?.profilo && typeof p.profilo.supermercatoPreferito === "string") {
          const s = p.profilo.supermercatoPreferito as string;
          p.profilo.supermercatoPreferito = s ? [s] : [];
        }
        if (version < 2 && p?.profilo) {
          p.profilo.area ??= "nazionale";
          p.profilo.pranzoFuoriCasa ??= [];
          p.profilo.giornoMealPrep ??= "Dom";
        }
        return p as ProfileState;
      },
    },
  ),
);
