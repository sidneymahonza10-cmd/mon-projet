import type { Metadata } from "next";
import { FormulesPage } from "@/components/formules/FormulesPage";

export const metadata: Metadata = {
  title: "Nos formules",
  description: "Découvrez les formules Essentielle et Premium de NOVESYA et recevez nos conditions en privé.",
  alternates: { canonical: "/formules" },
};

export default function Page() {
  return <FormulesPage />;
}
