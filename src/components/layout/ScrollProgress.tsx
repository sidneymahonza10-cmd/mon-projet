"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Fin filet de progression de lecture en haut de page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[61] h-[2px] origin-left bg-caramel" style={{ scaleX }} />;
}
