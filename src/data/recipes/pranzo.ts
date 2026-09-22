import type { Recipe } from "../recipeSchema.ts";

/** Ricette esistenti (pre-R1) riclassificate sul nuovo schema. */
export const RICETTE_PRANZO: Recipe[] = [
  {
    "id": "r07",
    "titolo": "Frittata di zucchine e patate",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 20,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "uova",
        "quantitaG": 300
      },
      {
        "ingredientId": "zucchina",
        "quantitaG": 300
      },
      {
        "ingredientId": "patata",
        "quantitaG": 300
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 40
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Taglia le patate e le zucchine a rondelle sottili e cuocile in padella con un filo d'olio finché sono morbide.",
      "Sbatti le uova con il parmigiano, sale e pepe.",
      "Versa le uova sulle verdure e cuoci a fuoco basso con coperchio per 10 minuti.",
      "Gira la frittata con l'aiuto di un piatto e cuoci ancora 5 minuti dall'altro lato."
    ],
    "fonte": "seed",
    "descrizione": "Un classico versatile, buono caldo o freddo per il giorno dopo.",
    "costoStimatoPorzione": 2.1
  },
  {
    "id": "r09",
    "titolo": "Spaghetti aglio, olio e peperoncino",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 10,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "spaghetti",
        "quantitaG": 200
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 10
      },
      {
        "ingredientId": "peperoncino_fresco",
        "quantitaG": 10
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 40
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 5
      }
    ],
    "passaggi": [
      "Cuoci gli spaghetti in abbondante acqua salata.",
      "Scalda l'olio in una padella con l'aglio in camicia e il peperoncino a rondelle.",
      "Scola la pasta al dente conservando un po' di acqua di cottura.",
      "Salta la pasta nella padella con l'olio aromatizzato, allungando con l'acqua di cottura se serve.",
      "Completa con prezzemolo tritato."
    ],
    "fonte": "seed",
    "descrizione": "Il piatto di mezzanotte per eccellenza, pronto in un quarto d'ora.",
    "costoStimatoPorzione": 1.3
  },
  {
    "id": "r10",
    "titolo": "Pasta al pomodoro fresco e basilico",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 320
      },
      {
        "ingredientId": "pomodoro",
        "quantitaG": 600
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "basilico",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      }
    ],
    "passaggi": [
      "Scotta i pomodori in acqua bollente per un minuto, poi spellali e tagliali a cubetti.",
      "Soffriggi l'aglio nell'olio, aggiungi i pomodori e cuoci 10 minuti a fuoco medio.",
      "Cuoci la pasta al dente e scolala nel sugo.",
      "Manteca un minuto a fuoco vivo e completa con basilico spezzettato a mano."
    ],
    "fonte": "seed",
    "descrizione": "Semplicità pura: pomodoro maturo, basilico e un buon olio.",
    "costoStimatoPorzione": 1.8
  },
  {
    "id": "r11",
    "titolo": "Orecchiette con cime di rapa",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 20,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "orecchiette",
        "quantitaG": 320
      },
      {
        "ingredientId": "cime_di_rapa",
        "quantitaG": 500
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 10
      },
      {
        "ingredientId": "acciughe_sotto_sale",
        "quantitaG": 16
      },
      {
        "ingredientId": "peperoncino_essiccato",
        "quantitaG": 1
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      }
    ],
    "passaggi": [
      "Pulisci le cime di rapa tenendo solo le foglie tenere e le cimette.",
      "Cuoci le orecchiette in acqua salata, aggiungendo le cime di rapa a metà cottura.",
      "In una padella larga sciogli le acciughe nell'olio con aglio e peperoncino.",
      "Scola pasta e verdure e saltale nella padella per due minuti."
    ],
    "fonte": "seed",
    "descrizione": "Un grande classico pugliese, amaro e sapido al punto giusto.",
    "costoStimatoPorzione": 2.4
  },
  {
    "id": "r14",
    "titolo": "Petto di pollo alla griglia con verdure",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 2,
    "congelabile": true,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "petto_pollo",
        "quantitaG": 300
      },
      {
        "ingredientId": "zucchina",
        "quantitaG": 300
      },
      {
        "ingredientId": "peperone",
        "quantitaG": 150
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "limone",
        "quantitaG": 90,
        "opzionale": true
      }
    ],
    "passaggi": [
      "Marina il pollo con olio, succo di limone, sale e pepe per 10 minuti.",
      "Taglia le verdure a listarelle.",
      "Griglia il pollo 5-6 minuti per lato finché è ben cotto.",
      "Griglia le verdure nella stessa piastra fino a leggera doratura.",
      "Servi insieme con un filo d'olio a crudo."
    ],
    "fonte": "seed",
    "descrizione": "Proteico, leggero e pronto in mezz'ora: il piatto post-allenamento.",
    "costoStimatoPorzione": 3.2
  },
  {
    "id": "r16",
    "titolo": "Minestrone di verdure di stagione",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "zuppa",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 35,
    "difficolta": 1,
    "porzioni": 6,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "carota",
        "quantitaG": 160
      },
      {
        "ingredientId": "patata",
        "quantitaG": 300
      },
      {
        "ingredientId": "zucchina",
        "quantitaG": 150
      },
      {
        "ingredientId": "fagioli_borlotti_lessati",
        "quantitaG": 200
      },
      {
        "ingredientId": "sedano",
        "quantitaG": 40
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 400
      },
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 100
      }
    ],
    "passaggi": [
      "Taglia tutte le verdure a cubetti regolari.",
      "Soffriggi sedano e carota per qualche minuto, poi aggiungi le altre verdure.",
      "Copri con acqua, aggiungi i pomodori pelati e i fagioli e cuoci a fuoco lento per 30 minuti.",
      "Aggiungi la pasta e cuoci ancora per il tempo indicato sulla confezione."
    ],
    "fonte": "seed",
    "descrizione": "Un piatto unico confortante, perfetto da preparare in anticipo.",
    "costoStimatoPorzione": 1.7
  },
  {
    "id": "r17",
    "titolo": "Insalata di farro con verdure e feta",
    "slotAmmessi": [
      "pranzo"
    ],
    "portata": "insalatona",
    "pesantezza": "media",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 10,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "farro_perlato",
        "quantitaG": 250
      },
      {
        "ingredientId": "feta",
        "quantitaG": 150
      },
      {
        "ingredientId": "pomodorino",
        "quantitaG": 200
      },
      {
        "ingredientId": "cetriolo",
        "quantitaG": 200
      },
      {
        "ingredientId": "olive_nere",
        "quantitaG": 60
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Cuoci il farro in acqua salata seguendo i tempi di cottura indicati, poi scolalo e lascialo raffreddare.",
      "Taglia pomodorini e cetriolo a cubetti.",
      "Unisci il farro alle verdure, alle olive e alla feta sbriciolata.",
      "Condisci con olio, sale e pepe e mescola bene."
    ],
    "fonte": "seed",
    "descrizione": "Fresca e sazia, perfetta da portare fuori casa.",
    "costoStimatoPorzione": 2.8
  },
  {
    "id": "r18",
    "titolo": "Hamburger di ceci con salsa yogurt",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 15,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "ceci_lessati",
        "quantitaG": 400
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 40
      },
      {
        "ingredientId": "cumino",
        "quantitaG": 5
      },
      {
        "ingredientId": "yogurt_greco",
        "quantitaG": 100
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "panini_integrali",
        "quantitaG": 280
      }
    ],
    "passaggi": [
      "Schiaccia i ceci con una forchetta o un mixer fino a ottenere un composto grossolano.",
      "Aggiungi pane grattugiato, cumino, sale e pepe e forma quattro hamburger.",
      "Cuoci in padella con un filo d'olio per 4 minuti per lato, finché sono dorati.",
      "Prepara la salsa mescolando yogurt, aglio tritato e un pizzico di sale.",
      "Componi gli hamburger nei panini con la salsa allo yogurt."
    ],
    "fonte": "seed",
    "descrizione": "Croccante fuori, morbido dentro: il burger vegetariano che convince.",
    "costoStimatoPorzione": 2.3
  },
  {
    "id": "r22",
    "titolo": "Poke bowl di salmone e avocado",
    "slotAmmessi": [
      "pranzo"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 25,
    "tempoCotturaMin": 0,
    "difficolta": 2,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "salmone_fresco",
        "quantitaG": 350
      },
      {
        "ingredientId": "riso_per_sushi",
        "quantitaG": 150
      },
      {
        "ingredientId": "avocado",
        "quantitaG": 200
      },
      {
        "ingredientId": "edamame",
        "quantitaG": 80
      },
      {
        "ingredientId": "salsa_soia",
        "quantitaG": 20
      },
      {
        "ingredientId": "sesamo",
        "quantitaG": 5
      }
    ],
    "passaggi": [
      "Cuoci il riso per sushi e condiscilo con un cucchiaio di salsa di soia.",
      "Taglia il salmone a cubetti e marinalo con un filo di salsa di soia.",
      "Cuoci gli edamame in acqua bollente per 5 minuti.",
      "Componi la bowl con riso, salmone, avocado a fette ed edamame.",
      "Completa con semi di sesamo."
    ],
    "fonte": "seed",
    "descrizione": "Fresca, colorata e bilanciata, ispirata alle isole hawaiane.",
    "costoStimatoPorzione": 5.8
  },
  {
    "id": "r23",
    "titolo": "Couscous con verdure grigliate",
    "slotAmmessi": [
      "pranzo"
    ],
    "portata": "piatto_unico",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 10,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "couscous",
        "quantitaG": 250
      },
      {
        "ingredientId": "zucchina",
        "quantitaG": 150
      },
      {
        "ingredientId": "peperone",
        "quantitaG": 150
      },
      {
        "ingredientId": "melanzana",
        "quantitaG": 250
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 300
      },
      {
        "ingredientId": "cumino",
        "quantitaG": 5
      }
    ],
    "passaggi": [
      "Taglia le verdure a listarelle e grigliale su una piastra fino a doratura.",
      "Versa il couscous in una ciotola, copri con brodo vegetale bollente e lascia riposare 5 minuti coperto.",
      "Sgrana il couscous con una forchetta e condiscilo con cumino e un filo d'olio.",
      "Unisci le verdure grigliate e mescola bene."
    ],
    "fonte": "seed",
    "descrizione": "Leggero e speziato, perfetto anche freddo il giorno dopo.",
    "costoStimatoPorzione": 2.1
  },
  {
    "id": "r27",
    "titolo": "Insalata caprese con pane croccante",
    "slotAmmessi": [
      "pranzo"
    ],
    "portata": "insalatona",
    "pesantezza": "leggera",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "mozzarella_bufala",
        "quantitaG": 250
      },
      {
        "ingredientId": "pomodoro",
        "quantitaG": 360
      },
      {
        "ingredientId": "basilico",
        "quantitaG": 3
      },
      {
        "ingredientId": "pane_casereccio",
        "quantitaG": 120
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Taglia la mozzarella e i pomodori a fette spesse.",
      "Alterna le fette su un piatto e completa con foglie di basilico fresco.",
      "Condisci con olio, sale e pepe.",
      "Tosta il pane casereccio e servilo a parte per accompagnare."
    ],
    "fonte": "seed",
    "descrizione": "Tre ingredienti, il sapore dell'estate italiana.",
    "costoStimatoPorzione": 3.1
  },
  {
    "id": "r28",
    "titolo": "Pasta e ceci",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "zuppa",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 20,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": false,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 200
      },
      {
        "ingredientId": "ceci_lessati",
        "quantitaG": 400
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 200
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Soffriggi l'aglio con il rosmarino in un filo d'olio.",
      "Aggiungi i ceci e la passata di pomodoro e cuoci 10 minuti.",
      "Frulla metà dei ceci per addensare il sugo, poi unisci la pasta cotta direttamente nel tegame con un po' di acqua di cottura.",
      "Manteca un paio di minuti prima di servire."
    ],
    "fonte": "seed",
    "descrizione": "Un piatto unico rustico e nutriente, tipico della cucina povera.",
    "costoStimatoPorzione": 1.6
  },
  {
    "id": "r30",
    "titolo": "Bowl mediterraneo di quinoa",
    "slotAmmessi": [
      "pranzo"
    ],
    "portata": "insalatona",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 5,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "quinoa",
        "quantitaG": 150
      },
      {
        "ingredientId": "ceci_lessati",
        "quantitaG": 150
      },
      {
        "ingredientId": "cetriolo",
        "quantitaG": 200
      },
      {
        "ingredientId": "pomodorino",
        "quantitaG": 100
      },
      {
        "ingredientId": "olive_taggiasche",
        "quantitaG": 40
      },
      {
        "ingredientId": "limone",
        "quantitaG": 90,
        "opzionale": true
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Sciacqua la quinoa e cuocila in acqua salata per 12-15 minuti, poi scolala e lasciala raffreddare.",
      "Taglia cetriolo e pomodorini a cubetti.",
      "Unisci la quinoa alle verdure, ai ceci e alle olive.",
      "Condisci con olio, succo di limone, sale e pepe."
    ],
    "fonte": "seed",
    "descrizione": "Colori e sapori del Mediterraneo in un'unica ciotola.",
    "costoStimatoPorzione": 3
  },
  {
    "id": "r39",
    "titolo": "Pasta al tonno e pomodorini",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 320
      },
      {
        "ingredientId": "tonno_in_scatola",
        "quantitaG": 160
      },
      {
        "ingredientId": "pomodorino",
        "quantitaG": 300
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 5
      }
    ],
    "passaggi": [
      "Fai saltare l'aglio nell'olio, poi aggiungi i pomodorini tagliati a metà e cuoci finché si ammorbidiscono.",
      "Unisci il tonno sgocciolato e scaldalo brevemente nel sugo.",
      "Scola la pasta al dente e falla saltare nel condimento.",
      "Completa con prezzemolo fresco tritato."
    ],
    "fonte": "seed",
    "descrizione": "Il piatto salvacena che non manca mai in dispensa.",
    "costoStimatoPorzione": 2.5
  },
  {
    "id": "r40",
    "titolo": "Insalata di mare",
    "slotAmmessi": [
      "pranzo"
    ],
    "portata": "insalatona",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 10,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "calamari",
        "quantitaG": 300
      },
      {
        "ingredientId": "gamberi",
        "quantitaG": 300
      },
      {
        "ingredientId": "polpo",
        "quantitaG": 300
      },
      {
        "ingredientId": "limone",
        "quantitaG": 90
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sedano",
        "quantitaG": 40
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 5
      }
    ],
    "passaggi": [
      "Cuoci separatamente calamari, gamberi e polpo in acqua bollente, finché sono teneri.",
      "Lasciali intiepidire, poi tagliali a pezzi non troppo piccoli.",
      "Unisci il sedano affettato sottile e condisci con olio, succo di limone e prezzemolo.",
      "Lascia riposare in frigo mezz'ora prima di servire."
    ],
    "fonte": "seed",
    "descrizione": "Fresca, colorata, da fare il giorno prima: da fredda è ancora più buona.",
    "costoStimatoPorzione": 6
  },
  {
    "id": "r43",
    "titolo": "Farinata di ceci",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "farina_ceci",
        "quantitaG": 250
      },
      {
        "ingredientId": "acqua",
        "quantitaG": 750
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 40
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 3
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Stempera la farina di ceci nell'acqua con una frusta, evitando grumi, e lascia riposare l'impasto per almeno un'ora.",
      "Elimina la schiuma in superficie, aggiungi metà dell'olio e un pizzico di sale.",
      "Versa in una teglia unta e cuoci in forno molto caldo finché la superficie è dorata e screpolata.",
      "Completa con un filo d'olio e rosmarino appena sfornata."
    ],
    "fonte": "seed",
    "descrizione": "Semplicissima e antica, con la crosticina dorata che fa la differenza.",
    "costoStimatoPorzione": 1.3
  },
  {
    "id": "r44",
    "titolo": "Falafel al forno con insalata",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 15,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "ceci_lessati",
        "quantitaG": 400
      },
      {
        "ingredientId": "farina_ceci",
        "quantitaG": 30
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "cumino",
        "quantitaG": 2
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 5
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "insalata_lattuga",
        "quantitaG": 100
      }
    ],
    "passaggi": [
      "Frulla i ceci con aglio, cumino e prezzemolo fino a ottenere un composto denso e lavorabile.",
      "Se serve, aggiungi un po' di farina di ceci per compattare, poi forma delle polpette schiacciate.",
      "Disponile su una teglia, spennellale d'olio e cuoci in forno caldo finché sono dorate e croccanti fuori.",
      "Servi i falafel su un letto di lattuga fresca."
    ],
    "fonte": "seed",
    "descrizione": "Croccanti fuori, morbidi dentro, senza il pensiero della friggitrice.",
    "costoStimatoPorzione": 2.2
  },
  {
    "id": "r45",
    "titolo": "Insalata di lenticchie e verdure",
    "slotAmmessi": [
      "pranzo"
    ],
    "portata": "insalatona",
    "pesantezza": "leggera",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "lenticchie_lessate",
        "quantitaG": 300
      },
      {
        "ingredientId": "carota",
        "quantitaG": 80
      },
      {
        "ingredientId": "sedano",
        "quantitaG": 40
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "limone",
        "quantitaG": 90
      }
    ],
    "passaggi": [
      "Taglia carota e sedano a cubetti piccoli, e la cipolla a fettine sottili.",
      "Unisci le verdure alle lenticchie in una ciotola capiente.",
      "Condisci con olio, succo di limone, sale e pepe e lascia insaporire qualche minuto prima di servire."
    ],
    "fonte": "seed",
    "descrizione": "Sazia, colorata e pronta in pochi minuti se hai le lenticchie già lessate.",
    "costoStimatoPorzione": 1.9
  },
  {
    "id": "r47",
    "titolo": "Peperonata",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "contorno",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 20,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "peperone",
        "quantitaG": 600
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 200
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      }
    ],
    "passaggi": [
      "Taglia i peperoni a listarelle e la cipolla a fettine sottili.",
      "Fai appassire la cipolla nell'olio, poi aggiungi i peperoni e cuoci a fuoco medio per 10 minuti.",
      "Unisci i pelati spezzettati e lascia cuocere ancora 15 minuti, finché i peperoni sono morbidi e saporiti."
    ],
    "fonte": "seed",
    "descrizione": "Dolce e morbida, buona calda, tiepida o il giorno dopo.",
    "costoStimatoPorzione": 1.6
  },
  {
    "id": "r48",
    "titolo": "Caponata di melanzane",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "contorno",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 25,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": true,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "melanzana",
        "quantitaG": 500
      },
      {
        "ingredientId": "sedano",
        "quantitaG": 40
      },
      {
        "ingredientId": "olive_verdi",
        "quantitaG": 60
      },
      {
        "ingredientId": "capperi",
        "quantitaG": 20
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 150
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "zucchero",
        "quantitaG": 10
      },
      {
        "ingredientId": "aceto",
        "quantitaG": 10
      }
    ],
    "passaggi": [
      "Taglia le melanzane a cubotti e falle dorare in padella con un po' d'olio, poi tienile da parte.",
      "Nella stessa padella fai stufare il sedano a tocchetti.",
      "Aggiungi la passata, le olive, i capperi, lo zucchero e un goccio d'aceto, e lascia insaporire qualche minuto.",
      "Rimetti le melanzane nel sugo, mescola bene e lascia raffreddare: è ancora più buona il giorno dopo."
    ],
    "fonte": "seed",
    "descrizione": "Agrodolce e siciliana, ancora più buona il giorno dopo.",
    "costoStimatoPorzione": 2.2
  },
  {
    "id": "r49",
    "titolo": "Insalata di finocchi e arance",
    "slotAmmessi": [
      "pranzo"
    ],
    "portata": "insalatona",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "finocchio",
        "quantitaG": 300
      },
      {
        "ingredientId": "arancia",
        "quantitaG": 400
      },
      {
        "ingredientId": "olive_nere",
        "quantitaG": 30
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      }
    ],
    "passaggi": [
      "Affetta il finocchio molto sottile, meglio se con una mandolina.",
      "Pela le arance a vivo e tagliale a fette.",
      "Componi il piatto alternando finocchio e arancia, completa con le olive e un filo d'olio."
    ],
    "fonte": "seed",
    "descrizione": "Fresca e croccante, il contrasto che accende il palato in inverno.",
    "costoStimatoPorzione": 1.5
  },
  {
    "id": "r52",
    "titolo": "Zucchine trifolate con uova",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "leggera",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 10,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "zucchina",
        "quantitaG": 400
      },
      {
        "ingredientId": "uova",
        "quantitaG": 150
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "basilico",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Taglia le zucchine a rondelle sottili e falle saltare in padella con aglio e olio finché sono dorate.",
      "Sbatti le uova con un pizzico di sale.",
      "Versale sulle zucchine e mescola delicatamente finché si rapprendono, restando morbide.",
      "Completa con basilico fresco spezzettato."
    ],
    "fonte": "seed",
    "descrizione": "Un piatto unico veloce, morbido e confortante, pronto in venti minuti.",
    "costoStimatoPorzione": 1.8
  },
  {
    "id": "r53",
    "titolo": "Pasta alla norma",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 20,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 320
      },
      {
        "ingredientId": "melanzana",
        "quantitaG": 400
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 300
      },
      {
        "ingredientId": "ricotta_salata",
        "quantitaG": 60
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "basilico",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Taglia le melanzane a cubetti e falle dorare in padella con un filo d'olio abbondante.",
      "In un'altra pentola cuoci la passata con un filo d'olio e basilico per 15 minuti.",
      "Unisci le melanzane al sugo di pomodoro.",
      "Scola la pasta al dente, condiscila col sugo e completa con abbondante ricotta salata grattugiata."
    ],
    "fonte": "seed",
    "descrizione": "Melanzane, pomodoro e ricotta salata: la Sicilia in un piatto di pasta.",
    "costoStimatoPorzione": 2.4
  },
  {
    "id": "r56",
    "titolo": "Farro con tonno e verdure",
    "slotAmmessi": [
      "pranzo"
    ],
    "portata": "insalatona",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 5,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "farro_perlato",
        "quantitaG": 250
      },
      {
        "ingredientId": "tonno_in_scatola",
        "quantitaG": 160
      },
      {
        "ingredientId": "pomodorino",
        "quantitaG": 200
      },
      {
        "ingredientId": "olive_nere",
        "quantitaG": 40
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Cuoci il farro in abbondante acqua salata, poi scolalo e lascialo raffreddare.",
      "Taglia i pomodorini a metà e unisci il tonno sgocciolato e le olive.",
      "Mescola tutto con il farro, condisci con olio e servi anche freddo."
    ],
    "fonte": "seed",
    "descrizione": "Un piatto unico da preparare la sera prima e portare ovunque.",
    "costoStimatoPorzione": 2.6
  },
  {
    "id": "r60",
    "titolo": "Bresaola con rucola e grana",
    "slotAmmessi": [
      "pranzo"
    ],
    "portata": "secondo",
    "pesantezza": "leggera",
    "proteinaPrincipale": "carne_rossa",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "bresaola",
        "quantitaG": 150
      },
      {
        "ingredientId": "rucola",
        "quantitaG": 50
      },
      {
        "ingredientId": "grana",
        "quantitaG": 30
      },
      {
        "ingredientId": "limone",
        "quantitaG": 90,
        "opzionale": true
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "pane_casereccio",
        "quantitaG": 80
      }
    ],
    "passaggi": [
      "Disponi le fette di bresaola su un piatto da portata.",
      "Completa con la rucola e le scaglie di grana.",
      "Condisci con un filo d'olio e qualche goccia di limone appena prima di servire."
    ],
    "fonte": "seed",
    "descrizione": "Un secondo pronto in cinque minuti, elegante senza sforzo.",
    "costoStimatoPorzione": 3.8
  },
{
  id: "r069",
  titolo: "Insalata di riso venere con gamberi e zucchine",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 15,
  tempoCotturaMin: 20,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "riso_venere",
      quantitaG: 160
    },
    {
      ingredientId: "gamberi",
      quantitaG: 200
    },
    {
      ingredientId: "zucchina",
      quantitaG: 150
    },
    {
      ingredientId: "limone",
      quantitaG: 30,
      opzionale: true
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "prezzemolo",
      quantitaG: 5
    }
  ],
  passaggi: [
    "Cuoci il riso venere in acqua salata seguendo i tempi in confezione, poi scolalo e lascialo intiepidire.",
    "Taglia le zucchine a dadini piccoli e saltale in padella con un filo d'olio finché sono dorate.",
    "Nella stessa padella, scotta i gamberi un paio di minuti per lato.",
    "Unisci riso, zucchine e gamberi, condisci con olio, succo di limone e prezzemolo tritato.",
    "Lascia raffreddare completamente prima di chiudere in un contenitore per il pranzo."
  ],
  fonte: "seed",
  descrizione: "Un'insalata di riso completa, si porta in ufficio e si mangia fredda.",
  costoStimatoPorzione: 3.6
},
{
  id: "r070",
  titolo: "Insalatona di ceci, tonno e pomodorini",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 10,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "ceci_lessati",
      quantitaG: 240
    },
    {
      ingredientId: "tonno_in_scatola",
      quantitaG: 160
    },
    {
      ingredientId: "pomodorino",
      quantitaG: 150
    },
    {
      ingredientId: "cipolla",
      quantitaG: 40
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    },
    {
      ingredientId: "origano",
      quantitaG: 1
    }
  ],
  passaggi: [
    "Sciacqua e scola i ceci lessati, versali in una ciotola capiente.",
    "Aggiungi il tonno sgocciolato, i pomodorini tagliati a metà e la cipolla affettata sottile.",
    "Condisci con olio, sale e origano, mescola bene.",
    "Si conserva in frigorifero e si mangia fredda: nessuna cottura dell'ultimo minuto."
  ],
  fonte: "seed",
  descrizione: "Pranzo pronto in dieci minuti, tutto da dispensa, perfetto da portare via.",
  costoStimatoPorzione: 2.8
},
{
  id: "r071",
  titolo: "Poke bowl vegetale con edamame e avocado",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 20,
  tempoCotturaMin: 15,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "riso_per_sushi",
      quantitaG: 160
    },
    {
      ingredientId: "edamame_surgelati",
      quantitaG: 150
    },
    {
      ingredientId: "avocado",
      quantitaG: 200
    },
    {
      ingredientId: "carota",
      quantitaG: 80
    },
    {
      ingredientId: "salsa_soia",
      quantitaG: 20
    },
    {
      ingredientId: "sesamo",
      quantitaG: 10
    }
  ],
  passaggi: [
    "Cuoci il riso per sushi e condiscilo con un cucchiaio di salsa di soia mentre è ancora tiepido.",
    "Sbollenta gli edamame surgelati per 5 minuti in acqua salata.",
    "Taglia l'avocado a fette e la carota a julienne sottile.",
    "Componi la bowl con il riso come base e gli altri ingredienti disposti sopra.",
    "Completa con un filo di salsa di soia e i semi di sesamo. Si mangia subito, appena composta."
  ],
  fonte: "seed",
  descrizione: "Una bowl fresca e colorata, tutta vegetale, da comporre al momento.",
  costoStimatoPorzione: 3
},
{
  id: "r072",
  titolo: "Wrap di piadina con pollo e verdure grigliate",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "carne_bianca",
  tempoPrepMin: 15,
  tempoCotturaMin: 15,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nord",
  ingredienti: [
    {
      ingredientId: "piadina",
      quantitaG: 200
    },
    {
      ingredientId: "petto_pollo",
      quantitaG: 240
    },
    {
      ingredientId: "zucchina",
      quantitaG: 150
    },
    {
      ingredientId: "peperone",
      quantitaG: 100
    },
    {
      ingredientId: "insalata_lattuga",
      quantitaG: 40
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    }
  ],
  passaggi: [
    "Taglia il pollo a striscioline e cuocilo in padella con un filo d'olio finché è dorato e cotto.",
    "Grigliate zucchine e peperoni a fette su una piastra ben calda.",
    "Scalda le piadine qualche secondo per lato in una padella antiaderente.",
    "Farcisci ogni piadina con pollo, verdure grigliate e lattuga, quindi arrotola."
  ],
  fonte: "seed",
  descrizione: "Il wrap romagnolo che si porta ovunque, buono anche a temperatura ambiente.",
  costoStimatoPorzione: 3.2
},
{
  id: "r073",
  titolo: "Insalata di farro, feta e pomodorini",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 10,
  tempoCotturaMin: 15,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "farro_perlato",
      quantitaG: 160
    },
    {
      ingredientId: "feta",
      quantitaG: 100
    },
    {
      ingredientId: "pomodorino",
      quantitaG: 150
    },
    {
      ingredientId: "olive_taggiasche",
      quantitaG: 30
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    },
    {
      ingredientId: "origano",
      quantitaG: 1
    }
  ],
  passaggi: [
    "Cuoci il farro in acqua salata seguendo i tempi di cottura indicati, poi scola e lascia raffreddare.",
    "Taglia la feta a cubetti e i pomodorini a metà.",
    "Unisci farro, feta, pomodorini e olive in una ciotola capiente.",
    "Condisci con olio, origano e un pizzico di sale, mescola delicatamente."
  ],
  fonte: "seed",
  descrizione: "Un'insalata di cereali che regge benissimo in frigorifero per tutta la settimana.",
  costoStimatoPorzione: 2.6
},
{
  id: "r074",
  titolo: "Torta salata di verdure senza base",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 15,
  tempoCotturaMin: 35,
  difficolta: 2,
  porzioni: 4,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "uova",
      quantitaG: 250
    },
    {
      ingredientId: "zucchina",
      quantitaG: 200
    },
    {
      ingredientId: "peperone",
      quantitaG: 150
    },
    {
      ingredientId: "scamorza",
      quantitaG: 120
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 30
    },
    {
      ingredientId: "sale",
      quantitaG: 3
    }
  ],
  passaggi: [
    "Taglia zucchine e peperoni a dadini e saltali in padella finché sono morbidi.",
    "Sbatti le uova con parmigiano e sale, unisci le verdure intiepidite e la scamorza a cubetti.",
    "Versa il composto in una teglia foderata e livella bene.",
    "Inforna a 180°C per 35 minuti, finché la superficie è dorata e soda al tatto.",
    "Lascia intiepidire prima di tagliare a porzioni: si taglia meglio da fredda."
  ],
  fonte: "seed",
  descrizione: "Senza pasta sfoglia, solo verdure e uova: leggera e senza glutine.",
  costoStimatoPorzione: 2.1
},
{
  id: "r075",
  titolo: "Bowl di quinoa, ceci e verdure autunnali",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 15,
  tempoCotturaMin: 25,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "quinoa",
      quantitaG: 160
    },
    {
      ingredientId: "ceci_lessati",
      quantitaG: 200
    },
    {
      ingredientId: "zucca",
      quantitaG: 200
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "cumino",
      quantitaG: 2
    },
    {
      ingredientId: "rucola",
      quantitaG: 30
    }
  ],
  passaggi: [
    "Taglia la zucca a cubetti piccoli e falla arrostire in forno a 200°C con olio e cumino per 20 minuti.",
    "Nel frattempo cuoci la quinoa in acqua salata seguendo i tempi in confezione.",
    "Scalda i ceci lessati in padella con un filo d'olio per qualche minuto.",
    "Componi la bowl con quinoa, zucca arrostita, ceci e rucola fresca."
  ],
  fonte: "seed",
  descrizione: "Una bowl completa e vegetale, buona calda o fredda: perfetta da autunno in poi.",
  costoStimatoPorzione: 2.3
},
{
  id: "r076",
  titolo: "Panino con hummus, carote e cetrioli",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "piatto_unico",
  pesantezza: "leggera",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 8,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "panini_integrali",
      quantitaG: 140
    },
    {
      ingredientId: "hummus",
      quantitaG: 120
    },
    {
      ingredientId: "carota",
      quantitaG: 80
    },
    {
      ingredientId: "cetriolo",
      quantitaG: 100
    },
    {
      ingredientId: "insalata_songino",
      quantitaG: 30
    }
  ],
  passaggi: [
    "Taglia a metà i panini integrali e spalma un generoso strato di hummus su entrambi i lati.",
    "Taglia carota e cetriolo a listarelle sottili.",
    "Farcisci i panini con verdure e songino, chiudi e avvolgi nella carta per il trasporto."
  ],
  fonte: "seed",
  descrizione: "Il panino vegetale che si prepara in cinque minuti e si porta ovunque.",
  costoStimatoPorzione: 1.9
},
{
  id: "r082",
  titolo: "Pasta con broccoli, acciughe e briciole di pane",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "primo",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "sud",
  ingredienti: [
    {
      ingredientId: "orecchiette",
      quantitaG: 180
    },
    {
      ingredientId: "broccolo",
      quantitaG: 300
    },
    {
      ingredientId: "acciughe_sotto_sale",
      quantitaG: 20
    },
    {
      ingredientId: "aglio",
      quantitaG: 10
    },
    {
      ingredientId: "pane_grattugiato",
      quantitaG: 30
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 30
    },
    {
      ingredientId: "peperoncino_essiccato",
      quantitaG: 1
    }
  ],
  passaggi: [
    "Cuoci le orecchiette in acqua salata insieme alle cimette di broccolo, unite fin dall'inizio.",
    "Nel frattempo tosta il pane grattugiato in padella asciutta finché è dorato, tienilo da parte.",
    "In un'altra padella scalda olio, aglio e peperoncino, sciogli le acciughe a fuoco basso.",
    "Scola pasta e broccoli tenendo un po' di acqua di cottura, saltali nella padella con le acciughe.",
    "Servi con le briciole di pane tostato sopra al posto del formaggio."
  ],
  fonte: "seed",
  descrizione: "Un primo pugliese classico, senza formaggio, con la croccantezza del pane al posto suo.",
  costoStimatoPorzione: 2
},
{
  id: "r084",
  titolo: "Polpette di lenticchie al forno con insalata",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 20,
  tempoCotturaMin: 20,
  difficolta: 2,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "lenticchie_lessate",
      quantitaG: 360
    },
    {
      ingredientId: "farina_ceci",
      quantitaG: 40
    },
    {
      ingredientId: "cipolla",
      quantitaG: 50
    },
    {
      ingredientId: "cumino",
      quantitaG: 3
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "insalata_lattuga",
      quantitaG: 100
    }
  ],
  passaggi: [
    "Schiaccia le lenticchie lessate con una forchetta o un frullatore a immersione, non troppo fini.",
    "Unisci la cipolla tritata finemente, la farina di ceci e il cumino, mescola fino a un composto compatto.",
    "Forma delle polpette con le mani leggermente umide e disponile su una teglia foderata.",
    "Irrora con un filo d'olio e inforna a 200°C per 20 minuti, girandole a metà cottura.",
    "Servi le polpette calde o tiepide con l'insalata a lato."
  ],
  fonte: "seed",
  descrizione: "Polpette vegetali senza uova, sode fuori e morbide dentro.",
  costoStimatoPorzione: 1.7
},
{
  id: "r096",
  titolo: "Insalata di carciofi crudi, grana e limone",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "leggera",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 15,
  tempoCotturaMin: 0,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "carciofo",
      quantitaG: 300
    },
    {
      ingredientId: "grana",
      quantitaG: 60
    },
    {
      ingredientId: "limone",
      quantitaG: 40,
      opzionale: true
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 25
    },
    {
      ingredientId: "prezzemolo",
      quantitaG: 5
    }
  ],
  passaggi: [
    "Pulisci i carciofi eliminando le foglie esterne più dure e affettali sottilissimi.",
    "Mettili subito in acqua e limone per non farli annerire, poi scolali bene.",
    "Condisci con olio, succo di limone, sale e prezzemolo tritato.",
    "Completa con scaglie di grana appena prima di servire."
  ],
  fonte: "seed",
  descrizione: "Un classico romano, crudo e profumato di limone.",
  costoStimatoPorzione: 2.6
},
{
  id: "r097",
  titolo: "Insalata di farro con asparagi e uova",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 15,
  tempoCotturaMin: 20,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "farro_perlato",
      quantitaG: 160
    },
    {
      ingredientId: "asparago",
      quantitaG: 200
    },
    {
      ingredientId: "uova",
      quantitaG: 100
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "grana",
      quantitaG: 30
    }
  ],
  passaggi: [
    "Cuoci il farro in acqua salata seguendo i tempi in confezione, poi scola e lascia raffreddare.",
    "Cuoci gli asparagi al vapore per 8-10 minuti e tagliali a tocchetti.",
    "Cuoci le uova sode, sgusciale e tagliale a spicchi.",
    "Unisci farro, asparagi e uova, condisci con olio, sale e scaglie di grana."
  ],
  fonte: "seed",
  descrizione: "Un'insalata di cereali di primavera, sazia e leggera.",
  costoStimatoPorzione: 2.7
},
{
  id: "r098",
  titolo: "Insalatona di lenticchie, feta e finocchi",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 10,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "lenticchie_lessate",
      quantitaG: 280
    },
    {
      ingredientId: "feta",
      quantitaG: 100
    },
    {
      ingredientId: "finocchio",
      quantitaG: 150
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "limone",
      quantitaG: 20,
      opzionale: true
    }
  ],
  passaggi: [
    "Sciacqua e scola le lenticchie lessate.",
    "Taglia il finocchio a fettine sottilissime e la feta a cubetti.",
    "Unisci tutti gli ingredienti in una ciotola, condisci con olio, succo di limone e sale."
  ],
  fonte: "seed",
  descrizione: "Un'insalata invernale sostanziosa, pronta in dieci minuti.",
  costoStimatoPorzione: 2.4
},
{
  id: "r099",
  titolo: "Panzanella estiva",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 15,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "pane_raffermo",
      quantitaG: 160
    },
    {
      ingredientId: "pomodoro",
      quantitaG: 300
    },
    {
      ingredientId: "cetriolo",
      quantitaG: 150
    },
    {
      ingredientId: "cipolla",
      quantitaG: 40
    },
    {
      ingredientId: "basilico",
      quantitaG: 5
    },
    {
      ingredientId: "aceto",
      quantitaG: 15
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 30
    }
  ],
  passaggi: [
    "Ammorbidisci il pane raffermo in acqua fredda, poi strizzalo bene e sbriciolalo con le mani.",
    "Taglia pomodori e cetriolo a pezzi, affetta sottile la cipolla.",
    "Unisci tutto in una ciotola con il pane, condisci con olio, aceto, sale e basilico spezzettato.",
    "Lascia riposare in frigorifero almeno mezz'ora prima di servire."
  ],
  fonte: "seed",
  descrizione: "Il modo toscano di non sprecare il pane, fresca e piena di pomodoro d'estate.",
  costoStimatoPorzione: 1.6
},
{
  id: "r100",
  titolo: "Riso freddo con tonno, piselli e mais",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 10,
  tempoCotturaMin: 15,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "riso_carnaroli",
      quantitaG: 160
    },
    {
      ingredientId: "tonno_in_scatola",
      quantitaG: 160
    },
    {
      ingredientId: "pisello_fresco",
      quantitaG: 100
    },
    {
      ingredientId: "mais_dolce",
      quantitaG: 80
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Cuoci il riso in acqua salata, scolalo e passalo subito sotto l'acqua fredda per fermare la cottura.",
    "Sbollenta i piselli freschi per 3-4 minuti.",
    "Unisci riso, tonno sgocciolato, piselli e mais in una ciotola.",
    "Condisci con olio e un pizzico di sale, mescola bene e lascia raffreddare."
  ],
  fonte: "seed",
  descrizione: "Il riso freddo delle gite fuori porta, di primavera.",
  costoStimatoPorzione: 2.5
},
{
  id: "r101",
  titolo: "Bowl di ceci speziati con spinaci e riso basmati",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "ceci_lessati",
      quantitaG: 300
    },
    {
      ingredientId: "riso_basmati",
      quantitaG: 160
    },
    {
      ingredientId: "spinaci_freschi",
      quantitaG: 150
    },
    {
      ingredientId: "curry_polvere",
      quantitaG: 5
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Cuoci il riso basmati in acqua salata seguendo i tempi in confezione.",
    "Scalda i ceci in padella con un filo d'olio e il curry per qualche minuto.",
    "Aggiungi gli spinaci freschi e falli appassire per 2-3 minuti.",
    "Componi la bowl con il riso come base e i ceci speziati sopra."
  ],
  fonte: "seed",
  descrizione: "Una bowl speziata e vegetale, buona tutto l'anno.",
  costoStimatoPorzione: 1.9
},
{
  id: "r104",
  titolo: "Frittata di asparagi",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "secondo",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 10,
  tempoCotturaMin: 15,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "uova",
      quantitaG: 200
    },
    {
      ingredientId: "asparago",
      quantitaG: 200
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 30
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    },
    {
      ingredientId: "sale",
      quantitaG: 2
    }
  ],
  passaggi: [
    "Taglia gli asparagi a tocchetti e saltali in padella con un filo d'olio per 8 minuti.",
    "Sbatti le uova con parmigiano e sale, versale sugli asparagi in padella.",
    "Cuoci a fuoco basso con il coperchio finché la frittata si rapprende, poi giralla per dorarla anche dall'altro lato."
  ],
  fonte: "seed",
  descrizione: "Una frittata di primavera, buona calda o fredda.",
  costoStimatoPorzione: 2
},
{
  id: "r108",
  titolo: "Melanzane a funghetto",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "contorno",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "sud",
  ingredienti: [
    {
      ingredientId: "melanzana",
      quantitaG: 500
    },
    {
      ingredientId: "pomodorino",
      quantitaG: 200
    },
    {
      ingredientId: "aglio",
      quantitaG: 5
    },
    {
      ingredientId: "basilico",
      quantitaG: 5
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 30
    }
  ],
  passaggi: [
    "Taglia le melanzane a cubetti piccoli.",
    "Scalda l'olio con l'aglio, aggiungi le melanzane e cuoci a fuoco medio per 15 minuti mescolando spesso.",
    "Unisci i pomodorini tagliati a metà e cuoci altri 5 minuti.",
    "Completa con basilico spezzettato prima di servire."
  ],
  fonte: "seed",
  descrizione: "Un contorno estivo semplice, buono anche il giorno dopo.",
  costoStimatoPorzione: 1.4
},
{
  id: "r129",
  titolo: "Insalata di verza cruda con mele e noci",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 15,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nord",
  ingredienti: [
    {
      ingredientId: "cavolo_verza",
      quantitaG: 250
    },
    {
      ingredientId: "mela",
      quantitaG: 150
    },
    {
      ingredientId: "noci",
      quantitaG: 30
    },
    {
      ingredientId: "limone",
      quantitaG: 20,
      opzionale: true
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Taglia la verza a listarelle sottilissime e massaggiala con un pizzico di sale per ammorbidirla.",
    "Taglia la mela a fettine sottili e uniscila alla verza con succo di limone per non farla annerire.",
    "Completa con le noci sgusciate e un filo d'olio.",
  ],
  fonte: "seed",
  descrizione: "Una slaw invernale croccante, cruda e senza cottura.",
  costoStimatoPorzione: 1.4
},
{
  id: "r130",
  titolo: "Farro con fave crude e pecorino",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 15,
  tempoCotturaMin: 15,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "farro_perlato",
      quantitaG: 160
    },
    {
      ingredientId: "fava_fresca",
      quantitaG: 200
    },
    {
      ingredientId: "pecorino",
      quantitaG: 80
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Cuoci il farro in acqua salata seguendo i tempi indicati, poi scola e lascia raffreddare.",
    "Sgrana le fave fresche dai baccelli.",
    "Taglia il pecorino a scaglie.",
    "Unisci farro, fave crude e pecorino, condisci con olio e un pizzico di sale."
  ],
  fonte: "seed",
  descrizione: "La primavera romana in un piatto, fave e pecorino rivisitati.",
  costoStimatoPorzione: 2.5
},
{
  id: "r131",
  titolo: "Pasta primavera con asparagi e piselli",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "primo",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 15,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "pasta_corta",
      quantitaG: 180
    },
    {
      ingredientId: "asparago",
      quantitaG: 150
    },
    {
      ingredientId: "pisello_fresco",
      quantitaG: 100
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 30
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Cuoci la pasta in acqua salata.",
    "Nel frattempo salta asparagi a tocchetti e piselli in padella con un filo d'olio per 8-10 minuti.",
    "Scola la pasta al dente e saltala con le verdure, allungando con un po' di acqua di cottura.",
    "Completa con parmigiano prima di servire."
  ],
  fonte: "seed",
  descrizione: "Un primo colorato di primavera, leggero e veloce.",
  costoStimatoPorzione: 2
},
{
  id: "r132",
  titolo: "Insalata di fragole, rucola e grana",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "leggera",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 10,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "fragola",
      quantitaG: 200
    },
    {
      ingredientId: "rucola",
      quantitaG: 80
    },
    {
      ingredientId: "grana",
      quantitaG: 50
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    },
    {
      ingredientId: "aceto_balsamico",
      quantitaG: 10
    }
  ],
  passaggi: [
    "Taglia le fragole a fette.",
    "Disponi la rucola in un piatto, aggiungi le fragole e le scaglie di grana.",
    "Condisci con olio e una riduzione di aceto balsamico."
  ],
  fonte: "seed",
  descrizione: "Un'insalata di primavera inaspettata, dolce e sapida insieme.",
  costoStimatoPorzione: 2.3
},
{
  id: "r133",
  titolo: "Vellutata di cavolfiore e patate",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "zuppa",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 25,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 4,
  congelabile: true,
  trasportabile: false,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "cavolfiore",
      quantitaG: 400
    },
    {
      ingredientId: "patata",
      quantitaG: 150
    },
    {
      ingredientId: "cipolla",
      quantitaG: 60
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 600
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Soffriggi la cipolla in olio, aggiungi cavolfiore a cimette e patata a pezzi.",
    "Versa il brodo vegetale e cuoci coperto per 20-25 minuti finché le verdure sono morbide.",
    "Frulla fino a ottenere una crema liscia, aggiusta di sale."
  ],
  fonte: "seed",
  descrizione: "Una vellutata invernale delicata, buona da rifare ogni settimana.",
  costoStimatoPorzione: 1.2
},
{
  id: "r134",
  titolo: "Radicchio grigliato con noci e gorgonzola",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "contorno",
  pesantezza: "media",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 10,
  tempoCotturaMin: 10,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nord",
  ingredienti: [
    {
      ingredientId: "radicchio",
      quantitaG: 300
    },
    {
      ingredientId: "noci",
      quantitaG: 40
    },
    {
      ingredientId: "stracchino",
      quantitaG: 80
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    }
  ],
  passaggi: [
    "Taglia il radicchio in quarti e griglialo su una piastra calda finché è appassito e leggermente bruciacchiato.",
    "Disponilo su un piatto e completa con fiocchi di stracchino e noci sgusciate.",
    "Termina con un filo d'olio."
  ],
  fonte: "seed",
  descrizione: "Il contorno invernale che sembra un secondo, amaro e cremoso insieme.",
  costoStimatoPorzione: 2.1
},
{
  id: "r137",
  titolo: "Topinambur al forno con rosmarino",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "contorno",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 30,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "topinambur",
      quantitaG: 400
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 25
    },
    {
      ingredientId: "rosmarino",
      quantitaG: 3
    },
    {
      ingredientId: "sale",
      quantitaG: 3
    }
  ],
  passaggi: [
    "Lava bene i topinambur e tagliali a spicchi senza sbucciarli.",
    "Condiscili con olio, rosmarino e sale su una teglia.",
    "Inforna a 200°C per 30 minuti, finché sono dorati e morbidi dentro."
  ],
  fonte: "seed",
  descrizione: "Un contorno invernale poco conosciuto, dal sapore di carciofo.",
  costoStimatoPorzione: 1.3
},
{
  id: "r140",
  titolo: "Frittata di fave e pecorino",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "secondo",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 15,
  tempoCotturaMin: 15,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "uova",
      quantitaG: 200
    },
    {
      ingredientId: "fava_fresca",
      quantitaG: 200
    },
    {
      ingredientId: "pecorino",
      quantitaG: 50
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    }
  ],
  passaggi: [
    "Sgrana le fave e sbollentale 3 minuti, poi scolale.",
    "Sbatti le uova con il pecorino grattugiato e un pizzico di sale, unisci le fave.",
    "Versa in padella calda con un filo d'olio e cuoci a fuoco basso, girando a metà cottura."
  ],
  fonte: "seed",
  descrizione: "Una frittata di primavera, sostanziosa ma non pesante.",
  costoStimatoPorzione: 2.1
},
{
  id: "r141",
  titolo: "Carciofi alla romana",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "contorno",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 15,
  tempoCotturaMin: 30,
  difficolta: 2,
  porzioni: 4,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "carciofo",
      quantitaG: 600
    },
    {
      ingredientId: "aglio",
      quantitaG: 10
    },
    {
      ingredientId: "menta",
      quantitaG: 5
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 40
    },
    {
      ingredientId: "vino_bianco",
      quantitaG: 50
    }
  ],
  passaggi: [
    "Pulisci i carciofi eliminando le foglie dure e lo spazio interno, lasciandoli interi.",
    "Farcisci il centro con aglio tritato e menta.",
    "Disponili capovolti in una pentola con olio, vino bianco e acqua fino a metà altezza.",
    "Cuoci coperto a fuoco basso per 25-30 minuti, finché sono morbidi."
  ],
  fonte: "seed",
  descrizione: "Il classico contorno romano di stagione, morbido e profumato.",
  costoStimatoPorzione: 1.8
},
{
  id: "r147",
  titolo: "Finocchi gratinati al forno",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "contorno",
  pesantezza: "media",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 10,
  tempoCotturaMin: 30,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "finocchio",
      quantitaG: 500
    },
    {
      ingredientId: "besciamella",
      quantitaG: 200
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 40
    }
  ],
  passaggi: [
    "Taglia i finocchi a spicchi e sbollentali 5 minuti in acqua salata.",
    "Disponili in una teglia, copri con la besciamella e spolvera di parmigiano.",
    "Inforna a 200°C per 25 minuti, finché la superficie è dorata."
  ],
  fonte: "seed",
  descrizione: "Un contorno invernale che sembra un piatto principale.",
  costoStimatoPorzione: 1.7
},
{
  id: "r148",
  titolo: "Broccoli saltati con aglio e peperoncino",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "contorno",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 5,
  tempoCotturaMin: 12,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "sud",
  ingredienti: [
    {
      ingredientId: "broccolo",
      quantitaG: 500
    },
    {
      ingredientId: "aglio",
      quantitaG: 10
    },
    {
      ingredientId: "peperoncino_essiccato",
      quantitaG: 1
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 25
    }
  ],
  passaggi: [
    "Sbollenta i broccoli a cimette per 4 minuti, poi scolali.",
    "Scalda olio, aglio e peperoncino in padella, aggiungi i broccoli.",
    "Salta a fuoco vivace per 5-6 minuti finché sono leggermente dorati."
  ],
  fonte: "seed",
  descrizione: "Il contorno invernale più veloce, sempre pronto.",
  costoStimatoPorzione: 1.1
},
{
  id: "r155",
  titolo: "Frittata di carciofi",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "secondo",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 15,
  tempoCotturaMin: 15,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "uova",
      quantitaG: 200
    },
    {
      ingredientId: "carciofo",
      quantitaG: 250
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 30
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    }
  ],
  passaggi: [
    "Taglia i carciofi a spicchi sottili e saltali in padella con un filo d'olio finché sono morbidi.",
    "Sbatti le uova con parmigiano e un pizzico di sale, versale sui carciofi.",
    "Cuoci a fuoco basso con il coperchio, poi gira per dorare l'altro lato."
  ],
  fonte: "seed",
  descrizione: "Una frittata di primavera, buona calda o fredda.",
  costoStimatoPorzione: 2.2
},
{
  id: "r160",
  titolo: "Insalata tiepida di asparagi e gamberi",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 10,
  tempoCotturaMin: 12,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "asparago",
      quantitaG: 250
    },
    {
      ingredientId: "gamberi",
      quantitaG: 320
    },
    {
      ingredientId: "limone",
      quantitaG: 20,
      opzionale: true
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    }
  ],
  passaggi: [
    "Cuoci gli asparagi al vapore per 8-10 minuti.",
    "Scotta i gamberi in padella un paio di minuti per lato.",
    "Componi il piatto con asparagi tiepidi e gamberi, un filo d'olio e succo di limone."
  ],
  fonte: "seed",
  descrizione: "Un piatto di primavera, semplice e completo.",
  costoStimatoPorzione: 3.9
},
{
  id: "r162",
  titolo: "Peperoni in padella con capperi e olive",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "contorno",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
  difficolta: 1,
  porzioni: 4,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "sud",
  ingredienti: [
    {
      ingredientId: "peperone",
      quantitaG: 600
    },
    {
      ingredientId: "capperi",
      quantitaG: 20
    },
    {
      ingredientId: "olive_nere",
      quantitaG: 50
    },
    {
      ingredientId: "aglio",
      quantitaG: 10
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 30
    }
  ],
  passaggi: [
    "Taglia i peperoni a listarelle.",
    "Scalda l'olio con l'aglio in padella, aggiungi i peperoni e cuoci a fuoco medio per 15 minuti.",
    "Unisci capperi e olive, cuoci ancora 5 minuti mescolando spesso."
  ],
  fonte: "seed",
  descrizione: "Un contorno estivo del sud, saporito e senza cottura complicata.",
  costoStimatoPorzione: 1.6
},
{
  id: "r163",
  titolo: "Pasta con carciofi e pancetta",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "primo",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "carne_rossa",
  tempoPrepMin: 15,
  tempoCotturaMin: 20,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "pasta_corta",
      quantitaG: 180
    },
    {
      ingredientId: "carciofo",
      quantitaG: 250
    },
    {
      ingredientId: "pancetta",
      quantitaG: 80
    },
    {
      ingredientId: "cipolla",
      quantitaG: 40
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Rosola la pancetta a listarelle in padella finché è croccante, tienila da parte.",
    "Nella stessa padella soffriggi la cipolla e i carciofi a spicchi finché sono morbidi.",
    "Cuoci la pasta, scolala al dente e saltala con carciofi e pancetta.",
    "Completa con parmigiano prima di servire."
  ],
  fonte: "seed",
  descrizione: "Un primo di primavera, saporito e veloce.",
  costoStimatoPorzione: 2.4
},
{
  id: "r166",
  titolo: "Torta salata di asparagi e ricotta senza base",
  slotAmmessi: [
    "pranzo",
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 15,
  tempoCotturaMin: 35,
  difficolta: 2,
  porzioni: 4,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "uova",
      quantitaG: 200
    },
    {
      ingredientId: "ricotta",
      quantitaG: 200
    },
    {
      ingredientId: "asparago",
      quantitaG: 300
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 30
    },
    {
      ingredientId: "sale",
      quantitaG: 3
    }
  ],
  passaggi: [
    "Taglia gli asparagi a tocchetti e saltali in padella qualche minuto.",
    "Sbatti le uova con ricotta, parmigiano e sale, unisci gli asparagi.",
    "Versa in una teglia foderata e inforna a 180°C per 35 minuti.",
    "Lascia intiepidire prima di tagliare a porzioni."
  ],
  fonte: "seed",
  descrizione: "Senza pasta sfoglia, solo uova, ricotta e asparagi di primavera.",
  costoStimatoPorzione: 2.3
},
{
  id: "r167",
  titolo: "Pasta fredda con fave, pomodorini e feta",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 15,
  tempoCotturaMin: 12,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "pasta_corta",
      quantitaG: 180
    },
    {
      ingredientId: "fava_fresca",
      quantitaG: 200
    },
    {
      ingredientId: "feta",
      quantitaG: 100
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "menta",
      quantitaG: 5,
      opzionale: true
    }
  ],
  passaggi: [
    "Cuoci la pasta, scolala e passala sotto l'acqua fredda per fermare la cottura.",
    "Sbollenta le fave sgranate per 3 minuti.",
    "Unisci pasta, fave e feta a cubetti, condisci con olio e, se piace, menta spezzettata."
  ],
  fonte: "seed",
  descrizione: "Un piatto freddo di primavera, da portare ovunque.",
  costoStimatoPorzione: 2.2
},
{
  id: "r168",
  titolo: "Insalata di zucchine grigliate e menta",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "leggera",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 15,
  tempoCotturaMin: 10,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "zucchina",
      quantitaG: 300
    },
    {
      ingredientId: "menta",
      quantitaG: 5
    },
    {
      ingredientId: "grana",
      quantitaG: 50
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Taglia le zucchine a fette nel senso della lunghezza e grigliale su una piastra calda.",
    "Disponile su un piatto, condisci con olio e menta spezzettata.",
    "Completa con scaglie di grana."
  ],
  fonte: "seed",
  descrizione: "Un'insalata estiva semplice, buona anche fredda dal frigorifero.",
  costoStimatoPorzione: 2.0
},
{
  id: "r169",
  titolo: "Bowl di farro con fave, piselli e feta",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 15,
  tempoCotturaMin: 15,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "farro_perlato",
      quantitaG: 160
    },
    {
      ingredientId: "fava_fresca",
      quantitaG: 150
    },
    {
      ingredientId: "pisello_fresco",
      quantitaG: 100
    },
    {
      ingredientId: "feta",
      quantitaG: 80
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Cuoci il farro in acqua salata, scola e lascia raffreddare.",
    "Sbollenta fave e piselli per 3-4 minuti.",
    "Componi la bowl con farro, legumi freschi e feta a cubetti, condisci con olio."
  ],
  fonte: "seed",
  descrizione: "Una bowl completa di primavera, sazia e leggera.",
  costoStimatoPorzione: 2.6
},
{
  id: "r170",
  titolo: "Panino con frittata di asparagi",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 15,
  tempoCotturaMin: 12,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "panini_integrali",
      quantitaG: 140
    },
    {
      ingredientId: "uova",
      quantitaG: 150
    },
    {
      ingredientId: "asparago",
      quantitaG: 150
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 10
    }
  ],
  passaggi: [
    "Salta gli asparagi a tocchetti in padella per 6-7 minuti.",
    "Sbatti le uova con un pizzico di sale, versale sugli asparagi e cuoci come una frittatina sottile.",
    "Farcisci i panini con la frittata tagliata a metà."
  ],
  fonte: "seed",
  descrizione: "Il panino di primavera da portare in ufficio.",
  costoStimatoPorzione: 1.8
},
{
  id: "r171",
  titolo: "Insalata di polpo, patate e pomodorini",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 20,
  tempoCotturaMin: 35,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "sud",
  ingredienti: [
    {
      ingredientId: "polpo",
      quantitaG: 400
    },
    {
      ingredientId: "patata",
      quantitaG: 200
    },
    {
      ingredientId: "pomodorino",
      quantitaG: 150
    },
    {
      ingredientId: "prezzemolo",
      quantitaG: 5
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Lessa il polpo in acqua per circa 25 minuti finché è tenero, poi lascialo raffreddare e tagliarlo a pezzi.",
    "Lessa le patate a parte, lasciale intiepidire e tagliale a cubetti.",
    "Unisci polpo, patate e pomodorini tagliati a metà, condisci con olio, prezzemolo e un pizzico di sale."
  ],
  fonte: "seed",
  descrizione: "Un'insalata di mare estiva del sud, un classico da spiaggia.",
  costoStimatoPorzione: 4.6
},
{
  id: "r172",
  titolo: "Vellutata fredda di piselli",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "zuppa",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 15,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "pisello_fresco",
      quantitaG: 300
    },
    {
      ingredientId: "cipollotto",
      quantitaG: 40
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 400
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    },
    {
      ingredientId: "menta",
      quantitaG: 5,
      opzionale: true
    }
  ],
  passaggi: [
    "Cuoci i piselli con il cipollotto nel brodo vegetale per 12-15 minuti.",
    "Frulla fino a ottenere una crema liscia e lascia raffreddare completamente.",
    "Servi fredda, con un filo d'olio e, a piacere, foglioline di menta."
  ],
  fonte: "seed",
  descrizione: "Una vellutata da portare in ufficio in un thermos, buona fredda.",
  costoStimatoPorzione: 1.5
},
{
  id: "r173",
  titolo: "Wrap con hummus di fave e verdure",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 20,
  tempoCotturaMin: 5,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "piadina",
      quantitaG: 200
    },
    {
      ingredientId: "fava_fresca",
      quantitaG: 200
    },
    {
      ingredientId: "tahina",
      quantitaG: 20
    },
    {
      ingredientId: "limone",
      quantitaG: 15,
      opzionale: true
    },
    {
      ingredientId: "insalata_lattuga",
      quantitaG: 40
    }
  ],
  passaggi: [
    "Sbollenta le fave 3-4 minuti, poi frullale con tahina e succo di limone fino a una crema.",
    "Scalda le piadine qualche secondo per lato.",
    "Farcisci con la crema di fave e la lattuga, arrotola."
  ],
  fonte: "seed",
  descrizione: "L'hummus di primavera, con le fave al posto dei ceci.",
  costoStimatoPorzione: 1.9
},
{
  id: "r174",
  titolo: "Insalata di riso con asparagi e gamberi",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 15,
  tempoCotturaMin: 20,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "riso_carnaroli",
      quantitaG: 160
    },
    {
      ingredientId: "gamberi",
      quantitaG: 320
    },
    {
      ingredientId: "asparago",
      quantitaG: 200
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Cuoci il riso, scolalo e raffreddalo sotto l'acqua corrente.",
    "Scotta asparagi a tocchetti e gamberi in padella per pochi minuti.",
    "Unisci tutto, condisci con olio e lascia raffreddare prima di servire."
  ],
  fonte: "seed",
  descrizione: "Il riso freddo delle gite di primavera.",
  costoStimatoPorzione: 3.8
},
{
  id: "r175",
  titolo: "Farro con zucchine, olive e menta",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "insalatona",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 15,
  tempoCotturaMin: 20,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "farro_perlato",
      quantitaG: 160
    },
    {
      ingredientId: "zucchina",
      quantitaG: 200
    },
    {
      ingredientId: "olive_taggiasche",
      quantitaG: 40
    },
    {
      ingredientId: "menta",
      quantitaG: 5
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Cuoci il farro, scola e lascia raffreddare.",
    "Taglia le zucchine a dadini piccoli e saltale in padella con un filo d'olio per 5 minuti.",
    "Unisci farro, zucchine, olive e menta spezzettata, condisci con olio e un pizzico di sale."
  ],
  fonte: "seed",
  descrizione: "Un'insalata di cereali estiva, buona per giorni.",
  costoStimatoPorzione: 2.0
},
{
  id: "r176",
  titolo: "Crostone con fave e pecorino",
  slotAmmessi: [
    "pranzo"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 15,
  tempoCotturaMin: 5,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "pane_casereccio",
      quantitaG: 120
    },
    {
      ingredientId: "fava_fresca",
      quantitaG: 200
    },
    {
      ingredientId: "pecorino",
      quantitaG: 60
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    }
  ],
  passaggi: [
    "Tosta le fette di pane finché sono dorate.",
    "Sgrana le fave e schiacciane metà con una forchetta, lasciando l'altra metà intera.",
    "Distribuisci le fave sul pane, completa con scaglie di pecorino e un filo d'olio."
  ],
  fonte: "seed",
  descrizione: "Il crostone romano di primavera, semplice e vero.",
  costoStimatoPorzione: 2.1
}
];
