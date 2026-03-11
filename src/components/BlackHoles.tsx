import { useMemo } from "react";
import { motion } from "framer-motion";

interface BlackHole {
  id: number;
  x: number;
  y: number;
  size: number;
  pulseSpeed: number;
  rotateSpeed: number;
}

export default function BlackHoles() {
  const holes = useMemo<BlackHole[]>(
    () => [
      { id: 0, x: 88, y: 75, size: 70, pulseSpeed: 3.5, rotateSpeed: 15 },
      { id: 1, x: 8, y: 60, size: 40, pulseSpeed: 5, rotateSpeed: 25 },
      { id: 2, x: 50, y: 85, size: 55, pulseSpeed: 4, rotateSpeed: 18 },
    ],
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {holes.map((h) => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            width: h.size,
            height: h.size,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Outer swirl ring */}
          <motion.div
            className="absolute inset-[-14px] rounded-full"
            style={{
              border: "2px solid hsl(270 80% 50% / 0.15)",
              boxShadow:
                "0 0 20px hsl(270 80% 60% / 0.15), 0 0 40px hsl(300 60% 50% / 0.08)",
            }}
            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
            transition={{
              rotate: { repeat: Infinity, duration: h.rotateSpeed, ease: "linear" },
              scale: { repeat: Infinity, duration: h.pulseSpeed * 1.2, ease: "easeInOut" },
            }}
          />

          {/* Middle accretion ring */}
          <motion.div
            className="absolute inset-[-6px] rounded-full"
            style={{
              border: "1.5px solid hsl(280 90% 55% / 0.25)",
              boxShadow:
                "0 0 15px hsl(280 90% 55% / 0.2), inset 0 0 10px hsl(270 80% 40% / 0.15)",
            }}
            animate={{ rotate: [360, 0], scale: [1, 0.92, 1] }}
            transition={{
              rotate: { repeat: Infinity, duration: h.rotateSpeed * 0.7, ease: "linear" },
              scale: { repeat: Infinity, duration: h.pulseSpeed * 0.8, ease: "easeInOut" },
            }}
          />

          {/* Core */}
          <motion.div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsl(0 0% 0%) 35%, hsl(270 80% 12% / 0.9) 60%, transparent 100%)",
              boxShadow:
                "0 0 30px 8px hsl(270 80% 30% / 0.25), inset 0 0 20px hsl(0 0% 0%)",
            }}
            animate={{ scale: [1, 1.12, 0.95, 1] }}
            transition={{
              repeat: Infinity,
              duration: h.pulseSpeed,
              ease: "easeInOut",
            }}
          />
        </div>
      ))}
    </div>
  );
}
