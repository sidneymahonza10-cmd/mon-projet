import { ArrowUpRight } from "lucide-react";
import { site, whatsappHref } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

const columns = [
  {
    title: "Navigation",
    links: [
      { label: "Accueil", href: "/#accueil" },
      { label: "Notre méthode", href: "/#methode" },
      { label: "Estimation", href: "/#estimation" },
    ],
  },
  {
    title: "NOVESYA",
    links: [
      { label: "Services", href: "/#services" },
      { label: "Tarifs", href: "/#tarifs" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-paper/[0.07] bg-ink pb-28 pt-20 text-paper sm:pb-12">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-mist">{site.tagline}.</p>
            <p className="mt-2 max-w-xs font-display text-xl italic text-gold-soft">{site.promise}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-medium text-paper">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-mist transition-colors hover:text-paper">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-medium text-paper">Nous suivre & nous écrire</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-mist transition-colors hover:text-paper">
                  <InstagramIcon className="size-4" /> Instagram <span className="text-smoke">{site.contact.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-mist transition-colors hover:text-paper">
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2.5 text-mist transition-colors hover:text-paper">
                  <ArrowUpRight className="size-4" /> {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-paper/[0.07] pt-8 text-sm text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} NOVESYA Conciergerie. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="/mentions-legales" className="transition-colors hover:text-paper">
              Mentions légales
            </a>
            <a href="/confidentialite" className="transition-colors hover:text-paper">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
