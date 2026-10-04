"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/content";
import { Counter } from "@/components/ui/Counter";

export function Stats() {
  return (
    <section aria-label="NOVESYA en chiffres" className="relative bg-cream pb-24 pt-8 sm:pb-28">
      <div className="container-x">
        <dl className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-hairline bg-porcelain lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col-reverse border-hairline p-6 transition-colors duration-500 hover:bg-linen sm:p-10 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 [&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r"
            >
              <dt className="mt-3 max-w-[16ch] text-taupe">{s.label}</dt>
              <dd>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} duration={1.8} className="font-display text-[3.2rem] leading-none text-espresso transition-colors duration-500 group-hover:text-caramel-deep sm:text-7xl" />
              </dd>
            </motion.div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-taupe">*Données indicatives à personnaliser selon les performances réelles de NOVESYA.</p>
      </div>
    </section>
  );
}
