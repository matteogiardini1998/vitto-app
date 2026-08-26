import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BEATS } from "../tutorial/beats";

type TutorialState = {
  tutorialCompletato: boolean;
  /** Id del passo corrente ("" quando il tutorial non è mai partito). */
  passoCorrente: string;
  /** Il tutorial è visibile ora (si può mettere in pausa senza perdere il punto). */
  attivo: boolean;
  /** True se, all'ultimo `avvia()`, il tutorial era già stato completato in passato: solo allora i tap rapidi saltano tutto. */
  eraReplay: boolean;

  avvia: () => void;
  avanza: () => void;
  vaiA: (passo: string) => void;
  metteInPausa: () => void;
  completa: () => void;
  salta: () => void;
};

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set, get) => ({
      tutorialCompletato: false,
      passoCorrente: "",
      attivo: false,
      eraReplay: false,

      avvia: () => {
        const { passoCorrente, tutorialCompletato } = get();
        // "Rivedi il tutorial" dal profilo riparte sempre da zero; una sessione
        // interrotta (tutorialCompletato ancora false) riprende da dove era.
        const primoPasso = BEATS[0].id;
        set({
          attivo: true,
          eraReplay: tutorialCompletato,
          passoCorrente: tutorialCompletato || !passoCorrente ? primoPasso : passoCorrente,
          tutorialCompletato: false,
        });
      },

      avanza: () => {
        const { passoCorrente } = get();
        const indice = BEATS.findIndex((b) => b.id === passoCorrente);
        const prossimo = BEATS[indice + 1];
        if (!prossimo) {
          get().completa();
          return;
        }
        set({ passoCorrente: prossimo.id });
      },

      vaiA: (passo) => set({ passoCorrente: passo }),

      metteInPausa: () => set({ attivo: false }),

      completa: () => set({ attivo: false, tutorialCompletato: true }),

      salta: () => set({ attivo: false, tutorialCompletato: true }),
    }),
    { name: "mealprep-tutorial" },
  ),
);
