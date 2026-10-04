import { images } from "@/config/images";
import { site } from "@/config/site";

/* ─────────────────────────── Services ─────────────────────────── */

export type ServiceKey =
  | "airbnb"
  | "guests"
  | "pricing"
  | "checkin"
  | "cleaning"
  | "maintenance"
  | "shooting"
  | "reporting";

export const services: { key: ServiceKey; title: string; text: string }[] = [
  { key: "airbnb", title: "Gestion Airbnb", text: "Création et optimisation de l'annonce." },
  { key: "guests", title: "Gestion des voyageurs", text: "Messages, demandes, assistance et suivi." },
  { key: "pricing", title: "Tarification dynamique", text: "Optimisation des prix selon la demande." },
  { key: "checkin", title: "Check-in / Check-out", text: "Gestion de l'arrivée et du départ." },
  { key: "cleaning", title: "Ménage & linge", text: "Coordination entre chaque réservation." },
  { key: "maintenance", title: "Maintenance", text: "Gestion des petits incidents et interventions." },
  { key: "shooting", title: "Shooting professionnel", text: "Photos premium pour valoriser le bien." },
  { key: "reporting", title: "Reporting", text: "Suivi transparent des performances." },
];

/* ─────────────────────────── Formules ─────────────────────────── */

export const plans = [
  {
    id: "essentielle",
    name: "Essentielle",
    code: "NOV",
    rate: 15,
    pitch: "Vous gardez le contrôle, nous gérons l'essentiel.",
    intro: null as string | null,
    features: [
      "Création / optimisation de l'annonce",
      "Gestion des réservations",
      "Communication voyageurs",
      "Optimisation tarifaire",
      "Coordination du ménage",
      "Suivi des performances",
    ],
    cta: "Choisir Essentielle",
    featured: false,
  },
  {
    id: "premium",
    name: "Premium",
    code: "SYA",
    rate: 20,
    pitch: "L'excellence dans chaque détail. Vous n'avez plus rien à gérer.",
    intro: "Tout ce qui est inclus dans Essentielle +",
    features: [
      "Check-in / Check-out",
      "Gestion complète du logement",
      "Gestion du linge",
      "Gestion des incidents",
      "Optimisation avancée",
      "Reporting mensuel",
      "Shooting photo professionnel offert",
    ],
    cta: "Choisir Premium",
    featured: true,
  },
] as const;

/* ─────────────────────── Parcours « autopilote » ─────────────────────── */

export const journey = [
  { label: "Réservation", detail: "Demande validée, calendrier synchronisé, tarif optimisé." },
  { label: "Voyageur", detail: "Échanges, consignes et réponses — en continu." },
  { label: "Check-in", detail: "Accueil ou arrivée autonome, sans que vous ayez à vous déplacer." },
  { label: "Séjour", detail: "Assistance et gestion des imprévus pendant tout le séjour." },
  { label: "Ménage", detail: "Ménage et linge coordonnés entre chaque rotation." },
  { label: "Check-out", detail: "Départ, état des lieux et contrôle du logement." },
  { label: "Nouvelle réservation", detail: "Le logement est prêt. Le cycle recommence." },
] as const;

/* ─────────────────────── Pourquoi NOVESYA ─────────────────────── */

export const reasons = [
  { key: "revenue", title: "Plus de revenus", text: "Optimisation des prix et du calendrier." },
  { key: "mind", title: "Zéro charge mentale", text: "Nous gérons les voyageurs et les opérations." },
  { key: "image", title: "Image premium", text: "Votre logement est présenté professionnellement." },
  { key: "clarity", title: "Transparence", text: "Vous gardez une vision claire de vos performances." },
] as const;

/* ─────────────────────── Statistiques ───────────────────────
 * PLACEHOLDER — valeurs indicatives à remplacer par les chiffres réels de NOVESYA.
 */
export const stats = [
  { prefix: "+", value: 25, suffix: " %", label: "de potentiel de revenus optimisé*" },
  { prefix: "", value: 24, suffix: "/7", label: "assistance voyageurs" },
  { prefix: "", value: 100, suffix: " %", label: "de gestion déléguée" },
  { prefix: "", value: 1, suffix: "", label: "interlocuteur dédié" },
] as const;

/* ─────────────────────── Carte — logements ───────────────────────
 * PLACEHOLDER — logements fictifs. Remplacez par vos vrais biens.
 * x / y : position sur la carte, en pourcentage (0 → 100).
 */
export type Property = {
  id: string;
  name: string;
  area: string;
  type: string;
  guests: number;
  bedrooms: number;
  performance: string;
  image: string;
  x: number;
  y: number;
};

export const properties: Property[] = [
  { id: "p1", name: "Appartement Lumière", area: "Centre historique", type: "Appartement T3", guests: 4, bedrooms: 2, performance: "Occupation indicative 84 %", image: images.properties.a, x: 46, y: 42 },
  { id: "p2", name: "Studio Riviera", area: "Quartier gare", type: "Studio", guests: 2, bedrooms: 0, performance: "Occupation indicative 88 %", image: images.properties.b, x: 63, y: 55 },
  { id: "p3", name: "Loft Atelier", area: "Rive droite", type: "Loft", guests: 4, bedrooms: 1, performance: "Occupation indicative 79 %", image: images.properties.c, x: 31, y: 30 },
  { id: "p4", name: "Suite Jardin", area: "Quartier résidentiel", type: "Appartement T2", guests: 3, bedrooms: 1, performance: "Occupation indicative 81 %", image: images.properties.d, x: 72, y: 28 },
  { id: "p5", name: "Maison Horizon", area: "Commune voisine", type: "Maison", guests: 6, bedrooms: 3, performance: "Occupation indicative 74 %", image: images.properties.e, x: 22, y: 66 },
  { id: "p6", name: "Duplex Canopée", area: "Bord de rivière", type: "Duplex", guests: 5, bedrooms: 2, performance: "Occupation indicative 83 %", image: images.properties.f, x: 54, y: 74 },
];

/* ─────────────────────── Témoignages ───────────────────────
 * PLACEHOLDER — témoignages fictifs, à remplacer par de vrais avis clients.
 */
export const testimonials = [
  {
    quote:
      "Depuis que NOVESYA gère notre logement, nous avons beaucoup moins de contraintes et une meilleure visibilité sur nos revenus.",
    author: "Propriétaire Airbnb",
    place: "Appartement T2",
  },
  {
    quote:
      "Le shooting a complètement changé la perception de notre annonce. Tout est fluide, et je n'ai plus à répondre aux messages la nuit.",
    author: "Propriétaire Airbnb",
    place: "Studio centre-ville",
  },
  {
    quote:
      "Un interlocuteur unique, des comptes rendus clairs chaque mois. C'est exactement le niveau de service que j'attendais.",
    author: "Propriétaire Airbnb",
    place: "Maison familiale",
  },
] as const;

/* ─────────────────────── Formulaire ─────────────────────── */

export const propertyTypes = ["Studio", "Appartement", "Maison", "Loft", "Villa"] as const;

export const goals = [
  "Augmenter mes revenus",
  "Ne plus gérer mon Airbnb",
  "Améliorer mon annonce",
  "Tout déléguer",
] as const;

/* ─────────────────────── FAQ ─────────────────────── */

export const faq = [
  {
    q: "Combien coûte NOVESYA ?",
    a: "NOVESYA fonctionne à la commission, sans abonnement : 15 % avec la formule Essentielle et 20 % avec la formule Premium. Vous ne payez que lorsque votre logement génère des revenus.",
  },
  {
    q: "Comment fonctionne votre commission ?",
    a: "La commission est calculée sur les revenus générés par les réservations de votre logement. Le détail de chaque séjour et de chaque commission apparaît dans votre suivi, pour une lecture parfaitement claire.",
  },
  {
    q: "Qui gère les voyageurs ?",
    a: "NOVESYA. Nous répondons aux demandes, envoyons les consignes, accompagnons les voyageurs pendant leur séjour et gérons les imprévus. Vous n'êtes plus sollicité.",
  },
  {
    q: "Qui s'occupe du ménage ?",
    a: "Nous coordonnons le ménage entre chaque réservation avec des intervenants de confiance, selon un standard hôtelier, pour que le logement soit toujours prêt à accueillir.",
  },
  {
    q: "Comment fonctionne le shooting photo ?",
    a: "Un photographe valorise votre logement : mise en scène des espaces, travail de la lumière, mise en avant des équipements et formats adaptés aux plateformes. D'une valeur de 150 €, il est offert avec la formule Premium.",
  },
  {
    q: "Dois-je fournir le linge ?",
    a: "Avec la formule Premium, la gestion du linge est incluse. Avec la formule Essentielle, nous coordonnons le ménage et définissons ensemble l'organisation du linge la plus adaptée à votre logement.",
  },
  {
    q: "Puis-je garder mon compte Airbnb ?",
    a: "Oui. Nous pouvons travailler directement sur votre compte existant, en tant que co-hôte, afin de conserver votre historique et vos avis.",
  },
  {
    q: "Comment suis-je payé ?",
    a: "Les revenus des réservations vous sont versés selon les modalités de la plateforme de réservation. Les modalités exactes sont détaillées avec vous lors de la mise en place. [À préciser par NOVESYA]",
  },
  {
    q: "Puis-je arrêter la collaboration ?",
    a: "Oui. La collaboration est pensée pour être souple ; les conditions et le préavis sont précisés dans le contrat de gestion. [Préavis à préciser par NOVESYA]",
  },
  {
    q: "Dans quelles villes intervenez-vous ?",
    a: `Nous intervenons actuellement sur ${site.zone.label.toLowerCase()}. Votre logement est situé ailleurs ? Contactez-nous : nous étudions chaque demande. [Zone à préciser par NOVESYA]`,
  },
] as const;
