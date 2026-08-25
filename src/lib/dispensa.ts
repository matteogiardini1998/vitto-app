import type { Reparto } from "../types";

/** Proposta automatica di deperibilità in base alla categoria — sempre modificabile a mano. */
const DEPERIBILE_DEFAULT: Record<Reparto, boolean> = {
  "frutta-verdura": true,
  "carne-pesce": true,
  "latticini-uova": true,
  "pane-forno": true,
  dispensa: false,
  surgelati: false,
  bevande: false,
  "condimenti-spezie": false,
  altro: false,
};

export function deperibilePropostoPer(categoria: Reparto): boolean {
  return DEPERIBILE_DEFAULT[categoria] ?? false;
}
