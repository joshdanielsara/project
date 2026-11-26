"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Envelope } from "@/components/ui/Envelope";
import { SoftCard } from "@/components/ui/SoftCard";
import { BackgroundParticles } from "@/components/ui/BackgroundParticles";
import type { ScreenProps } from "@/lib/types";

const LETTER = `I don't expect everything to happen at once. I just want to enjoy getting to know you, one step at a time.

I'll do my best to be genuine, consistent, and make you feel appreciated.`;

export function HeartfeltMessageScreen({ onNext }: ScreenProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);

  const paragraphs = useMemo(() => LETTER.split("\n\n"), []);

  useEffect(() => {
    const openTimer = window.setTimeout(() => setIsOpen(true), 400);
    return () => window.clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    let intervalId: number | undefined;
    const startDelay = window.setTimeout(() => {
      let index = 0;
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayed(LETTER.slice(0, index));
        if (index >= LETTER.length) {
          if (intervalId) window.clearInterval(intervalId);
          setDoneTyping(true);
        }
      }, 14);
    }, 700);

    return () => {
      window.clearTimeout(startDelay);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [isOpen]);

  const visibleParagraphs = displayed.split("\n\n");

  return (
    <div className="relative w-full max-w-lg">
      <BackgroundParticles />
      <SoftCard className="relative z-10">
        <Envelope isOpen={isOpen} />

        <div className="mb-2 flex items-center justify-center gap-2" aria-hidden>
          <span className="text-rose-400">❀</span>
          <span className="text-rose-300">♥</span>
          <span className="text-rose-400">❀</span>
        </div>

        <h1 className="sr-only">A note for you</h1>

        <div
          className="mt-2 max-h-[42vh] min-h-[160px] space-y-4 overflow-y-auto rounded-2xl border border-rose-100/80 bg-white/60 p-4 text-left text-sm leading-relaxed text-ink sm:max-h-none sm:min-h-[180px] sm:p-5 sm:text-[0.95rem]"
          aria-live="polite"
        >
          {visibleParagraphs.map((para, i) => (
            <p key={i}>
              {para}
              {i === visibleParagraphs.length - 1 && !doneTyping && (
                <motion.span
                  className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-rose-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  aria-hidden
                />
              )}
            </p>
          ))}
          <span className="sr-only">{doneTyping ? paragraphs.join(" ") : ""}</span>
        </div>

        <motion.button
          type="button"
          className="btn-primary focus-ring mt-7 w-full rounded-2xl px-6 py-3.5 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onNext}
          disabled={!doneTyping}
          aria-label="A little something for you"
          whileHover={doneTyping ? { scale: 1.02 } : undefined}
          whileTap={doneTyping ? { scale: 0.98 } : undefined}
        >
          A little something for you...
        </motion.button>
      </SoftCard>
    </div>
  );
}
