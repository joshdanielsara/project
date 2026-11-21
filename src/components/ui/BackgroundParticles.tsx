"use client";

import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { useMemo } from "react";

export function BackgroundParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        top: `${8 + ((i * 13) % 80)}%`,
        left: `${5 + ((i * 19) % 90)}%`,
        delay: (i % 6) * 0.4,
        duration: 3.5 + (i % 4) * 0.8,
        kind: i % 3 === 0 ? "star" : "spark",
        size: 8 + (i % 3) * 3,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-rose-300/70"
          style={{ top: p.top, left: p.left }}
          animate={{
            opacity: [0.2, 0.75, 0.2],
            scale: [0.85, 1.15, 0.85],
            y: [0, -8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.kind === "star" ? (
            <Star style={{ width: p.size, height: p.size }} className="fill-rose-200" />
          ) : (
            <Sparkles style={{ width: p.size, height: p.size }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
