"use client";

import { openConsent } from "@/lib/consent";

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsent} className={className}>
      Gérer les cookies
    </button>
  );
}
