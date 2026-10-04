import { cn } from "@/lib/cn";

/**
 * Logo NOVESYA — PLACEHOLDER typographique.
 * Remplacez ce composant par votre logo définitif (SVG) si besoin.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 28" fill="none" aria-hidden="true" className={cn("h-5 w-auto", className)}>
      <path d="M3 13.5 20 2l17 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 11v15M31.5 11v15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="17.5" y="10" width="5" height="5" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", tone === "light" ? "text-paper" : "text-ink", className)}>
      <LogoMark className="text-gold" />
      <span className="font-display text-[1.35rem] font-medium leading-none tracking-[0.14em]">NOVESYA</span>
    </span>
  );
}
