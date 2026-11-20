import { TIMING } from "@/constants/game";
import { pickNextHole } from "@/lib/random-hole";
import type { GameAction, GamePhase, GameState } from "@/types/game";

export function createInitialGameState(): GameState {
  return {
    phase: "waiting",
    activeHole: null,
    lastHole: null,
    hits: 0,
    paused: false,
    seq: 0,
  };
}

const ALLOWED_HIDE_FROM: readonly GamePhase[] = ["visible", "hit"];

/**
 * Pure state machine for one round of the game:
 * waiting -> appearing -> visible -> hit -> hiding -> next -> ...
 *
 * Every action is guarded by the current phase, so stray pointer events
 * (for example a double tap or a click fired after a touch) are no-ops.
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "appear": {
      if (state.paused) return state;
      if (state.phase !== "waiting" && state.phase !== "next") return state;

      const hole = pickNextHole(state.lastHole);
      return {
        ...state,
        phase: "appearing",
        activeHole: hole,
        lastHole: hole,
        seq: state.seq + 1,
      };
    }

    case "reveal": {
      if (state.phase !== "appearing") return state;
      return { ...state, phase: "visible", seq: state.seq + 1 };
    }

    case "hit": {
      if (state.phase !== "visible" || state.activeHole === null) return state;
      return {
        ...state,
        phase: "hit",
        hits: state.hits + 1,
        seq: state.seq + 1,
      };
    }

    case "hide": {
      if (!ALLOWED_HIDE_FROM.includes(state.phase)) return state;
      return { ...state, phase: "hiding", seq: state.seq + 1 };
    }

    case "next": {
      if (state.phase !== "hiding") return state;
      return {
        ...state,
        phase: "next",
        activeHole: null,
        seq: state.seq + 1,
      };
    }

    case "pause": {
      if (state.paused) return state;
      return { ...state, paused: true, seq: state.seq + 1 };
    }

    case "resume": {
      if (!state.paused) return state;
      return { ...state, paused: false, seq: state.seq + 1 };
    }

    default:
      return state;
  }
}

export function phaseDelay(phase: GamePhase): number {
  switch (phase) {
    case "waiting":
      return TIMING.waiting;
    case "next":
      return TIMING.next;
    case "appearing":
      return TIMING.appearing;
    case "visible":
      return TIMING.visible;
    case "hit":
      return TIMING.hit;
    case "hiding":
      return TIMING.hiding;
  }
}
