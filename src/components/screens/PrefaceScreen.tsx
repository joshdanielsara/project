"use client";

import { motion } from "framer-motion";
import { SoftCard } from "@/components/ui/SoftCard";
import type { ScreenProps } from "@/lib/types";

export function PrefaceScreen({ onNext }: ScreenProps) {
  return (
    <div className="relative w-full max-w-md">
      <SoftCard className="text-center">
        <motion.p
          className="text-sm font-medium tracking-wide text-rose-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Before you begin... ❤️
        </motion.p>

        <motion.h1
          className="font-display mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
        >
          Please read carefully.
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base sm:leading-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
        >
          I made a little something for you, so take your time and enjoy every part of it. No need
          to rush. Hehe.
        </motion.p>

        <motion.button
          type="button"
          className="btn-primary focus-ring mt-8 w-full rounded-full px-6 py-3.5 text-base font-semibold sm:w-auto sm:min-w-[180px]"
          onClick={onNext}
          aria-label="I'm ready"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.45 }}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          I&apos;m ready
        </motion.button>
      </SoftCard>
    </div>
  );
}
