import { NextResponse } from "next/server";

/**
 * Réception des demandes (estimation et page « Nos formules »).
 * À BRANCHER : envoi d'e-mail (Resend, Brevo…), CRM, Google Sheets, etc.
 * Pour l'instant la demande est validée puis journalisée côté serveur.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 200) : "");
  const lead = {
    source: str(body.source) || "site",
    formule: str(body.formule),
    city: str(body.city),
    type: str(body.type),
    bedrooms: Number(body.bedrooms) || undefined,
    guests: Number(body.guests) || undefined,
    goals: Array.isArray(body.goals) ? body.goals.map(str).slice(0, 4) : [],
    name: str(body.name),
    phone: str(body.phone),
    email: str(body.email),
  };

  if (!lead.phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "Téléphone ou e-mail manquant ou invalide." }, { status: 422 });
  }

  console.info("[NOVESYA] Nouvelle demande", lead);
  return NextResponse.json({ ok: true });
}
