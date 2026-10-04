"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { images } from "@/config/images";
import { site } from "@/config/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { INTRO_DURATION, introPlays } from "@/lib/intro";
import { useIsClient } from "@/lib/useIsClient";

const ease = [0.16, 1, 0.3, 1] as const;

const lines = [
  { text: "Votre logement travaille.", italic: false },
  { text: "NOVESYA s'occupe du reste.", italic: true },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const isClient = useIsClient();
  const base = isClient ? (introPlays() ? INTRO_DURATION - 0.35 : 0.1) : null;

  // Parallax au scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Profondeur au mouvement de la souris
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const bgX = useTransform(sx, (v) => v * -14);
  const bgY = useTransform(sy, (v) => v * -10);
  const cardX = useTransform(sx, (v) => v * 18);
  const cardY = useTransform(sy, (v) => v * 14);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  const ready = base !== null;
  const d = base ?? 0;

  return (
    <section
      id="accueil"
      ref={ref}
      onPointerMove={onMove}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      {/* Photographie — se révèle progressivement */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ clipPath: "inset(12% 10% 12% 10% round 2rem)", opacity: 0.4 }}
        animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 0rem)", opacity: 1 } : undefined}
        transition={{ duration: 1.6, delay: d, ease }}
      >
        <motion.div className="absolute -inset-6" style={{ x: bgX, y: bgY }}>
          <motion.div className="h-full w-full" style={{ y: imgY, scale: imgScale }}>
            <SmartImage
              src={images.hero}
              alt="Salon lumineux d'un appartement haut de gamme géré par NOVESYA"
              priority
              sizes="100vw"
              className="h-full w-full"
            />
          </motion.div>
        </motion.div>
        {/* Voiles de lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: fade }} className="container-x relative w-full pb-16 pt-36 sm:pb-20 lg:pb-24">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <h1 id="hero-title" className="font-display text-[clamp(2.75rem,7.2vw,5.4rem)] font-normal leading-[0.98] text-paper">
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={line.italic ? "block italic text-champagne" : "block"}
                    initial={{ y: "105%" }}
                    animate={ready ? { y: "0%" } : undefined}
                    transition={{ duration: 1.1, delay: d + 0.25 + i * 0.12, ease }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-7 max-w-[34rem] text-[1.075rem] leading-relaxed text-paper/80 sm:text-xl"
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ duration: 1, delay: d + 0.6, ease }}
            >
              Nous transformons votre location courte durée en une activité rentable, optimisée et entièrement gérée.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, delay: d + 0.75, ease }}
            >
              <MagneticButton href="#estimation" variant="gold" size="lg">
                Estimer mon potentiel locatif
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton href="#manifeste" variant="ghost-dark" size="lg" className="backdrop-blur-md">
                Découvrir NOVESYA
              </MagneticButton>
            </motion.div>
          </div>

          {/* Carte flottante — profondeur */}
          <motion.div
            style={{ x: cardX, y: cardY }}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 1.1, delay: d + 0.95, ease }}
            className="glass-dark hidden w-72 rounded-3xl p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] lg:block"
          >
            <div className="flex items-center justify-between text-xs text-mist">
              <span>Votre logement · ce mois-ci</span>
              <span className="flex items-center gap-1.5 text-gold-soft">
                <span className="size-1.5 rounded-full bg-gold-soft" /> En ligne
              </span>
            </div>
            <p className="mt-4 font-display text-[2.6rem] leading-none text-paper">{site.promise.split(".")[0]}.</p>
            <p className="mt-1 font-display text-2xl italic leading-tight text-champagne">Vous encaissez.</p>
            <div className="mt-5 flex h-14 items-end gap-1.5" aria-hidden="true">
              {[38, 52, 46, 64, 58, 76, 70, 88, 82, 96].map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-gold/40 to-gold-soft"
                  style={{ height: `${h}%` }}
                  initial={{ scaleY: 0 }}
                  animate={ready ? { scaleY: 1 } : undefined}
                  transition={{ duration: 0.9, delay: d + 1.15 + i * 0.05, ease }}
                />
              ))}
            </div>
            <p className="mt-3 text-[0.7rem] text-smoke">Illustration — données non contractuelles</p>
          </motion.div>
        </div>

        <motion.a
          href="#manifeste"
          className="mt-14 inline-flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.28em] text-paper/70 transition-colors hover:text-paper"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: d + 1.2 }}
        >
          <span className="relative h-10 w-px overflow-hidden bg-paper/20">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-gold-soft animate-scroll-cue" />
          </span>
          SCROLL TO EXPLORE
          <ArrowDown className="size-3.5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
