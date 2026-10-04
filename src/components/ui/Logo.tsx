import { cn } from "@/lib/cn";

/**
 * Monogramme NOVESYA : le toit de la maison et un grand N en dessous.
 * PLACEHOLDER — remplaçable par le logo définitif (SVG).
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 48 46" fill="none" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title} className={cn("w-auto", className)}>
      {/* Toit */}
      <path d="M3 19.5 24 3l21 16.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Grand N à empattements (style Didone) */}
      <g fill="currentColor">
        <rect x="12.2" y="17" width="2.1" height="25.5" />
        <rect x="33.7" y="17" width="2.1" height="25.5" />
        <path d="M12.2 17h4.3l19.3 25.5h-4.3z" />
        <rect x="9.6" y="17" width="7.2" height="1.5" />
        <rect x="9.6" y="41" width="7.2" height="1.5" />
        <rect x="31.2" y="17" width="7.2" height="1.5" />
      </g>
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-3", tone === "dark" ? "text-cocoa" : "text-porcelain", className)}>
      <LogoMark className={cn("h-9", tone === "dark" ? "text-caramel" : "text-sand")} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] font-medium tracking-[0.12em]">NOVESYA</span>
        <span className={cn("mt-1 text-[0.55rem] font-medium tracking-[0.42em]", tone === "dark" ? "text-taupe" : "text-sand")}>CONCIERGERIE</span>
      </span>
    </span>
  );
}
