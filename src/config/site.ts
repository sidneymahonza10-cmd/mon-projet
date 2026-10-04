/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURATION NOVESYA — à personnaliser
 * ─────────────────────────────────────────────────────────────
 *  Toutes les informations marquées « PLACEHOLDER » sont provisoires.
 *  Remplacez-les ici : elles sont reprises automatiquement partout
 *  sur le site (header, footer, bouton WhatsApp, SEO, formulaire…).
 */

export const site = {
  name: "NOVESYA",
  tagline: "Conciergerie Airbnb premium",
  slogan: "Votre logement travaille. NOVESYA s'occupe du reste.",
  promise: "Nous gérons. Vous encaissez.",
  description:
    "NOVESYA accompagne les propriétaires dans la gestion, l'optimisation et la valorisation de leurs locations Airbnb.",

  // PLACEHOLDER — domaine définitif du site (utilisé pour le SEO / Open Graph)
  url: "https://www.novesya.fr",

  contact: {
    // PLACEHOLDER — numéro WhatsApp au format international, sans « + » ni espaces
    // ex. 33612345678 pour +33 6 12 34 56 78
    whatsapp: "33600000000",
    // PLACEHOLDER — numéro affiché
    phoneDisplay: "+33 6 00 00 00 00",
    // PLACEHOLDER — adresse e-mail
    email: "contact@novesya.fr",
    // PLACEHOLDER — lien Instagram
    instagram: "https://www.instagram.com/novesya",
    instagramHandle: "@novesya",
  },

  // Zone d'intervention
  zone: {
    label: "le sud de la Seine-et-Marne (77), l'Essonne (91) et le Val-de-Marne (94) proche de l'Essonne",
    short: "Sud 77 · Essonne 91 · Val-de-Marne 94",
    cities: ["Seine-et-Marne (77) sud", "Essonne (91)", "Val-de-Marne (94)"],
  },

  whatsappMessage:
    "Bonjour NOVESYA, je souhaite obtenir une estimation pour mon logement Airbnb.",
} as const;

export const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

/** Lien de la page « Nos formules » (prise de contact privée) */
export const formulesHref = "/formules";

/** Lien de la page « Notre histoire » */
export const histoireHref = "/qui-sommes-nous";

export const nav = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Notre histoire", href: "/qui-sommes-nous" },
  { label: "Notre méthode", href: "/#methode" },
  { label: "Services", href: "/#services" },
  { label: "Formules", href: "/#formules" },
  { label: "Estimation", href: "/#estimation" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;
