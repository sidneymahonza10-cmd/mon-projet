import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Lien secondaire discret : il ne concurrence jamais l'appel à l'action principal. */
export function TextLink({ href, children, tone = "dark", className, external }: { href: string; children: ReactNode; tone?: "dark" | "light"; className?: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] font-medium underline decoration-1 underline-offset-[0.3em] transition-colors",
        tone === "dark" ? "text-espresso decoration-espresso/30 hover:text-caramel-deep hover:decoration-caramel-deep" : "text-porcelain decoration-porcelain/40 hover:text-sand hover:decoration-sand",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}
