import { describe, expect, it } from "vitest";
import { estraiRecipeJsonLd, estraiRecipeMicrodata, estraiTestoPrincipale } from "./htmlExtract";

const HTML_JSONLD_SEMPLICE = `<html><head><script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Pasta al pomodoro",
  "description": "Un classico veloce.",
  "recipeYield": "4 porzioni",
  "totalTime": "PT25M",
  "recipeIngredient": ["320 g pasta", "400 g pomodori pelati", "q.b. sale"],
  "recipeInstructions": ["Cuoci la pasta.", "Prepara il sugo.", "Manteca e servi."]
}
</script></head><body>pagina</body></html>`;

const HTML_JSONLD_GRAPH = `<html><head><script type="application/ld+json">
{"@context":"https://schema.org","@graph":[
  {"@type":"WebSite","name":"Sito"},
  {"@type":"Recipe","name":"Torta di mele","recipeIngredient":["3 mele","200 g farina"],"recipeInstructions":[{"@type":"HowToStep","text":"Sbuccia le mele."},{"@type":"HowToStep","text":"Inforna."}]}
]}
</script></head><body></body></html>`;

const HTML_JSONLD_ARRAY_TIPO = `<html><head><script type="application/ld+json">
{"@type":["Recipe","NewsArticle"],"name":"Zuppa","recipeIngredient":["1 cipolla"],"recipeInstructions":"Taglia la cipolla.\\nCuoci a fuoco lento."}
</script></head><body></body></html>`;

const HTML_MICRODATA = `<html><body>
<div itemscope itemtype="http://schema.org/Recipe">
  <span itemprop="name">Insalata di riso</span>
  <span itemprop="recipeIngredient">300 g riso</span>
  <span itemprop="recipeIngredient">1 cetriolo</span>
  <span itemprop="recipeInstructions">Lessa il riso e condisci.</span>
</div>
</body></html>`;

const HTML_SENZA_RICETTA = `<html><head><title>Blog</title></head><body><nav>menu</nav><p>Un articolo qualsiasi senza ricette.</p></body></html>`;

describe("estraiRecipeJsonLd", () => {
  it("estrae un Recipe JSON-LD semplice", () => {
    const r = estraiRecipeJsonLd(HTML_JSONLD_SEMPLICE);
    expect(r).not.toBeNull();
    expect(r!.nome).toBe("Pasta al pomodoro");
    expect(r!.porzioniBase).toBe(4);
    expect(r!.tempoMin).toBe(25);
    expect(r!.ingredienti).toEqual(["320 g pasta", "400 g pomodori pelati", "q.b. sale"]);
    expect(r!.passi).toHaveLength(3);
  });

  it("trova il Recipe annidato in @graph", () => {
    const r = estraiRecipeJsonLd(HTML_JSONLD_GRAPH);
    expect(r?.nome).toBe("Torta di mele");
    expect(r?.ingredienti).toEqual(["3 mele", "200 g farina"]);
    expect(r?.passi).toEqual(["Sbuccia le mele.", "Inforna."]);
  });

  it("riconosce @type come array e recipeInstructions come stringa unica", () => {
    const r = estraiRecipeJsonLd(HTML_JSONLD_ARRAY_TIPO);
    expect(r?.nome).toBe("Zuppa");
    expect(r?.passi).toEqual(["Taglia la cipolla.", "Cuoci a fuoco lento."]);
  });

  it("torna null quando non c'è nessun Recipe", () => {
    expect(estraiRecipeJsonLd(HTML_SENZA_RICETTA)).toBeNull();
    expect(estraiRecipeJsonLd(HTML_MICRODATA)).toBeNull();
  });
});

describe("estraiRecipeMicrodata", () => {
  it("estrae dai principali itemprop quando manca il JSON-LD", () => {
    const r = estraiRecipeMicrodata(HTML_MICRODATA);
    expect(r?.nome).toBe("Insalata di riso");
    expect(r?.ingredienti).toEqual(["300 g riso", "1 cetriolo"]);
  });

  it("torna null se non c'è alcun markup Recipe", () => {
    expect(estraiRecipeMicrodata(HTML_SENZA_RICETTA)).toBeNull();
  });
});

describe("estraiTestoPrincipale", () => {
  it("rimuove nav/script e lascia il testo leggibile", () => {
    const testo = estraiTestoPrincipale(HTML_SENZA_RICETTA);
    expect(testo).not.toContain("menu");
    expect(testo).toContain("Un articolo qualsiasi senza ricette.");
  });

  it("rispetta il limite di caratteri", () => {
    const grande = `<p>${"a".repeat(10000)}</p>`;
    expect(estraiTestoPrincipale(grande, 100).length).toBeLessThanOrEqual(100);
  });
});
