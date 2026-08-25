import { useMemo, useState } from "react";
import { Archive, ChevronDown, Plus, Search } from "lucide-react";
import { EmptyState } from "../../components/EmptyState";
import { IconaDispensaGlyph } from "../../components/IconaDispensaGlyph";
import { PAGE_ACCENT, PAGE_BLOB } from "../../components/WheelNav";
import { useDispensaStore } from "../../store/dispensaStore";
import { REPARTI, type VoceDispensa } from "../../types";
import { cn } from "../../lib/cn";
import { VoceDispensaCard } from "./components/VoceDispensaCard";
import { VoceDispensaSheet } from "./components/VoceDispensaSheet";
import { DispensaSelectorSheet } from "./components/DispensaSelectorSheet";
import { ModificaDispensaSheet } from "./components/ModificaDispensaSheet";

export function DispensaScreen() {
  const dispense = useDispensaStore((s) => s.dispense);
  const dispensaAttivaId = useDispensaStore((s) => s.dispensaAttivaId);
  const aggiungiVoce = useDispensaStore((s) => s.aggiungiVoce);

  const dispensa = dispense.find((d) => d.id === dispensaAttivaId) ?? dispense[0];
  const altreDispense = dispense.filter((d) => d.id !== dispensa.id);

  const [ricerca, setRicerca] = useState("");
  const [nuovaVoceNome, setNuovaVoceNome] = useState("");
  const [voceAperta, setVoceAperta] = useState<VoceDispensa | null>(null);
  const [selectorAperto, setSelectorAperto] = useState(false);
  const [dispensaInModificaId, setDispensaInModificaId] = useState<string | null>(null);

  const query = ricerca.trim().toLowerCase();
  const vociFiltrate = useMemo(
    () => (query ? dispensa.voci.filter((v) => v.nome.toLowerCase().includes(query)) : dispensa.voci),
    [dispensa.voci, query],
  );

  const daFinirePresto = dispensa.voci.filter((v) => v.daConsumarePresto);

  const scaffali = useMemo(
    () =>
      REPARTI.map((r) => ({
        reparto: r,
        voci: vociFiltrate.filter((v) => v.categoria === r.value),
      })).filter((s) => s.voci.length > 0),
    [vociFiltrate],
  );

  const handleAggiungi = () => {
    const nome = nuovaVoceNome.trim();
    if (!nome) return;
    aggiungiVoce(dispensa.id, { nome });
    setNuovaVoceNome("");
  };

  return (
    <div className="pb-8">
      <header className="relative px-14 pt-7 pb-5 text-center">
        <button
          type="button"
          onClick={() => setSelectorAperto(true)}
          className="inline-flex items-center gap-2 mx-auto"
        >
          <span className="h-9 w-9 rounded-full bg-primary-700 text-paper-50 flex items-center justify-center shrink-0">
            <IconaDispensaGlyph icona={dispensa.icona} size={17} />
          </span>
          <h1 className="text-display-md font-display font-bold text-paper-900">{dispensa.nome}</h1>
          <ChevronDown size={20} className="text-paper-400 shrink-0" />
        </button>
        <p className="text-body-sm text-paper-500 mt-1">Quello che hai già in casa</p>
        <span className={cn("block mx-auto mt-2.5 h-1 w-8 rounded-full", PAGE_ACCENT[3])} />
      </header>

      {daFinirePresto.length > 0 && (
        <div className="mx-4 mb-4 px-4 py-3 rounded-xl bg-accent-50 border border-accent-200">
          <p className="text-body-sm text-accent-700">
            <span className="font-semibold">Da finire presto:</span>{" "}
            {daFinirePresto.map((v) => v.nome).join(", ")}
          </p>
        </div>
      )}

      <div className="px-4 flex flex-col gap-3 mb-5">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-paper-400" />
          <input
            value={ricerca}
            onChange={(e) => setRicerca(e.target.value)}
            placeholder="Cerca nella dispensa..."
            className="w-full h-11 rounded-full border border-paper-200 bg-paper-0 pl-10 pr-4 text-body-md text-paper-900 placeholder:text-paper-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            value={nuovaVoceNome}
            onChange={(e) => setNuovaVoceNome(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAggiungi();
              }
            }}
            placeholder="Aggiungi quello che hai in casa..."
            className="flex-1 h-11 rounded-full border border-paper-200 bg-paper-0 px-4 text-body-md text-paper-900 placeholder:text-paper-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
          <button
            onClick={handleAggiungi}
            disabled={!nuovaVoceNome.trim()}
            aria-label="Aggiungi alla dispensa"
            className="h-11 w-11 shrink-0 rounded-full bg-primary-700 text-paper-50 flex items-center justify-center active:bg-primary-800 disabled:opacity-40"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {dispensa.voci.length === 0 ? (
        <EmptyState
          icon={Archive}
          blobColor={PAGE_BLOB[3]}
          title="Questa dispensa è vuota"
          description="Aggiungi quello che hai già in casa: la prossima lista della spesa ne terrà conto."
        />
      ) : scaffali.length === 0 ? (
        <p className="px-4 text-body-sm text-paper-500 text-center mt-6">Nessuna voce trovata per "{ricerca}".</p>
      ) : (
        <div className="px-4 flex flex-col gap-6">
          {scaffali.map(({ reparto, voci }) => (
            <div key={reparto.value}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-caption font-semibold text-paper-500 uppercase tracking-wide">
                  {reparto.label}
                </span>
                <span className="flex-1 h-px bg-paper-200" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {voci.map((voce) => (
                  <VoceDispensaCard key={voce.id} voce={voce} onTap={() => setVoceAperta(voce)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <VoceDispensaSheet
        open={voceAperta != null}
        onClose={() => setVoceAperta(null)}
        dispensaId={dispensa.id}
        voce={voceAperta}
        altreDispense={altreDispense}
      />
      <DispensaSelectorSheet
        open={selectorAperto}
        onClose={() => setSelectorAperto(false)}
        onModifica={(id) => {
          setSelectorAperto(false);
          setDispensaInModificaId(id);
        }}
      />
      <ModificaDispensaSheet dispensaId={dispensaInModificaId} onClose={() => setDispensaInModificaId(null)} />
    </div>
  );
}
