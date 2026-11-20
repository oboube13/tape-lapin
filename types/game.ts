/** Public state machine of the garden game. */
export type GamePhase =
  | "waiting"
  | "appearing"
  | "visible"
  | "hit"
  | "hiding"
  | "next";

/** Visual states the rabbit illustration can render. */
export type RabbitState =
  | "hidden"
  | "appearing"
  | "visible"
  | "hit"
  | "surprised"
  | "hiding";

export interface GameState {
  phase: GamePhase;
  /** Hole the rabbit currently belongs to, or null between rounds. */
  activeHole: number | null;
  /** Last hole used, so the rabbit never pops twice in the same hole. */
  lastHole: number | null;
  hits: number;
  paused: boolean;
  /** Increments on every transition so effects can restart equal-phase timers. */
  seq: number;
}

export type GameAction =
  | { type: "appear" }
  | { type: "reveal" }
  | { type: "hit" }
  | { type: "hide" }
  | { type: "next" }
  | { type: "pause" }
  | { type: "resume" };
