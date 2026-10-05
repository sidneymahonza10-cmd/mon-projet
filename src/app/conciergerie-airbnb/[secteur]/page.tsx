import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { secteurs, secteurHref } from "@/data/secteurs";
import { SecteurPage } from "@/components/secteurs/SecteurPage";

export function generateStaticParams() {
  return secteurs.map((s) => ({ secteur: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ secteur: string }> }): Promise<Metadata> {
  const { secteur } = await params;
  const s = secteurs.find((x) => x.slug === secteur);
  if (!s) return {};
  return { title: { absolute: `${s.metaTitle} | NOVESYA` }, description: s.metaDescription, alternates: { canonical: secteurHref(s.slug) } };
}

export default async function Page({ params }: { params: Promise<{ secteur: string }> }) {
  const { secteur } = await params;
  const s = secteurs.find((x) => x.slug === secteur);
  if (!s) notFound();
  return <SecteurPage secteur={s} />;
}
