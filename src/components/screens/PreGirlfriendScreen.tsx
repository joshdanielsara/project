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

export function PreGirlfriendScreen({ onNext }: ScreenProps) {
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

        <motion.h1
          className="font-display text-center text-2xl font-bold text-ink sm:text-3xl"
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          A little more before I ask...
        </motion.h1>

        <motion.div
          className="mt-5 space-y-4 rounded-[1.25rem] border border-rose-100/90 bg-gradient-to-b from-white/90 to-rose-50/60 p-4 text-left text-sm leading-relaxed text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:rounded-[1.5rem] sm:p-6 sm:text-[0.95rem] sm:leading-7"
          {...fadeUp}
          transition={{ delay: 0.22, duration: 0.45 }}
        >
          <p>
            I know baga kog nawng mangutana dayon ani HAHAHA, but I just want to know if
            you&apos;re ready to take things to the next level with me.
          </p>
          <p>
            Kabalo ko nga dili pa ta pwede mahimong legal karon, and I completely understand
            that. Dili man pud ko ganahan nga magdali ta. I&apos;m willing to take things slowly
            and wait until the right time comes.
          </p>
          <p>
            For now, I just want us to keep choosing each other, continue getting to know each
            other, and enjoy what we have. I don&apos;t want you to feel pressured. I just want
            to be honest about what I hope for us.
          </p>
          <p className="font-semibold text-ink">
            There&apos;s just one last thing I want to ask you...
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
