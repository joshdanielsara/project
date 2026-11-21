"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Soft generative ambience via Web Audio API — no external audio file needed.
 * Never autoplays; user must toggle music on.
 */
export function useMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    master: GainNode;
    oscillators: OscillatorNode[];
    gains: GainNode[];
    lfo: OscillatorNode;
    lfoGain: GainNode;
  } | null>(null);

  const stopInternal = useCallback(() => {
    const nodes = nodesRef.current;
    const ctx = ctxRef.current;
    if (!nodes || !ctx) return;

    const now = ctx.currentTime;
    nodes.master.gain.cancelScheduledValues(now);
    nodes.master.gain.setValueAtTime(nodes.master.gain.value, now);
    nodes.master.gain.linearRampToValueAtTime(0, now + 0.45);

    window.setTimeout(() => {
      nodes.oscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          /* already stopped */
        }
      });
      try {
        nodes.lfo.stop();
      } catch {
        /* already stopped */
      }
      nodesRef.current = null;
    }, 500);
  }, []);

  const startInternal = useCallback(async () => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    if (!ctxRef.current || ctxRef.current.state === "closed") {
      ctxRef.current = new AudioCtx();
    }

    const ctx = ctxRef.current;
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    stopInternal();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Soft romantic pad: Cmaj7-ish voicing
    const freqs = [261.63, 329.63, 392.0, 493.88, 523.25];
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;
      filter.type = "lowpass";
      filter.frequency.value = 900;
      filter.Q.value = 0.7;
      gain.gain.value = i === 0 ? 0.045 : 0.028;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      osc.start();
      oscillators.push(osc);
      gains.push(gain);
    });

    // Gentle tremolo
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.18;
    lfoGain.gain.value = 0.012;
    lfo.connect(lfoGain);
    gains.forEach((g) => lfoGain.connect(g.gain));
    lfo.start();

    const now = ctx.currentTime;
    master.gain.linearRampToValueAtTime(0.85, now + 1.2);

    nodesRef.current = { master, oscillators, gains, lfo, lfoGain };
  }, [stopInternal]);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      stopInternal();
      setIsPlaying(false);
      return;
    }
    await startInternal();
    setIsPlaying(true);
  }, [isPlaying, startInternal, stopInternal]);

  useEffect(() => {
    return () => {
      stopInternal();
      if (ctxRef.current && ctxRef.current.state !== "closed") {
        void ctxRef.current.close();
      }
    };
  }, [stopInternal]);

  return { isPlaying, toggle };
}
