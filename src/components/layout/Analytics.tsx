"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";

/**
 * Mesure d'audience Umami (https://umami.is) — sans cookie, hébergée en Europe en option.
 * Chargée uniquement si NEXT_PUBLIC_UMAMI_WEBSITE_ID est défini ET si le visiteur a accepté.
 */
const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export function Analytics() {
  const consent = useConsent();
  if (!websiteId || consent !== "granted") return null;
  return <Script src="https://cloud.umami.is/script.js" data-website-id={websiteId} strategy="afterInteractive" />;
}
