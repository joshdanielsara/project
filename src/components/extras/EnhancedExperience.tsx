"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CursorTrail } from "@/components/extras/CursorTrail";
import { PixelCompanion } from "@/components/extras/PixelCompanion";
import { SecretHearts } from "@/components/extras/SecretHearts";
import { SoftPetals } from "@/components/extras/SoftPetals";

export function EnhancedExperience() {
  const [eggUnlocked, setEggUnlocked] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        key="enhanced"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <SoftPetals />
        <CursorTrail />
        <SecretHearts onComplete={() => setEggUnlocked(true)} />
        <PixelCompanion mood={eggUnlocked ? "happy" : "idle"} />
      </motion.div>
    </AnimatePresence>
  );
}
