"use client";

import { motion } from "framer-motion";
import type { ScreenProps } from "@/lib/types";

type StoryBeatScreenProps = ScreenProps & {
  lines: string[];
  buttonLabel?: string;
};

export function StoryBeatScreen({
  lines,
  onNext,
  buttonLabel = "Continue ♡",
}: StoryBeatScreenProps) {
  return (
    <motion.section
      className="w-full max-w-md px-2 text-center sm:max-w-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      aria-live="polite"
    >
      <div className="mx-auto flex min-h-[40vh] flex-col items-center justify-center">
        <div className="space-y-4">
          {lines.map((line, index) => (
            <motion.p
              key={line}
              className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl sm:leading-snug"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.14, duration: 0.45 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.button
          type="button"
          className="btn-primary focus-ring mt-10 rounded-full px-8 py-3.5 text-base font-semibold"
          onClick={onNext}
          aria-label={buttonLabel}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + lines.length * 0.12, duration: 0.4 }}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          {buttonLabel}
        </motion.button>
      </div>
    </motion.section>
  );
}
