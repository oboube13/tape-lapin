export const HOLE_COUNT = 9;
export const GRID_COLUMNS = 3;

/** All timings are in milliseconds and tuned to feel calm for toddlers. */
export const TIMING = {
  /** Pause before the very first rabbit, and between rounds. */
  waiting: 700,
  next: 650,
  /** Time for the rabbit to rise out of its hole. */
  appearing: 340,
  /** The rabbit waits this long for a tap, then gently hops away. */
  visible: 10_000,
  /** Time the hammer animation and the rabbit reaction stay on screen. */
  hit: 640,
  hiding: 380,
} as const;

export const AUDIO = {
  masterVolume: 0.9,
  sfx: {
    pop: 0.55,
    tap: 0.6,
    giggle: 0.5,
    sparkle: 0.35,
  },
  musicVolume: 0.16,
  musicFade: 900,
} as const;

/** Short, warm French encouragements spoken after a tap. */
export const ENCOURAGEMENTS = [
  "Bravo !",
  "Super !",
  "Youpi !",
  "Coucou !",
  "Encore !",
  "Trop bien !",
  "Magnifique !",
] as const;
