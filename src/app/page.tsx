import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Autopilot } from "@/components/sections/Autopilot";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Shooting } from "@/components/sections/Shooting";
import { Services } from "@/components/sections/Services";
import { Dashboard } from "@/components/sections/Dashboard";
import { Pricing } from "@/components/sections/Pricing";
import { Calculator } from "@/components/sections/Calculator";
import { Stats } from "@/components/sections/Stats";
import { MapSection } from "@/components/sections/MapSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ContactForm } from "@/components/sections/ContactForm";
import { faq } from "@/data/content";
import { plans } from "@/data/content";
import { site } from "@/config/site";

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${site.url}/#business`,
      name: `${site.name} Conciergerie`,
      description: site.description,
      url: site.url,
      email: site.contact.email,
      telephone: `+${site.contact.whatsapp}`,
      image: `${site.url}/opengraph-image`,
      sameAs: [site.contact.instagram],
      slogan: site.slogan,
      areaServed: site.zone.cities,
      makesOffer: plans.map((p) => ({
        "@type": "Offer",
        name: `Formule ${p.name}`,
        description: `${p.rate} % de commission sur les revenus générés par les réservations.`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <Manifesto />
      <Autopilot />
      <BeforeAfter />
      <Shooting />
      <Services />
      <Dashboard />
      <Pricing />
      <Calculator />
      <Stats />
      <MapSection />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <ContactForm />
    </>
  );
}
