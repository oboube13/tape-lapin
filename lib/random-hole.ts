import { HOLE_COUNT } from "@/constants/game";

/**
 * Picks a hole index that is never the same as the previous one.
 * Every other hole has the same probability, which keeps the game
 * unpredictable while guaranteeing no two rabbits in a row.
 */
export function pickNextHole(
  previous: number | null,
  random: () => number = Math.random,
): number {
  if (previous === null || previous < 0 || previous >= HOLE_COUNT) {
    return Math.min(HOLE_COUNT - 1, Math.floor(random() * HOLE_COUNT));
  }

  // Shift by 1..HOLE_COUNT-1 and wrap, so `previous` is excluded.
  const offset = 1 + Math.floor(random() * (HOLE_COUNT - 1));
  return (previous + offset) % HOLE_COUNT;
}

export const HOLE_INDICES: readonly number[] = Array.from(
  { length: HOLE_COUNT },
  (_, index) => index,
);
