"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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
import { cn } from "@/lib/cn";

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

const surfaces = ["bg-porcelain", "bg-sage-soft", "bg-porcelain", "bg-linen", "bg-porcelain", "bg-sage-soft", "bg-porcelain", "bg-linen"];

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const [A, B] = icons[s.key];
  return (
    <TiltCard className={cn("h-full rounded-[2rem] border border-hairline transition-shadow duration-500 hover:shadow-[0_40px_70px_-40px_rgba(42,32,26,0.45)]", surfaces[i])} max={6}>
      <article className="relative z-10 flex h-full min-h-[22rem] flex-col p-8">
        <div className="relative size-14 overflow-hidden rounded-2xl bg-espresso text-sand transition-colors duration-500 group-hover/tilt:bg-caramel group-hover/tilt:text-porcelain">
          <A className="absolute inset-0 m-auto size-6 transition-all duration-500 group-hover/tilt:-translate-y-10 group-hover/tilt:opacity-0" strokeWidth={1.5} />
          <B className="absolute inset-0 m-auto size-6 translate-y-10 opacity-0 transition-all duration-500 group-hover/tilt:translate-y-0 group-hover/tilt:opacity-100" strokeWidth={1.5} />
        </div>
        <h3 className="mt-auto pt-16 font-display text-[2rem] leading-[1.05] text-espresso">{s.title}</h3>
        <p className="mt-3 leading-relaxed text-taupe">{s.text}</p>
        <span className="mt-6 h-px w-10 bg-caramel transition-all duration-700 group-hover/tilt:w-full" />
      </article>
    </TiltCard>
  );
}

/** Desktop : galerie horizontale épinglée pilotée par le scroll. Mobile : cartes empilées. */
export function Services() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const track = useRef<HTMLUListElement>(null);
  const [shift, setShift] = useState(0);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setShift(Math.max(0, el.scrollWidth - window.innerWidth + 48));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const x = useTransform(p, [0.05, 0.95], [0, -shift]);
  const bar = useTransform(p, [0.05, 0.95], [0, 1]);

  return (
    <section id="services" ref={ref} aria-labelledby="services-title" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-cream sm:rounded-t-[3.5rem] lg:h-[300vh]">
      <div className="py-28 sm:py-32 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
        <div className="container-x flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="services-title" title="Tout ce que votre logement" accent="mérite." description="Huit expertises, un seul interlocuteur." />
          <div className="hidden w-56 lg:block" aria-hidden="true">
            <div className="h-px w-full bg-hairline">
              <motion.div className="h-px origin-left bg-caramel" style={{ scaleX: bar }} />
            </div>
            <p className="mt-3 text-right text-xs tracking-[0.2em] text-taupe">FAITES DÉFILER →</p>
          </div>
        </div>

        {/* Desktop */}
        <div className="mt-14 hidden lg:block">
          <motion.ul ref={track} style={{ x }} className="flex w-max gap-5 pl-[max(3rem,calc((100vw-86rem)/2+3rem))]">
            {services.map((s, i) => (
              <li key={s.key} className="w-[24rem]">
                <ServiceCard s={s} i={i} />
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Mobile / tablette */}
        <ul className="container-x mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
          {services.map((s, i) => (
            <motion.li key={s.key} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <ServiceCard s={s} i={i} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
