"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  onBack: () => void;
  neutral?: boolean;
};

export function BackButton({ onBack, neutral = false }: BackButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onBack}
      className={`focus-ring fixed left-4 top-4 z-50 flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium shadow-sm backdrop-blur-md sm:left-5 sm:top-5 ${
        neutral
          ? "border-[#dadce0] bg-white/90 text-[#3c4043] hover:bg-white"
          : "border-white/70 bg-white/80 text-ink-soft hover:bg-white"
      }`}
      aria-label="Go back to previous page"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      <span>Back</span>
    </motion.button>
  );
}
