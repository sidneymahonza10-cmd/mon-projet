"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BedDouble, MapPin, TrendingUp, Users } from "lucide-react";
import { properties } from "@/data/content";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * Carte stylisée de la zone d'intervention.
 * PLACEHOLDER : le fond est une illustration ; les logements viennent de src/data/content.ts.
 * Pour une vraie carte, ce composant peut être remplacé par Mapbox / Leaflet en gardant les mêmes données.
 */
export function MapSection() {
  const [selected, setSelected] = useState(properties[0].id);
  const p = properties.find((x) => x.id === selected) ?? properties[0];

  return (
    <section aria-labelledby="zone-title" className="relative z-10 -mt-8 overflow-hidden rounded-t-[2rem] bg-night py-28 sm:-mt-10 sm:rounded-t-[2.75rem] sm:py-36">
      <div className="container-x">
        <SectionHeading
          id="zone-title"
          title="Notre zone"
          accent="d'intervention."
          description={`${site.zone.label} — sélectionnez un logement pour découvrir son profil. Logements présentés à titre d'exemple.`}
        />

        <Reveal className="mt-14 grid gap-5 lg:grid-cols-[1.55fr_1fr]" y={40}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line-dark bg-[#121214] sm:aspect-[16/11]">
            <CityIllustration />
            <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 text-[0.7rem] text-mist backdrop-blur-md">
              Zone à personnaliser
            </span>

            {properties.map((prop) => {
              const on = prop.id === selected;
              return (
                <button
                  key={prop.id}
                  type="button"
                  onClick={() => setSelected(prop.id)}
                  aria-pressed={on}
                  aria-label={`${prop.name}, ${prop.type}, ${prop.area}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 p-3"
                  style={{ left: `${prop.x}%`, top: `${prop.y}%` }}
                >
                  <span className={cn("absolute inset-0 m-auto size-5 rounded-full bg-gold/50", on ? "animate-ping-soft" : "hidden")} />
                  <span
                    className={cn(
                      "relative flex items-center gap-2 rounded-full border transition-all duration-500",
                      on ? "border-gold bg-gold px-3 py-1.5 text-ink" : "border-paper/30 bg-ink/80 p-1.5 text-paper hover:border-gold hover:bg-ink",
                    )}
                  >
                    <MapPin className="size-3.5" />
                    {on && <span className="whitespace-nowrap text-xs font-medium">{prop.name}</span>}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[26rem] overflow-hidden rounded-[1.75rem] border border-line-dark bg-anthracite/60" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full flex-col"
              >
                <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  <SmartImage src={p.image} alt={`${p.name} — photo d'exemple`} className="aspect-[16/10] w-full" />
                </motion.div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-sm text-smoke">{p.area}</p>
                  <h3 className="mt-1 font-display text-3xl text-paper">{p.name}</h3>
                  <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
                    <div className="rounded-xl border border-line-dark p-3">
                      <dt className="sr-only">Type</dt>
                      <dd className="text-paper">{p.type}</dd>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-line-dark p-3 text-paper">
                      <Users className="size-4 text-gold" />
                      <dt className="sr-only">Voyageurs</dt>
                      <dd>{p.guests} pers.</dd>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-line-dark p-3 text-paper">
                      <BedDouble className="size-4 text-gold" />
                      <dt className="sr-only">Chambres</dt>
                      <dd>{p.bedrooms === 0 ? "Studio" : `${p.bedrooms} ch.`}</dd>
                    </div>
                  </dl>
                  <p className="mt-auto flex items-center gap-2 pt-6 text-gold-soft">
                    <TrendingUp className="size-4" /> {p.performance}
                  </p>
                  <p className="mt-1 text-xs text-smoke">Performance indicative — exemple non contractuel.</p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CityIllustration() {
  return (
    <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="map-glow" cx="50%" cy="48%" r="45%">
          <stop offset="0%" stopColor="#c19a5b" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#c19a5b" stopOpacity="0" />
        </radialGradient>
        <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#1f2024" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="550" fill="url(#map-grid)" />
      {/* Parcs */}
      <path d="M90 90c40-30 120-20 140 20s-10 80-60 85-110-60-80-105Z" fill="#1a1d1a" />
      <path d="M560 380c50-20 130 0 140 40s-60 70-110 60-80-80-30-100Z" fill="#1a1d1a" />
      {/* Rivière */}
      <path d="M-20 360C120 330 200 420 330 390S520 250 640 270 760 360 830 330" fill="none" stroke="#1d2328" strokeWidth="34" strokeLinecap="round" />
      <path d="M-20 360C120 330 200 420 330 390S520 250 640 270 760 360 830 330" fill="none" stroke="#232b31" strokeWidth="2" strokeDasharray="2 10" />
      {/* Grands axes */}
      <g stroke="#2a2b30" strokeWidth="3" fill="none">
        <path d="M0 230 800 180" />
        <path d="M380 0 420 550" />
        <path d="M120 550 640 0" />
        <path d="M0 470C200 440 300 480 800 450" />
      </g>
      <g stroke="#232428" strokeWidth="1.5" fill="none">
        <path d="M0 140 800 120M0 300 800 280M220 0 260 550M560 0 600 550M0 60 800 40" />
      </g>
      <ellipse cx="400" cy="270" rx="260" ry="200" fill="url(#map-glow)" />
      <ellipse cx="400" cy="270" rx="300" ry="215" fill="none" stroke="#c19a5b" strokeOpacity="0.35" strokeDasharray="4 8" />
    </svg>
  );
}
