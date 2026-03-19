import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import qrAppStore from "@/assets/qr-appstore.png";

const POPUP_DELAY_MS = 3 * 60 * 1000; // 3 minutes

interface Props {
  /** Changes when the user enters a new scene, restarting the timer */
  sceneId: string;
  started: boolean;
}

export default function AppDownloadPopup({ sceneId, started }: Props) {
  const [visible, setVisible] = useState(false);
  const dismissed = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Reset on scene change
    dismissed.current = false;
    setVisible(false);

    if (!started) return;

    timerRef.current = setTimeout(() => {
      if (!dismissed.current) setVisible(true);
    }, POPUP_DELAY_MS);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [sceneId, started]);

  const handleContinue = () => {
    dismissed.current = true;
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center cursor-default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Card */}
          <motion.div
            className="relative mx-4 max-w-sm w-full rounded-3xl overflow-hidden"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border) / 0.4)",
              boxShadow: "0 25px 60px -12px rgba(0,0,0,0.6)",
            }}
            initial={{ scale: 0.85, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            {/* Glow header */}
            <div
              className="h-2"
              style={{
                background: "linear-gradient(90deg, hsl(200 100% 60%), hsl(270 90% 65%), hsl(320 100% 60%))",
              }}
            />

            <div className="flex flex-col items-center gap-5 px-6 pt-6 pb-7 text-center">
              {/* Icon */}
              <motion.div
                className="text-5xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                🚀
              </motion.div>

              {/* Title */}
              <div className="space-y-2">
                <h2
                  className="text-xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, hsl(200 100% 70%), hsl(320 100% 70%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Take Little Galaxy everywhere!
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Download the app for offline access — play anytime, anywhere, no internet needed.
                </p>
              </div>

              {/* App Store button */}
              <a
                href="https://apps.apple.com/app/id6760791741"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-semibold text-foreground transition-all hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, hsl(270 60% 50%), hsl(320 80% 50%))",
                  color: "white",
                  boxShadow: "0 4px 20px hsl(290 80% 50% / 0.3)",
                }}
              >
                <span className="text-xl"></span>
                Download on the App Store
              </a>

              {/* QR */}
              <div className="flex flex-col items-center gap-1.5">
                <img
                  src={qrAppStore}
                  alt="QR code to download on the App Store"
                  className="w-20 h-20 rounded-lg border border-border/30"
                />
                <span className="text-[10px] text-muted-foreground/50">Scan to download</span>
              </div>

              {/* Continue button */}
              <button
                type="button"
                onClick={handleContinue}
                className="text-sm text-muted-foreground/70 hover:text-foreground/90 transition-colors underline underline-offset-2 cursor-pointer"
              >
                Continue with free web version
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
