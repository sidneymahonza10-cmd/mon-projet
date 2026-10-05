"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Texte dont chaque mot monte depuis un masque, au scroll. */
export function SplitWords({ text, className, delay = 0, stagger = 0.05, as = "span" }: { text: string; className?: string; delay?: number; stagger?: number; as?: "span" }) {
  const words = text.split(" ");
  const Tag = as;
  return (
    <Tag className={cn(className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: "105%", rotate: 4 }, show: { y: "0%", rotate: 0, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } } }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
