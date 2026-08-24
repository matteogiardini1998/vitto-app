import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div
            className="absolute inset-0 bg-paper-950/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-[440px] max-h-[85dvh] bg-paper-0 rounded-t-2xl shadow-sheet flex flex-col safe-bottom"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 340, mass: 0.9 }}
          >
            <div className="flex items-center justify-center pt-2.5 pb-1 shrink-0">
              <div className="h-1.5 w-10 rounded-full bg-paper-300" />
            </div>
            {title && (
              <div className="flex items-center justify-between px-5 pb-3 shrink-0">
                <h2 className="text-title-lg font-display font-semibold text-paper-900">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Chiudi"
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-paper-100 text-paper-600 active:bg-paper-200"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            <div className="overflow-y-auto px-5 pb-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
