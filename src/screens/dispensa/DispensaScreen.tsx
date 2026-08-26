import { useEffect, useMemo, useRef, useState } from "react";
import { Archive, ChevronDown, Plus, Search, X } from "lucide-react";
import { EmptyState } from "../../components/EmptyState";
import { IconaDispensaGlyph } from "../../components/IconaDispensaGlyph";
import { ScaffaleChipRow } from "../../components/ScaffaleChipRow";
import { PAGE_ACCENT, PAGE_BLOB } from "../../components/WheelNav";
import { SCAN_BUTTON_CLEARANCE } from "../../components/barcode/BarcodeScanButton";
import { useDispensaStore } from "../../store/dispensaStore";
import { useToastStore } from "../../store/toastStore";
import { type Reparto, type VoceDispensa } from "../../types";
import { ORDINE_SCAFFALI, risolviCategoria, impareCategoria, indizioCategoria } from "../../lib/smistamento";
import { cn } from "../../lib/cn";
import { VoceDispensaCard } from "./components/VoceDispensaCard";
import { VoceDispensaSheet } from "./components/VoceDispensaSheet";
import { DispensaSelectorSheet } from "./components/DispensaSelectorSheet";
import { ModificaDispensaSheet } from "./components/ModificaDispensaSheet";

function labelReparto(categoria: Reparto): string {
  return ORDINE_SCAFFALI.find((r) => r.value === categoria)?.label ?? categoria;
}

export function DispensaScreen() {
  const dispense = useDispensaStore((s) => s.dispense);
  const dispensaAttivaId = useDispensaStore((s) => s.dispensaAttivaId);
  const aggiungiVoce = useDispensaStore((s) => s.aggiungiVoce);
  const showToast = useToastStore((s) => s.show);

  const dispensa = dispense.find((d) => d.id === dispensaAttivaId) ?? dispense[0];
  const altreDispense = dispense.filter((d) => d.id !== dispensa.id);

  const [ricerca, setRicerca] = useState("");
  const [nuovaVoceNome, setNuovaVoceNome] = useState("");
  const [nomeInAttesa, setNomeInAttesa] = useState<string | null>(null);
  const [scaffaleAttivo, setScaffaleAttivo] = useState<Reparto | null>(null);
  const [nomeScaffaleInput, setNomeScaffaleInput] = useState("");
  const [voceEvidenziataId, setVoceEvidenziataId] = useState<string | null>(null);
  const [voceAperta, setVoceAperta] = useState<VoceDispensa | null>(null);
  const [selectorAperto, setSelectorAperto] = useState(false);
  const [dispensaInModificaId, setDispensaInModificaId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const scaffaleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scaffaleAttivo) scaffaleInputRef.current?.focus();
  }, [scaffaleAttivo]);

  const query = ricerca.trim().toLowerCase();
  const vociFiltrate = useMemo(
    () => (query ? dispensa.voci.filter((v) => v.nome.toLowerCase().includes(query)) : dispensa.voci),
    [dispensa.voci, query],
  );

  const daFinirePresto = dispensa.voci.filter((v) => v.daConsumarePresto);

  const scaffali = useMemo(
    () =>
      ORDINE_SCAFFALI.map((r) => ({
        reparto: r,
        voci: vociFiltrate.filter((v) => v.categoria === r.value),
      })),
    [vociFiltrate],
  );
  const scaffaliDaMostrare = query ? scaffali.filter((s) => s.voci.length > 0) : scaffali;

  const evidenzia = (id: string) => {
    setVoceEvidenziataId(id);
    window.setTimeout(() => setVoceEvidenziataId((cur) => (cur === id ? null : cur)), 1400);
  };

  const handleAggiungi = () => {
    const nome = nuovaVoceNome.trim();
    if (!nome) return;
    const esito = risolviCategoria(nome);
    if (esito.trovato) {
      const id = aggiungiVoce(dispensa.id, { nome, categoria: esito.categoria });
      showToast(`Messo in ${labelReparto(esito.categoria)} ✓`);
      evidenzia(id);
      setNuovaVoceNome("");
      setNomeInAttesa(null);
      inputRef.current?.focus();
    } else {
      setNomeInAttesa(nome);
    }
  };

  const handleSceltaChip = (categoria: Reparto) => {
    if (!nomeInAttesa) return;
    const id = aggiungiVoce(dispensa.id, { nome: nomeInAttesa, categoria });
    impareCategoria(nomeInAttesa, categoria);
    showToast(`Messo in ${labelReparto(categoria)} ✓`);
    evidenzia(id);
    setNuovaVoceNome("");
    setNomeInAttesa(null);
    inputRef.current?.focus();
  };

  const handleAggiungiScaffale = (categoria: Reparto) => {
    const nome = nomeScaffaleInput.trim();
    if (!nome) return;
    const id = aggiungiVoce(dispensa.id, { nome, categoria });
    impareCategoria(nome, categoria);
    showToast(`Messo in ${labelReparto(categoria)} ✓`);
    evidenzia(id);
    setNomeScaffaleInput("");
    setScaffaleAttivo(null);
  };

  return (
    <div style={{ paddingBottom: SCAN_BUTTON_CLEARANCE + 32 }}>
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
        <div className="mx-4 mb-4 px-4 py-3 rounded-xl bg-accent-50 border border-accent-200 dark:bg-accent-900/40 dark:border-accent-800">
          <p className="text-body-sm text-accent-700 dark:text-accent-200">
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
            ref={inputRef}
            value={nuovaVoceNome}
            onChange={(e) => {
              setNuovaVoceNome(e.target.value);
              if (nomeInAttesa) setNomeInAttesa(null);
            }}
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

        {nomeInAttesa && (
          <div className="flex flex-col gap-1.5">
            <p className="text-caption text-paper-500 px-1">Dove lo metto?</p>
            <ScaffaleChipRow suggerito={indizioCategoria(nomeInAttesa)} onScegli={handleSceltaChip} />
          </div>
        )}
      </div>

      {dispensa.voci.length === 0 && !query ? (
        <EmptyState
          icon={Archive}
          blobColor={PAGE_BLOB[3]}
          title="Questa dispensa è vuota"
          description="Aggiungi quello che hai già in casa: la prossima lista della spesa ne terrà conto."
        />
      ) : query && scaffaliDaMostrare.length === 0 ? (
        <p className="px-4 text-body-sm text-paper-500 text-center mt-6">Nessuna voce trovata per "{ricerca}".</p>
      ) : (
        <div className="px-4 flex flex-col gap-6">
          {scaffaliDaMostrare.map(({ reparto, voci }) => (
            <div key={reparto.value}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-caption font-semibold text-paper-500 uppercase tracking-wide">
                  {reparto.label}
                </span>
                <span className="flex-1 h-px bg-paper-200" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setScaffaleAttivo(scaffaleAttivo === reparto.value ? null : reparto.value)}
                  aria-label={`Aggiungi a ${reparto.label}`}
                  className="h-6 w-6 shrink-0 rounded-full bg-paper-100 text-paper-500 flex items-center justify-center active:bg-paper-200"
                >
                  <Plus size={13} />
                </button>
              </div>

              {scaffaleAttivo === reparto.value && (
                <div className="flex items-center gap-2 mb-2.5">
                  <input
                    ref={scaffaleInputRef}
                    value={nomeScaffaleInput}
                    onChange={(e) => setNomeScaffaleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAggiungiScaffale(reparto.value);
                      }
                      if (e.key === "Escape") setScaffaleAttivo(null);
                    }}
                    placeholder={`Nuovo in ${reparto.label.toLowerCase()}...`}
                    className="flex-1 h-10 rounded-full border border-paper-200 bg-paper-0 px-3.5 text-body-sm text-paper-900 placeholder:text-paper-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                  <button
                    onClick={() => handleAggiungiScaffale(reparto.value)}
                    disabled={!nomeScaffaleInput.trim()}
                    aria-label="Aggiungi"
                    className="h-9 w-9 shrink-0 rounded-full bg-primary-700 text-paper-50 flex items-center justify-center active:bg-primary-800 disabled:opacity-40"
                  >
                    <Plus size={17} />
                  </button>
                  <button
                    onClick={() => setScaffaleAttivo(null)}
                    aria-label="Annulla"
                    className="h-9 w-9 shrink-0 rounded-full bg-paper-100 text-paper-500 flex items-center justify-center active:bg-paper-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {voci.length === 0 ? (
                <button
                  type="button"
                  onClick={() => setScaffaleAttivo(reparto.value)}
                  className="w-full text-left text-body-sm text-paper-400 italic px-1 py-2"
                >
                  ripiano vuoto — aggiungi qui
                </button>
              ) : (
                <div className="grid grid-cols-3 gap-2.5">
                  {voci.map((voce) => (
                    <VoceDispensaCard
                      key={voce.id}
                      voce={voce}
                      evidenziata={voce.id === voceEvidenziataId}
                      onTap={() => setVoceAperta(voce)}
                    />
                  ))}
                </div>
              )}
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
