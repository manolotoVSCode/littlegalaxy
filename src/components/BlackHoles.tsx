import { useMemo } from "react";
import { motion } from "framer-motion";

interface BlackHole {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function BlackHoles() {
  const holes = useMemo<BlackHole[]>(
    () => [
      { id: 0, x: 88, y: 75, size: 50 },
      { id: 1, x: 8, y: 65, size: 40 },
    ],
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {holes.map((h) => (
        <motion.div
          key={h.id}
          className="absolute rounded-full"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            width: h.size,
            height: h.size,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, hsl(0 0% 0%) 30%, hsl(270 80% 15% / 0.8) 60%, transparent 100%)",
            boxShadow:
              "0 0 30px 10px hsl(270 80% 30% / 0.3), inset 0 0 20px hsl(0 0% 0%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 20, ease: "linear" },
          }}
        >
          {/* Accretion ring */}
          <div
            className="absolute inset-[-8px] rounded-full"
            style={{
              border: "1px solid hsl(270 80% 60% / 0.3)",
              boxShadow:
                "0 0 12px hsl(270 80% 60% / 0.2), inset 0 0 12px hsl(270 80% 60% / 0.1)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
