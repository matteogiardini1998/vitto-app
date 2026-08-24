import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Plus, Trash2, GripVertical } from "lucide-react";
import { useRecipeStore, RICETTA_VUOTA } from "../../store/recipeStore";
import { useToastStore } from "../../store/toastStore";
import { TextField } from "../../components/TextField";
import { Stepper } from "../../components/Stepper";
import { Chip } from "../../components/Chip";
import { TagInput } from "../../components/TagInput";
import { Button } from "../../components/Button";
import { REPARTI, PASTI, type Ingrediente, type Pasto, type Ricetta, type DietaRicetta } from "../../types";
import { DIETA_RICETTA_LABEL, PASTO_LABEL } from "../../lib/recipeDisplay";

type FormState = Omit<Ricetta, "id">;

function nuovoIngrediente(): Ingrediente {
  return { nome: "", qta: null, unita: "", reparto: "altro" };
}

export function RicettaFormScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ricettaEsistente = useRecipeStore((s) => (id ? s.ricette.find((r) => r.id === id) : undefined));
  const addRicetta = useRecipeStore((s) => s.addRicetta);
  const updateRicetta = useRecipeStore((s) => s.updateRicetta);
  const showToast = useToastStore((s) => s.show);

  const isEdit = Boolean(id && ricettaEsistente);

  const [form, setForm] = useState<FormState>(() => {
    if (ricettaEsistente) {
      const { id: _omit, ...resto } = ricettaEsistente;
      return resto;
    }
    return { ...RICETTA_VUOTA };
  });

  const patch = (p: Partial<FormState>) => setForm((f) => ({ ...f, ...p }));

  const togglePasto = (p: Pasto) => {
    patch({ pasto: form.pasto.includes(p) ? form.pasto.filter((x) => x !== p) : [...form.pasto, p] });
  };

  const updateIngrediente = (i: number, ing: Partial<Ingrediente>) => {
    const ingredienti = form.ingredienti.map((x, idx) => (idx === i ? { ...x, ...ing } : x));
    patch({ ingredienti });
  };

  const rimuoviIngrediente = (i: number) => {
    patch({ ingredienti: form.ingredienti.filter((_, idx) => idx !== i) });
  };

  const updatePasso = (i: number, testo: string) => {
    patch({ passi: form.passi.map((p, idx) => (idx === i ? testo : p)) });
  };

  const rimuoviPasso = (i: number) => {
    patch({ passi: form.passi.filter((_, idx) => idx !== i) });
  };

  const puoSalvare = form.nome.trim().length > 0 && form.ingredienti.length > 0;

  const salva = () => {
    const pulita: FormState = {
      ...form,
      ingredienti: form.ingredienti.filter((i) => i.nome.trim().length > 0),
      passi: form.passi.filter((p) => p.trim().length > 0),
    };
    const messaggioSalvataggio = isEdit ? "Ricetta aggiornata" : "Ricetta creata";
    const messaggio =
      pulita.passi.length === 0 ? `${messaggioSalvataggio} — aggiungi i passi quando vuoi` : messaggioSalvataggio;
    if (isEdit && id) {
      updateRicetta(id, pulita);
      showToast(messaggio, pulita.passi.length === 0 ? "info" : "success");
      navigate(`/ricettario/${id}`, { replace: true });
    } else {
      const nuovoId = addRicetta(pulita);
      showToast(messaggio, pulita.passi.length === 0 ? "info" : "success");
      navigate(`/ricettario/${nuovoId}`, { replace: true });
    }
  };

  return (
    <div className="pb-10">
      <div className="safe-top px-4 pt-5 pb-3 flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          aria-label="Indietro"
          className="h-10 w-10 flex items-center justify-center rounded-full text-paper-600 active:bg-paper-100"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-title-lg font-display font-semibold text-paper-900">
          {isEdit ? "Modifica ricetta" : "Nuova ricetta"}
        </h1>
      </div>

      <div className="px-5 flex flex-col gap-6">
        <TextField label="Nome della ricetta" value={form.nome} onChange={(e) => patch({ nome: e.target.value })} placeholder="Es. Risotto ai funghi" />
        <TextField
          label="Descrizione (una riga)"
          value={form.descrizione}
          onChange={(e) => patch({ descrizione: e.target.value })}
          placeholder="Una riga in tono da menù"
        />

        <div className="flex justify-center">
          <Stepper value={form.porzioniBase} min={1} max={12} label="porzioni base" onChange={(porzioniBase) => patch({ porzioniBase })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Tempo (minuti)"
            type="number"
            inputMode="numeric"
            value={form.tempoMin || ""}
            onChange={(e) => patch({ tempoMin: Number(e.target.value) || 0 })}
          />
          <TextField
            label="Costo a porzione (€)"
            type="number"
            inputMode="decimal"
            step="0.10"
            value={form.costoStimatoPorzione || ""}
            onChange={(e) => patch({ costoStimatoPorzione: Number(e.target.value) || 0 })}
          />
        </div>

        <div>
          <span className="text-body-sm font-medium text-paper-600 block mb-2">Pasto</span>
          <div className="flex flex-wrap gap-2">
            {PASTI.map((p) => (
              <Chip key={p} selected={form.pasto.includes(p)} onClick={() => togglePasto(p)}>
                {PASTO_LABEL[p]}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <span className="text-body-sm font-medium text-paper-600 block mb-2">Stile</span>
          <div className="flex flex-wrap gap-2">
            {(["veloce", "ricercata"] as const).map((s) => (
              <Chip key={s} selected={form.stile === s} onClick={() => patch({ stile: s })}>
                {s === "veloce" ? "Veloce" : "Ricercata"}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <span className="text-body-sm font-medium text-paper-600 block mb-2">Dieta</span>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(DIETA_RICETTA_LABEL) as DietaRicetta[]).map((d) => (
              <Chip key={d} selected={form.dieta === d} onClick={() => patch({ dieta: d })}>
                {DIETA_RICETTA_LABEL[d]}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <span className="text-body-sm font-medium text-paper-600 block mb-2">Tag</span>
          <TagInput value={form.tags} onChange={(tags) => patch({ tags })} placeholder="Es. leggera, comfort..." />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-body-sm font-medium text-paper-600">Ingredienti</span>
            <button
              onClick={() => patch({ ingredienti: [...form.ingredienti, nuovoIngrediente()] })}
              className="text-body-sm font-semibold text-primary-700 flex items-center gap-1"
            >
              <Plus size={16} /> Aggiungi
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {form.ingredienti.map((ing, i) => (
              <div key={i} className="flex items-center gap-2 bg-paper-0 border border-paper-200 rounded-md p-2">
                <input
                  value={ing.nome}
                  onChange={(e) => updateIngrediente(i, { nome: e.target.value })}
                  placeholder="Ingrediente"
                  className="flex-[2] min-w-0 h-9 px-2 text-body-sm bg-transparent focus:outline-none"
                />
                <input
                  value={ing.qta ?? ""}
                  onChange={(e) => updateIngrediente(i, { qta: e.target.value === "" ? null : Number(e.target.value) })}
                  placeholder="Qta"
                  type="number"
                  className="w-14 h-9 px-1 text-body-sm bg-transparent focus:outline-none"
                />
                <input
                  value={ing.unita}
                  onChange={(e) => updateIngrediente(i, { unita: e.target.value })}
                  placeholder="Unità"
                  className="w-16 h-9 px-1 text-body-sm bg-transparent focus:outline-none"
                />
                <select
                  value={ing.reparto}
                  onChange={(e) => updateIngrediente(i, { reparto: e.target.value as Ingrediente["reparto"] })}
                  className="h-9 text-caption bg-paper-100 rounded-sm px-1 shrink-0 max-w-[86px]"
                >
                  {REPARTI.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <button onClick={() => rimuoviIngrediente(i)} aria-label="Rimuovi ingrediente" className="text-paper-400 shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {form.ingredienti.length === 0 && (
              <p className="text-body-sm text-paper-400 py-2">Nessun ingrediente aggiunto.</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-body-sm font-medium text-paper-600">Passi (facoltativo)</span>
            <button
              onClick={() => patch({ passi: [...form.passi, ""] })}
              className="text-body-sm font-semibold text-primary-700 flex items-center gap-1"
            >
              <Plus size={16} /> Aggiungi
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {form.passi.map((passo, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="h-9 w-7 shrink-0 flex items-center justify-center text-paper-400">
                  <GripVertical size={16} />
                </span>
                <textarea
                  value={passo}
                  onChange={(e) => updatePasso(i, e.target.value)}
                  placeholder={`Passo ${i + 1}`}
                  rows={2}
                  className="flex-1 rounded-md border border-paper-200 bg-paper-0 p-2 text-body-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                <button onClick={() => rimuoviPasso(i)} aria-label="Rimuovi passo" className="text-paper-400 mt-2">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {form.passi.length === 0 && <p className="text-body-sm text-paper-400 py-2">Nessun passo aggiunto.</p>}
          </div>
        </div>

        <Button fullWidth size="lg" disabled={!puoSalvare} onClick={salva}>
          {isEdit ? "Salva modifiche" : "Crea ricetta"}
        </Button>
      </div>
    </div>
  );
}
