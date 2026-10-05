"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FileText, Mail, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

/* Exemple de rapport mensuel (données de démonstration) */
const kpis = [
  { label: "Revenus du mois", value: 2840, suffix: " €" },
  { label: "Taux d'occupation", value: 87, suffix: " %" },
  { label: "Réservations", value: 18, suffix: "" },
  { label: "Prix moyen / nuit", value: 126, suffix: " €" },
  { label: "Performance", value: 18, prefix: "+", suffix: " %", accent: true },
];
const revenue = [1680, 1820, 1760, 2050, 2240, 2190, 2460, 2380, 2610, 2550, 2720, 2840];
const months = ["N", "D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O"];
const evolution = [
  { m: "Mai", v: 62 },
  { m: "Juin", v: 74 },
  { m: "Juil", v: 92 },
  { m: "Août", v: 96 },
  { m: "Sep", v: 81 },
  { m: "Oct", v: 87 },
];
const bookings = [
  { guest: "Camille R.", dates: "24 → 27 oct.", amount: "468 €", status: "À venir" },
  { guest: "Thomas & Léa", dates: "19 → 23 oct.", amount: "512 €", status: "En cours" },
  { guest: "Sofia M.", dates: "15 → 18 oct.", amount: "372 €", status: "Terminé" },
  { guest: "Julien B.", dates: "10 → 14 oct.", amount: "498 €", status: "Terminé" },
];
const booked = new Set([1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 19, 20, 21, 22, 24, 25, 26, 28, 29, 30]);

const W = 560;
const H = 180;
const maxR = Math.max(...revenue) * 1.08;
const minR = Math.min(...revenue) * 0.85;
const pts = revenue.map((v, i) => [(i / (revenue.length - 1)) * W, H - ((v - minR) / (maxR - minR)) * H] as const);
const line = pts
  .map((pt, i) => {
    if (i === 0) return `M${pt[0]},${pt[1]}`;
    const [px, py] = pts[i - 1];
    const cx = (px + pt[0]) / 2;
    return `C${cx},${py} ${cx},${pt[1]} ${pt[0]},${pt[1]}`;
  })
  .join(" ");
const area = `${line} L${W},${H} L0,${H} Z`;
const last = pts[pts.length - 1];
const ease = [0.16, 1, 0.3, 1] as const;

export function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 26 });
  const rotateX = useTransform(p, [0, 1], [28, 0]);
  const scale = useTransform(p, [0, 1], [0.86, 1]);
  const y = useTransform(p, [0, 1], [80, 0]);

  return (
    <section aria-labelledby="dashboard-title" className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-linen py-28 sm:rounded-t-[3.5rem] sm:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading id="dashboard-title" title="Votre reporting" accent="personnalisé, chaque mois." description="Chaque mois, vous recevez un bilan clair de l'activité de votre logement : revenus, occupation, réservations et calendrier. Simple à lire, sans rien avoir à chercher." />
          <p className="inline-flex items-center gap-2 self-start rounded-full border border-dune px-4 py-2 text-xs text-taupe lg:self-end">
            <span className="size-1.5 rounded-full bg-caramel" /> Exemple de rapport mensuel
          </p>
        </div>

        <div ref={ref} style={{ perspective: 1800 }} className="mt-16">
          <motion.div
            style={{ rotateX, scale, y, transformOrigin: "50% 0%" }}
            className="overflow-hidden rounded-[1.5rem] border border-hairline bg-porcelain shadow-[0_70px_120px_-60px_rgba(42,32,26,0.55)] sm:rounded-[2rem]"
            role="img"
            aria-label="Exemple de rapport mensuel NOVESYA : revenus du mois 2 840 €, taux d'occupation 87 %, 18 réservations, prix moyen 126 € par nuit, performance +18 %."
          >
            <div className="flex items-center justify-between gap-4 border-b border-hairline bg-cream px-4 py-3.5 sm:px-6">
              <div className="flex items-center gap-2 text-cocoa">
                <LogoMark className="h-6 text-caramel" />
                <span className="font-display text-lg tracking-[0.12em]">NOVESYA</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-taupe">
                <span className="hidden items-center gap-1.5 rounded-full bg-porcelain px-3 py-1.5 sm:flex">
                  <Mail className="size-3.5" /> Envoyé le 1er novembre
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-espresso px-3 py-1.5 text-porcelain">
                  <FileText className="size-3.5" /> Rapport PDF
                </span>
              </div>
            </div>

            <div className="flex">

              <div className="min-w-0 flex-1 space-y-4 p-4 sm:p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-taupe">Rapport mensuel · Appartement Lumière · T3, 4 voyageurs</p>
                    <p className="font-display text-2xl text-espresso sm:text-3xl">Votre bilan d&apos;octobre</p>
                  </div>
                  <span className="hidden rounded-full border border-hairline px-3 py-1.5 text-xs text-taupe sm:inline">Préparé par NOVESYA</span>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
                  {kpis.map((k, i) => (
                    <div key={k.label} className={cn("rounded-2xl border p-4", i === 0 ? "col-span-2 border-forest bg-forest text-porcelain lg:col-span-1" : "border-hairline bg-cream/50")}>
                      <p className={cn("text-xs", i === 0 ? "text-mint-ink" : "text-taupe")}>{k.label}</p>
                      <Counter value={k.value} prefix={k.prefix} suffix={k.suffix} className={cn("mt-2 block font-display text-3xl leading-none", i === 0 ? "text-porcelain" : k.accent ? "text-caramel-deep" : "text-espresso")} />
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
                  <div className="rounded-2xl border border-hairline p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-espresso">Revenus — 12 derniers mois</p>
                      <p className="flex items-center gap-1 text-xs text-caramel-deep">
                        <TrendingUp className="size-3.5" /> +18 %
                      </p>
                    </div>
                    <svg viewBox={`-6 -12 ${W + 12} ${H + 24}`} className="mt-4 h-44 w-full overflow-visible sm:h-52" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id="rev-fill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#b8874a" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#b8874a" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {[0.25, 0.5, 0.75].map((g) => (
                        <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#e2d7c6" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
                      ))}
                      <motion.path d={area} fill="url(#rev-fill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 1 }} />
                      <motion.path d={line} fill="none" stroke="#8a5d28" strokeWidth="2" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.4, ease: [0.65, 0, 0.35, 1] }} />
                      <motion.circle cx={last[0]} cy={last[1]} r="5" fill="#b8874a" stroke="#fdfbf7" strokeWidth="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 2.3, type: "spring" }} />
                    </svg>
                    <div className="mt-2 flex justify-between text-[0.65rem] text-taupe">
                      {months.map((m, i) => (
                        <span key={i}>{m}</span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-hairline p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-espresso">Nuits réservées · octobre</p>
                      <p className="text-xs text-taupe">24 / 31 nuits</p>
                    </div>
                    <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-[0.65rem] text-taupe">
                      {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                        <span key={i}>{d}</span>
                      ))}
                      <span />
                      <span />
                      {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const on = booked.has(day);
                        return (
                          <motion.span key={day} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.02, duration: 0.4 }} className={cn("num grid aspect-square place-items-center rounded-md text-[0.7rem]", on ? "bg-caramel-strong text-porcelain" : "bg-cream text-taupe")}>
                            {day}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
                  <div className="overflow-hidden rounded-2xl border border-hairline">
                    <p className="px-4 pt-4 text-sm text-espresso sm:px-5">Historique des réservations</p>
                    <table className="mt-3 w-full text-left text-sm">
                      <thead className="text-[0.7rem] text-taupe">
                        <tr className="border-b border-hairline">
                          <th className="px-4 py-2 font-normal sm:px-5">Voyageur</th>
                          <th className="hidden px-2 py-2 font-normal sm:table-cell">Dates</th>
                          <th className="px-2 py-2 font-normal">Montant</th>
                          <th className="px-4 py-2 text-right font-normal sm:px-5">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((b) => (
                          <tr key={b.guest} className="border-b border-hairline/70 last:border-0">
                            <td className="px-4 py-3 text-espresso sm:px-5">{b.guest}</td>
                            <td className="num hidden px-2 py-3 text-taupe sm:table-cell">{b.dates}</td>
                            <td className="num px-2 py-3 text-espresso">{b.amount}</td>
                            <td className="px-4 py-3 text-right sm:px-5">
                              <span className={cn("rounded-full px-2.5 py-1 text-[0.68rem]", b.status === "En cours" ? "bg-caramel-strong text-porcelain" : b.status === "À venir" ? "bg-sage-soft text-forest" : "text-taupe")}>{b.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="rounded-2xl border border-hairline p-4 sm:p-5">
                    <p className="text-sm text-espresso">Évolution de l&apos;occupation</p>
                    <div className="mt-5 flex h-36 items-end gap-3">
                      {evolution.map((e, i) => (
                        <div key={e.m} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                          <span className="num text-[0.65rem] text-taupe">{e.v}%</span>
                          <motion.span className={cn("w-full origin-bottom rounded-t-md", i === evolution.length - 1 ? "bg-caramel" : "bg-sand/70")} style={{ height: `${e.v}%` }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 + i * 0.08, ease }} />
                          <span className="text-[0.65rem] text-taupe">{e.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
