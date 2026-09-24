/** JSON Schema dello strumento che il modello deve compilare — la forma di `EstrazioneAI` in types.ts. */
export const SCHEMA_ESTRAZIONE = {
  type: "object",
  additionalProperties: false,
  required: ["nome", "descrizione", "porzioniBase", "tempoMin", "pasto", "ingredienti", "passi", "linguaOriginale", "confidenza", "nessunaRicettaTrovata"],
  properties: {
    nome: { type: "string", description: "Titolo della ricetta, in italiano." },
    descrizione: { type: "string", description: "Una riga di descrizione in tono da menù, in italiano." },
    porzioniBase: { type: "integer", minimum: 1, maximum: 20 },
    tempoMin: { type: "integer", minimum: 0, description: "Tempo totale (preparazione + cottura) in minuti." },
    pasto: {
      type: "array",
      items: { type: "string", enum: ["colazione", "pranzo", "cena"] },
      description: "In quali pasti ha senso proporre questa ricetta.",
    },
    ingredienti: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["nome", "qta", "unita"],
        properties: {
          nome: { type: "string", description: "Nome dell'ingrediente, in italiano, senza quantità (es. 'farina 00', non '200g farina 00')." },
          qta: { type: ["number", "null"], description: "Quantità numerica, null se non specificata (es. 'q.b.')." },
          unita: { type: "string", description: "Unità in italiano: g, kg, ml, l, cucchiai, cucchiaini, tazza, pizzico, pz, spicchi, fette, q.b." },
          nota: { type: "string", description: "Solo se la dicitura originale non è una conversione pulita (es. 'una manciata', 'q.b.'), riportala qui." },
        },
      },
    },
    passi: { type: "array", items: { type: "string" }, description: "Passaggi in italiano, brevi e chiari, uno per elemento." },
    linguaOriginale: { type: "string", description: "Lingua del testo/immagine originale, es. 'italiano', 'inglese', 'spagnolo'." },
    confidenza: {
      type: "object",
      additionalProperties: false,
      description: "Per ciascun campo, quanto sei sicuro dell'estrazione, da 0 (indovinato) a 1 (esplicito nel testo/immagine).",
      properties: {
        nome: { type: "number", minimum: 0, maximum: 1 },
        porzioniBase: { type: "number", minimum: 0, maximum: 1 },
        tempoMin: { type: "number", minimum: 0, maximum: 1 },
        pasto: { type: "number", minimum: 0, maximum: 1 },
        ingredienti: { type: "number", minimum: 0, maximum: 1 },
        passi: { type: "number", minimum: 0, maximum: 1 },
      },
    },
    nessunaRicettaTrovata: {
      type: "boolean",
      description: "true se il testo o l'immagine non contengono affatto una ricetta riconoscibile (es. una didascalia che parla d'altro, o una foto illeggibile).",
    },
  },
} as const;

export const SYSTEM_PROMPT_ESTRAZIONE = `Sei un assistente che estrae ricette di cucina da testo o immagini e le struttura in JSON, sempre in ITALIANO (traduci se l'originale è in un'altra lingua, ma non inventare: se manca un'informazione, ometti il campo o lascialo a un valore neutro con confidenza bassa).
Regole:
- Non inventare mai ingredienti, quantità o passaggi che non siano nel testo/immagine. Se un'informazione manca, usa confidenza bassa (0-0.3) invece di indovinare con sicurezza.
- Separa sempre quantità, unità e nome dell'ingrediente (es. "200 g di farina 00" -> nome:"farina 00", qta:200, unita:"g").
- Per quantità vaghe ("un pizzico", "q.b.", "una manciata") metti qta:null, unita quella più vicina fra q.b./pizzico, e riporta la dicitura originale in nota.
- Se il testo o l'immagine non descrivono affatto una ricetta di cucina, imposta nessunaRicettaTrovata:true e lascia gli altri campi vuoti/neutri.
- Tono e lingua di descrizione/passi: italiano semplice e diretto, come lo scriverebbe una persona in cucina, non un traduttore letterale.`;
