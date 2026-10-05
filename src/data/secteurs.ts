/* ─────────────────────── Pages secteurs (SEO local) ─────────────────────── */

export type Secteur = {
  slug: string;
  dept: string;
  name: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  demand: { title: string; text: string }[];
  towns: string[];
  faq: { q: string; a: string }[];
};

export const secteurs: Secteur[] = [
  {
    slug: "essonne",
    dept: "91",
    name: "Essonne",
    short: "l'Essonne",
    metaTitle: "Conciergerie Airbnb en Essonne (91) — Évry, Massy, Corbeil",
    metaDescription:
      "Conciergerie Airbnb premium en Essonne : gestion de l'annonce, des voyageurs, du ménage et des prix à Évry, Massy, Corbeil-Essonnes, Brétigny et Étampes.",
    intro:
      "De Massy à Étampes, nous gérons votre location courte durée de A à Z : annonce, voyageurs, ménage, linge et tarification. Vous suivez vos revenus, nous nous occupons du reste.",
    demand: [
      { title: "Voyageurs d'affaires", text: "Le plateau de Saclay, Évry et Massy attirent toute l'année des séjours professionnels en semaine." },
      { title: "Proximité d'Orly", text: "L'aéroport à quelques minutes : une clientèle de transit qui recherche des logements pratiques et soignés." },
      { title: "Accès à Paris", text: "RER B, C et D : les voyageurs profitent de Paris en dormant au calme, à un tarif plus doux." },
    ],
    towns: ["Évry-Courcouronnes", "Massy", "Corbeil-Essonnes", "Brétigny-sur-Orge", "Étampes", "Savigny-sur-Orge", "Palaiseau", "Juvisy-sur-Orge", "Draveil"],
    faq: [
      { q: "Intervenez-vous dans toute l'Essonne ?", a: "Oui, nous couvrons l'ensemble du département. Pour les communes les plus éloignées, l'organisation du ménage et de l'accueil est validée ensemble lors de la visite." },
      { q: "Mon logement à Évry peut-il être rentable en Airbnb ?", a: "Cela dépend du type de bien, de sa situation et de la réglementation locale. Nous évaluons son potentiel gratuitement lors d'un premier échange." },
    ],
  },
  {
    slug: "seine-et-marne-sud",
    dept: "77",
    name: "Sud Seine-et-Marne",
    short: "le sud de la Seine-et-Marne",
    metaTitle: "Conciergerie Airbnb Sud Seine-et-Marne (77) — Melun, Fontainebleau",
    metaDescription:
      "Conciergerie Airbnb premium dans le sud du 77 : gestion complète de votre location courte durée à Melun, Fontainebleau, Lieusaint et Brie-Comte-Robert.",
    intro:
      "Melun, Fontainebleau, Lieusaint : nous valorisons votre logement auprès des voyageurs et en assurons la gestion complète, de la réservation au départ.",
    demand: [
      { title: "Tourisme", text: "Le château et la forêt de Fontainebleau attirent visiteurs, randonneurs et grimpeurs toute l'année." },
      { title: "Séjours professionnels", text: "Melun et Sénart accueillent entreprises, administrations et missions de courte durée." },
      { title: "Week-ends au vert", text: "Une clientèle parisienne en quête de calme, à moins d'une heure de la capitale." },
    ],
    towns: ["Melun", "Fontainebleau", "Lieusaint", "Brie-Comte-Robert", "Savigny-le-Temple", "Dammarie-lès-Lys", "Moissy-Cramayel", "Avon"],
    faq: [
      { q: "Jusqu'où intervenez-vous en Seine-et-Marne ?", a: "Nous couvrons le sud du département, autour de Melun, Sénart et Fontainebleau. Contactez-nous pour vérifier votre commune." },
    ],
  },
  {
    slug: "val-de-marne",
    dept: "94",
    name: "Val-de-Marne",
    short: "le Val-de-Marne",
    metaTitle: "Conciergerie Airbnb Val-de-Marne (94) — Orly, Choisy, Villeneuve",
    metaDescription:
      "Conciergerie Airbnb premium dans le Val-de-Marne proche de l'Essonne : gestion de votre location courte durée à Orly, Choisy-le-Roi et Villeneuve-Saint-Georges.",
    intro:
      "Autour d'Orly et en bordure de l'Essonne, nous prenons en charge votre location courte durée pour qu'elle travaille sans vous prendre de temps.",
    demand: [
      { title: "Aéroport d'Orly", text: "Des voyageurs de transit et des équipages qui privilégient des logements proches et faciles d'accès." },
      { title: "Paris en RER", text: "Une situation idéale pour visiter la capitale tout en profitant de prix plus accessibles." },
      { title: "Missions courtes", text: "Marché d'intérêt national de Rungis et zones d'activité : une demande professionnelle régulière." },
    ],
    towns: ["Orly", "Choisy-le-Roi", "Villeneuve-Saint-Georges", "Thiais", "Villeneuve-le-Roi", "Valenton"],
    faq: [
      { q: "Couvrez-vous tout le Val-de-Marne ?", a: "Nous intervenons dans les communes du 94 proches de l'Essonne, autour d'Orly. Contactez-nous pour vérifier votre adresse." },
    ],
  },
];

export const secteurHref = (slug: string) => `/conciergerie-airbnb/${slug}`;
