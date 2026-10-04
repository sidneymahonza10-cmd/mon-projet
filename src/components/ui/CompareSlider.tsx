"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

type CompareSliderProps = {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
  initial?: number;
};

/** Comparateur avant / après — souris, doigt et clavier (flèches, Début, Fin). */
export function CompareSlider({ before, after, beforeLabel, afterLabel, className, initial = 50 }: CompareSliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const raw = useMotionValue(initial);
  const pos = useSpring(raw, { stiffness: 320, damping: 34, mass: 0.5 });
  const clip = useMotionTemplate`inset(0 ${useTransform(pos, (v) => 100 - v)}% 0 0)`;
  const left = useMotionTemplate`${pos}%`;

  const update = useCallback(
    (v: number) => {
      const c = Math.max(0, Math.min(100, v));
      raw.set(c);
      setValue(Math.round(c));
    },
    [raw],
  );

  const fromPointer = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) update(((clientX - r.left) / r.width) * 100);
  };

  return (
    <div
      ref={ref}
      className={cn("relative select-none overflow-hidden touch-pan-y", dragging ? "cursor-grabbing" : "cursor-ew-resize", className)}
      onPointerDown={(e) => {
        setDragging(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        fromPointer(e.clientX);
      }}
      onPointerMove={(e) => dragging && fromPointer(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <div className="absolute inset-0">{after}</div>
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        {before}
      </motion.div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3.5 py-1.5 text-[0.7rem] font-medium tracking-[0.18em] text-paper backdrop-blur-md sm:left-6 sm:top-6">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-paper/85 px-3.5 py-1.5 text-[0.7rem] font-medium tracking-[0.18em] text-ink backdrop-blur-md sm:right-6 sm:top-6">
        {afterLabel}
      </span>

      <motion.div className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-paper/90 shadow-[0_0_24px_rgba(0,0,0,0.5)]" style={{ left }} />
      <motion.div
        role="slider"
        tabIndex={0}
        aria-label="Comparer avant et après NOVESYA"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={`${value} % avant NOVESYA visible`}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 10 : 4;
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") update(value - step);
          else if (e.key === "ArrowRight" || e.key === "ArrowUp") update(value + step);
          else if (e.key === "Home") update(0);
          else if (e.key === "End") update(100);
          else return;
          e.preventDefault();
        }}
        className="absolute top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-paper/60 bg-paper/20 text-paper shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md transition-transform hover:scale-105"
        style={{ left }}
      >
        <MoveHorizontal className="size-5" />
      </motion.div>
    </div>
  );
}
