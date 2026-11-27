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

export function ClosingNoteScreen(_props: ScreenProps) {
  return (
    <div className="relative w-full max-w-lg">
      <BackgroundParticles />
      <FloatingHearts count={5} active />

      <SoftCard className="relative z-10 text-center">
        <motion.div
          className="mb-3 flex items-center justify-center gap-2"
          aria-hidden
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08, duration: 0.45 }}
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
          {...fadeUp}
          transition={{ delay: 0.12, duration: 0.45 }}
        >
          And that&apos;s everything for now. ❤️
        </motion.h1>

        <motion.div
          className="mx-auto mt-5 max-w-md space-y-4 text-sm leading-relaxed text-ink-soft sm:mt-6 sm:text-[0.95rem] sm:leading-7"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.16, delayChildren: 0.22 },
            },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            I hope this little surprise made you smile, even just a little.
          </motion.p>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            Wala koy gusto nga i-rush. I just wanted you to know how I feel and how much I
            appreciate having you in my life.
          </motion.p>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            Whatever happens, I&apos;m glad nga ikaw akong nakaila. And I&apos;d love to see where
            this goes, one little moment at a time.
          </motion.p>
          <motion.p
            className="font-medium text-ink"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            That&apos;s all. Thank you for being you. ❤️
          </motion.p>
        </motion.div>
      </SoftCard>
    </div>
  );
}
