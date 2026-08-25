let audioCtx: AudioContext | null = null;

/** Un piccolo "bip" generato al volo: niente asset audio da scaricare. */
function beep() {
  try {
    audioCtx ??= new AudioContext();
    const ctx = audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch {
    // Audio non disponibile o bloccato dal device: nessun problema, si prosegue senza.
  }
}

/** Feedback di una lettura riuscita: vibrazione se disponibile, bip breve opzionale. */
export function feedbackLettura(conSuono: boolean) {
  navigator.vibrate?.(60);
  if (conSuono) beep();
}
