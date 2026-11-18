import type { Recipe } from "../recipeSchema.ts";

/**
 * Espansione novembre 2026 — 100 ricette nuove (id n001–n100), con priorità a
 * vegano, vegetariano e senza glutine a pranzo e cena, più proteine vegetali
 * (tofu, tempeh, seitan, legumi) e cucina delle isole. Stesso schema delle
 * altre: diete e stagionalità si calcolano dagli ingredienti, non si taggano.
 * Un ingrediente `opzionale` con nota (es. salsa di soia → tamari, pane →
 * omettere) non vincola la dieta: la ricetta resta senza glutine.
 */

export const RICETTE_EXTRA_COLAZIONE: Recipe[] = [
  {
    "id": "n001",
    "titolo": "Pancake vegani di riso e mirtilli",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 10,
    "difficolta": 2,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": true,
    "trasportabile": false,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "farina_riso",
        "quantitaG": 120
      },
      {
        "ingredientId": "bevanda_vegetale",
        "quantitaG": 200
      },
      {
        "ingredientId": "banana",
        "quantitaG": 100
      },
      {
        "ingredientId": "lievito_dolci",
        "quantitaG": 6
      },
      {
        "ingredientId": "frutti_bosco_surgelati",
        "quantitaG": 100
      },
      {
        "ingredientId": "sciroppo_acero",
        "quantitaG": 20
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 10
      }
    ],
    "passaggi": [
      "Schiaccia la banana e frullala con la bevanda vegetale.",
      "Unisci farina di riso e lievito, mescola fino a una pastella liscia e aggiungi metà dei frutti di bosco.",
      "Scalda una padella antiaderente unta appena, versa un mestolino per pancake e cuoci 2 minuti per lato.",
      "Servi con il resto dei frutti di bosco e un filo di sciroppo d'acero."
    ],
    "fonte": "seed",
    "descrizione": "Soffici senza uova né latte, e senza glutine: la colazione della domenica per tutti.",
    "costoStimatoPorzione": 1.4
  },
  {
    "id": "n002",
    "titolo": "Chia pudding al cacao e lamponi",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "semi_chia",
        "quantitaG": 50
      },
      {
        "ingredientId": "bevanda_vegetale",
        "quantitaG": 300
      },
      {
        "ingredientId": "cacao_amaro",
        "quantitaG": 10
      },
      {
        "ingredientId": "sciroppo_acero",
        "quantitaG": 15
      },
      {
        "ingredientId": "frutti_bosco_surgelati",
        "quantitaG": 120
      }
    ],
    "passaggi": [
      "Mescola bevanda vegetale, cacao e sciroppo d'acero finché il cacao si scioglie.",
      "Aggiungi i semi di chia, mescola bene e ripeti dopo 5 minuti per evitare grumi.",
      "Copri e lascia in frigo almeno 4 ore, meglio tutta la notte.",
      "Servi con i frutti di bosco scongelati sopra."
    ],
    "fonte": "seed",
    "descrizione": "Si prepara la sera, la mattina è già pronto in frigo. Sa di budino al cioccolato.",
    "costoStimatoPorzione": 1.3
  },
  {
    "id": "n003",
    "titolo": "Overnight oats vegani alla mela e cannella",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "fiocchi_avena",
        "quantitaG": 80
      },
      {
        "ingredientId": "yogurt_vegetale",
        "quantitaG": 150
      },
      {
        "ingredientId": "bevanda_vegetale",
        "quantitaG": 150
      },
      {
        "ingredientId": "mela",
        "quantitaG": 150
      },
      {
        "ingredientId": "cannella",
        "quantitaG": 2
      },
      {
        "ingredientId": "noci",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Grattugia la mela con la buccia.",
      "Mescola in un barattolo fiocchi d'avena, yogurt vegetale, bevanda vegetale, mela e cannella.",
      "Lascia riposare in frigo tutta la notte.",
      "Al mattino completa con le noci spezzettate."
    ],
    "fonte": "seed",
    "descrizione": "Barattolo pronto in 5 minuti la sera prima, da portare anche in ufficio.",
    "costoStimatoPorzione": 1.1
  },
  {
    "id": "n004",
    "titolo": "Toast senza glutine con avocado, lime e sesamo",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_salata",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 8,
    "tempoCotturaMin": 3,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": false,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "pane_senza_glutine",
        "quantitaG": 120
      },
      {
        "ingredientId": "avocado",
        "quantitaG": 150
      },
      {
        "ingredientId": "lime",
        "quantitaG": 15
      },
      {
        "ingredientId": "sesamo",
        "quantitaG": 6
      },
      {
        "ingredientId": "peperoncino_essiccato",
        "quantitaG": 1,
        "opzionale": true
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Tosta le fette di pane senza glutine.",
      "Schiaccia l'avocado con succo di lime e un pizzico di sale.",
      "Spalma sul pane e cospargi di sesamo tostato e, se ti piace, peperoncino."
    ],
    "fonte": "seed",
    "descrizione": "La colazione salata più veloce che c'è, vegana e senza glutine.",
    "costoStimatoPorzione": 1.9
  },
  {
    "id": "n005",
    "titolo": "Tofu strapazzato con spinaci e curcuma",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_salata",
    "pesantezza": "media",
    "proteinaPrincipale": "tofu_tempeh",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 8,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "tofu",
        "quantitaG": 250
      },
      {
        "ingredientId": "spinaci_freschi",
        "quantitaG": 150
      },
      {
        "ingredientId": "cipollotto",
        "quantitaG": 30
      },
      {
        "ingredientId": "curcuma",
        "quantitaG": 2
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 10
      },
      {
        "ingredientId": "pane_senza_glutine",
        "quantitaG": 100,
        "opzionale": true
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      },
      {
        "ingredientId": "pepe",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Affetta il cipollotto e fallo appassire in padella con l'olio.",
      "Sbriciola il tofu con le mani nella padella, aggiungi curcuma, sale e pepe e cuoci 4 minuti.",
      "Unisci gli spinaci e mescola finché si ammorbidiscono.",
      "Servi da solo o con pane tostato."
    ],
    "fonte": "seed",
    "descrizione": "L'alternativa vegana alle uova strapazzate: proteica, colorata, pronta in 10 minuti.",
    "costoStimatoPorzione": 1.8
  },
  {
    "id": "n006",
    "titolo": "Crespelle di ceci con hummus e spinaci",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_salata",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 12,
    "difficolta": 2,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "farina_ceci",
        "quantitaG": 100
      },
      {
        "ingredientId": "acqua",
        "quantitaG": 200
      },
      {
        "ingredientId": "spinaci_freschi",
        "quantitaG": 100
      },
      {
        "ingredientId": "hummus",
        "quantitaG": 60
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 10
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Sbatti farina di ceci, acqua e sale fino a una pastella liscia; lasciala riposare 10 minuti.",
      "Cuoci le crespelle in una padella unta, 2 minuti per lato.",
      "Spalma l'hummus, aggiungi gli spinaci crudi e arrotola."
    ],
    "fonte": "seed",
    "descrizione": "Crespelle salate senza uova e senza glutine, piene di proteine vegetali.",
    "costoStimatoPorzione": 1.2
  },
  {
    "id": "n007",
    "titolo": "Muffin vegani di banana e avena",
    "slotAmmessi": [
      "colazione",
      "spuntino"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 25,
    "difficolta": 2,
    "porzioni": 6,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "farina_avena",
        "quantitaG": 150
      },
      {
        "ingredientId": "banana",
        "quantitaG": 200
      },
      {
        "ingredientId": "bevanda_vegetale",
        "quantitaG": 120
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 30
      },
      {
        "ingredientId": "lievito_dolci",
        "quantitaG": 8
      },
      {
        "ingredientId": "cannella",
        "quantitaG": 2
      },
      {
        "ingredientId": "noci",
        "quantitaG": 30
      }
    ],
    "passaggi": [
      "Accendi il forno a 180 °C e prepara 6 pirottini.",
      "Schiaccia le banane e mescolale con bevanda vegetale e olio.",
      "Aggiungi farina d'avena, lievito, cannella e noci tritate, senza mescolare troppo.",
      "Riempi i pirottini e cuoci 25 minuti; lasciali intiepidire prima di toglierli."
    ],
    "fonte": "seed",
    "descrizione": "Dolci solo di banana, si congelano bene: uno tirato fuori la sera è pronto al mattino.",
    "costoStimatoPorzione": 0.7
  },
  {
    "id": "n008",
    "titolo": "Granola fatta in casa con nocciole e cacao",
    "slotAmmessi": [
      "colazione",
      "spuntino"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 1,
    "porzioni": 8,
    "conservabilitaGiorni": 14,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "fiocchi_avena",
        "quantitaG": 300
      },
      {
        "ingredientId": "nocciole",
        "quantitaG": 80
      },
      {
        "ingredientId": "semi_zucca",
        "quantitaG": 40
      },
      {
        "ingredientId": "sciroppo_acero",
        "quantitaG": 60
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 30
      },
      {
        "ingredientId": "cacao_amaro",
        "quantitaG": 15
      }
    ],
    "passaggi": [
      "Accendi il forno a 160 °C e copri una teglia con carta forno.",
      "Mescola sciroppo d'acero, olio e cacao, poi unisci avena, nocciole tritate grossolanamente e semi.",
      "Stendi in uno strato sottile e cuoci 25 minuti, girando a metà.",
      "Lascia raffreddare completamente: diventa croccante raffreddandosi. Conserva in un barattolo."
    ],
    "fonte": "seed",
    "descrizione": "Un barattolo che dura due settimane, molto meno zuccherato di quella confezionata.",
    "costoStimatoPorzione": 0.6
  },
  {
    "id": "n009",
    "titolo": "Yogurt vegetale con kiwi e semi di zucca",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "yogurt_vegetale",
        "quantitaG": 250
      },
      {
        "ingredientId": "kiwi",
        "quantitaG": 200
      },
      {
        "ingredientId": "semi_zucca",
        "quantitaG": 20
      },
      {
        "ingredientId": "sciroppo_acero",
        "quantitaG": 10
      }
    ],
    "passaggi": [
      "Sbuccia i kiwi e tagliali a cubetti.",
      "Dividi lo yogurt in due ciotole, aggiungi il kiwi e i semi di zucca.",
      "Completa con un filo di sciroppo d'acero."
    ],
    "fonte": "seed",
    "descrizione": "Freschezza invernale: il kiwi italiano è di stagione da ottobre ad aprile.",
    "costoStimatoPorzione": 1.5
  },
  {
    "id": "n010",
    "titolo": "Uova al tegamino con pomodorini arrostiti",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_salata",
    "pesantezza": "media",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 10,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "uova",
        "quantitaG": 240
      },
      {
        "ingredientId": "pomodorino",
        "quantitaG": 250
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 10
      },
      {
        "ingredientId": "origano",
        "quantitaG": 1
      },
      {
        "ingredientId": "pane_casereccio",
        "quantitaG": 80,
        "opzionale": true
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Taglia i pomodorini a metà e falli saltare in padella con l'olio e l'origano per 4 minuti.",
      "Fai spazio tra i pomodorini e rompi le uova direttamente in padella.",
      "Copri e cuoci a fuoco basso 4-5 minuti, finché l'albume è rappreso.",
      "Sala e servi con pane tostato se vuoi."
    ],
    "fonte": "seed",
    "descrizione": "Colazione salata estiva da weekend, pomodorini dolci e tuorlo morbido.",
    "costoStimatoPorzione": 1.6
  },
  {
    "id": "n011",
    "titolo": "Ricotta montata con pere, miele e noci",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 8,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "ricotta",
        "quantitaG": 200
      },
      {
        "ingredientId": "pera",
        "quantitaG": 250
      },
      {
        "ingredientId": "miele",
        "quantitaG": 20
      },
      {
        "ingredientId": "noci",
        "quantitaG": 20
      },
      {
        "ingredientId": "cannella",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Lavora la ricotta con una frusta e metà del miele finché è cremosa.",
      "Taglia le pere a fettine sottili.",
      "Componi le ciotole con ricotta, pere, noci e un pizzico di cannella; finisci con il miele rimasto."
    ],
    "fonte": "seed",
    "descrizione": "Il sapore dell'autunno a colazione, senza pane e senza glutine.",
    "costoStimatoPorzione": 1.7
  },
  {
    "id": "n012",
    "titolo": "Porridge salato con uovo e spinaci",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_salata",
    "pesantezza": "media",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 10,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": false,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "fiocchi_avena",
        "quantitaG": 80
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 300
      },
      {
        "ingredientId": "uova",
        "quantitaG": 120
      },
      {
        "ingredientId": "spinaci_freschi",
        "quantitaG": 100
      },
      {
        "ingredientId": "grana",
        "quantitaG": 15
      },
      {
        "ingredientId": "pepe",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Cuoci i fiocchi d'avena nel brodo vegetale per 5 minuti, mescolando.",
      "Aggiungi gli spinaci e lascia appassire.",
      "A parte cuoci le uova in camicia o al tegamino.",
      "Servi il porridge con l'uovo sopra, grana grattugiato e pepe."
    ],
    "fonte": "seed",
    "descrizione": "Per chi la mattina non vuole il dolce: caldo, saziante, pronto in un quarto d'ora.",
    "costoStimatoPorzione": 1.2
  },
  {
    "id": "n013",
    "titolo": "Smoothie ai frutti di bosco e chia",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "frutti_bosco_surgelati",
        "quantitaG": 200
      },
      {
        "ingredientId": "banana",
        "quantitaG": 120
      },
      {
        "ingredientId": "bevanda_vegetale",
        "quantitaG": 300
      },
      {
        "ingredientId": "semi_chia",
        "quantitaG": 10
      }
    ],
    "passaggi": [
      "Metti tutto nel frullatore.",
      "Frulla un minuto finché è liscio e denso.",
      "Versa subito nei bicchieri."
    ],
    "fonte": "seed",
    "descrizione": "Viola, freddo e veloce: i frutti surgelati fanno da ghiaccio.",
    "costoStimatoPorzione": 1.3
  },
  {
    "id": "n014",
    "titolo": "Tortino di patate dolci e cannella",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "media",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "patata_dolce",
        "quantitaG": 300
      },
      {
        "ingredientId": "uova",
        "quantitaG": 120
      },
      {
        "ingredientId": "farina_mandorle",
        "quantitaG": 60
      },
      {
        "ingredientId": "sciroppo_acero",
        "quantitaG": 20
      },
      {
        "ingredientId": "cannella",
        "quantitaG": 3
      },
      {
        "ingredientId": "lievito_dolci",
        "quantitaG": 4
      }
    ],
    "passaggi": [
      "Lessa o cuoci al vapore la patata dolce a cubetti finché è morbida, poi schiacciala.",
      "Accendi il forno a 180 °C.",
      "Mescola la purea con uova, farina di mandorle, sciroppo, cannella e lievito.",
      "Versa in una teglietta foderata e cuoci 30 minuti. Taglia a quadrotti quando è tiepido."
    ],
    "fonte": "seed",
    "descrizione": "Morbido come un plumcake, senza farina di grano: si taglia a quadrotti per tutta la settimana.",
    "costoStimatoPorzione": 1
  },
  {
    "id": "n015",
    "titolo": "Toast con hummus, uovo sodo e paprika",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_salata",
    "pesantezza": "media",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 9,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "pane_integrale",
        "quantitaG": 100
      },
      {
        "ingredientId": "hummus",
        "quantitaG": 80
      },
      {
        "ingredientId": "uova",
        "quantitaG": 120
      },
      {
        "ingredientId": "paprika",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Cuoci le uova in acqua bollente per 9 minuti, poi raffreddale e sgusciale.",
      "Tosta il pane e spalma l'hummus.",
      "Aggiungi le uova a fette e una spolverata di paprika."
    ],
    "fonte": "seed",
    "descrizione": "Proteine vere a colazione, con quello che hai già in frigo.",
    "costoStimatoPorzione": 1.2
  },
  {
    "id": "n016",
    "titolo": "Bircher muesli con mela grattugiata",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "muesli",
        "quantitaG": 100
      },
      {
        "ingredientId": "yogurt_bianco",
        "quantitaG": 200
      },
      {
        "ingredientId": "latte",
        "quantitaG": 100
      },
      {
        "ingredientId": "mela",
        "quantitaG": 150
      },
      {
        "ingredientId": "mandorle",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Grattugia la mela e mescolala con muesli, yogurt e latte.",
      "Lascia in frigo almeno 2 ore o tutta la notte.",
      "Servi con le mandorle a lamelle."
    ],
    "fonte": "seed",
    "descrizione": "La colazione svizzera classica: si prepara prima e si ammorbidisce da sola.",
    "costoStimatoPorzione": 1
  },
  {
    "id": "n017",
    "titolo": "Gallette di riso con burro di arachidi e banana",
    "slotAmmessi": [
      "colazione",
      "spuntino"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 3,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 1,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "gallette_riso",
        "quantitaG": 20
      },
      {
        "ingredientId": "burro_arachidi",
        "quantitaG": 20
      },
      {
        "ingredientId": "banana",
        "quantitaG": 120
      }
    ],
    "passaggi": [
      "Spalma il burro di arachidi sulle gallette.",
      "Aggiungi la banana a rondelle."
    ],
    "fonte": "seed",
    "descrizione": "Tre minuti, zero cotture, senza glutine. Va bene anche come spuntino prima dello sport.",
    "costoStimatoPorzione": 0.6
  },
  {
    "id": "n018",
    "titolo": "Porridge di castagne e cacao",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 35,
    "difficolta": 2,
    "porzioni": 2,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "castagna",
        "quantitaG": 200
      },
      {
        "ingredientId": "bevanda_vegetale",
        "quantitaG": 250
      },
      {
        "ingredientId": "cacao_amaro",
        "quantitaG": 8
      },
      {
        "ingredientId": "sciroppo_acero",
        "quantitaG": 15
      },
      {
        "ingredientId": "nocciole",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Incidi le castagne e lessale 30 minuti, poi sbucciale ancora calde.",
      "Frullale con la bevanda vegetale, il cacao e lo sciroppo d'acero.",
      "Scalda la crema in un pentolino per 3 minuti mescolando.",
      "Servi con le nocciole tritate."
    ],
    "fonte": "seed",
    "descrizione": "Crema calda d'autunno, vegana e senza glutine. Si può preparare il giorno prima.",
    "costoStimatoPorzione": 1.6
  }
];

export const RICETTE_EXTRA_PRANZO: Recipe[] = [
  {
    "id": "n035",
    "titolo": "Tempeh in agrodolce con peperoni e ananas",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "tofu_tempeh",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 15,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "tempeh",
        "quantitaG": 400
      },
      {
        "ingredientId": "peperone",
        "quantitaG": 300
      },
      {
        "ingredientId": "ananas",
        "quantitaG": 200
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 80
      },
      {
        "ingredientId": "concentrato_pomodoro",
        "quantitaG": 20
      },
      {
        "ingredientId": "aceto",
        "quantitaG": 20
      },
      {
        "ingredientId": "zucchero_di_canna",
        "quantitaG": 15
      },
      {
        "ingredientId": "riso_basmati",
        "quantitaG": 240
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 15
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Cuoci il riso. Taglia il tempeh a cubetti e rosolalo in padella con metà dell'olio finché è dorato.",
      "Togli il tempeh e salta peperoni e cipolla a falde nell'olio rimasto per 6 minuti.",
      "Aggiungi ananas, concentrato, aceto, zucchero e mezzo bicchiere d'acqua; lascia addensare.",
      "Rimetti il tempeh, mescola e servi con il riso."
    ],
    "fonte": "seed",
    "descrizione": "Il classico agrodolce da ristorante cinese, in versione vegetale e senza glutine.",
    "costoStimatoPorzione": 2.6
  },
  {
    "id": "n036",
    "titolo": "Pasta e lenticchie",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 35,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 280
      },
      {
        "ingredientId": "lenticchie_secche",
        "quantitaG": 200
      },
      {
        "ingredientId": "carota",
        "quantitaG": 80
      },
      {
        "ingredientId": "sedano",
        "quantitaG": 60
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 60
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 200
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 1
      },
      {
        "ingredientId": "sale",
        "quantitaG": 4
      }
    ],
    "passaggi": [
      "Trita carota, sedano e cipolla e soffriggili nell'olio.",
      "Aggiungi lenticchie, pelati, rosmarino e un litro d'acqua; cuoci 25 minuti.",
      "Butta la pasta direttamente nella pentola, aggiungendo acqua calda se serve, e cuocila mescolando.",
      "Lascia riposare 2 minuti: deve essere cremosa, non brodosa."
    ],
    "fonte": "seed",
    "descrizione": "Piatto della nonna in una sola pentola, vegano senza volerlo.",
    "costoStimatoPorzione": 0.9
  },
  {
    "id": "n037",
    "titolo": "Vellutata di zucca e lenticchie allo zenzero",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "zuppa",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 30,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "zucca",
        "quantitaG": 600
      },
      {
        "ingredientId": "lenticchie_secche",
        "quantitaG": 200
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 80
      },
      {
        "ingredientId": "zenzero",
        "quantitaG": 10
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 800
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "semi_zucca",
        "quantitaG": 20
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Fai appassire la cipolla nell'olio con lo zenzero grattugiato.",
      "Aggiungi zucca a cubetti, lenticchie sciacquate e il brodo; cuoci 25-30 minuti.",
      "Frulla fino a una crema liscia e regola di sale.",
      "Servi con i semi di zucca tostati."
    ],
    "fonte": "seed",
    "descrizione": "Vellutata arancione e piena di proteine: un pasto completo, non solo un primo leggero.",
    "costoStimatoPorzione": 1.3
  },
  {
    "id": "n039",
    "titolo": "Panelle palermitane con insalata",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 15,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "isole",
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
        "ingredientId": "prezzemolo",
        "quantitaG": 10
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 250
      },
      {
        "ingredientId": "insalata_lattuga",
        "quantitaG": 200
      },
      {
        "ingredientId": "sale",
        "quantitaG": 4
      }
    ],
    "passaggi": [
      "Sciogli la farina di ceci nell'acqua fredda salata senza grumi e cuoci mescolando per 15 minuti, come una polenta.",
      "Aggiungi il prezzemolo e stendi l'impasto su un tagliere unto, spesso mezzo centimetro.",
      "Quando è freddo taglialo a rettangoli e friggili nell'olio caldo finché sono dorati.",
      "Servi caldi con l'insalata."
    ],
    "fonte": "seed",
    "descrizione": "Lo street food di Palermo: solo ceci, croccanti fuori e morbidi dentro.",
    "costoStimatoPorzione": 0.9
  },
  {
    "id": "n040",
    "titolo": "Pasta alla trapanese",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 12,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 320
      },
      {
        "ingredientId": "pomodorino",
        "quantitaG": 400
      },
      {
        "ingredientId": "mandorle",
        "quantitaG": 60
      },
      {
        "ingredientId": "basilico",
        "quantitaG": 20
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 40
      },
      {
        "ingredientId": "sale",
        "quantitaG": 4
      }
    ],
    "passaggi": [
      "Tosta le mandorle in padella per 3 minuti.",
      "Frulla a crudo pomodorini, mandorle, basilico, aglio, olio e sale.",
      "Cuoci la pasta e condiscila con il pesto fuori dal fuoco."
    ],
    "fonte": "seed",
    "descrizione": "Il pesto siciliano: pomodoro crudo e mandorle, niente fornelli per il sugo.",
    "costoStimatoPorzione": 1.4
  },
  {
    "id": "n041",
    "titolo": "Insalata di quinoa, fagioli neri e avocado",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "insalatona",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "quinoa",
        "quantitaG": 240
      },
      {
        "ingredientId": "fagioli_neri_lessati",
        "quantitaG": 480
      },
      {
        "ingredientId": "mais_dolce",
        "quantitaG": 150
      },
      {
        "ingredientId": "avocado",
        "quantitaG": 200
      },
      {
        "ingredientId": "pomodorino",
        "quantitaG": 200
      },
      {
        "ingredientId": "lime",
        "quantitaG": 20
      },
      {
        "ingredientId": "cumino",
        "quantitaG": 2
      },
      {
        "ingredientId": "coriandolo_fresco",
        "quantitaG": 10,
        "opzionale": true
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Sciacqua la quinoa e cuocila 15 minuti in acqua salata; lasciala raffreddare.",
      "Unisci fagioli neri e mais scolati, pomodorini a spicchi e avocado a cubetti.",
      "Condisci con lime, olio, cumino e sale; aggiungi coriandolo se ti piace."
    ],
    "fonte": "seed",
    "descrizione": "Insalatona messicana da schiscetta: tiene bene fino a sera.",
    "costoStimatoPorzione": 2.1
  },
  {
    "id": "n043",
    "titolo": "Burger di fagioli neri e quinoa",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 20,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "fagioli_neri_lessati",
        "quantitaG": 480
      },
      {
        "ingredientId": "quinoa",
        "quantitaG": 120
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 60
      },
      {
        "ingredientId": "farina_ceci",
        "quantitaG": 40
      },
      {
        "ingredientId": "cumino",
        "quantitaG": 2
      },
      {
        "ingredientId": "paprika",
        "quantitaG": 2
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "rucola",
        "quantitaG": 80
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Cuoci la quinoa e lasciala raffreddare.",
      "Schiaccia i fagioli con una forchetta lasciandone qualcuno intero, poi unisci quinoa, cipolla tritata, farina di ceci e spezie.",
      "Forma 8 burger e cuocili in forno a 200 °C per 20 minuti, girandoli a metà.",
      "Servi con la rucola, oppure in un panino."
    ],
    "fonte": "seed",
    "descrizione": "Compatti, non si sbriciolano, e si congelano già formati.",
    "costoStimatoPorzione": 1.3
  },
  {
    "id": "n044",
    "titolo": "Seitan alla pizzaiola",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "tofu_tempeh",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "seitan",
        "quantitaG": 400
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 400
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "capperi",
        "quantitaG": 15
      },
      {
        "ingredientId": "origano",
        "quantitaG": 2
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Scalda olio e aglio in padella, aggiungi i pelati schiacciati e cuoci 5 minuti.",
      "Adagia le fette di seitan nel sugo con capperi e origano.",
      "Copri e cuoci 10 minuti, girando le fette una volta."
    ],
    "fonte": "seed",
    "descrizione": "Il secondo napoletano più veloce, in versione vegetale: 20 minuti dal frigo al piatto.",
    "costoStimatoPorzione": 2.2
  },
  {
    "id": "n046",
    "titolo": "Pasta con cavolfiore, uvetta e pinoli",
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
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 320
      },
      {
        "ingredientId": "cavolfiore",
        "quantitaG": 600
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 60
      },
      {
        "ingredientId": "uvetta",
        "quantitaG": 30
      },
      {
        "ingredientId": "pinoli",
        "quantitaG": 30
      },
      {
        "ingredientId": "zafferano",
        "quantitaG": 0.2
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 30
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 4
      }
    ],
    "passaggi": [
      "Lessa le cimette di cavolfiore in acqua salata per 8 minuti; tienile da parte e usa la stessa acqua per la pasta.",
      "Soffriggi la cipolla nell'olio, aggiungi il cavolfiore, uvetta, pinoli e lo zafferano sciolto in un mestolo d'acqua.",
      "Schiaccia il cavolfiore fino a una crema grossolana.",
      "Manteca la pasta nel condimento e finisci con pangrattato tostato."
    ],
    "fonte": "seed",
    "descrizione": "La ricetta palermitana dell'inverno: dolce, salata e dorata di zafferano.",
    "costoStimatoPorzione": 1.1
  },
  {
    "id": "n047",
    "titolo": "Risotto alla zucca, salvia e nocciole",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "riso_carnaroli",
        "quantitaG": 320
      },
      {
        "ingredientId": "zucca",
        "quantitaG": 500
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 1000
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 60
      },
      {
        "ingredientId": "salvia",
        "quantitaG": 5
      },
      {
        "ingredientId": "nocciole",
        "quantitaG": 30
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Rosola metà della zucca a cubetti con la cipolla nell'olio; aggiungi il riso e tostalo.",
      "Bagna con il brodo caldo poco alla volta per 18 minuti.",
      "A metà cottura unisci il resto della zucca, che si scioglierà e farà da mantecatura.",
      "Spegni, manteca con un filo d'olio e servi con la salvia saltata in padella e le nocciole tritate."
    ],
    "fonte": "seed",
    "descrizione": "Cremoso senza burro né formaggio: la zucca fa tutto il lavoro.",
    "costoStimatoPorzione": 1.5
  },
  {
    "id": "n048",
    "titolo": "Pasta e patate al rosmarino",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 30,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 280
      },
      {
        "ingredientId": "patata",
        "quantitaG": 500
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 60
      },
      {
        "ingredientId": "sedano",
        "quantitaG": 40
      },
      {
        "ingredientId": "carota",
        "quantitaG": 40
      },
      {
        "ingredientId": "concentrato_pomodoro",
        "quantitaG": 20
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 700
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 2
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Soffriggi cipolla, sedano e carota tritati nell'olio con il rosmarino.",
      "Aggiungi le patate a cubetti e il concentrato, poi il brodo; cuoci 15 minuti.",
      "Butta la pasta nella pentola e cuocila assorbendo il liquido, mescolando spesso.",
      "Spegni quando è cremosa e lascia riposare un minuto."
    ],
    "fonte": "seed",
    "descrizione": "Piatto povero napoletano: patate che si sfaldano e pasta azzeccata.",
    "costoStimatoPorzione": 0.8
  },
  {
    "id": "n051",
    "titolo": "Insalata di farro, ceci, zucca e melagrana",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "insalatona",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "farro_perlato",
        "quantitaG": 240
      },
      {
        "ingredientId": "ceci_lessati",
        "quantitaG": 480
      },
      {
        "ingredientId": "zucca",
        "quantitaG": 500
      },
      {
        "ingredientId": "melagrana",
        "quantitaG": 150
      },
      {
        "ingredientId": "insalata_songino",
        "quantitaG": 80
      },
      {
        "ingredientId": "aceto_balsamico",
        "quantitaG": 15
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Cuoci il farro in acqua salata per 25 minuti e scolalo.",
      "Arrostisci la zucca a cubetti in forno a 200 °C per 25 minuti.",
      "Mescola farro, ceci, zucca e songino; sgrana la melagrana sopra.",
      "Condisci con olio, balsamico e sale."
    ],
    "fonte": "seed",
    "descrizione": "L'insalatona d'autunno: colorata, dolce e croccante, regge bene in schiscetta.",
    "costoStimatoPorzione": 1.7
  },
  {
    "id": "n053",
    "titolo": "Tofu alla griglia con verdure estive e salsa verde",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "leggera",
    "proteinaPrincipale": "tofu_tempeh",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "tofu",
        "quantitaG": 400
      },
      {
        "ingredientId": "zucchina",
        "quantitaG": 300
      },
      {
        "ingredientId": "peperone",
        "quantitaG": 300
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 20
      },
      {
        "ingredientId": "capperi",
        "quantitaG": 10
      },
      {
        "ingredientId": "aceto",
        "quantitaG": 10
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Taglia tofu, zucchine e peperoni a fette e grigliali sulla piastra ben calda.",
      "Trita prezzemolo e capperi e mescolali con olio, aceto e sale.",
      "Servi tofu e verdure con la salsa verde sopra."
    ],
    "fonte": "seed",
    "descrizione": "Grigliata leggera e proteica, senza un grammo di carne.",
    "costoStimatoPorzione": 2
  },
  {
    "id": "n055",
    "titolo": "Pasta senza glutine con zucchine, menta e mandorle",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 12,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "pasta_senza_glutine",
        "quantitaG": 320
      },
      {
        "ingredientId": "zucchina",
        "quantitaG": 500
      },
      {
        "ingredientId": "menta",
        "quantitaG": 10
      },
      {
        "ingredientId": "mandorle",
        "quantitaG": 40
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 4
      }
    ],
    "passaggi": [
      "Taglia le zucchine a rondelle sottili e saltale in padella con aglio e olio per 8 minuti.",
      "Tosta le mandorle a lamelle.",
      "Cuoci la pasta, mantecala con le zucchine e un mestolo d'acqua di cottura.",
      "Finisci con menta fresca spezzettata e mandorle."
    ],
    "fonte": "seed",
    "descrizione": "Primo estivo leggero, pensato già senza glutine.",
    "costoStimatoPorzione": 1.6
  },
  {
    "id": "n056",
    "titolo": "Tabbouleh di quinoa e ceci",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "insalatona",
    "pesantezza": "leggera",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "quinoa",
        "quantitaG": 200
      },
      {
        "ingredientId": "ceci_lessati",
        "quantitaG": 480
      },
      {
        "ingredientId": "pomodoro",
        "quantitaG": 300
      },
      {
        "ingredientId": "cetriolo",
        "quantitaG": 200
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 60
      },
      {
        "ingredientId": "menta",
        "quantitaG": 15
      },
      {
        "ingredientId": "cipollotto",
        "quantitaG": 40
      },
      {
        "ingredientId": "lime",
        "quantitaG": 20
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Cuoci la quinoa e lasciala raffreddare.",
      "Trita finemente prezzemolo e menta; taglia pomodori e cetrioli a dadini piccoli.",
      "Mescola tutto con i ceci e il cipollotto affettato.",
      "Condisci con lime, olio e sale; lascia insaporire 15 minuti."
    ],
    "fonte": "seed",
    "descrizione": "Tantissime erbe, freschezza pura: perfetta per i pranzi d'estate fuori casa.",
    "costoStimatoPorzione": 1.5
  },
  {
    "id": "n059",
    "titolo": "Pasta con piselli freschi e menta",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 20,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 280
      },
      {
        "ingredientId": "pisello_fresco",
        "quantitaG": 400
      },
      {
        "ingredientId": "cipollotto",
        "quantitaG": 60
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 500
      },
      {
        "ingredientId": "menta",
        "quantitaG": 5
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Fai appassire il cipollotto nell'olio, aggiungi i piselli e un mestolo di brodo; cuoci 10 minuti.",
      "Aggiungi il resto del brodo e porta a bollore.",
      "Cuoci la pasta direttamente nel condimento, mescolando.",
      "Finisci con menta fresca."
    ],
    "fonte": "seed",
    "descrizione": "Primavera nel piatto: piselli dolci appena sgranati.",
    "costoStimatoPorzione": 1.4
  },
  {
    "id": "n060",
    "titolo": "Insalata di quinoa con fave, piselli e asparagi",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "insalatona",
    "pesantezza": "leggera",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 15,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "quinoa",
        "quantitaG": 200
      },
      {
        "ingredientId": "fava_fresca",
        "quantitaG": 400
      },
      {
        "ingredientId": "pisello_fresco",
        "quantitaG": 300
      },
      {
        "ingredientId": "asparago",
        "quantitaG": 300
      },
      {
        "ingredientId": "menta",
        "quantitaG": 5
      },
      {
        "ingredientId": "lime",
        "quantitaG": 20
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Cuoci la quinoa e lasciala raffreddare.",
      "Sbollenta fave, piselli e asparagi a tocchetti per 3 minuti, poi raffreddali in acqua fredda; spella le fave.",
      "Mescola tutto con menta, lime, olio e sale."
    ],
    "fonte": "seed",
    "descrizione": "Il meglio dell'orto di aprile e maggio in una ciotola verde.",
    "costoStimatoPorzione": 2.4
  },
  {
    "id": "n064",
    "titolo": "Shakshuka",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "uova",
        "quantitaG": 480
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 800
      },
      {
        "ingredientId": "peperone",
        "quantitaG": 200
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 100
      },
      {
        "ingredientId": "cumino",
        "quantitaG": 2
      },
      {
        "ingredientId": "paprika",
        "quantitaG": 2
      },
      {
        "ingredientId": "feta",
        "quantitaG": 80,
        "opzionale": true
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Fai appassire cipolla e peperone nell'olio, aggiungi cumino e paprika.",
      "Unisci i pelati schiacciati e cuoci 15 minuti finché il sugo è denso.",
      "Scava delle conche e rompici dentro le uova; copri e cuoci 6-8 minuti.",
      "Sbriciola la feta sopra, se ti piace."
    ],
    "fonte": "seed",
    "descrizione": "Uova nel sugo speziato dal Nord Africa: si porta in tavola nella padella.",
    "costoStimatoPorzione": 1.5
  },
  {
    "id": "n066",
    "titolo": "Insalata di quinoa, anguria, feta e menta",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "insalatona",
    "pesantezza": "leggera",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "quinoa",
        "quantitaG": 200
      },
      {
        "ingredientId": "anguria",
        "quantitaG": 500
      },
      {
        "ingredientId": "feta",
        "quantitaG": 200
      },
      {
        "ingredientId": "cetriolo",
        "quantitaG": 200
      },
      {
        "ingredientId": "menta",
        "quantitaG": 10
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Cuoci la quinoa e falla raffreddare.",
      "Taglia anguria, cetriolo e feta a cubetti.",
      "Mescola con la quinoa e la menta, condisci con olio e poco sale."
    ],
    "fonte": "seed",
    "descrizione": "Dolce e salato insieme: l'insalata più rinfrescante d'agosto.",
    "costoStimatoPorzione": 1.9
  },
  {
    "id": "n069",
    "titolo": "Orzotto con piselli, menta e ricotta salata",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "orzo_perlato",
        "quantitaG": 320
      },
      {
        "ingredientId": "pisello_fresco",
        "quantitaG": 300
      },
      {
        "ingredientId": "cipollotto",
        "quantitaG": 50
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 900
      },
      {
        "ingredientId": "menta",
        "quantitaG": 5
      },
      {
        "ingredientId": "ricotta_salata",
        "quantitaG": 60
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Fai appassire il cipollotto nell'olio, aggiungi l'orzo e tostalo.",
      "Bagna con il brodo caldo poco alla volta per 20 minuti.",
      "A metà cottura aggiungi i piselli.",
      "Spegni, aggiungi menta e servi con ricotta salata grattugiata."
    ],
    "fonte": "seed",
    "descrizione": "Più rustico di un risotto e più facile: l'orzo non scuoce.",
    "costoStimatoPorzione": 1.4
  },
  {
    "id": "n070",
    "titolo": "Spaghetti cacio e pepe",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 12,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": false,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "spaghetti",
        "quantitaG": 320
      },
      {
        "ingredientId": "pecorino",
        "quantitaG": 120
      },
      {
        "ingredientId": "pepe",
        "quantitaG": 4
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Cuoci gli spaghetti in poca acqua salata.",
      "Tosta il pepe macinato grosso in una padella larga e allungalo con un mestolo d'acqua di cottura.",
      "Mescola il pecorino con poca acqua tiepida fino a una crema.",
      "Scola la pasta al dente nella padella, togli dal fuoco e manteca con la crema di pecorino."
    ],
    "fonte": "seed",
    "descrizione": "Tre ingredienti e un po' di tecnica: il primo romano per eccellenza.",
    "costoStimatoPorzione": 1.3
  },
  {
    "id": "n071",
    "titolo": "Insalata di patate, fagiolini e uova",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "insalatona",
    "pesantezza": "media",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 20,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "patata",
        "quantitaG": 500
      },
      {
        "ingredientId": "fagiolino",
        "quantitaG": 400
      },
      {
        "ingredientId": "uova",
        "quantitaG": 240
      },
      {
        "ingredientId": "pomodorino",
        "quantitaG": 200
      },
      {
        "ingredientId": "olive_nere",
        "quantitaG": 50
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "aceto",
        "quantitaG": 10
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Lessa le patate a cubetti 12 minuti e i fagiolini 8 minuti.",
      "Rassoda le uova per 9 minuti e tagliale a spicchi.",
      "Unisci tutto con pomodorini e olive.",
      "Condisci con olio, aceto e sale."
    ],
    "fonte": "seed",
    "descrizione": "Una nizzarda senza tonno, completa e da portare in spiaggia.",
    "costoStimatoPorzione": 1.5
  },
  {
    "id": "n073",
    "titolo": "Melanzane a beccafico",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 25,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "melanzana",
        "quantitaG": 800
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 100
      },
      {
        "ingredientId": "pecorino",
        "quantitaG": 50
      },
      {
        "ingredientId": "pinoli",
        "quantitaG": 20
      },
      {
        "ingredientId": "uvetta",
        "quantitaG": 20
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 10
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 300
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Taglia le melanzane a fette sottili per il lungo e grigliale.",
      "Mescola pangrattato tostato, pecorino, pinoli, uvetta e prezzemolo con un filo d'olio.",
      "Metti un cucchiaio di ripieno su ogni fetta e arrotola.",
      "Disponi gli involtini sulla passata in una teglia e cuoci a 180 °C per 20 minuti."
    ],
    "fonte": "seed",
    "descrizione": "Gli involtini siciliani agrodolci: si fanno al mattino e si mangiano la sera.",
    "costoStimatoPorzione": 1.7
  },
  {
    "id": "n075",
    "titolo": "Pasta con alici fresche, pomodorini e mollica",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 15,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 320
      },
      {
        "ingredientId": "alici_fresche",
        "quantitaG": 300
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
        "ingredientId": "prezzemolo",
        "quantitaG": 10
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 30
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Pulisci le alici togliendo testa e lisca.",
      "Fai saltare aglio e pomodorini tagliati a metà nell'olio per 5 minuti.",
      "Unisci le alici e cuocile 3 minuti, sfaldandole con il cucchiaio.",
      "Manteca la pasta nel condimento e finisci con prezzemolo e pangrattato tostato."
    ],
    "fonte": "seed",
    "descrizione": "Pesce azzurro di stagione e pomodorini: il primo di mare più economico dell'estate.",
    "costoStimatoPorzione": 1.9
  },
  {
    "id": "n080",
    "titolo": "Risotto ai gamberi e zucchine",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 20,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "riso_carnaroli",
        "quantitaG": 320
      },
      {
        "ingredientId": "gamberi",
        "quantitaG": 400
      },
      {
        "ingredientId": "zucchina",
        "quantitaG": 300
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 50
      },
      {
        "ingredientId": "vino_bianco",
        "quantitaG": 50
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 1000
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Sguscia i gamberi e saltali 2 minuti in padella; tienili da parte.",
      "Rosola cipolla e zucchine a cubetti, aggiungi il riso e sfuma con il vino.",
      "Cuoci con il brodo caldo poco alla volta per 17 minuti.",
      "Unisci i gamberi alla fine e manteca con un filo d'olio."
    ],
    "fonte": "seed",
    "descrizione": "Delicato ed estivo, senza burro né formaggio.",
    "costoStimatoPorzione": 3.6
  },
  {
    "id": "n081",
    "titolo": "Couscous di pesce alla trapanese",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 25,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "couscous",
        "quantitaG": 280
      },
      {
        "ingredientId": "misto_mare_surgelato",
        "quantitaG": 500
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 300
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 60
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 3
      },
      {
        "ingredientId": "zafferano",
        "quantitaG": 0.2
      },
      {
        "ingredientId": "peperoncino_essiccato",
        "quantitaG": 1
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 400
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Soffriggi cipolla e aglio nell'olio, aggiungi pelati, peperoncino e zafferano e cuoci 10 minuti.",
      "Unisci il misto mare e cuoci 8 minuti.",
      "Scalda il brodo, versalo sul couscous con un filo d'olio, copri e lascia gonfiare 5 minuti.",
      "Sgrana il couscous e condiscilo con il sugo di pesce."
    ],
    "fonte": "seed",
    "descrizione": "Il piatto di San Vito Lo Capo in versione di casa, con il misto mare.",
    "costoStimatoPorzione": 3.2
  },
  {
    "id": "n085",
    "titolo": "Polpette di tonno e ricotta con insalata di finocchi",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 20,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "tonno_in_scatola",
        "quantitaG": 320
      },
      {
        "ingredientId": "ricotta",
        "quantitaG": 250
      },
      {
        "ingredientId": "uova",
        "quantitaG": 60
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 60
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 10
      },
      {
        "ingredientId": "finocchio",
        "quantitaG": 400
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Scola bene il tonno e schiaccialo con la ricotta.",
      "Aggiungi uovo, pangrattato e prezzemolo e forma delle polpette.",
      "Disponile su una teglia, ungile appena e cuoci a 200 °C per 20 minuti.",
      "Servi con i finocchi affettati sottili, conditi con olio e sale."
    ],
    "fonte": "seed",
    "descrizione": "Morbide, si fanno con la dispensa e piacciono a tutti, bambini compresi.",
    "costoStimatoPorzione": 1.7
  },
  {
    "id": "n087",
    "titolo": "Poke bowl di tonno, mango ed edamame",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "leggera",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 20,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "riso_per_sushi",
        "quantitaG": 280
      },
      {
        "ingredientId": "tonno_fresco",
        "quantitaG": 600
      },
      {
        "ingredientId": "mango",
        "quantitaG": 200
      },
      {
        "ingredientId": "edamame_surgelati",
        "quantitaG": 200
      },
      {
        "ingredientId": "cetriolo",
        "quantitaG": 200
      },
      {
        "ingredientId": "sesamo",
        "quantitaG": 10
      },
      {
        "ingredientId": "lime",
        "quantitaG": 20
      },
      {
        "ingredientId": "salsa_soia",
        "quantitaG": 30,
        "opzionale": true,
        "nota": "Per la versione senza glutine usa tamari"
      },
      {
        "ingredientId": "aceto",
        "quantitaG": 10
      }
    ],
    "passaggi": [
      "Cuoci il riso, condiscilo con l'aceto e lascialo intiepidire.",
      "Taglia il tonno a cubetti e marinalo con lime e salsa di soia per 10 minuti.",
      "Sbollenta gli edamame e taglia mango e cetriolo a cubetti.",
      "Componi le bowl e finisci con il sesamo."
    ],
    "fonte": "seed",
    "descrizione": "Fresca, colorata e completa: il pranzo estivo da portare in ufficio.",
    "costoStimatoPorzione": 5.2
  },
  {
    "id": "n090",
    "titolo": "Pasta alla gricia",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "carne_rossa",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 15,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": false,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 320
      },
      {
        "ingredientId": "guanciale",
        "quantitaG": 150
      },
      {
        "ingredientId": "pecorino",
        "quantitaG": 80
      },
      {
        "ingredientId": "pepe",
        "quantitaG": 3
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Taglia il guanciale a listarelle e rosolalo in padella senza olio finché è croccante.",
      "Cuoci la pasta e tienine da parte un po' d'acqua.",
      "Salta la pasta nel grasso del guanciale con un mestolo d'acqua.",
      "Fuori dal fuoco manteca con pecorino e pepe."
    ],
    "fonte": "seed",
    "descrizione": "La madre dell'amatriciana e della carbonara: guanciale, pecorino e pepe.",
    "costoStimatoPorzione": 1.9
  },
  {
    "id": "n094",
    "titolo": "Polpette di manzo e ricotta al forno",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "carne_rossa",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 20,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "manzo_macinato",
        "quantitaG": 500
      },
      {
        "ingredientId": "ricotta",
        "quantitaG": 150
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 40
      },
      {
        "ingredientId": "uova",
        "quantitaG": 60
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 40
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 10
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 10
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Mescola carne, ricotta, parmigiano, uovo, pangrattato, prezzemolo e sale.",
      "Forma polpette grandi come una noce e mettile su una teglia foderata.",
      "Ungile appena e cuoci a 200 °C per 20 minuti."
    ],
    "fonte": "seed",
    "descrizione": "La ricotta le rende morbidissime anche senza friggerle.",
    "costoStimatoPorzione": 2.4
  },
  {
    "id": "n096",
    "titolo": "Spiedini di pollo e peperoni con salsa allo yogurt",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "leggera",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "petto_pollo",
        "quantitaG": 560
      },
      {
        "ingredientId": "peperone",
        "quantitaG": 300
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 100
      },
      {
        "ingredientId": "yogurt_greco",
        "quantitaG": 150
      },
      {
        "ingredientId": "origano",
        "quantitaG": 2
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Taglia pollo, peperoni e cipolla a pezzi regolari e infilali negli spiedini.",
      "Condisci con olio, origano e sale e cuoci sulla griglia 12-15 minuti, girandoli.",
      "Mescola lo yogurt con aglio grattugiato e sale e servilo a parte."
    ],
    "fonte": "seed",
    "descrizione": "Grigliata estiva leggera, perfetta anche per il barbecue.",
    "costoStimatoPorzione": 2.5
  },
  {
    "id": "n100",
    "titolo": "Insalata di pollo, finocchi, mele e noci",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "insalatona",
    "pesantezza": "leggera",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 12,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "petto_pollo",
        "quantitaG": 480
      },
      {
        "ingredientId": "finocchio",
        "quantitaG": 300
      },
      {
        "ingredientId": "mela",
        "quantitaG": 200
      },
      {
        "ingredientId": "noci",
        "quantitaG": 40
      },
      {
        "ingredientId": "insalata_songino",
        "quantitaG": 60
      },
      {
        "ingredientId": "yogurt_greco",
        "quantitaG": 100
      },
      {
        "ingredientId": "senape",
        "quantitaG": 10
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Cuoci il petto di pollo sulla piastra 6 minuti per lato, poi taglialo a striscioline.",
      "Taglia finocchio e mela a fettine sottili.",
      "Mescola yogurt, senape, olio e sale per la salsa.",
      "Componi l'insalata con songino, pollo, mela e noci e condisci."
    ],
    "fonte": "seed",
    "descrizione": "Insalatona proteica e croccante, ottima da portare al lavoro.",
    "costoStimatoPorzione": 2.4
  }
];

export const RICETTE_EXTRA_CENA: Recipe[] = [
  {
    "id": "n033",
    "titolo": "Dal di lenticchie al latte di cocco",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 30,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "lenticchie_secche",
        "quantitaG": 240
      },
      {
        "ingredientId": "latte_cocco",
        "quantitaG": 200
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 300
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 100
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "zenzero",
        "quantitaG": 10
      },
      {
        "ingredientId": "curcuma",
        "quantitaG": 3
      },
      {
        "ingredientId": "cumino",
        "quantitaG": 3
      },
      {
        "ingredientId": "riso_basmati",
        "quantitaG": 240
      },
      {
        "ingredientId": "coriandolo_fresco",
        "quantitaG": 10,
        "opzionale": true
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "sale",
        "quantitaG": 4
      }
    ],
    "passaggi": [
      "Fai appassire cipolla, aglio e zenzero tritati nell'olio con curcuma e cumino.",
      "Aggiungi le lenticchie sciacquate, i pelati e 600 ml d'acqua; cuoci 25 minuti mescolando ogni tanto.",
      "Unisci il latte di cocco e lascia addensare 5 minuti.",
      "Intanto cuoci il riso basmati; servi il dal sopra il riso con coriandolo fresco."
    ],
    "fonte": "seed",
    "descrizione": "Il comfort food indiano: cremoso, profumato, ancora più buono il giorno dopo.",
    "costoStimatoPorzione": 1.3
  },
  {
    "id": "n034",
    "titolo": "Tofu croccante al forno con broccoli e salsa di arachidi",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "tofu_tempeh",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 25,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "tofu",
        "quantitaG": 400
      },
      {
        "ingredientId": "broccolo",
        "quantitaG": 500
      },
      {
        "ingredientId": "riso_integrale",
        "quantitaG": 240
      },
      {
        "ingredientId": "burro_arachidi",
        "quantitaG": 40
      },
      {
        "ingredientId": "lime",
        "quantitaG": 20
      },
      {
        "ingredientId": "zenzero",
        "quantitaG": 5
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 15
      },
      {
        "ingredientId": "farina_riso",
        "quantitaG": 15
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Metti a cuocere il riso integrale. Accendi il forno a 210 °C.",
      "Taglia il tofu a cubi, asciugalo, passalo nella farina di riso con sale e olio e infornalo 25 minuti.",
      "Dopo 10 minuti aggiungi in teglia le cimette di broccolo.",
      "Sciogli il burro di arachidi con succo di lime, zenzero grattugiato e acqua calda fino a una salsa fluida; condisci tutto."
    ],
    "fonte": "seed",
    "descrizione": "Tofu che piace anche a chi dice di odiarlo: croccante fuori, con una salsa che crea dipendenza.",
    "costoStimatoPorzione": 2.3
  },
  {
    "id": "n038",
    "titolo": "Polenta con ragù di funghi e lenticchie",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 40,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": false,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "polenta_farina",
        "quantitaG": 300
      },
      {
        "ingredientId": "fungo_champignon",
        "quantitaG": 400
      },
      {
        "ingredientId": "lenticchie_lessate",
        "quantitaG": 480
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 300
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 80
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 2
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "sale",
        "quantitaG": 5
      }
    ],
    "passaggi": [
      "Porta a bollore 1,2 litri d'acqua salata, versa la farina a pioggia e cuoci la polenta mescolando per 40 minuti (o il tempo indicato).",
      "Intanto rosola cipolla e funghi a fettine nell'olio finché perdono l'acqua.",
      "Aggiungi lenticchie, passata e rosmarino e cuoci 20 minuti.",
      "Servi la polenta morbida con il ragù sopra."
    ],
    "fonte": "seed",
    "descrizione": "Il piatto da domenica d'inverno, ma vegano e senza glutine.",
    "costoStimatoPorzione": 1.6
  },
  {
    "id": "n042",
    "titolo": "Chili sin carne con riso",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 35,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "fagioli_neri_lessati",
        "quantitaG": 500
      },
      {
        "ingredientId": "peperone",
        "quantitaG": 200
      },
      {
        "ingredientId": "mais_dolce",
        "quantitaG": 150
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 400
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 100
      },
      {
        "ingredientId": "cumino",
        "quantitaG": 3
      },
      {
        "ingredientId": "paprika",
        "quantitaG": 3
      },
      {
        "ingredientId": "peperoncino_essiccato",
        "quantitaG": 1
      },
      {
        "ingredientId": "riso_basmati",
        "quantitaG": 240
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "sale",
        "quantitaG": 4
      }
    ],
    "passaggi": [
      "Soffriggi cipolla e peperone a cubetti nell'olio.",
      "Aggiungi cumino, paprika e peperoncino e tosta per un minuto.",
      "Unisci pelati, fagioli e mais; cuoci 30 minuti finché è denso.",
      "Servi con il riso basmati."
    ],
    "fonte": "seed",
    "descrizione": "Speziato al punto giusto, si congela in porzioni: cena pronta per le sere di fretta.",
    "costoStimatoPorzione": 1.4
  },
  {
    "id": "n045",
    "titolo": "Spezzatino di seitan con patate e piselli",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "tofu_tempeh",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 30,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "seitan",
        "quantitaG": 400
      },
      {
        "ingredientId": "patata",
        "quantitaG": 400
      },
      {
        "ingredientId": "pisello_fresco",
        "quantitaG": 200
      },
      {
        "ingredientId": "carota",
        "quantitaG": 100
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 80
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 200
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 2
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "sale",
        "quantitaG": 4
      }
    ],
    "passaggi": [
      "Rosola cipolla e carota a cubetti nell'olio.",
      "Aggiungi il seitan a bocconcini e rosolalo 3 minuti.",
      "Unisci patate a cubetti, passata, rosmarino e un bicchiere d'acqua; cuoci coperto 20 minuti.",
      "Aggiungi i piselli e cuoci altri 8 minuti."
    ],
    "fonte": "seed",
    "descrizione": "Lo spezzatino della domenica, con lo stesso sughetto da scarpetta.",
    "costoStimatoPorzione": 2.1
  },
  {
    "id": "n049",
    "titolo": "Ribollita",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "zuppa",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 60,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": true,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "pane_raffermo",
        "quantitaG": 200
      },
      {
        "ingredientId": "cavolo_nero",
        "quantitaG": 300
      },
      {
        "ingredientId": "cavolo_verza",
        "quantitaG": 200
      },
      {
        "ingredientId": "fagioli_cannellini_lessati",
        "quantitaG": 480
      },
      {
        "ingredientId": "carota",
        "quantitaG": 80
      },
      {
        "ingredientId": "sedano",
        "quantitaG": 60
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 80
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 200
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 4
      }
    ],
    "passaggi": [
      "Soffriggi carota, sedano e cipolla nell'olio; aggiungi cavolo nero e verza a striscioline.",
      "Unisci pelati, metà dei fagioli e quelli rimasti passati, più un litro d'acqua; cuoci 45 minuti.",
      "Alterna in una pentola fette di pane raffermo e zuppa, lascia riposare almeno un'ora.",
      "Riscalda (\"ribolli\") e servi con un filo d'olio crudo."
    ],
    "fonte": "seed",
    "descrizione": "Più si riscalda più è buona: si prepara la domenica e si mangia fino a mercoledì.",
    "costoStimatoPorzione": 1.3
  },
  {
    "id": "n050",
    "titolo": "Crema di cannellini e porri al rosmarino",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "zuppa",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "fagioli_cannellini_lessati",
        "quantitaG": 480
      },
      {
        "ingredientId": "porro",
        "quantitaG": 300
      },
      {
        "ingredientId": "patata",
        "quantitaG": 200
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 700
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 2
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "pane_casereccio",
        "quantitaG": 120,
        "opzionale": true,
        "nota": "Crostini, da omettere per la versione senza glutine"
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Affetta i porri e falli appassire nell'olio con il rosmarino.",
      "Aggiungi patate a cubetti, cannellini e brodo; cuoci 20 minuti.",
      "Frulla fino a una crema vellutata.",
      "Servi con crostini di pane tostato, se vuoi."
    ],
    "fonte": "seed",
    "descrizione": "Vellutata invernale delicatissima, piace anche ai bambini.",
    "costoStimatoPorzione": 1.1
  },
  {
    "id": "n052",
    "titolo": "Buddha bowl di tempeh, patate dolci e cavolo nero",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "tofu_tempeh",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "tempeh",
        "quantitaG": 300
      },
      {
        "ingredientId": "patata_dolce",
        "quantitaG": 500
      },
      {
        "ingredientId": "cavolo_nero",
        "quantitaG": 200
      },
      {
        "ingredientId": "quinoa",
        "quantitaG": 200
      },
      {
        "ingredientId": "tahina",
        "quantitaG": 40
      },
      {
        "ingredientId": "lime",
        "quantitaG": 20
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "paprika",
        "quantitaG": 2
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Arrostisci la patata dolce a cubetti con paprika e olio a 200 °C per 30 minuti; negli ultimi 15 aggiungi il tempeh a fette.",
      "Cuoci la quinoa.",
      "Massaggia il cavolo nero a striscioline con un pizzico di sale e qualche goccia di lime.",
      "Componi le bowl e condisci con tahina sciolta in lime e acqua."
    ],
    "fonte": "seed",
    "descrizione": "Bowl invernale completa: carboidrati, proteine e verdura nello stesso piatto.",
    "costoStimatoPorzione": 2.7
  },
  {
    "id": "n054",
    "titolo": "Gnocchi al pesto di cavolo nero e noci",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 10,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "gnocchi_patate",
        "quantitaG": 800
      },
      {
        "ingredientId": "cavolo_nero",
        "quantitaG": 250
      },
      {
        "ingredientId": "noci",
        "quantitaG": 40
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 40
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Sbollenta le foglie di cavolo nero senza costa per 4 minuti e raffreddale in acqua fredda.",
      "Frullale con noci, aglio, olio, sale e un goccio d'acqua di cottura.",
      "Cuoci gli gnocchi e condiscili con il pesto."
    ],
    "fonte": "seed",
    "descrizione": "Pesto d'inverno, verde scuro e profumato di noci.",
    "costoStimatoPorzione": 1.4
  },
  {
    "id": "n057",
    "titolo": "Fagioli all'uccelletto",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 20,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "fagioli_cannellini_lessati",
        "quantitaG": 720
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 300
      },
      {
        "ingredientId": "salvia",
        "quantitaG": 5
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "pane_casereccio",
        "quantitaG": 160,
        "opzionale": true,
        "nota": "Da omettere per la versione senza glutine"
      },
      {
        "ingredientId": "pepe",
        "quantitaG": 1
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Scalda l'olio con aglio schiacciato e salvia.",
      "Aggiungi la passata e cuoci 5 minuti.",
      "Unisci i fagioli scolati e cuoci 15 minuti a fuoco dolce.",
      "Servi con pepe e pane casereccio tostato."
    ],
    "fonte": "seed",
    "descrizione": "Il secondo toscano più semplice che ci sia, con la salvia che profuma tutta la cucina.",
    "costoStimatoPorzione": 1.1
  },
  {
    "id": "n058",
    "titolo": "Riso venere con tofu, funghi e verdure saltate",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "tofu_tempeh",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 40,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "riso_venere",
        "quantitaG": 280
      },
      {
        "ingredientId": "tofu",
        "quantitaG": 300
      },
      {
        "ingredientId": "fungo_champignon",
        "quantitaG": 200
      },
      {
        "ingredientId": "carota",
        "quantitaG": 150
      },
      {
        "ingredientId": "piselli_surgelati",
        "quantitaG": 150
      },
      {
        "ingredientId": "zenzero",
        "quantitaG": 5
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 20
      },
      {
        "ingredientId": "salsa_soia",
        "quantitaG": 20,
        "opzionale": true,
        "nota": "Per la versione senza glutine usa tamari"
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Cuoci il riso venere per 35-40 minuti e scolalo.",
      "Salta il tofu a cubetti nell'olio finché è dorato e tienilo da parte.",
      "Nella stessa padella salta carote a julienne, funghi e piselli con lo zenzero.",
      "Unisci riso e tofu, condisci con salsa di soia e servi."
    ],
    "fonte": "seed",
    "descrizione": "Il riso nero aromatico incontra il saltato asiatico: ottimo anche freddo.",
    "costoStimatoPorzione": 2.2
  },
  {
    "id": "n061",
    "titolo": "Gnocchi alla sorrentina",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": true,
    "trasportabile": false,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "gnocchi_patate",
        "quantitaG": 800
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 500
      },
      {
        "ingredientId": "mozzarella",
        "quantitaG": 250
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 30
      },
      {
        "ingredientId": "basilico",
        "quantitaG": 10
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Cuoci la passata con olio e sale per 10 minuti.",
      "Lessa gli gnocchi e scolali appena salgono a galla.",
      "Condiscili con il sugo e metà della mozzarella, versali in una pirofila e copri con il resto di mozzarella e parmigiano.",
      "Gratina in forno a 220 °C per 10 minuti e finisci con il basilico."
    ],
    "fonte": "seed",
    "descrizione": "Filanti, al forno, irresistibili: il piatto della domenica a Sorrento.",
    "costoStimatoPorzione": 1.8
  },
  {
    "id": "n062",
    "titolo": "Frittata al forno con porri e grana",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "uova",
        "quantitaG": 480
      },
      {
        "ingredientId": "porro",
        "quantitaG": 400
      },
      {
        "ingredientId": "grana",
        "quantitaG": 50
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      },
      {
        "ingredientId": "pepe",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Affetta i porri e stufali in padella con l'olio per 10 minuti.",
      "Sbatti le uova con grana, sale e pepe e uniscile ai porri.",
      "Versa in una teglia foderata e cuoci a 180 °C per 20 minuti."
    ],
    "fonte": "seed",
    "descrizione": "Al forno, senza girarla: alta, morbida e da tagliare a quadrotti.",
    "costoStimatoPorzione": 1.4
  },
  {
    "id": "n063",
    "titolo": "Crespelle ricotta e spinaci",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 30,
    "tempoCotturaMin": 25,
    "difficolta": 3,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "farina_00",
        "quantitaG": 125
      },
      {
        "ingredientId": "latte",
        "quantitaG": 250
      },
      {
        "ingredientId": "uova",
        "quantitaG": 120
      },
      {
        "ingredientId": "ricotta",
        "quantitaG": 400
      },
      {
        "ingredientId": "spinaci_freschi",
        "quantitaG": 400
      },
      {
        "ingredientId": "besciamella",
        "quantitaG": 250
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 40
      },
      {
        "ingredientId": "noce_moscata",
        "quantitaG": 0.5
      },
      {
        "ingredientId": "burro",
        "quantitaG": 10
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Sbatti farina, latte e uova fino a una pastella liscia e cuoci 8 crespelle sottili in padella imburrata.",
      "Cuoci gli spinaci, strizzali, tritali e mescolali con ricotta, metà del parmigiano, sale e noce moscata.",
      "Farcisci le crespelle, arrotolale e disponile in una pirofila con la besciamella.",
      "Copri con il parmigiano rimasto e gratina a 200 °C per 20 minuti."
    ],
    "fonte": "seed",
    "descrizione": "Il primo delle feste che si prepara anche il giorno prima.",
    "costoStimatoPorzione": 1.9
  },
  {
    "id": "n065",
    "titolo": "Polenta concia",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 40,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "polenta_farina",
        "quantitaG": 300
      },
      {
        "ingredientId": "burro",
        "quantitaG": 40
      },
      {
        "ingredientId": "taleggio",
        "quantitaG": 150
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 60
      },
      {
        "ingredientId": "sale",
        "quantitaG": 5
      }
    ],
    "passaggi": [
      "Cuoci la polenta in 1,2 litri d'acqua salata, mescolando, per 40 minuti (o il tempo indicato).",
      "Spegni e incorpora il burro, il taleggio a pezzi e il parmigiano.",
      "Mescola finché i formaggi si sciolgono e servi subito."
    ],
    "fonte": "seed",
    "descrizione": "Il piatto valdostano delle serate fredde: polenta e formaggi che filano.",
    "costoStimatoPorzione": 1.6
  },
  {
    "id": "n067",
    "titolo": "Zucchine ripiene di ricotta e menta",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "zucchina",
        "quantitaG": 800
      },
      {
        "ingredientId": "ricotta",
        "quantitaG": 300
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 40
      },
      {
        "ingredientId": "uova",
        "quantitaG": 60
      },
      {
        "ingredientId": "menta",
        "quantitaG": 5
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 30
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Taglia le zucchine a metà per il lungo e scava la polpa.",
      "Trita la polpa, saltala 5 minuti in padella e mescolala con ricotta, parmigiano, uovo e menta.",
      "Riempi le barchette, cospargi di pangrattato e un filo d'olio.",
      "Cuoci a 190 °C per 25-30 minuti."
    ],
    "fonte": "seed",
    "descrizione": "Le barchette dell'estate, buone anche a temperatura ambiente.",
    "costoStimatoPorzione": 1.6
  },
  {
    "id": "n068",
    "titolo": "Sformato di broccoli e ricotta",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "broccolo",
        "quantitaG": 600
      },
      {
        "ingredientId": "ricotta",
        "quantitaG": 250
      },
      {
        "ingredientId": "uova",
        "quantitaG": 120
      },
      {
        "ingredientId": "grana",
        "quantitaG": 40
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 20
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 10
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Lessa le cimette di broccolo 6 minuti e scolale bene.",
      "Frulla grossolanamente i broccoli con ricotta, uova, grana e sale.",
      "Versa in una pirofila unta e cosparsa di pangrattato.",
      "Cuoci a 180 °C per 30 minuti e lascia riposare 5 minuti prima di tagliare."
    ],
    "fonte": "seed",
    "descrizione": "Il modo per far mangiare i broccoli a chi non li vuole.",
    "costoStimatoPorzione": 1.5
  },
  {
    "id": "n072",
    "titolo": "Involtini di verza con riso e scamorza",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 30,
    "tempoCotturaMin": 35,
    "difficolta": 3,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "cavolo_verza",
        "quantitaG": 500
      },
      {
        "ingredientId": "riso_carnaroli",
        "quantitaG": 200
      },
      {
        "ingredientId": "scamorza",
        "quantitaG": 150
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 30
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 300
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "sale",
        "quantitaG": 4
      }
    ],
    "passaggi": [
      "Sbollenta 12 foglie di verza per 2 minuti ed elimina la costa centrale.",
      "Lessa il riso per 10 minuti, scolalo e mescolalo con scamorza a cubetti e parmigiano.",
      "Farcisci le foglie, chiudile a pacchetto e disponile in pirofila sopra la passata.",
      "Cuoci coperto a 180 °C per 25 minuti, poi scoperto per altri 10."
    ],
    "fonte": "seed",
    "descrizione": "Pacchetti morbidi e filanti, un piatto d'altri tempi che si congela benissimo.",
    "costoStimatoPorzione": 1.4
  },
  {
    "id": "n074",
    "titolo": "Pane frattau",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 15,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": false,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "pane_carasau",
        "quantitaG": 200
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 400
      },
      {
        "ingredientId": "uova",
        "quantitaG": 240
      },
      {
        "ingredientId": "pecorino",
        "quantitaG": 80
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 300
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Cuoci la passata con olio e sale per 10 minuti; intanto scalda il brodo.",
      "Bagna velocemente i fogli di carasau nel brodo caldo.",
      "Componi strati di carasau, sugo e pecorino in ogni piatto.",
      "Completa con un uovo in camicia sopra e altro pecorino."
    ],
    "fonte": "seed",
    "descrizione": "La lasagna dei pastori sardi: pane carasau, sugo e uovo in camicia.",
    "costoStimatoPorzione": 1.5
  },
  {
    "id": "n076",
    "titolo": "Sgombro al forno con patate e pomodorini",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 35,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "sgombro",
        "quantitaG": 700
      },
      {
        "ingredientId": "patata",
        "quantitaG": 600
      },
      {
        "ingredientId": "pomodorino",
        "quantitaG": 250
      },
      {
        "ingredientId": "origano",
        "quantitaG": 2
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Taglia le patate a spicchi, condiscile con olio e sale e infornale a 200 °C per 15 minuti.",
      "Aggiungi i pomodorini e i filetti di sgombro, con origano e un filo d'olio.",
      "Cuoci altri 15-20 minuti."
    ],
    "fonte": "seed",
    "descrizione": "Pesce azzurro, economico e ricco di omega-3: un'unica teglia.",
    "costoStimatoPorzione": 2.6
  },
  {
    "id": "n077",
    "titolo": "Calamari ripieni con piselli",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 30,
    "tempoCotturaMin": 35,
    "difficolta": 3,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "calamari",
        "quantitaG": 700
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 80
      },
      {
        "ingredientId": "uova",
        "quantitaG": 60
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 15
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 300
      },
      {
        "ingredientId": "pisello_fresco",
        "quantitaG": 300
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Pulisci i calamari tenendo interi i corpi; trita finemente i tentacoli.",
      "Rosola i tentacoli con aglio e olio, poi mescolali con pangrattato, uovo e prezzemolo.",
      "Riempi i calamari per tre quarti e chiudili con uno stecchino.",
      "Cuocili nella passata per 20 minuti a fuoco dolce, coperti, poi aggiungi i piselli e cuoci altri 10 minuti."
    ],
    "fonte": "seed",
    "descrizione": "Il secondo di pesce della festa, morbidissimo nel sugo.",
    "costoStimatoPorzione": 3.8
  },
  {
    "id": "n078",
    "titolo": "Salmone in crosta di sesamo con spinaci",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "salmone_fresco",
        "quantitaG": 640
      },
      {
        "ingredientId": "sesamo",
        "quantitaG": 40
      },
      {
        "ingredientId": "spinaci_freschi",
        "quantitaG": 400
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "lime",
        "quantitaG": 15
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Passa i tranci di salmone nel sesamo premendo bene.",
      "Cuoci in padella con un filo d'olio, 4 minuti dal lato del sesamo e 3 dall'altro.",
      "Nella stessa padella salta gli spinaci con aglio per 2 minuti.",
      "Servi con qualche goccia di lime."
    ],
    "fonte": "seed",
    "descrizione": "Crosticina tostata e cuore morbido, pronto in un quarto d'ora.",
    "costoStimatoPorzione": 4.8
  },
  {
    "id": "n079",
    "titolo": "Baccalà con ceci e rosmarino",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "baccala_ammollato",
        "quantitaG": 640
      },
      {
        "ingredientId": "ceci_lessati",
        "quantitaG": 480
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 200
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 2
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Scalda olio, aglio e rosmarino; aggiungi i pelati e cuoci 5 minuti.",
      "Unisci i ceci e un mestolo d'acqua e cuoci 10 minuti.",
      "Adagia il baccalà a pezzi nel sugo, copri e cuoci 10 minuti senza mescolare."
    ],
    "fonte": "seed",
    "descrizione": "Mare e terra nella stessa pentola: un classico del Sud.",
    "costoStimatoPorzione": 3.5
  },
  {
    "id": "n082",
    "titolo": "Tacos di merluzzo con verza e lime",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 10,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": false,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "tortilla_grano",
        "quantitaG": 320
      },
      {
        "ingredientId": "merluzzo",
        "quantitaG": 600
      },
      {
        "ingredientId": "cavolo_verza",
        "quantitaG": 200
      },
      {
        "ingredientId": "lime",
        "quantitaG": 30
      },
      {
        "ingredientId": "yogurt_greco",
        "quantitaG": 100
      },
      {
        "ingredientId": "paprika",
        "quantitaG": 2
      },
      {
        "ingredientId": "cumino",
        "quantitaG": 1
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Condisci il merluzzo con paprika, cumino, sale e olio e cuocilo in padella 3 minuti per lato; sfaldalo.",
      "Taglia la verza a striscioline finissime e condiscila con lime e sale.",
      "Mescola lo yogurt con un po' di lime.",
      "Scalda le tortillas e farciscile con pesce, verza e salsa."
    ],
    "fonte": "seed",
    "descrizione": "Cena da mangiare con le mani: croccante, fresca e veloce.",
    "costoStimatoPorzione": 3.1
  },
  {
    "id": "n083",
    "titolo": "Spaghetti con alici e mollica",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 12,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "spaghetti",
        "quantitaG": 320
      },
      {
        "ingredientId": "acciughe_sotto_sale",
        "quantitaG": 40
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 50
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "peperoncino_essiccato",
        "quantitaG": 1
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 10
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 40
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Tosta il pangrattato in padella con un filo d'olio finché è dorato.",
      "Sciogli le acciughe nell'olio con aglio e peperoncino a fuoco dolce.",
      "Cuoci gli spaghetti e saltali nel condimento con un po' d'acqua di cottura.",
      "Finisci con prezzemolo e la mollica croccante."
    ],
    "fonte": "seed",
    "descrizione": "Il primo di dispensa per eccellenza: se hai le acciughe, la cena è fatta.",
    "costoStimatoPorzione": 1
  },
  {
    "id": "n084",
    "titolo": "Tonno scottato al sesamo con finocchi e arance",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "leggera",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 5,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "tonno_fresco",
        "quantitaG": 640
      },
      {
        "ingredientId": "sesamo",
        "quantitaG": 30
      },
      {
        "ingredientId": "finocchio",
        "quantitaG": 400
      },
      {
        "ingredientId": "arancia",
        "quantitaG": 200
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Affetta sottilissimi i finocchi e pela a vivo le arance.",
      "Condisci finocchi e arance con olio e sale.",
      "Passa il tonno nel sesamo e scottalo 1 minuto per lato in padella rovente.",
      "Taglialo a fette e servilo sull'insalata."
    ],
    "fonte": "seed",
    "descrizione": "Leggero ma soddisfacente, con gli agrumi siciliani d'inverno.",
    "costoStimatoPorzione": 5.6
  },
  {
    "id": "n086",
    "titolo": "Seppie con i carciofi",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 25,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "seppie",
        "quantitaG": 700
      },
      {
        "ingredientId": "carciofo",
        "quantitaG": 500
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 10
      },
      {
        "ingredientId": "vino_bianco",
        "quantitaG": 80
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Pulisci i carciofi e tagliali a spicchi; pulisci le seppie e tagliale a striscioline.",
      "Rosola l'aglio nell'olio, aggiungi le seppie e sfuma con il vino.",
      "Unisci i carciofi e un mestolo d'acqua, copri e cuoci 25 minuti.",
      "Finisci con prezzemolo tritato."
    ],
    "fonte": "seed",
    "descrizione": "Un secondo di mare invernale, tenero e profumato.",
    "costoStimatoPorzione": 3.9
  },
  {
    "id": "n088",
    "titolo": "Orata in crosta di patate con asparagi",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 25,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "orata",
        "quantitaG": 700
      },
      {
        "ingredientId": "patata",
        "quantitaG": 500
      },
      {
        "ingredientId": "asparago",
        "quantitaG": 300
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 2
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      },
      {
        "ingredientId": "pepe",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Affetta le patate sottilissime con una mandolina.",
      "Disponi i filetti di orata in una teglia e coprili con le patate sovrapposte a squame; metti gli asparagi intorno.",
      "Condisci con olio, rosmarino, sale e pepe.",
      "Cuoci a 200 °C per 25 minuti, finché le patate sono dorate."
    ],
    "fonte": "seed",
    "descrizione": "Elegante da vedere, semplice da fare: le patate diventano croccanti sopra il pesce.",
    "costoStimatoPorzione": 4.8
  },
  {
    "id": "n089",
    "titolo": "Pollo al limone e rosmarino con patate",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 45,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "coscia_pollo",
        "quantitaG": 600
      },
      {
        "ingredientId": "patata",
        "quantitaG": 600
      },
      {
        "ingredientId": "limone",
        "quantitaG": 60
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 3
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Accendi il forno a 200 °C.",
      "Metti in teglia il pollo, le patate a spicchi, l'aglio in camicia e il limone a fette.",
      "Condisci con olio, rosmarino e sale e mescola con le mani.",
      "Cuoci 45 minuti, girando a metà."
    ],
    "fonte": "seed",
    "descrizione": "Arrosto della domenica senza pensieri: tutto in una teglia.",
    "costoStimatoPorzione": 2.4
  },
  {
    "id": "n091",
    "titolo": "Saltimbocca alla romana",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 8,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "tacchino_fettine",
        "quantitaG": 560
      },
      {
        "ingredientId": "prosciutto_crudo",
        "quantitaG": 80
      },
      {
        "ingredientId": "salvia",
        "quantitaG": 5
      },
      {
        "ingredientId": "farina_00",
        "quantitaG": 20
      },
      {
        "ingredientId": "burro",
        "quantitaG": 30
      },
      {
        "ingredientId": "vino_bianco",
        "quantitaG": 50
      },
      {
        "ingredientId": "sale",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Appoggia su ogni fettina mezza fetta di prosciutto e una foglia di salvia, fissando con uno stecchino.",
      "Infarina leggermente solo il lato della carne.",
      "Rosola nel burro 2 minuti per lato, partendo dal prosciutto.",
      "Sfuma con il vino e lascia addensare il fondo."
    ],
    "fonte": "seed",
    "descrizione": "Si fanno in dieci minuti e sembrano un piatto da trattoria.",
    "costoStimatoPorzione": 3.1
  },
  {
    "id": "n092",
    "titolo": "Pollo al sesamo con broccoli e riso",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 20,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "petto_pollo",
        "quantitaG": 600
      },
      {
        "ingredientId": "broccolo",
        "quantitaG": 500
      },
      {
        "ingredientId": "riso_basmati",
        "quantitaG": 240
      },
      {
        "ingredientId": "sesamo",
        "quantitaG": 20
      },
      {
        "ingredientId": "zenzero",
        "quantitaG": 10
      },
      {
        "ingredientId": "miele",
        "quantitaG": 20
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 20
      },
      {
        "ingredientId": "salsa_soia",
        "quantitaG": 30,
        "opzionale": true,
        "nota": "Per la versione senza glutine usa tamari"
      }
    ],
    "passaggi": [
      "Cuoci il riso. Taglia il pollo a bocconcini.",
      "Salta il pollo nell'olio caldo per 6 minuti, poi aggiungi zenzero e aglio.",
      "Unisci le cimette di broccolo e mezzo bicchiere d'acqua; copri e cuoci 5 minuti.",
      "Aggiungi miele e salsa di soia, lascia glassare e finisci con il sesamo."
    ],
    "fonte": "seed",
    "descrizione": "Il saltato da asporto fatto in casa, più leggero e senza glutine se usi il tamari.",
    "costoStimatoPorzione": 2.6
  },
  {
    "id": "n093",
    "titolo": "Lonza di maiale al latte",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "carne_rossa",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 60,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "lonza_maiale",
        "quantitaG": 640
      },
      {
        "ingredientId": "latte",
        "quantitaG": 500
      },
      {
        "ingredientId": "burro",
        "quantitaG": 20
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 2
      },
      {
        "ingredientId": "salvia",
        "quantitaG": 3
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Rosola la lonza intera nel burro con rosmarino e salvia finché è dorata su tutti i lati.",
      "Versa il latte caldo, sala, copri e cuoci a fuoco dolce per 50-60 minuti.",
      "Togli la carne e frulla il fondo fino a una salsa liscia.",
      "Affetta la lonza e servila con la salsa."
    ],
    "fonte": "seed",
    "descrizione": "Ricetta emiliana: il latte diventa una salsa dorata e la carne resta tenerissima.",
    "costoStimatoPorzione": 2.9
  },
  {
    "id": "n095",
    "titolo": "Coniglio alla ligure",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 50,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "coniglio_a_pezzi",
        "quantitaG": 700
      },
      {
        "ingredientId": "olive_taggiasche",
        "quantitaG": 60
      },
      {
        "ingredientId": "pinoli",
        "quantitaG": 20
      },
      {
        "ingredientId": "vino_bianco",
        "quantitaG": 100
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 2
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Rosola il coniglio nell'olio con aglio e rosmarino finché è dorato.",
      "Sfuma con il vino bianco e lascia evaporare.",
      "Aggiungi olive e pinoli, copri e cuoci a fuoco dolce 45 minuti, aggiungendo acqua se serve."
    ],
    "fonte": "seed",
    "descrizione": "Olive taggiasche, pinoli e vino bianco: il sapore della Riviera.",
    "costoStimatoPorzione": 3.4
  },
  {
    "id": "n097",
    "titolo": "Salsiccia e friarielli",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "carne_rossa",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "salsiccia",
        "quantitaG": 600
      },
      {
        "ingredientId": "cime_di_rapa",
        "quantitaG": 800
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "peperoncino_essiccato",
        "quantitaG": 1
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Pulisci le cime di rapa tenendo foglie e cimette tenere.",
      "Rosola la salsiccia in padella con poco olio per 10 minuti e tienila da parte.",
      "Nella stessa padella salta le cime con aglio e peperoncino, coperte, per 10 minuti.",
      "Rimetti la salsiccia e cuoci tutto insieme 5 minuti."
    ],
    "fonte": "seed",
    "descrizione": "Il piatto napoletano d'inverno: amaro, piccante e saporito.",
    "costoStimatoPorzione": 2.6
  },
  {
    "id": "n098",
    "titolo": "Bocconcini di pollo ai carciofi",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 25,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "petto_pollo",
        "quantitaG": 600
      },
      {
        "ingredientId": "carciofo",
        "quantitaG": 400
      },
      {
        "ingredientId": "farina_riso",
        "quantitaG": 20
      },
      {
        "ingredientId": "vino_bianco",
        "quantitaG": 60
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 10
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Pulisci i carciofi e tagliali a spicchi sottili; saltali in padella con aglio, olio e un mestolo d'acqua per 12 minuti.",
      "Taglia il pollo a bocconcini e infarinalo con la farina di riso.",
      "Aggiungilo ai carciofi, rosola 3 minuti e sfuma con il vino.",
      "Cuoci altri 8 minuti, finché il fondo è cremoso, e finisci con prezzemolo."
    ],
    "fonte": "seed",
    "descrizione": "Secondo di tutti i giorni da ottobre ad aprile, cremoso grazie alla farina di riso e senza glutine.",
    "costoStimatoPorzione": 2.6
  },
  {
    "id": "n099",
    "titolo": "Brasato al vino rosso",
    "slotAmmessi": [
      "pranzo",
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "carne_rossa",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 120,
    "difficolta": 3,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "spezzatino_manzo",
        "quantitaG": 700
      },
      {
        "ingredientId": "vino_rosso",
        "quantitaG": 300
      },
      {
        "ingredientId": "carota",
        "quantitaG": 100
      },
      {
        "ingredientId": "sedano",
        "quantitaG": 80
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 100
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 2
      },
      {
        "ingredientId": "alloro",
        "quantitaG": 1
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Rosola la carne a pezzi nell'olio finché è ben dorata.",
      "Aggiungi carota, sedano e cipolla tritati e lascia insaporire.",
      "Versa il vino, aggiungi rosmarino e alloro e cuoci coperto a fuoco minimo per 2 ore.",
      "Frulla le verdure del fondo per una salsa densa."
    ],
    "fonte": "seed",
    "descrizione": "Piatto lento da domenica piemontese: si fa una volta e si congela a porzioni.",
    "costoStimatoPorzione": 3.6
  }
];

export const RICETTE_EXTRA_SPUNTINO: Recipe[] = [
  {
    "id": "n019",
    "titolo": "Hummus di cannellini al rosmarino con carote",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": false,
    "trasportabile": true,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "fagioli_cannellini_lessati",
        "quantitaG": 240
      },
      {
        "ingredientId": "tahina",
        "quantitaG": 20
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 2
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 3
      },
      {
        "ingredientId": "limone",
        "quantitaG": 20,
        "opzionale": true,
        "nota": "A fine estate sostituisci con un cucchiaio di aceto"
      },
      {
        "ingredientId": "carota",
        "quantitaG": 200
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Scola e sciacqua i cannellini.",
      "Frullali con tahina, olio, aglio, aghi di rosmarino tritati, succo di limone e sale, aggiungendo poca acqua fredda.",
      "Taglia le carote a bastoncini e servi con la crema."
    ],
    "fonte": "seed",
    "descrizione": "La versione toscana dell'hummus, più delicata e vellutata.",
    "costoStimatoPorzione": 0.7
  },
  {
    "id": "n020",
    "titolo": "Baba ganoush con bastoncini di cetriolo",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 35,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "melanzana",
        "quantitaG": 400
      },
      {
        "ingredientId": "tahina",
        "quantitaG": 25
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 10
      },
      {
        "ingredientId": "cetriolo",
        "quantitaG": 200
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Bucherella le melanzane e cuocile intere in forno a 220 °C per 35 minuti, finché collassano.",
      "Svuotale con un cucchiaio e lascia scolare la polpa.",
      "Schiacciala con tahina, aglio, olio e sale.",
      "Servi con bastoncini di cetriolo."
    ],
    "fonte": "seed",
    "descrizione": "Crema di melanzane affumicata: si fa quando il forno è già acceso per la cena.",
    "costoStimatoPorzione": 0.8
  },
  {
    "id": "n021",
    "titolo": "Energy balls cocco e anacardi",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 6,
    "conservabilitaGiorni": 7,
    "congelabile": true,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "anacardi",
        "quantitaG": 100
      },
      {
        "ingredientId": "datteri",
        "quantitaG": 120
      },
      {
        "ingredientId": "farina_cocco",
        "quantitaG": 30
      }
    ],
    "passaggi": [
      "Snocciola i datteri; se sono duri, ammollali 10 minuti in acqua calda.",
      "Trita gli anacardi nel mixer, poi aggiungi i datteri fino a un impasto che si compatta.",
      "Forma 12 palline e rotolale nella farina di cocco.",
      "Conservale in frigo."
    ],
    "fonte": "seed",
    "descrizione": "Tre ingredienti, nessuna cottura, dolci solo di datteri.",
    "costoStimatoPorzione": 0.8
  },
  {
    "id": "n022",
    "titolo": "Mandorle tostate al rosmarino e paprika",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 3,
    "tempoCotturaMin": 10,
    "difficolta": 1,
    "porzioni": 6,
    "conservabilitaGiorni": 14,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "mandorle",
        "quantitaG": 150
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 5
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 2
      },
      {
        "ingredientId": "paprika",
        "quantitaG": 1
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Accendi il forno a 170 °C.",
      "Mescola le mandorle con olio, rosmarino tritato, paprika e sale.",
      "Tostale 10 minuti su una teglia, girandole a metà, e lasciale raffreddare."
    ],
    "fonte": "seed",
    "descrizione": "Da tenere nel barattolo al posto delle patatine.",
    "costoStimatoPorzione": 1
  },
  {
    "id": "n023",
    "titolo": "Yogurt greco con frutti di bosco e chia",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 3,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 1,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "yogurt_greco",
        "quantitaG": 170
      },
      {
        "ingredientId": "frutti_bosco_surgelati",
        "quantitaG": 100
      },
      {
        "ingredientId": "semi_chia",
        "quantitaG": 5
      }
    ],
    "passaggi": [
      "Scongela i frutti di bosco per qualche minuto.",
      "Versali sullo yogurt e aggiungi i semi di chia."
    ],
    "fonte": "seed",
    "descrizione": "Lo spuntino più proteico della lista, pronto in due minuti.",
    "costoStimatoPorzione": 1.4
  },
  {
    "id": "n024",
    "titolo": "Mele al forno con noci e uvetta",
    "slotAmmessi": [
      "spuntino",
      "colazione"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 8,
    "tempoCotturaMin": 30,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "mela",
        "quantitaG": 400
      },
      {
        "ingredientId": "noci",
        "quantitaG": 30
      },
      {
        "ingredientId": "uvetta",
        "quantitaG": 20
      },
      {
        "ingredientId": "sciroppo_acero",
        "quantitaG": 15
      },
      {
        "ingredientId": "cannella",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Accendi il forno a 180 °C e togli il torsolo alle mele lasciandole intere.",
      "Riempi il centro con noci tritate, uvetta e cannella.",
      "Versa sopra lo sciroppo d'acero e cuoci 30 minuti, finché sono morbide."
    ],
    "fonte": "seed",
    "descrizione": "Profumo di casa d'inverno. Buone tiepide, ma anche fredde il giorno dopo.",
    "costoStimatoPorzione": 0.8
  },
  {
    "id": "n025",
    "titolo": "Cracker di semi senza glutine",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 45,
    "difficolta": 2,
    "porzioni": 6,
    "conservabilitaGiorni": 10,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "semi_girasole",
        "quantitaG": 60
      },
      {
        "ingredientId": "semi_zucca",
        "quantitaG": 60
      },
      {
        "ingredientId": "semi_chia",
        "quantitaG": 40
      },
      {
        "ingredientId": "sesamo",
        "quantitaG": 40
      },
      {
        "ingredientId": "acqua",
        "quantitaG": 150
      },
      {
        "ingredientId": "sale",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Mescola tutti i semi con acqua e sale e lascia riposare 15 minuti, finché la chia lega l'impasto.",
      "Stendi sottile tra due fogli di carta forno.",
      "Togli il foglio sopra, incidi a rettangoli e cuoci a 160 °C per 45 minuti.",
      "Spezza i cracker quando sono freddi."
    ],
    "fonte": "seed",
    "descrizione": "Croccanti, solo semi, si conservano una settimana e mezza in una latta.",
    "costoStimatoPorzione": 0.9
  },
  {
    "id": "n026",
    "titolo": "Pera con scaglie di grana e noci",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 3,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 0,
    "congelabile": false,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "pera",
        "quantitaG": 300
      },
      {
        "ingredientId": "grana",
        "quantitaG": 40
      },
      {
        "ingredientId": "noci",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Taglia le pere a spicchi.",
      "Servile con scaglie di grana e gherigli di noce."
    ],
    "fonte": "seed",
    "descrizione": "L'abbinamento dei contadini: semplice, autunnale, perfetto alle cinque del pomeriggio.",
    "costoStimatoPorzione": 1.2
  },
  {
    "id": "n027",
    "titolo": "Banana bread vegano",
    "slotAmmessi": [
      "spuntino",
      "colazione"
    ],
    "portata": "spuntino",
    "pesantezza": "media",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 50,
    "difficolta": 2,
    "porzioni": 10,
    "conservabilitaGiorni": 5,
    "congelabile": true,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "farina_00",
        "quantitaG": 250
      },
      {
        "ingredientId": "banana",
        "quantitaG": 300
      },
      {
        "ingredientId": "zucchero_di_canna",
        "quantitaG": 80
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 70
      },
      {
        "ingredientId": "bevanda_vegetale",
        "quantitaG": 100
      },
      {
        "ingredientId": "lievito_dolci",
        "quantitaG": 10
      },
      {
        "ingredientId": "noci",
        "quantitaG": 50
      }
    ],
    "passaggi": [
      "Accendi il forno a 175 °C e fodera uno stampo da plumcake.",
      "Schiaccia le banane mature e mescolale con zucchero, olio e bevanda vegetale.",
      "Aggiungi farina e lievito setacciati, poi le noci tritate.",
      "Versa nello stampo e cuoci 50 minuti; fai la prova stecchino."
    ],
    "fonte": "seed",
    "descrizione": "Il modo migliore di usare le banane troppo mature. Si congela a fette.",
    "costoStimatoPorzione": 0.5
  },
  {
    "id": "n028",
    "titolo": "Tzatziki con verdure crude",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "yogurt_greco",
        "quantitaG": 200
      },
      {
        "ingredientId": "cetriolo",
        "quantitaG": 150
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 10
      },
      {
        "ingredientId": "menta",
        "quantitaG": 3
      },
      {
        "ingredientId": "carota",
        "quantitaG": 150
      }
    ],
    "passaggi": [
      "Grattugia il cetriolo e strizzalo bene con le mani.",
      "Mescolalo con yogurt, aglio tritato fine, olio e menta.",
      "Lascia riposare in frigo 30 minuti e servi con le carote a bastoncini."
    ],
    "fonte": "seed",
    "descrizione": "Fresco e saziante, il dip estivo per eccellenza.",
    "costoStimatoPorzione": 0.9
  },
  {
    "id": "n029",
    "titolo": "Crema di peperoni arrostiti e noci con gallette",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "peperone",
        "quantitaG": 300
      },
      {
        "ingredientId": "noci",
        "quantitaG": 50
      },
      {
        "ingredientId": "paprika",
        "quantitaG": 2
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "gallette_riso",
        "quantitaG": 40
      },
      {
        "ingredientId": "sale",
        "quantitaG": 2
      }
    ],
    "passaggi": [
      "Arrostisci i peperoni in forno a 220 °C per 30 minuti, poi chiudili in un sacchetto 10 minuti e spellali.",
      "Frullali con noci, paprika, olio e sale.",
      "Servi con le gallette di riso."
    ],
    "fonte": "seed",
    "descrizione": "Ispirata alla muhammara siriana: dolce, affumicata, vegana e senza glutine.",
    "costoStimatoPorzione": 1
  },
  {
    "id": "n030",
    "titolo": "Rotolini di bresaola e formaggio fresco",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 8,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "bresaola",
        "quantitaG": 80
      },
      {
        "ingredientId": "philadelphia",
        "quantitaG": 60
      },
      {
        "ingredientId": "rucola",
        "quantitaG": 20
      },
      {
        "ingredientId": "pepe",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Stendi le fette di bresaola e spalma un velo di formaggio fresco.",
      "Aggiungi qualche foglia di rucola e una macinata di pepe.",
      "Arrotola e chiudi, se serve, con uno stecchino."
    ],
    "fonte": "seed",
    "descrizione": "Spuntino proteico salato, cinque minuti e niente pentole.",
    "costoStimatoPorzione": 2.2
  },
  {
    "id": "n031",
    "titolo": "Caldarroste",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "castagna",
        "quantitaG": 400
      }
    ],
    "passaggi": [
      "Incidi le castagne sul lato bombato con un taglio a croce.",
      "Cuocile in forno a 220 °C per 25 minuti, o nella padella forata sul fuoco.",
      "Avvolgile in un canovaccio umido per 5 minuti, così si sbucciano meglio."
    ],
    "fonte": "seed",
    "descrizione": "Il sapore di novembre. Solo castagne, nient'altro.",
    "costoStimatoPorzione": 1.3
  },
  {
    "id": "n032",
    "titolo": "Arance alla cannella con cioccolato fondente",
    "slotAmmessi": [
      "spuntino"
    ],
    "portata": "spuntino",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "arancia",
        "quantitaG": 300
      },
      {
        "ingredientId": "cannella",
        "quantitaG": 1
      },
      {
        "ingredientId": "cioccolato_fondente",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Pela le arance a vivo e tagliale a rondelle.",
      "Spolvera di cannella.",
      "Completa con scaglie di cioccolato fondente."
    ],
    "fonte": "seed",
    "descrizione": "Un dolce d'inverno quasi senza fatica, fresco dopo pranzo.",
    "costoStimatoPorzione": 0.9
  }
];
