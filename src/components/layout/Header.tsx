"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, site, whatsappHref } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section active dans la navigation
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Verrouille le scroll et ferme avec Échap quand le menu mobile est ouvert
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-out",
          scrolled
            ? "border-b border-paper/[0.07] bg-ink/72 py-3 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent py-5",
        )}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <a href="#accueil" aria-label={`${site.name} — retour à l'accueil`} className="relative z-10 shrink-0">
            <Logo />
          </a>

          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-1 rounded-full border border-paper/[0.08] bg-paper/[0.03] p-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active === item.href ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-[0.85rem] transition-colors duration-300",
                      active === item.href ? "text-ink" : "text-paper/75 hover:text-paper",
                    )}
                  >
                    {active === item.href && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-paper"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <MagneticButton href="#estimation" variant="gold" className="min-h-11 px-5 text-[0.85rem]">
                Estimer mon logement
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-paper/20 text-paper transition-colors hover:border-paper/50 xl:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-ink xl:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(193,154,91,0.35), transparent 65%)" }}
            />
            <div className="container-x flex items-center justify-between py-5">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="grid size-11 place-items-center rounded-full border border-paper/20 text-paper"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label="Navigation mobile" className="container-x flex flex-1 flex-col justify-center">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between border-b border-paper/[0.08] py-3.5"
                    >
                      <span className="font-display text-[2.1rem] leading-none text-paper transition-colors group-hover:text-gold-soft sm:text-5xl">
                        {item.label}
                      </span>
                      <ArrowUpRight className="size-5 text-smoke transition-colors group-hover:text-gold" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="container-x space-y-5 pb-8 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <MagneticButton href="#estimation" variant="gold" size="lg" className="w-full" onClick={() => setOpen(false)}>
                Estimer mon logement
              </MagneticButton>
              <div className="flex items-center justify-between text-sm text-mist">
                <a href={`mailto:${site.contact.email}`} className="hover:text-paper">
                  {site.contact.email}
                </a>
                <div className="flex gap-3">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-paper">
                    <WhatsAppIcon className="size-5" />
                  </a>
                  <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-paper">
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
