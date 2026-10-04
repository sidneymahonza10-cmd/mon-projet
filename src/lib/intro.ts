/**
 * Indique si l'animation d'introduction (logo) est jouée pendant cette visite.
 * Mémoïsé : le Preloader et le Hero lisent la même réponse.
 */
let cached: boolean | null = null;

export function introPlays(): boolean {
  if (typeof window === "undefined") return true;
  if (cached !== null) return cached;
  let seen = false;
  try {
    seen = sessionStorage.getItem("novesya-intro") === "1";
    sessionStorage.setItem("novesya-intro", "1");
  } catch {}
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  cached = !seen && !reduce;
  return cached;
}

export const INTRO_DURATION = 1.5;
