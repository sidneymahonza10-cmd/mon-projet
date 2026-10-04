"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "caramel" | "ghost" | "light" | "ghost-light";

const variants: Record<Variant, string> = {
  primary: "bg-espresso text-porcelain shadow-[0_14px_30px_-14px_rgba(42,32,26,0.6)]",
  caramel: "bg-caramel text-porcelain shadow-[0_14px_30px_-12px_rgba(184,135,74,0.7)]",
  light: "bg-porcelain text-espresso shadow-[0_14px_30px_-14px_rgba(0,0,0,0.35)]",
  ghost: "border border-espresso/20 text-espresso hover:border-espresso/60",
  "ghost-light": "border border-porcelain/40 text-porcelain hover:border-porcelain",
};

/** Calque de remplissage qui monte au survol (effet « rideau ») */
const fills: Record<Variant, string> = {
  primary: "bg-caramel",
  caramel: "bg-espresso",
  light: "bg-sand",
  ghost: "bg-espresso",
  "ghost-light": "bg-porcelain",
};
const hoverText: Record<Variant, string> = {
  primary: "group-hover:text-porcelain",
  caramel: "group-hover:text-porcelain",
  light: "group-hover:text-espresso",
  ghost: "group-hover:text-porcelain",
  "ghost-light": "group-hover:text-espresso",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  strength?: number;
};
type AsLink = CommonProps & { href: string; target?: string; rel?: string; onClick?: () => void; type?: never; disabled?: never };
type AsButton = CommonProps & { href?: never; type?: "button" | "submit"; onClick?: () => void; disabled?: boolean };

/** Bouton premium : magnétisme léger + remplissage qui monte au survol. */
export function MagneticButton(props: AsLink | AsButton) {
  const { children, variant = "primary", size = "md", className, strength = 0.28 } = props;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "group relative isolate inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-[-0.005em] transition-[color,border-color,opacity,box-shadow] duration-500 disabled:pointer-events-none disabled:opacity-50",
    size === "lg" ? "min-h-14 px-8 text-[0.98rem]" : "min-h-12 px-6 text-[0.92rem]",
    variants[variant],
    hoverText[variant],
    className,
  );
  const inner = (
    <>
      <span aria-hidden="true" className={cn("absolute inset-0 -z-10 translate-y-[101%] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0", fills[variant])} />
      {children}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <motion.a ref={ref as React.Ref<HTMLAnchorElement>} href={props.href} target={props.target} rel={props.rel} onClick={props.onClick} onPointerMove={onMove} onPointerLeave={onLeave} style={{ x, y }} whileTap={{ scale: 0.97 }} className={classes} data-cursor="hover">
        {inner}
      </motion.a>
    );
  }
  const b = props as AsButton;
  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} type={b.type ?? "button"} onClick={b.onClick} disabled={b.disabled} onPointerMove={onMove} onPointerLeave={onLeave} style={{ x, y }} whileTap={{ scale: 0.97 }} className={classes} data-cursor="hover">
      {inner}
    </motion.button>
  );
}
