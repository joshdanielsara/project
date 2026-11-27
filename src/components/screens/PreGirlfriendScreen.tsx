"use client";

import { motion } from "framer-motion";
import { SoftCard } from "@/components/ui/SoftCard";
import { BackgroundParticles } from "@/components/ui/BackgroundParticles";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import type { ScreenProps } from "@/lib/types";

export function PreGirlfriendScreen(_props: ScreenProps) {
  return (
    <div className="relative w-full max-w-lg">
      <BackgroundParticles />
      <FloatingHearts count={6} active />

      <SoftCard className="relative z-10 text-center">
        <div className="mb-3 flex items-center justify-center gap-2" aria-hidden>
          <span className="text-rose-300">❀</span>
          <span className="text-rose-400">♥</span>
          <span className="text-rose-300">❀</span>
        </div>

        <motion.p
          className="font-display text-lg font-semibold text-ink sm:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
        >
          A little more from me...
        </motion.p>

        <motion.h1
          className="font-display mx-auto mt-4 max-w-md text-3xl font-bold leading-tight text-ink sm:mt-5 sm:text-4xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
        >
          I&apos;d love to make this official with you. ❤️
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink-soft sm:mt-5 sm:text-base sm:leading-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5 }}
        >
          I want to take what we have seriously, and if you&apos;re ready too, I&apos;d be more
          than happy to call you mine.
        </motion.p>

        <motion.p
          className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-ink-soft sm:mt-6 sm:text-[0.95rem] sm:leading-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.55 }}
        >
          If you&apos;re not ready yet, that&apos;s completely okay. I don&apos;t want you to feel
          pressured or rushed. We can take our time and figure things out together. ❤️
        </motion.p>
      </SoftCard>
    </div>
  );
}
