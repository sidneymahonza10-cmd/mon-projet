"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = testimonials.length;

  const go = (d: number) => {
    setDir(d);
    setI((x) => (x + d + n) % n);
  };

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reduce]);

  const t = testimonials[i];

  return (
    <section aria-labelledby="temoignages-title" className="relative z-10 -mt-8 rounded-t-[2rem] bg-ivory py-28 text-ink sm:-mt-10 sm:rounded-t-[2.75rem] sm:py-36">
      <div className="container-x">
        <SectionHeading id="temoignages-title" tone="light" title="Ils nous confient" accent="leur logement." />

        <Reveal
          className="relative mt-14 overflow-hidden rounded-[2rem] bg-paper p-8 shadow-[0_40px_80px_-50px_rgba(10,10,11,0.45)] sm:p-14 lg:p-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <span aria-hidden="true" className="pointer-events-none absolute -top-10 right-6 font-display text-[16rem] leading-none text-champagne/60 sm:right-14">
            &rdquo;
          </span>
          <div className="relative" aria-roledescription="carrousel" aria-label="Témoignages">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: dir * -40, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                aria-roledescription="témoignage"
                aria-label={`${i + 1} sur ${n}`}
              >
                <div className="flex gap-1 text-gold-deep" aria-label="Note : 5 étoiles sur 5" role="img">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-4 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-8 max-w-4xl font-display text-[1.75rem] leading-[1.25] sm:text-4xl lg:text-[2.75rem]">
                  « {t.quote} »
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-stone">
                  <span className="font-medium text-ink">— {t.author}</span>
                  <span>{t.place}</span>
                  <span className="rounded-full border border-line-light px-2.5 py-1 text-[0.7rem]">Témoignage fictif — exemple à remplacer</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="relative mt-12 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    setDir(k > i ? 1 : -1);
                    setI(k);
                  }}
                  aria-label={`Afficher le témoignage ${k + 1}`}
                  aria-current={k === i}
                  className="grid h-6 place-items-center"
                >
                  <span className={cn("block h-1 rounded-full transition-all duration-500", k === i ? "w-10 bg-ink" : "w-4 bg-line-light hover:bg-sand")} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="Témoignage précédent" className="grid size-12 place-items-center rounded-full border border-line-light transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                <ArrowLeft className="size-4" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Témoignage suivant" className="grid size-12 place-items-center rounded-full border border-line-light transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
