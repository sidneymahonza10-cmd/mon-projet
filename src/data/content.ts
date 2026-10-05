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

/* ─────────────────────────── Formules ───────────────────────────
 * Les conditions tarifaires ne sont pas affichées sur le site :
 * elles sont présentées en privé après prise de contact.
 */

export const plans = [
  {
    id: "essentielle",
    name: "Essentielle",
    code: "NOV",
    pitch: "Vous gardez le contrôle, nous gérons l'essentiel.",
    ideal: "Idéale si vous assurez vous-même l'accueil des voyageurs.",
    intro: null as string | null,
    features: [
      "Création / optimisation de l'annonce",
      "Gestion des réservations",
      "Communication voyageurs",
      "Optimisation tarifaire",
      "Coordination du ménage",
      "Suivi des performances",
    ],
    featured: false,
  },
  {
    id: "premium",
    name: "Premium",
    code: "SYA",
    pitch: "L'excellence dans chaque détail. Vous n'avez plus rien à gérer.",
    ideal: "Idéale pour tout déléguer, de l'accueil au linge.",
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
    featured: true,
  },
] as const;

export const planChoices = ["Essentielle", "Premium", "Je ne sais pas encore"] as const;

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

/* ─────────────────────── Statistiques ─────────────────────── */
export const stats = [
  { prefix: "", value: 24, suffix: "/7", label: "assistance voyageurs" },
  { prefix: "", value: 100, suffix: " %", label: "de gestion déléguée" },
  { prefix: "", value: 1, suffix: "", label: "interlocuteur dédié" },
] as const;

/* ─────────────────────── Carte — zone d'intervention ───────────────────────
 * Villes affichées avec le logo NOVESYA. Ajoutez / retirez des communes ici.
 * x / y : position sur la carte, en % (projection simplifiée de la longitude / latitude).
 */
export type Department = { id: "77" | "91" | "94"; name: string; detail: string };

export const departments: Department[] = [
  { id: "91", name: "Essonne", detail: "Tout le département" },
  { id: "77", name: "Seine-et-Marne", detail: "Sud du département" },
  { id: "94", name: "Val-de-Marne", detail: "Communes proches de l'Essonne" },
];

export const towns: { name: string; dept: Department["id"]; x: number; y: number }[] = [
  { name: "Évry-Courcouronnes", dept: "91", x: 38, y: 31 },
  { name: "Corbeil-Essonnes", dept: "91", x: 51, y: 38 },
  { name: "Massy", dept: "91", x: 22, y: 13 },
  { name: "Brétigny-sur-Orge", dept: "91", x: 25, y: 34 },
  { name: "Juvisy-sur-Orge", dept: "91", x: 30, y: 21 },
  { name: "Draveil", dept: "91", x: 42, y: 17 },
  { name: "Étampes", dept: "91", x: 11, y: 64 },
  { name: "Melun", dept: "77", x: 61, y: 45 },
  { name: "Fontainebleau", dept: "77", x: 65, y: 69 },
  { name: "Lieusaint", dept: "77", x: 63, y: 30 },
  { name: "Brie-Comte-Robert", dept: "77", x: 67, y: 17 },
  { name: "Orly", dept: "94", x: 33, y: 10 },
  { name: "Villeneuve-Saint-Georges", dept: "94", x: 41, y: 11 },
  { name: "Choisy-le-Roi", dept: "94", x: 36, y: 5 },
];

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
    a: "Chaque logement est différent : nos conditions sont donc présentées personnellement. Laissez votre téléphone et votre e-mail sur la page « Nos formules », un conseiller NOVESYA vous contacte en privé sous 24h.",
  },
  {
    q: "Quelle est la différence entre Essentielle et Premium ?",
    a: "Essentielle couvre l'annonce, les réservations, les voyageurs, les prix et la coordination du ménage. Premium y ajoute l'accueil (check-in / check-out), le linge, les incidents, un reporting mensuel et un shooting photo professionnel offert.",
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
    a: "Avec la formule Premium, la gestion du linge est incluse. Avec la formule Essentielle, nous définissons ensemble l'organisation du linge la plus adaptée à votre logement.",
  },
  {
    q: "Puis-je garder mon compte Airbnb ?",
    a: "Oui. Nous pouvons travailler directement sur votre compte existant, en tant que co-hôte, afin de conserver votre historique et vos avis.",
  },
  {
    q: "Dans quelles villes intervenez-vous ?",
    a: `Nous intervenons dans ${site.zone.label}. Votre logement est situé juste à côté ? Contactez-nous : nous étudions chaque demande.`,
  },
] as const;
