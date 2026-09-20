"use client";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Makes every Framer Motion animation respect the visitor's prefers-reduced-motion setting. */
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
