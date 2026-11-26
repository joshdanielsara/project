"use client";

import { motion } from "framer-motion";
import { SoftCard } from "@/components/ui/SoftCard";
import type { ScreenProps } from "@/lib/types";

export function GirlfriendQuestionScreen(_props: ScreenProps) {
  return (
    <SoftCard className="text-center">
      <motion.p
        className="text-sm font-medium uppercase tracking-[0.18em] text-rose-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        One last thing...
      </motion.p>

      <motion.h1
        className="font-display mx-auto mt-4 max-w-md text-3xl font-bold leading-tight text-ink sm:mt-5 sm:text-4xl"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.45 }}
      >
        I&apos;d love to make this official with you. ❤️
      </motion.h1>

      <motion.p
        className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink-soft sm:mt-5 sm:text-base sm:leading-7"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        I want to take what we have seriously, and if you&apos;re ready too, I&apos;d be more
        than happy to call you mine.
      </motion.p>
    </SoftCard>
  );
}
