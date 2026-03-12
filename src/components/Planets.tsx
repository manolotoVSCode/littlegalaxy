import { motion } from "framer-motion";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";

const PLANETS = [
  { emoji: "🪐", x: 5, y: 12, size: 80, sizeSmall: 40, duration: 40 },
  { emoji: "🌕", x: 92, y: 15, size: 30, sizeSmall: 18, duration: 35 },
  { emoji: "🔴", x: 12, y: 78, size: 28, sizeSmall: 16, duration: 38 },
];

export default function Planets() {
  const isSmall = useIsSmallScreen();

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {PLANETS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: isSmall ? p.sizeSmall : p.size,
            lineHeight: 1,
          }}
          animate={{
            y: [0, -6, 0, 6, 0],
            x: [0, 3, 0, -3, 0],
            rotate: [0, 2, 0, -2, 0],
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
