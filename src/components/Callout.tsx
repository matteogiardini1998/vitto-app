import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type CalloutTone = "info" | "warning" | "shield";

const TONE_CLASSES: Record<CalloutTone, string> = {
  info: "bg-primary-50 border-primary-100 text-primary-800 dark:bg-primary-900/40 dark:border-primary-800 dark:text-primary-200",
  warning: "bg-accent-50 border-accent-200 text-accent-800 dark:bg-accent-900/40 dark:border-accent-800 dark:text-accent-200",
  shield: "bg-sage-50 border-sage-200 text-sage-800 dark:bg-sage-900/40 dark:border-sage-800 dark:text-sage-200",
};

const TONE_ICON_CLASSES: Record<CalloutTone, string> = {
  info: "text-primary-700 dark:text-primary-300",
  warning: "text-accent-600 dark:text-accent-300",
  shield: "text-sage-700 dark:text-sage-300",
};

type CalloutProps = {
  icon: LucideIcon;
  tone?: CalloutTone;
  children: ReactNode;
  className?: string;
};

/** Banner/callout condiviso: icona SEMPRE centrata verticalmente rispetto al testo, qualunque sia la sua lunghezza. */
export function Callout({ icon: Icon, tone = "info", children, className }: CalloutProps) {
  return (
    <div className={cn("flex items-center gap-3 p-4 rounded-md border", TONE_CLASSES[tone], className)}>
      <Icon size={20} className={cn("shrink-0", TONE_ICON_CLASSES[tone])} strokeWidth={1.8} />
      <p className="text-body-sm">{children}</p>
    </div>
  );
}
