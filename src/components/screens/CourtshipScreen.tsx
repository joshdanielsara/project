"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { SoftCard } from "@/components/ui/SoftCard";
import { PuppyNoPopup } from "@/components/ui/PuppyNoPopup";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { useConfetti } from "@/hooks/useConfetti";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import type { ScreenProps } from "@/lib/types";

export function CourtshipScreen({ onNext }: ScreenProps) {
  const { fireSoft } = useConfetti();
  const [showDeclineNote, setShowDeclineNote] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const handleYes = () => {
    setCelebrating(true);
    fireSoft();
    window.setTimeout(() => onNext(), 1100);
  };

  return (
    <>
      {celebrating && <FloatingHearts count={16} active />}

      <SoftCard className="overflow-visible text-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-500 shadow-[0_0_24px_rgba(251,113,137,0.35)]"
            variants={fadeUpItem}
          >
            <Heart className="h-6 w-6 fill-rose-400 animate-pulse-heart" aria-hidden />
          </motion.div>

          <motion.h1
            className="font-display text-2xl font-bold text-ink sm:text-3xl"
            variants={fadeUpItem}
          >
            Can I officially court you?
          </motion.h1>

          <motion.div variants={fadeUpItem} className="mt-3">
            <TypewriterText
              text="I have something I've been wanting to share with you."
              className="text-base text-ink-soft sm:text-lg"
              speedMs={20}
              delayMs={280}
            />
          </motion.div>

          <motion.div
            className="mx-auto mt-5 max-w-md space-y-3 text-sm leading-relaxed text-ink-soft sm:mt-6 sm:text-[0.95rem] sm:leading-7"
            variants={fadeUpItem}
          >
            <p>
              Kabalo ko medyo dugay na ta nagkaila, and I&apos;m really happy sa kung unsa na ta
              karon. Pero kabalo pud ko nga daghan pa ta og things nga wala nahibaw-i about sa
              usag usa.
            </p>
            <p>
              Ganahan pa ko nga mas mailhan tika, mas masabtan tika, and makabuhat pa ta og more
              memories together. I want to make my intentions clear and show you nga sincere gyud
              ko sa akong feelings nimo.
            </p>
          </motion.div>

          <motion.div
            className="mt-7 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4"
            variants={fadeUpItem}
          >
            <motion.button
              type="button"
              className="btn-primary focus-ring min-h-12 min-w-[140px] rounded-2xl px-6 py-3 text-base font-semibold"
              onClick={handleYes}
              aria-label="Yes, you may court me"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              disabled={celebrating}
            >
              YES ❤️
            </motion.button>

            {!celebrating && (
              <PuppyNoPopup onGenuineDecline={() => setShowDeclineNote(true)} />
            )}
          </motion.div>
        </motion.div>
      </SoftCard>

      <AnimatePresence>
        {showDeclineNote && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-rose-100/45 p-4 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-rose-100/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="decline-title"
          >
            <motion.div
              className="w-full max-w-sm rounded-[1.75rem] border border-white/80 bg-gradient-to-b from-rose-50 via-white to-cream p-6 text-center shadow-[0_28px_70px_rgba(92,58,69,0.22)] sm:rounded-[2rem] sm:p-7"
              initial={{ scale: 0.82, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-xl"
                aria-hidden
              >
                🤍
              </div>
              <h2 id="decline-title" className="font-display text-xl font-semibold text-ink sm:text-2xl">
                That&apos;s okay
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]">
                Thank you for being honest with me. I still value you, and I wish you nothing
                but warmth and happiness. 🤍
              </p>
              <button
                type="button"
                className="btn-secondary focus-ring mt-6 w-full rounded-full px-5 py-3 text-sm font-semibold"
                onClick={() => setShowDeclineNote(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
