"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { reasons } from "@/data/content";
import { site } from "@/config/site";

/** Icônes dessinées à la main, tracées à l'apparition */
const glyphs: Record<string, React.ReactNode> = {
  revenue: <path d="M4 26 12 17l6 5 10-12M22 10h6v6" />,
  mind: (
    <>
      <circle cx="16" cy="16" r="11" />
      <path d="M11 17.5c1.4 2 3 3 5 3s3.6-1 5-3" />
    </>
  ),
  image: (
    <>
      <rect x="4" y="7" width="24" height="18" rx="3" />
      <circle cx="16" cy="16" r="4.5" />
      <path d="M22 11h2" />
    </>
  ),
  clarity: (
    <>
      <path d="M3 16s5-9 13-9 13 9 13 9-5 9-13 9S3 16 3 16Z" />
      <circle cx="16" cy="16" r="3.5" />
    </>
  ),
};

export function Manifesto() {
  return (
    <section id="manifeste" aria-labelledby="manifeste-title" className="relative z-10 -mt-8 rounded-t-[2rem] bg-ivory pb-28 pt-24 text-ink sm:-mt-10 sm:rounded-t-[2.75rem] sm:pb-36 sm:pt-32">
      <div className="container-x">
        <h2 id="manifeste-title" className="font-display text-[clamp(3rem,10vw,7.5rem)] leading-[0.92] tracking-[-0.03em]">
          <Reveal>Nous gérons.</Reveal>
          <Reveal delay={0.1}>
            <span className="italic text-gold-deep">Vous encaissez.</span>
          </Reveal>
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div />
          <TextReveal
            className="font-display text-[1.65rem] leading-[1.3] text-ink sm:text-[2.1rem]"
            text={`${site.name} accompagne les propriétaires de locations courte durée pour optimiser leurs revenus — et leur retirer toute la charge opérationnelle. Annonce, prix, voyageurs, ménage, suivi : votre logement passe en autopilote, avec l'exigence d'un service hôtelier.`}
          />
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-[1.75rem] border border-line-light bg-line-light sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <article key={r.key} className="group relative bg-paper p-7 transition-colors duration-500 hover:bg-ink sm:p-9">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
              <svg viewBox="0 0 32 32" className="size-10 text-gold-deep transition-colors duration-500 group-hover:text-gold-soft" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <motion.g
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.3 + i * 0.1, ease: [0.65, 0, 0.35, 1] }}
                >
                  {glyphs[r.key]}
                </motion.g>
              </svg>
              <h3 className="mt-14 text-[0.8rem] font-semibold tracking-[0.16em] text-ink transition-colors duration-500 group-hover:text-paper">
                {r.title.toUpperCase()}
              </h3>
              <p className="mt-3 leading-relaxed text-stone transition-colors duration-500 group-hover:text-mist">{r.text}</p>
              </motion.div>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 ease-out group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
