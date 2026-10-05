import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-cream pb-28 pt-40 text-espresso">
      <article className="container-x max-w-3xl [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-taupe">
        <h1 className="font-display text-5xl sm:text-6xl">{title}</h1>
        <p className="!mt-6 inline-block rounded-full border border-hairline px-3 py-1 text-xs">Contenu à compléter par NOVESYA</p>
        {children}
      </article>
    </div>
  );
}
