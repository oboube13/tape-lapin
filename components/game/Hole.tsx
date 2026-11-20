"use client";

import { useId } from "react";
import { Hammer, HitBurst } from "@/components/game/Hammer";
import { Rabbit } from "@/components/game/Rabbit";
import type { RabbitState } from "@/types/game";

interface HoleProps {
  holeIndex: number;
  rabbitState: RabbitState | null;
  showHammer: boolean;
  onHit: (holeIndex: number) => void;
}

/**
 * One of the nine garden holes: a deep opening, the rabbit that rises
 * out of it, and the hammer that lands on its head.
 */
export function Hole({
  holeIndex,
  rabbitState,
  showHammer,
  onHit,
}: HoleProps) {
  const uid = useId().replace(/:/g, "");
  const isActive = rabbitState !== null;

  return (
    <div className="relative aspect-square w-full select-none">
      {/* Back of the hole, drawn behind the rabbit */}
      <svg
        viewBox="0 0 200 100"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full"
      >
        <defs>
          <radialGradient id={`${uid}-depth`} cx="50%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#7a5232" />
            <stop offset="48%" stopColor="#4d2f1b" />
            <stop offset="100%" stopColor="#26150c" />
          </radialGradient>
          <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a5c38" />
            <stop offset="100%" stopColor="#5a3a22" />
          </linearGradient>
        </defs>

        <ellipse cx="100" cy="56" rx="98" ry="41" fill="#5aa93f" opacity="0.35" />
        <ellipse cx="100" cy="56" rx="82" ry="39" fill={`url(#${uid}-rim)`} />
        <ellipse cx="100" cy="54" rx="77" ry="35" fill={`url(#${uid}-depth)`} />
        <ellipse cx="100" cy="43" rx="58" ry="18" fill="#1b0e07" opacity="0.55" />

        {/* Little pebbles on the rim */}
        <ellipse cx="40" cy="31" rx="5" ry="3" fill="#b7a084" opacity="0.8" />
        <ellipse cx="163" cy="36" rx="4" ry="2.5" fill="#b7a084" opacity="0.7" />
      </svg>

      {/* Rabbit, clipped by the hole opening so it rises from underground */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-[25%] z-10 overflow-hidden">
        <div
          className={`absolute inset-x-0 bottom-0 flex justify-center ${
            isActive ? "pointer-events-auto" : ""
          }`}
        >
          {rabbitState ? (
            <div className="w-[54%]">
              <Rabbit state={rabbitState} onHit={() => onHit(holeIndex)} />
            </div>
          ) : null}
        </div>
      </div>

      {/* Front lip of the hole, drawn in front of the rabbit */}
      <svg
        viewBox="0 0 200 100"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full"
      >
        <path
          d="M 23 54 A 77 35 0 0 1 177 54"
          fill="none"
          stroke="#6d4527"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 29 52 A 73 32 0 0 1 171 52"
          fill="none"
          stroke="#a9724a"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <g fill="#4f9f3a">
          <path d="M 26 44 q -9 -14 -18 -17 q 9 2 14 8 q -4 -16 -2 -24 q 5 12 9 22 q 4 -10 12 -14 q -5 12 -9 26 Z" />
          <path d="M 174 44 q 9 -14 18 -17 q -9 2 -14 8 q 4 -16 2 -24 q -5 12 -9 22 q -4 -10 -12 -14 q 5 12 9 26 Z" />
        </g>
        <g fill="#6fc04a">
          <path d="M 58 34 q -3 -12 -10 -17 q 8 3 10 10 q 1 -10 7 -15 q -2 10 -3 19 Z" />
          <path d="M 140 33 q 4 -11 11 -16 q -8 3 -10 10 q -1 -10 -7 -15 q 2 10 3 18 Z" />
        </g>
      </svg>

      {showHammer ? <Hammer /> : null}
      {showHammer ? <HitBurst /> : null}
    </div>
  );
}
