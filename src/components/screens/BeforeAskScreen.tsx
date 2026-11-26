"use client";

import { motion } from "framer-motion";
import { SoftCard } from "@/components/ui/SoftCard";
import { BackgroundParticles } from "@/components/ui/BackgroundParticles";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import type { ScreenProps } from "@/lib/types";

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export function BeforeAskScreen({ onNext }: ScreenProps) {
  return (
    <div className="relative w-full max-w-lg">
      <BackgroundParticles />
      <FloatingHearts count={6} active />

      <SoftCard className="relative z-10">
        <div className="mb-3 flex items-center justify-center gap-2" aria-hidden>
          <span className="text-rose-300">❀</span>
          <span className="text-rose-400">♥</span>
          <span className="text-rose-300">❀</span>
        </div>

        <h1 className="sr-only">Shared moments</h1>

        <motion.div
          className="mt-2 space-y-4 rounded-[1.25rem] border border-rose-100/90 bg-gradient-to-b from-white/90 to-rose-50/60 p-4 text-left text-sm leading-relaxed text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:rounded-[1.5rem] sm:p-6 sm:text-[0.95rem] sm:leading-7"
          {...fadeUp}
          transition={{ delay: 0.12, duration: 0.45 }}
        >
          <p>
            I&apos;ve really enjoyed the moments we&apos;ve shared, and I&apos;m glad nga nagka-close
            ta.
          </p>
          <p>
            I appreciate the little things, our conversations, and the time we spend together.
          </p>
          <p>I&apos;m looking forward to making more memories with you.</p>
          <p className="font-semibold text-ink">
            There&apos;s something I&apos;ve been wanting to share with you...
          </p>
        </motion.div>

        <motion.button
          type="button"
          className="btn-primary focus-ring mt-7 w-full rounded-full px-6 py-3.5 text-base font-semibold"
          onClick={onNext}
          aria-label="Continue"
          {...fadeUp}
          transition={{ delay: 0.38, duration: 0.45 }}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          Continue ♡
        </motion.button>
      </SoftCard>
    </div>
  );
}
