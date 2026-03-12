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
      { id: 0, x: 88, y: 75, size: 70 },
      { id: 1, x: 8, y: 60, size: 45 },
    ],
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[2]">
      {holes.map((h) => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Light being sucked in — outer glow particles spiraling */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 3 + i,
                height: 3 + i,
                left: h.size / 2,
                top: h.size / 2,
                background: i % 2 === 0
                  ? "hsl(270 90% 70%)"
                  : "hsl(200 90% 70%)",
                boxShadow: i % 2 === 0
                  ? "0 0 6px hsl(270 90% 70%)"
                  : "0 0 6px hsl(200 90% 70%)",
              }}
              animate={{
                x: [h.size * 0.8 * Math.cos((i * Math.PI * 2) / 6), 0],
                y: [h.size * 0.8 * Math.sin((i * Math.PI * 2) / 6), 0],
                scale: [1, 0],
                opacity: [0.8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4 + i * 0.5,
                delay: i * 0.6,
                ease: "easeIn",
              }}
            />
          ))}

          {/* Swirling accretion disk — being pulled in */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: h.size * 1.8,
              height: h.size * 1.8,
              left: -(h.size * 0.4),
              top: -(h.size * 0.4),
              background:
                "conic-gradient(from 0deg, transparent 0%, hsl(270 80% 50% / 0.15) 15%, transparent 30%, hsl(200 80% 50% / 0.1) 45%, transparent 60%, hsl(320 80% 50% / 0.12) 75%, transparent 90%)",
              filter: "blur(3px)",
            }}
            animate={{ rotate: [0, 360], scale: [1, 0.95, 1] }}
            transition={{
              rotate: { repeat: Infinity, duration: 16, ease: "linear" },
              scale: { repeat: Infinity, duration: 6, ease: "easeInOut" },
            }}
          />

          {/* Inner swirl — faster, tighter */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: h.size * 1.3,
              height: h.size * 1.3,
              left: -(h.size * 0.15),
              top: -(h.size * 0.15),
              background:
                "conic-gradient(from 180deg, transparent 0%, hsl(270 90% 40% / 0.25) 20%, transparent 40%, hsl(280 80% 35% / 0.2) 60%, transparent 80%)",
              filter: "blur(2px)",
            }}
            animate={{ rotate: [360, 0], scale: [0.97, 1.03, 0.97] }}
            transition={{
              rotate: { repeat: Infinity, duration: 10, ease: "linear" },
              scale: { repeat: Infinity, duration: 5, ease: "easeInOut" },
            }}
          />

          {/* Event horizon — the dark core that swallows everything */}
          <motion.div
            className="rounded-full"
            style={{
              width: h.size,
              height: h.size,
              background:
                "radial-gradient(circle, hsl(0 0% 0%) 40%, hsl(0 0% 0% / 0.95) 55%, hsl(270 60% 8% / 0.7) 70%, transparent 100%)",
              boxShadow:
                `inset 0 0 ${h.size * 0.4}px hsl(0 0% 0%), 0 0 ${h.size * 0.6}px ${h.size * 0.2}px hsl(0 0% 0% / 0.5)`,
            }}
            animate={{ scale: [1, 1.03, 0.98, 1] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          />

          {/* Gravitational lensing ring — light bending at the edge */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: h.size + 6,
              height: h.size + 6,
              left: -3,
              top: -3,
              border: "1px solid hsl(40 100% 80% / 0.15)",
              boxShadow:
                "0 0 8px hsl(40 100% 70% / 0.1), inset 0 0 8px hsl(40 100% 70% / 0.05)",
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
          />
        </div>
      ))}
    </div>
  );
}
