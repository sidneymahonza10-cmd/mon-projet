import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site NOVESYA : éditeur, hébergeur et propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" updated="octobre 2026" draft>
      <h2>Éditeur du site</h2>
      {/* PLACEHOLDER — à compléter à la création de la société */}
      <p>NOVESYA Conciergerie — [forme juridique, capital social]. Siège : [adresse]. SIRET : [numéro]. Directeur de la publication : [nom].</p>
      <p>
        Contact : <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>
      <h2>Hébergement</h2>
      {/* PLACEHOLDER — adresse exacte à reprendre depuis le compte Netlify */}
      <p>Netlify, Inc. — San Francisco, Californie, États-Unis — www.netlify.com — [adresse postale et téléphone de l&apos;hébergeur].</p>
      <h2>Propriété intellectuelle</h2>
      <p>L&apos;ensemble des contenus de ce site (textes, visuels, logo) est la propriété de NOVESYA, sauf mention contraire. Toute reproduction sans autorisation est interdite.</p>
      <h2>Liens utiles</h2>
      <p>
        <a href="/confidentialite">Politique de confidentialité</a> · <a href="/cgu">Conditions générales d&apos;utilisation</a>
      </p>
    </LegalPage>
  );
}
