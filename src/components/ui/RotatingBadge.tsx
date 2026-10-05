import { useId } from "react";
import { cn } from "@/lib/cn";
import { LogoMark } from "./Logo";

/** Badge circulaire au texte tournant, monogramme au centre. */
const CIRCUMFERENCE = 2 * Math.PI * 38 - 1;

export function RotatingBadge({ text, className, tone = "light" }: { text: string; className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const id = `badge-${useId().replace(/:/g, "")}`;
  // Taille adaptée à la longueur pour garder un espacement régulier
  const fontSize = Math.min(8.6, CIRCUMFERENCE / (text.length * 0.78));
  return (
    <div className={cn("relative grid size-32 place-items-center rounded-full sm:size-36", dark ? "bg-forest text-porcelain" : "bg-porcelain text-espresso", className)} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id={id} d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        {/* Le texte est réparti exactement sur un tour : jamais de chevauchement entre la fin et le début */}
        <text fontSize={fontSize} fill="currentColor" fontFamily="var(--font-sans)" fontWeight={500}>
          <textPath href={`#${id}`} textLength={CIRCUMFERENCE} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <LogoMark className={cn("h-9", dark ? "text-sand" : "text-caramel")} />
    </div>
  );
}
