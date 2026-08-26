import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ProgressBar } from "../../components/ProgressBar";
import { Button } from "../../components/Button";

type OnboardingShellProps = {
  step: number;
  totalSteps: number;
  onBack?: () => void;
  onContinue: () => void;
  continueLabel?: string;
  canContinue?: boolean;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function OnboardingShell({
  step,
  totalSteps,
  onBack,
  onContinue,
  continueLabel = "Continua",
  canContinue = true,
  title,
  subtitle,
  children,
  footer,
}: OnboardingShellProps) {
  return (
    <div className="flex flex-col h-full bg-paper-50 overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex items-center gap-3 shrink-0">
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Indietro"
            className="h-10 w-10 -ml-2 flex items-center justify-center rounded-full text-paper-600 active:bg-paper-100"
          >
            <ChevronLeft size={22} />
          </button>
        ) : (
          <div className="w-8" />
        )}
        <ProgressBar value={step + 1} max={totalSteps} className="flex-1" />
      </div>

      {/*
        Contenuto e bottone in UN SOLO contenitore scrollabile: il bottone è
        "sticky" in fondo, non forzato in un footer separato ad altezza
        fissa. Su uno step corto appare subito dopo l'ultimo campo, senza
        spazio vuoto; su uno step lungo resta comunque visibile scrollando,
        senza dover arrivare in fondo del tutto.
      */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 28, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 340, damping: 26, mass: 0.9 }}
          className="px-5 pt-2"
        >
          {(title || subtitle) && (
            <div className="mb-6">
              {title && (
                <h1 className="text-display-sm font-display font-semibold text-paper-900">
                  {title}
                </h1>
              )}
              {subtitle && <p className="text-body-md text-paper-500 mt-1.5">{subtitle}</p>}
            </div>
          )}
          {children}
        </motion.div>

        <div className="sticky bottom-0 bg-paper-50 px-5 pb-6 pt-3">
          {footer ?? (
            <Button fullWidth size="lg" disabled={!canContinue} onClick={onContinue} data-tutorial="wizard-continua">
              {continueLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
