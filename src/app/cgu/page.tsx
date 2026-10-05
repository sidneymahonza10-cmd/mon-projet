import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation du site NOVESYA, conciergerie Airbnb en Essonne, sud Seine-et-Marne et Val-de-Marne.",
  alternates: { canonical: "/cgu" },
};

export default function CGU() {
  return (
    <LegalPage title="Conditions générales d'utilisation" updated="octobre 2026">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions encadrent l&apos;utilisation du site {site.url.replace("https://", "")} (le « Site »), édité par NOVESYA Conciergerie (voir les <a href="/mentions-legales">mentions légales</a>).
        Naviguer sur le Site implique leur acceptation.
      </p>

      <h2>2. Accès au Site</h2>
      <p>
        Le Site est accessible gratuitement à toute personne disposant d&apos;un accès à internet. NOVESYA s&apos;efforce de le maintenir accessible en permanence, mais peut l&apos;interrompre pour maintenance ou
        en cas de force majeure, sans que sa responsabilité puisse être engagée.
      </p>

      <h2>3. Services présentés</h2>
      <p>
        Le Site présente l&apos;activité de conciergerie de NOVESYA. Les informations publiées sont fournies à titre indicatif. Toute estimation de revenus communiquée par NOVESYA est une projection non
        contractuelle, qui ne constitue pas une garantie de résultat.
      </p>
      <p>Les conditions de nos prestations (formule, tarifs, durée, préavis) sont définies exclusivement par le contrat de gestion signé entre NOVESYA et le propriétaire.</p>

      <h2>4. Formulaires de contact</h2>
      <p>
        En utilisant les formulaires, vous vous engagez à fournir des informations exactes et à ne pas utiliser le Site à des fins frauduleuses ou automatisées. Les envois abusifs peuvent être bloqués. Le
        traitement de vos données est décrit dans notre <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>5. Propriété intellectuelle</h2>
      <p>
        Les textes, visuels, logo, illustrations et la mise en page du Site sont la propriété de NOVESYA ou utilisés avec autorisation. Toute reproduction, représentation ou adaptation, totale ou partielle, sans
        accord écrit préalable est interdite.
      </p>

      <h2>6. Liens externes</h2>
      <p>
        Le Site contient des liens vers des services tiers (WhatsApp, Instagram…). NOVESYA n&apos;exerce aucun contrôle sur ces services et décline toute responsabilité quant à leur contenu ou à leurs pratiques
        en matière de données.
      </p>

      <h2>7. Responsabilité</h2>
      <p>
        NOVESYA veille à l&apos;exactitude des informations publiées mais ne peut garantir l&apos;absence d&apos;erreur ou d&apos;omission. Sa responsabilité ne saurait être engagée en cas de dommage résultant de
        l&apos;utilisation du Site ou de l&apos;impossibilité d&apos;y accéder.
      </p>

      <h2>8. Modification des conditions</h2>
      <p>NOVESYA peut modifier les présentes conditions à tout moment. La version applicable est celle publiée sur le Site au moment de votre visite.</p>

      <h2>9. Droit applicable</h2>
      <p>
        Les présentes conditions sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité ; à défaut, les tribunaux français seront compétents. Pour toute question :{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}
