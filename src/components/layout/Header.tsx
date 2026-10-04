"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { formulesHref, nav, site, whatsappHref } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";

const idOf = (href: string) => href.split("#")[1] ?? "";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const pathname = usePathname();
  // Comparaison tolérante (fonctionne aussi pour un export statique servi dans un sous-dossier)
  const current = pathname.replace(/\/$/, "").replace(/\.html$/, "");
  const subPages = ["/formules", "/qui-sommes-nous", "/mentions-legales", "/confidentialite"];
  const isHome = !subPages.some((p) => current.endsWith(p));
  const isOn = (href: string) => (href.includes("#") ? isHome && active === idOf(href) : current.endsWith(href));

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 600 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const el = document.getElementById(idOf(n.href));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]"
      >
        <div className={cn("transition-all duration-500", scrolled ? "py-2.5" : "py-5")}>
          <div className="container-x">
            <div
              className={cn(
                "flex items-center justify-between gap-6 rounded-full transition-all duration-500",
                scrolled ? "glass px-3 py-2 pl-5 shadow-[0_18px_40px_-24px_rgba(42,32,26,0.4)]" : "px-0 py-0",
              )}
            >
              {/* Lien natif volontaire : défilement fluide géré par Lenis */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/#accueil" aria-label={`${site.name} — retour à l'accueil`} className="shrink-0">
                <Logo className={cn("origin-left transition-transform duration-500", scrolled && "scale-[0.86]")} />
              </a>

              <nav aria-label="Navigation principale" className="hidden xl:block">
                <ul className="flex items-center gap-0.5">
                  {nav.map((item) => {
                    const on = isOn(item.href);
                    return (
                      <li key={item.href}>
                        <a href={item.href} aria-current={on ? "true" : undefined} className={cn("relative block whitespace-nowrap rounded-full px-3 py-2 text-[0.84rem] transition-colors duration-300", on ? "text-porcelain" : "text-espresso/75 hover:text-espresso")}>
                          {on && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-espresso" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                          <span className="relative">{item.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                  <MagneticButton href={formulesHref} variant="caramel" className="min-h-11 px-5 text-[0.85rem]">
                    Découvrir nos formules
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </MagneticButton>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Ouvrir le menu"
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  className="grid size-11 place-items-center rounded-full bg-espresso text-porcelain transition-transform hover:scale-105 xl:hidden"
                >
                  <Menu className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-forest text-porcelain xl:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x flex items-center justify-between py-5">
              <Logo tone="light" />
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu" className="grid size-11 place-items-center rounded-full bg-porcelain text-forest">
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label="Navigation mobile" className="container-x flex flex-1 flex-col justify-center py-6">
              <ul>
                {nav.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                    <a href={item.href} onClick={() => setOpen(false)} className="group flex items-baseline justify-between border-b border-porcelain/15 py-3">
                      <span className="font-display text-[2.2rem] leading-none transition-all duration-300 group-hover:translate-x-2 group-hover:italic group-hover:text-sand sm:text-5xl">{item.label}</span>
                      <ArrowUpRight className="size-5 text-sand" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div className="container-x space-y-5 pb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
              <MagneticButton href={formulesHref} variant="caramel" size="lg" className="w-full" onClick={() => setOpen(false)}>
                Découvrir nos formules
              </MagneticButton>
              <div className="flex items-center justify-between text-sm text-mint-ink">
                <span className="select-all">{site.contact.email}</span>
                <div className="flex gap-4">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-porcelain">
                    <WhatsAppIcon className="size-5" />
                  </a>
                  <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-porcelain">
                    <InstagramIcon className="size-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
