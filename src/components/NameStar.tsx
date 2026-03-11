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
        className="text-2xl select-none opacity-60"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        🌟
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap text-xl font-bold tracking-widest"
            initial={{ opacity: 0, y: 6, scale: 0.7 }}
            animate={{ opacity: 0.85, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            style={{
              color: "#ffeb3bcc",
              textShadow: "0 0 8px #ffeb3b66, 0 0 16px #ff910044",
            }}
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
