import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  /** Classe bg-* del colore assegnato a questa pagina in ruota: un piccolo
   * segno sotto il titolo, per far combaciare senza gridarlo il colore
   * dell'icona in ruota con la pagina reale a cui appartiene. */
  accent?: string;
  /** Aggancio per il tutorial in-app: identifica questo header come bersaglio di un'annotazione. */
  tutorialId?: string;
};

export function PageHeader({ title, subtitle, action, accent, tutorialId }: PageHeaderProps) {
  return (
    <header className="relative px-14 pt-7 pb-5 text-center" data-tutorial={tutorialId}>
      <h1 className="text-display-md font-display font-bold text-paper-900">{title}</h1>
      {subtitle && <p className="text-body-sm text-paper-500 mt-1">{subtitle}</p>}
      {accent && <span className={cn("block mx-auto mt-2.5 h-1 w-8 rounded-full", accent)} />}
      {action && <div className="absolute right-4 top-6 flex items-center gap-1.5">{action}</div>}
    </header>
  );
}
