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
    <section aria-labelledby="temoignages-title" className="relative bg-sage-soft pb-28 sm:pb-36">
      <div className="container-x">
        <SectionHeading id="temoignages-title" title="Ils nous confient" accent="leur logement." />
        <Reveal
          className="relative mt-14 overflow-hidden rounded-[2.25rem] bg-porcelain p-8 shadow-[0_50px_90px_-60px_rgba(36,50,31,0.6)] sm:p-14 lg:p-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <span aria-hidden="true" className="pointer-events-none absolute -top-12 right-6 font-display text-[18rem] leading-none text-linen sm:right-14">
            &rdquo;
          </span>
          <div className="relative min-h-[16rem]" aria-roledescription="carrousel" aria-label="Témoignages">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure key={i} initial={{ opacity: 0, x: dir * 60, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: dir * -60, filter: "blur(8px)" }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} aria-roledescription="témoignage" aria-label={`${i + 1} sur ${n}`}>
                <div className="flex gap-1 text-caramel" aria-label="Note : 5 étoiles sur 5" role="img">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <motion.span key={k} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2 + k * 0.07, type: "spring", stiffness: 300, damping: 14 }}>
                      <Star className="size-5 fill-current" strokeWidth={0} />
                    </motion.span>
                  ))}
                </div>
                <blockquote className="mt-8 max-w-4xl font-display text-[1.8rem] leading-[1.22] text-espresso sm:text-4xl lg:text-[2.9rem]">« {t.quote} »</blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-taupe">
                  <span className="font-medium text-espresso">— {t.author}</span>
                  <span>{t.place}</span>
                  <span className="rounded-full border border-hairline px-2.5 py-1 text-[0.7rem]">Témoignage fictif, exemple à remplacer</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="relative mt-12 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, k) => (
                <button key={k} type="button" onClick={() => { setDir(k > i ? 1 : -1); setI(k); }} aria-label={`Afficher le témoignage ${k + 1}`} aria-current={k === i} className="grid h-6 place-items-center">
                  <span className={cn("block h-1 rounded-full transition-all duration-500", k === i ? "w-10 bg-caramel" : "w-4 bg-hairline hover:bg-dune")} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="Témoignage précédent" className="grid size-12 place-items-center rounded-full border border-hairline transition-colors hover:border-espresso hover:bg-espresso hover:text-porcelain">
                <ArrowLeft className="size-4" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Témoignage suivant" className="grid size-12 place-items-center rounded-full border border-hairline transition-colors hover:border-espresso hover:bg-espresso hover:text-porcelain">
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
