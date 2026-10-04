"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { CalendarCheck, DoorOpen, KeyRound, MessagesSquare, RefreshCw, Sparkles, Sun, type LucideIcon } from "lucide-react";
import { journey } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const icons: LucideIcon[] = [CalendarCheck, MessagesSquare, KeyRound, Sun, Sparkles, DoorOpen, RefreshCw];
const N = journey.length;

/** Parcours d'une réservation piloté par le scroll : une orbite où chaque étape s'allume. */
export function Autopilot() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N * 0.999)))));

  const angle = useTransform(p, [0, 1], [0, 360 * ((N - 1) / N)]);
  const ring = useTransform(p, [0, 1], [0, (N - 1) / N]);
  const Icon = icons[active];

  return (
    <section id="methode" ref={ref} aria-labelledby="methode-title" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-linen sm:rounded-t-[3.5rem]" style={{ height: `${N * 55 + 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden py-24 sm:py-28">
        <div className="container-x grid h-full items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading id="methode-title" title="Votre logement" accent="en autopilote." description="De la réservation à la suivante, chaque étape est prise en charge. Faites défiler : le cycle se déroule sous vos yeux." />
            <ol className="mt-10 hidden gap-x-6 gap-y-2 sm:grid sm:grid-cols-2 lg:mt-12">
              {journey.map((s, i) => (
                <li key={s.label} className={cn("flex items-center gap-3 text-sm transition-colors duration-500", i === active ? "text-espresso" : i < active ? "text-caramel-deep" : "text-taupe/70")}>
                  <span className={cn("h-px transition-all duration-500", i === active ? "w-10 bg-caramel" : "w-4 bg-dune")} />
                  {s.label}
                </li>
              ))}
            </ol>
          </div>

          {/* Orbite */}
          <div className="relative mx-auto aspect-square w-[min(78vw,30rem)] lg:w-[min(42vw,36rem)]">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-hairline)" strokeWidth="1" />
              <motion.circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-caramel)" strokeWidth="1.6" strokeLinecap="round" style={{ pathLength: ring }} />
              <circle cx="100" cy="100" r="64" fill="none" stroke="var(--color-hairline)" strokeDasharray="1 4" />
            </svg>
            {/* Point lumineux qui voyage */}
            <motion.div className="absolute inset-0" style={{ rotate: angle }} aria-hidden="true">
              <span className="absolute left-1/2 top-[6%] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel shadow-[0_0_0_6px_rgba(184,135,74,0.2),0_0_30px_6px_rgba(184,135,74,0.45)]" />
            </motion.div>
            {/* Étapes autour de l'orbite */}
            {journey.map((s, i) => {
              const a = (i / N) * 2 * Math.PI - Math.PI / 2;
              const x = 50 + 44 * Math.cos(a);
              const y = 50 + 44 * Math.sin(a);
              const I = icons[i];
              return (
                <span
                  key={s.label}
                  className={cn(
                    "absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-all duration-500 sm:size-12",
                    i === active ? "scale-125 border-caramel bg-caramel text-porcelain shadow-[0_12px_30px_-8px_rgba(184,135,74,0.8)]" : i < active ? "border-caramel/50 bg-porcelain text-caramel-deep" : "border-hairline bg-porcelain text-taupe",
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  aria-hidden="true"
                >
                  <I className="size-[1.1rem]" strokeWidth={1.5} />
                </span>
              );
            })}
            {/* Centre */}
            <div className="absolute inset-[22%] grid place-items-center rounded-full bg-porcelain text-center shadow-[0_40px_80px_-40px_rgba(42,32,26,0.45)]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="px-6"
                >
                  <Icon className="mx-auto size-6 text-caramel" strokeWidth={1.4} />
                  <p className="num mt-2 text-[0.7rem] tracking-[0.2em] text-taupe">
                    ÉTAPE {active + 1} / {N}
                  </p>
                  <h3 className="mt-1 font-display text-[1.7rem] leading-tight text-espresso sm:text-4xl">{journey[active].label}</h3>
                  <p className="mx-auto mt-2 hidden max-w-[16rem] text-sm leading-snug text-taupe sm:block">{journey[active].detail}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
