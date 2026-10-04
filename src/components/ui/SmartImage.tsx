"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Image avec repli élégant : si la photo (placeholder) ne charge pas,
 * un fond architectural sobre s'affiche à la place — jamais d'icône cassée.
 */
export function SmartImage({ src, alt, className, imgClassName, priority, sizes }: SmartImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = ref.current;
    // L'erreur a pu survenir avant l'hydratation React
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className={cn("relative overflow-hidden bg-anthracite", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 75% 20%, rgba(226,212,187,0.28), transparent 55%), radial-gradient(90% 70% at 10% 90%, rgba(193,154,91,0.18), transparent 60%), linear-gradient(160deg, #2a2b30 0%, #151518 70%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn("relative h-full w-full object-cover", imgClassName)}
        />
      )}
      {failed && <span className="sr-only">{alt}</span>}
    </div>
  );
}
