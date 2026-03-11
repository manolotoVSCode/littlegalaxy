import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FullscreenHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-border bg-card/90 backdrop-blur-sm px-6 py-3 text-sm text-muted-foreground shadow-lg"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          Press <kbd className="mx-1 rounded border border-border bg-muted px-2 py-0.5 font-mono text-xs text-foreground">ESC</kbd> to exit fullscreen
        </motion.div>
      )}
    </AnimatePresence>
  );
}
