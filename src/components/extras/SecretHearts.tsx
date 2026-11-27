"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

type SecretHeartsProps = {
  onComplete: () => void;
};

const HEARTS = [
  { id: "a", top: "18%", left: "8%" },
  { id: "b", top: "62%", left: "90%" },
  { id: "c", top: "82%", left: "14%" },
];

export function SecretHearts({ onComplete }: SecretHeartsProps) {
  const [found, setFound] = useState<string[]>([]);
  const [burst, setBurst] = useState(false);
  const remaining = useMemo(
    () => HEARTS.filter((heart) => !found.includes(heart.id)),
    [found],
  );

  const collect = useCallback(
    (id: string) => {
      setFound((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        if (next.length >= HEARTS.length) {
          setBurst(true);
          onComplete();
        }
        return next;
      });
    },
    [onComplete],
  );

  useEffect(() => {
    if (!burst) return;
    const timer = window.setTimeout(() => setBurst(false), 3200);
    return () => window.clearTimeout(timer);
  }, [burst]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[30]">
        {remaining.map((heart) => (
          <button
            key={heart.id}
            type="button"
            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 opacity-35 transition hover:opacity-90 focus-visible:opacity-100"
            style={{ top: heart.top, left: heart.left }}
            aria-label="A tiny hidden heart"
            onClick={() => collect(heart.id)}
          >
            <motion.span
              className="block text-sm text-rose-400"
              animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              ♡
            </motion.span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {burst && (
          <motion.div
            className="pointer-events-none fixed inset-x-0 bottom-28 z-[45] flex justify-center px-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
            role="status"
          >
            <p className="rounded-full border border-rose-100 bg-white/90 px-4 py-2 text-center text-xs font-medium text-ink shadow-sm sm:text-sm">
              You found the secret hearts. Softly noted. ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
