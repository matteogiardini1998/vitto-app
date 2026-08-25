import type { NutrizionePer100g } from "../../types";

const TIMEOUT_MS = 3500;

export type ProdottoOFF = {
  nome: string;
  marca: string | null;
  formato: string | null;
  /** Dal generico allo specifico, come da tassonomia Open Food Facts. */
  categorieGerarchia: string[];
  nutrizionePer100g: NutrizionePer100g | null;
};

export type EsitoOFF =
  | { esito: "trovato"; prodotto: ProdottoOFF }
  | { esito: "non-trovato" }
  | { esito: "errore-rete" };

function numeroOr(v: unknown): number | undefined {
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
}

function estraiNutrizione(nutriments: Record<string, unknown> | undefined): NutrizionePer100g | null {
  if (!nutriments) return null;
  const kcal =
    numeroOr(nutriments["energy-kcal_100g"]) ??
    (numeroOr(nutriments["energy_100g"]) != null ? Number(nutriments["energy_100g"]) / 4.184 : undefined);
  const valori: NutrizionePer100g = {
    kcal: kcal != null ? Math.round(kcal) : undefined,
    proteine: numeroOr(nutriments["proteins_100g"]),
    carboidrati: numeroOr(nutriments["carbohydrates_100g"]),
    zuccheri: numeroOr(nutriments["sugars_100g"]),
    grassi: numeroOr(nutriments["fat_100g"]),
    grassiSaturi: numeroOr(nutriments["saturated-fat_100g"]),
    fibre: numeroOr(nutriments["fiber_100g"]),
    sale: numeroOr(nutriments["salt_100g"]),
  };
  const haValori = Object.values(valori).some((v) => v != null);
  return haValori ? valori : null;
}

/** Cerca un prodotto su Open Food Facts. Timeout breve: meglio degradare con grazia che far aspettare chi scansiona. */
export async function cercaSuOpenFoodFacts(barcode: string): Promise<EsitoOFF> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`https://it.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`, {
      signal: controller.signal,
    });
    if (!res.ok) return { esito: res.status === 404 ? "non-trovato" : "errore-rete" };

    const data = await res.json();
    if (data?.status !== 1 || !data.product) return { esito: "non-trovato" };

    const p = data.product;
    const nome: string = p.product_name_it || p.product_name || p.generic_name_it || p.generic_name || "";
    if (!nome.trim()) return { esito: "non-trovato" };

    const categorieGerarchia: string[] = Array.isArray(p.categories_hierarchy)
      ? p.categories_hierarchy
      : Array.isArray(p.categories_tags)
        ? p.categories_tags
        : [];

    return {
      esito: "trovato",
      prodotto: {
        nome: nome.trim(),
        marca: typeof p.brands === "string" && p.brands.trim() ? p.brands.split(",")[0].trim() : null,
        formato: typeof p.quantity === "string" && p.quantity.trim() ? p.quantity.trim() : null,
        categorieGerarchia,
        nutrizionePer100g: estraiNutrizione(p.nutriments),
      },
    };
  } catch {
    return { esito: "errore-rete" };
  } finally {
    clearTimeout(timeout);
  }
}
