"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { Marquee } from "@/components/ui/Marquee";
import { SplitWords } from "@/components/ui/SplitWords";
import { reasons } from "@/data/content";
import { site } from "@/config/site";

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
    <section id="manifeste" aria-labelledby="manifeste-title" className="relative z-10 bg-cream pb-28 sm:pb-36">
      <div className="border-y border-hairline bg-porcelain py-6 font-display text-[2.2rem] italic text-cocoa sm:py-8 sm:text-6xl">
        <Marquee items={["Gestion Airbnb", "Tarification dynamique", "Shooting professionnel", "Check-in / Check-out", "Ménage & linge", "Reporting", "Assistance 24/7"]} />
      </div>

      <div className="container-x pt-28 sm:pt-36">
        <h2 id="manifeste-title" className="sr-only">
          Pourquoi NOVESYA
        </h2>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <p className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-espresso" aria-hidden="true">
            <SplitWords text="Pourquoi" className="block" />
            <SplitWords text="NOVESYA ?" delay={0.1} className="block italic text-caramel-deep" />
          </p>
          <TextReveal
            className="font-display text-[1.7rem] leading-[1.28] text-espresso sm:text-[2.2rem]"
            text={`${site.name} accompagne les propriétaires de locations courte durée pour optimiser leurs revenus et leur retirer toute la charge opérationnelle. Annonce, prix, voyageurs, ménage, suivi : votre logement passe en autopilote, avec l'exigence d'un service hôtelier.`}
          />
        </div>

        <ul className="mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <motion.li
              key={r.key}
              initial={{ opacity: 0, y: 50, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-hairline bg-porcelain p-7 transition-[transform,box-shadow] duration-700 hover:-translate-y-2 hover:shadow-[0_40px_70px_-40px_rgba(42,32,26,0.5)] sm:p-8">
                <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-forest transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <div className="relative">
                  <svg viewBox="0 0 32 32" className="size-11 text-caramel transition-colors duration-500 group-hover:text-sand" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <motion.g initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.4 + i * 0.1, ease: [0.65, 0, 0.35, 1] }}>
                      {glyphs[r.key]}
                    </motion.g>
                  </svg>
                  <h3 className="mt-16 text-[0.8rem] font-semibold tracking-[0.16em] text-espresso transition-colors duration-500 group-hover:text-porcelain">{r.title.toUpperCase()}</h3>
                  <p className="mt-3 leading-relaxed text-taupe transition-colors duration-500 group-hover:text-mint-ink">{r.text}</p>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
