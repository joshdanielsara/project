"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_SRC = "/music/soft-bg.mp3";

/**
 * Soft background track from /public/music.
 * Never autoplays; user must toggle music on.
 */
export function useMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(MUSIC_SRC);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.55;
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const stopInternal = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  const startInternal = useCallback(async () => {
    const audio = ensureAudio();
    try {
      await audio.play();
    } catch {
      // Autoplay/gesture restrictions — leave toggle off if play fails.
      throw new Error("Unable to start music");
    }
  }, [ensureAudio]);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      stopInternal();
      setIsPlaying(false);
      return;
    }

    try {
      await startInternal();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [isPlaying, startInternal, stopInternal]);

  useEffect(() => {
    return () => {
      stopInternal();
      audioRef.current = null;
    };
  }, [stopInternal]);

  return { isPlaying, toggle };
}
