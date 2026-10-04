"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useMotionTemplate, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type AnimationPlaybackControls } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  before: ReactNode;
  after: ReactNode;
  className?: string;
};

/**
 * Avant / après piloté par un petit appareil photo.
 * 1. À l'arrivée à l'écran, l'appareil balaie l'image de « avant » vers « après » et déclenche un flash.
 * 2. Ensuite, le visiteur le fait glisser (souris, doigt ou flèches du clavier).
 */
export function CameraCompare({ before, after, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const reduce = useReducedMotion();
  const pos = useMotionValue(96); // % de la photo « avant » visible
  const [value, setValue] = useState(96);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [shots, setShots] = useState(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useMotionValueEvent(pos, "change", (v) => setValue(Math.round(v)));
  const clip = useMotionTemplate`inset(0 ${useTransform(pos, (v) => 100 - v)}% 0 0)`;
  const left = useMotionTemplate`${pos}%`;

  // Balayage automatique, une seule fois
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      pos.set(50);
      return;
    }
    let cancelled = false;
    (async () => {
      controls.current = animate(pos, 7, { duration: 1.7, ease: [0.65, 0, 0.35, 1], delay: 0.3 });
      await controls.current;
      if (cancelled) return;
      setShots((s) => s + 1);
      controls.current = animate(pos, 50, { type: "spring", stiffness: 90, damping: 16, delay: 0.45 });
    })();
    return () => {
      cancelled = true;
      controls.current?.stop();
    };
  }, [inView, reduce, pos]);

  const takeOver = () => {
    controls.current?.stop();
    setInteracted(true);
  };

  const update = useCallback((v: number) => pos.set(Math.max(0, Math.min(100, v))), [pos]);
  const fromPointer = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) update(((clientX - r.left) / r.width) * 100);
  };

  return (
    <div
      ref={ref}
      className={cn("relative select-none overflow-hidden touch-pan-y", dragging ? "cursor-grabbing" : "cursor-ew-resize", className)}
      onPointerDown={(e) => {
        takeOver();
        setDragging(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        fromPointer(e.clientX);
      }}
      onPointerMove={(e) => dragging && fromPointer(e.clientX)}
      onPointerUp={() => {
        if (dragging) setShots((s) => s + 1);
        setDragging(false);
      }}
      onPointerCancel={() => setDragging(false)}
      data-cursor
    >
      <div className="absolute inset-0">{after}</div>
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        {before}
      </motion.div>

      {/* Flash */}
      <motion.div key={shots} aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white" initial={{ opacity: shots ? 0.85 : 0 }} animate={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} />

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-espresso/75 px-3.5 py-1.5 text-[0.68rem] font-medium tracking-[0.18em] text-porcelain backdrop-blur-md sm:left-6 sm:top-6">
        AVANT<span className="hidden sm:inline"> · SMARTPHONE</span>
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-porcelain/90 px-3.5 py-1.5 text-[0.68rem] font-medium tracking-[0.18em] text-espresso backdrop-blur-md sm:right-6 sm:top-6">
        APRÈS<span className="hidden sm:inline"> · SHOOTING PRO</span>
      </span>

      {/* Ligne de séparation */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-porcelain shadow-[0_0_24px_rgba(42,32,26,0.45)]" style={{ left }} />

      {/* L'appareil photo = la poignée */}
      <motion.div
        role="slider"
        tabIndex={0}
        aria-label="Appareil photo : faites-le glisser pour comparer la photo au smartphone et le shooting professionnel"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={`${value} % de la photo smartphone visible`}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 10 : 4;
          let next: number | null = null;
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = value - step;
          else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = value + step;
          else if (e.key === "Home") next = 0;
          else if (e.key === "End") next = 100;
          if (next === null) return;
          e.preventDefault();
          takeOver();
          update(next);
        }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
        style={{ left }}
      >
        <motion.div animate={dragging ? { scale: 1.08, rotate: -4 } : { scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
          <Camera shots={shots} />
        </motion.div>
        {!interacted && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 }}
            className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-espresso/80 px-3 py-1 text-[0.68rem] text-porcelain backdrop-blur-md"
          >
            ← Glissez l&apos;appareil →
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}

/** Petit appareil photo vintage (boîtier espresso, objectif caramel, flash qui s'allume). */
function Camera({ shots }: { shots: number }) {
  return (
    <svg viewBox="0 0 96 72" className="h-[4.25rem] w-auto drop-shadow-[0_14px_22px_rgba(42,32,26,0.55)] sm:h-20" aria-hidden="true">
      {/* Sangle */}
      <path d="M6 22c-4 0-5 4-3 6M90 22c4 0 5 4 3 6" fill="none" stroke="#4a3328" strokeWidth="2" strokeLinecap="round" />
      {/* Bosse du viseur */}
      <path d="M30 14h36l5 8H25Z" fill="#2a201a" />
      {/* Déclencheur */}
      <rect x="70" y="10" width="10" height="5" rx="2" fill="#b8874a" />
      {/* Boîtier */}
      <rect x="6" y="20" width="84" height="46" rx="9" fill="#2a201a" />
      <rect x="6" y="30" width="84" height="26" fill="#4a3328" />
      <rect x="6" y="20" width="84" height="46" rx="9" fill="none" stroke="#dcc9a8" strokeOpacity="0.35" />
      {/* Flash */}
      <rect x="13" y="24" width="14" height="8" rx="2" fill="#f6f1e9" />
      <motion.rect
        key={shots}
        x="9"
        y="20"
        width="22"
        height="16"
        rx="6"
        fill="#fffbe8"
        initial={{ opacity: shots ? 1 : 0, scale: 1.6 }}
        animate={{ opacity: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        style={{ transformOrigin: "20px 28px" }}
      />
      {/* Objectif */}
      <circle cx="48" cy="44" r="20" fill="#f6f1e9" />
      <circle cx="48" cy="44" r="16.5" fill="#b8874a" />
      <circle cx="48" cy="44" r="12" fill="#2a201a" />
      <motion.circle
        key={`iris-${shots}`}
        cx="48"
        cy="44"
        r="7"
        fill="#3a4a33"
        initial={{ r: shots ? 2 : 7 }}
        animate={{ r: 7 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <circle cx="44" cy="40" r="2.6" fill="#fdfbf7" opacity="0.85" />
      {/* Monogramme */}
      <path d="M74 28l4-3 4 3" fill="none" stroke="#b8874a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
