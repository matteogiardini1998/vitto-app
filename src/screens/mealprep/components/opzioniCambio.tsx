import { Drumstick, Fish, Leaf, Shuffle, Timer, Feather } from "lucide-react";
import type { ReactNode } from "react";
import type { VincoloSlot } from "../../../lib/generator";

export type OpzioneCambio = { id: string; label: string; icona: ReactNode; vincolo: VincoloSlot };

/** Le scelte rapide per cambiare un singolo pasto: una sola tappa, nessun form. */
export const OPZIONI_CAMBIO: OpzioneCambio[] = [
  { id: "altra", label: "Un'altra proposta", icona: <Shuffle size={18} />, vincolo: {} },
  { id: "veloce", label: "Più veloce", icona: <Timer size={18} />, vincolo: { stile: "veloce" } },
  { id: "leggera", label: "Più leggero", icona: <Feather size={18} />, vincolo: { stile: "leggera" } },
  { id: "carne", label: "Con carne", icona: <Drumstick size={18} />, vincolo: { vuole: "carne" } },
  { id: "pesce", label: "Con pesce", icona: <Fish size={18} />, vincolo: { vuole: "pesce" } },
  { id: "vegetariana", label: "Vegetariano", icona: <Leaf size={18} />, vincolo: { vuole: "vegetariana" } },
];

