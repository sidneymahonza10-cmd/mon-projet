"use client";

import { motion } from "framer-motion";
import { Camera, Check, LayoutPanelTop, Minus, Smartphone, Sofa, SunMedium } from "lucide-react";
import { images } from "@/config/images";
import { formulesHref } from "@/config/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { SplitWords } from "@/components/ui/SplitWords";
import { CameraCompare } from "@/components/ui/CameraCompare";

const before = ["Photos classiques", "Annonce peu optimisée", "Tarification non optimisée", "Gestion chronophage"];
const after = ["Shooting professionnel", "Annonce optimisée", "Tarification dynamique", "Gestion complète", "Meilleure expérience voyageur"];
const points = [
  { icon: Camera, label: "Photographie professionnelle" },
  { icon: LayoutPanelTop, label: "Mise en valeur des espaces" },
  { icon: SunMedium, label: "Optimisation de la lumière" },
  { icon: Sofa, label: "Valorisation des équipements" },
  { icon: Smartphone, label: "Photos adaptées aux plateformes" },
];
const ease = [0.16, 1, 0.3, 1] as const;

/** Section unique « avant / après » : le shooting photo, piloté par un appareil photo. */
export function Shooting() {
  return (
    <section id="shooting" aria-labelledby="shooting-title" className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-cream py-28 sm:rounded-t-[3.5rem] sm:py-36">
      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <h2 id="shooting-title" className="font-display text-[2.5rem] leading-[1.02] sm:text-5xl lg:text-[4rem]">
            <SplitWords text="Votre logement mérite mieux qu'une photo prise" className="block" stagger={0.03} />
            <SplitWords text="au téléphone." delay={0.3} className="block italic text-caramel-deep" />
          </h2>
          <Reveal delay={0.1} className="flex items-end gap-6">
            <p className="max-w-[46ch] text-lg leading-relaxed text-taupe">
              Chez NOVESYA, nous valorisons votre logement avec un shooting photo professionnel pensé pour attirer davantage l&apos;attention des voyageurs et renforcer la qualité de votre annonce.
            </p>
            <RotatingBadge text="SHOOTING OFFERT · FORMULE PREMIUM · " className="hidden shrink-0 shadow-[0_30px_60px_-30px_rgba(42,32,26,0.6)] sm:grid" />
          </Reveal>
        </div>

        <Reveal className="mt-14" y={60}>
          <CameraCompare
            className="aspect-[4/5] w-full rounded-[2rem] shadow-[0_50px_90px_-50px_rgba(42,32,26,0.55)] sm:aspect-[16/9]"
            before={<SmartImage src={images.shootingBefore} alt="Le logement photographié au smartphone, sans mise en valeur" className="h-full w-full" variant={0} artClassName="scale-[1.08] -rotate-[1.2deg] [filter:grayscale(.55)_brightness(.78)_contrast(.85)_blur(1px)]" />}
            after={<SmartImage src={images.shootingAfter} alt="Le même logement après le shooting professionnel NOVESYA" className="h-full w-full" variant={0} />}
          />
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <Reveal className="rounded-[1.75rem] border border-hairline bg-linen/70 p-7 sm:p-9">
            <h3 className="text-[0.8rem] font-semibold tracking-[0.16em] text-taupe">AVANT NOVESYA</h3>
            <ul className="mt-6 space-y-4">
              {before.map((b) => (
                <li key={b} className="flex items-center gap-3 text-lg text-taupe">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-dune">
                    <Minus className="size-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[1.75rem] bg-forest p-7 text-porcelain shadow-[0_40px_70px_-40px_rgba(36,50,31,0.7)] sm:p-9">
            <h3 className="text-[0.8rem] font-semibold tracking-[0.16em] text-sand">AVEC NOVESYA</h3>
            <ul className="mt-6 space-y-4">
              {after.map((a) => (
                <li key={a} className="flex items-center gap-3 text-lg">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-caramel text-porcelain">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.16} className="rounded-[1.75rem] border border-hairline bg-porcelain p-7 sm:p-9">
            <h3 className="text-[0.8rem] font-semibold tracking-[0.16em] text-caramel-deep">LE SHOOTING NOVESYA</h3>
            <ul className="mt-5">
              {points.map(({ icon: Icon, label }, i) => (
                <motion.li key={label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.06, ease }} className="group flex items-center gap-3.5 border-b border-hairline py-3 last:border-0">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-linen text-caramel-deep transition-colors duration-500 group-hover:bg-caramel group-hover:text-porcelain">
                    <Icon className="size-4" strokeWidth={1.5} />
                  </span>
                  <span className="text-espresso">{label}</span>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-5 flex flex-col gap-6 rounded-[1.75rem] bg-linen p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <p className="text-sm tracking-[0.14em] text-taupe">
              VALEUR : <span className="num text-espresso line-through decoration-caramel">150 €</span>
            </p>
            <p className="mt-2 font-display text-[2rem] leading-[1.05] text-espresso sm:text-[2.6rem]">
              OFFERT <span className="italic text-caramel-deep">avec la formule Premium</span>
            </p>
          </div>
          <TextLink href={`${formulesHref}#premium`} className="shrink-0">
            Voir la formule Premium
          </TextLink>
        </Reveal>
      </div>
    </section>
  );
}
