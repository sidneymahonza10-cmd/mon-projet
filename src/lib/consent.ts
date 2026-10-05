import { useSyncExternalStore } from "react";

/**
 * Consentement « mesure d'audience » (cookies / traceurs).
 * Choix mémorisé 6 mois dans le navigateur, puis redemandé (recommandation CNIL).
 */
export type Consent = "granted" | "denied" | null;

const KEY = "novesya-consent";
const MAX_AGE = 1000 * 60 * 60 * 24 * 182;
const EVENT = "novesya-consent-change";
const OPEN_EVENT = "novesya-consent-open";

function read(): Consent {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { value, at } = JSON.parse(raw) as { value: Consent; at: number };
    return Date.now() - at < MAX_AGE ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Exclude<Consent, null>) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ value, at: Date.now() }));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** Rouvre la bannière (lien « Gérer les cookies »). */
export function openConsent() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Choix actuel ; « undefined » tant que la page n'est pas hydratée. */
export function useConsent(): Consent | undefined {
  return useSyncExternalStore(subscribe, read, () => undefined);
}

export function onConsentOpen(cb: () => void) {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}
