"use client";

import { motion } from "framer-motion";

export function SectionIntermission() {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-rose-50/70 px-6 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="status"
      aria-live="polite"
    >
      <motion.div
        className="flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="text-2xl text-rose-400"
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          ♥
        </motion.span>
        <p className="font-display text-base font-semibold text-ink sm:text-lg">
          Preparing something for you... ❤️
        </p>
      </motion.div>
    </motion.div>
  );
}
