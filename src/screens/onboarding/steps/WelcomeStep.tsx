import { motion } from "framer-motion";
import { ScanBarcode, Archive, ShoppingBasket } from "lucide-react";
import { MealPrepIcon } from "../../../components/MealPrepIcon";
import { APP_NAME, APP_TAGLINE } from "../../../config/app";

const SATELLITI = [
  { Icon: ScanBarcode, bg: "bg-pop-sky-400", pos: "-top-2 -right-8", delay: 0.35, rotate: -10 },
  { Icon: Archive, bg: "bg-pop-berry-400", pos: "-bottom-3 -right-6", delay: 0.5, rotate: 8 },
  { Icon: ShoppingBasket, bg: "bg-pop-yellow-400", pos: "-bottom-4 -left-8", delay: 0.65, rotate: -6 },
];

/**
 * Prima schermata: si guarda, non si legge. Il piatto è il centro (il
 * pasto pronto), scanner/dispensa/lista orbitano intorno come segnali di
 * cosa sa fare l'app — nessun paragrafo a spiegarlo.
 */
export function WelcomeStep() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-7 py-10">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
        className="relative h-36 w-36 flex items-center justify-center"
      >
        {SATELLITI.map(({ Icon, bg, pos, delay, rotate }, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, opacity: 0, rotate: rotate * 2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0, y: [0, -4, 0] }}
            transition={{
              scale: { type: "spring", stiffness: 300, damping: 16, delay },
              opacity: { duration: 0.3, delay },
              rotate: { type: "spring", stiffness: 300, damping: 16, delay },
              y: { duration: 3.2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 },
            }}
            className={`absolute ${pos} h-11 w-11 rounded-full ${bg} text-primary-900 shadow-card flex items-center justify-center`}
          >
            <Icon size={19} strokeWidth={2} />
          </motion.span>
        ))}
        <div className="h-20 w-20 rounded-2xl bg-primary-700 text-paper-50 flex items-center justify-center shadow-elevated">
          <MealPrepIcon size={40} />
        </div>
      </motion.div>
      <div>
        <h1 className="text-display-lg font-display font-semibold text-paper-900">{APP_NAME}</h1>
        <p className="text-body-lg text-paper-500 mt-2 max-w-[240px] mx-auto">{APP_TAGLINE}</p>
      </div>
    </div>
  );
}
