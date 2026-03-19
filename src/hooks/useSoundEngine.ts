import { useRef, useCallback } from "react";
import type { SoundConfig } from "@/config/scenes";

// Default config (cosmic)
const DEFAULT_SOUND: SoundConfig = {
  oscType: "sine",
  scale: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0],
  noteDuration: 0.6,
  noteVolume: 0.3,
  cursorOscType: "sine",
  cursorBaseFreq: 200,
  cursorFreqRange: 1000,
  cursorMaxVol: 0.15,
};

const POP_FREQS = [800, 1200, 600];

export function useSoundEngine(soundConfig?: SoundConfig) {
  const ctxRef = useRef<AudioContext | null>(null);
  const noteIndex = useRef(0);
  const config = soundConfig ?? DEFAULT_SOUND;

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playNote = useCallback(() => {
    const ctx = getCtx();
    const freq = config.scale[noteIndex.current % config.scale.length];
    noteIndex.current++;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = config.oscType;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(config.noteVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + config.noteDuration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + config.noteDuration);
  }, [getCtx, config]);

  const playPop = useCallback(() => {
    const ctx = getCtx();
    const freq = POP_FREQS[Math.floor(Math.random() * POP_FREQS.length)];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = config.oscType;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }, [getCtx, config]);

  const unlock = useCallback(() => {
    getCtx();
  }, [getCtx]);

  return { playNote, playPop, unlock };
}
