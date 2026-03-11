import { motion } from "framer-motion";

const OBJECTS = [
  { emoji: "🪐", label: "planet" },
  { emoji: "👽", label: "alien" },
  { emoji: "⭐", label: "star" },
  { emoji: "🌍", label: "earth" },
  { emoji: "🌙", label: "moon" },
  { emoji: "🚀", label: "rocket" },
  { emoji: "🛸", label: "ufo" },
  { emoji: "☄️", label: "comet" },
];

interface Props {
  x: number;
  y: number;
  id: string;
  onDone: (id: string) => void;
  onTap: () => void;
}

export default function SpaceObject({ x, y, id, onDone, onTap }: Props) {
  const obj = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
  const size = 60 + Math.random() * 60;

  return (
    <motion.div
      className="absolute pointer-events-auto cursor-none select-none animate-breathe"
      style={{ left: x, top: y, fontSize: size, lineHeight: 1, zIndex: 10 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: -200 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        scale: { type: "spring", stiffness: 300, damping: 12 },
        opacity: { duration: 0.3 },
        y: { duration: 3, ease: "easeOut" },
      }}
      onAnimationComplete={() => onDone(id)}
      onTap={onTap}
      aria-label={obj.label}
    >
      {obj.emoji}
    </motion.div>
  );
}
