import { create } from "zustand";
import { generaId } from "../lib/id";

export type ToastKind = "success" | "info" | "error";

type ToastItem = {
  id: string;
  message: string;
  kind: ToastKind;
};

type ToastState = {
  toasts: ToastItem[];
  show: (message: string, kind?: ToastKind) => void;
  dismiss: (id: string) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: (message, kind = "success") => {
    const id = generaId();
    set((s) => ({ toasts: [...s.toasts, { id, message, kind }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 2400);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
