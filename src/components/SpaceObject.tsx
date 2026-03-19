import { motion } from "framer-motion";

interface Props {
  x: number;
  y: number;
  id: string;
  variant: "left" | "right" | "letter";
  letter?: string;
  emoji?: string;
  emojiLabel?: string;
  color?: string;
  size: number;
  rotation: number;
  floatDir: number;
  onDone: (id: string) => void;
  onTap: () => void;
}

export default function SpaceObject({
  x, y, id, variant, letter,
  emoji, emojiLabel, color, size, rotation, floatDir,
  onDone, onTap,
}: Props) {
  const isLetter = variant === "letter" && letter;

  return (
    <motion.div
      className="absolute pointer-events-auto cursor-none select-none"
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
        opacity: [0, 1, 1, 0],
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
        opacity: { duration: 4.5, times: [0, 0.1, 0.7, 1] },
        y: { duration: 5, ease: "easeOut" },
        x: { duration: 5, ease: "easeOut" },
        rotate: { type: "spring", stiffness: 100, damping: 10 },
      }}
      onTap={onTap}
      aria-label={isLetter ? letter : emojiLabel}
    >
      {isLetter ? letter!.toUpperCase() : emoji}
    </motion.div>
  );
}
