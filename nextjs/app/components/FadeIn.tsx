"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
} & HTMLAttributes<HTMLDivElement>;

export function FadeIn({ children, delay = 0, className, ...rest }: FadeInProps) {
  return (
    <motion.div
      {...rest}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
