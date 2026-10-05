/**
 * Envoi d'une demande (formulaire d'estimation ou page Formules) vers /api/lead,
 * qui valide tout côté serveur puis transmet la demande par e-mail.
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

/** Nom du champ piège (invisible pour les humains, rempli par les robots). */
export const HONEYPOT = "site_web";

/** Indices anti-spam joints à chaque envoi : champ piège et temps passé sur le formulaire. */
export function spamSignals(form: HTMLFormElement, startedAt: number) {
  const trap = form.elements.namedItem(HONEYPOT);
  return { _hp: trap instanceof HTMLInputElement ? trap.value : "", _t: startedAt ? Date.now() - startedAt : 0 };
}
