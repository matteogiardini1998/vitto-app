import { motion } from "framer-motion";
import { MealPrepIcon } from "../../../components/MealPrepIcon";

export function WelcomeStep() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-10">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
        className="relative h-24 w-24 flex items-center justify-center"
      >
        <motion.span
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1 -right-2 h-6 w-6 rounded-full bg-pop-yellow-400"
        />
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute -bottom-1 -left-3 h-5 w-5 rounded-full bg-pop-berry-400"
        />
        <div className="h-20 w-20 rounded-2xl bg-primary-700 text-paper-50 flex items-center justify-center shadow-elevated">
          <MealPrepIcon size={40} />
        </div>
      </motion.div>
      <div>
        <h1 className="text-display-lg font-display font-semibold text-paper-900">MealPrep</h1>
        <p className="text-body-lg text-paper-500 mt-3 max-w-[280px] mx-auto">
          La tua settimana in cucina, senza pensieri: ricette, piano pasti e lista della spesa in
          un unico posto.
        </p>
      </div>
    </div>
  );
}
