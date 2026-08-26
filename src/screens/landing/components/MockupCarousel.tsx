import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue, type PanInfo } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/cn";
import { ChalkArrow, ChalkCircle, ChalkPostIt } from "../../../chalk";
import { PhoneMockup } from "./PhoneMockup";
import mockupMealprep from "../../../assets/mockup-mealprep.webp";
import mockupRicettario from "../../../assets/mockup-ricettario.webp";
import mockupSpesa from "../../../assets/mockup-spesa.webp";
import mockupDispensa from "../../../assets/mockup-dispensa.webp";

/** Stessa meccanica della ruota dell'app: passo angolare fisso, drag + snap. */
const STEP = 90;
/** Raggio orizzontale dell'arco su cui scorrono i telefoni (px). */
const RAGGIO_X = 320;
/** Quanto scendono i telefoni laterali lungo l'arco (px). */
const CADUTA_Y = 90;
/** Raggio "di presa" per il drag: più piccolo = ruota più reattiva al trascinamento. */
const RAGGIO_DRAG = 170;
/** Ogni quanto avanza da sola finché nessuno la tocca (ms). */
const INTERVALLO_AUTO = 3600;

type Annotazioni = {
  alto?: string;
  basso?: string;
  /** Cerchio di gesso su un punto chiave dello screenshot, in % dello schermo del telefono. */
  cerchio?: { left: string; top: string; width: string; height: string };
};

const MOCKUPS: { id: string; src: string; alt: string; titolo: string; note: Annotazioni }[] = [
  {
    id: "mealprep",
    src: mockupMealprep,
    alt: "La settimana di pasti pianificata nell'app",
    titolo: "Piano Pasti",
    note: { alto: "la tua settimana, generata su misura", basso: "un occhio anche all'equilibrio" },
  },
  {
    id: "ricettario",
    src: mockupRicettario,
    alt: "Il ricettario con le ricette personali",
    titolo: "Ricettario",
    note: { alto: "ricette tue, modificabili sempre" },
  },
  {
    id: "spesa",
    src: mockupSpesa,
    alt: "La lista della spesa divisa per reparti",
    titolo: "Lista della spesa",
    note: {
      basso: "batti i codici come al salvatempo",
      // Coordinate misurate sullo screenshot reale: il bottone scanner, in basso a sinistra.
      cerchio: { left: "4%", top: "74%", width: "18%", height: "8%" },
    },
  },
  {
    id: "dispensa",
    src: mockupDispensa,
    alt: "La dispensa con quello che hai già in casa",
    titolo: "Dispensa",
    note: { alto: "quello che hai già in casa" },
  },
];

/** Porta un valore angolare nell'intervallo (-180, 180]. */
function wrapDeg(deg: number) {
  let d = deg % 360;
  if (d <= -180) d += 360;
  if (d > 180) d -= 360;
  return d;
}

/**
 * Giostra dei mockup con la stessa meccanica della ruota in-app: i telefoni
 * vivono su un arco, si trascinano con snap sul più vicino, il centrale è
 * grande e dritto, i laterali scalati e inclinati. Ruota da sola finché
 * nessuno la tocca; al primo tocco l'auto-rotazione si spegne per sempre —
 * chi gioca dieci secondi qui ha già imparato il gesto dell'app.
 *
 * Sfondo: una lavagnetta magnetica da cucina (non più legno nudo), sulla
 * quale i post-it delle annotazioni sono "attaccati" al telefono centrale
 * stesso — così restano sempre al suo fianco, a qualsiasi larghezza di
 * schermo, invece di fluttuare ancorati ai bordi del contenitore.
 */
export function MockupCarousel() {
  const angle = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const toccata = useRef(false);
  const riduciMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // Un solo osservatore per la sezione: le annotazioni (che si ridisegnano a
  // ogni cambio di mockup) partono pilotate, senza dipendere ognuna dal viewport.
  const sezioneVista = useInView(sectionRef, { once: true, amount: 0.25 });

  const goToIndex = (index: number, shortest: boolean) => {
    const current = angle.get();
    let target = index * STEP;
    if (shortest) target += Math.round((current - target) / 360) * 360;
    setActiveIndex(((index % MOCKUPS.length) + MOCKUPS.length) % MOCKUPS.length);
    animate(angle, target, { type: "spring", stiffness: 220, damping: 30, mass: 0.9 });
  };

  useEffect(() => {
    if (riduciMotion) return;
    const timer = setInterval(() => {
      if (toccata.current) return;
      const next = Math.round(angle.get() / STEP) + 1;
      setActiveIndex(((next % MOCKUPS.length) + MOCKUPS.length) % MOCKUPS.length);
      animate(angle, next * STEP, { type: "spring", stiffness: 120, damping: 24 });
    }, INTERVALLO_AUTO);
    return () => clearInterval(timer);
  }, [angle, riduciMotion]);

  const fermaAuto = () => {
    toccata.current = true;
  };

  const handlePan = (_e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const deltaDeg = (info.delta.x / RAGGIO_DRAG) * (180 / Math.PI);
    angle.set(angle.get() - deltaDeg);
  };

  const handlePanEnd = (_e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const inertiaDeg = (info.velocity.x / RAGGIO_DRAG) * (180 / Math.PI) * 0.1;
    const projected = angle.get() - inertiaDeg;
    goToIndex(Math.round(projected / STEP), false);
  };

  return (
    <section ref={sectionRef} aria-roledescription="giostra" aria-label="Le pagine dell'app" className="relative">
      <div className="magnet-board relative rounded-[2rem]">
        {/* Targhetta col nome della pagina attiva: cambia scorrendo la giostra, come un'etichetta appesa alla lavagna. */}
        <div className="pointer-events-none absolute right-4 top-4 z-40 overflow-hidden md:right-6 md:top-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={MOCKUPS[activeIndex].id}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              className="block rounded-full bg-primary-700 px-3.5 py-1.5 font-display text-caption font-semibold tracking-wide text-paper-50 shadow-card dark:bg-primary-800"
            >
              {MOCKUPS[activeIndex].titolo}
            </motion.span>
          </AnimatePresence>
        </div>
        <motion.div
          className="relative h-[480px] touch-pan-y select-none md:h-[560px]"
          onPointerDown={fermaAuto}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
        >
          {MOCKUPS.map((mockup, i) => (
            <CarouselItem key={mockup.id} index={i} angle={angle} isActive={i === activeIndex} onTap={() => goToIndex(i, true)}>
              <PhoneMockup
                src={mockup.src}
                alt={mockup.alt}
                prioritario={i === 0}
                className="w-[210px] md:w-[240px]"
                fuoriSchermo={
                  i === activeIndex && (
                    <>
                      {mockup.note.alto && (
                        <div className="absolute -top-7 -left-9 z-30 w-44 md:-left-16 md:w-56" key={`alto-${activeIndex}`}>
                          <ChalkPostIt attivo={sezioneVista} animaKey={activeIndex} ruota={-6}>
                            {mockup.note.alto}
                          </ChalkPostIt>
                        </div>
                      )}
                      {mockup.note.basso && (
                        <div className="absolute -bottom-7 -right-9 z-30 w-44 text-right md:-right-16 md:w-56" key={`basso-${activeIndex}`}>
                          <ChalkPostIt attivo={sezioneVista} animaKey={activeIndex} ruota={5}>
                            {mockup.note.basso}
                          </ChalkPostIt>
                        </div>
                      )}
                    </>
                  )
                }
              >
                {i === activeIndex && mockup.note.cerchio && (
                  <>
                    {/* Il cerchio di gesso vive sopra lo screenshot, in coordinate % dello schermo: penetra davvero nell'app. */}
                    <div className="absolute z-10 pointer-events-none" style={mockup.note.cerchio}>
                      <ChalkCircle tono="inchiostro" attivo={sezioneVista} animaKey={activeIndex} ritardo={0.55} className="h-full w-full" />
                    </div>
                    <ChalkArrow
                      tono="inchiostro"
                      attivo={sezioneVista}
                      variante="curva-giu"
                      ritardo={0.15}
                      animaKey={activeIndex}
                      ruota={-45}
                      className="pointer-events-none absolute bottom-[26%] left-[6%] z-10 h-14 w-14"
                    />
                  </>
                )}
              </PhoneMockup>
            </CarouselItem>
          ))}
        </motion.div>
      </div>

      {/* Indicatore: un puntino per pagina. */}
      <div className="relative z-20 mt-5 flex justify-center gap-2.5">
        {MOCKUPS.map((mockup, i) => (
          <button
            key={mockup.id}
            type="button"
            aria-label={`Vai al mockup ${mockup.alt}`}
            aria-current={i === activeIndex}
            onClick={() => {
              fermaAuto();
              goToIndex(i, true);
            }}
            className={cn(
              "h-2.5 rounded-full transition-all",
              i === activeIndex ? "w-7 bg-primary-700 dark:bg-primary-300" : "w-2.5 bg-primary-700/30 dark:bg-primary-300/30",
            )}
          />
        ))}
      </div>
    </section>
  );
}

function CarouselItem({
  index,
  angle,
  isActive,
  onTap,
  children,
}: {
  index: number;
  angle: MotionValue<number>;
  isActive: boolean;
  onTap: () => void;
  children: React.ReactNode;
}) {
  const theta = useTransform(angle, (a) => wrapDeg(index * STEP - a));
  const x = useTransform(theta, (d) => Math.sin((d * Math.PI) / 180) * RAGGIO_X);
  const y = useTransform(theta, (d) => (1 - Math.cos((d * Math.PI) / 180)) * CADUTA_Y);
  const rotate = useTransform(theta, (d) => d * 0.16);
  const dist = useTransform(theta, (d) => Math.abs(d));
  const scale = useTransform(dist, [0, 90, 180], [1, 0.64, 0.42]);
  // I telefoni laterali restano ben visibili: niente più "pezzi trasparenti"
  // che lasciano intravedere lo sfondo — sfumano solo appena prima di sparire.
  const opacity = useTransform(dist, [0, 100, 165], [1, 0.9, 0]);
  const zIndex = useTransform(dist, (d) => Math.round(100 - d));

  return (
    <motion.div
      className="absolute left-1/2 top-10"
      style={{ x, y, rotate, scale, opacity, zIndex }}
      onTap={() => {
        if (!isActive) onTap();
      }}
    >
      <div className="-translate-x-1/2">{children}</div>
    </motion.div>
  );
}
