"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

type StepperProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  tone?: "dark" | "light";
  format?: (v: number) => string;
};

/** Sélecteur numérique tactile (gros boutons, accessible au clavier). */
export function Stepper({ id, label, value, min, max, onChange, tone = "dark", format }: StepperProps) {
  const dark = tone === "dark";
  const btn = cn(
    "grid size-11 shrink-0 place-items-center rounded-full border transition-colors disabled:opacity-30",
    dark ? "border-line-dark text-paper hover:border-gold hover:text-gold-soft" : "border-line-light text-ink hover:border-gold-deep",
  );
  return (
    <div>
      <span id={`${id}-label`} className={cn("mb-2 block text-sm", dark ? "text-mist" : "text-stone")}>
        {label}
      </span>
      <div
        className={cn("flex items-center justify-between gap-2 rounded-[0.875rem] border p-1", dark ? "border-line-dark bg-paper/[0.04]" : "border-line-light bg-paper")}
        role="group"
        aria-labelledby={`${id}-label`}
      >
        <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Diminuer : ${label}`}>
          <Minus className="size-4" />
        </button>
        <output id={id} aria-live="polite" className={cn("num text-lg font-medium", dark ? "text-paper" : "text-ink")}>
          {format ? format(value) : value}
        </output>
        <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Augmenter : ${label}`}>
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
