"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { plans } from "@/data/content";
import { formulesHref } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/cn";

/** Aperçu des deux formules — sans tarifs : la présentation se fait en privé. */
export function Formulas() {
  return (
    <section id="formules" aria-labelledby="formules-title" className="relative bg-cream py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading id="formules-title" align="center" title="Deux formules." accent="Une même exigence." description="Choisissez votre niveau d'accompagnement. Nos conditions vous sont présentées personnellement, en fonction de votre logement." />

        <div className="mx-auto mt-16 grid max-w-5xl items-stretch gap-6 lg:grid-cols-2">
          {plans.map((plan, i) => {
            const premium = plan.featured;
            return (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 60, rotate: premium ? 2 : -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }} className={cn(premium && "lg:-my-6")}>
                <TiltCard
                  max={4}
                  glow={premium ? "rgba(220,201,168,0.18)" : "rgba(184,135,74,0.14)"}
                  className={cn("h-full overflow-hidden rounded-[2.25rem]", premium ? "bg-forest text-porcelain shadow-[0_60px_110px_-50px_rgba(36,50,31,0.85)]" : "border border-hairline bg-porcelain shadow-[0_40px_80px_-60px_rgba(42,32,26,0.5)]")}
                >
                  <article className="relative z-10 flex h-full flex-col p-6 min-[380px]:p-8 sm:p-11">
                    {premium && (
                      <span className="absolute right-7 top-7 whitespace-nowrap rounded-full bg-caramel-strong px-3.5 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] text-porcelain sm:right-9 sm:top-9">LA PLUS CHOISIE</span>
                    )}
                    <p className={cn("text-[0.75rem] font-medium tracking-[0.22em]", premium ? "text-sand" : "text-caramel-deep")}>FORMULE {plan.code}</p>
                    <h3 className="mt-3 font-display text-[2.6rem] min-[380px]:text-5xl sm:text-6xl">{plan.name}</h3>
                    <p className={cn("mt-4 max-w-xs text-lg", premium ? "text-mint-ink" : "text-taupe")}>{plan.pitch}</p>

                    {plan.intro && <p className="mt-8 font-medium text-sand">{plan.intro}</p>}
                    <ul className={cn("space-y-3.5 border-t pt-6", plan.intro ? "mt-4" : "mt-8", premium ? "border-porcelain/15" : "border-hairline")}>
                      {plan.features.map((f, k) => (
                        <motion.li key={f} className="flex items-start gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + k * 0.05 }}>
                          <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", premium ? "bg-caramel text-porcelain" : "bg-espresso text-porcelain")}>
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                          <span className={premium ? "text-porcelain/90" : "text-espresso/85"}>{f}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-10">
                      <TextLink href={`${formulesHref}#${plan.id}`} tone={premium ? "light" : "dark"}>
                        Voir le détail de la formule {plan.name}
                      </TextLink>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
