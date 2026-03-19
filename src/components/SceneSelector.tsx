import { motion } from "framer-motion";
import { SCENES, type SceneConfig } from "@/config/scenes";

interface Props {
  onSelect: (scene: SceneConfig) => void;
}

export default function SceneSelector({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-lg font-bold tracking-wide" style={{
          background: "linear-gradient(135deg, hsl(200 100% 70%), hsl(320 100% 70%))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          ✨ Choose your adventure ✨
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">Tap a world to explore</p>
      </motion.div>

      {/* Scene cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md">
        {SCENES.map((scene, i) => (
          <motion.button
            key={scene.id}
            type="button"
            className="relative group flex flex-col items-center gap-2 rounded-2xl p-4 cursor-pointer overflow-hidden"
            style={{
              background: "hsl(var(--card) / 0.6)",
              border: "1px solid hsl(var(--border) / 0.3)",
              backdropFilter: "blur(8px)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 300, damping: 18 }}
            whileHover={{ scale: 1.08, borderColor: "hsl(var(--primary) / 0.6)" }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              document.documentElement.requestFullscreen?.().catch(() => {});
              onSelect(scene);
            }}
          >
            {/* Glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              style={{
                background: "radial-gradient(circle at center, hsl(var(--primary) / 0.15), transparent 70%)",
              }}
            />
            
            <motion.span
              className="text-4xl z-10"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {scene.icon}
            </motion.span>
            <span className="text-xs font-semibold text-foreground/90 z-10 leading-tight text-center">
              {scene.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
