import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité">
      <h2>Données collectées</h2>
      <p>Via le formulaire de contact : ville et caractéristiques du logement, objectifs, nom, téléphone et adresse e-mail. Le simulateur de rentabilité fonctionne dans votre navigateur et n&apos;enregistre aucune donnée.</p>
      <h2>Finalité</h2>
      <p>Ces informations servent uniquement à vous recontacter et à préparer une estimation pour votre logement. Elles ne sont ni vendues ni cédées.</p>
      <h2>Durée de conservation</h2>
      <p>[Durée à préciser par NOVESYA].</p>
      <h2>Vos droits</h2>
      <p>Conformément au RGPD, vous pouvez accéder à vos données, les rectifier ou demander leur suppression en écrivant à {site.contact.email}.</p>
    </LegalPage>
  );
}
