/**
 * Envoi d'une demande (formulaire d'estimation ou page Formules).
 * Les données partent vers /api/lead — voir src/app/api/lead/route.ts pour les brancher
 * sur un e-mail ou un CRM.
 */
export async function sendLead(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
