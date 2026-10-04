"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "@/components/ui/Logo";
import { INTRO_DURATION, introPlays } from "@/lib/intro";
import { useIsClient } from "@/lib/useIsClient";

const letters = "NOVESYA".split("");

/** Animation du logo NOVESYA au chargement — courte, une fois par session. */
export function Preloader() {
  const isClient = useIsClient();
  const [done, setDone] = useState(false);
  const plays = isClient && introPlays();
  const show = !done && (!isClient || plays);

  useEffect(() => {
    if (!plays) return;
    const t = setTimeout(() => setDone(true), INTRO_DURATION * 1000);
    return () => clearTimeout(t);
  }, [plays]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="preloader fixed inset-0 z-[100] grid place-items-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <LogoMark className="h-8 text-gold" />
            </motion.div>
            <div className="flex overflow-hidden font-display text-5xl tracking-[0.18em] text-paper sm:text-6xl">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="h-px w-40 origin-left bg-gold/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
