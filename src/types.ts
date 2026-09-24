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

/**
 * Le 6 diete "vere" calcolate dagli ingredienti (Fase R1: `getDiete()` in
 * `data/recipeSchema.ts`). Sostituisce, per il filtro del generatore, il
 * `DietaRicetta` a 3 valori qui sopra — che non distingue una ricetta a base
 * di solo pesce da una con carne, ed è per questo che un profilo
 * "pescetariana" poteva ricevere carne (bug noto, corretto in Fase R2).
 */
export type DietaCalcolata = "onnivora" | "vegetariana" | "vegana" | "pescetariana" | "senza_glutine" | "senza_lattosio";

export type Portata =
  | "colazione_dolce"
  | "colazione_salata"
  | "piatto_unico"
  | "primo"
  | "secondo"
  | "contorno"
  | "insalatona"
  | "zuppa"
  | "spuntino";

export type Area = "nord" | "centro" | "sud" | "isole" | "nazionale" | "internazionale";

export type ProteinaPrincipale =
  | "legumi"
  | "pesce"
  | "carne_bianca"
  | "carne_rossa"
  | "uova"
  | "latticini"
  | "tofu_tempeh"
  | "nessuna";

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

export type AvatarId =
  | "chef"
  | "fornaio"
  | "contadina"
  | "pizzaiolo"
  | "nonna"
  | "barista"
  | "pescivendolo"
  | "macellaio";

export type Profilo = {
  nome: string;
  cognome: string;
  eta: number;
  residenza: string;
  avatarId: AvatarId | null;
  /** Foto personale come avatar (dataURL, quadrata, ~256px): quando presente ha priorità sull'avatar illustrato. Resta solo sul dispositivo. */
  fotoAvatar: string | null;
  nucleo: {
    persone: number;
    tipo: TipoNucleo;
  };
  tempoMaxCucina: TempoMaxCucina;
  dieta: Dieta;
  esclusioniAssolute: string[];
  preferenzeNegative: string[];
  supermercatoPreferito: string[];
  incisivitaVoti: IncisivitaVoti;
  incisivitaVotiMinimo: number;
  onboardingCompletato: boolean;
  /** Fase R2. Default "nazionale": nessun bonus/penalità di area, stagionalità sui mesi standard. */
  area: Area;
  /** Fase R2. Se assente, il weekend usa lo stesso `tempoMaxCucina` del feriale. */
  tempoMaxCucinaWeekend?: TempoMaxCucina;
  /** Fase R2. Giorni in cui il pranzo si mangia fuori casa: quello slot deve essere trasportabile. */
  pranzoFuoriCasa: Giorno[];
  /** Fase R2. Giorno della sessione di meal prep settimanale, per il controllo di conservabilità. `null` = nessuna sessione fissa (nessun controllo). */
  giornoMealPrep: Giorno | null;
};

export type Ingrediente = {
  nome: string;
  qta: number | null;
  unita: string;
  reparto: Reparto;
  /** Fase R3: dicitura originale quando la conversione in grammi è solo approssimata (es. "un pizzico", "1 tazza"). */
  nota?: string;
  /** Fase R3: ingrediente non riconosciuto nel database canonico durante un'importazione — resta testo libero, va controllato. */
  daVerificare?: boolean;
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
  // --- Fase R2: metadata per l'algoritmo di generazione (vedi data/recipeSchema.ts) ---
  /** Diete compatibili, calcolate dagli ingredienti (sostituisce `dieta` per il filtro del generatore). */
  dieteCalcolate: DietaCalcolata[];
  portata: Portata;
  pesantezza: "leggera" | "media" | "sostanziosa";
  proteinaPrincipale: ProteinaPrincipale;
  conservabilitaGiorni: number;
  congelabile: boolean;
  trasportabile: boolean;
  area: Area;
  /** Mesi (1-12) in cui la ricetta è pienamente di stagione a livello nazionale, prima di ogni scostamento per area. */
  mesiStagione: number[];
  /** Nomi degli ingredienti stagionali che determinano `mesiStagione` (vuoto se sempre disponibile): usati per spiegare "Perché questo piatto". */
  ingredientiStagionali: string[];
  // --- Fase R3: provenienza, per le ricette importate ---
  /** Assente per le ricette scritte a mano o del seed. */
  fonte?: "utente" | "import_link" | "import_foto";
  /** Presente solo per `fonte === "import_link"`. */
  fonteUrl?: string;
};

export type SlotPasto = {
  ricettaId: string;
  porzioni: number;
  lockata: boolean;
  /** Fase R2: perché il generatore ha scelto questa ricetta (assente per gli slot assegnati a mano). */
  motivo?: string;
  /** Fase R2: vero se la ricetta era pienamente di stagione nel mese di generazione, per il badge "Di stagione". */
  diStagione?: boolean;
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
  /** L'utente ha scelto "Compro comunque" sul badge "già in dispensa": non riproporglielo per questa voce. */
  giaInDispensaIgnorato?: boolean;
};

export type IconaDispensa = "credenza" | "frigo" | "casa" | "valigia" | "ufficio";

/** Valori nutrizionali per 100g da Open Food Facts: quando presenti, più precisi delle stime del dizionario ingredienti. */
export type NutrizionePer100g = {
  kcal?: number;
  proteine?: number;
  carboidrati?: number;
  zuccheri?: number;
  grassi?: number;
  grassiSaturi?: number;
  fibre?: number;
  sale?: number;
};

export type VoceDispensa = {
  id: string;
  nome: string;
  qta: number | null;
  unita: string | null;
  categoria: Reparto;
  deperibile: boolean;
  daConsumarePresto: boolean;
  aggiuntaIl: string;
  /** Presente solo per le voci aggiunte con lo scanner: permette di riconoscerle di nuovo all'istante. */
  barcode?: string | null;
  marca?: string | null;
  nutrizionePer100g?: NutrizionePer100g | null;
  // TODO: scadenza?: string — data di scadenza opzionale, non ancora in UI.
};

export type Dispensa = {
  id: string;
  nome: string;
  icona: IconaDispensa;
  voci: VoceDispensa[];
  creataIl: string;
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
