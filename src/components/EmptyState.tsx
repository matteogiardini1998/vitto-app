import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  /** Classe bg-* della macchia dietro l'icona: di norma il colore della pagina in ruota. */
  blobColor?: string;
};

export function EmptyState({ icon: Icon, title, description, action, blobColor = "bg-pop-yellow-300" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, -4, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-20 w-20 mb-5 flex items-center justify-center"
      >
        <div
          className={cn("absolute inset-0", blobColor)}
          style={{ borderRadius: "62% 38% 55% 45% / 48% 45% 55% 52%" }}
        />
        <div className="relative h-16 w-16 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-300 flex items-center justify-center">
          <Icon size={28} strokeWidth={1.6} />
        </div>
      </motion.div>
      <h3 className="text-title-md font-display font-semibold text-paper-900 mb-1">{title}</h3>
      {description && (
        <p className="text-body-sm text-paper-500 max-w-[280px] mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}
