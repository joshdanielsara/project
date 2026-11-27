"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Spark = {
  id: number;
  x: number;
  y: number;
};

export function CursorTrail() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let last = 0;
    let id = 0;

    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - last < 48) return;
      last = now;
      id += 1;
      const spark = { id, x: event.clientX, y: event.clientY };
      setSparks((prev) => [...prev.slice(-14), spark]);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[25]" aria-hidden>
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.span
            key={spark.id}
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/70"
            style={{ left: spark.x, top: spark.y }}
            initial={{ opacity: 0.7, scale: 0.7 }}
            animate={{ opacity: 0, scale: 0.2, y: -10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            onAnimationComplete={() => {
              setSparks((prev) => prev.filter((item) => item.id !== spark.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
