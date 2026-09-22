/**
 * Fase R1 — Step 5. Esegui con `npm run validate:recipes`.
 * Esce con codice diverso da 0 (e stampa gli errori) se un controllo fallisce.
 * Stampa sempre, in fondo, la matrice di copertura slot × dieta e la
 * percentuale di stagionalità per pranzo/cena.
 */
import { RICETTE_COLAZIONE } from "../src/data/recipes/colazione.ts";
import { RICETTE_PRANZO } from "../src/data/recipes/pranzo.ts";
import { RICETTE_CENA } from "../src/data/recipes/cena.ts";
import { RICETTE_SPUNTINO } from "../src/data/recipes/spuntino.ts";
import { ingredientEsiste } from "../src/data/ingredients.ts";
import { getDiete, getMesiStagione, ePienamenteDiStagione, eSempreDisponibile, type Recipe, type DietaCalcolata, type MealSlot } from "../src/data/recipeSchema.ts";

const TUTTE: Recipe[] = [...RICETTE_COLAZIONE, ...RICETTE_PRANZO, ...RICETTE_CENA, ...RICETTE_SPUNTINO];

const errori: string[] = [];
const avvisi: string[] = [];

// Range di dose per porzione (g), come da specifica Fase R1.
const RANGE_PASTA_SECCA = [70, 100];
const RANGE_RISO = [70, 90];
const RANGE_LEGUMI_SECCHI = [50, 70];
const RANGE_LEGUMI_LESSATI = [120, 200]; // equivalente cotto del range secco (~2.3x), non nella spec originale ma dichiarato qui
const RANGE_CARNE = [120, 180];
const RANGE_PESCE = [150, 200];

const ID_PASTA_SECCA = new Set(["pasta_corta", "spaghetti", "pasta_integrale", "orecchiette", "lasagne_sfoglie"]);
const ID_RISO = new Set(["riso_carnaroli", "riso_basmati", "riso_integrale", "riso_per_sushi", "riso_venere"]);
const ID_LEGUMI_SECCHI = new Set(["ceci_secchi", "lenticchie_secche", "fagioli_borlotti_secchi"]);
const ID_LEGUMI_LESSATI = new Set(["ceci_lessati", "lenticchie_lessate", "fagioli_borlotti_lessati", "fagioli_cannellini_lessati", "fagioli_neri_lessati"]);
const ID_CARNE = new Set(["petto_pollo", "coscia_pollo", "pollo_intero_a_pezzi", "tacchino_fettine", "carne_macinata_mista", "manzo_macinato", "controfiletto_manzo", "spezzatino_manzo", "salsiccia", "lonza_maiale", "agnello_a_pezzi", "coniglio_a_pezzi"]);
const ID_PESCE = new Set(["salmone_fresco", "tonno_fresco", "merluzzo", "baccala_ammollato", "orata", "branzino", "sgombro"]);

const vistiId = new Set<string>();
for (const r of TUTTE) {
  if (vistiId.has(r.id)) errori.push(`id duplicato: ${r.id}`);
  vistiId.add(r.id);

  // 1) ingredientId inesistenti
  for (const ing of r.ingredienti) {
    if (!ingredientEsiste(ing.ingredientId)) {
      errori.push(`${r.id} "${r.titolo}": ingredientId sconosciuto "${ing.ingredientId}"`);
    }
  }

  // 2) slotAmmessi vuoto
  if (r.slotAmmessi.length === 0) {
    errori.push(`${r.id} "${r.titolo}": slotAmmessi vuoto`);
  }

  // 3) colazione_* a pranzo/cena, o sostanziosa a colazione
  if (r.portata.startsWith("colazione_") && r.slotAmmessi.some((s) => s === "pranzo" || s === "cena")) {
    errori.push(`${r.id} "${r.titolo}": portata "${r.portata}" ma ammessa anche a pranzo/cena`);
  }
  if (r.pesantezza === "sostanziosa" && r.slotAmmessi.includes("colazione")) {
    errori.push(`${r.id} "${r.titolo}": pesantezza "sostanziosa" ma ammessa a colazione`);
  }

  // 4) dosi per porzione
  for (const ing of r.ingredienti) {
    if (ing.opzionale) continue;
    const perPorzione = ing.quantitaG / r.porzioni;
    const isPrimoOPiattoAmido = r.portata === "primo" || r.portata === "piatto_unico";
    if (ID_PASTA_SECCA.has(ing.ingredientId) && r.portata === "primo" && (perPorzione < RANGE_PASTA_SECCA[0] || perPorzione > RANGE_PASTA_SECCA[1])) {
      errori.push(`${r.id} "${r.titolo}": ${ing.ingredientId} ${perPorzione.toFixed(0)}g/porzione fuori range primo (${RANGE_PASTA_SECCA.join("-")}g)`);
    }
    if (ID_RISO.has(ing.ingredientId) && r.portata === "primo" && (perPorzione < RANGE_RISO[0] || perPorzione > RANGE_RISO[1])) {
      errori.push(`${r.id} "${r.titolo}": ${ing.ingredientId} ${perPorzione.toFixed(0)}g/porzione fuori range primo (${RANGE_RISO.join("-")}g)`);
    }
    if (ID_LEGUMI_SECCHI.has(ing.ingredientId) && r.proteinaPrincipale === "legumi" && (perPorzione < RANGE_LEGUMI_SECCHI[0] || perPorzione > RANGE_LEGUMI_SECCHI[1])) {
      errori.push(`${r.id} "${r.titolo}": ${ing.ingredientId} ${perPorzione.toFixed(0)}g/porzione fuori range legumi secchi (${RANGE_LEGUMI_SECCHI.join("-")}g)`);
    }
    if (ID_LEGUMI_LESSATI.has(ing.ingredientId) && r.proteinaPrincipale === "legumi" && (perPorzione < RANGE_LEGUMI_LESSATI[0] || perPorzione > RANGE_LEGUMI_LESSATI[1])) {
      avvisi.push(`${r.id} "${r.titolo}": ${ing.ingredientId} ${perPorzione.toFixed(0)}g/porzione fuori range legumi lessati atteso (${RANGE_LEGUMI_LESSATI.join("-")}g)`);
    }
    if (ID_CARNE.has(ing.ingredientId) && r.proteinaPrincipale === "carne_bianca" || (ID_CARNE.has(ing.ingredientId) && r.proteinaPrincipale === "carne_rossa")) {
      if (isPrimoOPiattoAmido || r.portata === "secondo") {
        if (perPorzione < RANGE_CARNE[0] || perPorzione > RANGE_CARNE[1]) {
          errori.push(`${r.id} "${r.titolo}": ${ing.ingredientId} ${perPorzione.toFixed(0)}g/porzione fuori range carne (${RANGE_CARNE.join("-")}g)`);
        }
      }
    }
    if (ID_PESCE.has(ing.ingredientId) && r.proteinaPrincipale === "pesce" && (r.portata === "secondo" || r.portata === "piatto_unico")) {
      if (perPorzione < RANGE_PESCE[0] || perPorzione > RANGE_PESCE[1]) {
        errori.push(`${r.id} "${r.titolo}": ${ing.ingredientId} ${perPorzione.toFixed(0)}g/porzione fuori range pesce (${RANGE_PESCE.join("-")}g)`);
      }
    }
  }

  // 5) trasportabile su piatti chiaramente non trasportabili (euristica su titolo/descrizione/portata)
  const testo = `${r.titolo} ${r.descrizione}`.toLowerCase();
  // Solo i PASSAGGI (istruzioni dirette): titolo/descrizione spesso menzionano
  // la frittura in negativo ("senza friggitrice", "senza fritture") come
  // marketing, e un match ingenuo lì dava falsi positivi. Un passo che dice
  // davvero "friggi" è un'istruzione, non una frase promozionale.
  const passaggiTesto = r.passaggi.join(" ").toLowerCase();
  const sembraBrodo = r.portata === "zuppa" && testo.includes("brodo") && !testo.includes("vellutata") && !testo.includes("crema");
  const sembraFritto = /\bfriggi\b|\bfriggere\b|\bfritt[oie]\b|\bfritte\b/.test(passaggiTesto);
  const sembraSouffle = testo.includes("soufflé") || testo.includes("souffle");
  if (r.trasportabile && (sembraBrodo || sembraFritto || sembraSouffle)) {
    errori.push(`${r.id} "${r.titolo}": trasportabile=true ma sembra un piatto non trasportabile (brodo/fritto/soufflé)`);
  }

  // range difficolta/tempo minimi di sanità
  if (r.tempoPrepMin < 0 || r.tempoCotturaMin < 0) errori.push(`${r.id} "${r.titolo}": tempi negativi`);
  if (r.porzioni <= 0) errori.push(`${r.id} "${r.titolo}": porzioni <= 0`);
  if (r.ingredienti.length === 0) errori.push(`${r.id} "${r.titolo}": nessun ingrediente`);
  if (r.passaggi.length === 0) errori.push(`${r.id} "${r.titolo}": nessun passaggio`);
}

// 6) quasi-duplicati: titolo identico normalizzato, o >=80% di ingredienti in comune (Jaccard)
function normalizza(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}
const titoliNormalizzati = new Map<string, string>();
for (const r of TUTTE) {
  const n = normalizza(r.titolo);
  if (titoliNormalizzati.has(n)) {
    errori.push(`titoli quasi-identici: "${r.id}" e "${titoliNormalizzati.get(n)}" (${r.titolo})`);
  } else {
    titoliNormalizzati.set(n, r.id);
  }
}
for (let i = 0; i < TUTTE.length; i++) {
  for (let j = i + 1; j < TUTTE.length; j++) {
    const a = new Set(TUTTE[i].ingredienti.map((x) => x.ingredientId));
    const b = new Set(TUTTE[j].ingredienti.map((x) => x.ingredientId));
    if (a.size < 3 || b.size < 3) continue; // troppo pochi ingredienti per un confronto significativo
    const intersezione = [...a].filter((x) => b.has(x)).length;
    const unione = new Set([...a, ...b]).size;
    const jaccard = intersezione / unione;
    if (jaccard >= 0.8) {
      avvisi.push(`possibile quasi-duplicato (${(jaccard * 100).toFixed(0)}% ingredienti in comune): ${TUTTE[i].id} "${TUTTE[i].titolo}" / ${TUTTE[j].id} "${TUTTE[j].titolo}"`);
    }
  }
}

// ---- Matrice di copertura slot × dieta ----
const SLOTS: MealSlot[] = ["colazione", "pranzo", "cena", "spuntino"];
const DIETE: DietaCalcolata[] = ["onnivora", "vegetariana", "vegana", "pescetariana", "senza_glutine", "senza_lattosio"];
const SOGLIA_SLOT_DIETA = 15;

const matrice: Record<string, Record<string, number>> = {};
for (const slot of SLOTS) {
  matrice[slot] = {};
  for (const d of DIETE) matrice[slot][d] = 0;
}
for (const r of TUTTE) {
  const diete = getDiete(r);
  for (const slot of r.slotAmmessi) {
    for (const d of diete) matrice[slot][d]++;
  }
}

console.log("\n=== Matrice di copertura slot × dieta (soglia:", SOGLIA_SLOT_DIETA, ") ===");
console.log("slot".padEnd(12), DIETE.map((d) => d.padEnd(14)).join(""));
const celleSottoSoglia: string[] = [];
for (const slot of SLOTS) {
  const riga = DIETE.map((d) => {
    const n = matrice[slot][d];
    const marcatore = n < SOGLIA_SLOT_DIETA ? "*" : " ";
    if (n < SOGLIA_SLOT_DIETA) celleSottoSoglia.push(`${slot} × ${d} = ${n}`);
    return `${n}${marcatore}`.padEnd(14);
  }).join("");
  console.log(slot.padEnd(12), riga);
}
if (celleSottoSoglia.length) {
  console.log("\nCelle sotto soglia (*):");
  for (const c of celleSottoSoglia) console.log(" -", c);
}

// ---- Stagionalità pranzo+cena ----
const pranzoECena = TUTTE.filter((r) => r.slotAmmessi.includes("pranzo") || r.slotAmmessi.includes("cena"));
const MESI = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
console.log("\n=== % pienamente di stagione per mese (pranzo+cena, soglia 25%) ===");
for (let m = 1; m <= 12; m++) {
  const nDiStagione = pranzoECena.filter((r) => ePienamenteDiStagione(r, m)).length;
  const pct = (nDiStagione / pranzoECena.length) * 100;
  const marcatore = pct < 25 ? "*" : " ";
  console.log(`${MESI[m - 1]}: ${nDiStagione}/${pranzoECena.length} (${pct.toFixed(0)}%)${marcatore}`);
}
const nSempreDisponibili = pranzoECena.filter(eSempreDisponibile).length;
const pctSempre = (nSempreDisponibili / pranzoECena.length) * 100;
console.log(`\nRicette pranzo+cena "tutto l'anno" (nessun ingrediente stagionale): ${nSempreDisponibili}/${pranzoECena.length} (${pctSempre.toFixed(0)}%, tetto 35%)`);
if (pctSempre > 35) avvisi.push(`ricette "tutto l'anno" al ${pctSempre.toFixed(0)}%, sopra il tetto del 35%`);

// ---- Riepilogo ----
console.log(`\n=== Totale ricette: ${TUTTE.length} (colazione ${RICETTE_COLAZIONE.length}, pranzo ${RICETTE_PRANZO.length}, cena ${RICETTE_CENA.length}, spuntino ${RICETTE_SPUNTINO.length}) ===`);

if (avvisi.length) {
  console.log(`\n--- ${avvisi.length} avvisi (non bloccanti) ---`);
  for (const a of avvisi) console.log(" ⚠", a);
}

if (errori.length) {
  console.log(`\n--- ${errori.length} ERRORI ---`);
  for (const e of errori) console.log(" ✗", e);
  process.exit(1);
} else {
  console.log("\n✓ Nessun errore bloccante.");
}
