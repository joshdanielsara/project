"use client";

import { motion } from "framer-motion";

type EnvelopeProps = {
  isOpen: boolean;
};

export function Envelope({ isOpen }: EnvelopeProps) {
  return (
    <div
      className="relative mx-auto mb-6 h-28 w-40 sm:h-32 sm:w-48"
      style={{ perspective: 800 }}
      aria-hidden
    >
      {/* body */}
      <div className="absolute inset-x-0 bottom-0 h-[72%] rounded-b-2xl rounded-t-md bg-gradient-to-br from-rose-200 to-rose-300 shadow-md" />

      {/* letter peeking */}
      <motion.div
        className="absolute left-1/2 top-[18%] h-[58%] w-[78%] -translate-x-1/2 rounded-md bg-cream shadow-sm"
        animate={{ y: isOpen ? -28 : 8 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-rose-200" />
        <div className="mx-auto mt-2 h-1 w-14 rounded-full bg-rose-100" />
        <div className="mx-auto mt-1.5 h-1 w-12 rounded-full bg-rose-100" />
      </motion.div>

      {/* flap */}
      <motion.div
        className="absolute left-0 top-0 h-[48%] w-full origin-top"
        style={{
          clipPath: "polygon(0 0, 50% 100%, 100% 0)",
          background: "linear-gradient(180deg, #fb7189 0%, #fda4bd 100%)",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateX: isOpen ? -160 : 0, opacity: isOpen ? 0.45 : 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />

      {/* seal */}
      <motion.div
        className="absolute left-1/2 top-[42%] flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-rose-500 text-xs text-white shadow"
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      >
        ♥
      </motion.div>
    </div>
  );
}
