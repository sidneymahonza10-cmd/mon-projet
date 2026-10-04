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
    <section id="faq" aria-labelledby="faq-title" className="bg-ivory pb-36 text-ink">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" tone="light" title="Vos questions," accent="nos réponses." description="Une autre question ? Nous vous répondons directement." />
          <div className="mt-8">
            <MagneticButton href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="ghost-light">
              Poser ma question sur WhatsApp
            </MagneticButton>
          </div>
        </div>

        <ul className="border-t border-line-light">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-line-light">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={cn("font-display text-[1.4rem] leading-snug transition-colors sm:text-[1.65rem]", isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink")}>
                      {item.q}
                    </span>
                    <span className={cn("grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500", isOpen ? "rotate-45 border-ink bg-ink text-paper" : "border-line-light group-hover:border-ink")}>
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-7 pr-14 leading-relaxed text-stone">{item.a}</p>
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
