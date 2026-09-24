import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { WheelLayout } from "./layouts/WheelLayout";
import { ProfiloScreen } from "./screens/profilo/ProfiloScreen";
import { OnboardingScreen } from "./screens/onboarding/OnboardingScreen";
import { OnboardingLayout } from "./layouts/OnboardingLayout";
import { RicettaDetailScreen } from "./screens/ricettario/RicettaDetailScreen";
import { RicettaFormScreen } from "./screens/ricettario/RicettaFormScreen";
import { ImportLinkScreen } from "./screens/ricettario/import/ImportLinkScreen";
import { ImportTestoScreen } from "./screens/ricettario/import/ImportTestoScreen";
import { CondividiScreen } from "./screens/ricettario/import/CondividiScreen";
import { GeneraWizardScreen } from "./screens/mealprep/genera/GeneraWizardScreen";
import { useProfileStore } from "./store/profileStore";
import { LandingScreen } from "./screens/landing/LandingScreen";
import { useUiStore } from "./store/uiStore";
import { PatternBackground } from "./components/PatternBackground";
import { ToastHost } from "./components/ToastHost";
import { UpdatePrompt } from "./components/UpdatePrompt";
import { TutorialEngine } from "./tutorial/TutorialEngine";

export function App() {
  const onboardingCompletato = useProfileStore((s) => s.profilo.onboardingCompletato);
  const tema = useUiStore((s) => s.tema);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "scuro");
  }, [tema]);

  return (
    <>
      <PatternBackground />
      <ToastHost />
      <UpdatePrompt />
      <TutorialEngine />
      {!onboardingCompletato ? (
        <Routes>
          {/* Primo arrivo: la landing pubblica accoglie su "/", l'onboarding parte dalle sue CTA. */}
          <Route path="/" element={<LandingScreen />} />
          <Route element={<OnboardingLayout />}>
            <Route path="/onboarding" element={<OnboardingScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          {/* Chi ha già un profilo salta la landing ("/" ricade sul redirect in fondo);
              ci torna solo dal link discreto nel profilo, su questo path dedicato. */}
          <Route path="/benvenuto" element={<LandingScreen />} />
          <Route element={<OnboardingLayout />}>
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/ricettario/nuova" element={<RicettaFormScreen />} />
            <Route path="/ricettario/importa/link" element={<ImportLinkScreen />} />
            <Route path="/ricettario/importa/testo" element={<ImportTestoScreen />} />
            <Route path="/condividi" element={<CondividiScreen />} />
            <Route path="/ricettario/:id" element={<RicettaDetailScreen />} />
            <Route path="/ricettario/:id/modifica" element={<RicettaFormScreen />} />
            <Route path="/meal-prep/genera" element={<GeneraWizardScreen />} />
          </Route>
          <Route element={<WheelLayout />}>
            {/* WheelLayout non usa <Outlet/>: "/" ricade sul catch-all *
                in fondo, che reindirizza a /meal-prep. Qui bastano i 4 path
                reali, solo per far combaciare la route con l'URL corrente. */}
            <Route path="/meal-prep" element={null} />
            <Route path="/ricettario" element={null} />
            <Route path="/spesa" element={null} />
            <Route path="/dispensa" element={null} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/profilo" element={<ProfiloScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/meal-prep" replace />} />
        </Routes>
      )}
    </>
  );
}
