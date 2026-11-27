"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const PETALS = Array.from({ length: 10 }, (_, i) => i);

export function SoftPetals() {
  const petals = useMemo(
    () =>
      PETALS.map((i) => ({
        id: i,
        left: `${6 + ((i * 9) % 88)}%`,
        delay: (i % 5) * 0.7,
        duration: 10 + (i % 4) * 2.2,
        size: 8 + (i % 3) * 3,
        drift: (i % 2 === 0 ? 1 : -1) * (12 + (i % 4) * 6),
      })),
    [],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute top-[-10%] rounded-full bg-rose-300/35"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.35,
            borderRadius: "60% 40% 60% 40%",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.drift, 0],
            rotate: [0, 40, -20, 30],
            opacity: [0, 0.55, 0.55, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
