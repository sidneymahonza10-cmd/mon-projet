"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/content";
import { Counter } from "@/components/ui/Counter";

export function Stats() {
  return (
    <section aria-label="NOVESYA en chiffres" className="relative z-10 -mt-8 rounded-t-[2rem] bg-linen py-24 text-ink sm:-mt-10 sm:rounded-t-[2.75rem] sm:py-28">
      <div className="container-x">
        <dl className="grid grid-cols-2 gap-y-14 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col-reverse border-l border-sand/70 px-5 sm:px-8"
            >
              <dt className="mt-3 max-w-[16ch] text-stone">{s.label}</dt>
              <dd>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} duration={1.8} className="font-display text-[3.4rem] leading-none sm:text-7xl" />
              </dd>
            </motion.div>
          ))}
        </dl>
        <p className="mt-14 text-sm text-stone">*Données indicatives à personnaliser selon les performances réelles de NOVESYA.</p>
      </div>
    </section>
  );
}
