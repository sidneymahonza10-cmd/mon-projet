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
  /** Variation de l'illustration de repli */
  variant?: number;
  /** Classes appliquées à l'illustration de repli uniquement */
  artClassName?: string;
};

/**
 * Image avec repli élégant : si la photo (placeholder) ne charge pas,
 * une illustration d'intérieur lumineux s'affiche — jamais d'icône cassée.
 */
export function SmartImage({ src, alt, className, imgClassName, priority, sizes, variant = 0, artClassName }: SmartImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className={cn("relative overflow-hidden bg-linen", className)}>
      <div className={cn("absolute inset-0", artClassName)}>
        <InteriorArt variant={variant} />
      </div>
      {src && !failed && (
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

const tones = [
  { wall: "#efe6d7", floor: "#d9c3a0", accent: "#b8874a", sofa: "#e4d6c0", plant: "#8e9a82" },
  { wall: "#ece4d8", floor: "#cdb795", accent: "#8e9a82", sofa: "#f3ece1", plant: "#6f7e66" },
  { wall: "#f2ebe0", floor: "#d6bf9b", accent: "#a87a45", sofa: "#e8dcc8", plant: "#8e9a82" },
];

/** Illustration vectorielle d'un séjour baigné de lumière (repli des photos). */
function InteriorArt({ variant }: { variant: number }) {
  const t = tones[variant % tones.length];
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`light-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffaf0" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fffaf0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={t.wall} />
      {/* Fenêtre en arche */}
      <path d="M470 430V170a110 110 0 0 1 220 0v260Z" fill="#fbf6ec" />
      <path d="M470 430V170a110 110 0 0 1 220 0v260Z" fill="none" stroke={t.floor} strokeWidth="6" />
      <path d="M580 60v370M470 250h220" stroke={t.floor} strokeWidth="4" />
      {/* Rayon de lumière */}
      <path d="M470 180 150 600h420l120-170Z" fill={`url(#light-${variant})`} opacity="0.55" />
      {/* Sol */}
      <rect y="430" width="800" height="170" fill={t.floor} />
      <path d="M0 470h800M0 520h800M0 575h800" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" />
      {/* Canapé */}
      <rect x="90" y="330" width="330" height="120" rx="26" fill={t.sofa} />
      <rect x="110" y="290" width="290" height="80" rx="24" fill={t.sofa} stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
      <rect x="150" y="305" width="70" height="55" rx="14" fill={t.accent} opacity="0.85" />
      {/* Table basse */}
      <ellipse cx="300" cy="500" rx="110" ry="22" fill={t.accent} opacity="0.35" />
      {/* Lampe */}
      <path d="M720 430V250" stroke={t.accent} strokeWidth="4" />
      <path d="M690 250h60l-12-50h-36Z" fill={t.accent} />
      {/* Plante */}
      <rect x="40" y="380" width="40" height="55" rx="8" fill={t.accent} opacity="0.7" />
      <path d="M60 380c-30-40-20-90 0-110 20 20 30 70 0 110Zm0 0c10-50 50-70 70-70-5 30-30 60-70 70Zm0 0c-10-40-45-55-65-55 5 25 30 50 65 55Z" fill={t.plant} />
    </svg>
  );
}
