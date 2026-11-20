"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import {
  createInitialGameState,
  gameReducer,
  phaseDelay,
} from "@/lib/game-engine";
import type { GamePhase, GameState } from "@/types/game";

export interface GameEngine {
  state: GameState;
  /** False while the player paused or the tab is in the background. */
  running: boolean;
  hit: (hole: number) => boolean;
  togglePause: () => void;
}

function nextAction(phase: GamePhase) {
  switch (phase) {
    case "waiting":
    case "next":
      return { type: "appear" as const };
    case "appearing":
      return { type: "reveal" as const };
    case "visible":
    case "hit":
      return { type: "hide" as const };
    case "hiding":
      return { type: "next" as const };
  }
}

export function useGameEngine(): GameEngine {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialGameState,
  );
  const [tabHidden, setTabHidden] = useState(false);

  const running = !state.paused && !tabHidden;

  // One timer drives the whole round. It is recreated after every
  // transition and cleared when the game pauses or the tab is hidden.
  useEffect(() => {
    if (!running) return;

    const timer = window.setTimeout(() => {
      dispatch(nextAction(state.phase));
    }, phaseDelay(state.phase));

    return () => window.clearTimeout(timer);
  }, [running, state.phase, state.seq]);

  // Never leave the game running and talking in a background tab.
  useEffect(() => {
    const onVisibilityChange = () => {
      setTabHidden(document.visibilityState === "hidden");
    };

    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const hit = useCallback(
    (hole: number) => {
      const accepted =
        state.phase === "visible" && state.activeHole === hole && !state.paused;
      if (!accepted) return false;

      dispatch({ type: "hit" });
      return true;
    },
    [state.phase, state.activeHole, state.paused],
  );

  const togglePause = useCallback(() => {
    dispatch({ type: state.paused ? "resume" : "pause" });
  }, [state.paused]);

  return { state, running, hit, togglePause };
}
