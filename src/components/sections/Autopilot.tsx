"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CalendarCheck, DoorOpen, KeyRound, MessagesSquare, RefreshCw, Sparkles, Sun, type LucideIcon } from "lucide-react";
import { journey } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const icons: LucideIcon[] = [CalendarCheck, MessagesSquare, KeyRound, Sun, Sparkles, DoorOpen, RefreshCw];
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Parcours d'une réservation en zigzag : le défilement reste naturel,
 * la ligne se dessine au fil du scroll et chaque étape s'anime à son passage.
 */
export function Autopilot() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="methode" aria-labelledby="methode-title" className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-linen py-28 sm:rounded-t-[3.5rem] sm:py-36">
      <div className="container-x">
        <SectionHeading id="methode-title" align="center" title="Votre logement" accent="en autopilote." description="De la réservation à la suivante, chaque étape est prise en charge. Vous suivez tout, sans rien avoir à gérer." />

        <ol ref={ref} className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
          {/* Ligne : fond + tracé qui se dessine au scroll */}
          <span aria-hidden="true" className="absolute bottom-7 left-7 top-7 w-px bg-dune/60 lg:left-1/2" />
          <motion.span aria-hidden="true" className="absolute bottom-7 left-7 top-7 w-0.5 origin-top -translate-x-[0.5px] bg-caramel lg:left-1/2" style={{ scaleY: line }} />

          {journey.map((step, i) => {
            const Icon = icons[i];
            const right = i % 2 === 1;
            const last = i === journey.length - 1;
            return (
              <li key={step.label} className="relative grid grid-cols-[3.5rem_1fr] items-center gap-5 pb-10 last:pb-0 lg:grid-cols-[1fr_4.5rem_1fr] lg:gap-8 lg:pb-14">
                {/* Pastille sur la ligne */}
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="relative z-10 col-start-1 row-start-1 grid size-14 place-items-center rounded-full border-4 border-linen bg-caramel text-porcelain shadow-[0_12px_30px_-10px_rgba(184,135,74,0.8)] lg:col-start-2 lg:mx-auto lg:size-[4.5rem]"
                >
                  <span aria-hidden="true" className="absolute inset-0 rounded-full bg-caramel/40 animate-ping-soft" />
                  <motion.span
                    className="relative"
                    initial={{ rotate: -90 }}
                    whileInView={{ rotate: last ? 360 : 0 }}
                    viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                    transition={{ duration: last ? 1.4 : 0.8, ease }}
                  >
                    <Icon className="size-6" strokeWidth={1.5} />
                  </motion.span>
                </motion.span>

                {/* Carte, alternée gauche / droite */}
                <motion.article
                  initial={{ opacity: 0, x: right ? 60 : -60, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 0.9, ease }}
                  className={cn(
                    "col-start-2 row-start-1 rounded-[1.75rem] border border-hairline bg-porcelain p-6 shadow-[0_30px_60px_-45px_rgba(42,32,26,0.55)] sm:p-7",
                    right ? "lg:col-start-3" : "lg:col-start-1 lg:text-right",
                  )}
                >
                  <p className="num text-xs tracking-[0.2em] text-caramel-deep">
                    ÉTAPE {i + 1} / {journey.length}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-espresso sm:text-4xl">{step.label}</h3>
                  <p className="mt-2 leading-relaxed text-taupe">{step.detail}</p>
                </motion.article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
