"use client";

import { motion } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";

type MusicToggleProps = {
  isPlaying: boolean;
  onToggle: () => void;
};

export function MusicToggle({ isPlaying, onToggle }: MusicToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="focus-ring fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-rose-500 shadow-[0_8px_24px_rgba(244,63,106,0.18)] backdrop-blur-md"
      aria-label={isPlaying ? "Stop music" : "Play soft music"}
      aria-pressed={isPlaying}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isPlaying ? (
        <Music2 className="h-5 w-5" aria-hidden />
      ) : (
        <VolumeX className="h-5 w-5" aria-hidden />
      )}
    </motion.button>
  );
}
