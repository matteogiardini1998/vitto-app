import type { ReactNode } from "react";
import { Card } from "./Card";

type SettingsSectionProps = {
  title: string;
  children: ReactNode;
};

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-body-sm font-semibold text-paper-500 uppercase tracking-wide px-1 mb-2">
        {title}
      </h2>
      <Card padded={false} className="divide-y divide-paper-100 overflow-hidden">
        {children}
      </Card>
    </div>
  );
}
