import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { secteurs, secteurHref } from "@/data/secteurs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/qui-sommes-nous`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/formules`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...secteurs.map((s) => ({ url: `${site.url}${secteurHref(s.slug)}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${site.url}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/cgu`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
