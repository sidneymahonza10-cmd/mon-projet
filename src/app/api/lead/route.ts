import { NextResponse } from "next/server";
import { site } from "@/config/site";

/**
 * Réception des demandes (formulaire de contact et page « Nos formules »).
 * Chaque demande est envoyée par e-mail via Resend (https://resend.com).
 *
 * Variables d'environnement (à définir chez l'hébergeur) :
 *  - RESEND_API_KEY  : clé API Resend (obligatoire pour recevoir les e-mails)
 *  - LEAD_EMAIL_TO   : adresse qui reçoit les demandes (défaut : e-mail de contact du site)
 *  - LEAD_EMAIL_FROM : expéditeur, sur un domaine vérifié dans Resend
 *                      (ex. « NOVESYA <site@novesya.fr> » ; défaut : adresse de test Resend)
 * Sans RESEND_API_KEY, la demande est seulement journalisée côté serveur.
 */

const labels: Record<string, string> = {
  source: "Origine",
  formule: "Formule",
  name: "Nom",
  phone: "Téléphone",
  email: "E-mail",
  city: "Ville",
  type: "Type de logement",
  bedrooms: "Chambres",
  guests: "Voyageurs",
  goals: "Objectifs",
};

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEmail(lead: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[NOVESYA] RESEND_API_KEY absente : demande non envoyée par e-mail", lead);
    return true;
  }

  const rows = Object.entries(labels)
    .map(([k, label]) => {
      const v = lead[k];
      const text = Array.isArray(v) ? v.join(", ") : v === undefined || v === "" ? "" : String(v);
      return text ? `<tr><td style="padding:6px 16px 6px 0;color:#6b5f55">${label}</td><td style="padding:6px 0;color:#2a201a"><strong>${escape(text)}</strong></td></tr>` : "";
    })
    .join("");
  const who = String(lead.name || lead.email);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_EMAIL_FROM || "NOVESYA <onboarding@resend.dev>",
      to: [process.env.LEAD_EMAIL_TO || site.contact.email],
      reply_to: String(lead.email),
      subject: `Nouvelle demande NOVESYA — ${who}${lead.city ? ` (${lead.city})` : ""}`,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px"><p style="color:#8a5d28;letter-spacing:.1em;font-size:12px">NOUVELLE DEMANDE · SITE NOVESYA</p><table>${rows}</table><p style="color:#6b5f55;font-size:13px">Répondez directement à cet e-mail pour écrire au propriétaire.</p></div>`,
    }),
  });
  if (!res.ok) console.error("[NOVESYA] Échec de l'envoi Resend", res.status, await res.text());
  return res.ok;
}

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
  const sent = await sendEmail(lead).catch((e) => {
    console.error("[NOVESYA] Erreur d'envoi", e);
    return false;
  });
  if (!sent) {
    return NextResponse.json({ ok: false, error: "Envoi impossible pour le moment. Écrivez-nous sur WhatsApp." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
