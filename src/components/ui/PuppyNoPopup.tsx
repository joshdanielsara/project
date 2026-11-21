"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, PawPrint } from "lucide-react";
import { useMemo, useState } from "react";
import { CutePuppy } from "@/components/illustrations/CutePuppy";

const PUPPY_MESSAGES = [
  "HOY! Dili pwede ang NO! 😭🐶",
  "Please give my hooman a chance. 🥺",
  "Wala pa gani nimo siya natagaan og chance!",
  "One chance lang bi, please? 🐶",
  "Akoa na lang siyang i-recommend nimo HAHAHA.",
] as const;

type PuppyNoPopupProps = {
  onGenuineDecline: () => void;
};

export function PuppyNoPopup({ onGenuineDecline }: PuppyNoPopupProps) {
  const [open, setOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const decorations = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        top: `${10 + ((i * 17) % 70)}%`,
        left: `${8 + ((i * 23) % 80)}%`,
        delay: (i % 4) * 0.25,
        kind: i % 2 === 0 ? "heart" : "paw",
      })),
    [],
  );

  const handleNoClick = () => {
    setOpen(true);
  };

  const handleOkay = () => {
    setOpen(false);
    setMessageIndex((prev) => (prev + 1) % PUPPY_MESSAGES.length);
  };

  const title = PUPPY_MESSAGES[messageIndex];
  const showFirstSubtitle = messageIndex === 0;

  return (
    <>
      <motion.button
        type="button"
        className="btn-secondary focus-ring min-h-12 min-w-[7.5rem] rounded-2xl px-5 py-3 text-sm font-semibold sm:text-base"
        style={{ touchAction: "manipulation" }}
        aria-label="Decline: NO"
        onClick={handleNoClick}
        whileTap={{ scale: 0.97 }}
      >
        NO
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-rose-100/45 p-4 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-rose-100/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="puppy-title"
            aria-describedby="puppy-desc"
          >
            <motion.div
              className="relative w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-white/80 bg-gradient-to-b from-rose-50 via-white to-cream p-6 text-center shadow-[0_28px_70px_rgba(92,58,69,0.22)] sm:rounded-[2rem] sm:p-7"
              initial={{ scale: 0.82, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              {/* floating hearts / paws */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                {decorations.map((d) => (
                  <motion.span
                    key={d.id}
                    className="absolute text-rose-300/70"
                    style={{ top: d.top, left: d.left }}
                    animate={{ y: [0, -8, 0], opacity: [0.25, 0.7, 0.25] }}
                    transition={{
                      duration: 2.4,
                      delay: d.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {d.kind === "heart" ? (
                      <Heart className="h-3.5 w-3.5 fill-rose-200" />
                    ) : (
                      <PawPrint className="h-3.5 w-3.5" />
                    )}
                  </motion.span>
                ))}
              </div>

              <div className="relative z-10">
                <CutePuppy />

                <AnimatePresence mode="wait">
                  <motion.h2
                    key={title}
                    id="puppy-title"
                    className="font-display mt-2 text-xl font-bold leading-snug text-ink sm:text-2xl"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {title}
                  </motion.h2>
                </AnimatePresence>

                <p id="puppy-desc" className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]">
                  {showFirstSubtitle
                    ? "Hatagi sa siya og chance bi. Please? 🥺"
                    : "My hooman is really trying his best. Give him a chance? 💕"}
                </p>

                <motion.button
                  type="button"
                  className="btn-primary focus-ring mt-6 w-full rounded-full px-5 py-3.5 text-sm font-semibold sm:text-base"
                  onClick={handleOkay}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Sige, paminawon nako siya
                </motion.button>

                <button
                  type="button"
                  className="focus-ring mt-3 text-xs font-medium text-ink-soft/80 underline-offset-2 hover:text-ink-soft hover:underline sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                    onGenuineDecline();
                  }}
                >
                  Actually, I need to say no
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
