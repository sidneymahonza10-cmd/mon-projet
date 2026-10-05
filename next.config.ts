import type { NextConfig } from "next";
import { site } from "./src/config/site";

const isDev = process.env.NODE_ENV !== "production";
const canonical = new URL(site.url);
const bareHost = canonical.hostname.replace(/^www\./, "");

/** Mesure d'audience (Umami) : seul service externe autorisé, chargé après consentement. */
const analyticsOrigins = "https://cloud.umami.is https://api-gateway.umami.dev";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${analyticsOrigins}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self' data:",
  `connect-src 'self' ${analyticsOrigins}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // HTTPS obligatoire pendant 2 ans, sous-domaines compris
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    return [
      // Force le HTTPS (derrière l'hébergeur, le protocole d'origine arrive dans x-forwarded-proto)
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: `${site.url}/:path*`,
        permanent: true,
      },
      // Adresse unique : novesya.fr → www.novesya.fr
      ...(canonical.hostname !== bareHost
        ? [{ source: "/:path*", has: [{ type: "host" as const, value: bareHost }], destination: `${site.url}/:path*`, permanent: true }]
        : []),
    ];
  },
};

export default nextConfig;
