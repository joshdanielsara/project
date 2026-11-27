"use client";

import { motion } from "framer-motion";
import { SoftCard } from "@/components/ui/SoftCard";
import { BackgroundParticles } from "@/components/ui/BackgroundParticles";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import type { ScreenProps } from "@/lib/types";

export function PreGirlfriendScreen({ onNext }: ScreenProps) {
  return (
    <div className="relative w-full max-w-lg">
      <BackgroundParticles />
      <FloatingHearts count={4} active />

      <div
        className="pointer-events-none absolute inset-0 -z-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,rgba(255,198,214,0.55),transparent_62%)]"
        aria-hidden
      />

      <SoftCard className="romantic-glow relative z-10">
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

          <motion.h1
            className="font-display text-center text-2xl font-bold text-ink sm:text-3xl"
            variants={fadeUpItem}
          >
            A little more from me...
          </motion.h1>

          <motion.div
            className="mt-5 space-y-4 rounded-[1.25rem] border border-rose-100/90 bg-gradient-to-b from-white/90 to-rose-50/40 p-4 text-left text-sm leading-relaxed text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:rounded-[1.5rem] sm:p-6 sm:text-[0.95rem] sm:leading-7"
            variants={fadeUpItem}
          >
            <p>
              Kabalo ko nga dili pa ta pwede mahimong legal sa imong side just yet, and I
              completely understand and respect that.
            </p>
            <p>
              But I want you to know nga seryoso ko sa akong intentions towards you. I don&apos;t
              want to keep this as something uncertain when I know that I want to build something
              real with you.
            </p>

            <motion.div
              className="rounded-2xl border border-rose-200/80 bg-gradient-to-br from-rose-50 via-rose-100/70 to-pink-50 px-4 py-4 text-center shadow-[0_0_36px_rgba(251,113,137,0.18)] sm:px-5 sm:py-5"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[0.95rem] leading-relaxed text-ink sm:text-base sm:leading-7">
                If you&apos;re ready too, I&apos;d love for us to make things official between us.
              </p>
              <motion.p
                className="font-display mt-2.5 text-lg font-semibold leading-snug text-rose-500 sm:mt-3 sm:text-xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                And I&apos;d gladly call you mine. ❤️
              </motion.p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.45 }}
            >
              I don&apos;t want you to feel pressured, though. I want us both to be comfortable and
              ready for that step.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.45 }}
            >
              I genuinely want to keep choosing you, getting to know you, and building something
              meaningful together. ❤️
            </motion.p>
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
