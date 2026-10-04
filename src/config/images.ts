/**
 * ─────────────────────────────────────────────────────────────
 *  PHOTOS — PLACEHOLDERS
 * ─────────────────────────────────────────────────────────────
 *  Ces photos proviennent d'Unsplash et servent uniquement d'exemples.
 *  Remplacez-les par les photos de vos logements :
 *    1. déposez vos fichiers dans /public/images/ (ex. hero.jpg)
 *    2. remplacez l'URL par le chemin local : "/images/hero.jpg"
 *  Si une image ne charge pas, un fond élégant s'affiche à la place.
 */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: unsplash("photo-1600210492486-724fe5c67fb0", 2400),
  beforeAfter: unsplash("photo-1600607687939-ce8a6c25118c", 2000),
  shooting: unsplash("photo-1600566753190-17f0baa2a6c3", 2000),
  shootingDetail: unsplash("photo-1586023492125-27b2c045efd7", 1200),
  finalCta: unsplash("photo-1600585154340-be6161a56a0c", 2400),
  owner: unsplash("photo-1618221195710-dd6b41faaea6", 1400),
  properties: {
    a: unsplash("photo-1502672260266-1c1ef2d93688", 900),
    b: unsplash("photo-1522708323590-d24dbb6b0267", 900),
    c: unsplash("photo-1560448204-e02f11c3d0e2", 900),
    d: unsplash("photo-1505693416388-ac5ce068fe85", 900),
    e: unsplash("photo-1493809842364-78817add7ffb", 900),
    f: unsplash("photo-1484154218962-a197022b5858", 900),
  },
} as const;
