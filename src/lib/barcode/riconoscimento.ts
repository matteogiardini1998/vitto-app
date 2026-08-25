import type { NutrizionePer100g, Reparto } from "../../types";
import { useBarcodeCacheStore, type ProdottoBarcode } from "../../store/barcodeCacheStore";
import { cercaSuOpenFoodFacts } from "./openFoodFacts";
import { scaffaleDaCategorieOFF } from "./categoriaMapping";
import { risolviCategoria, indizioCategoria } from "../smistamento";

export type EsitoRiconoscimento =
  | { tipo: "risolto"; prodotto: ProdottoBarcode }
  | {
      tipo: "incerto";
      nome: string;
      marca: string | null;
      formato: string | null;
      nutrizionePer100g: NutrizionePer100g | null;
      suggerimento: Reparto | null;
    }
  | { tipo: "sconosciuto" };

/**
 * Il cervello del riconoscimento: cache locale, poi Open Food Facts, poi
 * mappatura categoria→scaffale. Se lo scaffale resta incerto, ricade sul
 * cervello di smistamento già esistente (dizionario + mappa appresa) prima
 * di arrendersi alle chip — un solo posto dove si decide "che scaffale è".
 */
export async function riconosciProdotto(barcode: string): Promise<EsitoRiconoscimento> {
  const cache = useBarcodeCacheStore.getState();
  const inCache = cache.cerca(barcode);
  if (inCache) return { tipo: "risolto", prodotto: inCache };

  const esitoOFF = await cercaSuOpenFoodFacts(barcode);

  if (esitoOFF.esito === "errore-rete") {
    cache.accoda(barcode);
    return { tipo: "sconosciuto" };
  }
  if (esitoOFF.esito === "non-trovato") {
    return { tipo: "sconosciuto" };
  }

  const { prodotto } = esitoOFF;
  let scaffale = scaffaleDaCategorieOFF(prodotto.categorieGerarchia);
  if (!scaffale) {
    const viaSmistamento = risolviCategoria(prodotto.nome);
    if (viaSmistamento.trovato) scaffale = viaSmistamento.categoria;
  }

  if (scaffale) {
    const completo: ProdottoBarcode = {
      barcode,
      nome: prodotto.nome,
      marca: prodotto.marca,
      formato: prodotto.formato,
      scaffale,
      nutrizionePer100g: prodotto.nutrizionePer100g,
      fonte: "off",
    };
    cache.salva(completo);
    return { tipo: "risolto", prodotto: completo };
  }

  return {
    tipo: "incerto",
    nome: prodotto.nome,
    marca: prodotto.marca,
    formato: prodotto.formato,
    nutrizionePer100g: prodotto.nutrizionePer100g,
    suggerimento: indizioCategoria(prodotto.nome),
  };
}

/** Ritenta i codici rimasti "da riconoscere" per rete assente: da chiamare al ritorno della connessione. */
export async function ritentaCodaDaRiconoscere(): Promise<void> {
  const cache = useBarcodeCacheStore.getState();
  const coda = [...cache.codaDaRiconoscere];
  for (const barcode of coda) {
    if (cache.cerca(barcode)) {
      cache.rimuoviDallaCoda(barcode);
      continue;
    }
    const esitoOFF = await cercaSuOpenFoodFacts(barcode);
    if (esitoOFF.esito === "errore-rete") continue;
    cache.rimuoviDallaCoda(barcode);
    if (esitoOFF.esito !== "trovato") continue;

    const { prodotto } = esitoOFF;
    const scaffale = scaffaleDaCategorieOFF(prodotto.categorieGerarchia) ?? risolviCategoriaOSilenzio(prodotto.nome);
    if (!scaffale) continue; // resta irrisolto: l'utente lo ha già gestito a mano quando è successo
    cache.salva({
      barcode,
      nome: prodotto.nome,
      marca: prodotto.marca,
      formato: prodotto.formato,
      scaffale,
      nutrizionePer100g: prodotto.nutrizionePer100g,
      fonte: "off",
    });
  }
}

function risolviCategoriaOSilenzio(nome: string): Reparto | null {
  const esito = risolviCategoria(nome);
  return esito.trovato ? esito.categoria : null;
}
