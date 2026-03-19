import { motion } from "framer-motion";
import type { SceneConfig } from "@/config/scenes";

interface Props {
  scene: SceneConfig;
}

export default function LoadingOverlay({ scene }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
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
          <p className="text-base text-muted-foreground">{scene.name}</p>
        </div>
        <motion.div
          className="h-1.5 w-40 overflow-hidden rounded-full bg-muted"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        >
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
