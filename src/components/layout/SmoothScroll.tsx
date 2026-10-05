"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Défilement fluide (Lenis) + ancres animées. Désactivé si l'utilisateur réduit les animations. */
export function SmoothScroll() {
  useEffect(() => {
    // Une nouvelle page s'ouvre toujours en haut (sauf lien vers une section précise) :
    // on désactive la restauration automatique de la position par le navigateur.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Ancres internes (#section ou /#section sur la page courante)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey) return;
      const url = new URL(a.href, location.href);
      if (!url.hash || url.pathname !== location.pathname) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    if (!location.hash) lenis.scrollTo(0, { immediate: true, force: true });

    // Arrivée depuis une autre page avec une ancre
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => lenis.scrollTo(el, { offset: -80, immediate: true }), 50);
    }

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
  return null;
}
