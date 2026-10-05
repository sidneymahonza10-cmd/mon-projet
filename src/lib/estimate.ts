/**
 * ─────────────────────────────────────────────────────────────
 *  MODÈLE D'ESTIMATION — INDICATIF
 * ─────────────────────────────────────────────────────────────
 *  Hypothèses volontairement simples et transparentes.
 *  Ajustez-les selon les données réelles de NOVESYA.
 *  Aucun résultat n'est garanti : c'est une projection.
 */

export const PROPERTY_TYPES = ["Studio", "Appartement", "Maison", "Loft", "Villa"] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export type EstimateInput = {
  city: string;
  type: PropertyType;
  bedrooms: number;
  guests: number;
  surface: number;
  price: number;
  nights: number;
};

export const model = {
  /** Taux d'occupation supposé d'un logement géré seul */
  currentOccupancy: 0.6,
  /** Taux d'occupation de base avec une gestion optimisée */
  optimizedOccupancy: 0.74,
  maxOccupancy: 0.9,
  /** Villes à forte demande (bonus d'occupation et de prix) — PLACEHOLDER à adapter */
  highDemandCities: ["paris", "nice", "cannes", "lyon", "bordeaux", "marseille", "biarritz", "annecy", "montpellier", "la rochelle", "lille", "nantes", "toulouse", "strasbourg"],
  cityBonus: { occupancy: 0.04, price: 0.03 },
  byType: {
    Studio: { occupancy: 0.03, price: 0.08 },
    Appartement: { occupancy: 0.0, price: 0.1 },
    Loft: { occupancy: 0.01, price: 0.12 },
    Maison: { occupancy: -0.03, price: 0.12 },
    Villa: { occupancy: -0.06, price: 0.14 },
  } satisfies Record<PropertyType, { occupancy: number; price: number }>,
  /** Saisonnalité moyenne (janvier → décembre), moyenne = 1 */
  seasonality: [0.8, 0.82, 0.9, 0.98, 1.04, 1.14, 1.27, 1.29, 1.07, 0.95, 0.85, 0.89],
};

export type EstimateResult = {
  monthly: number;
  currentMonthly: number;
  occupancy: number;
  annual: number;
  extraAnnual: number;
  optimizedPrice: number;
  months: { label: string; current: number; optimized: number }[];
};

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

export function estimate(input: EstimateInput): EstimateResult {
  const typeAdj = model.byType[input.type];
  const city = input.city.trim().toLowerCase();
  const isHighDemand = model.highDemandCities.some((c) => city.includes(c));

  // Espace par voyageur généreux → potentiel de prix légèrement supérieur
  const spaceBonus = input.guests > 0 && input.surface / input.guests >= 16 ? 0.02 : 0;

  const priceUplift = typeAdj.price + spaceBonus + (isHighDemand ? model.cityBonus.price : 0);
  const occupancy = Math.min(
    model.maxOccupancy,
    model.optimizedOccupancy + typeAdj.occupancy + (isHighDemand ? model.cityBonus.occupancy : 0),
  );

  const optimizedPrice = input.price * (1 + priceUplift);
  const monthly = optimizedPrice * input.nights * occupancy;
  const currentMonthly = input.price * input.nights * model.currentOccupancy;

  const months = MONTHS.map((label, i) => ({
    label,
    current: currentMonthly * model.seasonality[i],
    optimized: monthly * model.seasonality[i],
  }));

  return {
    monthly: Math.round(monthly),
    currentMonthly: Math.round(currentMonthly),
    occupancy: Math.round(occupancy * 100),
    annual: Math.round(monthly * 12),
    extraAnnual: Math.max(0, Math.round((monthly - currentMonthly) * 12)),
    optimizedPrice: Math.round(optimizedPrice),
    months,
  };
}
