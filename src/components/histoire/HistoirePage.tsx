"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, HandHeart, ShieldCheck, Users } from "lucide-react";
import { formulesHref } from "@/config/site";
import { LogoMark } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";
import { TextReveal } from "@/components/ui/TextReveal";
import { RotatingBadge } from "@/components/ui/RotatingBadge";

const ease = [0.16, 1, 0.3, 1] as const;

const values = [
  { icon: Users, title: "Complémentarité", text: "Deux regards, deux sensibilités, une même exigence pour votre logement." },
  { icon: ShieldCheck, title: "Sérieux", text: "Chaque séjour est préparé, suivi et contrôlé avec rigueur." },
  { icon: HandHeart, title: "Proximité", text: "Un contact direct, humain, disponible quand vous en avez besoin." },
];

export function HistoirePage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <>
      {/* ───────── Ouverture ───────── */}
      <section ref={ref} aria-labelledby="histoire-title" className="relative overflow-hidden bg-cream pb-20 pt-40 sm:pt-48">
        <div aria-hidden="true" className="absolute -left-40 top-24 size-[34rem] rounded-full bg-sand/50 blur-[120px]" />
        <motion.div aria-hidden="true" style={{ y: markY, rotate: markRotate }} className="pointer-events-none absolute -right-16 top-28 text-linen sm:right-0 lg:right-[6vw]">
          <LogoMark className="h-[22rem] sm:h-[30rem]" />
        </motion.div>
        <div className="container-x relative">
          <h1 id="histoire-title" className="font-display text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.9] tracking-[-0.035em]">
            <SplitWords text="Notre" className="block" />
            <SplitWords text="histoire." delay={0.12} className="block italic text-caramel-deep" />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-10 max-w-xl font-display text-[1.7rem] leading-[1.3] text-espresso sm:text-[2.1rem]">
              Nous sommes un jeune couple passionné par l&apos;entrepreneuriat, avec l&apos;envie de construire ensemble un projet qui nous ressemble.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── Récit ───────── */}
      <section aria-label="Notre récit" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-porcelain py-28 sm:rounded-t-[3.5rem] sm:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <RotatingBadge text="NOVESYA · UNE AVENTURE À DEUX · " />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xs text-taupe">Une conciergerie née d&apos;une conviction : un logement bien géré, c&apos;est un propriétaire serein.</p>
            </Reveal>
          </div>

          <div className="space-y-14">
            <TextReveal
              className="font-display text-[1.75rem] leading-[1.32] text-espresso sm:text-[2.35rem]"
              text="Nous avons créé notre conciergerie avec une idée simple : permettre aux propriétaires de profiter pleinement de leur investissement, sans avoir à gérer les contraintes du quotidien."
            />
            <TextReveal
              className="font-display text-[1.75rem] leading-[1.32] text-espresso sm:text-[2.35rem]"
              text="À travers notre complémentarité, notre sérieux et notre proximité, nous accompagnons chaque propriétaire comme s'il s'agissait de notre propre logement."
            />
          </div>
        </div>
      </section>

      {/* ───────── Valeurs ───────── */}
      <section aria-labelledby="valeurs-title" className="bg-porcelain pb-28 sm:pb-36">
        <div className="container-x">
          <h2 id="valeurs-title" className="sr-only">
            Nos valeurs
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {values.map((v, i) => (
              <motion.li
                key={v.title}
                initial={{ opacity: 0, y: 50, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1, delay: i * 0.1, ease }}
              >
                <article className="group relative h-full overflow-hidden rounded-[2rem] border border-hairline bg-cream p-8 transition-[transform,box-shadow] duration-700 hover:-translate-y-2 hover:shadow-[0_40px_70px_-40px_rgba(42,32,26,0.5)] sm:p-10">
                  <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-forest transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                  <div className="relative">
                    <span className="grid size-14 place-items-center rounded-2xl bg-porcelain text-caramel-deep transition-colors duration-500 group-hover:bg-porcelain/10 group-hover:text-sand">
                      <v.icon className="size-6" strokeWidth={1.4} />
                    </span>
                    <h3 className="mt-14 font-display text-4xl text-espresso transition-colors duration-500 group-hover:text-porcelain">{v.title}</h3>
                    <p className="mt-3 leading-relaxed text-taupe transition-colors duration-500 group-hover:text-mint-ink">{v.text}</p>
                  </div>
                </article>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Conclusion ───────── */}
      <section aria-labelledby="aventure-title" className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-forest py-28 text-porcelain sm:rounded-t-[3.5rem] sm:py-36">
        <div aria-hidden="true" className="absolute -right-32 -top-32 size-[30rem] rounded-full bg-caramel/25 blur-[110px]" />
        <div className="container-x relative text-center">
          <Reveal>
            <LogoMark className="mx-auto h-16 text-sand" />
          </Reveal>
          <h2 id="aventure-title" className="mx-auto mt-10 max-w-4xl font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.04]">
            <SplitWords text="Notre aventure commence aujourd'hui," className="block" stagger={0.04} />
            <SplitWords text="et nous sommes heureux de la construire avec vous." delay={0.25} stagger={0.04} className="block italic text-sand" />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-10 font-display text-xl italic text-mint-ink">— Les fondateurs de NOVESYA</p>
          </Reveal>
          <Reveal delay={0.4} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton href={formulesHref} variant="caramel" size="lg">
              Découvrir nos formules
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href="/#contact" variant="ghost-light" size="lg">
              Parlons de votre logement
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
