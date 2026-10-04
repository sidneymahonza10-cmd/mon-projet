"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { plans } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/cn";

export function Pricing() {
  return (
    <section id="tarifs" aria-labelledby="tarifs-title" className="relative z-10 -mt-8 rounded-t-[2rem] bg-ivory py-28 text-ink sm:-mt-10 sm:rounded-t-[2.75rem] sm:py-36">
      <div className="container-x">
        <SectionHeading
          id="tarifs-title"
          tone="light"
          align="center"
          title="Deux formules."
          accent="Aucun abonnement."
          description="Une commission sur les revenus générés par les réservations : nous gagnons lorsque votre logement performe."
        />

        <div className="mx-auto mt-16 grid max-w-5xl items-center gap-6 lg:grid-cols-[1fr_1.08fr]">
          {plans.map((plan, i) => {
            const premium = plan.featured;
            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[2rem] transition-shadow duration-500",
                  premium
                    ? "order-first bg-ink p-8 text-paper shadow-[0_50px_100px_-40px_rgba(10,10,11,0.7)] hover:shadow-[0_60px_120px_-40px_rgba(10,10,11,0.85)] sm:p-11 lg:order-none lg:py-14"
                    : "border border-line-light bg-paper p-8 shadow-[0_30px_60px_-45px_rgba(10,10,11,0.4)] hover:shadow-[0_40px_80px_-40px_rgba(10,10,11,0.45)] sm:p-10",
                )}
              >
                {premium && (
                  <>
                    <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(circle, rgba(193,154,91,0.35), transparent 65%)" }} />
                    <span className="absolute right-6 top-6 rounded-full bg-gold px-3.5 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] text-ink sm:right-8 sm:top-8">
                      LA PLUS CHOISIE
                    </span>
                  </>
                )}

                <div className="relative">
                  <p className={cn("text-[0.75rem] font-medium tracking-[0.2em]", premium ? "text-gold-soft" : "text-gold-deep")}>FORMULE {plan.code}</p>
                  <h3 className="mt-3 font-display text-4xl sm:text-5xl">{plan.name}</h3>
                  <p className={cn("mt-3 max-w-xs", premium ? "text-mist" : "text-stone")}>{plan.pitch}</p>

                  <div className={cn("mt-8 flex items-end gap-3 border-y py-6", premium ? "border-line-dark" : "border-line-light")}>
                    <Counter value={plan.rate} suffix=" %" duration={1.2} className="font-display text-7xl leading-none sm:text-8xl" />
                    <span className={cn("pb-2 text-sm leading-snug", premium ? "text-mist" : "text-stone")}>
                      de commission
                      <br />
                      sur les revenus générés
                    </span>
                  </div>

                  {plan.intro && <p className="mt-6 font-medium text-gold-soft">{plan.intro}</p>}
                  <ul className={cn("space-y-3.5", plan.intro ? "mt-4" : "mt-6")}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", premium ? "bg-gold text-ink" : "bg-ink text-paper")}>
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span className={premium ? "text-paper/90" : "text-ink/85"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <MagneticButton href="#contact" variant={premium ? "gold" : "dark"} size="lg" className="w-full" strength={0.12}>
                      {plan.cta}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </MagneticButton>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
