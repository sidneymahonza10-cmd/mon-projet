"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { whatsappHref } from "@/config/site";
import { cn } from "@/lib/cn";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-cream py-28 sm:rounded-t-[3.5rem] sm:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="faq-title" title="Vos questions," accent="nos réponses." description="Une autre question ? Nous vous répondons directement." />
          <div className="mt-8">
            <MagneticButton href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="ghost">
              Poser ma question sur WhatsApp
            </MagneticButton>
          </div>
        </div>
        <ul className="border-t border-hairline">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-hairline">
                <h3>
                  <button type="button" id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="group flex w-full items-center justify-between gap-6 py-6 text-left">
                    <span className={cn("font-display text-[1.45rem] leading-snug transition-all duration-500 sm:text-[1.75rem]", isOpen ? "italic text-caramel-deep" : "text-espresso group-hover:translate-x-1.5")}>{item.q}</span>
                    <span className={cn("grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-500", isOpen ? "rotate-[135deg] border-caramel bg-caramel text-porcelain" : "border-hairline group-hover:border-espresso")}>
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <motion.p initial={{ y: -10 }} animate={{ y: 0 }} className="max-w-[62ch] pb-7 pr-14 leading-relaxed text-taupe">
                        {item.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
