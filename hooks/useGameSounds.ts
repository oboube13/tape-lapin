"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Howl, Howler as HowlerGlobal } from "howler";
import { AUDIO } from "@/constants/game";

export type SfxName = "pop" | "tap" | "giggle" | "sparkle";

type SoundBank = Record<SfxName | "music", Howl>;
type HowlerModule = { Howl: typeof Howl; Howler: typeof HowlerGlobal };

export interface GameSounds {
  muted: boolean;
  toggleMuted: () => void;
  /** Call from the first pointer/key interaction to satisfy autoplay rules. */
  unlock: () => void;
  playSfx: (name: SfxName) => void;
  speak: (text: string) => void;
  setMusicPaused: (paused: boolean) => void;
}

export function useGameSounds(): GameSounds {
  const bankRef = useRef<SoundBank | null>(null);
  const howlerRef = useRef<HowlerModule | null>(null);
  const mutedRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [muted, setMuted] = useState(false);
  const [musicPaused, setMusicPaused] = useState(false);

  useEffect(() => {
    let disposed = false;
    let bank: SoundBank | null = null;

    const load = async () => {
      try {
        const { Howl: HowlCtor, Howler: HowlerInstance } = await import(
          "howler"
        );
        if (disposed) return;

        howlerRef.current = { Howl: HowlCtor, Howler: HowlerInstance };
        HowlerInstance.volume(AUDIO.masterVolume);

        const makeSound = (src: string, volume: number, loop = false) =>
          new HowlCtor({
            src: [src],
            volume,
            loop,
            preload: true,
            onloaderror: (_id: number, error: unknown) => {
              console.warn(`[game] sound failed to load: ${src}`, error);
            },
            onplayerror: () => {
              // Browsers can still block a play before any user gesture.
              // The next interaction retries through unlock().
            },
          });

        bank = {
          pop: makeSound("/sounds/pop.wav", AUDIO.sfx.pop),
          tap: makeSound("/sounds/tap.wav", AUDIO.sfx.tap),
          giggle: makeSound("/sounds/giggle.wav", AUDIO.sfx.giggle),
          sparkle: makeSound("/sounds/sparkle.wav", AUDIO.sfx.sparkle),
          music: makeSound("/sounds/garden-loop.wav", AUDIO.musicVolume, true),
        };
        bankRef.current = bank;
        setReady(true);
      } catch (error) {
        console.warn("[game] audio is unavailable, playing silently", error);
      }
    };

    void load();

    return () => {
      disposed = true;
      bankRef.current = null;
      howlerRef.current = null;
      if (bank) {
        Object.values(bank).forEach((sound) => sound.unload());
      }
    };
  }, []);

  // Background music only runs once the player interacted, and it pauses
  // together with the game.
  useEffect(() => {
    if (!ready) return;
    const music = bankRef.current?.music;
    if (!music) return;

    if (unlocked && !musicPaused) {
      if (!music.playing()) {
        music.volume(0);
        music.play();
        music.fade(0, AUDIO.musicVolume, AUDIO.musicFade);
      }
    } else if (music.playing()) {
      music.pause();
    }
  }, [ready, unlocked, musicPaused]);

  useEffect(() => {
    if (!ready) return;
    try {
      howlerRef.current?.Howler.mute(muted);
    } catch {
      // Muting is best effort; the sound cards keep working.
    }
  }, [ready, muted]);

  const unlock = useCallback(() => {
    const howler = howlerRef.current?.Howler;
    try {
      if (howler?.ctx && howler.ctx.state === "suspended") {
        void howler.ctx.resume().catch(() => undefined);
      }
    } catch {
      // Some browsers expose no usable context; ignore.
    }

    setUnlocked(true);

    // Starting the loop directly inside the gesture is what iOS needs.
    if (!mutedRef.current) {
      const music = bankRef.current?.music;
      if (music && !music.playing()) {
        music.volume(0);
        music.play();
        music.fade(0, AUDIO.musicVolume, AUDIO.musicFade);
      }
    }
  }, []);

  const playSfx = useCallback((name: SfxName) => {
    if (mutedRef.current) return;
    const sound = bankRef.current?.[name];
    if (!sound) return;

    try {
      sound.play();
    } catch (error) {
      console.warn(`[game] could not play "${name}"`, error);
    }
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      mutedRef.current = next;
      if (next && typeof window !== "undefined") {
        window.speechSynthesis?.cancel();
      }
      return next;
    });
  }, []);

  const speak = useCallback((text: string) => {
    if (mutedRef.current) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      const synth = window.speechSynthesis;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 0.95;
      utterance.pitch = 1.3;
      utterance.volume = 1;

      const frenchVoice = synth
        .getVoices()
        .find((voice) => voice.lang.toLowerCase().startsWith("fr"));
      if (frenchVoice) utterance.voice = frenchVoice;

      synth.speak(utterance);
    } catch (error) {
      console.warn("[game] speech is unavailable", error);
    }
  }, []);

  return {
    muted,
    toggleMuted,
    unlock,
    playSfx,
    speak,
    setMusicPaused,
  };
}
