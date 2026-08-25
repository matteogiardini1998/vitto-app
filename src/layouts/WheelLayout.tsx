import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import { CalendarDays, BookOpen, ShoppingBasket, Archive } from "lucide-react";
import { WheelNav, WHEEL_CONTAINER_HEIGHT, WHEEL_STEP, type WheelPageDef } from "../components/WheelNav";
import { ProfileAvatar } from "../components/ProfileAvatar";
import { MealPrepScreen } from "../screens/mealprep/MealPrepScreen";
import { RicettarioScreen } from "../screens/ricettario/RicettarioScreen";
import { SpesaScreen } from "../screens/spesa/SpesaScreen";
import { DispensaScreen } from "../screens/dispensa/DispensaScreen";
import { useProfileStore } from "../store/profileStore";

const PAGES: WheelPageDef[] = [
  { path: "/meal-prep", label: "Meal Prep", icon: CalendarDays },
  { path: "/ricettario", label: "Ricettario", icon: BookOpen },
  { path: "/spesa", label: "Spesa", icon: ShoppingBasket },
  { path: "/dispensa", label: "Dispensa", icon: Archive },
];

const SCREENS = [MealPrepScreen, RicettarioScreen, SpesaScreen, DispensaScreen];

/**
 * Layout delle 4 pagine principali, guidato dalla ruota di navigazione.
 * Le pagine restano tutte montate in uno strip orizzontale: la posizione
 * dello strip è una funzione diretta dell'angolo del disco, così il drag
 * sulla ruota trascina fisicamente le pagine in sincrono 1:1.
 *
 * Il Profilo non fa più parte della ruota (si accede dal bottone in alto a
 * destra, presente su ogni pagina) — qui c'è una versione minima, sarà
 * rifinita nel prossimo passaggio (bottone persistente con avatar).
 */
export function WheelLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const profilo = useProfileStore((s) => s.profilo);

  const initialIndex = Math.max(
    0,
    PAGES.findIndex((p) => p.path === location.pathname),
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex === -1 ? 0 : initialIndex);
  const angle = useMotionValue(activeIndex * WHEEL_STEP);
  const skipNextSync = useRef(false);

  const trackWidth = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(0);

  // La ruota si nasconde scorrendo verso il basso (si legge senza distrazioni)
  // e riappare scorrendo verso l'alto. Ogni pagina ha il suo scroll, quindi
  // teniamo l'ultimo scrollTop di ciascuna e reagiamo solo a quello della
  // pagina davvero attiva.
  const [wheelHidden, setWheelHidden] = useState(false);
  const lastScrollTops = useRef<number[]>(PAGES.map(() => 0));

  const handlePageScroll = (index: number, scrollTop: number) => {
    const last = lastScrollTops.current[index];
    const delta = scrollTop - last;
    lastScrollTops.current[index] = scrollTop;
    if (index !== activeIndex) return;
    if (scrollTop <= 4) {
      setWheelHidden(false);
    } else if (delta > 6) {
      setWheelHidden(true);
    } else if (delta < -6) {
      setWheelHidden(false);
    }
  };

  useLayoutEffect(() => {
    const el = trackWidth.current;
    if (!el) return;
    const update = () => setPageWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleSettle = (index: number) => {
    setActiveIndex(index);
    setWheelHidden(false);
    if (PAGES[index].path !== location.pathname) {
      skipNextSync.current = true;
      navigate(PAGES[index].path);
    }
  };

  // Se l'URL cambia da fuori (link diretto, back del browser, o un path non
  // riconosciuto come "/") riallinea la ruota. WheelLayout non passa mai da
  // <Outlet/>, quindi è l'unico punto che può normalizzare l'URL sulla prima
  // pagina quando non combacia con nessuna delle 4.
  useEffect(() => {
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }
    const idx = PAGES.findIndex((p) => p.path === location.pathname);
    if (idx === -1) {
      navigate(PAGES[0].path, { replace: true });
      return;
    }
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      angle.set(idx * WHEEL_STEP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="app-shell flex flex-col">
      <button
        type="button"
        onClick={() => navigate("/profilo")}
        aria-label="Profilo"
        className="absolute right-4 top-4 z-40 active:scale-95 transition-transform"
      >
        <ProfileAvatar
          avatarId={profilo.avatarId}
          nome={profilo.nome}
          cognome={profilo.cognome}
          size={44}
        />
      </button>

      <div className="flex-1 overflow-hidden relative" style={{ paddingBottom: WHEEL_CONTAINER_HEIGHT }} ref={trackWidth}>
        {SCREENS.map((Screen, i) => (
          <PageSlot
            key={PAGES[i].path}
            index={i}
            count={PAGES.length}
            angle={angle}
            pageWidth={pageWidth}
            ariaHidden={i !== activeIndex}
            onScroll={handlePageScroll}
          >
            <Screen />
          </PageSlot>
        ))}
      </div>

      <WheelNav
        pages={PAGES}
        angle={angle}
        activeIndex={activeIndex}
        onSettle={handleSettle}
        onHubTap={() => navigate("/meal-prep/genera")}
        hidden={wheelHidden}
      />
    </div>
  );
}

/**
 * Una pagina nello strip. La sua posizione è una funzione PERIODICA di
 * `angle` (avvolta in [-count/2, count/2) passi), non un multiplo lineare:
 * così un angolo che cresce all'infinito (tanti giri di ruota) non fa mai
 * uscire la pagina dalla sua "corsia" — niente translateX enormi che
 * finiscono oltre l'ultima pagina montata, che è la causa reale dello
 * schermo vuoto dopo un giro completo. La pagina resta sempre la stessa
 * istanza: si sposta, non si smonta mai.
 */
function PageSlot({
  index,
  count,
  angle,
  pageWidth,
  ariaHidden,
  onScroll,
  children,
}: {
  index: number;
  count: number;
  angle: MotionValue<number>;
  pageWidth: number;
  ariaHidden: boolean;
  onScroll: (index: number, scrollTop: number) => void;
  children: ReactNode;
}) {
  const x = useTransform(angle, (a) => {
    const raw = index - a / WHEEL_STEP;
    const wrapped = (((raw + count / 2) % count) + count) % count - count / 2;
    return wrapped * pageWidth;
  });

  return (
    <motion.div className="absolute inset-0 transform-gpu" style={{ x, willChange: "transform" }} aria-hidden={ariaHidden}>
      <div
        className="h-full overflow-y-auto no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
        onScroll={(e) => onScroll(index, e.currentTarget.scrollTop)}
      >
        {children}
      </div>
    </motion.div>
  );
}
