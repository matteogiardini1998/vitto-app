import type { Recipe } from "../recipeSchema.ts";

/** Ricette esistenti (pre-R1) riclassificate sul nuovo schema, piu nuove ricette Fase R1. */
export const RICETTE_SPUNTINO: Recipe[] = [
{
  id: "r085",
  titolo: "Hummus di ceci con carote e sedano",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 10,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 4,
  conservabilitaGiorni: 4,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "ceci_lessati",
      quantitaG: 240
    },
    {
      ingredientId: "tahina",
      quantitaG: 30
    },
    {
      ingredientId: "limone",
      quantitaG: 30
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
      ingredientId: "carota",
      quantitaG: 160
    },
    {
      ingredientId: "sedano",
      quantitaG: 120
    }
  ],
  passaggi: [
    "Frulla i ceci con tahina, succo di limone, aglio e olio fino a una crema liscia.",
    "Aggiusta di sale e, se serve, aggiungi un cucchiaio d'acqua per la consistenza giusta.",
    "Taglia carote e sedano a bastoncini.",
    "Servi l'hummus in una ciotola con le verdure a bastoncino per intingere."
  ],
  fonte: "seed",
  descrizione: "Uno spuntino vegetale che si conserva tutta la settimana in frigorifero.",
  costoStimatoPorzione: 1.2
},
{
  id: "r086",
  titolo: "Mix di mandorle, noci e albicocche disidratate",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 3,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 4,
  conservabilitaGiorni: 14,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "mandorle",
      quantitaG: 80
    },
    {
      ingredientId: "noci",
      quantitaG: 60
    },
    {
      ingredientId: "datteri",
      quantitaG: 60
    }
  ],
  passaggi: [
    "Mescola mandorle, noci e datteri in un barattolo a chiusura ermetica.",
    "Dividi in porzioni da circa 50 g: pronto da portare sempre con sé."
  ],
  fonte: "seed",
  descrizione: "Lo spuntino da borsa che non ha bisogno di frigorifero.",
  costoStimatoPorzione: 1.5
},
{
  id: "r088",
  titolo: "Palline energetiche ai datteri e cacao",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 15,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 6,
  conservabilitaGiorni: 10,
  congelabile: true,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "datteri",
      quantitaG: 200
    },
    {
      ingredientId: "mandorle",
      quantitaG: 100
    },
    {
      ingredientId: "cacao_amaro",
      quantitaG: 20
    },
    {
      ingredientId: "farina_cocco",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Frulla i datteri denocciolati con le mandorle e il cacao fino a un composto appiccicoso.",
    "Forma delle palline con le mani, circa un cucchiaio di composto ciascuna.",
    "Passa ogni pallina nella farina di cocco rapé.",
    "Conserva in frigorifero in un contenitore chiuso."
  ],
  fonte: "seed",
  descrizione: "Dolci ma senza zuccheri aggiunti: solo frutta secca e datteri.",
  costoStimatoPorzione: 0.8
},
{
  id: "r089",
  titolo: "Chips di ceci al forno",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 5,
  tempoCotturaMin: 30,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 4,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "ceci_lessati",
      quantitaG: 300
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "paprika",
      quantitaG: 3
    },
    {
      ingredientId: "sale",
      quantitaG: 2
    }
  ],
  passaggi: [
    "Asciuga bene i ceci lessati con carta da cucina.",
    "Condiscili con olio, paprika e sale, mescolando per distribuire bene il condimento.",
    "Disponili in un solo strato su una teglia e inforna a 200°C per 30 minuti, mescolando a metà cottura.",
    "Lascia raffreddare: diventano croccanti fuori dal forno."
  ],
  fonte: "seed",
  descrizione: "Uno spuntino croccante e salato, senza fritture.",
  costoStimatoPorzione: 0.7
},
{
  id: "r109",
  titolo: "Bastoncini di sedano e carote con guacamole",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "sedano",
      quantitaG: 150
    },
    {
      ingredientId: "carota",
      quantitaG: 150
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
      ingredientId: "sale",
      quantitaG: 1
    }
  ],
  passaggi: [
    "Schiaccia l'avocado con una forchetta e condiscilo con succo di limone e sale: è il guacamole.",
    "Taglia sedano e carote a bastoncini.",
    "Servi i bastoncini con il guacamole per intingere."
  ],
  fonte: "seed",
  descrizione: "Fresco e cremoso, da fare al momento.",
  costoStimatoPorzione: 1.3
},
{
  id: "r110",
  titolo: "Macedonia di frutta di stagione",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 8,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "mela",
      quantitaG: 180
    },
    {
      ingredientId: "banana",
      quantitaG: 120
    },
    {
      ingredientId: "uva",
      quantitaG: 150
    },
    {
      ingredientId: "limone",
      quantitaG: 10
    }
  ],
  passaggi: [
    "Taglia la frutta a pezzi piccoli.",
    "Condisci con qualche goccia di limone per non farla annerire e mescola."
  ],
  fonte: "seed",
  descrizione: "Lo spuntino di frutta più semplice che c'è, d'autunno.",
  costoStimatoPorzione: 0.9
},
{
  id: "r111",
  titolo: "Popcorn al naturale",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 2,
  tempoCotturaMin: 5,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 2,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "popcorn_naturale",
      quantitaG: 60
    },
    {
      ingredientId: "olio_semi",
      quantitaG: 10
    },
    {
      ingredientId: "sale",
      quantitaG: 2
    }
  ],
  passaggi: [
    "Scalda l'olio in una pentola larga con coperchio a fuoco medio.",
    "Versa il mais per popcorn, copri e scuoti di tanto in tanto finché smette di scoppiettare.",
    "Sala leggermente e servi subito."
  ],
  fonte: "seed",
  descrizione: "Lo spuntino salato senza fritture, pronto in cinque minuti.",
  costoStimatoPorzione: 0.5
},
{
  id: "r112",
  titolo: "Gallette di riso con avocado",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
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
      ingredientId: "gallette_riso",
      quantitaG: 30
    },
    {
      ingredientId: "avocado",
      quantitaG: 150
    },
    {
      ingredientId: "limone",
      quantitaG: 10
    },
    {
      ingredientId: "peperoncino_essiccato",
      quantitaG: 1,
      opzionale: true
    }
  ],
  passaggi: [
    "Schiaccia l'avocado con succo di limone, sale e un pizzico di peperoncino.",
    "Spalma sulle gallette di riso e servi subito, prima che si ammorbidiscano."
  ],
  fonte: "seed",
  descrizione: "Croccante e cremoso, senza glutine.",
  costoStimatoPorzione: 1.2
},
{
  id: "r113",
  titolo: "Mix di frutta secca e uvetta",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 2,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 4,
  conservabilitaGiorni: 20,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "noci",
      quantitaG: 60
    },
    {
      ingredientId: "anacardi",
      quantitaG: 60
    },
    {
      ingredientId: "uvetta",
      quantitaG: 60
    }
  ],
  passaggi: [
    "Mescola tutti gli ingredienti in un barattolo a chiusura ermetica.",
    "Dividi in porzioni da circa 45 g."
  ],
  fonte: "seed",
  descrizione: "Energia pronta all'uso, senza bisogno di frigorifero.",
  costoStimatoPorzione: 1.3
},
{
  id: "r114",
  titolo: "Edamame al forno con paprika",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 5,
  tempoCotturaMin: 20,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "edamame_surgelati",
      quantitaG: 250
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    },
    {
      ingredientId: "paprika",
      quantitaG: 3
    },
    {
      ingredientId: "sale",
      quantitaG: 2
    }
  ],
  passaggi: [
    "Scongela e sgocciola bene gli edamame.",
    "Condiscili con olio, paprika e sale in una ciotola.",
    "Disponili su una teglia e inforna a 200°C per 20 minuti, mescolando a metà cottura."
  ],
  fonte: "seed",
  descrizione: "Uno spuntino proteico e croccante, tutto vegetale.",
  costoStimatoPorzione: 1.1
},
{
  id: "r115",
  titolo: "Cracker di riso con hummus",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "legumi",
  tempoPrepMin: 3,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "gallette_riso",
      quantitaG: 30
    },
    {
      ingredientId: "hummus",
      quantitaG: 100
    }
  ],
  passaggi: [
    "Spalma l'hummus sulle gallette di riso appena prima di mangiarle."
  ],
  fonte: "seed",
  descrizione: "Due ingredienti, pronto in un minuto.",
  costoStimatoPorzione: 0.8
},
{
  id: "r116",
  titolo: "Spiedini di frutta con gocce di cioccolato fondente",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 12,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 3,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "fragola",
      quantitaG: 150
    },
    {
      ingredientId: "banana",
      quantitaG: 150
    },
    {
      ingredientId: "ananas",
      quantitaG: 150
    },
    {
      ingredientId: "cioccolato_fondente_gocce",
      quantitaG: 30
    }
  ],
  passaggi: [
    "Taglia la frutta a pezzi regolari e infilzala su stecchini alternando i tipi.",
    "Sciogli le gocce di cioccolato a bagnomaria o al microonde.",
    "Guarnisci gli spiedini con un filo di cioccolato fuso."
  ],
  fonte: "seed",
  descrizione: "Uno spuntino colorato, di primavera, per grandi e piccoli.",
  costoStimatoPorzione: 1.5
},
{
  id: "r117",
  titolo: "Barrette ai fiocchi d'avena e miele",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "media",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 20,
  difficolta: 2,
  porzioni: 6,
  conservabilitaGiorni: 10,
  congelabile: true,
  trasportabile: true,
  area: "internazionale",
  ingredienti: [
    {
      ingredientId: "fiocchi_avena",
      quantitaG: 200
    },
    {
      ingredientId: "miele",
      quantitaG: 100
    },
    {
      ingredientId: "burro_arachidi",
      quantitaG: 60
    },
    {
      ingredientId: "semi_girasole",
      quantitaG: 30
    }
  ],
  passaggi: [
    "Scalda leggermente miele e burro di arachidi finché sono ben amalgamati.",
    "Unisci fiocchi d'avena e semi di girasole, mescola fino a un composto omogeneo.",
    "Stendi in una teglia foderata premendo bene e inforna a 170°C per 20 minuti.",
    "Lascia raffreddare completamente prima di tagliare a barrette."
  ],
  fonte: "seed",
  descrizione: "Barrette energetiche fatte in casa, senza zuccheri raffinati.",
  costoStimatoPorzione: 0.7
},
{
  id: "r119",
  titolo: "Bruschetta al pomodoro",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 10,
  tempoCotturaMin: 3,
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
      ingredientId: "pomodoro",
      quantitaG: 250
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
      quantitaG: 20
    }
  ],
  passaggi: [
    "Tosta le fette di pane finché sono dorate e croccanti.",
    "Strofina uno spicchio d'aglio sulla superficie del pane ancora caldo.",
    "Taglia i pomodori a dadini e conditi con olio, sale e basilico spezzettato.",
    "Distribuisci i pomodori sul pane appena prima di servire."
  ],
  fonte: "seed",
  descrizione: "Il classico spuntino estivo, meglio se il pomodoro è maturo.",
  costoStimatoPorzione: 1
},
{
  id: "r120",
  titolo: "Noci e cubetti di formaggio stagionato",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "media",
  proteinaPrincipale: "latticini",
  tempoPrepMin: 3,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "grana",
      quantitaG: 60
    },
    {
      ingredientId: "noci",
      quantitaG: 40
    }
  ],
  passaggi: [
    "Taglia il grana a piccoli cubetti.",
    "Servi insieme alle noci sgusciate."
  ],
  fonte: "seed",
  descrizione: "Lo spuntino salato più veloce di tutti, due ingredienti e via.",
  costoStimatoPorzione: 1.6
},
{
  id: "r149",
  titolo: "Mandarini e noci",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 2,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 3,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "mandarino",
      quantitaG: 200
    },
    {
      ingredientId: "noci",
      quantitaG: 30
    }
  ],
  passaggi: [
    "Sbuccia i mandarini.",
    "Servili insieme alle noci sgusciate."
  ],
  fonte: "seed",
  descrizione: "Lo spuntino d'inverno più veloce, tutto di stagione.",
  costoStimatoPorzione: 0.8
},
{
  id: "r150",
  titolo: "Finocchio in pinzimonio",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
  tempoPrepMin: 8,
  tempoCotturaMin: 0,
  difficolta: 1,
  porzioni: 2,
  conservabilitaGiorni: 1,
  congelabile: false,
  trasportabile: true,
  area: "nazionale",
  ingredienti: [
    {
      ingredientId: "finocchio",
      quantitaG: 250
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 20
    },
    {
      ingredientId: "sale",
      quantitaG: 2
    }
  ],
  passaggi: [
    "Taglia il finocchio a spicchi sottili.",
    "Prepara il pinzimonio con olio e sale in una ciotolina.",
    "Intingi gli spicchi di finocchio appena prima di mangiarli."
  ],
  fonte: "seed",
  descrizione: "Croccante e dissetante, uno spuntino invernale leggerissimo.",
  costoStimatoPorzione: 0.6
},
{
  id: "r179",
  titolo: "Fragole con gocce di cioccolato fondente",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "nessuna",
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
      ingredientId: "fragola",
      quantitaG: 250
    },
    {
      ingredientId: "cioccolato_fondente_gocce",
      quantitaG: 20
    }
  ],
  passaggi: [
    "Sciogli le gocce di cioccolato a bagnomaria.",
    "Intingi le fragole nel cioccolato fuso e lasciale rapprendere su carta forno."
  ],
  fonte: "seed",
  descrizione: "Uno spuntino di primavera, dolce senza essere pesante.",
  costoStimatoPorzione: 1.4
},
{
  id: "r180",
  titolo: "Piselli croccanti al forno",
  slotAmmessi: [
    "spuntino"
  ],
  portata: "spuntino",
  pesantezza: "leggera",
  proteinaPrincipale: "legumi",
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
      ingredientId: "pisello_fresco",
      quantitaG: 250
    },
    {
      ingredientId: "olio_evo",
      quantitaG: 15
    },
    {
      ingredientId: "paprika",
      quantitaG: 2
    },
    {
      ingredientId: "sale",
      quantitaG: 2
    }
  ],
  passaggi: [
    "Asciuga bene i piselli sgranati con carta da cucina.",
    "Condiscili con olio, paprika e sale.",
    "Disponili su una teglia e inforna a 200°C per 20-25 minuti, mescolando a metà, finché sono croccanti."
  ],
  fonte: "seed",
  descrizione: "Uno spuntino insolito di primavera, croccante e leggero.",
  costoStimatoPorzione: 1
}
];
