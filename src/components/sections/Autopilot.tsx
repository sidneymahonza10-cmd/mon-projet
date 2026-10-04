"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { CalendarCheck, DoorOpen, KeyRound, MessagesSquare, RefreshCw, Sparkles, Sun, type LucideIcon } from "lucide-react";
import { journey } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const stepIcons: LucideIcon[] = [CalendarCheck, MessagesSquare, KeyRound, Sun, Sparkles, DoorOpen, RefreshCw];
const STEP_MS = 2400;

export function Autopilot() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || reduce || paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % journey.length), STEP_MS);
    return () => clearInterval(t);
  }, [inView, reduce, paused]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
    window.setTimeout(() => setPaused(false), 9000);
  };

  const progress = active / (journey.length - 1);
  const ActiveIcon = stepIcons[active];

  return (
    <section id="methode" aria-labelledby="methode-title" className="relative z-10 -mt-8 overflow-hidden rounded-t-[2rem] bg-ink py-28 sm:-mt-10 sm:rounded-t-[2.75rem] sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 size-[38rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(193,154,91,0.18), transparent 65%)" }}
      />
      <div className="container-x relative">
        <SectionHeading
          id="methode-title"
          title="Votre logement"
          accent="en autopilote."
          description="De la réservation à la suivante, chaque étape est prise en charge. Vous suivez tout, sans rien avoir à gérer."
        />

        <div ref={ref} className="mt-16 grid gap-10 lg:mt-20">
          {/* ── Piste horizontale (desktop) ── */}
          <div className="relative hidden lg:block">
            <div className="absolute left-[calc(100%/14)] right-[calc(100%/14)] top-7 h-px bg-line-dark">
              <motion.div className="h-full origin-left bg-gradient-to-r from-gold/40 to-gold-soft" animate={{ scaleX: progress }} transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }} />
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft shadow-[0_0_18px_4px_rgba(216,189,138,0.5)]"
                animate={{ left: `${progress * 100}%` }}
                transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
            <ol className="relative grid grid-cols-7">
              {journey.map((step, i) => {
                const Icon = stepIcons[i];
                const done = i <= active;
                return (
                  <li key={step.label} className="flex flex-col items-center text-center">
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={i === active ? "step" : undefined}
                      aria-label={`Étape ${i + 1} : ${step.label}`}
                      className={cn(
                        "relative grid size-14 place-items-center rounded-full border transition-all duration-500",
                        i === active
                          ? "scale-110 border-gold bg-gold text-ink shadow-[0_10px_30px_-6px_rgba(193,154,91,0.6)]"
                          : done
                            ? "border-gold/50 bg-anthracite text-gold-soft"
                            : "border-line-dark bg-anthracite text-smoke hover:border-paper/40 hover:text-paper",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.5} />
                    </button>
                    <span className={cn("mt-4 text-[0.72rem] font-medium tracking-[0.14em] transition-colors duration-500", i === active ? "text-paper" : "text-smoke")}>
                      {step.label.toUpperCase()}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ── Liste verticale (mobile / tablette) ── */}
          <ol className="relative space-y-2 lg:hidden">
            <span aria-hidden="true" className="absolute bottom-7 left-7 top-7 w-px bg-line-dark" />
            <motion.span
              aria-hidden="true"
              className="absolute left-7 top-7 w-px origin-top bg-gold-soft"
              style={{ height: "calc(100% - 3.5rem)" }}
              animate={{ scaleY: progress }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            />
            {journey.map((step, i) => {
              const Icon = stepIcons[i];
              const isActive = i === active;
              return (
                <li key={step.label}>
                  <button type="button" onClick={() => select(i)} aria-current={isActive ? "step" : undefined} className="relative flex w-full items-start gap-4 rounded-2xl py-2 text-left">
                    <span
                      className={cn(
                        "relative grid size-14 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        isActive ? "border-gold bg-gold text-ink" : i < active ? "border-gold/50 bg-anthracite text-gold-soft" : "border-line-dark bg-anthracite text-smoke",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="pt-1.5">
                      <span className={cn("block text-[0.78rem] font-medium tracking-[0.14em]", isActive ? "text-paper" : "text-smoke")}>{step.label.toUpperCase()}</span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="block overflow-hidden text-mist"
                          >
                            <span className="block pt-1.5">{step.detail}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* ── Carte de statut (desktop) ── */}
          <div className="hidden lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-5">
            <div className="glass-dark relative min-h-56 overflow-hidden rounded-[1.75rem] p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-8"
                >
                  <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold-soft">
                    <ActiveIcon className="size-7" strokeWidth={1.3} />
                  </span>
                  <div>
                    <p className="num text-sm text-smoke">
                      Étape {active + 1} / {journey.length}
                    </p>
                    <h3 className="mt-2 font-display text-5xl text-paper">{journey[active].label}</h3>
                    <p className="mt-3 max-w-md text-lg text-mist">{journey[active].detail}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] border border-line-dark bg-anthracite/60 p-6">
              <p className="flex items-center justify-between text-sm text-mist">
                Journal d&apos;activité
                <span className="flex items-center gap-1.5 text-xs text-gold-soft">
                  <span className="relative flex size-2">
                    <span className="absolute inset-0 rounded-full bg-gold-soft animate-ping-soft" />
                    <span className="relative size-2 rounded-full bg-gold-soft" />
                  </span>
                  Automatique
                </span>
              </p>
              <ul className="mt-4 space-y-2.5">
                <AnimatePresence initial={false}>
                  {[0, 1, 2].map((offset) => {
                    const i = (active - offset + journey.length) % journey.length;
                    return (
                      <motion.li
                        layout
                        key={`${i}-${active - offset}`}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1 - offset * 0.3, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-between rounded-xl border border-line-dark bg-ink/40 px-4 py-3 text-sm"
                      >
                        <span className="text-paper">{journey[i].label}</span>
                        <span className="text-xs text-gold-soft">{offset === 0 ? "En cours" : "Terminé"}</span>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
