import type { Reparto } from "../../types";

/**
 * Tabella di mappatura dalle categorie Open Food Facts (tag inglesi della loro
 * tassonomia, gerarchici) ai 9 scaffali dell'app. Non è esaustiva: copre le
 * famiglie più comuni. Quando non trova nulla, chi chiama ricade sul cervello
 * di smistamento esistente (dizionario + mappa appresa) e poi sulle chip.
 */
const MAPPA_OFF_SCAFFALE: Record<string, Reparto> = {
  // Frutta e verdura
  "en:fruits": "frutta-verdura",
  "en:vegetables": "frutta-verdura",
  "en:fresh-vegetables": "frutta-verdura",
  "en:fresh-fruits": "frutta-verdura",
  "en:potatoes": "frutta-verdura",
  "en:salads": "frutta-verdura",
  "en:dried-fruits": "frutta-verdura",

  // Carne e pesce
  "en:meats": "carne-pesce",
  "en:poultry": "carne-pesce",
  "en:fishes": "carne-pesce",
  "en:seafood": "carne-pesce",
  "en:cold-cuts": "carne-pesce",
  "en:sausages": "carne-pesce",
  "en:meat-substitutes": "carne-pesce",

  // Latticini e uova
  "en:dairies": "latticini-uova",
  "en:cheeses": "latticini-uova",
  "en:yogurts": "latticini-uova",
  "en:milks": "latticini-uova",
  "en:eggs": "latticini-uova",
  "en:creams": "latticini-uova",
  "en:butters": "latticini-uova",

  // Dispensa (secchi/inscatolati/da credenza)
  "en:groceries": "dispensa",
  "en:pastas": "dispensa",
  "en:rices": "dispensa",
  "en:cereals-and-potatoes": "dispensa",
  "en:breakfast-cereals": "dispensa",
  "en:flours": "dispensa",
  "en:canned-foods": "dispensa",
  "en:legumes": "dispensa",
  "en:sauces": "dispensa",
  "en:sweet-spreads": "dispensa",
  "en:chocolates": "dispensa",
  "en:sweets": "dispensa",
  "en:snacks": "dispensa",
  "en:appetizers": "dispensa",

  // Surgelati
  "en:frozen-foods": "surgelati",

  // Pane e forno
  "en:breads": "pane-forno",
  "en:biscuits": "pane-forno",
  "en:cakes": "pane-forno",
  "en:pastries": "pane-forno",
  "en:viennoiseries": "pane-forno",
  "en:breakfasts": "pane-forno",

  // Bevande
  "en:beverages": "bevande",
  "en:waters": "bevande",
  "en:sodas": "bevande",
  "en:juices": "bevande",
  "en:wines": "bevande",
  "en:beers": "bevande",
  "en:coffees": "bevande",
  "en:teas": "bevande",
  "en:plant-based-beverages": "bevande",

  // Condimenti e spezie
  "en:condiments": "condimenti-spezie",
  "en:spices": "condimenti-spezie",
  "en:salts": "condimenti-spezie",
  "en:oils": "condimenti-spezie",
  "en:vinegars": "condimenti-spezie",
  "en:herbs": "condimenti-spezie",
  "en:mustards": "condimenti-spezie",

  // Altro (non alimentare)
  "en:non-food-products": "altro",
  "en:hygiene": "altro",
  "en:cleaning-products": "altro",
  "en:home-products": "altro",
  "en:pet-food": "altro",
};

/** Prova dal tag più specifico al più generico: la prima corrispondenza vince. */
export function scaffaleDaCategorieOFF(categorieGerarchia: string[]): Reparto | null {
  for (let i = categorieGerarchia.length - 1; i >= 0; i--) {
    const scaffale = MAPPA_OFF_SCAFFALE[categorieGerarchia[i]];
    if (scaffale) return scaffale;
  }
  return null;
}
