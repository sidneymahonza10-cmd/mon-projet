"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { cta, formulesHref } from "@/config/site";
import { TextLink } from "@/components/ui/TextLink";
import { services } from "@/data/content";
import { secteurs, secteurHref, type Secteur } from "@/data/secteurs";
import { LogoMark } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";

const ease = [0.16, 1, 0.3, 1] as const;

export function SecteurPage({ secteur: s }: { secteur: Secteur }) {
  const others = secteurs.filter((x) => x.slug !== s.slug);
  return (
    <>
      {/* ───────── Ouverture ───────── */}
      <section aria-labelledby="secteur-title" className="relative overflow-hidden bg-cream pb-24 pt-40 sm:pt-48">
        <div aria-hidden="true" className="absolute -left-40 top-24 size-[34rem] rounded-full bg-sand/50 blur-[120px]" />
        <div aria-hidden="true" className="absolute -right-40 bottom-0 size-[28rem] rounded-full bg-sage-soft blur-[100px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-32 text-linen sm:right-0 lg:right-[6vw]">
          <LogoMark className="h-[20rem] sm:h-[28rem]" />
        </div>
        <div className="container-x relative">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-hairline bg-porcelain px-4 py-2 text-[0.75rem] font-medium tracking-[0.18em] text-caramel-deep">
              <MapPin className="size-3.5" /> {s.name.toUpperCase()} · {s.dept}
            </p>
          </Reveal>
          <h1 id="secteur-title" className="mt-8 max-w-4xl font-display text-[clamp(2.9rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em]">
            <SplitWords text="Conciergerie Airbnb" className="block" />
            <SplitWords text={`en ${s.name}.`} delay={0.12} className="block italic text-caramel-deep" />
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-taupe sm:text-xl">{s.intro}</p>
          </Reveal>
          <Reveal delay={0.4} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href={cta.href} variant="primary" size="lg">
              {cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <TextLink href={formulesHref} className="sm:ml-4">
              Découvrir nos formules
            </TextLink>
          </Reveal>
        </div>
      </section>

      {/* ───────── Pourquoi louer ici ───────── */}
      <section aria-labelledby="demande-title" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-porcelain py-24 sm:rounded-t-[3.5rem] sm:py-32">
        <div className="container-x">
          <h2 id="demande-title" className="max-w-3xl font-display text-[2.5rem] leading-[1.02] sm:text-[3.4rem]">
            Qui réserve <span className="italic text-caramel-deep">dans {s.short} ?</span>
          </h2>
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {s.demand.map((d, i) => (
              <motion.li key={d.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1, ease }}>
                <article className="h-full rounded-[2rem] border border-hairline bg-cream p-8 sm:p-10">
                  <p className="font-display text-5xl italic text-caramel-deep">0{i + 1}</p>
                  <h3 className="mt-8 font-display text-3xl text-espresso">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-taupe">{d.text}</p>
                </article>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Communes + services ───────── */}
      <section aria-labelledby="communes-title" className="bg-porcelain pb-28 sm:pb-36">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-forest p-8 text-porcelain sm:p-11">
            <h2 id="communes-title" className="font-display text-4xl">
              Nos communes <span className="italic text-sand">en {s.name}</span>
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {s.towns.map((t) => (
                <li key={t} className="rounded-full border border-porcelain/15 bg-porcelain/5 px-4 py-2 text-sm text-mint-ink">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-mint-ink">Votre commune n&apos;est pas listée ? Écrivez-nous, nous vérifions avec vous.</p>
          </div>
          <div className="rounded-[2rem] border border-hairline bg-cream p-8 sm:p-11">
            <h2 className="font-display text-4xl">
              Tout est <span className="italic text-caramel-deep">pris en charge</span>
            </h2>
            <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
              {services.map((sv) => (
                <li key={sv.key} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-espresso text-porcelain">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span className="text-espresso/85">{sv.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── FAQ locale + autres secteurs ───────── */}
      <section aria-labelledby="faq-secteur-title" className="bg-cream py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 id="faq-secteur-title" className="font-display text-[2.5rem] leading-[1.02] sm:text-[3.2rem]">
              Questions <span className="italic text-caramel-deep">fréquentes</span>
            </h2>
            <dl className="mt-10 divide-y divide-hairline border-y border-hairline">
              {s.faq.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="font-display text-2xl text-espresso">{f.q}</dt>
                  <dd className="mt-2 leading-relaxed text-taupe">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside>
            <p className="text-[0.75rem] font-medium tracking-[0.22em] text-caramel-deep">AUTRES SECTEURS</p>
            <ul className="mt-5 space-y-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <a href={secteurHref(o.slug)} className="group flex items-center justify-between rounded-2xl border border-hairline bg-porcelain px-5 py-4 transition-colors hover:border-dune">
                    <span className="font-display text-xl">Conciergerie Airbnb {o.name}</span>
                    <ArrowRight className="size-4 text-caramel-deep transition-transform group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
