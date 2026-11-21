"use client";

import { motion } from "framer-motion";

export function CutePuppy() {
  return (
    <motion.svg
      viewBox="0 0 200 180"
      className="mx-auto h-28 w-32 sm:h-32 sm:w-36"
      role="img"
      aria-label="Cute puppy pleading"
      initial={{ scale: 0.85, y: 8 }}
      animate={{ scale: 1, y: [0, -4, 0] }}
      transition={{
        scale: { type: "spring", stiffness: 260, damping: 16 },
        y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <defs>
        <linearGradient id="pupFur" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f6d7b0" />
          <stop offset="100%" stopColor="#e8b87d" />
        </linearGradient>
        <linearGradient id="pupEar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4956a" />
          <stop offset="100%" stopColor="#c07a52" />
        </linearGradient>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="100" cy="168" rx="42" ry="7" fill="#fda4bd" opacity="0.28" />

      {/* body */}
      <ellipse cx="100" cy="128" rx="38" ry="30" fill="url(#pupFur)" />

      {/* paws */}
      <ellipse cx="78" cy="148" rx="12" ry="9" fill="#f0c89a" />
      <ellipse cx="122" cy="148" rx="12" ry="9" fill="#f0c89a" />

      {/* ears */}
      <motion.ellipse
        cx="58"
        cy="72"
        rx="16"
        ry="28"
        fill="url(#pupEar)"
        animate={{ rotate: [-6, 6, -6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "70px 70px" }}
      />
      <motion.ellipse
        cx="142"
        cy="72"
        rx="16"
        ry="28"
        fill="url(#pupEar)"
        animate={{ rotate: [6, -6, 6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "130px 70px" }}
      />

      {/* head */}
      <circle cx="100" cy="78" r="42" fill="url(#pupFur)" />

      {/* snout */}
      <ellipse cx="100" cy="92" rx="22" ry="16" fill="#f8e2c8" />
      <ellipse cx="100" cy="88" rx="8" ry="6" fill="#5c3a45" />
      <path
        d="M100 94 Q100 102 92 104"
        fill="none"
        stroke="#5c3a45"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M100 94 Q100 102 108 104"
        fill="none"
        stroke="#5c3a45"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* eyes */}
      <ellipse cx="82" cy="72" rx="7" ry="9" fill="#3b2a2e" />
      <ellipse cx="118" cy="72" rx="7" ry="9" fill="#3b2a2e" />
      <circle cx="84" cy="69" r="2.2" fill="#fff" />
      <circle cx="120" cy="69" r="2.2" fill="#fff" />

      {/* blush */}
      <ellipse cx="68" cy="88" rx="8" ry="5" fill="#f5a9b8" opacity="0.75" />
      <ellipse cx="132" cy="88" rx="8" ry="5" fill="#f5a9b8" opacity="0.75" />

      {/* little heart above */}
      <motion.path
        d="M148 42 C148 42 138 35 138 28 C138 24 141 22 144 22 C146 22 148 23 149 26 C150 23 152 22 154 22 C157 22 160 24 160 28 C160 35 148 42 148 42 Z"
        fill="#fb7189"
        animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
