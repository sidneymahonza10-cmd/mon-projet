import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { goals, planChoices, propertyTypes } from "@/data/content";

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
    console.warn("[NOVESYA] RESEND_API_KEY absente : demande non envoyée par e-mail");
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

/* ───────────── Anti-spam ─────────────
 * 1. Champ piège invisible (_hp) : rempli → robot.
 * 2. Délai minimal (_t) : un humain met plus de 2,5 s à remplir le formulaire.
 * 3. Limite de 5 envois / 10 min par adresse IP (mémoire de l'instance, au mieux).
 * 4. Origine : la requête doit venir du site lui-même.
 * Les robots reçoivent une réponse « ok » pour ne pas les inciter à réessayer.
 */
const WINDOW = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/* ───────────── Validation (côté serveur, indépendante du navigateur) ───────────── */
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
const digits = (v: string) => v.replace(/\D/g, "").length;
const oneOf = <T extends string>(list: readonly T[], v: string) => (list as readonly string[]).includes(v);

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ ok: false, error: "Origine non autorisée." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ ok: false, error: "Format invalide." }, { status: 415 });

  const raw = await request.text();
  if (raw.length > 5000) return NextResponse.json({ ok: false, error: "Requête trop volumineuse." }, { status: 413 });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Robots : réponse neutre, rien n'est envoyé
  const elapsed = Number(body._t) || 0;
  if ((typeof body._hp === "string" && body._hp.trim() !== "") || elapsed < 2500) {
    console.warn("[NOVESYA] Envoi ignoré (anti-spam)", { hp: !!body._hp, elapsed });
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-nf-client-connection-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "Trop de demandes. Réessayez dans quelques minutes." }, { status: 429 });

  const str = (v: unknown, max = 120) => (typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max) : "");
  const source = str(body.source);
  const lead = {
    source,
    formule: str(body.formule),
    city: str(body.city, 80),
    type: str(body.type),
    bedrooms: Number.isInteger(body.bedrooms) ? (body.bedrooms as number) : undefined,
    guests: Number.isInteger(body.guests) ? (body.guests as number) : undefined,
    goals: Array.isArray(body.goals) ? body.goals.map((g) => str(g)).filter((g) => oneOf(goals, g)).slice(0, 4) : [],
    name: str(body.name, 80),
    phone: str(body.phone, 30),
    email: str(body.email, 120).toLowerCase(),
  };

  const errors: string[] = [];
  if (!oneOf(["estimation", "formules"] as const, source)) errors.push("source");
  if (!/^[+\d][\d\s().-]+$/.test(lead.phone) || digits(lead.phone) < 9 || digits(lead.phone) > 15) errors.push("téléphone");
  if (!EMAIL.test(lead.email)) errors.push("e-mail");
  if (source === "estimation") {
    if (!lead.city) errors.push("ville");
    if (!lead.name) errors.push("nom");
    if (!oneOf(propertyTypes, lead.type)) errors.push("type de logement");
    if (lead.bedrooms === undefined || lead.bedrooms < 0 || lead.bedrooms > 8) errors.push("chambres");
    if (lead.guests === undefined || lead.guests < 1 || lead.guests > 16) errors.push("voyageurs");
  }
  if (source === "formules" && !oneOf(planChoices, lead.formule)) errors.push("formule");
  if (errors.length) {
    return NextResponse.json({ ok: false, error: `Champs invalides : ${errors.join(", ")}.` }, { status: 422 });
  }

  console.info("[NOVESYA] Nouvelle demande", { source: lead.source, city: lead.city });
  const sent = await sendEmail(lead).catch((e) => {
    console.error("[NOVESYA] Erreur d'envoi", e);
    return false;
  });
  if (!sent) {
    return NextResponse.json({ ok: false, error: "Envoi impossible pour le moment. Écrivez-nous sur WhatsApp." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
