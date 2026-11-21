"use client";

import { motion } from "framer-motion";

export function TeddyHeart() {
  return (
    <motion.div
      className="mx-auto w-full max-w-[240px] overflow-hidden rounded-[1.5rem] bg-white p-3 shadow-[0_8px_28px_rgba(92,58,69,0.08)] sm:max-w-[320px] sm:rounded-[1.75rem] sm:p-5"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        viewBox="0 0 280 160"
        className="mx-auto h-auto w-full"
        role="img"
        aria-label="Cute teddy bear holding a heart"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="bearFur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3d5b5" />
            <stop offset="100%" stopColor="#e8c19a" />
          </linearGradient>
          <linearGradient id="bearHeart" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4bd" />
            <stop offset="100%" stopColor="#fb7189" />
          </linearGradient>
        </defs>

        {/* sparkles / motion lines */}
        <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.95">
          <path d="M48 72 l-14 -6" />
          <path d="M46 88 l-16 0" />
          <path d="M50 104 l-12 8" />
          <path d="M232 72 l14 -6" />
          <path d="M234 88 l16 0" />
          <path d="M230 104 l12 8" />
        </g>
        <g fill="#ffffff" opacity="0.9">
          <circle cx="38" cy="58" r="2.2" />
          <circle cx="242" cy="58" r="2.2" />
        </g>

        {/* ears */}
        <circle cx="102" cy="48" r="18" fill="url(#bearFur)" />
        <circle cx="178" cy="48" r="18" fill="url(#bearFur)" />
        <circle cx="102" cy="48" r="10" fill="#f7c4b0" />
        <circle cx="178" cy="48" r="10" fill="#f7c4b0" />

        {/* head */}
        <ellipse cx="140" cy="78" rx="48" ry="42" fill="url(#bearFur)" />

        {/* body */}
        <ellipse cx="140" cy="128" rx="42" ry="28" fill="url(#bearFur)" />

        {/* arms */}
        <ellipse cx="102" cy="122" rx="14" ry="18" fill="url(#bearFur)" transform="rotate(-18 102 122)" />
        <ellipse cx="178" cy="122" rx="14" ry="18" fill="url(#bearFur)" transform="rotate(18 178 122)" />

        {/* face */}
        <circle cx="122" cy="74" r="4.2" fill="#3b2a2e" />
        <circle cx="158" cy="74" r="4.2" fill="#3b2a2e" />
        <circle cx="123.2" cy="72.8" r="1.2" fill="#fff" />
        <circle cx="159.2" cy="72.8" r="1.2" fill="#fff" />
        <circle cx="118" cy="84" r="7" fill="#f5a9b8" opacity="0.85" />
        <circle cx="162" cy="84" r="7" fill="#f5a9b8" opacity="0.85" />
        <ellipse cx="140" cy="90" rx="5" ry="4" fill="#5c3a45" />
        <ellipse cx="140" cy="98" rx="4.5" ry="3.2" fill="none" stroke="#5c3a45" strokeWidth="2" />

        {/* heart */}
        <motion.path
          d="M140 132 C140 132 118 118 118 106 C118 98 124 94 130 94 C134 94 138 97 140 101 C142 97 146 94 150 94 C156 94 162 98 162 106 C162 118 140 132 140 132 Z"
          fill="url(#bearHeart)"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "140px 112px" }}
        />
      </motion.svg>
    </motion.div>
  );
}
