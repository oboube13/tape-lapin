"use client";

import { useEffect, useId, useState } from "react";
import { motion, type Variants } from "motion/react";
import type { RabbitState } from "@/types/game";

const FUR_LIGHT = "#fffdf8";
const FUR_MID = "#f8ead9";
const FUR_SHADE = "#efd8c1";
const OUTLINE = "#d8ab88";
const INNER_EAR = "#ffc3d3";
const EYE = "#4a3227";
const NOSE = "#ff97ae";
const CHEEK = "#ffb4c5";
const MOUTH = "#b07d63";

const RABBIT_VARIANTS: Variants = {
  hidden: { y: 116, opacity: 0 },
  appearing: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 220, damping: 15, mass: 0.9 },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  surprised: {
    y: -7,
    opacity: 1,
    transition: { type: "spring", stiffness: 320, damping: 14 },
  },
  hit: {
    y: 7,
    scaleX: 1.12,
    scaleY: 0.88,
    opacity: 1,
    transition: { type: "spring", stiffness: 520, damping: 12 },
  },
  hiding: {
    y: 122,
    opacity: 0,
    transition: { duration: 0.34, ease: "easeIn" },
  },
};

interface RabbitProps {
  state: RabbitState;
  onHit: () => void;
}

export function Rabbit({ state, onHit }: RabbitProps) {
  const uid = useId().replace(/:/g, "");
  const [isPeeking, setIsPeeking] = useState(false);

  // While the rabbit simply waits, it now and then looks around.
  // Purely visual: the game engine stays in the "visible" phase.
  useEffect(() => {
    if (state !== "visible") return;

    let inner: ReturnType<typeof setTimeout> | undefined;
    const outer = setTimeout(
      () => {
        setIsPeeking(true);
        inner = setTimeout(() => setIsPeeking(false), 1100);
      },
      2600 + Math.random() * 2400,
    );

    return () => {
      clearTimeout(outer);
      if (inner) clearTimeout(inner);
    };
  }, [state]);

  const expression: RabbitState =
    state === "visible" && isPeeking ? "surprised" : state;
  const eyesClosed = expression === "hit" || expression === "hiding";
  const eyesWide = expression === "appearing" || expression === "surprised";
  const mouthOpen = expression === "hit" || eyesWide;

  return (
    <motion.div
      variants={RABBIT_VARIANTS}
      initial="hidden"
      animate={expression}
      className="w-full origin-bottom"
      style={{ willChange: "transform, opacity" }}
    >
      <button
        type="button"
        aria-label="Taper le lapin"
        data-rabbit-state={expression}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          onHit();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onHit();
          }
        }}
        className="block w-full cursor-pointer touch-manipulation rounded-[45%] outline-none focus-visible:ring-4 focus-visible:ring-white/80"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <svg
          viewBox="0 0 200 250"
          className="block h-auto w-full overflow-visible drop-shadow-[0_10px_10px_rgba(58,92,40,0.22)]"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`${uid}-fur`} cx="42%" cy="30%" r="78%">
              <stop offset="0%" stopColor={FUR_LIGHT} />
              <stop offset="62%" stopColor={FUR_MID} />
              <stop offset="100%" stopColor={FUR_SHADE} />
            </radialGradient>
            <radialGradient id={`${uid}-ear`} cx="50%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#ffe0e8" />
              <stop offset="100%" stopColor={INNER_EAR} />
            </radialGradient>
          </defs>

          <g
            stroke={OUTLINE}
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            {/* Ears (behind the head) */}
            <g
              className={
                expression === "hit"
                  ? undefined
                  : "rabbit-ear rabbit-ear-left"
              }
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 92%",
                transform:
                  expression === "hit" ? "rotate(-16deg)" : undefined,
              }}
            >
              <path
                d="M 88 102 C 71 92 57 66 56 42 C 54 20 64 5 78 6 C 90 7 96 18 97 34 C 99 57 100 82 104 100 Z"
                fill={`url(#${uid}-fur)`}
              />
              <path
                d="M 83 88 C 73 76 67 54 67 40 C 67 27 73 20 79 21 C 86 22 88 32 89 45 C 90 62 92 78 95 87 Z"
                fill={`url(#${uid}-ear)`}
                stroke="none"
              />
            </g>
            <g
              className={
                expression === "hit"
                  ? undefined
                  : "rabbit-ear rabbit-ear-right"
              }
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 92%",
                transform:
                  expression === "hit" ? "rotate(16deg)" : undefined,
              }}
            >
              <path
                d="M 112 100 C 129 90 143 64 144 40 C 146 18 136 3 122 4 C 110 5 104 16 103 32 C 101 55 100 80 96 98 Z"
                fill={`url(#${uid}-fur)`}
              />
              <path
                d="M 117 86 C 127 74 133 52 133 38 C 133 25 127 18 121 19 C 114 20 112 30 111 43 C 110 60 108 76 105 85 Z"
                fill={`url(#${uid}-ear)`}
                stroke="none"
              />
            </g>

            {/* Body */}
            <path
              d="M 46 249 C 42 207 64 176 100 176 C 136 176 158 207 154 249 Z"
              fill={`url(#${uid}-fur)`}
            />
            <ellipse
              cx="100"
              cy="222"
              rx="35"
              ry="31"
              fill={FUR_LIGHT}
              stroke="none"
            />
            <ellipse
              cx="47"
              cy="207"
              rx="14"
              ry="23"
              transform="rotate(-10 47 207)"
              fill={`url(#${uid}-fur)`}
            />
            <ellipse
              cx="153"
              cy="207"
              rx="14"
              ry="23"
              transform="rotate(10 153 207)"
              fill={`url(#${uid}-fur)`}
            />

            {/* Feet */}
            <ellipse cx="78" cy="241" rx="25" ry="12" fill={FUR_LIGHT} />
            <ellipse cx="122" cy="241" rx="25" ry="12" fill={FUR_LIGHT} />

            {/* Head */}
            <ellipse
              cx="100"
              cy="132"
              rx="66"
              ry="58"
              fill={`url(#${uid}-fur)`}
            />
            <ellipse
              cx="100"
              cy="158"
              rx="44"
              ry="31"
              fill={FUR_LIGHT}
              stroke="none"
            />

            {/* Cheeks */}
            <ellipse cx="63" cy="151" rx="12" ry="8" fill={CHEEK} stroke="none" opacity="0.75" />
            <ellipse cx="137" cy="151" rx="12" ry="8" fill={CHEEK} stroke="none" opacity="0.75" />

            {/* Eyes */}
            {eyesClosed ? (
              <g
                fill="none"
                stroke={EYE}
                strokeWidth="5"
                strokeLinecap="round"
              >
                <path d="M 63 126 Q 77 113 91 126" />
                <path d="M 109 126 Q 123 113 137 126" />
              </g>
            ) : (
              <g className={expression === "visible" ? "rabbit-eyes" : undefined}>
                <ellipse
                  cx="77"
                  cy="125"
                  rx={eyesWide ? 15 : 13}
                  ry={eyesWide ? 18 : 16}
                  fill={EYE}
                  stroke="none"
                />
                <ellipse
                  cx="123"
                  cy="125"
                  rx={eyesWide ? 15 : 13}
                  ry={eyesWide ? 18 : 16}
                  fill={EYE}
                  stroke="none"
                />
                <circle cx="82" cy="118" r="5" fill="#ffffff" stroke="none" />
                <circle cx="128" cy="118" r="5" fill="#ffffff" stroke="none" />
                <circle
                  cx="72"
                  cy="132"
                  r="2.6"
                  fill="#ffffff"
                  stroke="none"
                  opacity="0.8"
                />
                <circle
                  cx="118"
                  cy="132"
                  r="2.6"
                  fill="#ffffff"
                  stroke="none"
                  opacity="0.8"
                />
              </g>
            )}

            {/* Nose and mouth */}
            <path
              d="M 91 146 Q 100 139 109 146 Q 109 154 100 157 Q 91 154 91 146 Z"
              fill={NOSE}
              stroke="none"
            />
            <path
              d="M 96 143 Q 99 141 102 143"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              opacity="0.65"
            />

            {mouthOpen ? (
              expression === "hit" ? (
                <g stroke="none">
                  <ellipse cx="100" cy="169" rx="14" ry="15" fill="#a05c5c" />
                  <ellipse cx="100" cy="176" rx="9" ry="7" fill="#ff8fa6" />
                </g>
              ) : (
                <ellipse
                  cx="100"
                  cy="167"
                  rx="8"
                  ry="9"
                  fill="#a05c5c"
                  stroke="none"
                />
              )
            ) : (
              <path
                d={`M 100 158 L 100 162 M 100 162 Q 92 170 84 162 M 100 162 Q 108 170 116 162`}
                fill="none"
                stroke={MOUTH}
                strokeWidth="3.4"
                strokeLinecap="round"
              />
            )}

            {/* Whiskers */}
            <g stroke="#e6c2a6" strokeWidth="2" opacity="0.9">
              <path d="M 61 152 L 36 145" />
              <path d="M 60 160 L 34 160" />
              <path d="M 62 168 L 38 175" />
              <path d="M 139 152 L 164 145" />
              <path d="M 140 160 L 166 160" />
              <path d="M 138 168 L 162 175" />
            </g>
          </g>
        </svg>
      </button>
    </motion.div>
  );
}
