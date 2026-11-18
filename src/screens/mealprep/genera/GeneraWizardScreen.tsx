import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Check } from "lucide-react";
import { OnboardingShell } from "../../onboarding/OnboardingShell";
import { Button } from "../../../components/Button";
import { SupermercatoGrid } from "../../../components/SupermercatoGrid";
import { PastiDesideratiStep } from "./steps/PastiDesideratiStep";
import { VincoliStep } from "./steps/VincoliStep";
import { EsclusioniSettimanaStep } from "./steps/EsclusioniSettimanaStep";
import { BudgetStep } from "./steps/BudgetStep";
import { SlotSelectionStep } from "./steps/SlotSelectionStep";
import { RisultatoStep } from "./steps/RisultatoStep";
import { useProfileStore } from "../../../store/profileStore";
import { useRecipeStore } from "../../../store/recipeStore";
import { usePlanStore } from "../../../store/planStore";
import { useDispensaStore } from "../../../store/dispensaStore";
import { useToastStore } from "../../../store/toastStore";
import { useTutorialStore } from "../../../store/tutorialStore";
import { creaPianoDimostrativo } from "../../../tutorial/pianoDimostrativo";
import { generaPiano, stimaSpesaPiano, type PreferenzeGenerazione, type RisultatoGenerazione } from "../../../lib/generator";
import { useCambioPasto } from "../../../hooks/useCambioPasto";
import { CambiaPastoSheet } from "../components/CambiaPastoSheet";
import { AssignRecipeSheet } from "../components/AssignRecipeSheet";
import { ComandoPiano } from "../../../components/ComandoPiano";
import { GIORNO_LABEL_FULL } from "../../../lib/date";
import { PASTO_LABEL } from "../../../lib/recipeDisplay";
import type { Giorno, Pasto, Piano } from "../../../types";

const TOTAL_STEPS = 7;

export function GeneraWizardScreen() {
  const navigate = useNavigate();
  const profilo = useProfileStore((s) => s.profilo);
  const ricette = useRecipeStore((s) => s.ricette);
  const pianoAttuale = usePlanStore((s) => s.piano);
  const applyPiano = usePlanStore((s) => s.applyPiano);
  const dispensaAttiva = useDispensaStore((s) => s.dispense.find((d) => d.id === s.dispensaAttivaId) ?? s.dispense[0]);
  const showToast = useToastStore((s) => s.show);

  const [step, setStep] = useState(0);
  const [preferenze, setPreferenze] = useState<PreferenzeGenerazione>({
    tags: [],
    vincoli: [],
    esclusioniTemporanee: [],
    budgetTotale: Math.round((90 * profilo.nucleo.persone) / 5) * 5,
    supermercato: profilo.supermercatoPreferito,
  });
  const [slotSelezionati, setSlotSelezionati] = useState<string[]>([]);
  const [risultato, setRisultato] = useState<RisultatoGenerazione | null>(null);
  // undefined = seed deterministico (stessa settimana e stessi input → stesso piano); "Rigenera" ne sceglie uno nuovo ogni volta.
  const [seed, setSeed] = useState<number | undefined>(undefined);

  const genera = (nuovoSeed?: number) => {
    // I pasti messi "fissi" nel risultato (lucchetto) sopravvivono a «Rigenera»:
    // entrano come già assegnati e bloccati, il resto si rigenera.
    const fissi = risultato
      ? Object.fromEntries(Object.entries(risultato.piano).filter(([, slot]) => slot.lockata))
      : {};
    const base: Piano = { ...pianoAttuale, ...fissi };
    const r = generaPiano({ ricette, profilo, pianoAttuale: base, preferenze, slotSelezionati, dispensa: dispensaAttiva, seed: nuovoSeed ?? seed });
    setRisultato(r);
  };

  const [slotInModifica, setSlotInModifica] = useState<string | null>(null);
  const [sceltaManuale, setSceltaManuale] = useState(false);

  const aggiornaPianoRisultato = (piano: Piano) => {
    setRisultato((r) => {
      if (!r) return r;
      const slotsAperti = Object.fromEntries(Object.entries(r.slotsAperti).filter(([k]) => !piano[k]));
      const { spesa, risparmio } = stimaSpesaPiano(piano, ricette, dispensaAttiva);
      return { ...r, piano, slotsAperti, spesaStimata: spesa, risparmioDispensa: risparmio };
    });
  };
  const cambio = useCambioPasto(risultato?.piano ?? {}, aggiornaPianoRisultato, preferenze);

  const apriSlot = (chiave: string) => {
    cambio.azzeraAvviso();
    setSlotInModifica(chiave);
  };

  const toggleFisso = (chiave: string) => {
    if (!risultato?.piano[chiave]) return;
    const slot = risultato.piano[chiave];
    aggiornaPianoRisultato({ ...risultato.piano, [chiave]: { ...slot, lockata: !slot.lockata } });
  };

  const togliSlot = (chiave: string) => {
    if (!risultato) return;
    const { [chiave]: _tolto, ...resto } = risultato.piano;
    aggiornaPianoRisultato(resto);
    setSlotInModifica(null);
  };

  const rigenera = () => {
    const nuovoSeed = Math.floor(Math.random() * 2 ** 31);
    setSeed(nuovoSeed);
    genera(nuovoSeed);
  };

  const scegliPerSlot = (chiave: string, ricettaId: string) => {
    setRisultato((r) => {
      if (!r) return r;
      const { [chiave]: _rimosso, ...restoAperti } = r.slotsAperti;
      return {
        ...r,
        piano: { ...r.piano, [chiave]: { ricettaId, porzioni: Math.max(1, profilo.nucleo.persone), lockata: false } },
        slotsAperti: restoAperti,
      };
    });
  };

  const goNext = () => {
    if (step === 5) {
      genera();
      setStep(6);
      return;
    }
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  };

  const goBack = () => {
    if (step === 0) {
      navigate("/meal-prep");
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  };

  const accetta = () => {
    if (!risultato) return;
    // Se il tutorial è attivo e l'utente non ha selezionato nessun pasto, il
    // piano risultante resta vuoto: il tutorial si bloccherebbe non potendo
    // mai arrivare alla lista della spesa. In quel caso soltanto, si applica
    // un piano dimostrativo così la guida può proseguire.
    const tutorialAttivo = useTutorialStore.getState().attivo;
    const pianoVuoto = Object.keys(risultato.piano).length === 0;
    applyPiano(tutorialAttivo && pianoVuoto ? creaPianoDimostrativo(profilo.nucleo.persone) : risultato.piano, preferenze);
    navigate("/meal-prep", { replace: true });
    showToast("Fatto! Il tuo piano è pronto 🎉");
  };

  const titoli: Record<number, { title: string; subtitle?: string }> = {
    0: { title: "Che pasti vuoi questa settimana?", subtitle: "Le tue scelte guidano il generatore." },
    1: { title: "Voglio che ci sia", subtitle: "Richieste puntuali, in linguaggio semplice." },
    2: { title: "Questa settimana evita", subtitle: "Si sommano al profilo solo per questa settimana." },
    3: { title: "Budget", subtitle: "Quanto vuoi spendere in totale questa settimana?" },
    4: { title: "Quali pasti generare?", subtitle: "I pasti già assegnati non verranno toccati." },
    5: { title: "Supermercato", subtitle: "Solo per comodità, potrai cambiarlo quando vuoi." },
    6: { title: "Il tuo piano pasti", subtitle: "Controlla il risultato prima di accettarlo." },
  };

  return (
    // Espone lo step corrente nel DOM: è l'unico modo semplice per il tutorial
    // (che vive fuori da questo albero) di sapere a che punto del wizard siamo.
    <div data-wizard-step={step} className="h-full">
    <OnboardingShell
      step={step}
      totalSteps={TOTAL_STEPS}
      onBack={goBack}
      onContinue={goNext}
      continueLabel={step === 5 ? "Genera" : "Continua"}
      title={titoli[step].title}
      subtitle={titoli[step].subtitle}
      footer={
        step === 6 ? (
          <div className="flex gap-2">
            <Button variant="secondary" fullWidth onClick={rigenera} className="gap-2">
              <RefreshCw size={18} /> Rigenera
            </Button>
            <Button fullWidth onClick={accetta} className="gap-2" data-tutorial="wizard-accetta">
              <Check size={18} /> Accetta
            </Button>
          </div>
        ) : undefined
      }
    >
      {step === 0 && (
        <PastiDesideratiStep
          value={preferenze.tags}
          onChange={(tags) => setPreferenze((p) => ({ ...p, tags }))}
        />
      )}
      {step === 1 && (
        <VincoliStep value={preferenze.vincoli} onChange={(vincoli) => setPreferenze((p) => ({ ...p, vincoli }))} />
      )}
      {step === 2 && (
        <EsclusioniSettimanaStep
          value={preferenze.esclusioniTemporanee}
          onChange={(esclusioniTemporanee) => setPreferenze((p) => ({ ...p, esclusioniTemporanee }))}
        />
      )}
      {step === 3 && (
        <BudgetStep
          persone={profilo.nucleo.persone}
          budget={preferenze.budgetTotale}
          onChangeBudget={(budgetTotale) => setPreferenze((p) => ({ ...p, budgetTotale }))}
        />
      )}
      {step === 4 && (
        <SlotSelectionStep
          pianoAttuale={pianoAttuale}
          ricette={ricette}
          selezionati={slotSelezionati}
          onChange={setSlotSelezionati}
        />
      )}
      {step === 5 && (
        <SupermercatoGrid
          value={preferenze.supermercato}
          onChange={(supermercato) => setPreferenze((p) => ({ ...p, supermercato }))}
        />
      )}
      {step === 6 && risultato && (
        <RisultatoStep
          piano={risultato.piano}
          ricette={ricette}
          spesaStimata={risultato.spesaStimata}
          risparmioDispensa={risultato.risparmioDispensa}
          budgetTarget={preferenze.budgetTotale}
          slotsAperti={risultato.slotsAperti}
          onScegli={scegliPerSlot}
          onTapSlot={apriSlot}
          comando={<ComandoPiano onComando={cambio.comando} />}
        />
      )}
      {step === 6 && risultato && slotInModifica && (() => {
        const [giorno, pasto] = slotInModifica.split("|") as [Giorno, Pasto];
        const slot = risultato.piano[slotInModifica];
        return (
          <>
            <CambiaPastoSheet
              open={!sceltaManuale}
              onClose={() => setSlotInModifica(null)}
              titolo={`${GIORNO_LABEL_FULL[giorno]} · ${PASTO_LABEL[pasto]}`}
              ricetta={slot ? ricette.find((r) => r.id === slot.ricettaId) : undefined}
              motivo={slot?.motivo}
              lockata={slot?.lockata}
              avviso={cambio.avviso}
              onCambia={(o) => cambio.cambia(slotInModifica, o.vincolo)}
              onToggleLock={slot ? () => toggleFisso(slotInModifica) : undefined}
              onScegliDalRicettario={() => setSceltaManuale(true)}
              onTogli={() => togliSlot(slotInModifica)}
            />
            <AssignRecipeSheet
              open={sceltaManuale}
              onClose={() => setSceltaManuale(false)}
              giorno={giorno}
              pasto={pasto}
              onAssegna={(ricettaId) => {
                aggiornaPianoRisultato({
                  ...risultato.piano,
                  [slotInModifica]: { ricettaId, porzioni: slot?.porzioni ?? Math.max(1, profilo.nucleo.persone), lockata: false },
                });
                setSceltaManuale(false);
              }}
            />
          </>
        );
      })()}
    </OnboardingShell>
    </div>
  );
}
