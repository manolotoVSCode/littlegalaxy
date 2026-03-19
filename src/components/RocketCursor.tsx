import { useEffect, useRef, useState, useCallback } from "react";
import type { SoundConfig } from "@/config/scenes";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  born: number;
}

const LIFETIME = 2500;

function createCursorSound(config: SoundConfig) {
  let ctx: AudioContext | null = null;
  let osc: OscillatorNode | null = null;
  let gain: GainNode | null = null;

  function ensure() {
    if (ctx) return;
    ctx = new AudioContext();
    osc = ctx.createOscillator();
    gain = ctx.createGain();
    osc.type = config.cursorOscType;
    osc.frequency.value = config.cursorBaseFreq;
    gain.gain.value = 0;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
  }

  function update(speed: number) {
    ensure();
    if (!ctx || !osc || !gain) return;
    if (ctx.state === "suspended") ctx.resume();
    const clampedSpeed = Math.min(speed, 2000);
    const freq = config.cursorBaseFreq + (clampedSpeed / 2000) * config.cursorFreqRange;
    const vol = Math.min(clampedSpeed / 2000, 1) * config.cursorMaxVol;
    osc.frequency.setTargetAtTime(freq, ctx.currentTime, 0.05);
    gain.gain.setTargetAtTime(vol, ctx.currentTime, 0.05);
  }

  function silence() {
    if (gain && ctx) {
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
    }
  }

  return { update, silence };
}

interface Props {
  cursorEmoji?: string;
  cursorSize?: string;
  particleColors?: string[];
  soundConfig?: SoundConfig;
}

export default function RocketCursor({
  cursorEmoji = "🚀",
  cursorSize = "text-6xl",
  particleColors = ["#ff6bcb", "#00e5ff", "#ffeb3b", "#76ff03", "#ff9100", "#e040fb", "#ff4081", "#00bcd4"],
  soundConfig,
}: Props) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const frameRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0, t: Date.now() });
  const soundRef = useRef(soundConfig ? createCursorSound(soundConfig) : createCursorSound({
    cursorOscType: "sine",
    cursorBaseFreq: 200,
    cursorFreqRange: 1000,
    cursorMaxVol: 0.15,
    oscType: "sine",
    scale: [],
    noteDuration: 0.6,
    noteVolume: 0.3,
  }));
  const silenceTimer = useRef<ReturnType<typeof setTimeout>>();

  // Update sound when config changes
  useEffect(() => {
    if (soundConfig) {
      soundRef.current = createCursorSound(soundConfig);
    }
  }, [soundConfig]);

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    const p = "touches" in e ? e.touches[0] : e;
    if (!p) return;
    const x = p.clientX;
    const y = p.clientY;
    setPos({ x, y });

    const now = Date.now();
    const dt = (now - lastPosRef.current.t) / 1000;
    if (dt > 0) {
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;
      soundRef.current.update(speed);
    }
    lastPosRef.current = { x, y, t: now };

    clearTimeout(silenceTimer.current);
    silenceTimer.current = setTimeout(() => soundRef.current.silence(), 150);

    frameRef.current++;
    if (frameRef.current % 2 === 0) {
      const newParticles: Particle[] = Array.from({ length: 3 }, () => ({
        id: idRef.current++,
        x: x + (Math.random() - 0.5) * 20,
        y: y + 20 + Math.random() * 14,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        born: Date.now(),
      }));
      setParticles((prev) => [...prev.slice(-80), ...newParticles]);
    }
  }, [particleColors]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });
    const cleanup = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.born < LIFETIME));
    }, 200);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      clearInterval(cleanup);
    };
  }, [handleMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => {
        const age = (Date.now() - p.born) / LIFETIME;
        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: 10 * (1 - age),
              height: 10 * (1 - age),
              backgroundColor: p.color,
              opacity: 1 - age,
              transform: `translate(-50%, -50%)`,
              boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}66`,
            }}
          />
        );
      })}
      <div
        className={`absolute ${cursorSize}`}
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0 0 15px rgba(255,255,255,0.5)) drop-shadow(0 0 30px rgba(255,255,255,0.3))",
        }}
      >
        {cursorEmoji}
      </div>
    </div>
  );
}
