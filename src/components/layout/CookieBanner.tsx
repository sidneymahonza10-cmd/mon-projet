"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { onConsentOpen, setConsent, useConsent } from "@/lib/consent";

/**
 * Bannière de consentement : « Accepter » et « Refuser » au même niveau (exigence CNIL).
 * Aucun traceur n'est chargé avant un clic sur « Accepter ».
 */
export function CookieBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  useEffect(() => onConsentOpen(() => setReopened(true)), []);

  const open = consent === null || reopened;
  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    setReopened(false);
  };

  return (
    <AnimatePresence>
      {consent !== undefined && open && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[70] rounded-[1.5rem] border border-hairline bg-porcelain p-5 text-espresso shadow-[0_30px_70px_-30px_rgba(42,32,26,0.55)] sm:inset-x-auto sm:bottom-6 sm:right-24 sm:max-w-md lg:right-28 sm:p-6"
        >
          <p id="cookie-title" className="font-display text-2xl">
            Vos données, <span className="italic text-caramel-deep">votre choix.</span>
          </p>
          <p id="cookie-text" className="mt-2 text-sm leading-relaxed text-taupe">
            Avec votre accord, nous mesurons la fréquentation du site de façon anonyme pour l&apos;améliorer. Aucune publicité, aucune revente.{" "}
            <a href="/confidentialite#cookies" className="text-caramel-deep underline">
              En savoir plus
            </a>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => choose("denied")} className="min-h-11 rounded-full border border-espresso/25 px-4 text-sm font-medium transition-colors hover:border-espresso">
              Refuser
            </button>
            <button type="button" onClick={() => choose("granted")} className="min-h-11 rounded-full bg-espresso px-4 text-sm font-medium text-porcelain transition-colors hover:bg-caramel-strong">
              Accepter
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
