import { describe, expect, it } from "vitest";
import { decodificaEntita, estraiDidascaliaDaOgTitle, riconoscePiattaformaSicura } from "./social";

describe("riconoscePiattaformaSicura", () => {
  it("riconosce le 3 piattaforme e ignora il resto", () => {
    expect(riconoscePiattaformaSicura(new URL("https://www.tiktok.com/@x/video/123"))).toBe("tiktok");
    expect(riconoscePiattaformaSicura(new URL("https://www.instagram.com/reel/abc/"))).toBe("instagram");
    expect(riconoscePiattaformaSicura(new URL("https://youtu.be/abc123"))).toBe("youtube");
    expect(riconoscePiattaformaSicura(new URL("https://www.youtube.com/watch?v=abc"))).toBe("youtube");
    expect(riconoscePiattaformaSicura(new URL("https://www.misya.info/ricetta/tiramisu.htm"))).toBeNull();
  });
});

describe("decodificaEntita", () => {
  it("decodifica entità nominate e numeriche (anche esadecimali)", () => {
    expect(decodificaEntita("pi&#xf9; buono &amp; pi&#xf9; veloce")).toBe("più buono & più veloce");
    expect(decodificaEntita("l&#x2019;uovo &quot;fresco&quot;")).toBe("l’uovo \"fresco\"");
    expect(decodificaEntita("caff&#232; con l&#39;amaro")).toBe("caffè con l'amaro");
  });
});

describe("estraiDidascaliaDaOgTitle", () => {
  // Formato reale osservato su un post Instagram pubblico (settembre 2026): og:title
  // porta "Autore on Instagram: "<didascalia completa>"" — spesso l'unico posto dove
  // oggi compare tutta la ricetta, più affidabile di og:description.
  it("estrae la didascalia dal formato 'Autore on Instagram: \"...\"'", () => {
    const ogTitle = 'Fabio Amato on Instagram: "Ingredienti 3/4 persone\n- 350 g di spaghetti\n- 300g di guanciale"';
    expect(estraiDidascaliaDaOgTitle(ogTitle)).toBe("Ingredienti 3/4 persone\n- 350 g di spaghetti\n- 300g di guanciale");
  });

  it("torna il testo intero se non riconosce il formato", () => {
    expect(estraiDidascaliaDaOgTitle("Un titolo qualsiasi")).toBe("Un titolo qualsiasi");
  });
});
