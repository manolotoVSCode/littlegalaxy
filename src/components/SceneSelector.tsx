import { motion } from "framer-motion";
import { SCENES, type SceneConfig } from "@/config/scenes";

interface Props {
  selected: string;
  onSelect: (scene: SceneConfig) => void;
}

export default function SceneSelector({ selected, onSelect }: Props) {
  const radius = 120; // orbit radius in px

  return (
    <div className="relative w-[280px] h-[280px] flex items-center justify-center">
      {/* Center label */}
      <motion.div
        className="absolute text-xs text-muted-foreground font-medium tracking-widest uppercase z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Choose a scene
      </motion.div>

      {/* Orbit ring */}
      <div
        className="absolute rounded-full border border-primary/15"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {/* Scene icons in a circle */}
      {SCENES.map((scene, i) => {
        const angle = (i / SCENES.length) * Math.PI * 2 - Math.PI / 2; // start from top
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isActive = scene.id === selected;

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
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(scene);
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300"
              style={{
                background: isActive
                  ? "hsl(var(--primary) / 0.3)"
                  : "hsl(var(--muted) / 0.4)",
                border: isActive
                  ? "2px solid hsl(var(--primary) / 0.7)"
                  : "1px solid hsl(var(--border) / 0.5)",
                boxShadow: isActive
                  ? "0 0 20px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.1)"
                  : "none",
              }}
            >
              {scene.icon}
            </div>
            <span
              className="text-[10px] font-semibold leading-tight text-center transition-colors duration-300 whitespace-nowrap"
              style={{
                color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
              }}
            >
              {scene.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
