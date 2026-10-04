"use client";

import { useRef } from "react";
import type { MotionValue } from "framer-motion";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, CalendarCheck, KeyRound, Star } from "lucide-react";
import { images } from "@/config/images";
import { formulesHref } from "@/config/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { INTRO_DURATION, introPlays } from "@/lib/intro";
import { useIsClient } from "@/lib/useIsClient";

const ease = [0.16, 1, 0.3, 1] as const;
const line1 = "Votre logement travaille.".split(" ");
const line2 = "NOVESYA s'occupe du reste.".split(" ");

function useStart() {
  const isClient = useIsClient();
  return isClient ? (introPlays() ? INTRO_DURATION - 0.2 : 0.1) : null;
}

function Headline({ start }: { start: number | null }) {
  const ready = start !== null;
  const word = (w: string, i: number, offset: number) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "110%", rotate: 6 }}
        animate={ready ? { y: "0%", rotate: 0 } : undefined}
        transition={{ duration: 1.15, delay: (start ?? 0) + offset + i * 0.07, ease }}
      >
        {w}&nbsp;
      </motion.span>
    </span>
  );
  return (
    <h1 id="hero-title" className="font-display text-[clamp(2.9rem,6.6vw,6.1rem)] font-normal leading-[0.96] tracking-[-0.025em] text-espresso">
      <span className="block">{line1.map((w, i) => word(w, i, 0))}</span>
      <span className="block italic text-caramel-deep">{line2.map((w, i) => word(w, i, 0.2))}</span>
    </h1>
  );
}

function Intro({ start }: { start: number | null }) {
  const ready = start !== null;
  const d = start ?? 0;
  return (
    <>
      <motion.p
        className="mt-7 max-w-[32rem] text-[1.08rem] leading-relaxed text-taupe sm:text-xl"
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
        transition={{ duration: 1, delay: d + 0.65, ease }}
      >
        Nous transformons votre bien en une activité rentable, optimisée et entièrement gérée.
      </motion.p>
      <motion.div
        className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1, delay: d + 0.8, ease }}
      >
        <MagneticButton href="#estimation" size="lg">
          Estimer mon potentiel locatif
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </MagneticButton>
        <MagneticButton href={formulesHref} variant="ghost" size="lg">
          Découvrir nos formules
        </MagneticButton>
      </motion.div>
    </>
  );
}

const notes = [
  { icon: CalendarCheck, title: "Réservation confirmée", meta: "3 nuits · 2 voyageurs", pos: "left-[-12%] top-[18%]", depth: 26 },
  { icon: KeyRound, title: "Check-in réussi", meta: "Arrivée autonome · 15:02", pos: "right-[-8%] top-[48%]", depth: -20 },
  { icon: Star, title: "Avis 5 étoiles", meta: "« Logement impeccable »", pos: "left-[-6%] bottom-[10%]", depth: 16 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const start = useStart();
  const ready = start !== null;
  const d = start ?? 0;

  // Desktop : l'arche s'agrandit jusqu'au plein écran au fil du scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const top = useTransform(p, [0, 0.55], [17, 0]);
  const left = useTransform(p, [0, 0.55], [55, 0]);
  const right = useTransform(p, [0, 0.55], [5, 0]);
  const bottom = useTransform(p, [0, 0.55], [7, 0]);
  const radius = useTransform(p, [0, 0.55], [320, 0]);
  const clip = useMotionTemplate`inset(${top}vh ${right}vw ${bottom}vh ${left}vw round ${radius}px ${radius}px 28px 28px)`;
  const imgScale = useTransform(p, [0, 0.55], [1.25, 1]);
  const textOpacity = useTransform(p, [0, 0.28], [1, 0]);
  const textY = useTransform(p, [0, 0.3], [0, -80]);
  const veil = useTransform(p, [0.35, 0.6], [0, 1]);
  const overlayY = useTransform(p, [0.45, 0.75], [60, 0]);
  const notesOpacity = useTransform(p, [0, 0.18], [1, 0]);

  // Profondeur au mouvement de la souris
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });

  const bgX = useTransform(sx, (v) => v * -18);
  const bgY = useTransform(sy, (v) => v * -12);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <section id="accueil" ref={ref} onPointerMove={onMove} aria-labelledby="hero-title" className="relative bg-cream lg:h-[230vh]">
      {/* ───────── Desktop : scène collante ───────── */}
      <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">
        <div aria-hidden="true" className="absolute -left-40 top-1/3 size-[40rem] rounded-full bg-sand/40 blur-[120px]" />

        <motion.div style={{ opacity: textOpacity, y: textY }} className="container-x relative z-10 flex h-full items-center">
          <div className="max-w-[46%] pt-10">
            <Headline start={start} />
            <Intro start={start} />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-20"
          style={{ clipPath: clip }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.4, delay: d + 0.15, ease }}
          data-cursor-label="DÉFILER"
        >
          <motion.div className="absolute inset-0" style={{ scale: imgScale, x: bgX, y: bgY }}>
            <SmartImage src={images.hero} alt="Salon lumineux d'un appartement haut de gamme géré par NOVESYA" priority sizes="100vw" className="h-full w-full" />
          </motion.div>
          <motion.div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/35 to-espresso/10" style={{ opacity: veil }} />
          <motion.div style={{ opacity: veil, y: overlayY }} className="absolute inset-0 flex flex-col items-center justify-center text-center text-porcelain">
            <p className="font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.03em]">Nous gérons.</p>
            <p className="font-display text-[clamp(3.5rem,9vw,8.5rem)] italic leading-[0.9] tracking-[-0.03em] text-sand">Vous encaissez.</p>
            <p className="mt-8 max-w-md text-lg text-porcelain/85">Annonce, prix, voyageurs, ménage, suivi : votre logement passe en autopilote.</p>
          </motion.div>
        </motion.div>

        {/* Notifications flottantes */}
        <motion.div style={{ opacity: notesOpacity }} className="pointer-events-none absolute inset-y-[17vh] left-[55vw] right-[5vw] z-30">
          {notes.map((n, i) => (
            <Note key={n.title} note={n} index={i} sx={sx} sy={sy} ready={ready} delay={d} />
          ))}
        </motion.div>

        <motion.a
          href="#manifeste"
          style={{ opacity: textOpacity }}
          className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.66rem] font-medium tracking-[0.3em] text-taupe xl:flex"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ delay: d + 1.4 }}
        >
          SCROLL TO EXPLORE
          <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ArrowDown className="size-4" />
          </motion.span>
        </motion.a>
      </div>

      {/* ───────── Mobile / tablette ───────── */}
      <div className="relative overflow-hidden pb-16 pt-32 lg:hidden">
        <div aria-hidden="true" className="absolute -right-32 top-10 size-[26rem] rounded-full bg-sand/50 blur-[90px]" />
        <div className="container-x relative">
          <Headline start={start} />
          <Intro start={start} />
          <motion.div
            className="relative mt-12"
            initial={{ opacity: 0, y: 40, clipPath: "inset(30% 0 0 0 round 200px 200px 24px 24px)" }}
            animate={ready ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0 round 200px 200px 24px 24px)" } : undefined}
            transition={{ duration: 1.3, delay: d + 0.9, ease }}
          >
            <SmartImage src={images.hero} alt="Salon lumineux d'un appartement haut de gamme géré par NOVESYA" priority className="aspect-[4/5] w-full rounded-t-[200px] rounded-b-3xl sm:aspect-[4/3]" />
            <div className="glass absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="grid size-9 place-items-center rounded-xl bg-caramel text-porcelain">
                <CalendarCheck className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-medium text-espresso">Réservation confirmée</span>
                <span className="block text-xs text-taupe">3 nuits · 2 voyageurs</span>
              </span>
            </div>
          </motion.div>
          <a href="#manifeste" className="mt-10 inline-flex items-center gap-2 text-[0.66rem] font-medium tracking-[0.3em] text-taupe">
            SCROLL TO EXPLORE <ArrowDown className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Note({ note, index, sx, sy, ready, delay }: { note: (typeof notes)[number]; index: number; sx: MotionValue<number>; sy: MotionValue<number>; ready: boolean; delay: number }) {
  const x = useTransform(sx, (v) => v * note.depth);
  const y = useTransform(sy, (v) => v * note.depth);
  return (
    <motion.div style={{ x, y }} className={`absolute ${note.pos}`}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 0.9, delay: delay + 1 + index * 0.18, ease }}
      >
        <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_24px_50px_-24px_rgba(42,32,26,0.55)] animate-float" style={{ animationDelay: `${index * 1.3}s` }}>
        <span className="grid size-9 place-items-center rounded-xl bg-caramel text-porcelain">
          <note.icon className="size-4" />
        </span>
        <span>
          <span className="block text-sm font-medium text-espresso">{note.title}</span>
          <span className="block text-xs text-taupe">{note.meta}</span>
        </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
