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
    <section aria-labelledby="avant-apres-title" className="relative z-10 -mt-8 rounded-t-[2rem] sm:-mt-10 sm:rounded-t-[2.75rem] bg-ivory py-28 text-ink sm:py-36">
      <div className="container-x">
        <SectionHeading
          id="avant-apres-title"
          tone="light"
          title="Votre logement,"
          accent="avant / après NOVESYA."
          description="Faites glisser le curseur : même logement, deux façons de le présenter et de le gérer."
        />

        <Reveal className="mt-14" y={40}>
          <CompareSlider
            className="aspect-[4/5] w-full rounded-[1.75rem] shadow-[0_40px_80px_-40px_rgba(10,10,11,0.55)] sm:aspect-[16/9]"
            initial={50}
            beforeLabel="AVANT NOVESYA"
            afterLabel="AVEC NOVESYA"
            before={
              <div className="h-full w-full bg-[#3a3833]">
                <SmartImage
                  src={images.beforeAfter}
                  alt="Le logement photographié au téléphone, sans mise en valeur"
                  className="h-full w-full"
                  imgClassName="scale-[1.08] -rotate-[1.2deg] [filter:grayscale(.45)_brightness(.72)_contrast(.82)_saturate(.7)_blur(.6px)]"
                />
                <div className="absolute inset-0 bg-[#6b5a3a]/20 mix-blend-multiply" />
              </div>
            }
            after={
              <SmartImage
                src={images.beforeAfter}
                alt="Le même logement après un shooting professionnel NOVESYA"
                className="h-full w-full"
                imgClassName="[filter:brightness(1.04)_contrast(1.05)_saturate(1.05)]"
              />
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-[1.5rem] border border-line-light bg-linen/60 p-7 sm:p-9">
            <h3 className="text-[0.8rem] font-semibold tracking-[0.16em] text-stone">AVANT NOVESYA</h3>
            <ul className="mt-6 space-y-4">
              {before.map((b) => (
                <li key={b} className="flex items-center gap-3 text-lg text-stone">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line-light text-stone">
                    <Minus className="size-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[1.5rem] bg-ink p-7 text-paper shadow-[0_30px_60px_-30px_rgba(10,10,11,0.6)] sm:p-9">
            <h3 className="text-[0.8rem] font-semibold tracking-[0.16em] text-gold-soft">AVEC NOVESYA</h3>
            <ul className="mt-6 space-y-4">
              {after.map((a) => (
                <li key={a} className="flex items-center gap-3 text-lg">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gold text-ink">
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
