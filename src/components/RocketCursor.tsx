import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  born: number;
}

const COLORS = ["#ff6bcb", "#00e5ff", "#ffeb3b", "#76ff03", "#ff9100", "#e040fb", "#ff4081", "#00bcd4"];
const LIFETIME = 2500;

export default function RocketCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const frameRef = useRef(0);

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    const p = "touches" in e ? e.touches[0] : e;
    if (!p) return;
    const x = p.clientX;
    const y = p.clientY;
    setPos({ x, y });

    // Add multiple particles per frame
    frameRef.current++;
    if (frameRef.current % 2 === 0) {
      const newParticles: Particle[] = Array.from({ length: 3 }, () => ({
        id: idRef.current++,
        x: x + (Math.random() - 0.5) * 20,
        y: y + 20 + Math.random() * 14,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        born: Date.now(),
      }));
      setParticles((prev) => [...prev.slice(-80), ...newParticles]);
    }
  }, []);

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
      {/* Rocket cursor */}
      <div
        className="absolute text-5xl"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%) rotate(-45deg)",
        }}
      >
        🚀
      </div>
    </div>
  );
}
