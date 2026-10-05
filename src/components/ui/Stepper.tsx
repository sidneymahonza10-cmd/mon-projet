"use client";

import { Minus, Plus } from "lucide-react";

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
export function Stepper({ id, label, value, min, max, onChange, tone = "light", format }: StepperProps) {
  void tone;
  const btn = "grid size-11 shrink-0 place-items-center rounded-full border border-hairline text-espresso transition-colors hover:border-caramel hover:bg-caramel hover:text-porcelain disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-espresso";
  return (
    <div>
      <span id={`${id}-label`} className="mb-2 block text-sm text-taupe">
        {label}
      </span>
      <div
        className="flex items-center justify-between gap-2 rounded-[0.95rem] border border-hairline bg-porcelain p-1"
        role="group"
        aria-labelledby={`${id}-label`}
      >
        <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Diminuer : ${label}`}>
          <Minus className="size-4" />
        </button>
        <output id={id} aria-live="polite" className="num text-lg font-medium text-espresso">
          {format ? format(value) : value}
        </output>
        <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Augmenter : ${label}`}>
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
