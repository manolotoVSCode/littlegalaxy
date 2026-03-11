import { motion } from "framer-motion";

const PLANETS = [
  { emoji: "🪐", x: 5, y: 12, size: 48, duration: 18 },
  { emoji: "🌍", x: 82, y: 68, size: 36, duration: 22 },
  { emoji: "🌕", x: 92, y: 15, size: 30, duration: 15 },
  { emoji: "🔴", x: 12, y: 78, size: 28, duration: 20 },
];

export default function Planets() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {PLANETS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            lineHeight: 1,
          }}
          animate={{
            y: [0, -12, 0, 12, 0],
            x: [0, 6, 0, -6, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
