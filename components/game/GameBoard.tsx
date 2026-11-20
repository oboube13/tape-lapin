"use client";

import { Hole } from "@/components/game/Hole";
import { HOLE_INDICES } from "@/lib/random-hole";
import type { GamePhase, GameState, RabbitState } from "@/types/game";

const RABBIT_STATE_BY_PHASE: Record<GamePhase, RabbitState> = {
  waiting: "hidden",
  appearing: "appearing",
  visible: "visible",
  hit: "hit",
  hiding: "hiding",
  next: "hidden",
};

interface GameBoardProps {
  state: GameState;
  onHit: (hole: number) => void;
}

export function GameBoard({ state, onHit }: GameBoardProps) {
  const rabbitState = RABBIT_STATE_BY_PHASE[state.phase];

  return (
    <div
      role="group"
      aria-label="Jardin aux neuf trous"
      className="grid w-full grid-cols-3 gap-1.5 sm:gap-3"
    >
      {HOLE_INDICES.map((holeIndex) => {
        const isActive = state.activeHole === holeIndex;
        return (
          <Hole
            key={holeIndex}
            holeIndex={holeIndex}
            rabbitState={isActive ? rabbitState : null}
            showHammer={isActive && state.phase === "hit"}
            onHit={onHit}
          />
        );
      })}
    </div>
  );
}
