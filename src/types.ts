export type TipoNucleo =
  | "single"
  | "coppia"
  | "famiglia-bambini"
  | "famiglia-adulta"
  | "coinquilini";

export type TempoMaxCucina = 20 | 45 | 60 | 120;

export type Dieta =
  | "onnivora"
  | "vegetariana"
  | "vegana"
  | "pescetariana"
  | "fruttariana"
  | "crudista";

export type DietaRicetta = "onnivora" | "vegetariana" | "vegana";

export type Pasto = "colazione" | "pranzo" | "cena";

export type Reparto =
  | "frutta-verdura"
  | "carne-pesce"
  | "latticini-uova"
  | "dispensa"
  | "surgelati"
  | "pane-forno"
  | "bevande"
  | "condimenti-spezie"
  | "altro";

export type IncisivitaVoti = "off" | "preferisci-ben-votate" | "solo-minimo";

export type Profilo = {
  nome: string;
  cognome: string;
  eta: number;
  residenza: string;
  nucleo: {
    persone: number;
    tipo: TipoNucleo;
  };
  tempoMaxCucina: TempoMaxCucina;
  dieta: Dieta;
  esclusioniAssolute: string[];
  preferenzeNegative: string[];
  supermercatoPreferito: string;
  incisivitaVoti: IncisivitaVoti;
  incisivitaVotiMinimo: number;
  onboardingCompletato: boolean;
};

export type Ingrediente = {
  nome: string;
  qta: number | null;
  unita: string;
  reparto: Reparto;
};

export type Ricetta = {
  id: string;
  nome: string;
  descrizione: string;
  porzioniBase: number;
  tempoMin: number;
  costoStimatoPorzione: number;
  pasto: Pasto[];
  stile: "veloce" | "ricercata";
  tags: string[];
  dieta: DietaRicetta;
  ingredienti: Ingrediente[];
  passi: string[];
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  preferita: boolean;
  sfavorita: boolean;
  fissata: boolean;
  custom: boolean;
};

export type SlotPasto = {
  ricettaId: string;
  porzioni: number;
  lockata: boolean;
};

export type Piano = Record<string, SlotPasto>;

export type VoceSpesa = {
  id: string;
  nome: string;
  qta: number | null;
  unita: string;
  reparto: Reparto;
  presa: boolean;
  manuale: boolean;
  usataDa?: { ricettaNome: string; chiaveSlot: string }[];
};

export const GIORNI = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"] as const;
export type Giorno = (typeof GIORNI)[number];

export const PASTI: Pasto[] = ["colazione", "pranzo", "cena"];

export const REPARTI: { value: Reparto; label: string }[] = [
  { value: "frutta-verdura", label: "Frutta e verdura" },
  { value: "carne-pesce", label: "Carne e pesce" },
  { value: "latticini-uova", label: "Latticini e uova" },
  { value: "dispensa", label: "Dispensa" },
  { value: "surgelati", label: "Surgelati" },
  { value: "pane-forno", label: "Pane e forno" },
  { value: "bevande", label: "Bevande" },
  { value: "condimenti-spezie", label: "Condimenti e spezie" },
  { value: "altro", label: "Altro" },
];

export function chiaveSlot(giorno: Giorno, pasto: Pasto): string {
  return `${giorno}|${pasto}`;
}
