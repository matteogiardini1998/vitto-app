import { Outlet } from "react-router-dom";

export function OnboardingLayout() {
  return (
    <div className="app-shell">
      <div className="h-full overflow-y-auto no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}
