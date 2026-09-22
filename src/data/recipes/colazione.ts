import type { Recipe } from "../recipeSchema.ts";

/** Ricette esistenti (pre-R1) riclassificate sul nuovo schema. */
export const RICETTE_COLAZIONE: Recipe[] = [
  {
    "id": "r01",
    "titolo": "Uova strapazzate con avocado e pane integrale",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_salata",
    "pesantezza": "media",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 8,
    "tempoCotturaMin": 2,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "uova",
        "quantitaG": 200
      },
      {
        "ingredientId": "avocado",
        "quantitaG": 200
      },
      {
        "ingredientId": "pane_integrale",
        "quantitaG": 120
      },
      {
        "ingredientId": "burro",
        "quantitaG": 10
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
      "Tosta le fette di pane integrale finché sono dorate e croccanti.",
      "Sbatti le uova in una ciotola con un pizzico di sale e pepe.",
      "Sciogli il burro in una padella antiaderente a fuoco basso e versa le uova, mescolando lentamente con una spatola.",
      "Togli dal fuoco quando le uova sono ancora leggermente cremose.",
      "Schiaccia l'avocado con una forchetta, distribuiscilo sul pane e completa con le uova strapazzate."
    ],
    "fonte": "seed",
    "descrizione": "Colazione salata, cremosa e sazia in dieci minuti.",
    "costoStimatoPorzione": 2.2
  },
  {
    "id": "r02",
    "titolo": "Porridge di avena con frutti di bosco",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 7,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "fiocchi_avena",
        "quantitaG": 100
      },
      {
        "ingredientId": "bevanda_vegetale",
        "quantitaG": 400
      },
      {
        "ingredientId": "frutti_bosco_surgelati",
        "quantitaG": 150
      },
      {
        "ingredientId": "sciroppo_acero",
        "quantitaG": 20
      },
      {
        "ingredientId": "cannella",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Versa i fiocchi d'avena e la bevanda vegetale in un pentolino.",
      "Cuoci a fuoco medio-basso per 8-10 minuti, mescolando spesso, finché l'avena si addensa.",
      "Aggiungi un pizzico di cannella e mescola ancora.",
      "Versa il porridge nelle ciotole e completa con i frutti di bosco e lo sciroppo d'acero."
    ],
    "fonte": "seed",
    "descrizione": "Una colazione calda e confortante, pronta in un quarto d'ora.",
    "costoStimatoPorzione": 1.6
  },
  {
    "id": "r03",
    "titolo": "Yogurt greco con miele e granola",
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
        "ingredientId": "yogurt_greco",
        "quantitaG": 300
      },
      {
        "ingredientId": "granola",
        "quantitaG": 60
      },
      {
        "ingredientId": "miele",
        "quantitaG": 20
      },
      {
        "ingredientId": "noci",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Dividi lo yogurt greco in due ciotole.",
      "Completa con la granola e le noci spezzate grossolanamente.",
      "Termina con un filo di miele."
    ],
    "fonte": "seed",
    "descrizione": "Colazione pronta in un minuto, croccante e ricca di proteine.",
    "costoStimatoPorzione": 1.8
  },
  {
    "id": "r04",
    "titolo": "Pancake proteici alla banana",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "media",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 10,
    "difficolta": 2,
    "porzioni": 2,
    "conservabilitaGiorni": 2,
    "congelabile": true,
    "trasportabile": false,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "banana",
        "quantitaG": 240
      },
      {
        "ingredientId": "uova",
        "quantitaG": 100
      },
      {
        "ingredientId": "farina_avena",
        "quantitaG": 80
      },
      {
        "ingredientId": "lievito_dolci",
        "quantitaG": 5
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 10
      }
    ],
    "passaggi": [
      "Schiaccia le banane con una forchetta fino a ottenere una purea.",
      "Aggiungi le uova, la farina d'avena e il lievito e mescola fino a un composto omogeneo.",
      "Scalda un filo d'olio in una padella antiaderente e versa piccole quantità di impasto.",
      "Cuoci 2 minuti per lato, finché si formano bolle in superficie, poi gira."
    ],
    "fonte": "seed",
    "descrizione": "Pancake soffici senza zuccheri aggiunti, perfetti prima di uno sport.",
    "costoStimatoPorzione": 2
  },
  {
    "id": "r05",
    "titolo": "Toast con ricotta, fichi e noci",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "pane_casereccio",
        "quantitaG": 120
      },
      {
        "ingredientId": "ricotta",
        "quantitaG": 150
      },
      {
        "ingredientId": "fico",
        "quantitaG": 200
      },
      {
        "ingredientId": "noci",
        "quantitaG": 20
      },
      {
        "ingredientId": "miele",
        "quantitaG": 15
      }
    ],
    "passaggi": [
      "Tosta le fette di pane fino a renderle croccanti.",
      "Spalma la ricotta su ogni fetta.",
      "Taglia i fichi a spicchi e disponili sul pane.",
      "Completa con le noci sbriciolate e un filo di miele."
    ],
    "fonte": "seed",
    "descrizione": "L'incontro tra dolce e salato per una colazione elegante.",
    "costoStimatoPorzione": 2.6
  },
  {
    "id": "r06",
    "titolo": "Smoothie bowl ai frutti tropicali",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 8,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "mango_surgelato",
        "quantitaG": 200
      },
      {
        "ingredientId": "banana_surgelata",
        "quantitaG": 120
      },
      {
        "ingredientId": "bevanda_cocco",
        "quantitaG": 150
      },
      {
        "ingredientId": "kiwi",
        "quantitaG": 80
      },
      {
        "ingredientId": "semi_chia",
        "quantitaG": 10
      }
    ],
    "passaggi": [
      "Frulla il mango, la banana congelata e la bevanda di cocco fino a ottenere una crema densa.",
      "Versa nelle ciotole.",
      "Guarnisci con kiwi a fette e semi di chia."
    ],
    "fonte": "seed",
    "descrizione": "Fresca, colorata e pronta in cinque minuti, tutta da comporre.",
    "costoStimatoPorzione": 2.9
  },
  {
    "id": "r31",
    "titolo": "Fette biscottate con marmellata e frutta fresca",
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
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "fette_biscottate",
        "quantitaG": 48
      },
      {
        "ingredientId": "marmellata",
        "quantitaG": 40
      },
      {
        "ingredientId": "banana",
        "quantitaG": 120
      }
    ],
    "passaggi": [
      "Disponi le fette biscottate su un piatto.",
      "Spalmale con la marmellata.",
      "Affetta la banana e servila a fianco, per una colazione che sa di casa."
    ],
    "fonte": "seed",
    "descrizione": "La colazione più semplice di casa, quella che non delude mai.",
    "costoStimatoPorzione": 1.2
  },
  {
    "id": "r32",
    "titolo": "Toast con crema di ceci e pomodorini",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_salata",
    "pesantezza": "leggera",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 0,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "pane_integrale",
        "quantitaG": 120
      },
      {
        "ingredientId": "ceci_lessati",
        "quantitaG": 150
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 5
      },
      {
        "ingredientId": "limone",
        "quantitaG": 90
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      },
      {
        "ingredientId": "pomodorino",
        "quantitaG": 100
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 5
      }
    ],
    "passaggi": [
      "Frulla i ceci con l'aglio, il succo di limone e un filo d'olio fino a ottenere una crema liscia.",
      "Tosta le fette di pane integrale.",
      "Spalma la crema di ceci sul pane e completa con i pomodorini tagliati a metà.",
      "Profuma con un trito di prezzemolo prima di servire."
    ],
    "fonte": "seed",
    "descrizione": "Un toast diverso dal solito, che sazia senza appesantire.",
    "costoStimatoPorzione": 1.6
  },
  {
    "id": "r33",
    "titolo": "Porridge di quinoa con frutta secca e cannella",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_dolce",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 10,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 3,
    "congelabile": false,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "quinoa",
        "quantitaG": 100
      },
      {
        "ingredientId": "bevanda_vegetale",
        "quantitaG": 400
      },
      {
        "ingredientId": "mandorle",
        "quantitaG": 30
      },
      {
        "ingredientId": "miele",
        "quantitaG": 20
      },
      {
        "ingredientId": "cannella",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Sciacqua bene la quinoa sotto l'acqua corrente.",
      "Cuocila nella bevanda vegetale a fuoco basso per 15 minuti, mescolando di tanto in tanto.",
      "Versa nelle ciotole e cospargi di mandorle e cannella.",
      "Completa con un filo di miele."
    ],
    "fonte": "seed",
    "descrizione": "Una colazione diversa dal solito porridge, più croccante e speziata.",
    "costoStimatoPorzione": 2.1
  },
  {
    "id": "r34",
    "titolo": "Uova alla coque con soldatini di pane",
    "slotAmmessi": [
      "colazione"
    ],
    "portata": "colazione_salata",
    "pesantezza": "leggera",
    "proteinaPrincipale": "uova",
    "tempoPrepMin": 3,
    "tempoCotturaMin": 5,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "uova",
        "quantitaG": 200
      },
      {
        "ingredientId": "pane_casereccio",
        "quantitaG": 80
      },
      {
        "ingredientId": "burro",
        "quantitaG": 10
      }
    ],
    "passaggi": [
      "Porta a bollore l'acqua e immergi le uova con delicatezza.",
      "Cuoci per 5-6 minuti: il tuorlo deve restare morbido.",
      "Nel frattempo tosta il pane e taglialo a listarelle.",
      "Scalda leggermente il burro e spennellalo sul pane: i tuoi soldatini sono pronti per essere intinti."
    ],
    "fonte": "seed",
    "descrizione": "Un classico confortante, perfetto per una domenica con calma.",
    "costoStimatoPorzione": 1.5
  },
  {
    "id": "r35",
    "titolo": "Smoothie verde detox",
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
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "spinaci_freschi",
        "quantitaG": 60
      },
      {
        "ingredientId": "mela",
        "quantitaG": 180
      },
      {
        "ingredientId": "limone",
        "quantitaG": 90
      },
      {
        "ingredientId": "zenzero",
        "quantitaG": 5
      },
      {
        "ingredientId": "bevanda_vegetale",
        "quantitaG": 300
      }
    ],
    "passaggi": [
      "Lava bene gli spinaci e taglia la mela a pezzi.",
      "Frulla tutto insieme al succo di limone, allo zenzero e alla bevanda vegetale.",
      "Versa in due bicchieri e bevi subito, per non perdere la carica di verde."
    ],
    "fonte": "seed",
    "descrizione": "Un bicchiere di energia verde per iniziare la giornata alla grande.",
    "costoStimatoPorzione": 1.4
  },
{
  id: "r061",
  titolo: "Overnight oats al cacao e banana",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 8,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "fiocchi_avena",
      quantitaG: 100
    },
    {
      ingredientId: "bevanda_vegetale",
      quantitaG: 300
    },
    {
      ingredientId: "cacao_amaro",
      quantitaG: 10
    },
    {
      ingredientId: "banana",
      quantitaG: 120
    },
    {
      ingredientId: "sciroppo_acero",
      quantitaG: 20
    },
    {
      ingredientId: "semi_chia",
      quantitaG: 10,
      opzionale: true
    }
  ],
  passaggi: [
    "Mescola in un barattolo i fiocchi d'avena con il cacao amaro e la bevanda vegetale.",
    "Aggiungi lo sciroppo d'acero e mezza banana schiacciata, mescola bene.",
    "Copri e lascia in frigorifero per tutta la notte.",
    "Al mattino completa con la banana rimasta a fette e i semi di chia."
  ],
  fonte: "seed",
  descrizione: "Si prepara la sera prima: al mattino è già pronta, fresca e cioccolatosa.",
  costoStimatoPorzione: 1.4
},
{
  id: "r062",
  titolo: "Chia pudding al mango",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 5,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "semi_chia",
      quantitaG: 40
    },
    {
      ingredientId: "latte_cocco",
      quantitaG: 300
    },
    {
      ingredientId: "mango_surgelato",
      quantitaG: 150
    },
    {
      ingredientId: "sciroppo_acero",
      quantitaG: 15
    }
  ],
  passaggi: [
    "Mescola i semi di chia con il latte di cocco e lo sciroppo d'acero in un barattolo.",
    "Lascia riposare in frigorifero per almeno 4 ore, meglio tutta la notte, mescolando una volta a metà.",
    "Frulla il mango scongelato fino a ottenere una purea.",
    "Servi il budino di chia con la purea di mango sopra."
  ],
  fonte: "seed",
  descrizione: "Una colazione vegetale che si fa da sola in frigorifero, cremosa e tropicale.",
  costoStimatoPorzione: 1.8
},
{
  id: "r063",
  titolo: "Toast integrale con hummus e pomodorini",
  slotAmmessi: [
    "colazione",
    "spuntino"
  ],
  portata: "colazione_salata",
  pesantezza: "leggera",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 6,
  tempoCotturaMin: 3,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "pane_integrale",
      quantitaG: 80
    },
    {
      ingredientId: "hummus",
      quantitaG: 100
    },
    {
      ingredientId: "pomodorino",
      quantitaG: 100
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 10
    },
    {
      ingredientId: "origano",
      quantitaG: 1,
      opzionale: true
    }
  ],
  passaggi: [
    "Tosta le fette di pane integrale.",
    "Spalma l'hummus in uno strato generoso su ogni fetta.",
    "Completa con i pomodorini tagliati a metà, un filo d'olio e un pizzico di origano."
  ],
  fonte: "seed",
  descrizione: "Colazione salata pronta in cinque minuti, sazia senza appesantire.",
  costoStimatoPorzione: 1.5
},
{
  id: "r064",
  titolo: "Uova in camicia su crema di avocado",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_salata",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 8,
  tempoCotturaMin: 4,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "uova",
      quantitaG: 100
    },
    {
      ingredientId: "avocado",
      quantitaG: 200
    },
    {
      ingredientId: "limone",
      quantitaG: 20
    },
    {
      ingredientId: "aceto",
      quantitaG: 10
    },
    {
      ingredientId: "sale",
      quantitaG: 2
    },
    {
      ingredientId: "peperoncino_essiccato",
      quantitaG: 1,
      opzionale: true
    }
  ],
  passaggi: [
    "Schiaccia l'avocado con una forchetta, condiscilo con succo di limone e sale: è la base.",
    "Porta a ebollizione l'acqua con l'aceto, crea un vortice e versa le uova una alla volta.",
    "Cuoci le uova in camicia per circa 3 minuti, poi scolale con una schiumarola.",
    "Distribuisci la crema di avocado nei piatti e adagia sopra le uova in camicia.",
    "Completa con una macinata di pepe e, se piace, un pizzico di peperoncino."
  ],
  fonte: "seed",
  descrizione: "Una colazione senza pane, cremosa e senza glutine.",
  costoStimatoPorzione: 2.4
},
{
  id: "r065",
  titolo: "Pancake di farina di ceci alle mele",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "media",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 10,
  tempoCotturaMin: 12,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: true,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "farina_ceci",
      quantitaG: 120
    },
    {
      ingredientId: "bevanda_vegetale",
      quantitaG: 150
    },
    {
      ingredientId: "mela",
      quantitaG: 180
    },
    {
      ingredientId: "cannella",
      quantitaG: 2
    },
    {
      ingredientId: "lievito_dolci",
      quantitaG: 5
    },
    {
      ingredientId: "olio_semi",
      quantitaG: 10
    }
  ],
  passaggi: [
    "Mescola la farina di ceci con la bevanda vegetale, il lievito e la cannella fino a una pastella liscia.",
    "Grattugia grossolanamente la mela e incorporala alla pastella.",
    "Scalda un filo d'olio in una padella antiaderente e versa un mestolo di pastella per volta.",
    "Cuoci i pancake un paio di minuti per lato, finché sono dorati."
  ],
  fonte: "seed",
  descrizione: "Pancake senza uova e senza glutine, dolci solo di frutta.",
  costoStimatoPorzione: 1.3
},
{
  id: "r066",
  titolo: "Budino di riso al latte di cocco e cannella",
  slotAmmessi: [
    "colazione",
    "spuntino"
  ],
  portata: "colazione_dolce",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 5,
  tempoCotturaMin: 25,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "riso_carnaroli",
      quantitaG: 80
    },
    {
      ingredientId: "latte_cocco",
      quantitaG: 300
    },
    {
      ingredientId: "acqua",
      quantitaG: 150
    },
    {
      ingredientId: "zucchero_di_canna",
      quantitaG: 25
    },
    {
      ingredientId: "cannella",
      quantitaG: 2
    }
  ],
  passaggi: [
    "Metti il riso in un pentolino con l'acqua e il latte di cocco.",
    "Cuoci a fuoco basso, mescolando spesso, per circa 25 minuti finché il riso è cremoso.",
    "Aggiungi lo zucchero di canna e la cannella, mescola ancora un minuto.",
    "Lascia intiepidire e conserva in frigorifero: si mangia freddo o tiepido."
  ],
  fonte: "seed",
  descrizione: "Una colazione da preparare la sera prima, cremosa e senza lattosio.",
  costoStimatoPorzione: 1.2
},
{
  id: "r067",
  titolo: "Torta di mele allo yogurt a fette",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 15,
  tempoCotturaMin: 40,
  difficolta: 2,
  porzioni: 6,
  conservabilitaGiorni: 4,
  congelabile: true,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "farina_00",
      quantitaG: 250
    },
    {
      ingredientId: "yogurt_bianco",
      quantitaG: 125
    },
    {
      ingredientId: "uova",
      quantitaG: 100
    },
    {
      ingredientId: "zucchero",
      quantitaG: 120
    },
    {
      ingredientId: "olio_semi",
      quantitaG: 60
    },
    {
      ingredientId: "lievito_dolci",
      quantitaG: 16
    },
    {
      ingredientId: "mela",
      quantitaG: 360
    }
  ],
  passaggi: [
    "Sbatti le uova con lo zucchero finché il composto è chiaro e spumoso.",
    "Aggiungi lo yogurt e l'olio di semi, poi la farina setacciata con il lievito.",
    "Sbuccia le mele, tagliale a fettine sottili e incorporane metà nell'impasto.",
    "Versa in uno stampo, disponi sopra le fette di mela rimaste e inforna a 180°C per 40 minuti.",
    "Lascia raffreddare prima di tagliare a fette: si conserva qualche giorno a temperatura ambiente."
  ],
  fonte: "seed",
  descrizione: "Si prepara la sera prima, resta soffice per giorni: colazione a fette, senza pensieri.",
  costoStimatoPorzione: 0.9
},
{
  id: "r068",
  titolo: "Frittatine di zucchine da portare via",
  slotAmmessi: [
    "colazione",
    "spuntino"
  ],
  portata: "colazione_salata",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
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
      quantitaG: 300
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 40
    },
    {
      ingredientId: "sale",
      quantitaG: 3
    },
    {
      ingredientId: "pepe",
      quantitaG: 1
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 10
    }
  ],
  passaggi: [
    "Taglia le zucchine a rondelle sottili e saltale in padella con un filo d'olio finché sono morbide.",
    "Sbatti le uova con parmigiano, sale e pepe, unisci le zucchine intiepidite.",
    "Versa il composto in stampini da muffin foderati o unti e inforna a 180°C per 20 minuti.",
    "Lascia raffreddare: si mangiano fredde o tiepide, ottime da preparare la sera prima."
  ],
  fonte: "seed",
  descrizione: "Colazione salata trasportabile, senza glutine, buona anche come spuntino.",
  costoStimatoPorzione: 1.1
},
{
  id: "r087",
  titolo: "Yogurt greco con miele e noci",
  slotAmmessi: [
    "spuntino",
    "colazione"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 3,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 1,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "yogurt_greco",
      quantitaG: 170
    },
    {
      ingredientId: "miele",
      quantitaG: 15
    },
    {
      ingredientId: "noci",
      quantitaG: 15
    }
  ],
  passaggi: [
    "Versa lo yogurt greco in una ciotola.",
    "Completa con un cucchiaio di miele e le noci sgusciate."
  ],
  fonte: "seed",
  descrizione: "Il più classico degli spuntini proteici, pronto in trenta secondi.",
  costoStimatoPorzione: 1
},
{
  id: "r090",
  titolo: "Frullato proteico alla banana e burro di arachidi",
  slotAmmessi: [
    "spuntino",
    "colazione"
  ],
  portata: "spuntino",
  pesantezza: "media",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 5,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 1,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "banana",
      quantitaG: 120
    },
    {
      ingredientId: "burro_arachidi",
      quantitaG: 20
    },
    {
      ingredientId: "bevanda_vegetale",
      quantitaG: 250
    },
    {
      ingredientId: "cannella",
      quantitaG: 1,
      opzionale: true
    }
  ],
  passaggi: [
    "Frulla banana, burro di arachidi e bevanda vegetale fino a un composto liscio.",
    "Versa in un bicchiere e completa, se piace, con un pizzico di cannella."
  ],
  fonte: "seed",
  descrizione: "Uno spuntino liquido e sostanzioso, pronto in due minuti.",
  costoStimatoPorzione: 1.1
},
{
  id: "r091",
  titolo: "Porridge di grano saraceno alle pere",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 5,
  tempoCotturaMin: 12,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "grano_saraceno",
      quantitaG: 100
    },
    {
      ingredientId: "bevanda_vegetale",
      quantitaG: 350
    },
    {
      ingredientId: "pera",
      quantitaG: 200
    },
    {
      ingredientId: "cannella",
      quantitaG: 2
    },
    {
      ingredientId: "miele",
      quantitaG: 20,
      opzionale: true
    }
  ],
  passaggi: [
    "Cuoci il grano saraceno nella bevanda vegetale a fuoco basso per 12 minuti, mescolando spesso.",
    "Taglia la pera a cubetti e uniscine metà al porridge quasi cotto insieme alla cannella.",
    "Servi con i restanti cubetti di pera sopra e, se piace, un filo di miele."
  ],
  fonte: "seed",
  descrizione: "Un porridge senza glutine, dolce di frutta di stagione.",
  costoStimatoPorzione: 1.3
},
{
  id: "r092",
  titolo: "Macedonia invernale con succo d'arancia",
  slotAmmessi: [
    "colazione",
    "spuntino"
  ],
  portata: "colazione_dolce",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
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
      ingredientId: "arancia",
      quantitaG: 200
    },
    {
      ingredientId: "mela",
      quantitaG: 180
    },
    {
      ingredientId: "kiwi",
      quantitaG: 160
    },
    {
      ingredientId: "mandarino",
      quantitaG: 150
    }
  ],
  passaggi: [
    "Sbuccia e taglia a pezzi tutta la frutta.",
    "Spremi un mandarino in più per bagnare la macedonia, se piace più succosa.",
    "Mescola bene e lascia riposare in frigorifero mezz'ora prima di servire."
  ],
  fonte: "seed",
  descrizione: "Solo agrumi e frutta d'inverno, fresca e leggera.",
  costoStimatoPorzione: 1.1
},
{
  id: "r093",
  titolo: "Frittelle di mele senza glutine",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 12,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: true,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "farina_riso",
      quantitaG: 120
    },
    {
      ingredientId: "bevanda_vegetale",
      quantitaG: 130
    },
    {
      ingredientId: "mela",
      quantitaG: 200
    },
    {
      ingredientId: "lievito_dolci",
      quantitaG: 5
    },
    {
      ingredientId: "zucchero_di_canna",
      quantitaG: 20
    },
    {
      ingredientId: "olio_semi",
      quantitaG: 15
    }
  ],
  passaggi: [
    "Prepara una pastella con farina di riso, bevanda vegetale, lievito e zucchero.",
    "Taglia la mela ad anelli sottili e immergili nella pastella.",
    "Scalda un filo d'olio in padella e cuoci gli anelli di mela finché sono dorati su entrambi i lati."
  ],
  fonte: "seed",
  descrizione: "Frittelle senza glutine e senza uova, dolci solo di mela.",
  costoStimatoPorzione: 1
},
{
  id: "r094",
  titolo: "Uova sode con verdure croccanti",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_salata",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 5,
  tempoCotturaMin: 9,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "uova",
      quantitaG: 100
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
      ingredientId: "sale",
      quantitaG: 2
    }
  ],
  passaggi: [
    "Cuoci le uova in acqua bollente per 9 minuti, poi raffreddale subito in acqua fredda e sgusciale.",
    "Taglia carota e cetriolo a bastoncini.",
    "Servi le uova sode tagliate a metà con le verdure croccanti e un pizzico di sale."
  ],
  fonte: "seed",
  descrizione: "Colazione proteica, senza glutine e senza lattosio, da preparare in anticipo.",
  costoStimatoPorzione: 0.9
},
{
  id: "r095",
  titolo: "Smoothie verde con spinaci e ananas",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 5,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 1,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "spinaci_freschi",
      quantitaG: 40
    },
    {
      ingredientId: "ananas",
      quantitaG: 150
    },
    {
      ingredientId: "banana",
      quantitaG: 100
    },
    {
      ingredientId: "bevanda_vegetale",
      quantitaG: 200
    }
  ],
  passaggi: [
    "Frulla tutti gli ingredienti insieme fino a ottenere un composto liscio.",
    "Versa in un bicchiere grande e servi subito."
  ],
  fonte: "seed",
  descrizione: "Verde, tropicale, pronto in tre minuti.",
  costoStimatoPorzione: 1.4
},
{
  id: "r118",
  titolo: "Insalata di frutta con yogurt greco",
  slotAmmessi: [
    "spuntino",
    "colazione"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "latticini",
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
      ingredientId: "yogurt_greco",
      quantitaG: 250
    },
    {
      ingredientId: "kiwi",
      quantitaG: 160
    },
    {
      ingredientId: "mela",
      quantitaG: 180
    },
    {
      ingredientId: "miele",
      quantitaG: 15,
      opzionale: true
    }
  ],
  passaggi: [
    "Taglia la frutta a cubetti piccoli.",
    "Componi in coppette con lo yogurt greco e la frutta a strati.",
    "Completa con un filo di miele, se piace."
  ],
  fonte: "seed",
  descrizione: "Cremoso e fresco, un classico che non stanca mai.",
  costoStimatoPorzione: 1.3
},
{
  id: "r121",
  titolo: "Budino di semi di chia all'arancia",
  slotAmmessi: [
    "colazione",
    "spuntino"
  ],
  portata: "colazione_dolce",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 8,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "semi_chia",
      quantitaG: 40
    },
    {
      ingredientId: "bevanda_vegetale",
      quantitaG: 250
    },
    {
      ingredientId: "arancia",
      quantitaG: 200
    },
    {
      ingredientId: "miele",
      quantitaG: 15,
      opzionale: true
    }
  ],
  passaggi: [
    "Mescola i semi di chia con la bevanda vegetale e il succo di mezza arancia.",
    "Lascia riposare in frigorifero almeno 4 ore, meglio tutta la notte.",
    "Servi con gli spicchi dell'arancia rimasta sopra e, a piacere, un filo di miele."
  ],
  fonte: "seed",
  descrizione: "Un budino d'inverno profumato d'agrumi, senza cottura.",
  costoStimatoPorzione: 1.1
},
{
  id: "r122",
  titolo: "Toast con crema di mandorle e banana",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 5,
  tempoCotturaMin: 2,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "pane_integrale",
      quantitaG: 80
    },
    {
      ingredientId: "burro_mandorle",
      quantitaG: 40
    },
    {
      ingredientId: "banana",
      quantitaG: 120
    },
    {
      ingredientId: "cannella",
      quantitaG: 1,
      opzionale: true
    }
  ],
  passaggi: [
    "Tosta le fette di pane integrale.",
    "Spalma la crema di mandorle su ogni fetta.",
    "Completa con la banana a rondelle e, se piace, una spolverata di cannella."
  ],
  fonte: "seed",
  descrizione: "Colazione vegetale e sazia, pronta in cinque minuti.",
  costoStimatoPorzione: 1.4
},
{
  id: "r123",
  titolo: "Porridge di avena alla zucca e cannella",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 5,
  tempoCotturaMin: 12,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "fiocchi_avena",
      quantitaG: 100
    },
    {
      ingredientId: "zucca",
      quantitaG: 150
    },
    {
      ingredientId: "bevanda_vegetale",
      quantitaG: 300
    },
    {
      ingredientId: "cannella",
      quantitaG: 2
    },
    {
      ingredientId: "sciroppo_acero",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Cuoci la zucca a cubetti al vapore o in padella finché è morbida, poi schiacciala grossolanamente.",
    "Cuoci i fiocchi d'avena nella bevanda vegetale per 8-10 minuti, mescolando spesso.",
    "Unisci la purea di zucca e la cannella, mescola ancora un minuto.",
    "Completa con un filo di sciroppo d'acero."
  ],
  fonte: "seed",
  descrizione: "Un porridge autunnale, dolce naturalmente di zucca.",
  costoStimatoPorzione: 1.3
},
{
  id: "r124",
  titolo: "Uova strapazzate con funghi",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_salata",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 8,
  tempoCotturaMin: 10,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "uova",
      quantitaG: 200
    },
    {
      ingredientId: "fungo_champignon",
      quantitaG: 200
    },
    {
      ingredientId: "aglio",
      quantitaG: 5
    },
    {
      ingredientId: "prezzemolo",
      quantitaG: 5
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 10
    }
  ],
  passaggi: [
    "Affetta i funghi e saltali in padella con aglio e olio finché rilasciano l'acqua e si asciugano.",
    "Sbatti le uova con un pizzico di sale e versale sui funghi.",
    "Mescola lentamente a fuoco basso finché le uova sono cremose.",
    "Completa con prezzemolo tritato."
  ],
  fonte: "seed",
  descrizione: "Colazione salata sostanziosa, senza glutine e senza lattosio.",
  costoStimatoPorzione: 1.9
},
{
  id: "r125",
  titolo: "Yogurt vegetale con granola e frutti di bosco",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 3,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 1,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "yogurt_vegetale",
      quantitaG: 170
    },
    {
      ingredientId: "granola",
      quantitaG: 40
    },
    {
      ingredientId: "frutti_bosco_surgelati",
      quantitaG: 80
    }
  ],
  passaggi: [
    "Scongela leggermente i frutti di bosco a temperatura ambiente.",
    "Versa lo yogurt vegetale in una ciotola.",
    "Completa con granola e frutti di bosco."
  ],
  fonte: "seed",
  descrizione: "La versione vegana dello yogurt con granola, cremosa uguale.",
  costoStimatoPorzione: 1.6
},
{
  id: "r126",
  titolo: "Pane con crema di mandorle e fragole",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 5,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "pane_integrale",
      quantitaG: 80
    },
    {
      ingredientId: "burro_mandorle",
      quantitaG: 30
    },
    {
      ingredientId: "fragola",
      quantitaG: 150
    }
  ],
  passaggi: [
    "Spalma la crema di mandorle sulle fette di pane.",
    "Taglia le fragole a fettine e disponile sopra."
  ],
  fonte: "seed",
  descrizione: "Colazione di primavera, dolce solo di frutta fresca.",
  costoStimatoPorzione: 1.5
},
{
  id: "r127",
  titolo: "Frittatine di spinaci da portare via",
  slotAmmessi: [
    "colazione",
    "spuntino"
  ],
  portata: "colazione_salata",
  pesantezza: "media",
  proteinaPrincipale: "uova",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
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
      ingredientId: "spinaci_surgelati",
      quantitaG: 200
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 40
    },
    {
      ingredientId: "sale",
      quantitaG: 3
    }
  ],
  passaggi: [
    "Scongela e strizza bene gli spinaci per eliminare l'acqua in eccesso.",
    "Sbatti le uova con parmigiano, sale e gli spinaci.",
    "Versa in stampini da muffin unti e inforna a 180°C per 20 minuti.",
    "Lascia raffreddare: si mangiano fredde o tiepide."
  ],
  fonte: "seed",
  descrizione: "Colazione salata trasportabile, senza glutine.",
  costoStimatoPorzione: 1.2
},
{
  id: "r128",
  titolo: "Macedonia di agrumi con melagrana",
  slotAmmessi: [
    "colazione",
    "spuntino"
  ],
  portata: "colazione_dolce",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
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
      ingredientId: "arancia",
      quantitaG: 200
    },
    {
      ingredientId: "mandarino",
      quantitaG: 150
    },
    {
      ingredientId: "melagrana",
      quantitaG: 100
    }
  ],
  passaggi: [
    "Sbuccia e taglia a pezzi arance e mandarini, raccogliendo il succo che rilasciano.",
    "Sgrana la melagrana e uniscila agli agrumi.",
    "Mescola e lascia insaporire in frigorifero qualche minuto."
  ],
  fonte: "seed",
  descrizione: "Il colore dell'inverno in una ciotola, tutta di agrumi di stagione.",
  costoStimatoPorzione: 1.3
},
{
  id: "r177",
  titolo: "Porridge di quinoa alle fragole",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 5,
  tempoCotturaMin: 15,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "quinoa",
      quantitaG: 100
    },
    {
      ingredientId: "bevanda_vegetale",
      quantitaG: 300
    },
    {
      ingredientId: "fragola",
      quantitaG: 150
    },
    {
      ingredientId: "sciroppo_acero",
      quantitaG: 15
    }
  ],
  passaggi: [
    "Cuoci la quinoa nella bevanda vegetale per 15 minuti, finché è morbida e cremosa.",
    "Taglia le fragole a fette.",
    "Servi il porridge con le fragole sopra e un filo di sciroppo d'acero."
  ],
  fonte: "seed",
  descrizione: "Una colazione senza glutine, dolce di frutta di primavera.",
  costoStimatoPorzione: 1.5
},
{
  id: "r178",
  titolo: "Toast con ricotta e fragole",
  slotAmmessi: [
    "colazione"
  ],
  portata: "colazione_dolce",
  pesantezza: "leggera",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 8,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "pane_casereccio",
      quantitaG: 100
    },
    {
      ingredientId: "ricotta",
      quantitaG: 150
    },
    {
      ingredientId: "fragola",
      quantitaG: 150
    },
    {
      ingredientId: "miele",
      quantitaG: 10,
      opzionale: true
    }
  ],
  passaggi: [
    "Tosta le fette di pane.",
    "Spalma la ricotta e completa con le fragole a fette.",
    "Termina, se piace, con un filo di miele."
  ],
  fonte: "seed",
  descrizione: "Colazione di primavera, dolce e cremosa.",
  costoStimatoPorzione: 1.6
}
];
