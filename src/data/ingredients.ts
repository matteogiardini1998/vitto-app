/**
 * Database canonico degli ingredienti (Fase R1). Ogni ricetta si riferisce a
 * questi id — mai stringhe libere. Diete e stagionalità delle ricette si
 * calcolano da qui (vedi `recipeSchema.ts`), non si taggano mai a mano.
 *
 * Stagionalità: calendario ortofrutticolo italiano standard, produzione
 * nazionale in pieno campo (non in serra). Un ingrediente senza `mesiStagione`
 * è o non deperibile (dispensa, surgelati, spezie) o un fresco reperibile
 * tutto l'anno perché non stagionale in Italia (banana, avocado, mango — di
 * importazione) o perché coltivato/allevato senza una vera stagione forte
 * (es. pollo, uova, la maggior parte del pesce da banco/allevamento).
 */

export type Reparto =
  | "ortofrutta"
  | "carne"
  | "pesce"
  | "latticini"
  | "uova"
  | "panetteria"
  | "pasta_riso_cereali"
  | "legumi"
  | "dispensa"
  | "surgelati"
  | "spezie_condimenti"
  | "bevande";

export interface Ingredient {
  id: string;
  nome: string;
  reparto: Reparto;
  mesiStagione?: number[];
  flags: {
    animale: boolean;
    carne: boolean;
    pesce: boolean;
    latticini: boolean;
    uova: boolean;
    glutine: boolean;
    fruttaGuscio: boolean;
    miele?: boolean;
  };
}

/** Riduce il boilerplate dei flag: tutto false salvo quanto passato, `animale` derivato in automatico. */
function flags(over: Partial<Ingredient["flags"]> = {}): Ingredient["flags"] {
  const base = {
    animale: false,
    carne: false,
    pesce: false,
    latticini: false,
    uova: false,
    glutine: false,
    fruttaGuscio: false,
    ...over,
  };
  base.animale = base.carne || base.pesce || base.latticini || base.uova || base.miele === true;
  return base;
}

// Mesi come costanti leggibili.
const GEN = 1, FEB = 2, MAR = 3, APR = 4, MAG = 5, GIU = 6, LUG = 7, AGO = 8, SET = 9, OTT = 10, NOV = 11, DIC = 12;
const ESTATE = [GIU, LUG, AGO];

export const INGREDIENTS: Ingredient[] = [
  // ------------------------------------------------------------------ ORTOFRUTTA — ESTATE
  { id: "pomodoro", nome: "Pomodori maturi", reparto: "ortofrutta", mesiStagione: [...ESTATE, SET], flags: flags() },
  { id: "pomodorino", nome: "Pomodorini", reparto: "ortofrutta", mesiStagione: [...ESTATE, SET], flags: flags() },
  { id: "zucchina", nome: "Zucchine", reparto: "ortofrutta", mesiStagione: [MAG, ...ESTATE, SET], flags: flags() },
  { id: "melanzana", nome: "Melanzane", reparto: "ortofrutta", mesiStagione: [...ESTATE, SET, OTT], flags: flags() },
  { id: "peperone", nome: "Peperoni", reparto: "ortofrutta", mesiStagione: [...ESTATE, SET, OTT], flags: flags() },
  { id: "cetriolo", nome: "Cetrioli", reparto: "ortofrutta", mesiStagione: [MAG, ...ESTATE, SET], flags: flags() },
  { id: "basilico", nome: "Basilico fresco", reparto: "ortofrutta", mesiStagione: [MAG, ...ESTATE, SET], flags: flags() },
  { id: "fagiolino", nome: "Fagiolini", reparto: "ortofrutta", mesiStagione: [...ESTATE, SET], flags: flags() },
  { id: "fico", nome: "Fichi freschi", reparto: "ortofrutta", mesiStagione: [LUG, AGO, SET], flags: flags() },
  { id: "pesca", nome: "Pesche", reparto: "ortofrutta", mesiStagione: [GIU, LUG, AGO], flags: flags() },
  { id: "albicocca", nome: "Albicocche", reparto: "ortofrutta", mesiStagione: [GIU, LUG], flags: flags() },
  { id: "anguria", nome: "Anguria", reparto: "ortofrutta", mesiStagione: [...ESTATE], flags: flags() },
  { id: "melone", nome: "Melone", reparto: "ortofrutta", mesiStagione: [...ESTATE], flags: flags() },
  { id: "ciliegia", nome: "Ciliegie", reparto: "ortofrutta", mesiStagione: [MAG, GIU, LUG], flags: flags() },
  { id: "prugna", nome: "Prugne", reparto: "ortofrutta", mesiStagione: [LUG, AGO, SET], flags: flags() },

  // ------------------------------------------------------------------ ORTOFRUTTA — INVERNO
  { id: "cavolfiore", nome: "Cavolfiore", reparto: "ortofrutta", mesiStagione: [OTT, NOV, DIC, GEN, FEB, MAR], flags: flags() },
  { id: "broccolo", nome: "Broccoli", reparto: "ortofrutta", mesiStagione: [OTT, NOV, DIC, GEN, FEB, MAR], flags: flags() },
  { id: "cavolo_verza", nome: "Verza", reparto: "ortofrutta", mesiStagione: [OTT, NOV, DIC, GEN, FEB], flags: flags() },
  { id: "cavolo_nero", nome: "Cavolo nero", reparto: "ortofrutta", mesiStagione: [NOV, DIC, GEN, FEB], flags: flags() },
  { id: "radicchio", nome: "Radicchio", reparto: "ortofrutta", mesiStagione: [OTT, NOV, DIC, GEN, FEB], flags: flags() },
  { id: "finocchio", nome: "Finocchi", reparto: "ortofrutta", mesiStagione: [OTT, NOV, DIC, GEN, FEB, MAR], flags: flags() },
  { id: "arancia", nome: "Arance", reparto: "ortofrutta", mesiStagione: [NOV, DIC, GEN, FEB, MAR], flags: flags() },
  { id: "mandarino", nome: "Mandarini", reparto: "ortofrutta", mesiStagione: [NOV, DIC, GEN], flags: flags() },
  { id: "pompelmo", nome: "Pompelmo", reparto: "ortofrutta", mesiStagione: [DIC, GEN, FEB, MAR], flags: flags() },
  { id: "limone", nome: "Limoni", reparto: "ortofrutta", mesiStagione: [NOV, DIC, GEN, FEB, MAR], flags: flags() },
  { id: "cime_di_rapa", nome: "Cime di rapa", reparto: "ortofrutta", mesiStagione: [NOV, DIC, GEN, FEB], flags: flags() },
  { id: "porro", nome: "Porri", reparto: "ortofrutta", mesiStagione: [OTT, NOV, DIC, GEN, FEB, MAR], flags: flags() },
  { id: "topinambur", nome: "Topinambur", reparto: "ortofrutta", mesiStagione: [NOV, DIC, GEN, FEB], flags: flags() },
  { id: "kiwi", nome: "Kiwi", reparto: "ortofrutta", mesiStagione: [OTT, NOV, DIC, GEN, FEB, MAR, APR], flags: flags() },

  // ------------------------------------------------------------------ ORTOFRUTTA — PRIMAVERA
  { id: "asparago", nome: "Asparagi", reparto: "ortofrutta", mesiStagione: [MAR, APR, MAG, GIU], flags: flags() },
  { id: "pisello_fresco", nome: "Piselli freschi", reparto: "ortofrutta", mesiStagione: [APR, MAG, GIU], flags: flags() },
  { id: "fava_fresca", nome: "Fave fresche", reparto: "ortofrutta", mesiStagione: [APR, MAG, GIU], flags: flags() },
  { id: "carciofo", nome: "Carciofi", reparto: "ortofrutta", mesiStagione: [OTT, NOV, DIC, GEN, FEB, MAR, APR], flags: flags() },
  { id: "fragola", nome: "Fragole", reparto: "ortofrutta", mesiStagione: [APR, MAG, GIU], flags: flags() },
  { id: "rucola", nome: "Rucola", reparto: "ortofrutta", mesiStagione: [MAR, APR, MAG, SET, OTT], flags: flags() },
  { id: "ravanello", nome: "Ravanelli", reparto: "ortofrutta", mesiStagione: [MAR, APR, MAG], flags: flags() },
  { id: "menta", nome: "Menta fresca", reparto: "ortofrutta", mesiStagione: [APR, MAG, GIU, LUG, AGO, SET], flags: flags() },

  // ------------------------------------------------------------------ ORTOFRUTTA — AUTUNNO
  { id: "zucca", nome: "Zucca", reparto: "ortofrutta", mesiStagione: [SET, OTT, NOV, DIC], flags: flags() },
  { id: "fungo_porcino_fresco", nome: "Funghi porcini freschi", reparto: "ortofrutta", mesiStagione: [SET, OTT, NOV], flags: flags() },
  { id: "fungo_champignon", nome: "Funghi champignon", reparto: "ortofrutta", flags: flags() },
  { id: "castagna", nome: "Castagne", reparto: "ortofrutta", mesiStagione: [SET, OTT, NOV], flags: flags() },
  { id: "uva", nome: "Uva da tavola", reparto: "ortofrutta", mesiStagione: [AGO, SET, OTT], flags: flags() },
  { id: "melagrana", nome: "Melagrana", reparto: "ortofrutta", mesiStagione: [OTT, NOV, DIC], flags: flags() },
  { id: "pera", nome: "Pere", reparto: "ortofrutta", mesiStagione: [SET, OTT, NOV, DIC], flags: flags() },

  // ------------------------------------------------------------------ ORTOFRUTTA — TUTTO L'ANNO (coltura non stagionale forte, o import)
  { id: "cipolla", nome: "Cipolle", reparto: "ortofrutta", flags: flags() },
  { id: "cipollotto", nome: "Cipollotto", reparto: "ortofrutta", flags: flags() },
  { id: "aglio", nome: "Aglio", reparto: "ortofrutta", flags: flags() },
  { id: "carota", nome: "Carote", reparto: "ortofrutta", flags: flags() },
  { id: "sedano", nome: "Sedano", reparto: "ortofrutta", flags: flags() },
  { id: "patata", nome: "Patate", reparto: "ortofrutta", flags: flags() },
  { id: "patata_dolce", nome: "Patate dolci", reparto: "ortofrutta", flags: flags() },
  { id: "insalata_lattuga", nome: "Lattuga", reparto: "ortofrutta", flags: flags() },
  { id: "insalata_songino", nome: "Songino", reparto: "ortofrutta", flags: flags() },
  { id: "spinaci_freschi", nome: "Spinaci freschi", reparto: "ortofrutta", flags: flags() },
  { id: "prezzemolo", nome: "Prezzemolo", reparto: "ortofrutta", flags: flags() },
  { id: "rosmarino", nome: "Rosmarino fresco", reparto: "ortofrutta", flags: flags() },
  { id: "salvia", nome: "Salvia fresca", reparto: "ortofrutta", flags: flags() },
  { id: "peperoncino_fresco", nome: "Peperoncino fresco", reparto: "ortofrutta", flags: flags() },
  { id: "zenzero", nome: "Zenzero fresco", reparto: "ortofrutta", flags: flags() },
  { id: "banana", nome: "Banane", reparto: "ortofrutta", flags: flags() },
  { id: "mela", nome: "Mele", reparto: "ortofrutta", flags: flags() },
  { id: "avocado", nome: "Avocado", reparto: "ortofrutta", flags: flags() },
  { id: "mango", nome: "Mango", reparto: "ortofrutta", flags: flags() },
  { id: "ananas", nome: "Ananas", reparto: "ortofrutta", flags: flags() },
  { id: "lime", nome: "Lime", reparto: "ortofrutta", flags: flags() },
  { id: "erba_cipollina", nome: "Erba cipollina", reparto: "ortofrutta", flags: flags() },
  { id: "coriandolo_fresco", nome: "Coriandolo fresco", reparto: "ortofrutta", flags: flags() },
  { id: "timo", nome: "Timo fresco", reparto: "ortofrutta", flags: flags() },

  // ------------------------------------------------------------------ CARNE
  { id: "petto_pollo", nome: "Petto di pollo", reparto: "carne", flags: flags({ carne: true }) },
  { id: "coscia_pollo", nome: "Coscia di pollo", reparto: "carne", flags: flags({ carne: true }) },
  { id: "pollo_intero_a_pezzi", nome: "Pollo a pezzi", reparto: "carne", flags: flags({ carne: true }) },
  { id: "tacchino_fettine", nome: "Fettine di tacchino", reparto: "carne", flags: flags({ carne: true }) },
  { id: "carne_macinata_mista", nome: "Carne macinata mista", reparto: "carne", flags: flags({ carne: true }) },
  { id: "manzo_macinato", nome: "Manzo macinato", reparto: "carne", flags: flags({ carne: true }) },
  { id: "controfiletto_manzo", nome: "Controfiletto di manzo", reparto: "carne", flags: flags({ carne: true }) },
  { id: "spezzatino_manzo", nome: "Spezzatino di manzo", reparto: "carne", flags: flags({ carne: true }) },
  { id: "salsiccia", nome: "Salsiccia", reparto: "carne", flags: flags({ carne: true }) },
  { id: "lonza_maiale", nome: "Lonza di maiale", reparto: "carne", flags: flags({ carne: true }) },
  { id: "agnello_a_pezzi", nome: "Agnello a pezzi", reparto: "carne", flags: flags({ carne: true }) },
  { id: "coniglio_a_pezzi", nome: "Coniglio a pezzi", reparto: "carne", flags: flags({ carne: true }) },
  { id: "bresaola", nome: "Bresaola", reparto: "carne", flags: flags({ carne: true }) },
  { id: "speck", nome: "Speck", reparto: "carne", flags: flags({ carne: true }) },
  { id: "pancetta", nome: "Pancetta", reparto: "carne", flags: flags({ carne: true }) },
  { id: "prosciutto_crudo", nome: "Prosciutto crudo", reparto: "carne", flags: flags({ carne: true }) },
  { id: "prosciutto_cotto", nome: "Prosciutto cotto", reparto: "carne", flags: flags({ carne: true }) },
  { id: "guanciale", nome: "Guanciale", reparto: "carne", flags: flags({ carne: true }) },

  // ------------------------------------------------------------------ PESCE
  { id: "salmone_fresco", nome: "Salmone fresco", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "tonno_fresco", nome: "Tonno fresco", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "tonno_in_scatola", nome: "Tonno in scatola", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "merluzzo", nome: "Merluzzo", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "baccala_ammollato", nome: "Baccalà già ammollato", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "orata", nome: "Orata", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "branzino", nome: "Branzino", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "alici_fresche", nome: "Alici fresche", reparto: "pesce", mesiStagione: [APR, MAG, GIU, LUG, AGO, SET], flags: flags({ pesce: true }) },
  { id: "sgombro", nome: "Sgombro", reparto: "pesce", mesiStagione: [MAG, GIU, LUG, AGO, SET, OTT], flags: flags({ pesce: true }) },
  { id: "gamberi", nome: "Gamberi", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "cozze", nome: "Cozze", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "vongole", nome: "Vongole", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "calamari", nome: "Calamari", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "polpo", nome: "Polpo", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "seppie", nome: "Seppie", reparto: "pesce", flags: flags({ pesce: true }) },
  { id: "acciughe_sotto_sale", nome: "Acciughe sotto sale", reparto: "pesce", flags: flags({ pesce: true }) },

  // ------------------------------------------------------------------ LATTICINI
  { id: "latte", nome: "Latte", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "latte_scremato", nome: "Latte scremato", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "yogurt_greco", nome: "Yogurt greco", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "yogurt_bianco", nome: "Yogurt bianco", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "yogurt_vegetale", nome: "Yogurt vegetale (soia o cocco)", reparto: "latticini", flags: flags() },
  { id: "burro", nome: "Burro", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "mozzarella", nome: "Mozzarella", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "mozzarella_bufala", nome: "Mozzarella di bufala", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "scamorza", nome: "Scamorza", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "stracchino", nome: "Stracchino", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "ricotta", nome: "Ricotta", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "ricotta_salata", nome: "Ricotta salata", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "parmigiano", nome: "Parmigiano grattugiato", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "grana", nome: "Grana a scaglie", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "pecorino", nome: "Pecorino", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "feta", nome: "Feta", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "taleggio", nome: "Taleggio", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "besciamella", nome: "Besciamella", reparto: "latticini", flags: flags({ latticini: true, glutine: true }) },
  { id: "panna_da_cucina", nome: "Panna da cucina", reparto: "latticini", flags: flags({ latticini: true }) },
  { id: "philadelphia", nome: "Formaggio spalmabile", reparto: "latticini", flags: flags({ latticini: true }) },

  // ------------------------------------------------------------------ UOVA
  { id: "uova", nome: "Uova", reparto: "uova", flags: flags({ uova: true }) },

  // ------------------------------------------------------------------ PANETTERIA
  { id: "pane_integrale", nome: "Pane integrale", reparto: "panetteria", flags: flags({ glutine: true }) },
  { id: "pane_casereccio", nome: "Pane casereccio", reparto: "panetteria", flags: flags({ glutine: true }) },
  { id: "pane_raffermo", nome: "Pane raffermo", reparto: "panetteria", flags: flags({ glutine: true }) },
  { id: "pane_carasau", nome: "Pane carasau", reparto: "panetteria", flags: flags({ glutine: true }) },
  { id: "piadina", nome: "Piadina", reparto: "panetteria", flags: flags({ glutine: true }) },
  { id: "panini_integrali", nome: "Panini integrali", reparto: "panetteria", flags: flags({ glutine: true }) },
  { id: "pane_grattugiato", nome: "Pane grattugiato", reparto: "panetteria", flags: flags({ glutine: true }) },
  { id: "fette_biscottate", nome: "Fette biscottate", reparto: "panetteria", flags: flags({ glutine: true }) },
  { id: "tortilla_grano", nome: "Tortilla di grano", reparto: "panetteria", flags: flags({ glutine: true }) },
  { id: "pane_senza_glutine", nome: "Pane senza glutine", reparto: "panetteria", flags: flags() },

  // ------------------------------------------------------------------ PASTA, RISO, CEREALI
  { id: "pasta_corta", nome: "Pasta corta", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "spaghetti", nome: "Spaghetti", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "pasta_integrale", nome: "Pasta integrale", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "pasta_senza_glutine", nome: "Pasta senza glutine", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "lasagne_sfoglie", nome: "Sfoglie di lasagna", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "orecchiette", nome: "Orecchiette", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "gnocchi_patate", nome: "Gnocchi di patate", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "riso_carnaroli", nome: "Riso Carnaroli", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "riso_basmati", nome: "Riso basmati", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "riso_integrale", nome: "Riso integrale", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "riso_per_sushi", nome: "Riso per sushi", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "riso_venere", nome: "Riso venere", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "orzo_perlato", nome: "Orzo perlato", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "farro_perlato", nome: "Farro perlato", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "couscous", nome: "Couscous", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "quinoa", nome: "Quinoa", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "grano_saraceno", nome: "Fiocchi di grano saraceno", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "farina_riso", nome: "Farina di riso", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "gallette_riso", nome: "Gallette di riso", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "polenta_farina", nome: "Farina di mais per polenta", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "fiocchi_avena", nome: "Fiocchi d'avena", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "muesli", nome: "Muesli", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "granola", nome: "Granola", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "farina_00", nome: "Farina 00", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "farina_avena", nome: "Farina d'avena", reparto: "pasta_riso_cereali", flags: flags({ glutine: true }) },
  { id: "farina_ceci", nome: "Farina di ceci", reparto: "pasta_riso_cereali", flags: flags() },
  { id: "farina_mandorle", nome: "Farina di mandorle", reparto: "pasta_riso_cereali", flags: flags({ fruttaGuscio: true }) },

  // ------------------------------------------------------------------ LEGUMI (secchi e già lessati come id distinti)
  { id: "ceci_secchi", nome: "Ceci secchi", reparto: "legumi", flags: flags() },
  { id: "ceci_lessati", nome: "Ceci lessati", reparto: "legumi", flags: flags() },
  { id: "lenticchie_secche", nome: "Lenticchie secche", reparto: "legumi", flags: flags() },
  { id: "lenticchie_lessate", nome: "Lenticchie lessate", reparto: "legumi", flags: flags() },
  { id: "fagioli_borlotti_secchi", nome: "Fagioli borlotti secchi", reparto: "legumi", flags: flags() },
  { id: "fagioli_borlotti_lessati", nome: "Fagioli borlotti lessati", reparto: "legumi", flags: flags() },
  { id: "fagioli_cannellini_lessati", nome: "Fagioli cannellini lessati", reparto: "legumi", flags: flags() },
  { id: "fagioli_neri_lessati", nome: "Fagioli neri lessati", reparto: "legumi", flags: flags() },
  { id: "edamame", nome: "Edamame", reparto: "legumi", flags: flags() },
  { id: "tofu", nome: "Tofu", reparto: "legumi", flags: flags() },
  { id: "tempeh", nome: "Tempeh", reparto: "legumi", flags: flags() },
  { id: "seitan", nome: "Seitan", reparto: "legumi", flags: flags({ glutine: true }) },

  // ------------------------------------------------------------------ DISPENSA
  { id: "passata_pomodoro", nome: "Passata di pomodoro", reparto: "dispensa", flags: flags() },
  { id: "pomodori_pelati", nome: "Pomodori pelati", reparto: "dispensa", flags: flags() },
  { id: "concentrato_pomodoro", nome: "Concentrato di pomodoro", reparto: "dispensa", flags: flags() },
  { id: "brodo_vegetale", nome: "Brodo vegetale", reparto: "dispensa", flags: flags() },
  { id: "brodo_carne", nome: "Brodo di carne", reparto: "dispensa", flags: flags({ carne: true }) },
  { id: "olive_nere", nome: "Olive nere", reparto: "dispensa", flags: flags() },
  { id: "olive_verdi", nome: "Olive verdi", reparto: "dispensa", flags: flags() },
  { id: "olive_taggiasche", nome: "Olive taggiasche", reparto: "dispensa", flags: flags() },
  { id: "capperi", nome: "Capperi", reparto: "dispensa", flags: flags() },
  { id: "funghi_porcini_secchi", nome: "Funghi porcini secchi", reparto: "dispensa", flags: flags() },
  { id: "mandorle", nome: "Mandorle", reparto: "dispensa", flags: flags({ fruttaGuscio: true }) },
  { id: "noci", nome: "Noci", reparto: "dispensa", flags: flags({ fruttaGuscio: true }) },
  { id: "pinoli", nome: "Pinoli", reparto: "dispensa", flags: flags({ fruttaGuscio: true }) },
  { id: "nocciole", nome: "Nocciole", reparto: "dispensa", flags: flags({ fruttaGuscio: true }) },
  { id: "anacardi", nome: "Anacardi", reparto: "dispensa", flags: flags({ fruttaGuscio: true }) },
  { id: "arachidi", nome: "Arachidi", reparto: "dispensa", flags: flags() },
  { id: "burro_arachidi", nome: "Burro di arachidi", reparto: "dispensa", flags: flags() },
  { id: "burro_mandorle", nome: "Crema di mandorle", reparto: "dispensa", flags: flags({ fruttaGuscio: true }) },
  { id: "semi_chia", nome: "Semi di chia", reparto: "dispensa", flags: flags() },
  { id: "semi_zucca", nome: "Semi di zucca", reparto: "dispensa", flags: flags() },
  { id: "semi_girasole", nome: "Semi di girasole", reparto: "dispensa", flags: flags() },
  { id: "sesamo", nome: "Semi di sesamo", reparto: "dispensa", flags: flags() },
  { id: "uvetta", nome: "Uvetta", reparto: "dispensa", flags: flags() },
  { id: "datteri", nome: "Datteri", reparto: "dispensa", flags: flags() },
  { id: "miele", nome: "Miele", reparto: "dispensa", flags: flags({ miele: true }) },
  { id: "marmellata", nome: "Marmellata", reparto: "dispensa", flags: flags() },
  { id: "sciroppo_acero", nome: "Sciroppo d'acero", reparto: "dispensa", flags: flags() },
  { id: "zucchero", nome: "Zucchero", reparto: "dispensa", flags: flags() },
  { id: "zucchero_di_canna", nome: "Zucchero di canna", reparto: "dispensa", flags: flags() },
  { id: "cioccolato_fondente", nome: "Cioccolato fondente", reparto: "dispensa", flags: flags() },
  { id: "cacao_amaro", nome: "Cacao amaro in polvere", reparto: "dispensa", flags: flags() },
  { id: "lievito_dolci", nome: "Lievito per dolci", reparto: "dispensa", flags: flags() },
  { id: "curry_polvere", nome: "Curry in polvere", reparto: "dispensa", flags: flags() },
  { id: "salsa_soia", nome: "Salsa di soia", reparto: "dispensa", flags: flags({ glutine: true }) },
  { id: "aceto", nome: "Aceto", reparto: "dispensa", flags: flags() },
  { id: "aceto_balsamico", nome: "Aceto balsamico", reparto: "dispensa", flags: flags() },
  { id: "senape", nome: "Senape", reparto: "dispensa", flags: flags() },
  { id: "tahina", nome: "Tahina", reparto: "dispensa", flags: flags() },
  { id: "hummus", nome: "Hummus di ceci", reparto: "dispensa", flags: flags() },
  { id: "mais_dolce", nome: "Mais dolce", reparto: "dispensa", flags: flags() },
  { id: "popcorn_naturale", nome: "Popcorn al naturale", reparto: "dispensa", flags: flags() },
  { id: "cioccolato_fondente_gocce", nome: "Gocce di cioccolato fondente", reparto: "dispensa", flags: flags() },
  { id: "latte_cocco", nome: "Latte di cocco", reparto: "dispensa", flags: flags() },
  { id: "farina_cocco", nome: "Farina di cocco rapé", reparto: "dispensa", flags: flags() },
  { id: "kimchi", nome: "Kimchi", reparto: "dispensa", flags: flags() },
  { id: "harissa", nome: "Harissa", reparto: "dispensa", flags: flags() },
  { id: "wurstel", nome: "Würstel", reparto: "dispensa", flags: flags({ carne: true }) },

  // ------------------------------------------------------------------ SURGELATI
  { id: "piselli_surgelati", nome: "Piselli surgelati", reparto: "surgelati", flags: flags() },
  { id: "spinaci_surgelati", nome: "Spinaci surgelati", reparto: "surgelati", flags: flags() },
  { id: "misto_mare_surgelato", nome: "Misto mare surgelato", reparto: "surgelati", flags: flags({ pesce: true }) },
  { id: "gamberi_surgelati", nome: "Gamberi surgelati", reparto: "surgelati", flags: flags({ pesce: true }) },
  { id: "mango_surgelato", nome: "Mango surgelato", reparto: "surgelati", flags: flags() },
  { id: "frutti_bosco_surgelati", nome: "Frutti di bosco surgelati", reparto: "surgelati", flags: flags() },
  { id: "banana_surgelata", nome: "Banana congelata", reparto: "surgelati", flags: flags() },
  { id: "edamame_surgelati", nome: "Edamame surgelati", reparto: "surgelati", flags: flags() },
  { id: "verdure_grigliate_surgelate", nome: "Verdure grigliate surgelate", reparto: "surgelati", flags: flags() },

  // ------------------------------------------------------------------ SPEZIE E CONDIMENTI
  { id: "sale", nome: "Sale", reparto: "spezie_condimenti", flags: flags() },
  { id: "pepe", nome: "Pepe nero", reparto: "spezie_condimenti", flags: flags() },
  { id: "olio_evo", nome: "Olio extravergine d'oliva", reparto: "spezie_condimenti", flags: flags() },
  { id: "olio_semi", nome: "Olio di semi", reparto: "spezie_condimenti", flags: flags() },
  { id: "peperoncino_essiccato", nome: "Peperoncino essiccato", reparto: "spezie_condimenti", flags: flags() },
  { id: "alloro", nome: "Alloro", reparto: "spezie_condimenti", flags: flags() },
  { id: "cannella", nome: "Cannella", reparto: "spezie_condimenti", flags: flags() },
  { id: "cumino", nome: "Cumino", reparto: "spezie_condimenti", flags: flags() },
  { id: "paprika", nome: "Paprika", reparto: "spezie_condimenti", flags: flags() },
  { id: "zafferano", nome: "Zafferano", reparto: "spezie_condimenti", flags: flags() },
  { id: "noce_moscata", nome: "Noce moscata", reparto: "spezie_condimenti", flags: flags() },
  { id: "origano", nome: "Origano secco", reparto: "spezie_condimenti", flags: flags() },
  { id: "curcuma", nome: "Curcuma", reparto: "spezie_condimenti", flags: flags() },
  { id: "vino_bianco", nome: "Vino bianco", reparto: "spezie_condimenti", flags: flags() },
  { id: "vino_rosso", nome: "Vino rosso", reparto: "spezie_condimenti", flags: flags() },

  // ------------------------------------------------------------------ BEVANDE
  { id: "bevanda_vegetale", nome: "Bevanda vegetale", reparto: "bevande", flags: flags() },
  { id: "bevanda_cocco", nome: "Bevanda di cocco", reparto: "bevande", flags: flags() },
  { id: "caffe_polvere", nome: "Caffè macinato", reparto: "bevande", flags: flags() },
  { id: "acqua", nome: "Acqua", reparto: "bevande", flags: flags() },
];

const _byId = new Map(INGREDIENTS.map((i) => [i.id, i]));

export function getIngredient(id: string): Ingredient | undefined {
  return _byId.get(id);
}

/** Usata solo dallo script di validazione e dai test — mai per filtrare in produzione (troppo lenta su ogni render). */
export function ingredientEsiste(id: string): boolean {
  return _byId.has(id);
}
