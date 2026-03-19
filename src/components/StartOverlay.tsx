import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Capacitor } from "@capacitor/core";
import saturnLogo from "@/assets/saturn-logo.png";
import qrAppStore from "@/assets/qr-appstore.png";
import ParentalGate from "@/components/ParentalGate";
import SceneSelector from "@/components/SceneSelector";
import { type SceneConfig } from "@/config/scenes";

interface Props {
  onStart: (scene: SceneConfig) => void;
}

export default function StartOverlay({ onStart }: Props) {
  const [showGate, setShowGate] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto bg-background cursor-default"
      style={{ touchAction: "pan-y" }}
      onClick={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      exit={{ opacity: 0 }}
      transition={{ duration: 0 }}
    >
      <div
        className="mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col items-center justify-start gap-6 px-5 pt-4 pb-10 text-center md:justify-center md:gap-8 md:px-6 md:py-12"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 1rem)",
          paddingBottom: "max(env(safe-area-inset-bottom), 2.5rem)",
        }}
      >
        {/* Saturn + title */}
        <div className="flex flex-col items-center gap-3">
          <motion.img
            src={saturnLogo}
            alt="Saturn"
            className="h-36 w-36 sm:h-44 sm:w-44 shrink-0"
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
        </div>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Blast off into a magical, interactive space adventure! A sensory experience designed specifically for toddlers. Tap, play, and create vibrant planets with every click while enjoying celestial melodies. A safe, fun, and visually stunning cosmic playground for little explorers.
        </motion.p>

        {/* Scene Selector — tap to launch directly */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SceneSelector onSelect={onStart} />
        </motion.div>

        {/* Donate Button */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button
            type="button"
            onClick={() => setShowGate(true)}
            className="inline-flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/10 px-6 py-3 text-base font-semibold text-accent-foreground hover:bg-accent/20 hover:border-accent/50 transition-all cursor-pointer"
            style={{
              boxShadow: "0 0 20px hsl(320 90% 60% / 0.15)",
            }}
          >
            <span className="text-2xl">☕</span>
            <span>Support this project — Buy me a coffee</span>
          </button>
          <span className="text-xs text-muted-foreground/50">via PayPal · every little bit helps ❤️</span>
        </motion.div>

        {/* App Store QR — desktop only */}
        <motion.div
          className="hidden md:flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
            <p className="text-xs text-muted-foreground/70 uppercase tracking-widest">Download on iPhone & iPad</p>
            <img
              src="/qr-appstore.png"
              alt="Download Little Galaxy on the App Store"
              className="w-24 h-24 rounded-lg opacity-90"
            />
            <p className="text-xs text-muted-foreground/50">Scan with your iPhone camera</p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-4 text-xs text-muted-foreground/60 max-w-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          A personal project by Manuel de la Torre, dedicated with all the love in the world to my children, Roberto and Gabriela. Created with the hope that any boy or girl can enjoy a magical moment on screen, while giving parents a little &lsquo;creative chaos&rsquo; on their computers.
        </motion.footer>

        {/* App Store */}
        <motion.div
          className="flex flex-col items-center gap-3 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <a
            href="https://apps.apple.com/app/id6760791741"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 px-6 py-3 text-base font-semibold text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all"
            style={{
              boxShadow: "0 0 20px hsl(270 80% 60% / 0.15)",
            }}
          >
            <span className="text-2xl"></span>
            <span>Download on the App Store</span>
          </a>
          <img
            src={qrAppStore}
            alt="QR code to download on the App Store"
            className="w-28 h-28 rounded-lg border border-primary/20"
          />
          <span className="text-xs text-muted-foreground/50">Scan to download on iPhone & iPad</span>
        </motion.div>
      </div>
      <AnimatePresence>
        {showGate && (
          <ParentalGate
            onSuccess={() => {
              setShowGate(false);
              window.open("https://paypal.me/manoloto77", "_blank", "noopener,noreferrer");
            }}
            onCancel={() => setShowGate(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
