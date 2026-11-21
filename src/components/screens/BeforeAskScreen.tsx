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

        <h1 className="sr-only">Before I ask</h1>

        <motion.div
          className="mt-2 space-y-4 rounded-[1.25rem] border border-rose-100/90 bg-gradient-to-b from-white/90 to-rose-50/60 p-4 text-left text-sm leading-relaxed text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:rounded-[1.5rem] sm:p-6 sm:text-[0.95rem] sm:leading-7"
          {...fadeUp}
          transition={{ delay: 0.12, duration: 0.45 }}
        >
          <p>
            I&apos;ve really enjoyed all the moments we&apos;ve shared, and I&apos;m happy with how
            naturally things have grown between us.
          </p>
          <p>
            Looking back, I&apos;m glad nga nagka-close ta and got the chance to know each other
            this way. I appreciate our conversations, the little moments, and everything in
            between.
          </p>
          <p>
            I&apos;m looking forward to creating more memories with you, sharing new experiences,
            and seeing how much more beautiful things can become as we continue getting to know
            each other.
          </p>
          <p className="font-semibold text-ink">
            There&apos;s something I&apos;ve been wanting to ask you...
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
