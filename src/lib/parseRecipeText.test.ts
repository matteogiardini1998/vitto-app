import { describe, expect, it } from "vitest";
import { parseRecipeText } from "./parseRecipeText";

/**
 * Fase R3b — Step 6: il parser testato su 15 testi reali e diversi. Le
 * fonti sono commentate caso per caso: la maggior parte è testo verbatim
 * raccolto da contenuti pubblici reali durante questa fase (didascalie
 * TikTok/Instagram vere, pagine web vere scaricate ed estratte con
 * `estraiTestoPrincipale`); un paio di casi (libro via "Testo Attivo",
 * ricetta su due colonne, ricetta in inglese) sono rappresentativi perché
 * non esiste una fonte web verificabile per quel formato — dichiarato caso
 * per caso, mai spacciato per verbatim quando non lo è.
 */

const CASI: { nome: string; testo: string; minIngredienti: number; minPassi: number }[] = [
  {
    // REALE — Instagram, Fabio Amato (post pubblico, settembre 2026), estratto da og:title.
    nome: "1. Instagram reale — carbonara con ricetta completa (IT)",
    testo: `Clicca qui per la ricetta
Spaghetti alla carbonara
Quanti di voi li amano?
Salva il video per non sbagliare più la ricetta

Ingredienti 3/4 persone
- 350 g di spaghetti
- 4 tuorli d'uovo / 1 uovo intero
- 80g di pecorino romano grattugiato
- 30g di parmigiano reggiano grattugiato
- Pepe nero macinato fresco q.b.
-300g di guanciale

Procedimento:

1. Tagliate il guanciale a listarelle o cubetti eliminate la cotenna e la parte superiore col pepe, lasciatelo sudare in un tegame a fuoco lento, finché nn sarà croccante fuori e morbido dentro, scolatelo e tenetelo da parte
2. Nel frattempo, prepara lo zabaione salato. In una ciotola, sbatti i tuorli d'uovo con il pecorino romano e il parmigiano reggiano grattugiati. Aggiungi una generosa macinata di pepe
3.Portate ad ebollizione una pentola d'acqua leggermente salata e cuoci la pasta
4. Ponete il recipiente con la salsa carbonara sulla pentola dove state lessando la pasta (bagnomaria) questa operazione non deve durare più di 30/40 secondi (lasciate stemperare) e ripetete l'operazione per almeno 2/3 volte
5. Scola la pasta molto al dente in padella insieme al grasso del guanciale aggiungendo del pepe
6. Quando pronta, lasciate stemperare qualche secondo e Aggiungete la pasta nel recipiente con lo zabaione salato e Mescolate il tutto molto velocemente
7. ponete nuovamente il contenitore con la carbonara sulla pentola dove stavate lessando la pasta e continuate fino ad ottenere la consistenza desiderata
8. Aggiungete il guanciale e mescolate
9. Assicurati che la salsa si scaldi a sufficienza grazie al calore residuo della pasta e degli ingredienti nella padella, ma evita di surriscaldarla per evitare che le uova si cuociano troppo.
10. Impiattate aggiungendo una generosa dose di formaggio e pepe

Buon appetito
#Italianfood #cucina #ricetta #pasta #cucinare #ricette #cucinaitaliana #carbonara #spaghetti #guanciale`,
    minIngredienti: 5,
    minPassi: 8,
  },
  {
    // REALE — Instagram, Chef Max Mariola (post pubblico), estratto da og:title: didascalia minima, solo hashtag.
    nome: "2. Instagram reale — didascalia minima, niente ricetta scritta (IT)",
    testo: `La carbonara.

#maxmariola
#chefmaxmariola
#cooking
#italianfood
#italianfoodlover
#cucinaromana
#carbonara
#roma
#maxmariolacucinapervoi`,
    minIngredienti: 0,
    minPassi: 0,
  },
  {
    // REALE — TikTok, @papafelicerecetas (video pubblico), estratto via oEmbed. In spagnolo: intestazioni
    // "Ingredientes"/"Para la Salsa" non italiane, buon test di quanto regge la sola forma delle righe.
    nome: "3. TikTok reale — ricetta completa ma in spagnolo, non italiano",
    testo: `🇮🇹 Pasta al Pomodoro. ¡De otro Nivel! ✅Ingredientes (versión Papá Felice) para 4 personas - 320 g Paccheri o Rigatoni - 20 g mantequilla - 1 manojo de albahaca - 40 g queso Parmigiano Reggiano - pimienta al gusto Para la salsa - 220 g tomate Cherry - 220 g tomate Uva - 450 g tomate Campari - 650 tomate Saladet - 1 tomate Bola - 2 dientes de ajo - aceite de oliva (según sea necesario) - sal al gusto #papáfelice #pastaalpomodoro #pastacontomate #pastaitaliana #recetasitalianas #comidaitaliana`,
    minIngredienti: 0,
    minPassi: 0,
  },
  {
    // REALE — TikTok, @mainardiandreaofficial (video pubblico), estratto via oEmbed: sotto la soglia utile,
    // è il caso "video parlato" che l'app intercetta ancora prima di arrivare qui.
    nome: "4. TikTok reale — didascalia troppo corta",
    testo: `Pasta, pomodori e mozzarella… Tutto pronto per l'estate😅🔥`,
    minIngredienti: 0,
    minPassi: 0,
  },
  {
    // REALE — TikTok, @alessio.pellizzoni (video pubblico), estratto via oEmbed: solo hashtag, nessun contenuto vero.
    nome: "5. TikTok reale — solo hashtag, nessuna ricetta",
    testo: `Spaghetti al pomodoro! 🍝🍅 #fy #fyp #LoVediSoloQua #food #tiktok #foodie #pasta`,
    minIngredienti: 0,
    minPassi: 0,
  },
  {
    // REALE — misya.info/ricetta/torta-tiramisu.htm, HTML scaricato ed estratto con `estraiTestoPrincipale`
    // (nessun JSON-LD in questo test: si simula il fallback). Impaginazione a blocchi "Per il pan di
    // Spagna" / "Per la bagna al caffè" / "Per la crema tiramisù", niente intestazione "Ingredienti" secca.
    nome: "6. Pagina web reale (fallback, non JSON-LD) — misya.info, blocchi 'Per...'",
    testo: `Torta tiramisu - Ricetta di Misya
Ricetta Torta tiramisu
Flavia Imperatore
del 12-09-2016
La torta tiramisù è stato il dolce che ha accompagnato i festeggiamenti per l'anniversario di matrimonio dei miei genitori della settimana scorsa.
Dosi per 1 stampo da 26 cm
Per il pan di Spagna
250 gr di uova ( circa 5)
175 gr di zucchero
150 gr di farina 00
50 gr di fecola
1 cucchiaino di essenza di vaniglia
Per la bagna al caffè
250 ml di caffè espresso
100 gr di zucchero
200 gr di savoiardi
cacao amaro
Per la crema tiramisù
175 gr di tuorli (circa 10)
essenza di vaniglia
340 gr di zucchero
100 ml di acqua
500 ml di panna fresca
500 gr di mascarpone
Preparazione: 1 ora
Cottura: 45 min
Procedimento
Come fare la torta tiramisù
Iniziate preparando il pan di spagna
Mettere le uova con lo zucchero e la vaniglia in una ciotola e montate a bagnomaria fino ad ottenere un composto gonfio e spumoso.
Aggiungere ora la farina setacciata insieme alla fecola di patate, incorporando il tutto delicatamente con una spatola.
Versate ora l'impasto nello stampo imburrato e infarinato e cuocete in forno già caldo a 180 gradi per circa 30 minuti.`,
    minIngredienti: 8,
    minPassi: 2,
  },
  {
    // REALE — cookaround.com/ricetta/Lasagne-alla-Bolognese.html, HTML scaricato ed estratto con
    // `estraiTestoPrincipale` (fallback, non JSON-LD). Caso peggiore scoperto durante il test: la tabella
    // ingredienti va su 3 righe separate per ogni voce (nome, poi quantità, poi unità), che il parser a
    // riga singola non può ricostruire — riportato onestamente come limite, non nascosto.
    nome: "7. Pagina web reale (fallback) — cookaround.com, tabella su 3 righe per ingrediente (CASO PEGGIORE)",
    testo: `Lasagne alla bolognese: la ricetta tradizionale fatta in casa
Le lasagne alla bolognese sono uno di quei piatti che profumano di famiglia.
Dosi & Ingredienti
Dosi per 8 persone
Difficoltà elevata
Preparazione 90 min
Cottura 160 min
Ingredienti per il ragù di carne
Macinato misto
400
gr
Pancetta fresca
100
gr
Salsa di pomodoro
300
gr
Cipolla
50
gr
Sale
q.b.
Ingredienti per la besciamella
Latte intero
1
l
Burro
80
gr
Farina 00
80
gr`,
    minIngredienti: 0, // vedi commento: caso peggiore, atteso un risultato povero
    minPassi: 0,
  },
  {
    // RICOSTRUITO (dichiarato) — cucchiaio.it blocca lo scraping (403 confermato dal vivo durante questa
    // fase): testo rappresentativo di quello che un utente incollerebbe a mano dopo il blocco, basato sui
    // fatti reali della ricetta pubblicata (ragù, besciamella, 5-6 strati, forno 180°C 45 min) verificati
    // via ricerca, non uno scraping diretto della pagina.
    nome: "8. Testo incollato a mano dopo un 403 (ricostruito da fatti reali, non scraping)",
    testo: `Lasagne alla bolognese

Ingredienti per 8 persone
500 g di sfoglia di pasta all'uovo
1 kg di ragù di carne
1 l di besciamella
150 g di parmigiano grattugiato

Procedimento
1. Stendete un primo strato di sfoglia sul fondo della teglia, coprite con besciamella e ragù, spolverate di parmigiano.
2. Coprite con un altro strato di sfoglia e ripetete fino a esaurimento degli ingredienti, per un totale di 5-6 strati.
3. Terminate con uno strato di sfoglia in superficie e infornate a 180°C per circa 45 minuti, finché non sono ben gonfie e dorate.`,
    minIngredienti: 3,
    minPassi: 3,
  },
  {
    // RAPPRESENTATIVO — testo tipico di quello che l'OCR "Testo Attivo" (iOS) restituisce da una foto di
    // un ricettario cartaceo: nessuna fonte online verificabile per un libro fisico.
    nome: "9. Testo da libro via Testo Attivo (rappresentativo)",
    testo: `Risotto alla milanese
Un classico della cucina lombarda, cremoso e dal colore dorato.
per 4 persone
320 g riso Carnaroli
1 bustina di zafferano
1 l brodo di carne
80 g burro
50 g grana grattugiato
1/2 cipolla
1 bicchiere di vino bianco
Preparazione
Tritare la cipolla e farla appassire nel burro.
Aggiungere il riso e tostarlo per due minuti, poi sfumare con il vino bianco.
Aggiungere il brodo caldo un mestolo alla volta, mescolando spesso, per circa 18 minuti.
A fine cottura aggiungere lo zafferano sciolto in poco brodo, il burro rimasto e il grana. Mantecare bene e servire subito.`,
    minIngredienti: 5,
    minPassi: 3,
  },
  {
    // RAPPRESENTATIVO — messaggio "alla buona" con emoji come separatori, comune su chat/social.
    nome: "10. Testo con emoji come separatori (rappresentativo)",
    testo: `🍝 Pasta e ceci della nonna

🥘 Ingredienti
🫘 400 g ceci lessati
🍅 300 g passata di pomodoro
🧄 2 spicchi d'aglio
🌿 un rametto di rosmarino
🧂 sale e pepe q.b.
🍝 150 g pasta corta

👩‍🍳 Procedimento
1️⃣ Soffriggere l'aglio e il rosmarino in olio d'oliva.
2️⃣ Aggiungere i ceci e la passata, cuocere 15 minuti.
3️⃣ Cuocere la pasta direttamente nel sugo di ceci allungato con acqua, mescolando spesso.`,
    minIngredienti: 4,
    minPassi: 3,
  },
  {
    // REALE, derivato — stesso contenuto ingredienti/passi del caso 1 (Instagram Fabio Amato, reale),
    // ma con le intestazioni "Ingredienti"/"Procedimento" rimosse a mano: verifica che il fallback per
    // FORMA della riga (senza intestazioni esplicite) funzioni anche su un testo autentico.
    nome: "11. Stesso contenuto del caso 1, senza intestazioni esplicite",
    testo: `Spaghetti alla carbonara

- 350 g di spaghetti
- 4 tuorli d'uovo
- 80g di pecorino romano grattugiato
- 30g di parmigiano reggiano grattugiato
- Pepe nero macinato fresco q.b.
- 300g di guanciale

Tagliate il guanciale a listarelle o cubetti eliminate la cotenna, lasciatelo sudare in un tegame a fuoco lento finché sarà croccante fuori e morbido dentro, scolatelo e tenetelo da parte.

In una ciotola, sbatti i tuorli d'uovo con il pecorino romano e il parmigiano reggiano grattugiati, aggiungi una generosa macinata di pepe.

Cuoci la pasta in acqua bollente salata, scolala molto al dente e saltala in padella con il grasso del guanciale, poi mantecala fuori dal fuoco con lo zabaione salato.`,
    minIngredienti: 4,
    minPassi: 2,
  },
  {
    // RAPPRESENTATIVO — simula un artefatto reale e noto dell'OCR/copia-incolla su un layout a due
    // colonne (es. libro di ricette impaginato con foto a sinistra e testo a destra, o due ricette
    // affiancate): le righe risultano intrecciate fra le due colonne. Caso peggiore atteso.
    nome: "12. Ricetta impaginata su due colonne, testo intrecciato dalla copia (rappresentativo, CASO PEGGIORE)",
    testo: `Involtini di melanzane    Parmigiana veloce
2 melanzane grandi    3 melanzane
200 g ricotta    passata di pomodoro
100 g provola    mozzarella
Grigliare le melanzane    Friggere le melanzane
a fette sottili.    a fette.
Farcire con ricotta    Alternare con
e provola, arrotolare.    pomodoro e mozzarella.
Infornare 15 minuti    Infornare 20 minuti
a 200°C.    a 190°C.`,
    minIngredienti: 0,
    minPassi: 0,
  },
  {
    // RAPPRESENTATIVO (non verbatim: le fonti inglesi disponibili bloccano lo scraping automatico, come
    // documentato nel report) — struttura tipica di una ricetta anglosassone con "Ingredients"/"Method"
    // numerato.
    nome: "13. Ricetta in inglese (rappresentativa)",
    testo: `Spaghetti Carbonara

A quick and creamy Roman classic, ready in 25 minutes.

Ingredients
200g spaghetti
100g pancetta, diced
2 large eggs
50g Parmesan, grated
2 cloves garlic
Black pepper
Salt

Method
1. Bring a large pot of salted water to the boil and cook the spaghetti until al dente.
2. Meanwhile, fry the pancetta in a pan over medium heat until golden and crispy.
3. Whisk the eggs with the grated Parmesan and a generous amount of black pepper.
4. Drain the pasta, reserving a cup of the cooking water, then toss it with the pancetta off the heat.
5. Pour in the egg mixture, tossing quickly to create a creamy sauce, adding pasta water as needed.
6. Serve immediately with extra Parmesan and black pepper.`,
    minIngredienti: 5,
    minPassi: 5,
  },
  {
    // COSTRUITO — pensato apposta per esercitare il vocabolario nuovo dello Step 3 (mezzo, bicchiere,
    // mazzetto, frazioni) sulle stesse righe di ingrediente già testate a parte in parseIngredienteLibero.test.ts.
    nome: "14. Vocabolario nuovo: mezzo, bicchiere, mazzetto (costruito)",
    testo: `Minestrone della nonna

Ingredienti
mezza cipolla
1 bicchiere di passata di pomodoro
un mazzetto di prezzemolo
1/2 cavolo verza
2 patate

Procedimento
Tagliare tutte le verdure a pezzetti.
Cuocere in abbondante acqua salata per 40 minuti, aggiungendo il prezzemolo tritato a fine cottura.`,
    minIngredienti: 4,
    minPassi: 2,
  },
  {
    // RAPPRESENTATIVO — ricetta "inoltrata" stile messaggio, informale, senza alcuna struttura riconoscibile
    // a parte l'elenco puntato: comune nei gruppi di famiglia.
    nome: "15. Ricetta inoltrata stile messaggio, informale (rappresentativo)",
    testo: `Ciao! ecco la ricetta della torta di mele che mi hai chiesto 😊

ci vogliono:
* 3 mele
* 200 gr farina
* 150 gr zucchero
* 2 uova
* 1 bustina di lievito
* mezzo bicchiere di latte
* mezzo bicchiere di olio di semi

Si mescolano tutti gli ingredienti secchi, poi si aggiungono le uova, il latte e l'olio.
Si versa il composto in uno stampo imburrato insieme alle mele tagliate a fettine.
Si cuoce in forno statico a 180 gradi per 40 minuti circa.

fammi sapere come viene!! 💕`,
    minIngredienti: 5,
    minPassi: 3,
  },
];

describe("parseRecipeText — Fase R3b Step 6 (15 testi reali e diversi)", () => {
  const risultati: { nome: string; ingredienti: number; passi: number; nomeTrovato: string; confidenzaIngredienti: number; confidenzaPassi: number }[] = [];

  for (const caso of CASI) {
    it(caso.nome, () => {
      const bozza = parseRecipeText(caso.testo);
      risultati.push({
        nome: caso.nome,
        ingredienti: bozza.ingredienti.length,
        passi: bozza.passi.length,
        nomeTrovato: bozza.nome,
        confidenzaIngredienti: bozza.confidenza.ingredienti,
        confidenzaPassi: bozza.confidenza.passi,
      });
      expect(bozza.ingredienti.length).toBeGreaterThanOrEqual(caso.minIngredienti);
      expect(bozza.passi.length).toBeGreaterThanOrEqual(caso.minPassi);
      // Non deve mai lanciare, e il nome non è mai vuoto (fallback "Ricetta importata").
      expect(bozza.nome.length).toBeGreaterThan(0);
    });
  }

  it("stampa il tasso di successo complessivo (per il report Consegna)", () => {
    const conIngredienti = risultati.filter((r) => r.ingredienti >= 3).length;
    const conPassi = risultati.filter((r) => r.passi >= 1).length;
    console.log("\n=== Riepilogo parseRecipeText su", risultati.length, "testi ===");
    for (const r of risultati) {
      console.log(`${r.nome}\n  -> ${r.ingredienti} ingredienti (conf. ${r.confidenzaIngredienti}), ${r.passi} passi (conf. ${r.confidenzaPassi}), titolo: "${r.nomeTrovato}"`);
    }
    console.log(`\n${conIngredienti}/${risultati.length} casi con >=3 ingredienti trovati`);
    console.log(`${conPassi}/${risultati.length} casi con almeno 1 passaggio trovato`);
    expect(risultati.length).toBe(CASI.length);
  });
});
