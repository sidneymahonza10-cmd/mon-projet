import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { site } from "@/config/site";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Preloader } from "@/components/layout/Preloader";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "NOVESYA — Conciergerie Airbnb Premium",
    template: "%s — NOVESYA",
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["conciergerie Airbnb", "conciergerie premium", "gestion location courte durée", "gestion Airbnb", "co-hôte Airbnb", "shooting photo Airbnb", "tarification dynamique"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: site.name,
    title: "NOVESYA — Conciergerie Airbnb Premium",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVESYA — Conciergerie Airbnb Premium",
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e9",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-3 focus:text-porcelain">
          Aller au contenu
        </a>
        <Providers>
          <Preloader />
          <SmoothScroll />
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
