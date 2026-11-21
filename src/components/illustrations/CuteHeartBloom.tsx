"use client";

import { motion } from "framer-motion";

export function CuteHeartBloom() {
  return (
    <motion.svg
      viewBox="0 0 220 200"
      className="mx-auto h-40 w-40 sm:h-48 sm:w-48"
      initial={{ scale: 0.86, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 16 }}
      role="img"
      aria-label="Cute heart with flowers illustration"
    >
      <defs>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fda4bd" />
          <stop offset="50%" stopColor="#fb7189" />
          <stop offset="100%" stopColor="#f43f6a" />
        </linearGradient>
        <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe4ec" />
          <stop offset="100%" stopColor="#fda4bd" />
        </linearGradient>
      </defs>

      {/* soft glow */}
      <ellipse cx="110" cy="170" rx="58" ry="10" fill="#fda4bd" opacity="0.25" />

      {/* left flower */}
      <g transform="translate(28 118)">
        <circle cx="0" cy="-10" r="8" fill="url(#petalGrad)" />
        <circle cx="9" cy="-2" r="8" fill="url(#petalGrad)" />
        <circle cx="5" cy="9" r="8" fill="url(#petalGrad)" />
        <circle cx="-7" cy="7" r="8" fill="url(#petalGrad)" />
        <circle cx="-10" cy="-4" r="8" fill="url(#petalGrad)" />
        <circle cx="0" cy="0" r="5" fill="#fff5f7" />
      </g>

      {/* right flower */}
      <g transform="translate(188 112)">
        <circle cx="0" cy="-9" r="7" fill="url(#petalGrad)" />
        <circle cx="8" cy="-1" r="7" fill="url(#petalGrad)" />
        <circle cx="4" cy="8" r="7" fill="url(#petalGrad)" />
        <circle cx="-6" cy="6" r="7" fill="url(#petalGrad)" />
        <circle cx="-8" cy="-3" r="7" fill="url(#petalGrad)" />
        <circle cx="0" cy="0" r="4.5" fill="#fff5f7" />
      </g>

      {/* main heart */}
      <motion.path
        d="M110 168 C110 168 42 120 42 78 C42 54 58 40 78 40 C92 40 103 48 110 60 C117 48 128 40 142 40 C162 40 178 54 178 78 C178 120 110 168 110 168 Z"
        fill="url(#heartGrad)"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "110px 100px" }}
      />

      {/* highlight */}
      <path
        d="M72 78 C72 62 84 52 96 54"
        fill="none"
        stroke="#fff5f7"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* tiny stars */}
      <circle cx="52" cy="46" r="3" fill="#fda4bd" opacity="0.8" />
      <circle cx="170" cy="52" r="2.5" fill="#fb7189" opacity="0.7" />
      <circle cx="110" cy="28" r="2" fill="#f43f6a" opacity="0.55" />
    </motion.svg>
  );
}
