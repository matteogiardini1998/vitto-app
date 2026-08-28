import { chiaveSlot, type Piano } from "../types";

/**
 * Piano di riserva SOLO per il tutorial: se alla prima generazione guidata
 * l'utente non seleziona nessun pasto, il piano risultante resta vuoto e il
 * banner "Aggiorna la lista della spesa" non compare nemmeno — il tutorial
 * si bloccherebbe per sempre sul passo successivo. In quel caso (e solo in
 * quello) si applica questo piccolo piano con ricette reali del catalogo di
 * base, così il tutorial può proseguire fino alla lista della spesa. Se poi
 * l'utente rigenera con una selezione vera, il piano rigenerato la sostituisce
 * normalmente — questo è solo un fallback per non restare bloccati.
 */
export function creaPianoDimostrativo(persone: number): Piano {
  const porzioni = persone > 0 ? persone : 2;
  return {
    [chiaveSlot("Lun", "pranzo")]: { ricettaId: "r02", porzioni, lockata: false },
    [chiaveSlot("Mar", "cena")]: { ricettaId: "r05", porzioni, lockata: false },
    [chiaveSlot("Gio", "pranzo")]: { ricettaId: "r08", porzioni, lockata: false },
    [chiaveSlot("Ven", "cena")]: { ricettaId: "r03", porzioni, lockata: false },
  };
}
