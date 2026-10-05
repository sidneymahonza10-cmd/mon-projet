"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, LineChart, RotateCcw } from "lucide-react";
import { estimate, PROPERTY_TYPES, type EstimateInput, type EstimateResult } from "@/lib/estimate";
import { Counter } from "@/components/ui/Counter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Stepper } from "@/components/ui/Stepper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;
const eur = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} €`;

const initial: EstimateInput = { city: "", type: "Appartement", bedrooms: 2, guests: 4, surface: 55, price: 110, nights: 26 };

export function Calculator() {
  const [form, setForm] = useState<EstimateInput>(initial);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [more, setMore] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const set = <K extends keyof EstimateInput>(k: K, v: EstimateInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.city.trim()) {
      setError("Indiquez la ville de votre logement pour lancer l'estimation.");
      document.getElementById(`${uid}-city`)?.focus();
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    window.setTimeout(() => {
      setResult(estimate(form));
      setLoading(false);
    }, 1100);
  }

  useEffect(() => {
    if ((loading || result) && window.innerWidth < 1024) resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [loading, result]);

  return (
    <section id="estimation" data-cursor-house aria-labelledby="estimation-title" className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-linen py-28 sm:rounded-t-[3.5rem] sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 size-[36rem] rounded-full bg-sand/50 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading id="estimation-title" title="Combien votre logement" accent="pourrait-il vous rapporter ?" description="Renseignez quelques informations. Notre simulateur projette vos revenus avec une gestion optimisée NOVESYA." />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <form onSubmit={submit} noValidate className="rounded-[2rem] border border-hairline bg-porcelain p-5 shadow-[0_40px_80px_-60px_rgba(42,32,26,0.5)] sm:p-8" aria-describedby={`${uid}-note`}>
              <div className="space-y-6">
                <div>
                  <label htmlFor={`${uid}-city`} className="mb-2 block text-sm text-taupe">
                    Ville
                  </label>
                  <input
                    id={`${uid}-city`}
                    className="field"
                    placeholder="Ex. Évry-Courcouronnes"
                    autoComplete="address-level2"
                    value={form.city}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? `${uid}-err` : undefined}
                    onChange={(e) => {
                      set("city", e.target.value);
                      if (error) setError(null);
                    }}
                  />
                  {error && (
                    <p id={`${uid}-err`} role="alert" className="mt-2 text-sm text-[#a2432f]">
                      {error}
                    </p>
                  )}
                </div>

                <fieldset>
                  <legend className="mb-2 block text-sm text-taupe">Type de logement</legend>
                  <div className="flex flex-wrap gap-2">
                    {PROPERTY_TYPES.map((t) => (
                      <label
                        key={t}
                        className={cn(
                          "relative cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-caramel-deep",
                          form.type === t ? "border-espresso text-porcelain" : "border-hairline text-espresso hover:border-dune",
                        )}
                      >
                        {form.type === t && <motion.span layoutId="type-pill" className="absolute inset-0 -z-0 rounded-full bg-espresso" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                        <input type="radio" name="type" value={t} checked={form.type === t} onChange={() => set("type", t)} className="sr-only" />
                        <span className="relative">{t}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid grid-cols-2 gap-4">
                  <Stepper id={`${uid}-bed`} label="Chambres" value={form.bedrooms} min={0} max={8} onChange={(v) => set("bedrooms", v)} format={(v) => (v === 0 ? "Studio" : String(v))} />
                  <div className={cn(!more && "hidden sm:block")}>
                    <Stepper id={`${uid}-guests`} label="Voyageurs" value={form.guests} min={1} max={16} onChange={(v) => set("guests", v)} />
                  </div>
                  <div className={cn(!more && "hidden sm:block", "col-span-2 sm:col-span-1")}>
                    <label htmlFor={`${uid}-surface`} className="mb-2 block text-sm text-taupe">
                      Surface (m²)
                    </label>
                    <input id={`${uid}-surface`} type="number" inputMode="numeric" min={9} max={600} className="field num" value={form.surface || ""} onChange={(e) => set("surface", Number(e.target.value))} />
                  </div>
                </div>

                <button type="button" onClick={() => setMore((m) => !m)} aria-expanded={more} className="-mt-2 inline-flex items-center gap-1.5 text-sm text-caramel-deep sm:hidden">
                  {more ? "Moins d'options" : "Affiner (voyageurs, surface)"}
                  <ChevronDown className={cn("size-4 transition-transform", more && "rotate-180")} />
                </button>

                <RangeField id={`${uid}-price`} label="Prix actuel par nuit" value={form.price} min={30} max={600} step={5} display={eur(form.price)} onChange={(v) => set("price", v)} />
                <RangeField id={`${uid}-nights`} label="Nuits disponibles par mois" value={form.nights} min={5} max={31} step={1} display={`${form.nights} nuits`} onChange={(v) => set("nights", v)} />
              </div>

              <div className="mt-9">
                <MagneticButton type="submit" variant="primary" size="lg" className="w-full" disabled={loading} strength={0.12}>
                  {loading ? "Analyse en cours…" : "Calculer mon potentiel"}
                  {!loading && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
                </MagneticButton>
                <p id={`${uid}-note`} className="mt-4 text-center text-xs text-taupe">
                  Estimation indicative basée sur les informations renseignées.
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <div ref={resultsRef} aria-live="polite" className="grain relative h-full min-h-[34rem] overflow-hidden rounded-[2rem] bg-forest p-5 text-porcelain shadow-[0_60px_100px_-60px_rgba(36,50,31,0.9)] sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-caramel/30 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm text-mint-ink">
                  <LineChart className="size-4 text-sand" /> Projection NOVESYA
                </p>
                {result && (
                  <button type="button" onClick={() => setResult(null)} className="inline-flex items-center gap-1.5 text-xs text-mint-ink transition-colors hover:text-porcelain">
                    <RotateCcw className="size-3.5" /> Réinitialiser
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {!result && !loading && (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative flex min-h-[30rem] flex-col justify-center">
                    <GhostChart />
                    <p className="mt-8 font-display text-3xl">Vos résultats apparaîtront ici.</p>
                    <p className="mt-2 max-w-sm text-mint-ink">Revenus mensuels, taux d&apos;occupation, revenus annuels et gain potentiel, en quelques secondes.</p>
                  </motion.div>
                )}
                {loading && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative flex min-h-[30rem] flex-col items-center justify-center gap-6">
                    <motion.div animate={{ y: [0, -10, 0], rotate: [0, -4, 4, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="grid size-20 place-items-center rounded-3xl bg-porcelain/10 text-sand">
                      <LogoMark className="h-10" />
                    </motion.div>
                    <p className="text-sm text-mint-ink">Analyse de la demande et de la saisonnalité…</p>
                  </motion.div>
                )}
                {result && !loading && <Results key="result" r={result} />}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RangeField({ id, label, value, min, max, step, display, onChange }: { id: string; label: string; value: number; min: number; max: number; step: number; display: string; onChange: (v: number) => void }) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm text-taupe">
          {label}
        </label>
        <span className="num font-display text-2xl text-espresso">{display}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="range" style={{ "--fill": `${fill}%` } as React.CSSProperties} aria-valuetext={display} />
    </div>
  );
}

function Results({ r }: { r: EstimateResult }) {
  const kpis = [
    { label: "Revenus mensuels estimés", value: r.monthly, suffix: " €", big: true },
    { label: "Taux d'occupation estimé", value: r.occupancy, suffix: " %" },
    { label: "Revenus annuels potentiels", value: r.annual, suffix: " €" },
    { label: "Revenus supplémentaires potentiels / an", value: r.extraAnnual, prefix: "+", suffix: " €", accent: true },
  ];
  const max = Math.max(...r.months.map((m) => m.optimized));

  return (
    <motion.div initial="hidden" animate="show" exit={{ opacity: 0 }} variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="relative mt-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {kpis.map((k) => (
          <motion.div
            key={k.label}
            variants={{ hidden: { opacity: 0, y: 18, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } } }}
            className={cn("rounded-2xl border p-4 sm:p-5", k.big ? "col-span-2 border-sand/30 bg-porcelain/10 sm:col-span-3" : k.accent ? "col-span-2 border-porcelain/10 bg-porcelain/[0.05] sm:col-span-1" : "border-porcelain/10 bg-porcelain/[0.05]")}
          >
            <p className="text-xs leading-snug text-mint-ink sm:text-sm">{k.label}</p>
            <Counter value={k.value} prefix={k.prefix} suffix={k.suffix} className={cn("mt-2 block font-display leading-none", k.big ? "text-5xl sm:text-6xl" : "text-2xl sm:text-3xl", k.accent ? "text-sand" : "text-porcelain")} />
          </motion.div>
        ))}
      </div>

      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }} className="mt-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-mint-ink">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-sm bg-sand" /> Avec NOVESYA
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 border-t border-dashed border-porcelain/70" /> Gestion actuelle (hypothèse)
          </span>
        </div>
        <div className="relative flex h-40 items-end gap-1.5 sm:gap-2" role="img" aria-label={`Projection mensuelle : de ${eur(Math.min(...r.months.map((m) => m.optimized)))} à ${eur(max)} selon la saison`}>
          {r.months.map((m, i) => (
            <div key={m.label} className="relative flex h-full flex-1 flex-col justify-end">
              <motion.div className="w-full origin-bottom rounded-t-[4px] bg-gradient-to-t from-caramel/50 to-sand" style={{ height: `${(m.optimized / max) * 100}%` }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.9, delay: 0.5 + i * 0.045, ease }} />
              <motion.div className="absolute inset-x-0 border-t border-dashed border-porcelain/70" style={{ bottom: `${(m.current / max) * 100}%` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + i * 0.03 }} />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-1.5 sm:gap-2">
          {r.months.map((m) => (
            <span key={m.label} className="flex-1 text-center text-[0.6rem] text-mint-ink sm:text-[0.68rem]">
              {m.label}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="mt-6 flex flex-col gap-4 border-t border-porcelain/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-mint-ink">Estimation indicative basée sur les informations renseignées. Prix optimisé moyen projeté : {eur(r.optimizedPrice)} / nuit.</p>
        <MagneticButton href="#contact" variant="light" className="shrink-0">
          Recevoir une analyse précise
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
}

function GhostChart() {
  return (
    <div className="flex h-36 items-end gap-2" aria-hidden="true">
      {[30, 34, 42, 50, 56, 68, 84, 88, 62, 48, 38, 42].map((h, i) => (
        <motion.span key={i} className="flex-1 rounded-t-[4px] bg-porcelain/10" style={{ height: `${h}%` }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.12 }} />
      ))}
    </div>
  );
}
