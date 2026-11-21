"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { RomanticCelebration } from "@/components/illustrations/RomanticCelebration";
import { SoftCard } from "@/components/ui/SoftCard";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { BackgroundParticles } from "@/components/ui/BackgroundParticles";
import { useConfetti } from "@/hooks/useConfetti";

export function CelebrationScreen() {
  const { fireBig } = useConfetti();

  useEffect(() => {
    fireBig();
    const t = window.setTimeout(() => fireBig(), 1800);
    return () => window.clearTimeout(t);
  }, [fireBig]);

  return (
    <div className="relative w-full max-w-lg">
      <FloatingHearts count={22} active />
      <BackgroundParticles />

      <SoftCard className="relative z-10 text-center">
        <motion.p
          className="font-display text-3xl font-bold text-rose-500 sm:text-4xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          SHE SAID YES! ❤️
        </motion.p>

        <div className="mt-4">
          <RomanticCelebration />
        </div>

        <motion.h1
          className="font-display mt-2 text-2xl font-bold text-ink sm:text-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          Here&apos;s to a new chapter together.
        </motion.h1>

        <motion.p
          className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
        >
          Thank you for giving us a chance. I promise to be genuine, consistent, and intentional
          with you.
        </motion.p>
      </SoftCard>
    </div>
  );
}
