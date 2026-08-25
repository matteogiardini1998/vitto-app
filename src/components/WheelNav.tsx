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
const HUB_SIZE = 64;

/** Porta un valore angolare nell'intervallo (-180, 180]. */
function angularDistance(deg: number) {
  let d = deg % 360;
  if (d <= -180) d += 360;
  if (d > 180) d -= 360;
  return Math.abs(d);
}

/**
 * Colore di glassa per spicchio: uno per pagina, ripreso poi come dettaglio
 * sottile nella pagina reale (vedi PageHeader `accent`) così il colore in
 * ruota non è mai un'informazione isolata.
 */
export const GLAZE = [
  { pale: "bg-sage-100 text-sage-700", vivid: "bg-sage-500 text-paper-50" },
  { pale: "bg-pop-yellow-300/50 text-primary-800", vivid: "bg-pop-yellow-500 text-primary-900" },
  { pale: "bg-pop-sky-300/40 text-primary-700", vivid: "bg-pop-sky-500 text-paper-50" },
  { pale: "bg-pop-berry-300/40 text-primary-700", vivid: "bg-pop-berry-500 text-paper-50" },
];

/** Solo il colore pieno, per il dettaglio-eco nell'header della pagina reale. */
export const PAGE_ACCENT = ["bg-sage-500", "bg-pop-yellow-500", "bg-pop-sky-500", "bg-pop-berry-500"];

/** Stesso colore, tono chiaro da "macchia" per lo stato vuoto della pagina. */
export const PAGE_BLOB = ["bg-sage-300", "bg-pop-yellow-300", "bg-pop-sky-300", "bg-pop-berry-300"];

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
  // per considerare la pagina "arrivata".
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
          className="absolute left-1/2 -translate-x-1/2 rounded-full shadow-elevated overflow-hidden"
          style={{
            width: WHEEL_RADIUS * 2,
            height: WHEEL_RADIUS * 2,
            top: WHEEL_CONTAINER_HEIGHT - WHEEL_RADIUS,
            background: "radial-gradient(circle at 32% 24%, #e88a4f, #cf6127 70%)",
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 32% 22%, rgba(255,255,255,0.35), transparent 55%)" }}
          />
        </div>

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

      <HubGlow />
      <HubButton onClick={onHubTap} />
    </div>
  );
}

function HubGlow() {
  // Solo una sottile aureola aderente al bottone, non una nuvola diffusa.
  const size = HUB_SIZE * 1.28;
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none bg-primary-500"
      style={{ top: WHEEL_CONTAINER_HEIGHT, width: size, height: size, filter: "blur(6px)" }}
      animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

function HubButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      aria-label="Pianifica pasti"
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full text-paper-50 shadow-elevated overflow-hidden border-[3px] border-paper-0 flex items-center justify-center"
      style={{
        top: WHEEL_CONTAINER_HEIGHT,
        width: HUB_SIZE,
        height: HUB_SIZE,
        background: "radial-gradient(circle at 32% 26%, #4a8a68, #234a36 70%)",
      }}
    >
      <ChefHat size={26} strokeWidth={2} />
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.4), transparent 45%)" }}
      />
    </motion.button>
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

  const glaze = GLAZE[index % GLAZE.length];

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
            isActive ? cn(glaze.vivid, "shadow-card scale-105") : glaze.pale,
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
