import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SatelliteObj {
  id: number;
  y: number;
  duration: number;
  direction: "ltr" | "rtl";
}

let satId = 0;

export default function Satellite() {
  const [satellites, setSatellites] = useState<SatelliteObj[]>([]);

  useEffect(() => {
    const spawn = () => {
      const sat: SatelliteObj = {
        id: satId++,
        y: 10 + Math.random() * 60,
        duration: 12 + Math.random() * 10,
        direction: Math.random() > 0.5 ? "ltr" : "rtl",
      };
      setSatellites((prev) => [...prev.slice(-2), sat]);
      setTimeout(() => {
        setSatellites((prev) => prev.filter((s) => s.id !== sat.id));
      }, sat.duration * 1000 + 500);
    };

    const interval = setInterval(spawn, 12000 + Math.random() * 15000);
    spawn();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      <AnimatePresence>
        {satellites.map((s) => (
          <motion.div
            key={s.id}
            className="absolute select-none"
            style={{ top: `${s.y}%`, fontSize: 80, lineHeight: 1 }}
            
            initial={{
              x: s.direction === "ltr" ? "-5vw" : "105vw",
              opacity: 0,
            }}
            animate={{
              x: s.direction === "ltr" ? "105vw" : "-5vw",
              opacity: [0, 1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: s.duration, ease: "linear" }}
          >
            🛰️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
