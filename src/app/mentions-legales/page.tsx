import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>NOVESYA Conciergerie — [forme juridique, capital social]. Siège : [adresse]. SIRET : [numéro]. Directeur de la publication : [nom].</p>
      <p>Contact : {site.contact.email}</p>
      <h2>Hébergement</h2>
      <p>[Nom de l&apos;hébergeur, adresse, téléphone].</p>
      <h2>Propriété intellectuelle</h2>
      <p>L&apos;ensemble des contenus de ce site (textes, visuels, logo) est la propriété de NOVESYA, sauf mention contraire. Toute reproduction sans autorisation est interdite.</p>
    </LegalPage>
  );
}
