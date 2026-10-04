"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { Camera, LayoutPanelTop, Smartphone, Sofa, SunMedium } from "lucide-react";
import { images } from "@/config/images";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const points = [
  { icon: Camera, label: "Photographie professionnelle" },
  { icon: LayoutPanelTop, label: "Mise en valeur des espaces" },
  { icon: SunMedium, label: "Optimisation de la lumière" },
  { icon: Sofa, label: "Valorisation des équipements" },
  { icon: Smartphone, label: "Photos adaptées aux plateformes" },
];

export function Shooting() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.35"] });
  // Le rendu « professionnel » balaie la photo « téléphone » au fil du scroll
  const wipe = useTransform(scrollYProgress, [0.1, 0.75], [100, 0]);
  const clip = useMotionTemplate`inset(0 ${wipe}% 0 0)`;
  const lineLeft = useMotionTemplate`${useTransform(wipe, (v) => 100 - v)}%`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section aria-labelledby="shooting-title" className="relative z-10 -mt-8 rounded-t-[2rem] sm:-mt-10 sm:rounded-t-[2.75rem] overflow-hidden bg-night py-28 sm:py-36">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div ref={ref} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[5/4] lg:aspect-[4/5]">
            <motion.div className="absolute inset-0" style={{ scale }}>
              <SmartImage
                src={images.shooting}
                alt="Pièce de vie photographiée au téléphone"
                className="h-full w-full"
                imgClassName="[filter:grayscale(.5)_brightness(.7)_contrast(.8)_blur(.8px)] -rotate-1 scale-105"
              />
              <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
                <SmartImage src={images.shooting} alt="La même pièce après le shooting professionnel NOVESYA" className="h-full w-full" />
              </motion.div>
            </motion.div>
            <motion.span aria-hidden="true" className="absolute inset-y-0 w-px bg-paper/80" style={{ left: lineLeft }} />
            <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 text-[0.68rem] tracking-[0.16em] text-paper backdrop-blur-md">
              SMARTPHONE → SHOOTING PRO
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-8 -right-3 hidden w-44 overflow-hidden rounded-2xl border-4 border-night shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] sm:block lg:-right-10 lg:w-56"
          >
            <SmartImage src={images.shootingDetail} alt="Détail de décoration mis en valeur" className="aspect-[3/4] w-full" />
          </motion.div>
        </div>

        <div>
          <Reveal>
            <h2 id="shooting-title" className="font-display text-[2.4rem] leading-[1.04] sm:text-5xl lg:text-[3.6rem]">
              Votre logement mérite mieux qu&apos;une photo prise <span className="italic text-gold-soft">au téléphone.</span>
            </h2>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-mist">
              Chez NOVESYA, nous valorisons votre logement avec un shooting photo professionnel pensé pour attirer davantage l&apos;attention des voyageurs et renforcer la qualité de votre annonce.
            </p>
          </Reveal>

          <ul className="mt-10 divide-y divide-line-dark border-y border-line-dark">
            {points.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-4 py-4"
              >
                <Icon className="size-5 text-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                <span className="text-paper/90">{label}</span>
              </motion.li>
            ))}
          </ul>

          <Reveal delay={0.1} className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-gold/25 bg-gradient-to-br from-gold/[0.12] to-transparent p-7">
            <p className="text-sm tracking-[0.14em] text-mist">
              VALEUR : <span className="num text-paper line-through decoration-gold/70">150 €</span>
            </p>
            <p className="mt-3 font-display text-[2rem] leading-[1.05] text-paper sm:text-[2.5rem]">
              OFFERT <span className="italic text-gold-soft">avec la formule Premium</span>
            </p>
            <div className="mt-6">
              <MagneticButton href="#tarifs" variant="ghost-dark">
                Voir la formule Premium
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
