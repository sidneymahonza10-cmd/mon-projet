"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INTRO_DURATION, introPlays } from "@/lib/intro";
import { useIsClient } from "@/lib/useIsClient";

const letters = "NOVESYA".split("");
const ease = [0.16, 1, 0.3, 1] as const;

/** Intro : le toit se dessine, le grand N apparaît, puis deux rideaux s'ouvrent. */
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
        <motion.div aria-hidden="true" className="preloader fixed inset-0 z-[100] grid place-items-center" exit={{ opacity: 1 }} transition={{ duration: 1 }}>
          {/* Rideaux */}
          <motion.div className="absolute inset-y-0 left-0 w-1/2 bg-linen" exit={{ x: "-100%" }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="absolute inset-y-0 right-0 w-1/2 bg-linen" exit={{ x: "100%" }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} />

          <motion.div className="relative flex flex-col items-center" exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }} transition={{ duration: 0.5 }}>
            <svg viewBox="0 0 48 46" className="h-24 w-auto text-caramel sm:h-28" fill="none">
              <motion.path
                d="M3 19.5 24 3l21 16.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.g fill="currentColor" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7, ease }}>
                <rect x="12.2" y="17" width="2.1" height="25.5" />
                <rect x="33.7" y="17" width="2.1" height="25.5" />
                <path d="M12.2 17h4.3l19.3 25.5h-4.3z" />
                <rect x="9.6" y="17" width="7.2" height="1.5" />
                <rect x="9.6" y="41" width="7.2" height="1.5" />
                <rect x="31.2" y="17" width="7.2" height="1.5" />
              </motion.g>
            </svg>
            <div className="mt-5 flex overflow-hidden font-display text-4xl tracking-[0.2em] text-cocoa sm:text-5xl">
              {letters.map((l, i) => (
                <motion.span key={i} initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ delay: 0.75 + i * 0.05, duration: 0.8, ease }}>
                  {l}
                </motion.span>
              ))}
            </div>
            <motion.span className="mt-3 text-[0.62rem] tracking-[0.5em] text-taupe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}>
              CONCIERGERIE
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
