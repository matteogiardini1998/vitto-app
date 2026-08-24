import { useRef, useState } from "react";
import {
  UserRound,
  Users,
  Clock3,
  Salad,
  ShieldAlert,
  ThumbsDown,
  Store,
  Moon,
  Download,
  Upload,
  Trash2,
} from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { SettingsSection } from "../../components/SettingsSection";
import { SettingsRow } from "../../components/SettingsRow";
import { Switch } from "../../components/Switch";
import { BottomSheet } from "../../components/BottomSheet";
import { Button } from "../../components/Button";
import { useProfileStore } from "../../store/profileStore";
import { useUiStore } from "../../store/uiStore";
import { useToastStore } from "../../store/toastStore";
import type { Profilo } from "../../types";
import { AnagraficaStep } from "../onboarding/steps/AnagraficaStep";
import { NucleoStep } from "../onboarding/steps/NucleoStep";
import { TempoStep } from "../onboarding/steps/TempoStep";
import { DietaStep } from "../onboarding/steps/DietaStep";
import { EsclusioniStep } from "../onboarding/steps/EsclusioniStep";
import { PreferenzeStep } from "../onboarding/steps/PreferenzeStep";
import { SupermercatoStep } from "../onboarding/steps/SupermercatoStep";
import { downloadBackup, importBackupFromFile, resetAllData } from "../../lib/backup";

type Sezione =
  | "anagrafica"
  | "nucleo"
  | "tempo"
  | "dieta"
  | "esclusioni"
  | "preferenze"
  | "supermercato"
  | null;

const TITOLI: Record<Exclude<Sezione, null>, string> = {
  anagrafica: "Dati personali",
  nucleo: "Il tuo nucleo",
  tempo: "Tempo in cucina",
  dieta: "La tua dieta",
  esclusioni: "Allergie e intolleranze",
  preferenze: "Preferenze",
  supermercato: "Supermercato abituale",
};

const TIPO_LABEL: Record<Profilo["nucleo"]["tipo"], string> = {
  single: "Solo per me",
  coppia: "Coppia",
  "famiglia-bambini": "Famiglia con bambini piccoli",
  "famiglia-adulta": "Famiglia adulta",
  coinquilini: "Coinquilini",
};

const DIETA_LABEL: Record<Profilo["dieta"], string> = {
  onnivora: "Onnivora",
  vegetariana: "Vegetariana",
  vegana: "Vegana",
  pescetariana: "Pescetariana",
  fruttariana: "Fruttariana",
  crudista: "Crudista",
};

export function ProfiloScreen() {
  const profilo = useProfileStore((s) => s.profilo);
  const updateProfilo = useProfileStore((s) => s.updateProfilo);
  const resetProfilo = useProfileStore((s) => s.resetProfilo);
  const tema = useUiStore((s) => s.tema);
  const setTema = useUiStore((s) => s.setTema);
  const showToast = useToastStore((s) => s.show);

  const [editing, setEditing] = useState<Sezione>(null);
  const [draft, setDraft] = useState<Profilo>(profilo);
  const [confermaReset, setConfermaReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openSheet = (sezione: Exclude<Sezione, null>) => {
    setDraft(profilo);
    setEditing(sezione);
    setConfermaReset(false);
  };

  const salva = () => {
    updateProfilo(draft);
    setEditing(null);
    showToast("Preferenze aggiornate");
  };

  const handleExport = () => {
    downloadBackup();
    showToast("Backup scaricato");
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      await importBackupFromFile(file);
      showToast("Backup importato, ricarico l'app…");
      setTimeout(() => window.location.reload(), 700);
    } catch {
      showToast("File di backup non valido", "error");
    }
  };

  const handleReset = () => {
    if (!confermaReset) {
      setConfermaReset(true);
      return;
    }
    resetAllData();
    resetProfilo();
    window.location.reload();
  };

  return (
    <div className="pb-8">
      <PageHeader title="Profilo" />

      <div className="px-4">
        <SettingsSection title="Dati personali">
          <SettingsRow
            label={`${profilo.nome} ${profilo.cognome}`.trim() || "Nome non impostato"}
            value={`${profilo.eta} anni${profilo.residenza ? ` · ${profilo.residenza}` : ""}`}
            icon={<UserRound size={20} className="text-primary-600" />}
            onClick={() => openSheet("anagrafica")}
          />
        </SettingsSection>

        <SettingsSection title="Cucina">
          <SettingsRow
            label="Nucleo"
            value={`${profilo.nucleo.persone} ${profilo.nucleo.persone === 1 ? "persona" : "persone"} · ${TIPO_LABEL[profilo.nucleo.tipo]}`}
            icon={<Users size={20} className="text-primary-600" />}
            onClick={() => openSheet("nucleo")}
          />
          <SettingsRow
            label="Tempo in cucina"
            value={`Fino a ${profilo.tempoMaxCucina} minuti`}
            icon={<Clock3 size={20} className="text-primary-600" />}
            onClick={() => openSheet("tempo")}
          />
          <SettingsRow
            label="Dieta"
            value={DIETA_LABEL[profilo.dieta]}
            icon={<Salad size={20} className="text-primary-600" />}
            onClick={() => openSheet("dieta")}
          />
        </SettingsSection>

        <SettingsSection title="Esigenze alimentari">
          <SettingsRow
            label="Allergie e intolleranze"
            value={profilo.esclusioniAssolute.length ? profilo.esclusioniAssolute.join(", ") : "Nessuna"}
            icon={<ShieldAlert size={20} className="text-primary-600" />}
            onClick={() => openSheet("esclusioni")}
          />
          <SettingsRow
            label="Preferenze"
            value={profilo.preferenzeNegative.length ? profilo.preferenzeNegative.join(", ") : "Nessuna"}
            icon={<ThumbsDown size={20} className="text-primary-600" />}
            onClick={() => openSheet("preferenze")}
          />
        </SettingsSection>

        <SettingsSection title="Spesa">
          <SettingsRow
            label="Supermercato abituale"
            value={profilo.supermercatoPreferito || "Non impostato"}
            icon={<Store size={20} className="text-primary-600" />}
            onClick={() => openSheet("supermercato")}
          />
        </SettingsSection>

        <SettingsSection title="App">
          <div className="flex items-center gap-3 px-4 py-3.5">
            <Moon size={20} className="text-primary-600" />
            <span className="flex-1 text-body-lg font-medium text-paper-900">Tema scuro</span>
            <Switch
              checked={tema === "scuro"}
              onChange={(checked) => setTema(checked ? "scuro" : "chiaro")}
              label="Tema scuro"
            />
          </div>
          <SettingsRow
            label="Esporta backup"
            value="Salva tutti i tuoi dati in un file JSON"
            icon={<Download size={20} className="text-primary-600" />}
            onClick={handleExport}
          />
          <SettingsRow
            label="Importa backup"
            value="Ripristina i dati da un file JSON"
            icon={<Upload size={20} className="text-primary-600" />}
            onClick={handleImportClick}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImportFile}
          />
          <SettingsRow
            label={confermaReset ? "Tocca di nuovo per confermare" : "Reset dati"}
            value={confermaReset ? "Questa azione è irreversibile" : "Cancella tutti i dati dell'app"}
            icon={<Trash2 size={20} className="text-danger-500" />}
            onClick={handleReset}
            danger
          />
        </SettingsSection>
      </div>

      <BottomSheet open={editing !== null} onClose={() => setEditing(null)} title={editing ? TITOLI[editing] : ""}>
        {editing === "anagrafica" && <AnagraficaStep draft={draft} onChange={(p) => setDraft((d) => ({ ...d, ...p }))} />}
        {editing === "nucleo" && <NucleoStep draft={draft} onChange={(p) => setDraft((d) => ({ ...d, ...p }))} />}
        {editing === "tempo" && <TempoStep draft={draft} onChange={(p) => setDraft((d) => ({ ...d, ...p }))} />}
        {editing === "dieta" && <DietaStep draft={draft} onChange={(p) => setDraft((d) => ({ ...d, ...p }))} />}
        {editing === "esclusioni" && <EsclusioniStep draft={draft} onChange={(p) => setDraft((d) => ({ ...d, ...p }))} />}
        {editing === "preferenze" && <PreferenzeStep draft={draft} onChange={(p) => setDraft((d) => ({ ...d, ...p }))} />}
        {editing === "supermercato" && <SupermercatoStep draft={draft} onChange={(p) => setDraft((d) => ({ ...d, ...p }))} />}
        {editing && (
          <div className="pt-5">
            <Button fullWidth size="lg" onClick={salva}>
              Salva
            </Button>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
