import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
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
  Info,
  Camera,
} from "lucide-react";
import { SettingsSection } from "../../components/SettingsSection";
import { SettingsRow } from "../../components/SettingsRow";
import { Switch } from "../../components/Switch";
import { BottomSheet } from "../../components/BottomSheet";
import { Button } from "../../components/Button";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import { AVATAR_OPZIONI, AvatarGlyph } from "../../components/AvatarGlyph";
import { useProfileStore } from "../../store/profileStore";
import { useUiStore } from "../../store/uiStore";
import { useToastStore } from "../../store/toastStore";
import type { Profilo } from "../../types";
import { cn } from "../../lib/cn";
import { AnagraficaStep } from "../onboarding/steps/AnagraficaStep";
import { NucleoStep } from "../onboarding/steps/NucleoStep";
import { TempoStep } from "../onboarding/steps/TempoStep";
import { DietaStep } from "../onboarding/steps/DietaStep";
import { EsclusioniStep } from "../onboarding/steps/EsclusioniStep";
import { PreferenzeStep } from "../onboarding/steps/PreferenzeStep";
import { SupermercatoStep } from "../onboarding/steps/SupermercatoStep";
import { downloadBackup, importBackupFromFile, resetAllData } from "../../lib/backup";
import { elaboraFotoAvatar } from "../../lib/avatarPhoto";

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
  const navigate = useNavigate();
  const profilo = useProfileStore((s) => s.profilo);
  const updateProfilo = useProfileStore((s) => s.updateProfilo);
  const resetProfilo = useProfileStore((s) => s.resetProfilo);
  const tema = useUiStore((s) => s.tema);
  const setTema = useUiStore((s) => s.setTema);
  const showToast = useToastStore((s) => s.show);

  const [editing, setEditing] = useState<Sezione>(null);
  const [draft, setDraft] = useState<Profilo>(profilo);
  const [confermaReset, setConfermaReset] = useState(false);
  const [avatarSheetOpen, setAvatarSheetOpen] = useState(false);
  const [infoNutrizioneAperta, setInfoNutrizioneAperta] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fotoInputRef = useRef<HTMLInputElement>(null);

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

  const handleScegliFoto = () => fotoInputRef.current?.click();

  const handleFotoSelezionata = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const fotoAvatar = await elaboraFotoAvatar(file);
      updateProfilo({ fotoAvatar });
      setAvatarSheetOpen(false);
    } catch {
      showToast("Non sono riuscito a leggere questa foto", "error");
    }
  };

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

  const nomeCompleto = `${profilo.nome} ${profilo.cognome}`.trim();

  return (
    <div className="pb-8">
      <div className="safe-top px-4 pt-7">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Torna indietro"
          className="h-10 w-10 rounded-full bg-paper-100 text-paper-600 flex items-center justify-center active:bg-paper-200"
        >
          <ArrowLeft size={19} />
        </button>
      </div>
      <div className="flex flex-col items-center text-center pt-2 pb-6 px-4">
        <ProfileAvatar
          avatarId={profilo.avatarId}
          fotoAvatar={profilo.fotoAvatar}
          nome={profilo.nome}
          cognome={profilo.cognome}
          onClick={() => setAvatarSheetOpen(true)}
        />
        <button
          onClick={() => setAvatarSheetOpen(true)}
          className="mt-2.5 text-caption font-semibold text-accent-600 dark:text-accent-300"
        >
          Cambia avatar
        </button>
        <h1 className="mt-3 text-display-sm font-display font-semibold text-paper-900">
          {nomeCompleto || "Il tuo profilo"}
        </h1>
        {(profilo.eta > 0 || profilo.residenza) && (
          <p className="text-body-sm text-paper-500 mt-1">
            {[profilo.eta > 0 ? `${profilo.eta} anni` : null, profilo.residenza || null]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>

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
            label="Come calcoliamo equilibrio e valori"
            value="Da dove vengono le stime nutrizionali"
            icon={<Info size={20} className="text-primary-600" />}
            onClick={() => setInfoNutrizioneAperta(true)}
          />
        </SettingsSection>

        <SettingsSection title="I miei dati">
          <SettingsRow
            label="Esporta backup"
            value="Salva una copia dei tuoi dati in un file"
            icon={<Download size={20} className="text-primary-600" />}
            onClick={handleExport}
          />
          <SettingsRow
            label="Importa backup"
            value="Ripristina i dati da un file — utile per passare a un nuovo telefono"
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

      <BottomSheet open={avatarSheetOpen} onClose={() => setAvatarSheetOpen(false)} title="Scegli il tuo avatar">
        <div className="grid grid-cols-4 gap-3.5 pt-1">
          <button
            onClick={handleScegliFoto}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className={cn(
                "h-14 w-14 rounded-full overflow-hidden bg-paper-100 flex items-center justify-center text-paper-500",
                profilo.fotoAvatar && "ring-2 ring-accent-500 ring-offset-2 ring-offset-paper-0",
              )}
            >
              {profilo.fotoAvatar ? (
                <img src={profilo.fotoAvatar} alt="" className="h-full w-full object-cover" />
              ) : (
                <Camera size={22} />
              )}
            </span>
            <span className="text-caption text-paper-500">Foto</span>
          </button>
          <button
            onClick={() => {
              updateProfilo({ avatarId: null, fotoAvatar: null });
              setAvatarSheetOpen(false);
            }}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className={cn(
                "h-14 w-14 rounded-full bg-primary-600 flex items-center justify-center text-paper-50 font-display font-semibold",
                profilo.avatarId === null && !profilo.fotoAvatar && "ring-2 ring-accent-500 ring-offset-2 ring-offset-paper-0",
              )}
            >
              {`${profilo.nome.trim().charAt(0)}${profilo.cognome.trim().charAt(0)}`.toUpperCase() || "🙂"}
            </span>
            <span className="text-caption text-paper-500">Iniziali</span>
          </button>
          {AVATAR_OPZIONI.map((opzione) => (
            <button
              key={opzione.id}
              onClick={() => {
                updateProfilo({ avatarId: opzione.id, fotoAvatar: null });
                setAvatarSheetOpen(false);
              }}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={cn(
                  "h-14 w-14 rounded-full flex items-center justify-center text-primary-900",
                  opzione.bg,
                  profilo.avatarId === opzione.id && !profilo.fotoAvatar && "ring-2 ring-accent-500 ring-offset-2 ring-offset-paper-0",
                )}
              >
                <AvatarGlyph id={opzione.id} size={28} />
              </span>
              <span className="text-caption text-paper-500 text-center leading-tight">{opzione.label}</span>
            </button>
          ))}
        </div>
        <p className="text-caption text-paper-400 text-center mt-4">
          La foto resta solo sul tuo telefono: non viene inviata da nessuna parte.
        </p>
        <input
          ref={fotoInputRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={handleFotoSelezionata}
        />
      </BottomSheet>

      <BottomSheet
        open={infoNutrizioneAperta}
        onClose={() => setInfoNutrizioneAperta(false)}
        title="Come calcoliamo equilibrio e valori"
      >
        <div className="flex flex-col gap-3 text-body-md text-paper-700 pb-2">
          <p>
            I valori nutrizionali che vedi nelle ricette sono <strong>stime</strong>, calcolate dagli
            ingredienti usando tabelle di composizione standard per alimenti generici. Non pesiamo il
            tuo piatto: usiamo medie di letteratura, buone per farsi un'idea in cucina, non per un
            referto di laboratorio.
          </p>
          <p>
            Il punteggio "Equilibrio" nasconde regole ispirate alle linee guida italiane per una sana
            alimentazione: un po' di pesce, un po' di legumi, tanta verdura, cereali vari, senza
            esagerare con carne rossa o uova. Sono un consiglio di buon senso, non un obiettivo da
            rincorrere a ogni costo.
          </p>
          <p className="text-body-sm text-paper-500">
            MealPrep dà indicazioni generali di buon senso alimentare, non consigli medici o dietetici
            personalizzati. Per esigenze di salute specifiche, parlane con un professionista.
          </p>
          <p className="text-body-sm text-paper-500">
            I nomi, i marchi e i valori nutrizionali dei prodotti riconosciuti con lo scanner arrivano
            da{" "}
            <a
              href="https://it.openfoodfacts.org"
              target="_blank"
              rel="noreferrer"
              className="text-primary-700 dark:text-primary-300 underline"
            >
              Open Food Facts
            </a>
            , una banca dati libera e collaborativa distribuita con licenza Open Database License (ODbL).
          </p>
        </div>
      </BottomSheet>
    </div>
  );
}
