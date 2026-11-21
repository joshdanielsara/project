"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useMemo } from "react";

type FloatingHeartsProps = {
  count?: number;
  active?: boolean;
};

export function FloatingHearts({ count = 14, active = true }: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${6 + ((i * 17) % 88)}%`,
        delay: (i % 7) * 0.35,
        duration: 5.5 + (i % 5) * 0.7,
        size: 12 + (i % 4) * 5,
        opacity: 0.35 + (i % 3) * 0.15,
      })),
    [count],
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-10%]"
          style={{ left: heart.left }}
          initial={{ y: 0, opacity: 0, scale: 0.6 }}
          animate={{
            y: "-120vh",
            opacity: [0, heart.opacity, heart.opacity, 0],
            scale: [0.6, 1, 1, 0.8],
            x: [0, 12, -10, 6],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <Heart
            className="fill-rose-300 text-rose-400"
            style={{ width: heart.size, height: heart.size }}
          />
        </motion.div>
      ))}
    </div>
  );
}
