"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SoftCardProps = {
  children: ReactNode;
  className?: string;
};

export function SoftCard({ children, className = "" }: SoftCardProps) {
  return (
    <motion.div
      className={`glass-card relative w-full max-w-lg rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-9 ${className}`}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
