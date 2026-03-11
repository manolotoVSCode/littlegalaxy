import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NameStarProps {
  name: string;
  x: string;
  y: string;
}

export default function NameStar({ name, x, y }: NameStarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute z-20 pointer-events-auto cursor-none"
      style={{ left: x, top: y }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="text-5xl select-none"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        🌟
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -top-14 whitespace-nowrap text-3xl font-black tracking-widest"
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            style={{
              color: "#ffeb3b",
              textShadow: "0 0 15px #ffeb3b, 0 0 30px #ff9100, 0 0 45px #ff610088",
            }}
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
