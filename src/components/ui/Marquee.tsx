"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from "framer-motion";
import { cn } from "@/lib/cn";

/** Bandeau défilant infini, accéléré par la vitesse de scroll. */
export function Marquee({ items, className, baseVelocity = -2.2 }: { items: string[]; className?: string; baseVelocity?: number }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    base.set(base.get() + move);
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 sm:px-10">{it}</span>
          <svg viewBox="0 0 20 20" className="size-4 shrink-0 text-caramel sm:size-5" aria-hidden="true">
            <path d="M10 0c.8 5.6 4.4 9.2 10 10-5.6.8-9.2 4.4-10 10-.8-5.6-4.4-9.2-10-10 5.6-.8 9.2-4.4 10-10Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </span>
  );

  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <motion.div className="flex w-max" style={{ x }}>
        {row}
        {row}
      </motion.div>
    </div>
  );
}
