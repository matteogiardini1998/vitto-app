# MealPrep

App di meal prep in italiano: pianifica la settimana, scopri ricette, genera automaticamente il piano pasti e la lista della spesa. Web app installabile (PWA), completamente offline — tutti i dati dell'utente vivono sul dispositivo. Vitto non usa nessuna API AI a pagamento: l'importazione ricette da link (Fase R3b) è del tutto deterministica (JSON-LD/microdata/parser di testo), a costo zero.

## Stack

Vite + React 18 + TypeScript, Tailwind CSS v4, Zustand (con `persist` su localStorage), React Router, Framer Motion, vite-plugin-pwa. Una piccola funzione serverless in `api/` (Vercel, Node) fa solo da proxy di lettura per il link importato (il browser non può scaricare pagine esterne per via del CORS) — nessuna chiave API, nessun costo per richiesta.

## Sviluppo

```bash
npm install
npm run dev
```

L'app si apre su `http://localhost:5173` (o la prima porta libera successiva). Il service worker è attivo anche in sviluppo (`devOptions.enabled`), ma per testare davvero l'esperienza offline è meglio usare una build di produzione:

```bash
npm run build
npm run preview
```

`npm run preview` serve la build ottimizzata su `http://localhost:4173`: apri l'app, aspetta che il service worker si registri, poi prova a spegnere la rete (o il server) e ricaricare — l'app deve continuare a funzionare.

## Build

```bash
npm run build
```

Produce una build di produzione in `dist/`, con service worker (`sw.js`) e manifest (`manifest.webmanifest`) generati automaticamente da `vite-plugin-pwa`. `npm run lint` esegue Oxlint; `npx tsc -b` esegue il type-check.

## Deploy

L'app è un sito statico: qualunque host per siti statici va bene.

### Vercel

1. Importa il repository su [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. Deploy.

Oppure da CLI:

```bash
npm install -g vercel
vercel --prod
```

### Netlify

1. Importa il repository su [app.netlify.com](https://app.netlify.com).
2. Build command: `npm run build`. Publish directory: `dist`.
3. Deploy.

Oppure da CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

Nota: essendo una SPA con React Router, se il tuo host non gestisce automaticamente il fallback a `index.html` per le route lato client (Vercel e Netlify lo fanno di default per progetti Vite), aggiungi una regola di redirect `/* -> /index.html` (200).

### Importazione ricette da link — solo su Vercel

L'endpoint `api/import-link.ts` viene rilevato e distribuito automaticamente da Vercel come funzione serverless (zero configurazione: basta che la cartella `api/` sia nel repository). Nessuna variabile d'ambiente da configurare, nessuna chiave: la funzione scarica la pagina esterna (necessario lato server per via del CORS) e prova a leggerci una ricetta con JSON-LD o microdata; se non li trova, torna il testo pulito della pagina, che il client analizza in locale con lo stesso parser deterministico di "Incolla testo".

Su un host diverso da Vercel (Netlify, ecc.) l'importazione da link semplicemente non è disponibile finché non si porta `api/import-link.ts` sull'equivalente serverless di quella piattaforma — "Incolla testo" e "Scrivi a mano" restano sempre disponibili ovunque, perché girano interamente nel browser.

## Installare la PWA sul telefono

**iOS (Safari):**
1. Apri l'app nel sito con Safari.
2. Tocca l'icona di condivisione (il quadrato con la freccia verso l'alto).
3. Scorri e tocca "Aggiungi a Home".
4. Conferma: l'icona MealPrep compare sulla schermata Home e si apre a schermo intero, senza barra del browser.

**Android (Chrome):**
1. Apri l'app nel sito con Chrome.
2. Tocca il menu (⋮) in alto a destra.
3. Tocca "Installa app" (o "Aggiungi a schermata Home").
4. Conferma l'installazione.

Una volta installata, l'app funziona offline al 100%: tutti i dati (profilo, ricette, piano pasti, lista della spesa) sono salvati localmente sul dispositivo e non richiedono connessione.

## Architettura dati

Nessun backend: ogni store Zustand (`profileStore`, `recipeStore`, `planStore`, `shoppingStore`, `uiStore`) persiste su `localStorage` tramite il middleware `persist`, con funzioni di lettura/scrittura isolate per store — pronte per essere sostituite da chiamate a Supabase in futuro senza toccare i componenti. Dal tab Profilo è possibile esportare/importare un backup JSON completo di tutti i dati, o azzerarli.
