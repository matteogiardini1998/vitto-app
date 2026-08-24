import { CalendarDays, ShoppingBasket, BookOpen, UserRound, type LucideIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/cn";
import { MealPrepIcon } from "./MealPrepIcon";

const TABS_LEFT = [
  { to: "/meal-prep", label: "Piano Pasti", icon: CalendarDays },
  { to: "/ricettario", label: "Ricettario", icon: BookOpen },
];
const TABS_RIGHT = [
  { to: "/spesa", label: "Spesa", icon: ShoppingBasket },
  { to: "/profilo", label: "Profilo", icon: UserRound },
];

function TabItem({ to, label, icon: Icon }: { to: string; label: string; icon: LucideIcon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center gap-1 h-16 min-w-[44px] transition-colors",
          isActive ? "text-primary-700" : "text-paper-500 active:text-primary-600",
        )
      }
    >
      {({ isActive }) => (
        <>
          <motion.span
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 14 }}
            className="relative"
          >
            <Icon size={22} strokeWidth={isActive ? 2.4 : 1.9} />
          </motion.span>
          <span className={cn("text-caption", isActive && "font-semibold")}>{label}</span>
        </>
      )}
    </NavLink>
  );
}

export function TabBar() {
  const navigate = useNavigate();

  return (
    <nav
      className="relative z-30 bg-paper-0/95 backdrop-blur border-t border-paper-200 safe-bottom"
      aria-label="Navigazione principale"
    >
      <ul className="grid grid-cols-5 px-3">
        {TABS_LEFT.map((t) => (
          <li key={t.to}>
            <TabItem {...t} />
          </li>
        ))}

        <li className="relative flex flex-col items-center justify-end h-16 pb-1">
          <motion.button
            onClick={() => navigate("/meal-prep/genera")}
            whileTap={{ scale: 0.87, borderRadius: "38%" }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute -top-7 h-14 w-14 rounded-full bg-primary-700 text-paper-50 flex items-center justify-center border-[3px] border-paper-0"
            style={{ boxShadow: "0 6px 14px -4px rgb(34 28 22 / 0.32)" }}
            aria-label="Cosa si mangia questa settimana?"
          >
            <MealPrepIcon size={23} />
          </motion.button>
          <span className="mt-2.5 text-caption font-semibold text-primary-700 leading-none text-center">
            Cosa mangiamo?
          </span>
        </li>

        {TABS_RIGHT.map((t) => (
          <li key={t.to}>
            <TabItem {...t} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
