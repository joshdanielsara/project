"use client";

import confetti from "canvas-confetti";
import { useCallback } from "react";

const PINK_PALETTE = ["#fb7189", "#f43f6a", "#fda4bd", "#ffe4ec", "#fff7ed", "#fecdd3"];

export function useConfetti() {
  const fireSoft = useCallback(() => {
    const defaults = {
      colors: PINK_PALETTE,
      disableForReducedMotion: true,
    };

    confetti({
      ...defaults,
      particleCount: 70,
      spread: 70,
      origin: { y: 0.65 },
    });

    window.setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
      });
      confetti({
        ...defaults,
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
      });
    }, 180);
  }, []);

  const fireBig = useCallback(() => {
    const duration = 2800;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.65 },
        colors: PINK_PALETTE,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.65 },
        colors: PINK_PALETTE,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    confetti({
      particleCount: 120,
      spread: 100,
      startVelocity: 42,
      origin: { y: 0.55 },
      colors: PINK_PALETTE,
      disableForReducedMotion: true,
      shapes: ["circle", "square"],
    });
  }, []);

  return { fireSoft, fireBig };
}
