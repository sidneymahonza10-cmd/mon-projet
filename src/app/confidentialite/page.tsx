import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité (RGPD)",
  description: "Comment NOVESYA collecte, utilise et protège vos données personnelles, et comment exercer vos droits (RGPD).",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  const mail = <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>;
  return (
    <LegalPage title="Politique de confidentialité" updated="octobre 2026">
      <p>
        NOVESYA attache une grande importance à la protection de vos données personnelles. Cette page explique, conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et
        Libertés, quelles données nous collectons, pourquoi, combien de temps nous les gardons et comment exercer vos droits.
      </p>

      <h2>Responsable du traitement</h2>
      <p>NOVESYA Conciergerie (coordonnées complètes dans les <a href="/mentions-legales">mentions légales</a>). Pour toute question : {mail}.</p>

      <h2>Données collectées</h2>
      <ul>
        <li>
          <strong>Formulaire de demande d&apos;estimation</strong> : ville et caractéristiques du logement (type, chambres, voyageurs), objectifs, nom, téléphone et adresse e-mail.
        </li>
        <li>
          <strong>Formulaire « Nos formules »</strong> : formule qui vous intéresse, nom (facultatif), téléphone et adresse e-mail.
        </li>
        <li>
          <strong>Mesure d&apos;audience</strong>, uniquement si vous l&apos;acceptez : pages consultées, provenance, type d&apos;appareil, de façon anonyme et agrégée.
        </li>
        <li>
          <strong>WhatsApp</strong> : si vous nous écrivez via WhatsApp, vos échanges sont également soumis à la politique de confidentialité de WhatsApp (Meta).
        </li>
      </ul>
      <p>Nous ne collectons aucune donnée sensible et ne demandons jamais de coordonnées bancaires sur ce site.</p>

      <h2>Finalités et bases légales</h2>
      <ul>
        <li>Répondre à votre demande, vous recontacter et préparer une estimation : mesures précontractuelles prises à votre demande (art. 6.1.b du RGPD).</li>
        <li>Mesurer la fréquentation du site pour l&apos;améliorer : votre consentement (art. 6.1.a), que vous pouvez retirer à tout moment.</li>
        <li>Protéger le site contre le spam et les abus : notre intérêt légitime (art. 6.1.f).</li>
      </ul>

      <h2>Destinataires</h2>
      <p>Vos données sont destinées exclusivement à NOVESYA. Elles ne sont ni vendues, ni louées, ni cédées. Nous faisons appel à des prestataires techniques qui les traitent pour notre compte :</p>
      <ul>
        <li>Netlify (hébergement du site) ;</li>
        <li>Resend (acheminement par e-mail des demandes envoyées via les formulaires) ;</li>
        <li>Umami (mesure d&apos;audience anonyme, uniquement avec votre accord).</li>
      </ul>
      <p>
        Certains de ces prestataires sont situés aux États-Unis. Ces transferts sont encadrés par des garanties appropriées prévues par le RGPD (décision d&apos;adéquation « Data Privacy Framework » ou clauses
        contractuelles types de la Commission européenne).
      </p>

      <h2>Durée de conservation</h2>
      <ul>
        <li>Demandes et coordonnées des prospects : 3 ans à compter de notre dernier échange, puis suppression.</li>
        <li>Statistiques de fréquentation : conservées sous forme agrégée et anonyme.</li>
        <li>Votre choix concernant les cookies : 6 mois, après quoi il vous est de nouveau demandé.</li>
      </ul>

      <h2 id="cookies">Cookies et traceurs</h2>
      <p>Ce site n&apos;utilise aucun cookie publicitaire et aucun traceur de réseau social.</p>
      <ul>
        <li>
          <strong>Indispensable</strong> : votre choix (accepter ou refuser la mesure d&apos;audience) est enregistré dans votre navigateur pour ne pas vous le redemander à chaque page.
        </li>
        <li>
          <strong>Mesure d&apos;audience (Umami)</strong> : outil respectueux de la vie privée, sans cookie, qui ne conserve pas votre adresse IP. Il n&apos;est activé que si vous cliquez sur « Accepter ».
        </li>
      </ul>
      <p>Vous pouvez modifier votre choix à tout moment grâce au lien « Gérer les cookies » en bas de chaque page.</p>

      <h2>Sécurité</h2>
      <p>Le site est servi exclusivement en HTTPS. Les formulaires sont protégés contre les envois automatisés et l&apos;accès aux demandes reçues est réservé à NOVESYA.</p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité de vos données, ainsi que du droit de retirer votre consentement et de
        définir des directives sur leur sort après votre décès. Pour les exercer, écrivez-nous à {mail}. Nous vous répondons dans un délai d&apos;un mois.
      </p>
      <p>
        Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL :{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
        .
      </p>
    </LegalPage>
  );
}
