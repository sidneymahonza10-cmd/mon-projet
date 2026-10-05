"use client";

import { motion } from "framer-motion";
import { whatsappHref } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Bouton WhatsApp flottant — le numéro et le message se règlent dans src/config/site.ts */
export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Une question ? Écrivez-nous sur WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-porcelain px-4 py-2 text-sm font-medium text-espresso opacity-0 shadow-[0_12px_30px_-12px_rgba(42,32,26,0.45)] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Une question ? Écrivez-nous
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-forest text-porcelain shadow-[0_16px_34px_-12px_rgba(36,50,31,0.7)]">
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-sage animate-ping-soft" />
        <WhatsAppIcon className="relative size-6" />
      </span>
    </motion.a>
  );
}
