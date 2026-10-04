"use client";

import { Check, Minus } from "lucide-react";
import { images } from "@/config/images";
import { CompareSlider } from "@/components/ui/CompareSlider";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const before = ["Photos classiques", "Annonce peu optimisée", "Tarification non optimisée", "Gestion chronophage"];
const after = ["Shooting professionnel", "Annonce optimisée", "Tarification dynamique", "Gestion complète", "Meilleure expérience voyageur"];

export function BeforeAfter() {
  return (
    <section aria-labelledby="avant-apres-title" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-cream py-28 sm:rounded-t-[3.5rem] sm:py-36">
      <div className="container-x">
        <SectionHeading id="avant-apres-title" title="Votre logement," accent="avant / après NOVESYA." description="Faites glisser le curseur : même logement, deux façons de le présenter et de le gérer." />

        <Reveal className="mt-14" y={60}>
          <div data-cursor-label="GLISSER">
            <CompareSlider
              className="aspect-[4/5] w-full rounded-[2rem] shadow-[0_50px_90px_-50px_rgba(42,32,26,0.55)] sm:aspect-[16/9]"
              initial={50}
              beforeLabel="AVANT NOVESYA"
              afterLabel="AVEC NOVESYA"
              before={
                <SmartImage src={images.shootingBefore} alt="Le logement photographié au téléphone, sans mise en valeur" className="h-full w-full" variant={0} artClassName="scale-[1.08] -rotate-[1.2deg] [filter:grayscale(.55)_brightness(.78)_contrast(.85)_blur(1px)]" />
              }
              after={<SmartImage src={images.shootingAfter} alt="Le même logement après un shooting professionnel NOVESYA" className="h-full w-full" variant={0} />}
            />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
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
        </div>
      </div>
    </section>
  );
}
