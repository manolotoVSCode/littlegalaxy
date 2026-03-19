import { motion } from "framer-motion";
import { SCENES, type SceneConfig } from "@/config/scenes";

interface Props {
  onSelect: (scene: SceneConfig) => void;
}

export default function SceneSelector({ onSelect }: Props) {
  const radius = 120;

  return (
    <div className="relative w-[280px] h-[280px] flex items-center justify-center">
      {/* Center label */}
      <motion.div
        className="absolute text-xs text-muted-foreground font-medium tracking-widest uppercase z-10 text-center leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Choose a scene
        <br />
        <span className="text-[10px] text-muted-foreground/50">tap to launch</span>
      </motion.div>

      {/* Orbit ring */}
      <div
        className="absolute rounded-full border border-primary/15"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {/* Scene icons in a circle */}
      {SCENES.map((scene, i) => {
        const angle = (i / SCENES.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.button
            key={scene.id}
            type="button"
            className="absolute flex flex-col items-center gap-1 cursor-pointer z-20"
            style={{
              left: `calc(50% + ${x}px - 32px)`,
              top: `calc(50% + ${y}px - 32px)`,
              width: 64,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300, damping: 15 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.stopPropagation();
              document.documentElement.requestFullscreen?.().catch(() => {});
              onSelect(scene);
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300"
              style={{
                background: "hsl(var(--muted) / 0.4)",
                border: "1px solid hsl(var(--border) / 0.5)",
              }}
            >
              {scene.icon}
            </div>
            <span
              className="text-[10px] font-semibold leading-tight text-center transition-colors duration-300 whitespace-nowrap"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {scene.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
