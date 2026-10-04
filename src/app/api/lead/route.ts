import { NextResponse } from "next/server";

/**
 * Réception des demandes d'estimation.
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
    city: str(body.city),
    type: str(body.type),
    bedrooms: Number(body.bedrooms) || 0,
    guests: Number(body.guests) || 0,
    goals: Array.isArray(body.goals) ? body.goals.map(str).slice(0, 4) : [],
    name: str(body.name),
    phone: str(body.phone),
    email: str(body.email),
  };

  if (!lead.city || !lead.name || !lead.phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "Champs manquants ou invalides." }, { status: 422 });
  }

  console.info("[NOVESYA] Nouvelle demande d'estimation", lead);
  return NextResponse.json({ ok: true });
}
