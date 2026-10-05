"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Respecte automatiquement prefers-reduced-motion pour toutes les animations. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
