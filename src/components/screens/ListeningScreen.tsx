"use client";

import { motion } from "framer-motion";
import { SoftCard } from "@/components/ui/SoftCard";
import { BackgroundParticles } from "@/components/ui/BackgroundParticles";
import type { ScreenProps } from "@/lib/types";

export function ListeningScreen({ onNext }: ScreenProps) {
  return (
    <div className="relative w-full max-w-lg">
      <BackgroundParticles />

      <SoftCard className="relative z-10 text-center">
        <motion.div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          aria-hidden
        >
          💌
        </motion.div>

        <motion.h1
          className="font-display text-2xl font-bold leading-snug text-ink sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
        >
          Okay, here&apos;s what I&apos;ve been wanting to ask you...
        </motion.h1>

        <motion.p
          className="mt-4 text-sm text-ink-soft sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
        >
          Take a breath. This next part means a lot to me.
        </motion.p>

        <motion.button
          type="button"
          className="btn-primary focus-ring mt-8 w-full rounded-full px-6 py-3.5 text-base font-semibold sm:w-auto sm:min-w-[220px]"
          onClick={onNext}
          aria-label="I'm listening"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.45 }}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          I&apos;m listening ♡
        </motion.button>
      </SoftCard>
    </div>
  );
}
