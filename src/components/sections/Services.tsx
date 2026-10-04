"use client";

import { motion } from "framer-motion";
import {
  Aperture,
  BadgeEuro,
  BarChart3,
  Camera,
  DoorOpen,
  FileText,
  House,
  KeyRound,
  MessageCircle,
  MessagesSquare,
  PenLine,
  ShieldCheck,
  Shirt,
  Sparkles,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { services, type ServiceKey } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

/** Chaque service a deux icônes : l'une est remplacée par l'autre au survol */
const icons: Record<ServiceKey, [LucideIcon, LucideIcon]> = {
  airbnb: [House, PenLine],
  guests: [MessageCircle, MessagesSquare],
  pricing: [TrendingUp, BadgeEuro],
  checkin: [KeyRound, DoorOpen],
  cleaning: [Shirt, Sparkles],
  maintenance: [Wrench, ShieldCheck],
  shooting: [Camera, Aperture],
  reporting: [BarChart3, FileText],
};

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative z-10 -mt-8 rounded-t-[2rem] bg-ivory py-28 text-ink sm:-mt-10 sm:rounded-t-[2.75rem] sm:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            tone="light"
            title="Tout ce que votre logement"
            accent="mérite."
            description="Huit expertises, un seul interlocuteur. Choisissez votre niveau d'accompagnement, nous orchestrons le reste."
          />
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const [A, B] = icons[s.key];
            return (
              <motion.li
                key={s.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.8, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard
                  className="h-full rounded-[1.5rem] border border-line-light bg-paper shadow-[0_1px_0_rgba(10,10,11,0.03)] transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-sand hover:shadow-[0_30px_60px_-30px_rgba(10,10,11,0.35)]"
                  glow="rgba(193,154,91,0.14)"
                >
                  <article className="relative z-10 flex h-full flex-col p-7">
                    <div className="relative size-12 overflow-hidden rounded-full border border-line-light bg-ivory text-gold-deep transition-colors duration-500 group-hover/tilt:border-gold group-hover/tilt:bg-ink group-hover/tilt:text-gold-soft">
                      <A className="absolute inset-0 m-auto size-5 transition-all duration-500 group-hover/tilt:-translate-y-8 group-hover/tilt:opacity-0" strokeWidth={1.5} />
                      <B className="absolute inset-0 m-auto size-5 translate-y-8 opacity-0 transition-all duration-500 group-hover/tilt:translate-y-0 group-hover/tilt:opacity-100" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-10 font-display text-[1.6rem] leading-tight">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-stone">{s.text}</p>
                  </article>
                </TiltCard>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
