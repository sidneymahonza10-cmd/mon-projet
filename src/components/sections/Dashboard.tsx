"use client";

import { motion } from "framer-motion";
import { Bell, CalendarDays, FileText, LayoutDashboard, Search, Settings, TrendingUp, Wallet } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/* PLACEHOLDER — données fictives de démonstration */
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
  { guest: "Camille R.", dates: "24 → 27 oct.", nights: 3, amount: "468 €", status: "À venir" },
  { guest: "Thomas & Léa", dates: "19 → 23 oct.", nights: 4, amount: "512 €", status: "En cours" },
  { guest: "Sofia M.", dates: "15 → 18 oct.", nights: 3, amount: "372 €", status: "Terminé" },
  { guest: "Julien B.", dates: "10 → 14 oct.", nights: 4, amount: "498 €", status: "Terminé" },
];
// Nuits réservées du mois (calendrier)
const booked = new Set([1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 19, 20, 21, 22, 24, 25, 26, 28, 29, 30]);

const W = 560;
const H = 180;
const maxR = Math.max(...revenue) * 1.08;
const minR = Math.min(...revenue) * 0.85;
const pts = revenue.map((v, i) => [(i / (revenue.length - 1)) * W, H - ((v - minR) / (maxR - minR)) * H] as const);
const line = pts.map((p, i) => {
  if (i === 0) return `M${p[0]},${p[1]}`;
  const [px, py] = pts[i - 1];
  const cx = (px + p[0]) / 2;
  return `C${cx},${py} ${cx},${p[1]} ${p[0]},${p[1]}`;
}).join(" ");
const area = `${line} L${W},${H} L0,${H} Z`;

const ease = [0.16, 1, 0.3, 1] as const;

export function Dashboard() {
  return (
    <section aria-labelledby="dashboard-title" className="relative z-10 -mt-8 overflow-hidden rounded-t-[2rem] bg-ink py-28 sm:-mt-10 sm:rounded-t-[2.75rem] sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[40rem] max-w-5xl opacity-70 blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(193,154,91,0.14), transparent)" }} />
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            id="dashboard-title"
            title="Votre espace propriétaire."
            accent="Tout est visible, en temps réel."
            description="Revenus, occupation, réservations, calendrier : vous gardez une vision claire de votre activité, où que vous soyez."
          />
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line-dark px-4 py-2 text-xs text-mist">
              <span className="size-1.5 rounded-full bg-gold" /> Aperçu illustratif · données fictives
            </p>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.3, ease }}
          style={{ transformPerspective: 1600 }}
          className="mt-16 overflow-hidden rounded-[1.5rem] border border-line-dark bg-night shadow-[0_60px_120px_-50px_rgba(0,0,0,0.9)] sm:rounded-[2rem]"
          role="img"
          aria-label="Aperçu fictif du tableau de bord propriétaire NOVESYA : revenus du mois 2 840 €, taux d'occupation 87 %, 18 réservations, prix moyen 126 € par nuit, performance +18 %."
        >
          {/* Barre de fenêtre */}
          <div className="flex items-center justify-between border-b border-line-dark bg-anthracite/70 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-paper/15" />
              <span className="size-2.5 rounded-full bg-paper/15" />
              <span className="size-2.5 rounded-full bg-paper/15" />
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-ink/60 px-4 py-1.5 text-xs text-smoke sm:flex">
              <Search className="size-3.5" /> espace.novesya.fr
            </div>
            <div className="flex items-center gap-3 text-smoke">
              <Bell className="size-4" />
              <span className="grid size-7 place-items-center rounded-full bg-gold/20 text-[0.65rem] font-semibold text-gold-soft">VD</span>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <aside aria-hidden="true" className="hidden w-52 shrink-0 border-r border-line-dark p-5 md:block">
              <p className="font-display text-lg tracking-[0.14em] text-paper">NOVESYA</p>
              <ul className="mt-8 space-y-1 text-sm">
                {[
                  { icon: LayoutDashboard, label: "Vue d'ensemble", on: true },
                  { icon: CalendarDays, label: "Calendrier" },
                  { icon: Wallet, label: "Revenus" },
                  { icon: FileText, label: "Rapports" },
                  { icon: Settings, label: "Paramètres" },
                ].map(({ icon: Icon, label, on }) => (
                  <li key={label} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5", on ? "bg-paper/[0.06] text-paper" : "text-smoke")}>
                    <Icon className="size-4" strokeWidth={1.5} />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-10 rounded-2xl border border-line-dark p-4">
                <p className="text-xs text-smoke">Logement</p>
                <p className="mt-1 text-sm text-paper">Appartement Lumière</p>
                <p className="mt-0.5 text-xs text-smoke">T3 · 4 voyageurs</p>
              </div>
            </aside>

            <div className="min-w-0 flex-1 space-y-4 p-4 sm:p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-smoke">Octobre</p>
                  <p className="font-display text-2xl text-paper sm:text-3xl">Bonjour, voici votre mois.</p>
                </div>
                <span className="hidden rounded-full border border-line-dark px-3 py-1.5 text-xs text-mist sm:inline">Exporter le rapport</span>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
                {kpis.map((k, i) => (
                  <div key={k.label} className={cn("rounded-2xl border p-4", i === 0 ? "col-span-2 border-gold/25 bg-gold/[0.07] lg:col-span-1" : "border-line-dark bg-anthracite/50")}>
                    <p className="text-xs text-smoke">{k.label}</p>
                    <Counter value={k.value} prefix={k.prefix} suffix={k.suffix} className={cn("mt-2 block font-display text-3xl leading-none", k.accent ? "text-gold-soft" : "text-paper")} />
                  </div>
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
                {/* Graphique revenus */}
                <div className="rounded-2xl border border-line-dark bg-anthracite/40 p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-paper">Revenus — 12 derniers mois</p>
                    <p className="flex items-center gap-1 text-xs text-gold-soft">
                      <TrendingUp className="size-3.5" /> +18 %
                    </p>
                  </div>
                  <svg viewBox={`0 -10 ${W} ${H + 20}`} className="mt-4 h-44 w-full overflow-visible sm:h-52" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="rev-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#c19a5b" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#c19a5b" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[0.25, 0.5, 0.75].map((g) => (
                      <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#2e2f34" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
                    ))}
                    <motion.path d={area} fill="url(#rev-fill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 1 }} />
                    <motion.path
                      d={line}
                      fill="none"
                      stroke="#d8bd8a"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
                    />
                  </svg>
                  <div className="mt-2 flex justify-between text-[0.65rem] text-smoke">
                    {months.map((m, i) => (
                      <span key={i}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Calendrier */}
                <div className="rounded-2xl border border-line-dark bg-anthracite/40 p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-paper">Calendrier · octobre</p>
                    <p className="text-xs text-smoke">24 / 31 nuits</p>
                  </div>
                  <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-[0.65rem] text-smoke">
                    {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                    {Array.from({ length: 2 }).map((_, i) => (
                      <span key={`e${i}`} />
                    ))}
                    {Array.from({ length: 31 }).map((_, i) => {
                      const day = i + 1;
                      const on = booked.has(day);
                      return (
                        <motion.span
                          key={day}
                          initial={{ opacity: 0, scale: 0.6 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + i * 0.02, duration: 0.4 }}
                          className={cn("num grid aspect-square place-items-center rounded-md text-[0.7rem]", on ? "bg-gold/80 text-ink" : "bg-paper/[0.04] text-mist")}
                        >
                          {day}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
                {/* Historique */}
                <div className="overflow-hidden rounded-2xl border border-line-dark bg-anthracite/40">
                  <p className="px-4 pt-4 text-sm text-paper sm:px-5">Historique des réservations</p>
                  <table className="mt-3 w-full text-left text-sm">
                    <thead className="text-[0.7rem] text-smoke">
                      <tr className="border-b border-line-dark">
                        <th className="px-4 py-2 font-normal sm:px-5">Voyageur</th>
                        <th className="hidden px-2 py-2 font-normal sm:table-cell">Dates</th>
                        <th className="px-2 py-2 font-normal">Montant</th>
                        <th className="px-4 py-2 text-right font-normal sm:px-5">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.guest} className="border-b border-line-dark/60 last:border-0">
                          <td className="px-4 py-3 text-paper sm:px-5">{b.guest}</td>
                          <td className="num hidden px-2 py-3 text-mist sm:table-cell">{b.dates}</td>
                          <td className="num px-2 py-3 text-paper">{b.amount}</td>
                          <td className="px-4 py-3 text-right sm:px-5">
                            <span className={cn("rounded-full px-2.5 py-1 text-[0.68rem]", b.status === "En cours" ? "bg-gold/20 text-gold-soft" : b.status === "À venir" ? "bg-paper/10 text-paper" : "text-smoke")}>{b.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Évolution mensuelle */}
                <div className="rounded-2xl border border-line-dark bg-anthracite/40 p-4 sm:p-5">
                  <p className="text-sm text-paper">Évolution de l&apos;occupation</p>
                  <div className="mt-5 flex h-36 items-end gap-3">
                    {evolution.map((e, i) => (
                      <div key={e.m} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                        <span className="num text-[0.65rem] text-mist">{e.v}%</span>
                        <motion.span
                          className={cn("w-full origin-bottom rounded-t-md", i === evolution.length - 1 ? "bg-gold-soft" : "bg-paper/15")}
                          style={{ height: `${e.v}%` }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.8 + i * 0.08, ease }}
                        />
                        <span className="text-[0.65rem] text-smoke">{e.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
