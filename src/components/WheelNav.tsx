import { motion, useTransform, animate, type MotionValue, type PanInfo } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ChefHat } from "lucide-react";
import { cn } from "../lib/cn";

export type WheelPageDef = {
  path: string;
  label: string;
  icon: LucideIcon;
};

export const WHEEL_RADIUS = 92;
const DOME_PADDING = 30;
export const WHEEL_CONTAINER_HEIGHT = WHEEL_RADIUS + DOME_PADDING;
export const WHEEL_STEP = 90;

/** Porta un valore angolare nell'intervallo (-180, 180]. */
function angularDistance(deg: number) {
  let d = deg % 360;
  if (d <= -180) d += 360;
  if (d > 180) d -= 360;
  return Math.abs(d);
}

type WheelNavProps = {
  pages: WheelPageDef[];
  angle: MotionValue<number>;
  activeIndex: number;
  onSettle: (index: number) => void;
  onHubTap: () => void;
};

/**
 * Ruota di navigazione: mezzo disco ancorato al bordo basso, gli spicchi
 * rappresentano le pagine. Il drag ruota il disco e — tramite lo stesso
 * MotionValue `angle` — trascina in sincrono lo strip di pagine nel layout
 * genitore. Isolato: non conosce il router, espone solo `onSettle(index)`.
 */
export function WheelNav({ pages, angle, activeIndex, onSettle, onHubTap }: WheelNavProps) {
  // Lo stato attivo (e la navigazione) si aggiornano SUBITO al tap/rilascio:
  // la molla su `angle` è solo l'estetica che rincorre, non una condizione
  // per considerare la pagina "arrivata". Così un'animazione interrotta o
  // rallentata non può mai lasciare la ruota disallineata dalla pagina reale.
  const goToIndex = (index: number, useShortestPath: boolean) => {
    const current = angle.get();
    let target = index * WHEEL_STEP;
    if (useShortestPath) {
      target += Math.round((current - target) / 360) * 360;
    }
    onSettle(index);
    animate(angle, target, { type: "spring", stiffness: 260, damping: 28, mass: 0.9 });
  };

  const handlePan = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const deltaDeg = (info.delta.x / WHEEL_RADIUS) * (180 / Math.PI);
    angle.set(angle.get() - deltaDeg);
  };

  const handlePanEnd = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const inertiaDeg = (info.velocity.x / WHEEL_RADIUS) * (180 / Math.PI) * 0.12;
    const projected = angle.get() - inertiaDeg;
    const nearestIndex = Math.round(projected / WHEEL_STEP);
    const wrapped = ((nearestIndex % pages.length) + pages.length) % pages.length;
    onSettle(wrapped);
    animate(angle, nearestIndex * WHEEL_STEP, { type: "spring", stiffness: 260, damping: 28, mass: 0.9 });
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-30" style={{ height: WHEEL_CONTAINER_HEIGHT }}>
      <motion.div
        className="absolute inset-0 touch-none select-none"
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        role="group"
        aria-label="Navigazione principale"
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-paper-0 border border-paper-200 shadow-elevated"
          style={{ width: WHEEL_RADIUS * 2, height: WHEEL_RADIUS * 2, top: WHEEL_CONTAINER_HEIGHT - WHEEL_RADIUS }}
          aria-hidden="true"
        />

        {pages.map((page, i) => (
          <WheelItem
            key={page.path}
            page={page}
            index={i}
            angle={angle}
            isActive={i === activeIndex}
            onTap={() => goToIndex(i, true)}
          />
        ))}
      </motion.div>

      <button
        type="button"
        onClick={onHubTap}
        aria-label="Pianifica pasti"
        className="absolute left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500 text-paper-50 shadow-elevated border-[3px] border-paper-0 flex items-center justify-center active:scale-95 transition-transform"
        style={{ top: WHEEL_CONTAINER_HEIGHT }}
      >
        <ChefHat size={18} strokeWidth={2} />
      </button>
    </div>
  );
}

function WheelItem({
  page,
  index,
  angle,
  isActive,
  onTap,
}: {
  page: WheelPageDef;
  index: number;
  angle: MotionValue<number>;
  isActive: boolean;
  onTap: () => void;
}) {
  const Icon = page.icon;
  const theta = useTransform(angle, (a) => ((index * WHEEL_STEP - a) * Math.PI) / 180);
  const x = useTransform(theta, (t) => WHEEL_RADIUS * Math.sin(t));
  const y = useTransform(theta, (t) => -WHEEL_RADIUS * Math.cos(t));
  const dist = useTransform(angle, (a) => angularDistance(index * WHEEL_STEP - a));
  const opacity = useTransform(dist, [0, 55, 100], [1, 0.55, 0]);
  const scale = useTransform(dist, [0, 90], [1, 0.62]);
  const labelOpacity = useTransform(dist, [0, 20, 45], [1, 0.4, 0]);

  return (
    <motion.div
      className="absolute"
      style={{ left: "50%", top: WHEEL_CONTAINER_HEIGHT, x, y, opacity, scale }}
    >
      <button
        type="button"
        onClick={onTap}
        aria-label={page.label}
        aria-current={isActive ? "page" : undefined}
        className="-translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
      >
        <span
          className={cn(
            "h-9 w-9 rounded-full flex items-center justify-center transition-colors",
            isActive ? "bg-primary-700 text-paper-50" : "bg-paper-100 text-paper-500",
          )}
        >
          <Icon size={16} strokeWidth={isActive ? 2.3 : 1.9} />
        </span>
        <motion.span
          style={{ opacity: labelOpacity }}
          className="text-caption font-semibold text-primary-700 whitespace-nowrap"
        >
          {page.label}
        </motion.span>
      </button>
    </motion.div>
  );
}
