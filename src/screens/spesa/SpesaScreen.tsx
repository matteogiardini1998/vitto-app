import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, ShoppingBasket, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { PAGE_ACCENT, PAGE_BLOB } from "../../components/WheelNav";
import { EmptyState } from "../../components/EmptyState";
import { Card } from "../../components/Card";
import { useShoppingStore } from "../../store/shoppingStore";
import { useToastStore } from "../../store/toastStore";
import { REPARTI, type VoceSpesa } from "../../types";
import { VoceRow } from "./components/VoceRow";
import { UsataDaSheet } from "./components/UsataDaSheet";
import { EditVoceSheet } from "./components/EditVoceSheet";
import { PerPastoView } from "./components/PerPastoView";
import { cn } from "../../lib/cn";

type Vista = "reparto" | "pasto";

export function SpesaScreen() {
  const voci = useShoppingStore((s) => s.voci);
  const aggiungiManuale = useShoppingStore((s) => s.aggiungiManuale);
  const azzeraSpunte = useShoppingStore((s) => s.azzeraSpunte);
  const svuotaTutto = useShoppingStore((s) => s.svuotaTutto);
  const showToast = useToastStore((s) => s.show);

  const [nuovaVoce, setNuovaVoce] = useState("");
  const [voceUsataDa, setVoceUsataDa] = useState<VoceSpesa | null>(null);
  const [voceModifica, setVoceModifica] = useState<VoceSpesa | null>(null);
  const [vista, setVista] = useState<Vista>("reparto");
  const [confermaSvuota, setConfermaSvuota] = useState(false);

  const prese = voci.filter((v) => v.presa).length;
  const completata = voci.length > 0 && prese === voci.length;
  const eraCompletataRef = useRef(completata);

  useEffect(() => {
    if (completata && !eraCompletataRef.current) {
      showToast("Fatto! Spesa completata 🎉");
    }
    eraCompletataRef.current = completata;
  }, [completata, showToast]);

  const handleSvuota = () => {
    if (!confermaSvuota) {
      setConfermaSvuota(true);
      return;
    }
    svuotaTutto();
    setConfermaSvuota(false);
    showToast("Lista svuotata");
  };

  const gruppi = useMemo(() => {
    return REPARTI.map((r) => ({
      reparto: r,
      voci: voci
        .filter((v) => v.reparto === r.value)
        .sort((a, b) => Number(a.presa) - Number(b.presa)),
    })).filter((g) => g.voci.length > 0);
  }, [voci]);

  const handleAggiungi = () => {
    const nome = nuovaVoce.trim();
    if (!nome) return;
    aggiungiManuale(nome);
    setNuovaVoce("");
  };

  const handleTapTesto = (voce: VoceSpesa) => {
    if (voce.manuale) setVoceModifica(voce);
    else if (voce.usataDa?.length) setVoceUsataDa(voce);
  };

  return (
    <div className="pb-8">
      <PageHeader title="Lista della spesa" accent={PAGE_ACCENT[2]} />

      <div className="px-4 flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            value={nuovaVoce}
            onChange={(e) => setNuovaVoce(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAggiungi();
              }
            }}
            placeholder="Aggiungi un articolo..."
            className="flex-1 h-11 rounded-full border border-paper-200 bg-paper-0 px-4 text-body-md text-paper-900 placeholder:text-paper-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
          <button
            onClick={handleAggiungi}
            disabled={!nuovaVoce.trim()}
            aria-label="Aggiungi"
            className="h-11 w-11 shrink-0 rounded-full bg-primary-700 text-paper-50 flex items-center justify-center active:bg-primary-800 disabled:opacity-40"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex p-0.5 rounded-full bg-paper-100 shrink-0">
            <button
              onClick={() => setVista("reparto")}
              className={cn(
                "px-3 h-8 rounded-full text-body-sm font-medium transition-colors",
                vista === "reparto" ? "bg-paper-0 text-primary-800 shadow-card" : "text-paper-500",
              )}
            >
              Per reparto
            </button>
            <button
              onClick={() => setVista("pasto")}
              className={cn(
                "px-3 h-8 rounded-full text-body-sm font-medium transition-colors",
                vista === "pasto" ? "bg-paper-0 text-primary-800 shadow-card" : "text-paper-500",
              )}
            >
              Per pasto
            </button>
          </div>
          {voci.length > 0 && (
            <span className="text-body-sm text-paper-500 truncate">
              {prese} di {voci.length} prese
            </span>
          )}
        </div>
        {prese > 0 && (
          <button
            onClick={azzeraSpunte}
            className="self-end -mt-2 flex items-center gap-1.5 text-body-sm font-semibold text-primary-700"
          >
            <RotateCcw size={14} /> Azzera spunte
          </button>
        )}
      </div>

      {vista === "pasto" ? (
        <PerPastoView />
      ) : voci.length === 0 ? (
        <EmptyState
          icon={ShoppingBasket}
          blobColor={PAGE_BLOB[2]}
          title="Nessuna voce ancora"
          description="Aggiorna la lista dal piano pasti o aggiungi una voce manuale per iniziare."
        />
      ) : (
        <div className="px-4 flex flex-col gap-5 mt-5">
          {gruppi.map(({ reparto, voci: vociReparto }) => (
            <div key={reparto.value}>
              <h3 className="text-body-sm font-semibold text-paper-500 uppercase tracking-wide px-1 mb-1.5">
                {reparto.label}
              </h3>
              <Card padded={false} className="divide-y divide-paper-100 overflow-hidden">
                {vociReparto.map((voce) => (
                  <VoceRow key={voce.id} voce={voce} onTapTesto={() => handleTapTesto(voce)} />
                ))}
              </Card>
            </div>
          ))}
        </div>
      )}

      {voci.length > 0 && (
        <div className="px-4 mt-6">
          <button
            onClick={handleSvuota}
            className={cn(
              "w-full flex items-center justify-center gap-2 h-12 rounded-xl text-body-md font-semibold transition-colors",
              confermaSvuota
                ? "bg-danger-500 text-paper-50"
                : "bg-danger-500/10 text-danger-500 active:bg-danger-500/15",
            )}
          >
            <Trash2 size={17} />
            {confermaSvuota ? "Tocca di nuovo per confermare" : "Svuota spesa"}
          </button>
        </div>
      )}

      <UsataDaSheet open={Boolean(voceUsataDa)} onClose={() => setVoceUsataDa(null)} voce={voceUsataDa} />
      <EditVoceSheet open={Boolean(voceModifica)} onClose={() => setVoceModifica(null)} voce={voceModifica} />
    </div>
  );
}
