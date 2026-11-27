"use client";

import { motion } from "framer-motion";
import { SoftCard } from "@/components/ui/SoftCard";
import { BackgroundParticles } from "@/components/ui/BackgroundParticles";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import type { ScreenProps } from "@/lib/types";

export function ClosingNoteScreen(_props: ScreenProps) {
  return (
    <div className="relative w-full max-w-lg">
      <BackgroundParticles />
      <FloatingHearts count={5} active />

      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_30%,rgba(255,198,214,0.5),transparent_60%)]"
        aria-hidden
      />

      <SoftCard className="romantic-glow relative z-10 text-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div
            className="mb-3 flex items-center justify-center gap-2"
            aria-hidden
            variants={fadeUpItem}
          >
            <span className="text-rose-300">❀</span>
            <motion.span
              className="text-rose-400"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ♥
            </motion.span>
            <span className="text-rose-300">❀</span>
          </motion.div>

          <motion.h1
            className="font-display text-2xl font-bold leading-snug text-ink sm:text-3xl"
            variants={fadeUpItem}
          >
            And that&apos;s everything for now. ❤️
          </motion.h1>

          <motion.div
            className="mx-auto mt-5 max-w-md space-y-4 text-sm leading-relaxed text-ink-soft sm:mt-6 sm:text-[0.95rem] sm:leading-7"
            variants={fadeUpItem}
          >
            <TypewriterText
              text="I hope this little surprise made you smile, even just a little."
              speedMs={20}
              delayMs={350}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.45 }}
            >
              Wala koy gusto nga i-rush. I just wanted you to know how I feel and how much I
              appreciate having you in my life.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.75, duration: 0.45 }}
            >
              Whatever happens, I&apos;m glad nga ikaw akong nakaila. And I&apos;d love to see where
              this goes, one little moment at a time.
            </motion.p>
            <motion.p
              className="font-medium text-ink"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              That&apos;s all. Thank you for being you. ❤️
            </motion.p>
          </motion.div>
        </motion.div>
      </SoftCard>
    </div>
  );
}
