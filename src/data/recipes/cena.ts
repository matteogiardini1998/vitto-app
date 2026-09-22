import type { Recipe } from "../recipeSchema.ts";

/** Ricette esistenti (pre-R1) riclassificate sul nuovo schema. */
export const RICETTE_CENA: Recipe[] = [
  {
    "id": "r08",
    "titolo": "Risotto ai funghi porcini",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 35,
    "difficolta": 3,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": false,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "riso_carnaroli",
        "quantitaG": 320
      },
      {
        "ingredientId": "funghi_porcini_secchi",
        "quantitaG": 30
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 1200
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      },
      {
        "ingredientId": "burro",
        "quantitaG": 30
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 50
      },
      {
        "ingredientId": "vino_bianco",
        "quantitaG": 100
      }
    ],
    "passaggi": [
      "Metti i funghi secchi in ammollo in acqua tiepida per 20 minuti, poi scolali e tritali grossolanamente.",
      "Soffriggi la cipolla tritata in metà del burro finché è trasparente.",
      "Aggiungi il riso e tostalo per 2 minuti mescolando.",
      "Sfuma con il vino bianco e lascia evaporare.",
      "Aggiungi i funghi e prosegui la cottura versando il brodo caldo un mestolo alla volta per circa 18 minuti.",
      "Spegni il fuoco e manteca con il burro rimasto e il parmigiano."
    ],
    "fonte": "seed",
    "descrizione": "Cremoso e avvolgente, il risotto della domenica.",
    "costoStimatoPorzione": 4.5
  },
  {
    "id": "r12",
    "titolo": "Lasagne alla bolognese",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "carne_rossa",
    "tempoPrepMin": 30,
    "tempoCotturaMin": 60,
    "difficolta": 3,
    "porzioni": 6,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "lasagne_sfoglie",
        "quantitaG": 450
      },
      {
        "ingredientId": "carne_macinata_mista",
        "quantitaG": 900
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 600
      },
      {
        "ingredientId": "besciamella",
        "quantitaG": 600
      },
      {
        "ingredientId": "carota",
        "quantitaG": 100
      },
      {
        "ingredientId": "sedano",
        "quantitaG": 50
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 150
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 100
      }
    ],
    "passaggi": [
      "Prepara un soffritto con carota, sedano e cipolla tritati finemente.",
      "Aggiungi la carne macinata e rosolala bene, poi versa la passata di pomodoro e cuoci a fuoco lento per 40 minuti.",
      "Componi le lasagne alternando sfoglie, ragù, besciamella e parmigiano in una teglia.",
      "Cuoci in forno statico a 180°C per 35-40 minuti, finché la superficie è dorata.",
      "Lascia riposare 10 minuti prima di tagliare."
    ],
    "fonte": "seed",
    "descrizione": "Il piatto della domenica in famiglia, strati di ragù e besciamella.",
    "costoStimatoPorzione": 3.8
  },
  {
    "id": "r13",
    "titolo": "Pollo al curry con riso basmati",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 20,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "internazionale",
    "ingredienti": [
      {
        "ingredientId": "petto_pollo",
        "quantitaG": 500
      },
      {
        "ingredientId": "latte_cocco",
        "quantitaG": 400
      },
      {
        "ingredientId": "curry_polvere",
        "quantitaG": 15
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      },
      {
        "ingredientId": "riso_basmati",
        "quantitaG": 300
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 15
      }
    ],
    "passaggi": [
      "Taglia il pollo a bocconcini e la cipolla a fettine sottili.",
      "Rosola la cipolla nell'olio finché è morbida, aggiungi il pollo e cuoci finché è dorato.",
      "Unisci il curry in polvere, mescola bene e sfuma con il latte di cocco.",
      "Lascia sobbollire 15 minuti finché la salsa si addensa.",
      "Servi con il riso basmati cotto a parte."
    ],
    "fonte": "seed",
    "descrizione": "Speziato e cremoso, un piatto che scalda in ogni stagione.",
    "costoStimatoPorzione": 3.5
  },
  {
    "id": "r15",
    "titolo": "Salmone al forno con patate",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "salmone_fresco",
        "quantitaG": 600
      },
      {
        "ingredientId": "patata",
        "quantitaG": 500
      },
      {
        "ingredientId": "limone",
        "quantitaG": 90
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      }
    ],
    "passaggi": [
      "Taglia le patate a spicchi e disponile su una teglia con olio, sale e rosmarino.",
      "Inforna a 200°C per 20 minuti.",
      "Aggiungi i filetti di salmone conditi con olio, sale e fette di limone.",
      "Prosegui la cottura in forno per altri 15 minuti."
    ],
    "fonte": "seed",
    "descrizione": "Un secondo elegante e senza sforzo, pronto in una sola teglia.",
    "costoStimatoPorzione": 5.5
  },
  {
    "id": "r19",
    "titolo": "Parmigiana di melanzane",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 25,
    "tempoCotturaMin": 35,
    "difficolta": 3,
    "porzioni": 6,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": true,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "melanzana",
        "quantitaG": 750
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 500
      },
      {
        "ingredientId": "mozzarella",
        "quantitaG": 300
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 60
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
      "Taglia le melanzane a fette e grigliale su una piastra finché sono morbide e leggermente dorate.",
      "Prepara un sugo veloce scaldando la passata con olio, sale e basilico.",
      "Componi in una teglia alternando melanzane, sugo, mozzarella e parmigiano.",
      "Inforna a 190°C per 25 minuti, finché la superficie è dorata e filante."
    ],
    "fonte": "seed",
    "descrizione": "Il comfort food per eccellenza, strati di melanzane e pomodoro.",
    "costoStimatoPorzione": 2.6
  },
  {
    "id": "r20",
    "titolo": "Tagliata di manzo con rucola e grana",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "carne_rossa",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 10,
    "difficolta": 1,
    "porzioni": 2,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": false,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "controfiletto_manzo",
        "quantitaG": 340
      },
      {
        "ingredientId": "rucola",
        "quantitaG": 60
      },
      {
        "ingredientId": "grana",
        "quantitaG": 40
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
      "Porta la carne a temperatura ambiente e asciugala bene.",
      "Scalda una padella ben calda e cuoci la carne 2-3 minuti per lato per una cottura al sangue.",
      "Lascia riposare la carne 5 minuti, poi tagliala a fette spesse.",
      "Disponi la tagliata su un letto di rucola, completa con scaglie di grana, olio e succo di limone."
    ],
    "fonte": "seed",
    "descrizione": "Un secondo veloce ma d'effetto, perfetto per le occasioni.",
    "costoStimatoPorzione": 6.5
  },
  {
    "id": "r21",
    "titolo": "Zuppa di lenticchie e cavolo nero",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "zuppa",
    "pesantezza": "media",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 35,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "lenticchie_secche",
        "quantitaG": 250
      },
      {
        "ingredientId": "cavolo_nero",
        "quantitaG": 200
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
        "ingredientId": "passata_pomodoro",
        "quantitaG": 200
      },
      {
        "ingredientId": "alloro",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Soffriggi carota, sedano e cipolla tritati in un filo d'olio.",
      "Aggiungi le lenticchie, la passata di pomodoro e l'alloro.",
      "Copri con acqua e cuoci a fuoco lento per 25 minuti, mescolando ogni tanto.",
      "Unisci il cavolo nero tagliato a listarelle e continua la cottura per altri 10 minuti.",
      "Aggiusta di sale e servi ben caldo, con un filo d'olio a crudo."
    ],
    "fonte": "seed",
    "descrizione": "Nutriente e confortante, un classico invernale toscano.",
    "costoStimatoPorzione": 2.0
  },
  {
    "id": "r24",
    "titolo": "Involtini di pollo con speck e formaggio",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 20,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "petto_pollo",
        "quantitaG": 640
      },
      {
        "ingredientId": "speck",
        "quantitaG": 80
      },
      {
        "ingredientId": "scamorza",
        "quantitaG": 150
      },
      {
        "ingredientId": "salvia",
        "quantitaG": 2
      },
      {
        "ingredientId": "vino_bianco",
        "quantitaG": 50
      }
    ],
    "passaggi": [
      "Appiattisci le fettine di pollo e disponi su ciascuna una fetta di speck e un pezzo di scamorza.",
      "Arrotola e chiudi con uno stuzzicadenti, aggiungendo una foglia di salvia.",
      "Rosola gli involtini in padella con un filo d'olio finché sono dorati su tutti i lati.",
      "Sfuma con il vino bianco e cuoci coperto per 15 minuti a fuoco basso."
    ],
    "fonte": "seed",
    "descrizione": "Un secondo saporito, perfetto da accompagnare con verdure al forno.",
    "costoStimatoPorzione": 3.9
  },
  {
    "id": "r25",
    "titolo": "Crema di zucca con semi tostati",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "zuppa",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "zucca",
        "quantitaG": 800
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 500
      },
      {
        "ingredientId": "semi_zucca",
        "quantitaG": 20
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 15
      }
    ],
    "passaggi": [
      "Taglia la zucca a cubetti dopo averla privata della buccia.",
      "Soffriggi la cipolla tritata, aggiungi la zucca e copri con il brodo vegetale.",
      "Cuoci 25 minuti finché la zucca è morbida, poi frulla fino a ottenere una crema liscia.",
      "Tosta i semi di zucca in padella e usali per guarnire la crema."
    ],
    "fonte": "seed",
    "descrizione": "Vellutata avvolgente per le sere d'autunno.",
    "costoStimatoPorzione": 1.9
  },
  {
    "id": "r26",
    "titolo": "Polpette al sugo con purè",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "carne_rossa",
    "tempoPrepMin": 20,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "carne_macinata_mista",
        "quantitaG": 560
      },
      {
        "ingredientId": "pane_raffermo",
        "quantitaG": 50
      },
      {
        "ingredientId": "uova",
        "quantitaG": 50
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 30
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 400
      },
      {
        "ingredientId": "patata",
        "quantitaG": 500
      },
      {
        "ingredientId": "latte",
        "quantitaG": 100
      }
    ],
    "passaggi": [
      "Ammorbidisci il pane raffermo nel latte, poi strizzalo e uniscilo alla carne con uovo e parmigiano.",
      "Forma delle polpette regolari con le mani.",
      "Rosola le polpette in padella, poi aggiungi la passata di pomodoro e cuoci a fuoco lento per 25 minuti.",
      "Nel frattempo lessa le patate e schiacciale con un filo di latte per il purè.",
      "Servi le polpette al sugo accompagnate dal purè."
    ],
    "fonte": "seed",
    "descrizione": "Il piatto della nonna: polpette morbide in un sugo saporito.",
    "costoStimatoPorzione": 3.3
  },
  {
    "id": "r29",
    "titolo": "Baccalà alla livornese",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 25,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": false,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "baccala_ammollato",
        "quantitaG": 600
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 400
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 10
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 5
      },
      {
        "ingredientId": "farina_00",
        "quantitaG": 30
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      }
    ],
    "passaggi": [
      "Taglia il baccalà a pezzi, asciugalo e infarinalo leggermente.",
      "Rosolalo in padella con un filo d'olio finché è dorato, poi mettilo da parte.",
      "Nella stessa padella soffriggi l'aglio, aggiungi i pomodori pelati schiacciati e cuoci 10 minuti.",
      "Rimetti il baccalà nel sugo e cuoci coperto a fuoco basso per 15 minuti.",
      "Completa con prezzemolo tritato fresco."
    ],
    "fonte": "seed",
    "descrizione": "Un classico toscano, delicato e saporito allo stesso tempo.",
    "costoStimatoPorzione": 4.8
  },
  {
    "id": "r36",
    "titolo": "Spaghetti alle vongole",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 20,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "spaghetti",
        "quantitaG": 320
      },
      {
        "ingredientId": "vongole",
        "quantitaG": 800
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 10
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 40
      },
      {
        "ingredientId": "vino_bianco",
        "quantitaG": 60
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 5
      },
      {
        "ingredientId": "peperoncino_essiccato",
        "quantitaG": 1
      }
    ],
    "passaggi": [
      "Metti le vongole in acqua fredda salata per un'ora, per farle spurgare bene.",
      "In una padella larga fai dorare l'aglio nell'olio, poi aggiungi le vongole e sfuma con il vino bianco.",
      "Copri e cuoci finché le vongole non si aprono, poi tienile da parte con il loro sughetto.",
      "Cuoci gli spaghetti al dente, saltali nel sughetto di vongole e completa con prezzemolo e peperoncino."
    ],
    "fonte": "seed",
    "descrizione": "Il profumo del mare in un piatto di pasta, come al ristorante del porto.",
    "costoStimatoPorzione": 4.8
  },
  {
    "id": "r37",
    "titolo": "Orata al cartoccio con patate e olive",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "media",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "isole",
    "ingredienti": [
      {
        "ingredientId": "orata",
        "quantitaG": 600
      },
      {
        "ingredientId": "patata",
        "quantitaG": 500
      },
      {
        "ingredientId": "olive_nere",
        "quantitaG": 60
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "limone",
        "quantitaG": 90
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Taglia le patate a fette sottili e disponile su un foglio di carta forno.",
      "Adagia l'orata sulle patate, aggiungi le olive e qualche fetta di limone.",
      "Chiudi bene il cartoccio, irrora con l'olio e profuma con il rosmarino.",
      "Cuoci in forno a 200°C per 25-30 minuti: aprirai il cartoccio solo a tavola."
    ],
    "fonte": "seed",
    "descrizione": "Un secondo elegante che profuma tutta la casa, pronto quasi da solo.",
    "costoStimatoPorzione": 5.2
  },
  {
    "id": "r38",
    "titolo": "Merluzzo in padella con pomodorini e olive",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "leggera",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": false,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "merluzzo",
        "quantitaG": 600
      },
      {
        "ingredientId": "pomodorino",
        "quantitaG": 250
      },
      {
        "ingredientId": "olive_taggiasche",
        "quantitaG": 50
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
      "Scalda l'olio con l'aglio in padella e aggiungi i pomodorini tagliati a metà.",
      "Cuoci qualche minuto finché i pomodorini iniziano a sfaldarsi.",
      "Adagia il merluzzo nel sugo, unisci le olive e cuoci coperto per 10 minuti.",
      "Finisci con una manciata di prezzemolo fresco."
    ],
    "fonte": "seed",
    "descrizione": "Un secondo di pesce veloce, leggero ma pieno di sapore.",
    "costoStimatoPorzione": 4.2
  },
  {
    "id": "r41",
    "titolo": "Cozze alla marinara",
    "slotAmmessi": [
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
    "trasportabile": false,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "cozze",
        "quantitaG": 1200
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 200
      },
      {
        "ingredientId": "aglio",
        "quantitaG": 10
      },
      {
        "ingredientId": "vino_bianco",
        "quantitaG": 50
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      },
      {
        "ingredientId": "peperoncino_essiccato",
        "quantitaG": 1
      },
      {
        "ingredientId": "prezzemolo",
        "quantitaG": 5
      }
    ],
    "passaggi": [
      "Pulisci bene le cozze, eliminando il bisso e le eventuali incrostazioni.",
      "Fai rosolare aglio e peperoncino nell'olio, poi aggiungi le cozze e sfuma con il vino.",
      "Unisci i pelati spezzettati, copri e cuoci finché le cozze si aprono.",
      "Servi ben calde con tanto prezzemolo e, se vuoi, del pane per la scarpetta."
    ],
    "fonte": "seed",
    "descrizione": "Un classico da mangiare con le mani, pane fresco per la scarpetta.",
    "costoStimatoPorzione": 3.8
  },
  {
    "id": "r42",
    "titolo": "Pasta e fagioli",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "zuppa",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "legumi",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "pasta_corta",
        "quantitaG": 200
      },
      {
        "ingredientId": "fagioli_borlotti_lessati",
        "quantitaG": 400
      },
      {
        "ingredientId": "sedano",
        "quantitaG": 40
      },
      {
        "ingredientId": "carota",
        "quantitaG": 80
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      },
      {
        "ingredientId": "passata_pomodoro",
        "quantitaG": 100
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Trita sedano, carota e cipolla e falli appassire dolcemente nell'olio.",
      "Aggiungi la passata e metà dei fagioli, poi frulla tutto per dare cremosità.",
      "Rimetti sul fuoco, unisci il resto dei fagioli interi e un po' d'acqua se serve, e porta a bollore.",
      "Cuoci la pasta direttamente nel brodo di fagioli, mescolando spesso, e profuma con il rosmarino."
    ],
    "fonte": "seed",
    "descrizione": "Il piatto della nonna che scalda anche l'anima, oltre allo stomaco.",
    "costoStimatoPorzione": 2
  },
  {
    "id": "r46",
    "titolo": "Vellutata di piselli e menta",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "zuppa",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 10,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "pisello_fresco",
        "quantitaG": 500
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 500
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "menta",
        "quantitaG": 3
      }
    ],
    "passaggi": [
      "Fai appassire la cipolla tritata in un filo d'olio.",
      "Aggiungi i piselli e il brodo vegetale e cuoci per 15 minuti.",
      "Frulla tutto fino a ottenere una crema liscia.",
      "Profuma con qualche foglia di menta fresca prima di servire."
    ],
    "fonte": "seed",
    "descrizione": "Fresca e delicata, buona anche tiepida nelle sere d'estate.",
    "costoStimatoPorzione": 1.8
  },
  {
    "id": "r50",
    "titolo": "Vellutata di broccoli",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "zuppa",
    "pesantezza": "leggera",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 15,
    "difficolta": 1,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": false,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "broccolo",
        "quantitaG": 500
      },
      {
        "ingredientId": "patata",
        "quantitaG": 200
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 500
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 20
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 30
      }
    ],
    "passaggi": [
      "Fai appassire la cipolla nell'olio, poi aggiungi patate e broccoli a pezzi.",
      "Copri con il brodo vegetale e cuoci per 20 minuti, finché le verdure sono morbide.",
      "Frulla fino a ottenere una crema vellutata.",
      "Servi con una spolverata di parmigiano."
    ],
    "fonte": "seed",
    "descrizione": "Verde, cremosa e confortante, con il parmigiano che fa sempre bene.",
    "costoStimatoPorzione": 1.7
  },
  {
    "id": "r51",
    "titolo": "Cavolfiore gratinato al forno",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "contorno",
    "pesantezza": "media",
    "proteinaPrincipale": "latticini",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 25,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 4,
    "congelabile": true,
    "trasportabile": true,
    "area": "nazionale",
    "ingredienti": [
      {
        "ingredientId": "cavolfiore",
        "quantitaG": 800
      },
      {
        "ingredientId": "besciamella",
        "quantitaG": 300
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 50
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 20
      }
    ],
    "passaggi": [
      "Cuoci il cavolfiore a vapore o in acqua bollente finché è appena tenero, poi dividilo a cimette in una pirofila.",
      "Ricopri con la besciamella e cospargi di parmigiano e pane grattugiato.",
      "Cuoci in forno finché la superficie è dorata e croccante."
    ],
    "fonte": "seed",
    "descrizione": "Un contorno che diventa piatto unico, con la crosticina dorata da contendersi.",
    "costoStimatoPorzione": 2
  },
  {
    "id": "r54",
    "titolo": "Risotto alla milanese",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 5,
    "tempoCotturaMin": 30,
    "difficolta": 3,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": false,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "riso_carnaroli",
        "quantitaG": 320
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 1000
      },
      {
        "ingredientId": "burro",
        "quantitaG": 40
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 60
      },
      {
        "ingredientId": "vino_bianco",
        "quantitaG": 50
      },
      {
        "ingredientId": "zafferano",
        "quantitaG": 1
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      }
    ],
    "passaggi": [
      "Fai appassire la cipolla tritata in metà del burro.",
      "Tosta il riso per un paio di minuti, poi sfuma con il vino bianco.",
      "Aggiungi il brodo caldo un mestolo alla volta, mescolando spesso, per circa 18 minuti.",
      "A fine cottura manteca con lo zafferano sciolto in poco brodo, il burro rimasto e il parmigiano."
    ],
    "fonte": "seed",
    "descrizione": "Giallo oro e cremoso, il risotto delle grandi occasioni feriali.",
    "costoStimatoPorzione": 3
  },
  {
    "id": "r55",
    "titolo": "Cotoletta di pollo alla milanese",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 10,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": false,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "petto_pollo",
        "quantitaG": 600
      },
      {
        "ingredientId": "uova",
        "quantitaG": 100
      },
      {
        "ingredientId": "pane_grattugiato",
        "quantitaG": 150
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 30
      },
      {
        "ingredientId": "olio_semi",
        "quantitaG": 30
      }
    ],
    "passaggi": [
      "Appiattisci leggermente le fettine di pollo con un batticarne.",
      "Passale prima nell'uovo sbattuto, poi nel pane grattugiato mescolato al parmigiano.",
      "Cuoci in padella con l'olio ben caldo, un paio di minuti per lato, finché sono dorate e croccanti."
    ],
    "fonte": "seed",
    "descrizione": "Croccante fuori e morbida dentro, la cotoletta di casa senza troppi grassi.",
    "costoStimatoPorzione": 3.6
  },
  {
    "id": "r57",
    "titolo": "Orzotto alla zucca",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "primo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "nessuna",
    "tempoPrepMin": 10,
    "tempoCotturaMin": 25,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 2,
    "congelabile": false,
    "trasportabile": false,
    "area": "nord",
    "ingredienti": [
      {
        "ingredientId": "orzo_perlato",
        "quantitaG": 300
      },
      {
        "ingredientId": "zucca",
        "quantitaG": 400
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      },
      {
        "ingredientId": "brodo_vegetale",
        "quantitaG": 900
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
      "Fai appassire la cipolla nell'olio, poi aggiungi la zucca a cubetti e falla insaporire.",
      "Unisci l'orzo e tostalo un paio di minuti.",
      "Versa il brodo caldo poco alla volta, come per un risotto, mescolando per circa 20 minuti.",
      "Manteca con il parmigiano fuori dal fuoco."
    ],
    "fonte": "seed",
    "descrizione": "Cremoso come un risotto, ma con la marcia in più della fibra dell'orzo.",
    "costoStimatoPorzione": 2.3
  },
  {
    "id": "r58",
    "titolo": "Riso, patate e cozze",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "piatto_unico",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "pesce",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 35,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 1,
    "congelabile": false,
    "trasportabile": false,
    "area": "sud",
    "ingredienti": [
      {
        "ingredientId": "riso_carnaroli",
        "quantitaG": 250
      },
      {
        "ingredientId": "patata",
        "quantitaG": 400
      },
      {
        "ingredientId": "cozze",
        "quantitaG": 800
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 150
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 30
      },
      {
        "ingredientId": "parmigiano",
        "quantitaG": 30
      }
    ],
    "passaggi": [
      "Apri le cozze in padella con un filo d'olio, poi sgusciale tenendo da parte il loro liquido filtrato.",
      "In una teglia disponi a strati patate a fette, cipolla, riso crudo e le cozze.",
      "Bagna con il liquido delle cozze filtrato, i pelati spezzettati e un filo d'olio, aggiungendo acqua quanto basta a coprire.",
      "Cuoci in forno finché il riso e le patate sono teneri, con una spolverata di parmigiano prima di servire."
    ],
    "fonte": "seed",
    "descrizione": "La tiella pugliese, un forno unico che profuma di festa.",
    "costoStimatoPorzione": 4
  },
  {
    "id": "r59",
    "titolo": "Pollo alla cacciatora",
    "slotAmmessi": [
      "cena"
    ],
    "portata": "secondo",
    "pesantezza": "sostanziosa",
    "proteinaPrincipale": "carne_bianca",
    "tempoPrepMin": 15,
    "tempoCotturaMin": 30,
    "difficolta": 2,
    "porzioni": 4,
    "conservabilitaGiorni": 3,
    "congelabile": true,
    "trasportabile": true,
    "area": "centro",
    "ingredienti": [
      {
        "ingredientId": "petto_pollo",
        "quantitaG": 600
      },
      {
        "ingredientId": "pomodori_pelati",
        "quantitaG": 300
      },
      {
        "ingredientId": "olive_nere",
        "quantitaG": 50
      },
      {
        "ingredientId": "cipolla",
        "quantitaG": 130
      },
      {
        "ingredientId": "vino_bianco",
        "quantitaG": 80
      },
      {
        "ingredientId": "rosmarino",
        "quantitaG": 3
      },
      {
        "ingredientId": "olio_evo",
        "quantitaG": 25
      }
    ],
    "passaggi": [
      "Rosola i pezzi di pollo nell'olio finché sono dorati su ogni lato, poi tienili da parte.",
      "Nello stesso tegame fai appassire la cipolla, sfuma con il vino bianco e lascia evaporare.",
      "Aggiungi i pelati spezzettati, le olive e il rosmarino, rimetti il pollo e cuoci coperto per 30 minuti.",
      "Il sugo si sarà ristretto e il pollo sarà morbidissimo: perfetto con del pane per fare la scarpetta."
    ],
    "fonte": "seed",
    "descrizione": "Il pollo della domenica, che si fa quasi da solo mentre profuma la cucina.",
    "costoStimatoPorzione": 3.4
  },
{
  id: "r077",
  titolo: "Zuppa di ceci e cavolo nero",
  slotAmmessi: [
    "cena"
  ],
  portata: "zuppa",
  pesantezza: "media",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 10,
  tempoCotturaMin: 35,
  difficolta: 1,
  porzioni: 4,
  conservabilitaGiorni: 4,
  congelabile: true,
  trasportabile: false,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "ceci_lessati",
      quantitaG: 480
    },
    {
      ingredientId: "cavolo_nero",
      quantitaG: 250
    },
    {
      ingredientId: "cipolla",
      quantitaG: 80
    },
    {
      ingredientId: "aglio",
      quantitaG: 10
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 600
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 30
    },
    {
      ingredientId: "peperoncino_essiccato",
      quantitaG: 1,
      opzionale: true
    }
  ],
  passaggi: [
    "Soffriggi cipolla e aglio tritati in olio per qualche minuto.",
    "Aggiungi i ceci lessati e il cavolo nero tagliato a listarelle, mescola un paio di minuti.",
    "Versa il brodo vegetale, porta a bollore e cuoci coperto per 30 minuti.",
    "Frulla grossolanamente metà zuppa per renderla più densa, poi rimescola tutto insieme.",
    "Servi con un filo d'olio a crudo e, a piacere, un pizzico di peperoncino."
  ],
  fonte: "seed",
  descrizione: "Una zuppa invernale toscana, sostanziosa e adatta a essere congelata a porzioni.",
  costoStimatoPorzione: 1.6
},
{
  id: "r078",
  titolo: "Salmone al vapore con broccoli e limone",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "leggera",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 10,
  tempoCotturaMin: 15,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "salmone_fresco",
      quantitaG: 320
    },
    {
      ingredientId: "broccolo",
      quantitaG: 300
    },
    {
      ingredientId: "limone",
      quantitaG: 40,
      opzionale: true
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
    "Dividi il broccolo in cimette e disponilo nel cestello per la cottura a vapore.",
    "Adagia i filetti di salmone sopra le cimette e cuoci a vapore per 12-15 minuti.",
    "Condisci con olio, succo di limone e un pizzico di sale prima di servire."
  ],
  fonte: "seed",
  descrizione: "Cena leggera e veloce, senza grassi aggiunti in cottura, di stagione invernale.",
  costoStimatoPorzione: 4.2
},
{
  id: "r079",
  titolo: "Spezzatino di manzo con carote e patate",
  slotAmmessi: [
    "cena"
  ],
  portata: "secondo",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "carne_rossa",
  tempoPrepMin: 15,
  tempoCotturaMin: 90,
  difficolta: 2,
  porzioni: 4,
  conservabilitaGiorni: 4,
  congelabile: true,
  trasportabile: false,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "spezzatino_manzo",
      quantitaG: 640
    },
    {
      ingredientId: "carota",
      quantitaG: 200
    },
    {
      ingredientId: "patata",
      quantitaG: 300
    },
    {
      ingredientId: "cipolla",
      quantitaG: 100
    },
    {
      ingredientId: "passata_pomodoro",
      quantitaG: 200
    },
    {
      ingredientId: "vino_rosso",
      quantitaG: 100
    },
    {
      ingredientId: "rosmarino",
      quantitaG: 3
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Rosola la carne a cubetti in olio caldo finché è ben colorita su tutti i lati.",
    "Aggiungi la cipolla tritata e falla appassire, poi sfuma con il vino rosso.",
    "Unisci la passata di pomodoro e il rosmarino, copri con acqua a filo e cuoci coperto a fuoco basso per un'ora.",
    "Aggiungi carote e patate a tocchetti e continua la cottura per altri 30 minuti, finché tutto è morbido.",
    "Aggiusta di sale e lascia riposare qualche minuto prima di servire."
  ],
  fonte: "seed",
  descrizione: "Un piatto invernale che migliora da un giorno all'altro: ottimo da preparare in anticipo.",
  costoStimatoPorzione: 3.8
},
{
  id: "r080",
  titolo: "Vellutata di carote, finocchi e zenzero",
  slotAmmessi: [
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
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "carota",
      quantitaG: 350
    },
    {
      ingredientId: "finocchio",
      quantitaG: 200
    },
    {
      ingredientId: "patata",
      quantitaG: 150
    },
    {
      ingredientId: "zenzero",
      quantitaG: 15
    },
    {
      ingredientId: "cipolla",
      quantitaG: 80
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
    "Soffriggi la cipolla tritata con lo zenzero grattugiato in un filo d'olio.",
    "Aggiungi carote, finocchi e patate a pezzi, mescola un paio di minuti.",
    "Versa il brodo vegetale e cuoci coperto per 20-25 minuti, finché le verdure sono morbide.",
    "Frulla tutto fino a ottenere una crema liscia, aggiusta di sale."
  ],
  fonte: "seed",
  descrizione: "Vellutata invernale, dolce e speziata al punto giusto.",
  costoStimatoPorzione: 1.4
},
{
  id: "r081",
  titolo: "Filetto di branzino al forno con carciofi",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 15,
  tempoCotturaMin: 25,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "sud",
  ingredienti: [
    {
      ingredientId: "branzino",
      quantitaG: 320
    },
    {
      ingredientId: "carciofo",
      quantitaG: 300
    },
    {
      ingredientId: "limone",
      quantitaG: 40,
      opzionale: true
    },
    {
      ingredientId: "aglio",
      quantitaG: 5
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
    "Pulisci i carciofi, tagliali a spicchi sottili e mettili in acqua e limone per non farli annerire.",
    "Disponi i carciofi scolati in una teglia con aglio, olio e un pizzico di sale, inforna a 200°C per 10 minuti.",
    "Adagia i filetti di branzino sopra i carciofi, irrora con olio e succo di limone.",
    "Continua la cottura in forno per altri 15 minuti, finché il pesce è cotto e i carciofi dorati.",
    "Completa con prezzemolo tritato prima di servire."
  ],
  fonte: "seed",
  descrizione: "Un piatto unico delicato, di stagione da autunno a primavera.",
  costoStimatoPorzione: 4.5
},
{
  id: "r083",
  titolo: "Tofu saltato con verdure e salsa di soia",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "tofu_tempeh",
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
      ingredientId: "tofu",
      quantitaG: 280
    },
    {
      ingredientId: "peperone",
      quantitaG: 150
    },
    {
      ingredientId: "carota",
      quantitaG: 100
    },
    {
      ingredientId: "zenzero",
      quantitaG: 10
    },
    {
      ingredientId: "salsa_soia",
      quantitaG: 30
    },
    {
      ingredientId: "olio_semi",
      quantitaG: 20
    },
    {
      ingredientId: "sesamo",
      quantitaG: 5
    }
  ],
  passaggi: [
    "Taglia il tofu a cubetti e asciugalo bene con carta da cucina.",
    "Scalda l'olio in un wok e rosola il tofu finché è dorato su tutti i lati, mettilo da parte.",
    "Nello stesso wok salta peperone e carota a listarelle con lo zenzero grattugiato per qualche minuto.",
    "Rimetti il tofu nel wok, sfuma con la salsa di soia e mescola bene.",
    "Completa con i semi di sesamo prima di servire."
  ],
  fonte: "seed",
  descrizione: "Una cena vegetale in stile asiatico, pronta in venti minuti.",
  costoStimatoPorzione: 2.4
},
{
  id: "r102",
  titolo: "Risotto agli asparagi",
  slotAmmessi: [
    "cena"
  ],
  portata: "primo",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 30,
  difficolta: 3,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: false,
  area: "nord",
  ingredienti: [
    {
      ingredientId: "riso_carnaroli",
      quantitaG: 160
    },
    {
      ingredientId: "asparago",
      quantitaG: 250
    },
    {
      ingredientId: "cipolla",
      quantitaG: 50
    },
    {
      ingredientId: "vino_bianco",
      quantitaG: 50
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 600
    },
    {
      ingredientId: "burro",
      quantitaG: 20
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 40
    }
  ],
  passaggi: [
    "Taglia gli asparagi a tocchetti, tenendo da parte le punte, e sbollentali brevemente nel brodo.",
    "Soffriggi la cipolla tritata in un filo d'olio, tosta il riso un paio di minuti.",
    "Sfuma con il vino bianco, poi aggiungi il brodo caldo un mestolo alla volta, mescolando.",
    "A metà cottura unisci gli asparagi, continua fino a cottura del riso (circa 18 minuti totali).",
    "Manteca fuori dal fuoco con burro e parmigiano."
  ],
  fonte: "seed",
  descrizione: "Un risotto di primavera, cremoso al punto giusto.",
  costoStimatoPorzione: 2.9
},
{
  id: "r103",
  titolo: "Vellutata di castagne e porri",
  slotAmmessi: [
    "cena"
  ],
  portata: "zuppa",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 30,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 4,
  congelabile: true,
  trasportabile: false,
  area: "nord",
  ingredienti: [
    {
      ingredientId: "castagna",
      quantitaG: 300
    },
    {
      ingredientId: "porro",
      quantitaG: 200
    },
    {
      ingredientId: "patata",
      quantitaG: 150
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 600
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "rosmarino",
      quantitaG: 3
    }
  ],
  passaggi: [
    "Soffriggi il porro affettato in olio con un rametto di rosmarino.",
    "Aggiungi le castagne (già lessate e pelate) e la patata a pezzi.",
    "Versa il brodo vegetale e cuoci coperto per 25-30 minuti, finché tutto è morbido.",
    "Elimina il rosmarino e frulla fino a una crema liscia."
  ],
  fonte: "seed",
  descrizione: "Una vellutata autunnale, dolce e vellutata come dice il nome.",
  costoStimatoPorzione: 2.2
},
{
  id: "r105",
  titolo: "Merluzzo in guazzetto con piselli",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "sud",
  ingredienti: [
    {
      ingredientId: "merluzzo",
      quantitaG: 360
    },
    {
      ingredientId: "pisello_fresco",
      quantitaG: 150
    },
    {
      ingredientId: "pomodori_pelati",
      quantitaG: 150
    },
    {
      ingredientId: "aglio",
      quantitaG: 5
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
    "Soffriggi l'aglio in olio, aggiungi i pomodorini tagliati a metà e cuoci qualche minuto.",
    "Unisci i piselli freschi e un mestolo d'acqua, cuoci 10 minuti.",
    "Adagia i tranci di merluzzo nel sugo, copri e cuoci altri 8-10 minuti finché il pesce è cotto.",
    "Completa con prezzemolo tritato prima di servire."
  ],
  fonte: "seed",
  descrizione: "Un piatto unico di pesce e verdure di primavera, in un solo tegame.",
  costoStimatoPorzione: 4
},
{
  id: "r106",
  titolo: "Arrosto di tacchino con radicchio e mele",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "carne_bianca",
  tempoPrepMin: 15,
  tempoCotturaMin: 40,
  difficolta: 2,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "tacchino_fettine",
      quantitaG: 480
    },
    {
      ingredientId: "radicchio",
      quantitaG: 200
    },
    {
      ingredientId: "mela",
      quantitaG: 200
    },
    {
      ingredientId: "vino_bianco",
      quantitaG: 60
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "rosmarino",
      quantitaG: 3
    }
  ],
  passaggi: [
    "Rosola le fettine di tacchino in una padella con olio e rosmarino finché sono dorate.",
    "Sfuma con il vino bianco e lascia evaporare.",
    "Aggiungi il radicchio tagliato a listarelle e la mela a fette, copri e cuoci 20 minuti a fuoco basso.",
    "Continua la cottura scoperta altri 10 minuti finché il fondo si restringe leggermente."
  ],
  fonte: "seed",
  descrizione: "Un secondo autunnale, dolce e amarognolo insieme.",
  costoStimatoPorzione: 3.6
},
{
  id: "r107",
  titolo: "Zuppa di farro e funghi porcini",
  slotAmmessi: [
    "cena"
  ],
  portata: "zuppa",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 15,
  tempoCotturaMin: 35,
  difficolta: 2,
  porzioni: 3,
  conservabilitaGiorni: 4,
  congelabile: true,
  trasportabile: false,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "farro_perlato",
      quantitaG: 210
    },
    {
      ingredientId: "fungo_porcino_fresco",
      quantitaG: 250
    },
    {
      ingredientId: "cipolla",
      quantitaG: 60
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 700
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
    "Pulisci i funghi porcini e tagliali a fette spesse.",
    "Soffriggi la cipolla in olio, aggiungi i funghi e falli rosolare qualche minuto.",
    "Unisci il farro e tostalo un minuto, poi versa il brodo vegetale.",
    "Cuoci coperto per 30-35 minuti, mescolando ogni tanto, finché il farro è morbido.",
    "Completa con prezzemolo tritato e un filo d'olio a crudo."
  ],
  fonte: "seed",
  descrizione: "Il piatto dei boschi in autunno, sostanzioso e profumato.",
  costoStimatoPorzione: 3.1
},
{
  id: "r135",
  titolo: "Zuppa di porri e patate",
  slotAmmessi: [
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
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "porro",
      quantitaG: 300
    },
    {
      ingredientId: "patata",
      quantitaG: 250
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
    "Affetta i porri e falli appassire in olio a fuoco basso per 5 minuti.",
    "Aggiungi le patate a pezzi e il brodo vegetale.",
    "Cuoci coperto per 20 minuti, poi frulla fino a una crema liscia."
  ],
  fonte: "seed",
  descrizione: "Una vellutata invernale semplicissima, solo due verdure.",
  costoStimatoPorzione: 1
},
{
  id: "r136",
  titolo: "Pollo alle verze",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "carne_bianca",
  tempoPrepMin: 15,
  tempoCotturaMin: 35,
  difficolta: 2,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "nord",
  ingredienti: [
    {
      ingredientId: "coscia_pollo",
      quantitaG: 480
    },
    {
      ingredientId: "cavolo_verza",
      quantitaG: 400
    },
    {
      ingredientId: "cipolla",
      quantitaG: 80
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 200
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Rosola le cosce di pollo in olio finché sono dorate su tutti i lati.",
    "Aggiungi la cipolla tritata e la verza tagliata a listarelle.",
    "Versa il brodo, copri e cuoci a fuoco basso per 30 minuti, finché il pollo è cotto e la verza morbida."
  ],
  fonte: "seed",
  descrizione: "Un piatto unico invernale, contadino e sostanzioso.",
  costoStimatoPorzione: 3
},
{
  id: "r138",
  titolo: "Merluzzo con cavolfiore e olive",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 10,
  tempoCotturaMin: 25,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "sud",
  ingredienti: [
    {
      ingredientId: "merluzzo",
      quantitaG: 360
    },
    {
      ingredientId: "cavolfiore",
      quantitaG: 300
    },
    {
      ingredientId: "olive_nere",
      quantitaG: 40
    },
    {
      ingredientId: "aglio",
      quantitaG: 5
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 25
    }
  ],
  passaggi: [
    "Cuoci il cavolfiore a cimette al vapore per 10 minuti.",
    "In una padella scalda olio e aglio, aggiungi il cavolfiore e le olive, rosola qualche minuto.",
    "Adagia i tranci di merluzzo sopra, copri e cuoci altri 12-15 minuti finché il pesce è cotto."
  ],
  fonte: "seed",
  descrizione: "Un piatto unico invernale del sud Italia, in un solo tegame.",
  costoStimatoPorzione: 4.1
},
{
  id: "r139",
  titolo: "Risi e bisi (risotto ai piselli)",
  slotAmmessi: [
    "cena"
  ],
  portata: "primo",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 25,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: false,
  area: "nord",
  ingredienti: [
    {
      ingredientId: "riso_carnaroli",
      quantitaG: 160
    },
    {
      ingredientId: "pisello_fresco",
      quantitaG: 200
    },
    {
      ingredientId: "cipolla",
      quantitaG: 50
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 500
    },
    {
      ingredientId: "burro",
      quantitaG: 20
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 30
    }
  ],
  passaggi: [
    "Soffriggi la cipolla tritata in metà del burro.",
    "Aggiungi il riso e tostalo un paio di minuti, poi i piselli.",
    "Versa il brodo caldo un mestolo alla volta, mescolando, per circa 18 minuti.",
    "Manteca fuori dal fuoco con il burro rimasto e il parmigiano."
  ],
  fonte: "seed",
  descrizione: "Il piatto veneto di primavera, una via di mezzo tra minestra e risotto.",
  costoStimatoPorzione: 2.2
},
{
  id: "r142",
  titolo: "Involtini di pollo con asparagi",
  slotAmmessi: [
    "cena"
  ],
  portata: "secondo",
  pesantezza: "media",
  proteinaPrincipale: "carne_bianca",
  tempoPrepMin: 15,
  tempoCotturaMin: 20,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: true,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "petto_pollo",
      quantitaG: 320
    },
    {
      ingredientId: "asparago",
      quantitaG: 200
    },
    {
      ingredientId: "vino_bianco",
      quantitaG: 40
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    }
  ],
  passaggi: [
    "Appiattisci le fettine di pollo e avvolgi ciascuna intorno a un paio di asparagi.",
    "Chiudi con uno stuzzicadenti e rosola gli involtini in padella con olio.",
    "Sfuma con il vino bianco e cuoci coperto per 12-15 minuti."
  ],
  fonte: "seed",
  descrizione: "Un secondo di primavera, leggero e colorato.",
  costoStimatoPorzione: 3.3
},
{
  id: "r143",
  titolo: "Minestra di piselli e fave",
  slotAmmessi: [
    "cena"
  ],
  portata: "zuppa",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: false,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "pisello_fresco",
      quantitaG: 250
    },
    {
      ingredientId: "fava_fresca",
      quantitaG: 250
    },
    {
      ingredientId: "cipolla",
      quantitaG: 60
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 500
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Soffriggi la cipolla in olio, aggiungi piselli e fave sgranate.",
    "Versa il brodo vegetale e cuoci coperto per 15-20 minuti.",
    "Frulla metà della minestra e rimescola con l'altra metà per una consistenza rustica."
  ],
  fonte: "seed",
  descrizione: "Una minestra di primavera dal colore verde brillante.",
  costoStimatoPorzione: 1.5
},
{
  id: "r144",
  titolo: "Salmone con asparagi al forno in un solo tegame",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "salmone_fresco",
      quantitaG: 340
    },
    {
      ingredientId: "asparago",
      quantitaG: 250
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "aglio",
      quantitaG: 5
    }
  ],
  passaggi: [
    "Disponi gli asparagi su una teglia, condisci con olio, aglio e sale.",
    "Inforna a 200°C per 8 minuti.",
    "Aggiungi i filetti di salmone sulla teglia e continua la cottura per altri 12 minuti."
  ],
  fonte: "seed",
  descrizione: "Cena di primavera senza pentole da lavare, tutto in forno.",
  costoStimatoPorzione: 4.6
},
{
  id: "r145",
  titolo: "Vellutata di asparagi",
  slotAmmessi: [
    "cena"
  ],
  portata: "zuppa",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: false,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "asparago",
      quantitaG: 400
    },
    {
      ingredientId: "patata",
      quantitaG: 100
    },
    {
      ingredientId: "cipolla",
      quantitaG: 50
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 500
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Soffriggi la cipolla in olio, aggiungi asparagi a tocchetti e patata.",
    "Versa il brodo vegetale e cuoci coperto per 18-20 minuti.",
    "Frulla fino a ottenere una crema liscia, aggiusta di sale."
  ],
  fonte: "seed",
  descrizione: "Una vellutata delicata, tutta di primavera.",
  costoStimatoPorzione: 1.9
},
{
  id: "r146",
  titolo: "Risotto al radicchio e taleggio",
  slotAmmessi: [
    "cena"
  ],
  portata: "primo",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 10,
  tempoCotturaMin: 25,
  difficolta: 3,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: false,
  area: "nord",
  ingredienti: [
    {
      ingredientId: "riso_carnaroli",
      quantitaG: 160
    },
    {
      ingredientId: "radicchio",
      quantitaG: 150
    },
    {
      ingredientId: "taleggio",
      quantitaG: 60,
      opzionale: true
    },
    {
      ingredientId: "philadelphia",
      quantitaG: 40
    },
    {
      ingredientId: "cipolla",
      quantitaG: 40
    },
    {
      ingredientId: "vino_rosso",
      quantitaG: 50
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 500
    }
  ],
  passaggi: [
    "Soffriggi la cipolla, tosta il riso e sfuma con il vino rosso.",
    "Aggiungi il radicchio tagliato a listarelle e prosegui la cottura versando il brodo caldo a mestoli.",
    "A fine cottura manteca con il formaggio spalmabile (e il taleggio, se lo usi) fuori dal fuoco."
  ],
  fonte: "seed",
  descrizione: "Un risotto invernale dal gusto deciso, amaro e cremoso.",
  costoStimatoPorzione: 2.8
},
{
  id: "r151",
  titolo: "Gazpacho di pomodoro e peperone",
  slotAmmessi: [
    "cena", "pranzo"
  ],
  portata: "zuppa",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 15,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "pomodoro",
      quantitaG: 500
    },
    {
      ingredientId: "peperone",
      quantitaG: 150
    },
    {
      ingredientId: "cetriolo",
      quantitaG: 150
    },
    {
      ingredientId: "aglio",
      quantitaG: 5
    },
    {
      ingredientId: "aceto",
      quantitaG: 10
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 30
    }
  ],
  passaggi: [
    "Taglia grossolanamente pomodori, peperone, cetriolo e aglio.",
    "Frulla tutto con aceto, olio e un pizzico di sale fino a una crema liscia.",
    "Passa al setaccio se la vuoi più vellutata, poi lascia raffreddare in frigorifero almeno 2 ore.",
    "Servi ben freddo, si conserva in frigorifero per qualche giorno."
  ],
  fonte: "seed",
  descrizione: "La zuppa fredda estiva per eccellenza, senza fornelli accesi.",
  costoStimatoPorzione: 1.5
},
{
  id: "r152",
  titolo: "Risotto ai carciofi",
  slotAmmessi: [
    "cena"
  ],
  portata: "primo",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 15,
  tempoCotturaMin: 25,
  difficolta: 3,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: false,
  area: "nord",
  ingredienti: [
    {
      ingredientId: "riso_carnaroli",
      quantitaG: 160
    },
    {
      ingredientId: "carciofo",
      quantitaG: 250
    },
    {
      ingredientId: "cipolla",
      quantitaG: 50
    },
    {
      ingredientId: "vino_bianco",
      quantitaG: 50
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 500
    },
    {
      ingredientId: "burro",
      quantitaG: 20
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 40
    }
  ],
  passaggi: [
    "Pulisci i carciofi e tagliali a spicchi sottili.",
    "Soffriggi la cipolla, tosta il riso e sfuma con il vino bianco.",
    "Aggiungi i carciofi e cuoci versando il brodo caldo un mestolo alla volta per 18 minuti.",
    "Manteca fuori dal fuoco con burro e parmigiano."
  ],
  fonte: "seed",
  descrizione: "Un risotto di primavera, delicato e vegetale.",
  costoStimatoPorzione: 2.6
},
{
  id: "r153",
  titolo: "Agnello con carciofi e piselli",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "carne_rossa",
  tempoPrepMin: 15,
  tempoCotturaMin: 40,
  difficolta: 2,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: false,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "agnello_a_pezzi",
      quantitaG: 450
    },
    {
      ingredientId: "carciofo",
      quantitaG: 300
    },
    {
      ingredientId: "pisello_fresco",
      quantitaG: 150
    },
    {
      ingredientId: "cipolla",
      quantitaG: 60
    },
    {
      ingredientId: "vino_bianco",
      quantitaG: 60
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Rosola l'agnello in olio finché è ben colorito su tutti i lati.",
    "Aggiungi la cipolla tritata e sfuma con il vino bianco.",
    "Unisci i carciofi a spicchi, copri con acqua a filo e cuoci a fuoco basso per 30 minuti.",
    "Aggiungi i piselli e continua la cottura per altri 10 minuti."
  ],
  fonte: "seed",
  descrizione: "Il piatto pasquale per eccellenza, di primavera piena.",
  costoStimatoPorzione: 4.8
},
{
  id: "r154",
  titolo: "Spezzatino di seppie con piselli",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 15,
  tempoCotturaMin: 35,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "sud",
  ingredienti: [
    {
      ingredientId: "seppie",
      quantitaG: 350
    },
    {
      ingredientId: "pisello_fresco",
      quantitaG: 150
    },
    {
      ingredientId: "pomodori_pelati",
      quantitaG: 150
    },
    {
      ingredientId: "aglio",
      quantitaG: 5
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "prezzemolo",
      quantitaG: 5,
      opzionale: true
    }
  ],
  passaggi: [
    "Taglia le seppie ad anelli e rosolale in olio con l'aglio per qualche minuto.",
    "Aggiungi i pomodori pelati spezzettati e cuoci coperto a fuoco basso per 20 minuti.",
    "Unisci i piselli e continua la cottura altri 10-15 minuti finché tutto è morbido.",
    "Completa con prezzemolo tritato."
  ],
  fonte: "seed",
  descrizione: "Un piatto unico di mare e primavera insieme.",
  costoStimatoPorzione: 3.9
},
{
  id: "r156",
  titolo: "Orata al forno con carciofi",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 15,
  tempoCotturaMin: 25,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: false,
  area: "isole",
  ingredienti: [
    {
      ingredientId: "orata",
      quantitaG: 360
    },
    {
      ingredientId: "carciofo",
      quantitaG: 250
    },
    {
      ingredientId: "aglio",
      quantitaG: 5
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 25
    },
    {
      ingredientId: "prezzemolo",
      quantitaG: 5,
      opzionale: true
    }
  ],
  passaggi: [
    "Disponi i carciofi a spicchi su una teglia con aglio, olio e un pizzico di sale.",
    "Inforna a 200°C per 10 minuti.",
    "Aggiungi l'orata condita con olio e prezzemolo, prosegui la cottura per altri 15-18 minuti."
  ],
  fonte: "seed",
  descrizione: "Un piatto unico di pesce di primavera, in un solo tegame.",
  costoStimatoPorzione: 4.7
},
{
  id: "r157",
  titolo: "Vellutata di fave e patate",
  slotAmmessi: [
    "cena"
  ],
  portata: "zuppa",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: false,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "fava_fresca",
      quantitaG: 300
    },
    {
      ingredientId: "patata",
      quantitaG: 150
    },
    {
      ingredientId: "cipolla",
      quantitaG: 50
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 500
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Soffriggi la cipolla, aggiungi fave sgranate e patata a pezzi.",
    "Versa il brodo vegetale e cuoci coperto 18-20 minuti.",
    "Frulla fino a ottenere una crema liscia."
  ],
  fonte: "seed",
  descrizione: "Una vellutata di primavera semplice e delicata.",
  costoStimatoPorzione: 1.4
},
{
  id: "r158",
  titolo: "Polpettone di manzo con piselli",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "carne_rossa",
  tempoPrepMin: 20,
  tempoCotturaMin: 35,
  difficolta: 2,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "manzo_macinato",
      quantitaG: 450
    },
    {
      ingredientId: "pane_grattugiato",
      quantitaG: 40
    },
    {
      ingredientId: "uova",
      quantitaG: 50
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 30
    },
    {
      ingredientId: "pisello_fresco",
      quantitaG: 200
    },
    {
      ingredientId: "passata_pomodoro",
      quantitaG: 200
    }
  ],
  passaggi: [
    "Amalgama la carne con pane grattugiato, uovo e parmigiano, forma un polpettone compatto.",
    "Rosolalo in padella su tutti i lati.",
    "Aggiungi la passata di pomodoro e i piselli, copri e cuoci a fuoco basso per 30 minuti.",
    "Taglia a fette prima di servire con il sugo."
  ],
  fonte: "seed",
  descrizione: "Un secondo sostanzioso che porta la primavera in tavola.",
  costoStimatoPorzione: 3.4
},
{
  id: "r159",
  titolo: "Farro con asparagi e gamberi",
  slotAmmessi: [
    "cena"
  ],
  portata: "piatto_unico",
  pesantezza: "media",
  proteinaPrincipale: "pesce",
  tempoPrepMin: 15,
  tempoCotturaMin: 20,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "farro_perlato",
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
    },
    {
      ingredientId: "aglio",
      quantitaG: 5
    }
  ],
  passaggi: [
    "Cuoci il farro in acqua salata seguendo i tempi in confezione.",
    "Salta gli asparagi a tocchetti in padella con olio e aglio per 8 minuti.",
    "Aggiungi i gamberi e cuoci altri 3-4 minuti finché sono rosati.",
    "Unisci il farro scolato e salta ancora un minuto insieme."
  ],
  fonte: "seed",
  descrizione: "Un piatto unico completo, pronto in mezz'ora.",
  costoStimatoPorzione: 4.2
},
{
  id: "r161",
  titolo: "Risotto con fave e pecorino",
  slotAmmessi: [
    "cena"
  ],
  portata: "primo",
  pesantezza: "sostanziosa",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 15,
  tempoCotturaMin: 25,
  difficolta: 3,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: false,
  area: "centro",
  ingredienti: [
    {
      ingredientId: "riso_carnaroli",
      quantitaG: 160
    },
    {
      ingredientId: "fava_fresca",
      quantitaG: 200
    },
    {
      ingredientId: "cipolla",
      quantitaG: 40
    },
    {
      ingredientId: "vino_bianco",
      quantitaG: 40
    },
    {
      ingredientId: "brodo_vegetale",
      quantitaG: 500
    },
    {
      ingredientId: "pecorino",
      quantitaG: 50
    }
  ],
  passaggi: [
    "Soffriggi la cipolla, tosta il riso e sfuma con il vino.",
    "Prosegui la cottura versando il brodo caldo un mestolo alla volta, aggiungendo le fave sgranate a metà cottura.",
    "Manteca fuori dal fuoco con il pecorino grattugiato."
  ],
  fonte: "seed",
  descrizione: "Un risotto di primavera dal sapore deciso.",
  costoStimatoPorzione: 2.7
},
{
  id: "r164",
  titolo: "Filetto di maiale con peperoni",
  slotAmmessi: [
    "cena"
  ],
  portata: "secondo",
  pesantezza: "media",
  proteinaPrincipale: "carne_rossa",
  tempoPrepMin: 15,
  tempoCotturaMin: 25,
  difficolta: 2,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: true,
  trasportabile: false,
  area: "sud",
  ingredienti: [
    {
      ingredientId: "lonza_maiale",
      quantitaG: 320
    },
    {
      ingredientId: "peperone",
      quantitaG: 300
    },
    {
      ingredientId: "vino_bianco",
      quantitaG: 50
    },
    {
      ingredientId: "aglio",
      quantitaG: 5
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Rosola il filetto di maiale a fette spesse in olio e aglio finché è dorato.",
    "Sfuma con il vino bianco e lascia evaporare.",
    "Aggiungi i peperoni a listarelle, copri e cuoci a fuoco basso per 18-20 minuti."
  ],
  fonte: "seed",
  descrizione: "Un secondo estivo, saporito e colorato di peperoni.",
  costoStimatoPorzione: 3.4
},
{
  id: "r165",
  titolo: "Melanzane ripiene al forno",
  slotAmmessi: [
    "cena"
  ],
  portata: "secondo",
  pesantezza: "media",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 20,
  tempoCotturaMin: 35,
  difficolta: 2,
  porzioni: 3,
  conservabilitaGiorni: 3,
  congelabile: true,
  trasportabile: true,
  area: "sud",
  ingredienti: [
    {
      ingredientId: "melanzana",
      quantitaG: 600
    },
    {
      ingredientId: "pane_grattugiato",
      quantitaG: 60
    },
    {
      ingredientId: "parmigiano",
      quantitaG: 40
    },
    {
      ingredientId: "pomodorino",
      quantitaG: 100
    },
    {
      ingredientId: "basilico",
      quantitaG: 5
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 25
    }
  ],
  passaggi: [
    "Taglia le melanzane a metà per il lungo e svuota leggermente la polpa, tenendola da parte.",
    "Trita la polpa con pomodorini e basilico, mescola con pane grattugiato e parmigiano.",
    "Farcisci le melanzane con il composto, irrora con olio.",
    "Inforna a 190°C per 35 minuti finché sono morbide e dorate in superficie."
  ],
  fonte: "seed",
  descrizione: "Un secondo estivo del sud, ripieno e profumato di basilico.",
  costoStimatoPorzione: 1.9
}
];
