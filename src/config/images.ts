/**
 * ─────────────────────────────────────────────────────────────
 *  PHOTOS
 * ─────────────────────────────────────────────────────────────
 *  Le hero et la section finale utilisent volontairement des illustrations.
 *  Seules les photos du shooting avant / après sont de vraies photos,
 *  à déposer dans /public/images/ (voir public/images/LISEZ-MOI.md).
 *  Une chaîne vide = illustration ; tant qu'un fichier est absent, l'illustration s'affiche aussi.
 */

export const images = {
  // Illustrations dessinées (choix NOVESYA) : laisser vide pour garder l'illustration
  hero: "",
  finalCta: "",
  // Vraies photos du shooting avant / après
  shootingBefore: "/images/shooting-avant.jpg",
  shootingAfter: "/images/shooting-apres.jpg",
} as const;
