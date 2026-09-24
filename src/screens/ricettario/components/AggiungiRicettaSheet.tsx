import { useNavigate } from "react-router-dom";
import { Link2, ClipboardPaste, PenLine } from "lucide-react";
import { BottomSheet } from "../../../components/BottomSheet";

type AggiungiRicettaSheetProps = {
  open: boolean;
  onClose: () => void;
};

const OPZIONI = [
  { to: "/ricettario/importa/link", icon: Link2, label: "Incolla link", descrizione: "Da un sito, TikTok, Instagram o YouTube" },
  { to: "/ricettario/importa/testo", icon: ClipboardPaste, label: "Incolla testo", descrizione: "Da una foto (con Testo Attivo / Google Lens), un libro, un messaggio" },
  { to: "/ricettario/nuova", icon: PenLine, label: "Scrivi a mano", descrizione: "Parti da zero" },
] as const;

export function AggiungiRicettaSheet({ open, onClose }: AggiungiRicettaSheetProps) {
  const navigate = useNavigate();

  return (
    <BottomSheet open={open} onClose={onClose} title="Aggiungi ricetta">
      <div className="flex flex-col gap-2.5 pb-2">
        {OPZIONI.map((o) => (
          <button
            key={o.to}
            onClick={() => {
              onClose();
              navigate(o.to);
            }}
            className="flex items-center gap-3.5 rounded-xl border border-paper-200 bg-paper-0 p-4 text-left active:bg-paper-100"
          >
            <div className="h-11 w-11 shrink-0 rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 flex items-center justify-center">
              <o.icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-body-lg font-semibold text-paper-900">{o.label}</p>
              <p className="text-body-sm text-paper-500">{o.descrizione}</p>
            </div>
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}
