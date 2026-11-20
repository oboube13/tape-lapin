"use client";

interface GameControlsProps {
  muted: boolean;
  paused: boolean;
  onToggleMuted: () => void;
  onTogglePause: () => void;
}

const BUTTON_BASE =
  "pointer-events-auto grid size-12 place-items-center rounded-full ring-2 ring-white/80 transition-transform duration-150 active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white sm:size-14";

export function GameControls({
  muted,
  paused,
  onToggleMuted,
  onTogglePause,
}: GameControlsProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={onToggleMuted}
        aria-label={muted ? "Activer le son" : "Couper le son"}
        aria-pressed={muted}
        className={`${BUTTON_BASE} ${
          muted
            ? "bg-white/75 text-[#8b9a8c] shadow-[0_5px_0_rgba(120,140,120,0.35)]"
            : "bg-white text-[#3f8f4a] shadow-[0_5px_0_rgba(63,143,74,0.35)]"
        }`}
      >
        {muted ? <SoundOffIcon /> : <SoundOnIcon />}
      </button>

      <button
        type="button"
        onClick={onTogglePause}
        aria-label={paused ? "Reprendre le jeu" : "Mettre le jeu en pause"}
        className={`${BUTTON_BASE} bg-white text-[#e08a2e] shadow-[0_5px_0_rgba(224,138,46,0.35)]`}
      >
        {paused ? <PlayIcon /> : <PauseIcon />}
      </button>
    </div>
  );
}

function SoundOnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 sm:size-7" aria-hidden="true">
      <path
        d="M4 9.5h3.2L12 5.5v13L7.2 14.5H4z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 sm:size-7" aria-hidden="true">
      <path
        d="M4 9.5h3.2L12 5.5v13L7.2 14.5H4z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 9.5l5 5M21 9.5l-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 sm:size-7" aria-hidden="true">
      <rect x="7" y="5.5" width="3.8" height="13" rx="1.9" fill="currentColor" />
      <rect x="13.2" y="5.5" width="3.8" height="13" rx="1.9" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 sm:size-7" aria-hidden="true">
      <path d="M8.5 5.5l10 6.5-10 6.5z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
