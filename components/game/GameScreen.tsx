"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GameBoard } from "@/components/game/GameBoard";
import { GameControls } from "@/components/game/GameControls";
import { GardenBackground } from "@/components/game/GardenBackground";
import { ENCOURAGEMENTS } from "@/constants/game";
import { useGameEngine } from "@/hooks/useGameEngine";
import { useGameSounds } from "@/hooks/useGameSounds";
import type { GamePhase } from "@/types/game";

export function GameScreen() {
  const { state, running, hit, togglePause } = useGameEngine();
  const { muted, toggleMuted, unlock, playSfx, speak, setMusicPaused } =
    useGameSounds();

  const pendingTimers = useRef<number[]>([]);
  const lastEncouragement = useRef(-1);
  const previousPhase = useRef<GamePhase>("waiting");

  useEffect(() => {
    const timers = pendingTimers.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  // Little "boing" whenever the rabbit shows up.
  useEffect(() => {
    if (state.phase === "appearing" && previousPhase.current !== "appearing") {
      playSfx("pop");
    }
    previousPhase.current = state.phase;
  }, [state.phase, playSfx]);

  // Music follows the game: silent while paused or in a background tab.
  useEffect(() => {
    setMusicPaused(!running);
  }, [running, setMusicPaused]);

  const handleHit = useCallback(
    (hole: number) => {
      if (!hit(hole)) return;

      playSfx("tap");
      playSfx("sparkle");

      pendingTimers.current.push(
        window.setTimeout(() => playSfx("giggle"), 150),
        window.setTimeout(() => {
          let index = Math.floor(Math.random() * ENCOURAGEMENTS.length);
          if (index === lastEncouragement.current) {
            index = (index + 1) % ENCOURAGEMENTS.length;
          }
          lastEncouragement.current = index;
          speak(ENCOURAGEMENTS[index]);
        }, 420),
      );
    },
    [hit, playSfx, speak],
  );

  return (
    <main
      className="game-shell relative isolate w-full overflow-hidden bg-[#aee4ff]"
      onPointerDownCapture={unlock}
      onKeyDownCapture={unlock}
    >
      <GardenBackground />

      <div className="relative z-10 flex h-full w-full flex-col">
        <header className="game-header flex items-start justify-between gap-2 px-3 sm:px-6">
          <div className="title-pill flex items-center gap-2 rounded-full bg-white/85 py-1.5 pr-4 pl-2.5 shadow-[0_4px_0_rgba(95,151,64,0.25)] ring-2 ring-white/70">
            <BunnyBadge />
            <span className="text-sm font-bold text-[#4b7c2f] sm:text-base">
              Tape le lapin !
            </span>
          </div>

          <GameControls
            muted={muted}
            paused={state.paused}
            onToggleMuted={toggleMuted}
            onTogglePause={togglePause}
          />
        </header>

        <div className="game-board-area relative flex min-h-0 flex-1 items-center justify-center">
          <div className="game-board-frame relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[2.5rem] bg-white/25 blur-lg sm:-inset-6"
            />
            <div className="relative">
              <GameBoard state={state} onHit={handleHit} />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {state.paused ? (
          <motion.div
            key="pause"
            className="absolute inset-0 z-40 grid place-items-center bg-[#eafbe0]/70 px-6 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.86, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex flex-col items-center gap-4 rounded-[2rem] bg-white/90 px-10 py-8 shadow-[0_18px_40px_rgba(70,110,50,0.25)] ring-4 ring-white/70"
            >
              <span className="text-xs font-bold tracking-[0.28em] text-[#7ba05f] uppercase">
                Pause
              </span>
              <button
                type="button"
                onClick={togglePause}
                aria-label="Reprendre le jeu"
                className="grid size-20 place-items-center rounded-full bg-[#ffcf6b] text-[#8a5a14] shadow-[0_6px_0_rgba(216,150,45,0.6)] transition-transform duration-150 active:translate-y-1 focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none sm:size-24"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 size-9 sm:size-11"
                  aria-hidden="true"
                >
                  <path
                    d="M8.5 5.5l10 6.5-10 6.5z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function BunnyBadge() {
  return (
    <span className="grid size-8 place-items-center rounded-full bg-[#d8f0c4] sm:size-9">
      <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
        <ellipse cx="11" cy="9" rx="3.4" ry="7" fill="#fffaf3" stroke="#d8ab88" strokeWidth="1.4" transform="rotate(-12 11 9)" />
        <ellipse cx="21" cy="9" rx="3.4" ry="7" fill="#fffaf3" stroke="#d8ab88" strokeWidth="1.4" transform="rotate(12 21 9)" />
        <ellipse cx="16" cy="19" rx="9" ry="8" fill="#fffaf3" stroke="#d8ab88" strokeWidth="1.4" />
        <circle cx="12.8" cy="18" r="1.5" fill="#4a3227" />
        <circle cx="19.2" cy="18" r="1.5" fill="#4a3227" />
        <path d="M14.8 21.5q1.2 1.1 2.4 0" stroke="#b07d63" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <circle cx="17.5" cy="21.6" r="1" fill="#ff97ae" />
      </svg>
    </span>
  );
}
