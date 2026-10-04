"use client";

import { useEffect } from "react";
import { useIsClient } from "@/lib/useIsClient";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/** Halo lumineux très discret qui suit le curseur (souris uniquement). */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const isClient = useIsClient();
  const enabled = isClient && !reduce && window.matchMedia("(pointer: fine)").matches;
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, mx, my]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-soft-light"
      style={{
        x,
        y,
        background: "radial-gradient(circle, rgba(232,214,180,0.22) 0%, rgba(232,214,180,0.06) 35%, transparent 65%)",
      }}
    />
  );
}
