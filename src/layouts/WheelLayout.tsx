import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
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

  useLayoutEffect(() => {
    const el = trackWidth.current;
    if (!el) return;
    const update = () => setPageWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const trackX = useTransform(angle, (a) => -(a / WHEEL_STEP) * pageWidth);

  const handleSettle = (index: number) => {
    setActiveIndex(index);
    if (PAGES[index].path !== location.pathname) {
      skipNextSync.current = true;
      navigate(PAGES[index].path);
    }
  };

  // Se l'URL cambia da fuori (link diretto, back del browser), riallinea la ruota.
  useEffect(() => {
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }
    const idx = PAGES.findIndex((p) => p.path === location.pathname);
    if (idx !== -1 && idx !== activeIndex) {
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
        <motion.div className="flex h-full" style={{ x: trackX }}>
          {SCREENS.map((Screen, i) => (
            <div
              key={PAGES[i].path}
              className="w-full h-full shrink-0 overflow-y-auto no-scrollbar"
              style={{ width: pageWidth || "100%" }}
              aria-hidden={i !== activeIndex}
              inert={i !== activeIndex}
            >
              <Screen />
            </div>
          ))}
        </motion.div>
      </div>

      <WheelNav
        pages={PAGES}
        angle={angle}
        activeIndex={activeIndex}
        onSettle={handleSettle}
        onHubTap={() => navigate("/meal-prep/genera")}
      />
    </div>
  );
}
