"use client";

import { motion } from "framer-motion";

export function RomanticCelebration() {
  return (
    <motion.svg
      viewBox="0 0 260 180"
      className="mx-auto h-36 w-52 sm:h-44 sm:w-64"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      role="img"
      aria-label="Two hearts celebrating together"
    >
      <defs>
        <linearGradient id="leftHeart" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fda4bd" />
          <stop offset="100%" stopColor="#f43f6a" />
        </linearGradient>
        <linearGradient id="rightHeart" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fecdd3" />
          <stop offset="100%" stopColor="#fb7189" />
        </linearGradient>
      </defs>

      <ellipse cx="130" cy="160" rx="70" ry="10" fill="#fda4bd" opacity="0.22" />

      <motion.path
        d="M95 130 C95 130 45 95 45 65 C45 48 57 38 72 38 C83 38 91 44 95 53 C99 44 107 38 118 38 C133 38 145 48 145 65 C145 95 95 130 95 130 Z"
        fill="url(#leftHeart)"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.path
        d="M165 130 C165 130 115 95 115 65 C115 48 127 38 142 38 C153 38 161 44 165 53 C169 44 177 38 188 38 C203 38 215 48 215 65 C215 95 165 130 165 130 Z"
        fill="url(#rightHeart)"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />

      {/* sparkles */}
      <motion.circle
        cx="58"
        cy="28"
        r="3"
        fill="#f43f6a"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <motion.circle
        cx="200"
        cy="24"
        r="2.5"
        fill="#fb7189"
        animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.7, 1.15, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
      />
      <motion.circle
        cx="130"
        cy="18"
        r="2"
        fill="#fda4bd"
        animate={{ opacity: [0.25, 1, 0.25] }}
        transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }}
      />
    </motion.svg>
  );
}
