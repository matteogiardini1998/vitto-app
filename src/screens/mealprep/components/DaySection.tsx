import { Card } from "../../../components/Card";
import { PASTI, type Giorno, type Pasto } from "../../../types";
import { GIORNO_LABEL_FULL } from "../../../lib/date";
import { MealRow } from "./MealRow";

type DaySectionProps = {
  giorno: Giorno;
  isOggi: boolean;
  onTapSlot: (giorno: Giorno, pasto: Pasto) => void;
};

export function DaySection({ giorno, isOggi, onTapSlot }: DaySectionProps) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 px-1 mb-2">
        <h2 className="text-title-md font-display font-semibold text-paper-900">
          {GIORNO_LABEL_FULL[giorno]}
        </h2>
        {isOggi && (
          <span className="text-caption font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
            Oggi
          </span>
        )}
      </div>
      <Card padded={false} className="divide-y divide-paper-100 overflow-hidden">
        {PASTI.map((pasto) => (
          <MealRow key={pasto} giorno={giorno} pasto={pasto} onTap={onTapSlot} />
        ))}
      </Card>
    </div>
  );
}
