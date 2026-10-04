"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { Camera, LayoutPanelTop, Smartphone, Sofa, SunMedium } from "lucide-react";
import { images } from "@/config/images";
import { formulesHref } from "@/config/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { SplitWords } from "@/components/ui/SplitWords";

const points = [
  { icon: Camera, label: "Photographie professionnelle" },
  { icon: LayoutPanelTop, label: "Mise en valeur des espaces" },
  { icon: SunMedium, label: "Optimisation de la lumière" },
  { icon: Sofa, label: "Valorisation des équipements" },
  { icon: Smartphone, label: "Photos adaptées aux plateformes" },
];

export function Shooting() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.3"] });
  const wipe = useTransform(scrollYProgress, [0.1, 0.7], [100, 0]);
  const clip = useMotionTemplate`inset(0 ${wipe}% 0 0)`;
  const line = useMotionTemplate`${useTransform(wipe, (v) => 100 - v)}%`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const flash = useTransform(scrollYProgress, [0.66, 0.7, 0.78], [0, 0.75, 0]);

  return (
    <section aria-labelledby="shooting-title" className="relative overflow-hidden bg-cream pb-28 sm:pb-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div ref={ref} className="relative" data-cursor-label="AVANT · APRÈS">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] sm:aspect-[5/5] lg:aspect-[4/5]">
            <motion.div className="absolute inset-0" style={{ scale }}>
              <SmartImage src={images.shootingBefore} alt="Pièce de vie photographiée au téléphone" className="h-full w-full" variant={0} artClassName="-rotate-1 scale-105 [filter:grayscale(.6)_brightness(.8)_blur(1.2px)]" />
              <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
                <SmartImage src={images.shootingAfter} alt="La même pièce après le shooting professionnel NOVESYA" className="h-full w-full" variant={0} />
              </motion.div>
            </motion.div>
            <motion.span aria-hidden="true" className="absolute inset-y-0 w-0.5 bg-porcelain shadow-[0_0_20px_rgba(255,255,255,0.9)]" style={{ left: line }} />
            <motion.div aria-hidden="true" className="absolute inset-0 bg-white" style={{ opacity: flash }} />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-espresso/75 px-3.5 py-1.5 text-[0.66rem] tracking-[0.16em] text-porcelain backdrop-blur-md">
              SMARTPHONE → SHOOTING PRO
            </span>
          </div>
          <RotatingBadge text="SHOOTING OFFERT · FORMULE PREMIUM · " className="absolute -right-2 -top-4 shadow-[0_30px_60px_-30px_rgba(42,32,26,0.6)] lg:-right-10" />
        </div>

        <div>
          <h2 id="shooting-title" className="font-display text-[2.5rem] leading-[1.02] sm:text-5xl lg:text-[3.8rem]">
            <SplitWords text="Votre logement mérite mieux qu'une photo prise" className="block" stagger={0.03} />
            <SplitWords text="au téléphone." delay={0.3} className="block italic text-caramel-deep" />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-taupe">
              Chez NOVESYA, nous valorisons votre logement avec un shooting photo professionnel pensé pour attirer davantage l&apos;attention des voyageurs et renforcer la qualité de votre annonce.
            </p>
          </Reveal>

          <ul className="mt-10 border-t border-hairline">
            {points.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-4 border-b border-hairline py-4 transition-[padding] duration-500 hover:pl-3"
              >
                <span className="grid size-10 place-items-center rounded-full bg-linen text-caramel-deep transition-colors duration-500 group-hover:bg-caramel group-hover:text-porcelain">
                  <Icon className="size-[1.1rem]" strokeWidth={1.5} />
                </span>
                <span className="text-espresso">{label}</span>
              </motion.li>
            ))}
          </ul>

          <Reveal delay={0.1} className="mt-10 flex flex-col gap-6 rounded-[1.75rem] bg-linen p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm tracking-[0.14em] text-taupe">
                VALEUR : <span className="num text-espresso line-through decoration-caramel">150 €</span>
              </p>
              <p className="mt-2 font-display text-[2rem] leading-[1.05] text-espresso sm:text-[2.4rem]">
                OFFERT <span className="italic text-caramel-deep">avec la formule Premium</span>
              </p>
            </div>
            <MagneticButton href={formulesHref} variant="primary" className="shrink-0">
              Découvrir nos formules
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
