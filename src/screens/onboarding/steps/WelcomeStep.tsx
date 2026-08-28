import { motion } from "framer-motion";
import { APP_NAME } from "../../../config/app";
import iconMealPrep from "../../../assets/icon-mealprep.webp";
import iconRicettario from "../../../assets/icon-ricettario.webp";
import iconDispensa from "../../../assets/icon-dispensa.webp";
import iconSpesa from "../../../assets/icon-spesa.webp";
import iconHubWood from "../../../assets/icon-hub-wood.webp";

const SEZIONI = [
  { icon: iconMealPrep, pos: "-top-3 left-1/2 -translate-x-1/2", delay: 0.3 },
  { icon: iconRicettario, pos: "top-1/2 -right-3 -translate-y-1/2", delay: 0.42 },
  { icon: iconDispensa, pos: "-bottom-3 left-1/2 -translate-x-1/2", delay: 0.54 },
  { icon: iconSpesa, pos: "top-1/2 -left-3 -translate-y-1/2", delay: 0.66 },
];

/**
 * Prima schermata: si guarda, non si legge. Non più icone generiche sparse —
 * la ruota vera, in miniatura: lo stesso tagliere, lo stesso hub, le stesse
 * quattro sezioni che l'utente userà davvero, così si riconosce fin dal primo
 * istante invece di scoprirla solo dopo.
 */
export function WelcomeStep() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 py-10">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
        className="relative h-56 w-56"
      >
        <div className="absolute inset-0 rounded-full overflow-hidden shadow-elevated wood-tagliere">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,0.22),transparent_55%)] dark:bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,0.06),transparent_55%)]" />
        </div>

        {SEZIONI.map(({ icon, pos, delay }, i) => (
          <motion.img
            key={i}
            src={icon}
            alt=""
            draggable={false}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -4, 0] }}
            transition={{
              scale: { type: "spring", stiffness: 300, damping: 16, delay },
              opacity: { duration: 0.3, delay },
              y: { duration: 3.2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 },
            }}
            className={`absolute h-12 w-12 object-contain drop-shadow-[0_3px_4px_rgba(20,12,8,0.35)] ${pos}`}
          />
        ))}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.15 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full overflow-hidden border-[3px] border-paper-0 shadow-[0_3px_4px_rgb(20_12_8_/_0.4),0_16px_26px_-6px_rgb(20_12_8_/_0.55)]"
        >
          <img src={iconHubWood} alt="" className="h-full w-full object-cover" draggable={false} />
        </motion.div>
      </motion.div>
      <div>
        <h1 className="text-display-lg font-display font-semibold text-paper-900">{APP_NAME}</h1>
        {/* Il claim ufficiale vive solo nella landing e nei meta: qui il tono resta breve e situazionale. */}
        <p className="text-body-lg text-paper-500 mt-2 max-w-[240px] mx-auto">Due minuti, poi si cucina.</p>
      </div>
    </div>
  );
}
