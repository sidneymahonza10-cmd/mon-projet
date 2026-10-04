import { cn } from "@/lib/cn";
import { LogoMark } from "./Logo";

/** Badge circulaire au texte tournant, monogramme au centre. */
export function RotatingBadge({ text, className, tone = "light" }: { text: string; className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={cn("relative grid size-32 place-items-center rounded-full sm:size-36", dark ? "bg-forest text-porcelain" : "bg-porcelain text-espresso", className)} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        <text fontSize="8.4" letterSpacing="2.6" fill="currentColor" fontFamily="var(--font-sans)">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <LogoMark className={cn("h-9", dark ? "text-sand" : "text-caramel")} />
    </div>
  );
}
