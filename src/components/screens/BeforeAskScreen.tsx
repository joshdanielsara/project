"use client";

import { motion } from "framer-motion";
import { SoftCard } from "@/components/ui/SoftCard";
import { BackgroundParticles } from "@/components/ui/BackgroundParticles";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import type { ScreenProps } from "@/lib/types";

export function BeforeAskScreen({ onNext }: ScreenProps) {
  return (
    <div className="relative w-full max-w-lg">
      <BackgroundParticles />
      <FloatingHearts count={6} active />

      <SoftCard className="relative z-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div
            className="mb-3 flex items-center justify-center gap-2"
            aria-hidden
            variants={fadeUpItem}
          >
            <span className="text-rose-300">❀</span>
            <span className="text-rose-400 animate-pulse-heart">♥</span>
            <span className="text-rose-300">❀</span>
          </motion.div>

          <h1 className="sr-only">Shared moments</h1>

          <motion.div
            className="mt-2 space-y-4 rounded-[1.25rem] border border-rose-100/90 bg-gradient-to-b from-white/90 to-rose-50/60 p-4 text-left text-sm leading-relaxed text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:rounded-[1.5rem] sm:p-6 sm:text-[0.95rem] sm:leading-7"
            variants={fadeUpItem}
          >
            <p>
              I&apos;ve really enjoyed the moments we&apos;ve shared, and I&apos;m glad nga
              nagka-close ta.
            </p>
            <p>
              I appreciate the little things, our conversations, and the time we spend together.
            </p>
            <p>I&apos;m looking forward to making more memories with you.</p>
            <TypewriterText
              text="There's something I've been wanting to share with you..."
              className="font-semibold text-ink"
              speedMs={24}
              delayMs={450}
            />
          </motion.div>

          <motion.button
            type="button"
            className="btn-primary focus-ring mt-7 w-full rounded-full px-6 py-3.5 text-base font-semibold"
            onClick={onNext}
            aria-label="Continue"
            variants={fadeUpItem}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            Continue ♡
          </motion.button>
        </motion.div>
      </SoftCard>
    </div>
  );
}
