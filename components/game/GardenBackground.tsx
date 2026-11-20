"use client";

import { motion } from "motion/react";

interface CloudProps {
  x: number;
  y: number;
  scale: number;
  opacity?: number;
  drift?: number;
  duration?: number;
}

function Cloud({
  x,
  y,
  scale,
  opacity = 0.95,
  drift = 16,
  duration = 22,
}: CloudProps) {
  return (
    <motion.g
      animate={{ x: [0, drift, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
        <ellipse cx="0" cy="0" rx="54" ry="30" fill="#ffffff" />
        <ellipse cx="-48" cy="9" rx="35" ry="22" fill="#ffffff" />
        <ellipse cx="48" cy="11" rx="38" ry="24" fill="#ffffff" />
        <ellipse cx="-12" cy="-17" rx="30" ry="24" fill="#ffffff" />
        <ellipse cx="26" cy="-10" rx="24" ry="19" fill="#ffffff" />
      </g>
    </motion.g>
  );
}

interface FlowerProps {
  x: number;
  y: number;
  size: number;
  petal: string;
  center: string;
  stemHeight?: number;
}

function Flower({
  x,
  y,
  size,
  petal,
  center,
  stemHeight = 46,
}: FlowerProps) {
  const petals = Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 3) * index;
    return {
      cx: Math.cos(angle) * size * 0.62,
      cy: Math.sin(angle) * size * 0.62,
    };
  });

  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M 0 0 C -3 ${stemHeight * 0.4} -2 ${stemHeight * 0.7} 0 ${stemHeight}`}
        fill="none"
        stroke="#4f9f3a"
        strokeWidth={size * 0.16}
        strokeLinecap="round"
      />
      <path
        d={`M -1 ${stemHeight * 0.55} C -12 ${stemHeight * 0.5} -16 ${stemHeight * 0.7} -8 ${stemHeight * 0.78} Z`}
        fill="#63b544"
      />
      {petals.map((petalPoint, index) => (
        <circle
          key={index}
          cx={petalPoint.cx}
          cy={petalPoint.cy}
          r={size * 0.52}
          fill={petal}
        />
      ))}
      <circle cx="0" cy="0" r={size * 0.45} fill={center} />
      <circle cx={-size * 0.14} cy={-size * 0.14} r={size * 0.12} fill="#ffffff" opacity="0.55" />
    </g>
  );
}

interface ButterflyProps {
  x: number;
  y: number;
  color: string;
  delay: number;
  scale?: number;
}

function Butterfly({ x, y, color, delay, scale = 1 }: ButterflyProps) {
  return (
    <motion.g
      animate={{ y: [0, -16, 0], rotate: [-5, 6, -5] }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <path
          d="M -2 0 C -14 -18 -30 -12 -26 2 C -23 12 -8 10 -2 2 Z"
          fill={color}
          opacity="0.92"
        />
        <path
          d="M 2 0 C 14 -18 30 -12 26 2 C 23 12 8 10 2 2 Z"
          fill={color}
          opacity="0.92"
        />
        <path d="M -2 2 C -12 14 -24 16 -22 6 C -20 0 -8 0 -2 2 Z" fill={color} opacity="0.7" />
        <path d="M 2 2 C 12 14 24 16 22 6 C 20 0 8 0 2 2 Z" fill={color} opacity="0.7" />
        <ellipse cx="0" cy="3" rx="2.6" ry="11" fill="#6b4a33" />
        <path
          d="M -1 -7 C -4 -13 -8 -15 -10 -15 M 1 -7 C 4 -13 8 -15 10 -15"
          stroke="#6b4a33"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </motion.g>
  );
}

function Bush({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="-38" cy="6" r="34" fill="#5fb641" />
      <circle cx="0" cy="-8" r="42" fill="#6cc24a" />
      <circle cx="40" cy="6" r="32" fill="#5fb641" />
      <circle cx="-16" cy="-22" r="20" fill="#7fd257" opacity="0.7" />
      <circle cx="18" cy="-14" r="16" fill="#7fd257" opacity="0.55" />
      <circle cx="-54" cy="14" r="7" fill="#ffd76e" />
      <circle cx="52" cy="10" r="6" fill="#ffb3c7" />
    </g>
  );
}

/** Hand-drawn style garden used as the game backdrop. */
export function GardenBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 1400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="garden-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8ed7fb" />
            <stop offset="52%" stopColor="#c6edff" />
            <stop offset="100%" stopColor="#eafaff" />
          </linearGradient>
          <radialGradient id="garden-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8d6" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#ffeaa5" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffeaa5" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="garden-hill-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c6eda4" />
            <stop offset="100%" stopColor="#a9dd85" />
          </linearGradient>
          <linearGradient id="garden-hill-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a7e07e" />
            <stop offset="100%" stopColor="#8ccf63" />
          </linearGradient>
          <linearGradient id="garden-grass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8fd35e" />
            <stop offset="100%" stopColor="#74c14b" />
          </linearGradient>
          <linearGradient id="garden-grass-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7ccb52" />
            <stop offset="100%" stopColor="#63b544" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="900" height="1400" fill="url(#garden-sky)" />

        {/* Sun */}
        <circle cx="790" cy="150" r="150" fill="url(#garden-sun-glow)" />
        <circle cx="790" cy="150" r="62" fill="#ffe17d" />
        <circle cx="790" cy="150" r="52" fill="#fff0a8" />
        <g stroke="#ffe17d" strokeWidth="9" strokeLinecap="round" opacity="0.75">
          <path d="M 790 40 L 790 14" />
          <path d="M 868 68 L 888 48" />
          <path d="M 900 150 L 926 150" />
          <path d="M 712 68 L 692 48" />
        </g>

        {/* Clouds */}
        <Cloud x={170} y={150} scale={1} drift={22} duration={26} />
        <Cloud x={530} y={92} scale={0.72} opacity={0.9} drift={16} duration={19} />
        <Cloud x={710} y={320} scale={0.55} opacity={0.8} drift={12} duration={30} />
        <Cloud x={250} y={400} scale={0.45} opacity={0.7} drift={18} duration={24} />

        {/* Butterflies in the sky */}
        <Butterfly x={250} y={620} color="#ffb3c7" delay={0.4} />
        <Butterfly x={690} y={540} color="#ffd76e" delay={1.8} scale={0.85} />

        {/* Rolling hills */}
        <path
          d="M 0 790 C 160 700 300 726 430 780 C 560 834 700 748 900 800 L 900 1400 L 0 1400 Z"
          fill="url(#garden-hill-back)"
        />
        <path
          d="M 0 900 C 150 830 300 862 450 900 C 620 943 760 872 900 906 L 900 1400 L 0 1400 Z"
          fill="url(#garden-hill-front)"
        />

        {/* Grass ground */}
        <path
          d="M 0 1000 C 180 958 320 980 470 1002 C 640 1027 780 990 900 1004 L 900 1400 L 0 1400 Z"
          fill="url(#garden-grass)"
        />
        <path
          d="M 0 1000 C 180 958 320 980 470 1002 C 640 1027 780 990 900 1004"
          fill="none"
          stroke="#a3e07a"
          strokeWidth="10"
          opacity="0.85"
        />

        {/* Soft grass bands for depth */}
        <path
          d="M 0 1120 C 220 1088 340 1112 520 1128 C 700 1144 800 1118 900 1126 L 900 1400 L 0 1400 Z"
          fill="#7fca55"
          opacity="0.55"
        />
        <path
          d="M 0 1260 C 240 1232 380 1258 560 1270 C 720 1280 820 1262 900 1268 L 900 1400 L 0 1400 Z"
          fill="url(#garden-grass-front)"
        />

        {/* Bushes */}
        <Bush x={70} y={1060} scale={1.15} />
        <Bush x={840} y={1085} scale={0.95} />
        <Bush x={250} y={1010} scale={0.55} />
        <Bush x={640} y={1000} scale={0.45} />

        {/* Flowers along the edges */}
        <Flower x={120} y={1140} size={26} petal="#fff6f8" center="#ffd76e" />
        <Flower x={196} y={1180} size={19} petal="#ffc2d2" center="#ffb347" />
        <Flower x={66} y={1210} size={16} petal="#ffe9a8" center="#ff9f43" />
        <Flower x={786} y={1150} size={24} petal="#ffd0dd" center="#ffe08a" />
        <Flower x={846} y={1205} size={18} petal="#ffffff" center="#ffb347" />
        <Flower x={722} y={1224} size={15} petal="#ffe9a8" center="#ff9f43" />
        <Flower x={150} y={1330} size={22} petal="#ffc2d2" center="#fff3c4" />
        <Flower x={760} y={1345} size={20} petal="#ffffff" center="#ffd76e" />

        {/* Grass tufts */}
        <g fill="#5fb03f" opacity="0.9">
          <path d="M 330 1112 q -6 -22 -18 -30 q 14 6 18 18 q 3 -18 14 -26 q -6 16 -8 34 Z" />
          <path d="M 560 1140 q -6 -22 -18 -30 q 14 6 18 18 q 3 -18 14 -26 q -6 16 -8 34 Z" />
          <path d="M 700 1078 q -6 -18 -15 -25 q 12 5 15 15 q 3 -15 12 -22 q -5 14 -7 29 Z" />
          <path d="M 200 1074 q -6 -18 -15 -25 q 12 5 15 15 q 3 -15 12 -22 q -5 14 -7 29 Z" />
        </g>

        {/* Small daisies scattered in the grass */}
        <g fill="#fffdf5">
          <circle cx="420" cy="1160" r="5" />
          <circle cx="438" cy="1152" r="4" />
          <circle cx="404" cy="1150" r="3.5" />
          <circle cx="610" cy="1218" r="5" />
          <circle cx="628" cy="1210" r="4" />
          <circle cx="320" cy="1290" r="4.5" />
          <circle cx="300" cy="1298" r="3.5" />
        </g>
      </svg>
    </div>
  );
}
