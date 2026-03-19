import { motion } from "framer-motion";
import type { SceneConfig } from "@/config/scenes";

interface Props {
  scene: SceneConfig;
}

export default function LoadingOverlay({ scene }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0 }}
    >
      {scene.backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{ backgroundImage: `url(${scene.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-background/45 backdrop-blur-sm" />
        </>
      ) : (
        <div className="absolute inset-0 bg-background" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.18),transparent_55%)]" />

      <div className="relative flex flex-col items-center gap-4 text-center">
        <motion.div
          className="text-6xl"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {scene.icon}
        </motion.div>
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground/90">
            Loading scene
          </p>
          <p className="text-base text-foreground/80">{scene.name}</p>
        </div>
      </div>
    </motion.div>
  );
}
