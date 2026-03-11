import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

export default function StartOverlay({ onStart }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm cursor-pointer"
      onClick={onStart}
      onTouchStart={onStart}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="text-8xl mb-8"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        🔊
      </motion.div>
      <motion.div
        className="text-5xl md:text-7xl font-black text-primary tracking-wider"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ¡TOCA PARA JUGAR!
      </motion.div>
      <div className="text-4xl mt-6 flex gap-4">
        🪐 ⭐ 👽 🚀
      </div>
    </motion.div>
  );
}
