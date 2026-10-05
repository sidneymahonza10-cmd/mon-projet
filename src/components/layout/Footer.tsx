import { ArrowUpRight } from "lucide-react";
import { formulesHref, site, whatsappHref } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

const columns = [
  {
    title: "Navigation",
    links: [
      { label: "Accueil", href: "/#accueil" },
      { label: "Notre histoire", href: "/qui-sommes-nous" },
      { label: "Notre méthode", href: "/#methode" },
      { label: "Estimation", href: "/#estimation" },
    ],
  },
  {
    title: "NOVESYA",
    links: [
      { label: "Services", href: "/#services" },
      { label: "Nos formules", href: formulesHref },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-linen pb-28 pt-20 text-espresso sm:pb-12">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-taupe">{site.tagline}.</p>
            <p className="mt-1 font-display text-xl italic text-caramel-deep">{site.promise}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-taupe transition-colors hover:text-espresso">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-sm font-semibold">Nous suivre & nous écrire</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-taupe transition-colors hover:text-espresso">
                  <InstagramIcon className="size-4" /> Instagram <span className="text-taupe/80">{site.contact.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-taupe transition-colors hover:text-espresso">
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2.5 text-taupe transition-colors hover:text-espresso">
                  <ArrowUpRight className="size-4" /> {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p aria-hidden="true" className="mt-20 select-none whitespace-nowrap text-center font-display text-[19vw] leading-[0.8] tracking-[0.04em] text-sand/60">
          NOVESYA
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-hairline pt-8 text-sm text-taupe sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} NOVESYA Conciergerie. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="/mentions-legales" className="transition-colors hover:text-espresso">
              Mentions légales
            </a>
            <a href="/confidentialite" className="transition-colors hover:text-espresso">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
