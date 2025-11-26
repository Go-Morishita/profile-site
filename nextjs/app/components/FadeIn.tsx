"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  viewportOnce?: boolean;
  viewportAmount?: number | "some" | "all";
} & Omit<HTMLMotionProps<"div">, "children">;

export function FadeIn({
  children,
  delay = 0,
  className,
  viewportOnce = true,
  viewportAmount = 0.25,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      {...rest}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: viewportOnce, amount: viewportAmount }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
