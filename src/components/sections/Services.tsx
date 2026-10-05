"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Aperture,
  ArrowLeft,
  ArrowRight,
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

/**
 * Carrousel horizontal libre : le visiteur fait défiler les cartes de gauche à droite
 * (glisser à la souris, au doigt, trackpad ou flèches) sans bloquer le défilement vertical de la page.
 */
export function Services() {
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const update = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  };

  return (
    <section id="services" aria-labelledby="services-title" className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-cream py-28 sm:rounded-t-[3.5rem] sm:py-36">
      <div className="container-x flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading id="services-title" title="Tout ce que votre logement" accent="mérite." description="Huit expertises, un seul interlocuteur. Faites défiler les cartes pour les découvrir." />
        <div className="flex items-center gap-4">
          <div className="hidden h-px w-40 bg-hairline sm:block" aria-hidden="true">
            <div className="h-px origin-left bg-caramel transition-transform duration-300" style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
          </div>
          <button type="button" onClick={() => scrollByCard(-1)} disabled={edges.start} aria-label="Services précédents" className="grid size-12 place-items-center rounded-full border border-hairline bg-porcelain text-espresso transition-colors hover:border-espresso hover:bg-espresso hover:text-porcelain disabled:opacity-35 disabled:hover:bg-porcelain disabled:hover:text-espresso">
            <ArrowLeft className="size-4" />
          </button>
          <button type="button" onClick={() => scrollByCard(1)} disabled={edges.end} aria-label="Services suivants" className="grid size-12 place-items-center rounded-full border border-hairline bg-porcelain text-espresso transition-colors hover:border-espresso hover:bg-espresso hover:text-porcelain disabled:opacity-35 disabled:hover:bg-porcelain disabled:hover:text-espresso">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={update}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          if (!drag.current || !track.current) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 4) drag.current.moved = true;
          track.current.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => (drag.current = null)}
        onClickCapture={(e) => {
          if (drag.current?.moved) e.preventDefault();
        }}
        aria-label="Nos services"
        data-lenis-prevent-horizontal
        className="mt-14 flex gap-5 overflow-x-auto overscroll-x-contain px-[max(1.25rem,calc((100vw-86rem)/2+3rem))] pb-6 [scrollbar-width:none] active:cursor-grabbing sm:cursor-grab [&::-webkit-scrollbar]:hidden"
        style={{ scrollPaddingInline: "max(1.25rem, calc((100vw - 86rem) / 2 + 3rem))" }}
      >
        {services.map((s, i) => (
          <motion.li
            key={s.key}
            className="w-[76vw] shrink-0 select-none sm:w-[22rem]"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: Math.min(i, 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <ServiceCard s={s} i={i} />
          </motion.li>
        ))}
      </ul>
      <p className="container-x text-xs tracking-[0.2em] text-taupe sm:hidden" aria-hidden="true">
        ← FAITES GLISSER →
      </p>
    </section>
  );
}
