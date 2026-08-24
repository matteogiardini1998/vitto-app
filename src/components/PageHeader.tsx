import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="relative px-14 pt-7 pb-5 text-center">
      <h1 className="text-display-md font-display font-bold text-paper-900">{title}</h1>
      {subtitle && <p className="text-body-sm text-paper-500 mt-1">{subtitle}</p>}
      {action && <div className="absolute right-4 top-6 flex items-center gap-1.5">{action}</div>}
    </header>
  );
}
