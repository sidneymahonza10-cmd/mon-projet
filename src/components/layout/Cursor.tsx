"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useIsClient } from "@/lib/useIsClient";
import { LogoMark } from "@/components/ui/Logo";

/**
 * Curseur personnalisé (souris uniquement) : un point + un anneau qui s'agrandit
 * sur les éléments interactifs, avec une étiquette (data-cursor-label) sur les visuels.
 */
export function Cursor() {
  const isClient = useIsClient();
  const reduce = useReducedMotion();
  const enabled = isClient && !reduce && window.matchMedia("(pointer: fine)").matches;
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [house, setHouse] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelled?.dataset.cursorLabel ?? null);
      setHouse(!!t.closest("[data-cursor-house]"));
      setHover(!!t.closest("a, button, label, [role='slider'], [data-cursor]"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const size = label ? 92 : house ? (hover ? 62 : 50) : hover ? 54 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div className="absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cocoa" style={{ x, y, opacity: house ? 0 : 1 }} />
      <motion.div
        className="absolute left-0 top-0 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border"
        style={{ x: rx, y: ry }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "rgba(42,32,26,0.92)" : house ? "rgba(253,251,247,0.92)" : hover ? "rgba(184,135,74,0.12)" : "rgba(184,135,74,0)",
          borderColor: label ? "rgba(42,32,26,0)" : "rgba(138,93,40,0.55)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {house && !label && (
            <motion.span key="house" initial={{ opacity: 0, scale: 0.4, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.4 }} className="text-caramel">
              <LogoMark className="h-6" />
            </motion.span>
          )}
          {label && (
            <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="text-[0.68rem] font-medium tracking-[0.14em] text-porcelain">
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
