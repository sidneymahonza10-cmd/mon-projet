"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { departments, towns, type Department } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";

type DeptId = Department["id"];

/** Zone d'intervention : le logo NOVESYA posé sur les villes couvertes (77 sud, 91, 94). */
export function MapSection() {
  const [active, setActive] = useState<DeptId>("91");
  const dept = departments.find((d) => d.id === active)!;
  const list = towns.filter((t) => t.dept === active);

  return (
    <section aria-labelledby="zone-title" className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-sage-soft py-28 sm:rounded-t-[3.5rem] sm:py-36">
      <div className="container-x">
        <SectionHeading id="zone-title" title="Où nous" accent="intervenons." description="NOVESYA est implantée au sud de Paris : en Essonne, dans le sud de la Seine-et-Marne et dans le Val-de-Marne proche de l'Essonne." />

        <Reveal className="mt-14 grid gap-5 lg:grid-cols-[1.55fr_1fr]" y={50}>
          <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-hairline bg-porcelain">
            <ZoneMap active={active} onSelect={setActive} />
            {towns.map((t, i) => {
              const on = t.dept === active;
              return (
                <motion.button
                  key={t.name}
                  type="button"
                  onClick={() => setActive(t.dept)}
                  aria-label={`${t.name} (${t.dept})`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${t.x}%`, top: `${t.y}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 320, damping: 16 }}
                >
                  {on && <span aria-hidden="true" className="absolute inset-0 rounded-full bg-caramel/40 animate-ping-soft" />}
                  <span className={cn("relative grid place-items-center rounded-full border shadow-[0_8px_20px_-8px_rgba(42,32,26,0.55)] transition-all duration-500", on ? "size-7 border-caramel bg-espresso text-sand sm:size-10" : "size-5 border-hairline bg-porcelain text-caramel sm:size-7")}>
                    <LogoMark className={on ? "h-4 sm:h-5" : "h-3 sm:h-3.5"} />
                  </span>
                  <span className={cn("pointer-events-none absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[0.68rem] font-medium transition-opacity duration-300 sm:block", on ? "bg-porcelain/95 text-espresso opacity-100" : "text-taupe opacity-0 group-hover:opacity-100")}>
                    {t.name}
                  </span>
                </motion.button>
              );
            })}
            <span className="absolute left-4 top-4 hidden items-center gap-2 rounded-full bg-porcelain/90 px-3 py-1.5 text-[0.7rem] text-taupe shadow-sm sm:flex">
              <LogoMark className="h-3.5 text-caramel" /> Villes où NOVESYA intervient
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div role="tablist" aria-label="Départements" className="grid grid-cols-3 gap-2">
              {departments.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={d.id === active}
                  onClick={() => setActive(d.id)}
                  className={cn("relative rounded-2xl border px-3 py-4 text-left transition-colors duration-300", d.id === active ? "border-espresso text-porcelain" : "border-hairline bg-porcelain text-espresso hover:border-dune")}
                >
                  {d.id === active && <motion.span layoutId="dept-pill" className="absolute inset-0 rounded-2xl bg-espresso" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative block font-display text-3xl leading-none">{d.id}</span>
                  <span className={cn("relative mt-1 block text-xs", d.id === active ? "text-sand" : "text-taupe")}>{d.name}</span>
                </button>
              ))}
            </div>

            <div className="relative flex-1 overflow-hidden rounded-[2rem] bg-porcelain p-7 shadow-[0_40px_80px_-60px_rgba(42,32,26,0.6)]" role="tabpanel" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                  <p className="text-sm text-caramel-deep">{dept.detail}</p>
                  <h3 className="mt-1 font-display text-4xl text-espresso">
                    {dept.name} <span className="text-dune">· {dept.id}</span>
                  </h3>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {list.map((t, i) => (
                      <motion.li key={t.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.05 }} className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-sm text-espresso">
                        <MapPin className="size-3.5 text-caramel" /> {t.name}
                      </motion.li>
                    ))}
                    <li className="rounded-full border border-dashed border-dune px-3 py-1.5 text-sm text-taupe">et communes voisines</li>
                  </ul>
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 border-t border-hairline pt-6">
                <p className="text-taupe">Votre logement se situe dans la zone, ou juste à côté ?</p>
                <MagneticButton href="#contact" variant="primary" className="mt-4">
                  Parlons-en
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Carte stylisée (tracés simplifiés, non cartographiques). */
function ZoneMap({ active, onSelect }: { active: DeptId; onSelect: (d: DeptId) => void }) {
  const fill = (id: DeptId, base: string, on: string) => (id === active ? on : base);
  const regions: { id: DeptId; d: string; base: string; on: string }[] = [
    { id: "94", d: "M150 0h330l-20 70-80 30-90-10-90 20-60-30Z", base: "#e7e9df", on: "#d3dac8" },
    { id: "91", d: "M90 85l60-5 90 10 90-10 80-20 30 70 20 100-40 60-30 90-50 80-120 70-110-10-60-90 20-120-40-90Z", base: "#f1eadf", on: "#e6d6bb" },
    { id: "77", d: "M460 70l120-40 140 30 80 60v420H560l-80-60-40-110 30-90 20-110Z", base: "#f3ede3", on: "#e6d6bb" },
  ];
  return (
    <svg viewBox="0 0 800 550" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#dcc9a8" />
        </pattern>
      </defs>
      <rect width="800" height="550" fill="#f6f1e9" />
      <rect width="800" height="550" fill="url(#dots)" opacity="0.6" />
      {regions.map((r) => (
        <path
          key={r.id}
          d={r.d}
          fill={fill(r.id, r.base, r.on)}
          stroke={r.id === active ? "#8a5d28" : "#c7ae86"}
          strokeWidth={r.id === active ? 2.5 : 1.2}
          onClick={() => onSelect(r.id)}
          style={{ cursor: "pointer", transition: "fill .5s, stroke .5s" }}
        />
      ))}
      <path d="M480 330c40-30 110-25 130 10s-20 70-70 70-90-50-60-80Z" fill="#dfe3d6" opacity="0.8" />
      <path d="M800 380C760 390 735 395 720 390S640 340 600 300 520 250 490 248 400 200 345 182 300 160 275 150 290 90 300 55 320 20 330 0" fill="none" stroke="#c9dde0" strokeWidth="14" strokeLinecap="round" />
      <g fontFamily="var(--font-sans)" fontSize="13" letterSpacing="3" fill="#6b5f55">
        <text x="360" y="36">VAL-DE-MARNE · 94</text>
        <text x="110" y="420">ESSONNE · 91</text>
        <text x="560" y="130">SEINE-ET-MARNE SUD · 77</text>
      </g>
      <text x="300" y="16" fontFamily="var(--font-sans)" fontSize="11" fill="#6b5f55">
        ↑ Paris
      </text>
      <text x="530" y="380" fontFamily="var(--font-display)" fontStyle="italic" fontSize="14" fill="#6f7e66">
        Forêt de Fontainebleau
      </text>
      <text x="292" y="120" fontFamily="var(--font-display)" fontStyle="italic" fontSize="13" fill="#7fa3aa" transform="rotate(-70 292 120)">
        La Seine
      </text>
    </svg>
  );
}
