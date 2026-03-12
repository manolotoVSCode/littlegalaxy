import { useMemo } from "react";
import { motion } from "framer-motion";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";

interface BlackHole {
  id: number;
  x: number;
  y: number;
  size: number;
  sizeSmall: number;
}

export default function BlackHoles() {
  const isSmall = useIsSmallScreen();

  const holes = useMemo<BlackHole[]>(
    () => [
      { id: 0, x: 88, y: 75, size: 70, sizeSmall: 35 },
      { id: 1, x: 8, y: 60, size: 45, sizeSmall: 24 },
    ],
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[2]">
      {holes.map((h) => {
        const s = isSmall ? h.sizeSmall : h.size;
        return (
          <div
            key={h.id}
            className="absolute"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: s * 8,
                height: s * 8,
                left: -(s * 3.5),
                top: -(s * 3.5),
                background: `radial-gradient(circle, hsl(0 0% 0% / 0.6) 0%, hsl(0 0% 0% / 0.3) 30%, hsl(0 0% 0% / 0.1) 60%, transparent 100%)`,
              }}
            />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 3 + i,
                  height: 3 + i,
                  left: s / 2,
                  top: s / 2,
                  background: i % 2 === 0 ? "hsl(270 90% 70%)" : "hsl(200 90% 70%)",
                  boxShadow: i % 2 === 0 ? "0 0 6px hsl(270 90% 70%)" : "0 0 6px hsl(200 90% 70%)",
                }}
                animate={{
                  x: [s * 0.8 * Math.cos((i * Math.PI * 2) / 6), 0],
                  y: [s * 0.8 * Math.sin((i * Math.PI * 2) / 6), 0],
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
            <motion.div
              className="absolute rounded-full"
              style={{
                width: s * 1.8,
                height: s * 1.8,
                left: -(s * 0.4),
                top: -(s * 0.4),
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
            <motion.div
              className="absolute rounded-full"
              style={{
                width: s * 1.3,
                height: s * 1.3,
                left: -(s * 0.15),
                top: -(s * 0.15),
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
            <motion.div
              className="rounded-full"
              style={{
                width: s,
                height: s,
                background:
                  "radial-gradient(circle, hsl(0 0% 0%) 40%, hsl(0 0% 0% / 0.95) 55%, hsl(270 60% 8% / 0.7) 70%, transparent 100%)",
                boxShadow:
                  `inset 0 0 ${s * 0.4}px hsl(0 0% 0%), 0 0 ${s * 0.6}px ${s * 0.2}px hsl(0 0% 0% / 0.5)`,
              }}
              animate={{ scale: [1, 1.03, 0.98, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: s + 6,
                height: s + 6,
                left: -3,
                top: -3,
                border: "1px solid hsl(40 100% 80% / 0.15)",
                boxShadow:
                  "0 0 8px hsl(40 100% 70% / 0.1), inset 0 0 8px hsl(40 100% 70% / 0.05)",
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />
          </div>
        );
      })}
    </div>
  );
}
