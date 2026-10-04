"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/config/images";
import { SmartImage } from "@/components/ui/SmartImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.18, 1.05]);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative z-10 -mt-8 overflow-hidden rounded-t-[2rem] bg-ink sm:-mt-10 sm:rounded-t-[2.75rem]">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <SmartImage src={images.finalCta} alt="" className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />

      <div className="container-x relative flex min-h-[44rem] flex-col items-center justify-center py-32 text-center sm:min-h-[52rem]">
        <Reveal>
          <h2 id="cta-title" className="mx-auto max-w-5xl font-display text-[clamp(2.4rem,6.5vw,5.25rem)] leading-[1.02] text-paper">
            Et si votre logement pouvait vous rapporter davantage <span className="italic text-champagne">sans vous prendre plus de temps ?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl text-lg text-paper/80 sm:text-xl">Confiez votre logement à NOVESYA. Nous nous occupons du reste.</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-11 flex flex-col items-center">
          <MagneticButton href="#contact" variant="gold" size="lg" className="px-9">
            Obtenir mon estimation gratuite
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <p className="mt-5 text-sm text-paper/70">Sans engagement • Réponse sous 24h</p>
        </Reveal>
      </div>
    </section>
  );
}
