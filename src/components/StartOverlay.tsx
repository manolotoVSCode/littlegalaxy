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
      <div className="w-full max-w-2xl mx-auto px-6 py-12 flex flex-col gap-8 items-center text-center">
        {/* Title */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-6xl md:text-7xl">🌌</span>
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
          onClick={() => {
            document.documentElement.requestFullscreen?.().catch(() => {});
            onStart();
          }}
          onTouchStart={() => {
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

        {/* Donate Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <a
            href="https://www.paypal.com/donate/?business=YOUR_PAYPAL_EMAIL&currency_code=EUR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            ☕ Buy me a coffee via PayPal
          </a>
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
