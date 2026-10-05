import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { cta } from "@/config/site";
import { secteurs, secteurHref } from "@/data/secteurs";
import { LogoMark } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou a été déplacée.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative overflow-hidden bg-cream pb-28 pt-40 sm:pt-48">
      <div aria-hidden="true" className="absolute -left-40 top-24 size-[34rem] rounded-full bg-sand/50 blur-[120px]" />
      <div aria-hidden="true" className="absolute -right-40 bottom-0 size-[28rem] rounded-full bg-sage-soft blur-[100px]" />
      <div className="container-x relative text-center">
        <LogoMark className="mx-auto h-20 text-caramel" />
        <p className="mt-8 text-[0.75rem] font-medium tracking-[0.22em] text-caramel-deep">ERREUR 404</p>
        <h1 id="nf-title" className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.03em]">
          Cette page a pris <span className="italic text-caramel-deep">des vacances.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-taupe">L&apos;adresse saisie n&apos;existe pas ou a été déplacée. Pas d&apos;inquiétude, nous vous ramenons à bon port.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton href={cta.href} variant="primary" size="lg">
            {cta.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <TextLink href="/" className="sm:ml-4">
            Retour à l&apos;accueil
          </TextLink>
        </div>
        <nav aria-label="Nos secteurs" className="mx-auto mt-16 max-w-2xl border-t border-hairline pt-8">
          <p className="text-sm text-taupe">Vous cherchiez peut-être :</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
            {secteurs.map((s) => (
              <li key={s.slug}>
                <a href={secteurHref(s.slug)} className="inline-flex min-h-11 items-center rounded-full border border-hairline bg-porcelain px-4 text-sm transition-colors hover:border-dune">
                  Conciergerie {s.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/qui-sommes-nous" className="inline-flex min-h-11 items-center rounded-full border border-hairline bg-porcelain px-4 text-sm transition-colors hover:border-dune">
                Notre histoire
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
