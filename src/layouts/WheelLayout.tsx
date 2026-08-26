import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import { CalendarDays, BookOpen, ShoppingBasket, Archive } from "lucide-react";
import { WheelNav, WHEEL_CONTAINER_HEIGHT, WHEEL_STEP, type WheelPageDef } from "../components/WheelNav";
import { ProfileAvatar } from "../components/ProfileAvatar";
import { BarcodeScanButton } from "../components/barcode/BarcodeScanButton";
import { BarcodeScannerOverlay } from "../components/barcode/BarcodeScannerOverlay";
import { MealPrepScreen } from "../screens/mealprep/MealPrepScreen";
import { RicettarioScreen } from "../screens/ricettario/RicettarioScreen";
import { SpesaScreen } from "../screens/spesa/SpesaScreen";
import { DispensaScreen } from "../screens/dispensa/DispensaScreen";
import { useProfileStore } from "../store/profileStore";
import { useDispensaStore } from "../store/dispensaStore";
import { useShoppingStore } from "../store/shoppingStore";
import { useToastStore } from "../store/toastStore";
import { ritentaCodaDaRiconoscere } from "../lib/barcode/riconoscimento";
import { trovaVoceListaCorrispondente, impareAssociazioneLista } from "../lib/smistamento";
import type { ProdottoBarcode } from "../store/barcodeCacheStore";
import type { RisultatoAzione } from "../lib/barcode/types";

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
  const scrollRefs = useRef<(HTMLDivElement | null)[]>(PAGES.map(() => null));

  // Un gesto verticale iniziato sulla ruota (vedi WheelNav) scorre la pagina
  // davvero attiva, esattamente come farebbe uno scroll nativo.
  const handleVerticalPan = (deltaY: number) => {
    scrollRefs.current[activeIndex]?.scrollBy({ top: deltaY });
  };

  const [scannerAperto, setScannerAperto] = useState(false);
  const paginaConScanner = location.pathname === "/dispensa" || location.pathname === "/spesa";

  const aggiungiVoceDispensa = useDispensaStore((s) => s.aggiungiVoce);
  const aggiornaVoceDispensa = useDispensaStore((s) => s.aggiornaVoce);
  const rimuoviVoceDispensa = useDispensaStore((s) => s.rimuoviVoce);
  const aggiungiManualeSpesa = useShoppingStore((s) => s.aggiungiManuale);
  const toggleVoceSpesa = useShoppingStore((s) => s.toggleVoce);
  const showToast = useToastStore((s) => s.show);

  // Tracciano cosa ha già fatto QUESTA sessione di scanner per ogni barcode,
  // per poter incrementare/annullare in modo coerente invece di ripetere
  // l'azione a ogni singolo bip dello stesso prodotto. Si azzerano ad ogni
  // apertura dello scanner.
  const sessioneDispensaRef = useRef(new Map<string, { voceId: string; creataOra: boolean; deltaSessione: number }>());
  const sessioneSpesaRef = useRef(new Set<string>());

  useEffect(() => {
    const ritenta = () => ritentaCodaDaRiconoscere();
    window.addEventListener("online", ritenta);
    return () => window.removeEventListener("online", ritenta);
  }, []);

  const apriScanner = () => {
    sessioneDispensaRef.current.clear();
    sessioneSpesaRef.current.clear();
    setScannerAperto(true);
  };

  const handleRisoltoDispensa = (prodotto: ProdottoBarcode): RisultatoAzione => {
    const dispensaStore = useDispensaStore.getState();
    const dispensa = dispensaStore.dispense.find((d) => d.id === dispensaStore.dispensaAttivaId) ?? dispensaStore.dispense[0];
    const barcode = prodotto.barcode;
    const traccia = sessioneDispensaRef.current.get(barcode);

    if (traccia) {
      const vAttuale = dispensa.voci.find((v) => v.id === traccia.voceId);
      aggiornaVoceDispensa(dispensa.id, traccia.voceId, { qta: (vAttuale?.qta ?? 0) + 1 });
      traccia.deltaSessione += 1;
    } else {
      const esistente = dispensa.voci.find((v) => v.barcode === barcode);
      if (esistente) {
        aggiornaVoceDispensa(dispensa.id, esistente.id, { qta: (esistente.qta ?? 1) + 1 });
        sessioneDispensaRef.current.set(barcode, { voceId: esistente.id, creataOra: false, deltaSessione: 1 });
      } else {
        const nome = [prodotto.nome, prodotto.marca].filter(Boolean).join(" · ") + (prodotto.formato ? ` (${prodotto.formato})` : "");
        const nuovoId = aggiungiVoceDispensa(dispensa.id, {
          nome,
          qta: 1,
          unita: "pz",
          categoria: prodotto.scaffale,
          barcode,
          marca: prodotto.marca,
          nutrizionePer100g: prodotto.nutrizionePer100g,
        });
        sessioneDispensaRef.current.set(barcode, { voceId: nuovoId, creataOra: true, deltaSessione: 1 });
      }
    }

    showToast(`Aggiunto: ${prodotto.nome} ✓`);

    return {
      tipo: "fatto",
      annulla: () => {
        const traccia2 = sessioneDispensaRef.current.get(barcode);
        if (!traccia2) return;
        const s = useDispensaStore.getState();
        const d = s.dispense.find((dd) => dd.id === s.dispensaAttivaId) ?? s.dispense[0];
        if (traccia2.creataOra) {
          rimuoviVoceDispensa(d.id, traccia2.voceId);
        } else {
          const v = d.voci.find((vv) => vv.id === traccia2.voceId);
          aggiornaVoceDispensa(d.id, traccia2.voceId, { qta: Math.max(0, (v?.qta ?? traccia2.deltaSessione) - traccia2.deltaSessione) });
        }
        sessioneDispensaRef.current.delete(barcode);
        showToast("Annullato");
      },
    };
  };

  /** Prodotto non associato a nessuna voce: lo scanner presume che sia nel carrello e lo aggiunge già preso. */
  const aggiungiGiaBarrata = (prodotto: ProdottoBarcode): string => {
    const id = aggiungiManualeSpesa(prodotto.nome, prodotto.scaffale, true);
    showToast(`Aggiunto: ${prodotto.nome} ✓`);
    return id;
  };

  const handleRisoltoSpesa = (prodotto: ProdottoBarcode): RisultatoAzione => {
    const barcode = prodotto.barcode;
    if (sessioneSpesaRef.current.has(barcode)) return { tipo: "fatto" };
    sessioneSpesaRef.current.add(barcode);

    const vociNonPrese = useShoppingStore.getState().voci.filter((v) => !v.presa);
    const esito = trovaVoceListaCorrispondente(prodotto, vociNonPrese);

    if (esito.tipo === "match") {
      toggleVoceSpesa(esito.voce.id);
      showToast(`Spuntato: ${esito.voce.nome} ✓`);
      return {
        tipo: "fatto",
        annulla: () => {
          toggleVoceSpesa(esito.voce.id);
          sessioneSpesaRef.current.delete(barcode);
        },
      };
    }

    if (esito.tipo === "conferma") {
      return {
        tipo: "scelta",
        domanda: `È la tua «${esito.voce.nome}» in lista?`,
        opzioni: [
          {
            label: "Sì",
            onScegli: () => {
              toggleVoceSpesa(esito.voce.id);
              impareAssociazioneLista(barcode, esito.voce.nome);
              showToast(`Spuntato: ${esito.voce.nome} ✓`);
            },
          },
          { label: "No", onScegli: () => aggiungiGiaBarrata(prodotto) },
        ],
      };
    }

    const nuovoId = aggiungiGiaBarrata(prodotto);
    return {
      tipo: "fatto",
      annulla: () => {
        useShoppingStore.getState().rimuoviVoce(nuovoId);
        sessioneSpesaRef.current.delete(barcode);
      },
    };
  };

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
            scrollRef={(el) => {
              scrollRefs.current[i] = el;
            }}
          >
            <Screen />
          </PageSlot>
        ))}
      </div>

      {paginaConScanner && <BarcodeScanButton onClick={apriScanner} />}
      <BarcodeScannerOverlay
        open={scannerAperto}
        onClose={() => setScannerAperto(false)}
        onRisolto={
          location.pathname === "/dispensa"
            ? handleRisoltoDispensa
            : location.pathname === "/spesa"
              ? handleRisoltoSpesa
              : undefined
        }
      />

      <WheelNav
        pages={PAGES}
        angle={angle}
        activeIndex={activeIndex}
        onSettle={handleSettle}
        onHubTap={() => navigate("/meal-prep/genera")}
        hidden={wheelHidden}
        onVerticalPan={handleVerticalPan}
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
  scrollRef,
  children,
}: {
  index: number;
  count: number;
  angle: MotionValue<number>;
  pageWidth: number;
  ariaHidden: boolean;
  onScroll: (index: number, scrollTop: number) => void;
  scrollRef: (el: HTMLDivElement | null) => void;
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
        ref={scrollRef}
        className="h-full overflow-y-auto no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
        onScroll={(e) => onScroll(index, e.currentTarget.scrollTop)}
      >
        {children}
      </div>
    </motion.div>
  );
}
