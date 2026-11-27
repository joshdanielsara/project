"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CursorTrail } from "@/components/extras/CursorTrail";
import { SecretHearts } from "@/components/extras/SecretHearts";
import { SoftPetals } from "@/components/extras/SoftPetals";

export function EnhancedExperience() {
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
        <SecretHearts onComplete={() => {}} />
      </motion.div>
    </AnimatePresence>
  );
}
