const PREFIX = "mealprep-";

export function exportBackup(): string {
  const data: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(PREFIX)) continue;
    const raw = localStorage.getItem(key);
    if (raw == null) continue;
    try {
      data[key] = JSON.parse(raw);
    } catch {
      data[key] = raw;
    }
  }
  return JSON.stringify({ app: "mealprep", version: 1, exportedAt: new Date().toISOString(), data }, null, 2);
}

export function downloadBackup(): void {
  const json = exportBackup();
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `mealprep-backup-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importBackupFromFile(file: File): Promise<void> {
  const text = await file.text();
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed !== "object" || !parsed.data) {
    throw new Error("File di backup non valido");
  }
  for (const [key, value] of Object.entries(parsed.data as Record<string, unknown>)) {
    if (!key.startsWith(PREFIX)) continue;
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function resetAllData(): void {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(PREFIX)) keys.push(key);
  }
  keys.forEach((k) => localStorage.removeItem(k));
}
