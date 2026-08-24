import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { MealPrepScreen } from "./screens/mealprep/MealPrepScreen";
import { RicettarioScreen } from "./screens/ricettario/RicettarioScreen";
import { SpesaScreen } from "./screens/spesa/SpesaScreen";
import { ProfiloScreen } from "./screens/profilo/ProfiloScreen";
import { OnboardingScreen } from "./screens/onboarding/OnboardingScreen";
import { OnboardingLayout } from "./layouts/OnboardingLayout";
import { RicettaDetailScreen } from "./screens/ricettario/RicettaDetailScreen";
import { RicettaFormScreen } from "./screens/ricettario/RicettaFormScreen";
import { GeneraWizardScreen } from "./screens/mealprep/genera/GeneraWizardScreen";
import { useProfileStore } from "./store/profileStore";
import { useUiStore } from "./store/uiStore";

export function App() {
  const onboardingCompletato = useProfileStore((s) => s.profilo.onboardingCompletato);
  const tema = useUiStore((s) => s.tema);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "scuro");
  }, [tema]);

  if (!onboardingCompletato) {
    return (
      <Routes>
        <Route element={<OnboardingLayout />}>
          <Route path="*" element={<OnboardingScreen />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<OnboardingLayout />}>
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/ricettario/nuova" element={<RicettaFormScreen />} />
        <Route path="/ricettario/:id" element={<RicettaDetailScreen />} />
        <Route path="/ricettario/:id/modifica" element={<RicettaFormScreen />} />
        <Route path="/meal-prep/genera" element={<GeneraWizardScreen />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/meal-prep" replace />} />
        <Route path="/meal-prep" element={<MealPrepScreen />} />
        <Route path="/ricettario" element={<RicettarioScreen />} />
        <Route path="/spesa" element={<SpesaScreen />} />
        <Route path="/profilo" element={<ProfiloScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/meal-prep" replace />} />
    </Routes>
  );
}
