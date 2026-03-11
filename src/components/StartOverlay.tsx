import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

export default function StartOverlay({ onStart }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md overflow-y-auto"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-lg mx-auto px-6 py-12 flex flex-col gap-6">
        {/* Title */}
        <div className="flex items-center gap-3">
          <span className="text-4xl">🪐</span>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Little Galaxy
          </h1>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Little Galaxy is a fullscreen website where babies and toddlers can safely smash the keyboard and see playful space animations.
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {[
            { icon: "🚀", label: "Fewer accidental app exits" },
            { icon: "⚡", label: "Instant, no setup" },
            { icon: "🖥️", label: "Touch + keyboard + mouse" },
            { icon: "🪐", label: "Space theme" },
          ].map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1.5 text-sm text-primary-foreground/80"
            >
              {badge.icon} {badge.label}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground">
          Tap anywhere to start instantly.
        </p>

        {/* CTA Button */}
        <motion.button
          onClick={onStart}
          onTouchStart={onStart}
          className="w-full rounded-xl bg-primary/20 border border-primary/30 py-4 text-lg font-bold text-foreground hover:bg-primary/30 transition-colors cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Ready? Let's explore! 🚀
        </motion.button>
      </div>
    </motion.div>
  );
}
