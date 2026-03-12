import { motion } from "framer-motion";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";

const OBJECTS_LEFT = [
  { emoji: "🪐", label: "planet" },
  { emoji: "👽", label: "alien" },
  { emoji: "⭐", label: "star" },
  { emoji: "🌍", label: "earth" },
];

const OBJECTS_RIGHT = [
  { emoji: "🌈", label: "rainbow" },
  { emoji: "💫", label: "dizzy" },
  { emoji: "🎆", label: "fireworks" },
  { emoji: "🦄", label: "unicorn" },
  { emoji: "🎉", label: "party" },
  { emoji: "🌺", label: "flower" },
];

// Fancy letter styles
const LETTER_COLORS = [
  "#ff6bcb", "#00e5ff", "#ffeb3b", "#76ff03", "#ff9100", "#e040fb",
  "#ff4081", "#00bcd4", "#ffc107", "#8bc34a",
];

interface Props {
  x: number;
  y: number;
  id: string;
  variant: "left" | "right" | "letter";
  letter?: string;
  onDone: (id: string) => void;
  onTap: () => void;
}

export default function SpaceObject({ x, y, id, variant, letter, onDone, onTap }: Props) {
  const isSmall = useIsSmallScreen();
  const isLetter = variant === "letter" && letter;

  const obj = variant === "right"
    ? OBJECTS_RIGHT[Math.floor(Math.random() * OBJECTS_RIGHT.length)]
    : OBJECTS_LEFT[Math.floor(Math.random() * OBJECTS_LEFT.length)];

  const baseSize = isLetter ? 70 + Math.random() * 50 : 60 + Math.random() * 60;
  const size = isSmall ? baseSize * 0.5 : baseSize;
  const color = LETTER_COLORS[Math.floor(Math.random() * LETTER_COLORS.length)];
  const rotation = variant === "right" ? (Math.random() - 0.5) * 60 : 0;
  const floatDir = variant === "right" ? (Math.random() - 0.5) * 150 : 0;

  return (
    <motion.div
      className="absolute pointer-events-auto cursor-none select-none animate-breathe"
      style={{
        left: x,
        top: y,
        fontSize: size,
        lineHeight: 1,
        zIndex: 10,
        ...(isLetter ? {
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontWeight: 900,
          color,
          textShadow: `0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color}88`,
          WebkitTextStroke: `1px ${color}44`,
        } : {}),
      }}
      initial={{
        scale: 0,
        opacity: 0,
        rotate: variant === "right" ? 180 : 0,
      }}
      animate={{
        scale: [0, 1.3, 1],
        opacity: 1,
        y: -200,
        x: floatDir,
        rotate: rotation,
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        scale: {
          type: "spring",
          stiffness: variant === "right" ? 500 : 300,
          damping: variant === "right" ? 8 : 12,
        },
        opacity: { duration: 0.3 },
        y: { duration: 5, ease: "easeOut" },
        x: { duration: 5, ease: "easeOut" },
        rotate: { type: "spring", stiffness: 100, damping: 10 },
      }}
      onAnimationComplete={() => onDone(id)}
      onTap={onTap}
      aria-label={isLetter ? letter : obj.label}
    >
      {isLetter ? letter.toUpperCase() : obj.emoji}
    </motion.div>
  );
}
