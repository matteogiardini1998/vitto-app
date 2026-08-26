import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingShell } from "./OnboardingShell";
import { WelcomeStep } from "./steps/WelcomeStep";
import { AnagraficaStep } from "./steps/AnagraficaStep";
import { NucleoStep } from "./steps/NucleoStep";
import { TempoStep } from "./steps/TempoStep";
import { DietaStep } from "./steps/DietaStep";
import { EsclusioniStep } from "./steps/EsclusioniStep";
import { PreferenzeStep } from "./steps/PreferenzeStep";
import { SupermercatoStep } from "./steps/SupermercatoStep";
import { RiepilogoStep } from "./steps/RiepilogoStep";
import { useProfileStore } from "../../store/profileStore";
import type { Profilo } from "../../types";
import { useToastStore } from "../../store/toastStore";
import { useTutorialStore } from "../../store/tutorialStore";

const TOTAL_STEPS = 9;

export function OnboardingScreen() {
  const profilo = useProfileStore((s) => s.profilo);
  const setProfilo = useProfileStore((s) => s.setProfilo);
  const navigate = useNavigate();
  const showToast = useToastStore((s) => s.show);

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Profilo>(profilo);

  const updateDraft = (patch: Partial<Profilo>) => setDraft((d) => ({ ...d, ...patch }));

  const canContinue = (() => {
    switch (step) {
      case 1:
        return draft.nome.trim().length > 0 && draft.cognome.trim().length > 0 && draft.eta > 0;
      default:
        return true;
    }
  })();

  const goNext = () => {
    if (step === TOTAL_STEPS - 1) {
      setProfilo({ ...draft, onboardingCompletato: true });
      showToast(`Benvenuto, ${draft.nome || "chef"}!`);
      // Si parte subito col fare: il tutorial si attiva nello stesso istante in cui si entra in app.
      useTutorialStore.getState().avvia();
      navigate("/meal-prep", { replace: true });
      return;
    }
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const titles: Record<number, { title: string; subtitle?: string }> = {
    1: { title: "Parlami di te", subtitle: "Qualche informazione di base." },
    2: { title: "Il tuo nucleo", subtitle: "Per quante persone cuciniamo?" },
    3: { title: "Tempo in cucina", subtitle: "Quanto tempo vuoi dedicare in media?" },
    4: { title: "La tua dieta", subtitle: "Adatteremo ogni ricetta di conseguenza." },
    5: { title: "Esigenze assolute", subtitle: "Allergie e intolleranze." },
    6: { title: "Preferenze", subtitle: "Cosa preferisci evitare?" },
    7: { title: "Supermercato abituale", subtitle: "Solo per comodità, potrai cambiarlo quando vuoi." },
    8: { title: "Riepilogo", subtitle: "Controlla tutto prima di iniziare." },
  };

  const continueLabel =
    step === 0 ? "Iniziamo" : step === TOTAL_STEPS - 1 ? "Crea il mio profilo" : "Continua";

  return (
    <OnboardingShell
      step={step}
      totalSteps={TOTAL_STEPS}
      onBack={step > 0 ? goBack : undefined}
      onContinue={goNext}
      continueLabel={continueLabel}
      canContinue={canContinue}
      title={titles[step]?.title}
      subtitle={titles[step]?.subtitle}
    >
      {step === 0 && <WelcomeStep />}
      {step === 1 && <AnagraficaStep draft={draft} onChange={updateDraft} />}
      {step === 2 && <NucleoStep draft={draft} onChange={updateDraft} />}
      {step === 3 && <TempoStep draft={draft} onChange={updateDraft} />}
      {step === 4 && <DietaStep draft={draft} onChange={updateDraft} />}
      {step === 5 && <EsclusioniStep draft={draft} onChange={updateDraft} />}
      {step === 6 && <PreferenzeStep draft={draft} onChange={updateDraft} />}
      {step === 7 && <SupermercatoStep draft={draft} onChange={updateDraft} />}
      {step === 8 && <RiepilogoStep draft={draft} onEdit={setStep} />}
    </OnboardingShell>
  );
}
