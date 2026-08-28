import { motion, useTransform, animate, type MotionValue, type PanInfo } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";
import { cn } from "../lib/cn";
import iconMealPrep from "../assets/icon-mealprep.webp";
import iconRicettario from "../assets/icon-ricettario.webp";
import iconSpesa from "../assets/icon-spesa.webp";
import iconDispensa from "../assets/icon-dispensa.webp";
import iconHubWood from "../assets/icon-hub-wood.webp";

/** Sotto questa soglia (px) di spostamento totale, il gesto non ha ancora una direzione chiara: si aspetta. */
const SOGLIA_LOCK_DIREZIONALE = 6;

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
/** Quanto si solleva l'hub rispetto al bordo della ruota: resta un'icona che sparisce di poco sotto lo schermo, non un mezzo cerchio. */
const HUB_TOP = WHEEL_CONTAINER_HEIGHT - 22;

/** Porta un valore angolare nell'intervallo (-180, 180]. */
function angularDistance(deg: number) {
  let d = deg % 360;
  if (d <= -180) d += 360;
  if (d > 180) d -= 360;
  return Math.abs(d);
}

/**
 * Icone sticker di sezione (brand VITTO): contorno bruno, bordo bianco tipo
 * adesivo, macchia organica nel colore della sezione — la macchia è già
 * dentro l'immagine, non più una <span> di sfondo separata.
 *
 * Chiavi per `path`, non per posizione: la ruota può cambiare ordine (vedi
 * PAGES in WheelLayout.tsx) senza dover risincronizzare a mano quale colore
 * o icona appartiene a quale sezione — l'identità della sezione è il path,
 * mai la sua posizione sulla ruota in un dato momento.
 *
 * TODO(brand): l'icona Ricettario è ancora la versione precedente allo stile
 * sticker (senza bordo bianco) — da sostituire quando arriverà la definitiva.
 * Non rigenerarla né modificarla nel frattempo (indicazione esplicita brand).
 */
export const SECTION_ICONS: Record<string, string> = {
  "/meal-prep": iconMealPrep,
  "/ricettario": iconRicettario,
  "/spesa": iconSpesa,
  "/dispensa": iconDispensa,
};

/** Solo il colore pieno, per il dettaglio-eco nell'header della pagina reale. */
export const PAGE_ACCENT: Record<string, string> = {
  "/meal-prep": "bg-sage-500",
  "/ricettario": "bg-pop-yellow-500",
  "/spesa": "bg-pop-sky-500",
  "/dispensa": "bg-pop-berry-500",
};

/** Stesso colore, tono chiaro da "macchia" per lo stato vuoto della pagina. */
export const PAGE_BLOB: Record<string, string> = {
  "/meal-prep": "bg-sage-300",
  "/ricettario": "bg-pop-yellow-300",
  "/spesa": "bg-pop-sky-300",
  "/dispensa": "bg-pop-berry-300",
};

type WheelNavProps = {
  pages: WheelPageDef[];
  angle: MotionValue<number>;
  activeIndex: number;
  onSettle: (index: number) => void;
  onHubTap: () => void;
  /** Vero mentre l'utente scorre la pagina verso il basso: la ruota si fa da parte. */
  hidden: boolean;
  /** Un gesto iniziato sulla ruota si è rivelato verticale: qui si passa il delta Y allo scroll della pagina attiva. */
  onVerticalPan?: (deltaY: number) => void;
};

/**
 * Ruota di navigazione: mezzo disco ancorato al bordo basso, gli spicchi
 * rappresentano le pagine. Il drag ruota il disco e — tramite lo stesso
 * MotionValue `angle` — trascina in sincrono lo strip di pagine nel layout
 * genitore. Isolato: non conosce il router, espone solo `onSettle(index)`.
 *
 * La ruota è un elemento che si TOCCA, non una zona che cattura tutto: nei
 * primi pixel di ogni gesto si decide se è a dominanza orizzontale (ruota la
 * ruota, comportamento invariato) o verticale (si passa il delta allo scroll
 * della pagina sottostante via `onVerticalPan`, e la ruota resta ferma).
 */
export function WheelNav({ pages, angle, activeIndex, onSettle, onHubTap, hidden, onVerticalPan }: WheelNavProps) {
  // Le icone avanzano con "index*STEP - angle" (vedi WheelItem): al crescere
  // di `angle` la loro posizione sul cerchio arretra. Il tagliere deve girare
  // nello stesso verso percepito dalle icone, quindi la sua rotazione è
  // l'opposto del valore grezzo di `angle`, non `angle` diretto.
  const discRotate = useTransform(angle, (a) => -a);

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

  const modoGesto = useRef<"indeciso" | "orizzontale" | "verticale">("indeciso");

  const handlePan = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (modoGesto.current === "indeciso") {
      if (Math.abs(info.offset.x) < SOGLIA_LOCK_DIREZIONALE && Math.abs(info.offset.y) < SOGLIA_LOCK_DIREZIONALE) {
        return; // ancora troppo presto per capire la direzione
      }
      modoGesto.current = Math.abs(info.offset.x) >= Math.abs(info.offset.y) ? "orizzontale" : "verticale";
    }

    if (modoGesto.current === "verticale") {
      onVerticalPan?.(-info.delta.y);
      return;
    }

    const deltaDeg = (info.delta.x / WHEEL_RADIUS) * (180 / Math.PI);
    angle.set(angle.get() - deltaDeg);
  };

  const handlePanEnd = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const eraOrizzontale = modoGesto.current === "orizzontale";
    modoGesto.current = "indeciso";
    if (!eraOrizzontale) return; // gesto verticale (o troppo corto per capirlo): niente snap, la ruota non si è mossa

    const inertiaDeg = (info.velocity.x / WHEEL_RADIUS) * (180 / Math.PI) * 0.12;
    const projected = angle.get() - inertiaDeg;
    const nearestIndex = Math.round(projected / WHEEL_STEP);
    const wrapped = ((nearestIndex % pages.length) + pages.length) % pages.length;
    onSettle(wrapped);
    animate(angle, nearestIndex * WHEEL_STEP, { type: "spring", stiffness: 260, damping: 28, mass: 0.9 });
  };

  return (
    <motion.div
      data-tutorial="wheel-nav"
      className="absolute inset-x-0 bottom-0 z-30"
      style={{ height: WHEEL_CONTAINER_HEIGHT, pointerEvents: hidden ? "none" : "auto" }}
      animate={{ y: hidden ? WHEEL_CONTAINER_HEIGHT * 0.65 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
    >
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
          }}
          aria-hidden="true"
        >
          {/* Il tagliere gira davvero con il gesto, nello stesso verso delle icone: solo questo strato ruota, la cornice resta ferma. */}
          <motion.div className="absolute inset-0 wood-tagliere" style={{ rotate: discRotate }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,0.22),transparent_55%)] dark:bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,0.06),transparent_55%)]" />
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
    </motion.div>
  );
}

function HubGlow() {
  // Solo una sottile aureola aderente al bottone, non una nuvola diffusa.
  const size = HUB_SIZE * 1.28;
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none bg-primary-500"
      style={{ top: HUB_TOP, width: size, height: size, filter: "blur(6px)" }}
      animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

/**
 * Il centro della ruota non è una sezione: è il fulcro che le tiene insieme,
 * per questo è materia (disco di legno tornito, cappello e frusta incisi)
 * invece di una macchia di colore piatta. Ombra a doppio strato per farlo
 * leggere come un pomello fisico rilevato, non un elemento grafico della ruota.
 */
function HubButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      aria-label="Pianifica pasti"
      data-tutorial="hub"
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden border-[3px] border-paper-0 shadow-[0_3px_4px_rgb(20_12_8_/_0.4),0_16px_26px_-6px_rgb(20_12_8_/_0.55)]"
      style={{ top: HUB_TOP, width: HUB_SIZE, height: HUB_SIZE }}
    >
      <img src={iconHubWood} alt="" className="h-full w-full object-cover" draggable={false} />
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
  const theta = useTransform(angle, (a) => ((index * WHEEL_STEP - a) * Math.PI) / 180);
  const x = useTransform(theta, (t) => WHEEL_RADIUS * Math.sin(t));
  const y = useTransform(theta, (t) => -WHEEL_RADIUS * Math.cos(t));
  const dist = useTransform(angle, (a) => angularDistance(index * WHEEL_STEP - a));
  const opacity = useTransform(dist, [0, 55, 100], [1, 0.55, 0]);
  const scale = useTransform(dist, [0, 90], [1, 0.62]);
  const labelOpacity = useTransform(dist, [0, 20, 45], [1, 0.4, 0]);

  const sectionIcon = SECTION_ICONS[page.path];

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
        className="-translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
      >
        {/* La macchia organica è già dentro l'immagine: qui solo spazio per respirare, niente sfondo proprio. */}
        <img
          src={sectionIcon}
          alt=""
          draggable={false}
          className={cn(
            "h-12 w-12 object-contain transition-[transform,opacity] drop-shadow-[0_3px_4px_rgba(20,12,8,0.35)]",
            isActive ? "scale-110" : "scale-90 opacity-80",
          )}
        />
        <motion.span
          style={{ opacity: labelOpacity, textShadow: "0 1px 3px rgb(0 0 0 / 0.45)" }}
          className="text-caption font-semibold text-paper-50 whitespace-nowrap"
        >
          {page.label}
        </motion.span>
      </button>
    </motion.div>
  );
}
