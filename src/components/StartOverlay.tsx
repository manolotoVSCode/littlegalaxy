import { motion } from "framer-motion";
import saturnLogo from "@/assets/saturn-logo.png";

interface Props {
  onStart: () => void;
}

export default function StartOverlay({ onStart }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto bg-background/95 backdrop-blur-md cursor-default"
      style={{ touchAction: "pan-y" }}
      onClick={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col items-center justify-start gap-6 px-5 pt-4 pb-10 text-center md:justify-center md:gap-8 md:px-6 md:py-12"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 1rem)",
          paddingBottom: "max(env(safe-area-inset-bottom), 2.5rem)",
        }}
      >
        {/* Title */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.img
            src={saturnLogo}
            alt="Saturn"
            className="h-14 w-14 shrink-0 sm:h-16 sm:w-16 md:h-40 md:w-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <h1
            className="text-5xl md:text-7xl font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, hsl(200 100% 70%), hsl(270 90% 75%), hsl(320 100% 70%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Little Galaxy
          </h1>
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            A cosmic playground for little explorers
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Blast off into a magical, interactive space adventure! A sensory experience designed specifically for toddlers. Tap, play, and create vibrant planets with every click while enjoying celestial melodies. A safe, fun, and visually stunning cosmic playground for little explorers.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          type="button"
          onClick={() => {
            document.documentElement.requestFullscreen?.().catch(() => {});
            onStart();
          }}
          className="w-full max-w-sm rounded-2xl bg-primary/20 border border-primary/30 py-5 text-xl font-bold text-foreground hover:bg-primary/30 transition-colors cursor-pointer"
          style={{
            boxShadow: "0 0 30px hsl(270 80% 60% / 0.2), 0 0 60px hsl(270 80% 60% / 0.1)",
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Ready? Let's explore! 🚀
        </motion.button>

        {/* Donate Button — prominent */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a
            href="https://paypal.me/manoloto77"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/10 px-6 py-3 text-base font-semibold text-accent-foreground hover:bg-accent/20 hover:border-accent/50 transition-all"
            style={{
              boxShadow: "0 0 20px hsl(320 90% 60% / 0.15)",
            }}
          >
            <span className="text-2xl">☕</span>
            <span>Support this project — Buy me a coffee</span>
          </a>
          <span className="text-xs text-muted-foreground/50">via PayPal · every little bit helps ❤️</span>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-4 text-xs text-muted-foreground/60 max-w-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          A personal project by Manuel de la Torre, dedicated with all the love in the world to my children, Roberto and Gabriela. Created with the hope that any boy or girl can enjoy a magical moment on screen, while giving parents a little &lsquo;creative chaos&rsquo; on their computers.
        </motion.footer>
      </div>
    </motion.div>
  );
}
