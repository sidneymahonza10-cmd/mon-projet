"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "gold" | "light" | "ghost-dark" | "ghost-light" | "dark";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:bg-gold-soft shadow-[0_10px_30px_-12px_rgba(193,154,91,0.7)]",
  light: "bg-paper text-ink hover:bg-white shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)]",
  dark: "bg-ink text-paper hover:bg-anthracite shadow-[0_12px_30px_-14px_rgba(10,10,11,0.55)]",
  "ghost-dark": "border border-paper/25 text-paper hover:border-paper/60 hover:bg-paper/5",
  "ghost-light": "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/[0.03]",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  /** Intensité de l'effet magnétique (0 = désactivé) */
  strength?: number;
};

type AsLink = CommonProps & { href: string; target?: string; rel?: string; onClick?: () => void; type?: never; disabled?: never };
type AsButton = CommonProps & { href?: never; type?: "button" | "submit"; onClick?: () => void; disabled?: boolean };

/** Bouton premium avec effet magnétique léger au survol (souris uniquement). */
export function MagneticButton(props: AsLink | AsButton) {
  const { children, variant = "gold", size = "md", className, strength = 0.25 } = props;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(
    "group relative inline-flex select-none items-center justify-center gap-2.5 rounded-full font-medium tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow,opacity] duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-45",
    size === "lg" ? "min-h-14 px-7 text-[0.975rem]" : "min-h-12 px-6 text-[0.925rem]",
    variants[variant],
    className,
  );

  if ("href" in props && props.href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={props.href}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ x, y }}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }
  const b = props as AsButton;
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={b.type ?? "button"}
      onClick={b.onClick}
      disabled={b.disabled}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
