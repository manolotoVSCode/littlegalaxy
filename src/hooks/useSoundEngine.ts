import { useRef, useCallback } from "react";

// Pentatonic scale frequencies (C major pentatonic across octaves)
const PENTATONIC = [
  261.63, 293.66, 329.63, 392.0, 440.0,
  523.25, 587.33, 659.25, 783.99, 880.0,
];

const POP_FREQS = [800, 1200, 600];

export function useSoundEngine() {
  const ctxRef = useRef<AudioContext | null>(null);
  const noteIndex = useRef(0);

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
    const freq = PENTATONIC[noteIndex.current % PENTATONIC.length];
    noteIndex.current++;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  }, [getCtx]);

  const playPop = useCallback(() => {
    const ctx = getCtx();
    const freq = POP_FREQS[Math.floor(Math.random() * POP_FREQS.length)];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }, [getCtx]);

  const unlock = useCallback(() => {
    getCtx();
  }, [getCtx]);

  return { playNote, playPop, unlock };
}
