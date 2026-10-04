import type { Metadata } from "next";
import { HistoirePage } from "@/components/histoire/HistoirePage";

export const metadata: Metadata = {
  title: "Notre histoire",
  description: "NOVESYA, c'est un jeune couple passionné par l'entrepreneuriat qui accompagne chaque propriétaire comme s'il s'agissait de son propre logement.",
  alternates: { canonical: "/qui-sommes-nous" },
};

export default function Page() {
  return <HistoirePage />;
}
