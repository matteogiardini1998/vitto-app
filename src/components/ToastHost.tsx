import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { createPortal } from "react-dom";
import { useToastStore } from "../store/toastStore";
import { cn } from "../lib/cn";

const ICONS = {
  success: CheckCircle2,
  info: Info,
  error: XCircle,
};

export function ToastHost() {
  const toasts = useToastStore((s) => s.toasts);

  return createPortal(
    <div className="fixed inset-x-0 bottom-20 z-[60] flex flex-col items-center gap-2 px-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICONS[t.kind];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "flex items-center gap-2 max-w-[90%] px-4 py-2.5 rounded-full shadow-elevated text-body-sm font-medium",
                t.kind === "success" && "bg-primary-800 text-paper-50",
                t.kind === "info" && "bg-paper-900 text-paper-50",
                t.kind === "error" && "bg-danger-500 text-paper-50",
              )}
            >
              <Icon size={16} />
              {t.message}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
