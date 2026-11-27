"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type PixelCompanionProps = {
  mood?: "idle" | "happy";
};

export function PixelCompanion({ mood = "idle" }: PixelCompanionProps) {
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-[5.5rem] left-4 z-[40] sm:bottom-28 sm:left-6"
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <button
            type="button"
            className="group relative focus-ring rounded-2xl"
            aria-label="A little pixel friend"
            onClick={() => setTip((prev) => !prev)}
          >
            <motion.div
              className="rounded-2xl border border-white/80 bg-white/80 p-2.5 shadow-[0_10px_30px_rgba(244,63,106,0.16)] backdrop-blur-md"
              animate={
                mood === "happy"
                  ? { y: [0, -6, 0], rotate: [0, -4, 4, 0] }
                  : { y: [0, -3, 0] }
              }
              transition={{
                duration: mood === "happy" ? 0.7 : 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                className="pixelated"
                aria-hidden
              >
                <rect width="44" height="44" fill="transparent" />
                <rect x="12" y="10" width="20" height="18" fill="#fda4bd" />
                <rect x="10" y="14" width="4" height="10" fill="#fb7189" />
                <rect x="30" y="14" width="4" height="10" fill="#fb7189" />
                <rect x="16" y="16" width="3" height="3" fill="#5c3a45" />
                <rect x="25" y="16" width="3" height="3" fill="#5c3a45" />
                <rect x="18" y="22" width="8" height="2" fill="#f43f6a" />
                <rect x="14" y="28" width="6" height="8" fill="#ffc9d9" />
                <rect x="24" y="28" width="6" height="8" fill="#ffc9d9" />
                <rect x="20" y="8" width="4" height="3" fill="#f43f6a" />
              </svg>
            </motion.div>

            <AnimatePresence>
              {tip && (
                <motion.p
                  className="absolute bottom-full left-0 mb-2 w-40 rounded-2xl border border-rose-100 bg-white/95 px-3 py-2 text-left text-[11px] leading-relaxed text-ink-soft shadow-sm"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                >
                  Hi. I&apos;ll stay quietly here while you read. ♡
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
