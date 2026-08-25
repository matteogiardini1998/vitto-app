import { useMemo, useState } from "react";
import { Check, Circle, ArrowRight } from "lucide-react";
import { BottomSheet } from "../../../components/BottomSheet";
import { valutaSettimana } from "../../../lib/bilanciamento";
import type { Piano, Ricetta } from "../../../types";
import { cn } from "../../../lib/cn";

const RAGGIO = 16;
const CIRCONFERENZA = 2 * Math.PI * RAGGIO;

export function EquilibrioBadge({ piano, ricette }: { piano: Piano; ricette: Ricetta[] }) {
  const [aperto, setAperto] = useState(false);
  const report = useMemo(() => valutaSettimana(piano, ricette), [piano, ricette]);
  const offset = CIRCONFERENZA * (1 - report.punteggio / 100);

  return (
    <>
      <button
        type="button"
        onClick={() => setAperto(true)}
        className="flex items-center gap-2 pl-1.5 pr-3 h-10 rounded-full bg-paper-0 border border-paper-200 shadow-card active:bg-paper-100"
        aria-label="Vedi il report di equilibrio della settimana"
      >
        <svg width="32" height="32" viewBox="0 0 40 40" className="-rotate-90 shrink-0">
          <circle cx="20" cy="20" r={RAGGIO} fill="none" className="stroke-paper-200" strokeWidth="4" />
          <circle
            cx="20"
            cy="20"
            r={RAGGIO}
            fill="none"
            className="stroke-primary-600"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCONFERENZA}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="flex flex-col items-start leading-none">
          <span className="text-body-sm font-display font-semibold text-paper-900">{report.punteggio}</span>
          <span className="text-caption text-paper-500">Equilibrio</span>
        </span>
      </button>

      <BottomSheet open={aperto} onClose={() => setAperto(false)} title="Equilibrio della settimana">
        <p className="text-body-sm text-paper-500 mb-4">
          Un consiglio di buon senso su come si distribuiscono i pasti, non una regola da rispettare alla lettera.
        </p>
        <ul className="flex flex-col gap-3">
          {report.regole.map((r) => (
            <li key={r.regola.id} className="flex items-start gap-3">
              <span
                className={cn(
                  "h-6 w-6 shrink-0 rounded-full flex items-center justify-center mt-0.5",
                  r.stato === "soddisfatta" && "bg-primary-50 text-primary-700",
                  r.stato === "quasi" && "bg-accent-50 text-accent-600",
                  r.stato === "mancata" && "bg-paper-100 text-paper-400",
                )}
              >
                {r.stato === "soddisfatta" && <Check size={14} strokeWidth={2.5} />}
                {r.stato === "quasi" && <ArrowRight size={13} strokeWidth={2.5} />}
                {r.stato === "mancata" && <Circle size={8} fill="currentColor" />}
              </span>
              <p className="text-body-md text-paper-800 pt-0.5">{r.messaggio}</p>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </>
  );
}
