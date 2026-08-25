import { motion, useTransform, animate, type MotionValue, type PanInfo } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ChefHat } from "lucide-react";
import { cn } from "../lib/cn";
import type { WheelVariant } from "../store/uiStore";

export type WheelPageDef = {
  path: string;
  label: string;
  icon: LucideIcon;
};

export const WHEEL_RADIUS = 92;
const DOME_PADDING = 30;
export const WHEEL_CONTAINER_HEIGHT = WHEEL_RADIUS + DOME_PADDING;
export const WHEEL_STEP = 90;
const HUB_SIZE = 48;

/** Porta un valore angolare nell'intervallo (-180, 180]. */
function angularDistance(deg: number) {
  let d = deg % 360;
  if (d <= -180) d += 360;
  if (d > 180) d -= 360;
  return Math.abs(d);
}

/** Colore di glassa per spicchio, per la variante "ceramica" (pallido/saturo). */
const GLAZE = [
  { pale: "bg-sage-100 text-sage-700", vivid: "bg-sage-500 text-paper-50" },
  { pale: "bg-accent-100 text-accent-700", vivid: "bg-accent-500 text-paper-50" },
  { pale: "bg-pop-sky-300/40 text-primary-700", vivid: "bg-pop-sky-500 text-paper-50" },
  { pale: "bg-pop-berry-300/40 text-primary-700", vivid: "bg-pop-berry-500 text-paper-50" },
];

type WheelNavProps = {
  pages: WheelPageDef[];
  angle: MotionValue<number>;
  activeIndex: number;
  onSettle: (index: number) => void;
  onHubTap: () => void;
  variant: WheelVariant;
};

/**
 * Ruota di navigazione: mezzo disco ancorato al bordo basso, gli spicchi
 * rappresentano le pagine. Il drag ruota il disco e — tramite lo stesso
 * MotionValue `angle` — trascina in sincrono lo strip di pagine nel layout
 * genitore. Isolato: non conosce il router, espone solo `onSettle(index)`.
 * `variant` cambia solo la pelle (legno / ceramica / quadrante): fisica,
 * gesto e dimensioni restano identici in tutte e tre.
 */
export function WheelNav({ pages, angle, activeIndex, onSettle, onHubTap, variant }: WheelNavProps) {
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

  const diskRotation = useTransform(angle, (a) => -a);

  return (
    <div className="absolute inset-x-0 bottom-0 z-30" style={{ height: WHEEL_CONTAINER_HEIGHT }}>
      <motion.div
        className="absolute inset-0 touch-none select-none"
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        role="group"
        aria-label="Navigazione principale"
      >
        <DiskBackground variant={variant} rotation={diskRotation} />

        {pages.map((page, i) => (
          <WheelItem
            key={page.path}
            page={page}
            index={i}
            angle={angle}
            isActive={i === activeIndex}
            onTap={() => goToIndex(i, true)}
            variant={variant}
          />
        ))}

        {variant === "quadrante" && (
          <div
            className="absolute left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-accent-500"
            style={{ top: WHEEL_CONTAINER_HEIGHT - WHEEL_RADIUS - 10 }}
            aria-hidden="true"
          />
        )}
      </motion.div>

      <HubGlow variant={variant} />
      <HubButton variant={variant} onClick={onHubTap} />
    </div>
  );
}

function DiskBackground({ variant, rotation }: { variant: WheelVariant; rotation: MotionValue<number> }) {
  const size = WHEEL_RADIUS * 2;
  const top = WHEEL_CONTAINER_HEIGHT - WHEEL_RADIUS;

  if (variant === "quadrante") {
    return (
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full border border-paper-300/70"
        style={{ width: size, height: size, top }}
        aria-hidden="true"
      />
    );
  }

  if (variant === "ceramica") {
    return (
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-paper-0 shadow-elevated overflow-hidden"
        style={{ width: size, height: size, top }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 35% 25%, rgba(255,255,255,0.9), transparent 55%)" }}
        />
      </div>
    );
  }

  // legno
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 rounded-full shadow-elevated overflow-hidden"
      style={{
        width: size,
        height: size,
        top,
        rotate: rotation,
        background: "radial-gradient(circle at 50% 42%, #f2e3c6 0%, #e3c99a 55%, #c9a06a 100%)",
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ opacity: 0.35 }}>
        <circle cx="50" cy="50" r="42" fill="none" stroke="#8a6a3f" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#8a6a3f" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="21" fill="none" stroke="#8a6a3f" strokeWidth="0.5" />
        {[45, 135, 225, 315].map((deg) => {
          const r1 = 12,
            r2 = 46;
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={50 + r1 * Math.sin(rad)}
              y1={50 - r1 * Math.cos(rad)}
              x2={50 + r2 * Math.sin(rad)}
              y2={50 - r2 * Math.cos(rad)}
              stroke="#8a6a3f"
              strokeWidth="0.6"
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

function HubGlow({ variant }: { variant: WheelVariant }) {
  const size = variant === "quadrante" ? HUB_SIZE * 2.9 : HUB_SIZE * 2.3;
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none bg-accent-400"
      style={{ top: WHEEL_CONTAINER_HEIGHT, width: size, height: size, filter: "blur(13px)" }}
      animate={{ scale: [1, 1.16, 1], opacity: [0.32, 0.52, 0.32] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

function HubButton({ variant, onClick }: { variant: WheelVariant; onClick: () => void }) {
  const size = variant === "quadrante" ? HUB_SIZE * 1.35 : HUB_SIZE;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      aria-label="Pianifica pasti"
      className={cn(
        "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full text-paper-50 flex items-center justify-center border-[3px] border-paper-0",
        variant === "legno" && "shadow-elevated",
        variant === "ceramica" && "shadow-elevated overflow-hidden",
        variant === "quadrante" && "shadow-elevated",
      )}
      style={{
        top: WHEEL_CONTAINER_HEIGHT,
        width: size,
        height: size,
        background:
          variant === "legno"
            ? "radial-gradient(circle at 35% 30%, #e88a4f, #cf6127 65%)"
            : variant === "ceramica"
              ? "radial-gradient(circle at 32% 26%, #ff9d63, #cf6127 70%)"
              : "#cf6127",
      }}
    >
      <ChefHat size={variant === "quadrante" ? 24 : 18} strokeWidth={2} />
      {variant === "ceramica" && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.55), transparent 45%)" }}
        />
      )}
    </motion.button>
  );
}

function WheelItem({
  page,
  index,
  angle,
  isActive,
  onTap,
  variant,
}: {
  page: WheelPageDef;
  index: number;
  angle: MotionValue<number>;
  isActive: boolean;
  onTap: () => void;
  variant: WheelVariant;
}) {
  const Icon = page.icon;
  const theta = useTransform(angle, (a) => ((index * WHEEL_STEP - a) * Math.PI) / 180);
  const x = useTransform(theta, (t) => WHEEL_RADIUS * Math.sin(t));
  const y = useTransform(theta, (t) => -WHEEL_RADIUS * Math.cos(t));
  const dist = useTransform(angle, (a) => angularDistance(index * WHEEL_STEP - a));
  const opacity = useTransform(dist, [0, 55, 100], [1, 0.55, 0]);
  const scale = useTransform(dist, [0, 90], [1, variant === "quadrante" ? 0.7 : 0.62]);
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
        {variant === "quadrante" ? (
          <Icon
            size={isActive ? 26 : 20}
            strokeWidth={isActive ? 2.4 : 1.7}
            className={isActive ? "text-primary-700" : "text-paper-400"}
          />
        ) : (
          <span
            className={cn(
              "h-9 w-9 rounded-full flex items-center justify-center transition-colors",
              variant === "legno" &&
                (isActive
                  ? "bg-accent-500 text-paper-50 shadow-card"
                  : "bg-[#00000012] text-[#5a4327] shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)]"),
              variant === "ceramica" && (isActive ? cn(glaze.vivid, "shadow-card scale-105") : glaze.pale),
            )}
          >
            <Icon size={16} strokeWidth={isActive ? 2.3 : 1.9} />
          </span>
        )}
        <motion.span
          style={{ opacity: labelOpacity }}
          className={cn(
            "text-caption font-semibold whitespace-nowrap",
            variant === "legno" ? "text-[#5a4327]" : "text-primary-700",
          )}
        >
          {page.label}
        </motion.span>
      </button>
    </motion.div>
  );
}
