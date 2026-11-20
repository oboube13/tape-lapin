"use client";

import { motion } from "motion/react";

/**
 * A soft foam hammer that drops from the sky and bonks the rabbit's head.
 * Never violent: rounded shapes, pastel colours and a springy bounce.
 */
export function Hammer() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-[27%] z-30 w-[52%] origin-[50%_85%]"
      initial={{ top: "-80%", rotate: -22, opacity: 0 }}
      animate={{
        top: ["-80%", "-42%", "-17%", "-31%", "-80%"],
        rotate: [-22, -16, 6, -4, -20],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration: 0.66,
        times: [0, 0.3, 0.52, 0.7, 1],
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 170 230"
        className="block h-auto w-full overflow-visible drop-shadow-[0_8px_10px_rgba(63,88,40,0.28)]"
      >
        <defs>
          <linearGradient id="hammer-head" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffc2d2" />
            <stop offset="55%" stopColor="#ff9fb8" />
            <stop offset="100%" stopColor="#f5829f" />
          </linearGradient>
          <linearGradient id="hammer-handle" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b8efd9" />
            <stop offset="45%" stopColor="#96e3c8" />
            <stop offset="100%" stopColor="#7bd2b4" />
          </linearGradient>
        </defs>

        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Handle */}
          <rect
            x="70"
            y="6"
            width="31"
            height="148"
            rx="15"
            fill="url(#hammer-handle)"
            stroke="#6cc4a6"
            strokeWidth="3"
          />
          <rect
            x="78"
            y="22"
            width="8"
            height="96"
            rx="4"
            fill="#ffffff"
            opacity="0.5"
          />

          {/* Head */}
          <rect
            x="10"
            y="136"
            width="150"
            height="84"
            rx="40"
            fill="url(#hammer-head)"
            stroke="#e07f9c"
            strokeWidth="4"
          />
          <rect
            x="26"
            y="148"
            width="118"
            height="26"
            rx="13"
            fill="#ffe0e8"
            opacity="0.9"
          />
          <circle cx="54" cy="198" r="8" fill="#ffffff" opacity="0.6" />
          <circle cx="116" cy="198" r="8" fill="#ffffff" opacity="0.6" />
          <circle cx="85" cy="192" r="5.5" fill="#ffffff" opacity="0.45" />

          {/* Soft stitching, like a plush toy */}
          <path
            d="M 24 178 Q 46 206 84 210 Q 122 206 146 178"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeDasharray="2 10"
            opacity="0.8"
          />
        </g>
      </svg>
    </motion.div>
  );
}

const STAR_POINTS = (() => {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? 13 : 6;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
  }
  return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
})();

const BURST_POINTS = [
  { x: 22, y: 34, scale: 0.72, color: "#ffd76e" },
  { x: 74, y: 12, scale: 0.95, color: "#fff6c9" },
  { x: 122, y: 30, scale: 0.66, color: "#ffb3c7" },
  { x: 34, y: 84, scale: 0.55, color: "#ffffff" },
  { x: 112, y: 86, scale: 0.6, color: "#ffd76e" },
] as const;

/** Little burst of stars that pops where the hammer lands. */
export function HitBurst() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[16%] z-40 w-[58%] -translate-x-1/2"
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1.1, 1.2, 1.25] }}
      transition={{ duration: 0.72, times: [0, 0.28, 0.75, 1] }}
    >
      <svg viewBox="0 0 150 110" className="h-auto w-full overflow-visible">
        <motion.circle
          cx="75"
          cy="52"
          r="30"
          fill="none"
          stroke="#ffffff"
          strokeWidth="5"
          initial={{ opacity: 0.9, r: 12 }}
          animate={{ opacity: 0, r: 52 }}
          transition={{ duration: 0.5 }}
        />
        {BURST_POINTS.map((star, index) => (
          <motion.g
            key={index}
            transform={`translate(${star.x} ${star.y}) scale(${star.scale})`}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: -10 - index * 3, opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, delay: 0.04 * index }}
          >
            <polygon points={STAR_POINTS} fill={star.color} />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
