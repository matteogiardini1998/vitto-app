import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { APP_NAME, APP_TAGLINE } from "../../config/app";
import { useProfileStore } from "../../store/profileStore";
import { ChalkText } from "../../chalk";
import { MockupCarousel } from "./components/MockupCarousel";
import { InstallSection } from "./components/InstallSection";
import iconHero from "../../assets/icon-hero.webp";

/**
 * Landing pubblica: prima impressione dell'app, stessa identità visiva
 * (legno, crema, verde) con le annotazioni gessetto del modulo condiviso.
 * Chi ha già un profilo non passa da qui (redirect in App.tsx); dall'app
 * ci si torna solo dal link discreto nel profilo.
 */
export function LandingScreen() {
  const navigate = useNavigate();
  const onboardingCompletato = useProfileStore((s) => s.profilo.onboardingCompletato);
  const dentroApp = onboardingCompletato ? "/meal-prep" : "/onboarding";

  const entra = () => navigate(dentroApp);

  return (
    // overflow-x-clip: i telefoni laterali della giostra escono dal loro contenitore
    // via transform (per restare "attaccati" al centro a ogni larghezza); questo
    // impedisce solo lo scroll orizzontale di pagina, senza clippare i post-it.
    <div className="min-h-dvh overflow-x-clip">
      <main className="mx-auto max-w-5xl px-4">
        {/* ------------------------------ HERO ------------------------------ */}
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-xl rounded-3xl bg-paper-100 px-6 py-8 text-center shadow-elevated md:mt-14 md:py-10"
        >
          <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-[30%] shadow-[0_2px_3px_rgb(20_12_8_/_0.35),0_14px_22px_-6px_rgb(20_12_8_/_0.5)] md:h-20 md:w-20">
            <img src={iconHero} alt="" className="h-full w-full object-cover" />
            {/* Sheen leggero: stesso trattamento usato su tagliere/hub della ruota, per un rilievo quasi 3D invece di un'immagine piatta. */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.4),transparent_60%)]" />
          </div>
          <h1 className="mt-4 font-display font-bold text-display-lg tracking-tight text-paper-900 md:text-[3.25rem]">
            {APP_NAME}
          </h1>
          {/* Claim ufficiale: vive SOLO qui e nei meta/og della landing (vedi index.html). */}
          <p className="mx-auto mt-3 max-w-md text-title-lg font-bold text-primary-800">{APP_TAGLINE}</p>
          <motion.button
            type="button"
            onClick={entra}
            whileTap={{ scale: 0.96 }}
            className="mx-auto mt-6 flex items-center gap-2 rounded-full bg-primary-700 px-7 py-3.5 text-body-lg font-bold text-paper-50 shadow-card active:bg-primary-800"
          >
            Inizia ora <ArrowRight size={20} />
          </motion.button>
        </motion.header>

        {/* --------------------------- GIOSTRA MOCKUP ----------------------- */}
        <div className="mt-10 md:mt-12">
          <MockupCarousel />
        </div>

        {/* --------------------------- INSTALLAZIONE ------------------------ */}
        <div className="mt-14 md:mt-20">
          <h2 className="mb-5 text-center font-display text-display-sm text-paper-50 [text-shadow:0_1px_4px_rgb(0_0_0_/_0.45)]">
            Portala sulla schermata Home
          </h2>
          <InstallSection />
        </div>

        {/* --------------------------- USALA DAL WEB ------------------------ */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          aria-label="Usala dal browser"
          className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-4 rounded-3xl border border-paper-100 bg-paper-0 p-6 text-center shadow-card md:flex-row md:text-left"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-300/40 text-sage-800 dark:text-sage-300">
            <Globe size={24} strokeWidth={1.8} />
          </span>
          <div className="flex-1">
            <h3 className="font-display text-title-lg text-paper-900">Oppure usala così, dal web</h3>
            <p className="mt-1 text-body-sm text-paper-600">
              Niente da installare: funziona tutta dal browser, e i tuoi dati restano su questo dispositivo.
            </p>
          </div>
          <button
            type="button"
            onClick={entra}
            className="shrink-0 rounded-full border border-primary-600 px-5 py-2.5 text-body-md font-semibold text-primary-700 active:bg-primary-50 dark:text-primary-300"
          >
            Continua dal browser
          </button>
        </motion.section>
      </main>

      {/* ------------------------- BANNER CTA FINALE ------------------------ */}
      {/* Chiusura sulla texture legno: ripete il claim ufficiale, il bottone "Inizia ora"
          vive già nell'hero (visibile senza scroll) — qui niente doppione. */}
      <section aria-label="Inizia" className="accent-wood mt-14 md:mt-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 py-12 text-center md:py-16">
          <ChalkText className="text-4xl md:text-5xl">{APP_TAGLINE}</ChalkText>
        </div>
      </section>
    </div>
  );
}
