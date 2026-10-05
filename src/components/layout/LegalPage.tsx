import type { ReactNode } from "react";

/** Mise en page des pages légales. `updated` : date de dernière mise à jour affichée sous le titre. */
export function LegalPage({ title, children, updated, draft = false }: { title: string; children: ReactNode; updated?: string; draft?: boolean }) {
  return (
    <div className="bg-cream pb-28 pt-40 text-espresso">
      <article className="container-x max-w-3xl [&_a]:text-caramel-deep [&_a]:underline [&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:font-display [&_h2]:text-3xl [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-taupe [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:leading-relaxed [&_ul]:text-taupe">
        <h1 className="font-display text-5xl sm:text-6xl">{title}</h1>
        {updated && <p className="!mt-5 text-sm">Dernière mise à jour : {updated}</p>}
        {draft && <p className="!mt-4 inline-block rounded-full border border-hairline px-3 py-1 text-xs">Informations de la société à compléter à sa création</p>}
        {children}
      </article>
    </div>
  );
}
