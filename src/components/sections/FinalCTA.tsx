"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/config/images";
import { formulesHref } from "@/config/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";
import { RotatingBadge } from "@/components/ui/RotatingBadge";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const clip = useTransform(scrollYProgress, [0, 0.4], ["inset(8% 6% 8% 6% round 3rem)", "inset(0% 0% 0% 0% round 0rem)"]);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative bg-cream">
      <motion.div style={{ clipPath: clip }} className="relative overflow-hidden bg-forest">
        <motion.div className="absolute inset-0 scale-110" style={{ y }}>
          <SmartImage src={images.finalCta} alt="" className="h-full w-full" variant={2} />
        </motion.div>
        <div className="absolute inset-0 bg-forest/80" />
        <div className="container-x relative flex min-h-[46rem] flex-col items-center justify-center py-32 text-center sm:min-h-[54rem]">
          <RotatingBadge text="SANS ENGAGEMENT · RÉPONSE SOUS 24H · " tone="dark" className="mb-10 border border-porcelain/15" />
          <h2 id="cta-title" className="mx-auto max-w-5xl font-display text-[clamp(2.4rem,6.4vw,5.4rem)] leading-[1.02] text-porcelain">
            <SplitWords text="Et si votre logement pouvait vous rapporter davantage" stagger={0.035} />{" "}
            <SplitWords text="sans vous prendre plus de temps ?" delay={0.3} stagger={0.035} className="italic text-sand" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-xl text-lg text-mint-ink sm:text-xl">Confiez votre logement à NOVESYA. Nous nous occupons du reste.</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-11 flex flex-col items-center gap-3 sm:flex-row">
            <MagneticButton href="#contact" variant="caramel" size="lg" className="px-9">
              Obtenir mon estimation gratuite
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href={formulesHref} variant="ghost-light" size="lg">
              Découvrir nos formules
            </MagneticButton>
          </Reveal>
          <p className="mt-5 text-sm text-mint-ink">Sans engagement • Réponse sous 24h</p>
        </div>
      </motion.div>
    </section>
  );
}
