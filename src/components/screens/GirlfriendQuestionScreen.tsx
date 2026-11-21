"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { SoftCard } from "@/components/ui/SoftCard";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { useConfetti } from "@/hooks/useConfetti";
import type { ScreenProps } from "@/lib/types";

export function GirlfriendQuestionScreen({ onNext }: ScreenProps) {
  const { fireBig } = useConfetti();
  const [needTime, setNeedTime] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestLock = useRef(false);

  const handleYes = async () => {
    if (requestLock.current || sending) return;
    requestLock.current = true;
    setSending(true);
    setError(null);

    try {
      const response = await fetch("/api/notify-yes", { method: "POST" });
      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; alreadySent?: boolean; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setError(
          data?.error ||
            "Something went wrong while sending the notification. Please try again.",
        );
        requestLock.current = false;
        setSending(false);
        return;
      }

      fireBig();
      onNext();
    } catch {
      setError("Network error while sending the notification. Please try again.");
      requestLock.current = false;
      setSending(false);
    }
  };

  return (
    <>
      {sending && <FloatingHearts count={10} active />}

      <SoftCard className="text-center">
        <motion.p
          className="text-sm font-medium uppercase tracking-[0.18em] text-rose-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          One last question...
        </motion.p>

        <motion.h1
          className="font-display mt-4 text-3xl font-bold leading-tight text-ink sm:mt-5 sm:text-4xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
        >
          Will you be my girlfriend?
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45 }}
        >
          I&apos;d really love to take this next step with you. ❤️
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col items-stretch gap-3 sm:items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.45 }}
        >
          <motion.button
            type="button"
            className="btn-primary focus-ring rounded-2xl px-6 py-3.5 text-base font-semibold sm:min-w-[220px] disabled:cursor-wait disabled:opacity-80"
            onClick={handleYes}
            aria-label="Yes, I will be your girlfriend"
            disabled={sending}
            whileHover={sending ? undefined : { scale: 1.03 }}
            whileTap={sending ? undefined : { scale: 0.98 }}
          >
            {sending ? "Sending with love..." : "YES, I WILL! ❤️"}
          </motion.button>

          <button
            type="button"
            className="btn-secondary focus-ring rounded-2xl px-6 py-3 text-sm font-semibold sm:min-w-[220px]"
            onClick={() => setNeedTime(true)}
            aria-label="I need more time"
            disabled={sending}
          >
            I NEED MORE TIME
          </button>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-500"
              role="alert"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </SoftCard>

      <AnimatePresence>
        {needTime && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-rose-100/45 p-4 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-rose-100/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="time-title"
            aria-describedby="time-desc"
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
                💗
              </div>
              <h2
                id="time-title"
                className="font-display text-xl font-semibold text-ink sm:text-2xl"
              >
                Take all the time you need
              </h2>
              <p
                id="time-desc"
                className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]"
              >
                No worries. Take your time. I don&apos;t want you to feel pressured. ❤️
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  type="button"
                  className="btn-primary focus-ring rounded-full px-5 py-3.5 text-sm font-semibold"
                  onClick={() => setNeedTime(false)}
                >
                  Return to the question
                </button>
                <button
                  type="button"
                  className="btn-secondary focus-ring rounded-full px-5 py-3 text-sm font-semibold"
                  onClick={() => setNeedTime(false)}
                >
                  Keep browsing this moment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
