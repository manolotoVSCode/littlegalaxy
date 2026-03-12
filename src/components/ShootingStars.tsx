import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  duration: number;
}

let sid = 0;

export default function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const spawn = () => {
      const star: ShootingStar = {
        id: sid++,
        x: Math.random() * 80 + 10,
        y: Math.random() * 40,
        angle: 25 + Math.random() * 20,
        duration: 1.5 + Math.random() * 1.0,
      };
      setStars((prev) => [...prev.slice(-3), star]);
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== star.id));
      }, star.duration * 1000 + 200);
    };

    const interval = setInterval(spawn, 3000 + Math.random() * 4000);
    spawn();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      <AnimatePresence>
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              rotate: `${s.angle}deg`,
            }}
            initial={{ opacity: 1, scaleX: 0 }}
            animate={{ opacity: [1, 1, 0], scaleX: 1, x: 300, y: 180 }}
            exit={{ opacity: 0 }}
            transition={{ duration: s.duration, ease: "easeIn" }}
          >
            <div
              className="h-[2px] rounded-full"
              style={{
                width: 80 + Math.random() * 60,
                background:
                  "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.9), hsl(0 0% 100% / 0.3))",
                boxShadow: "0 0 8px hsl(0 0% 100% / 0.6), 0 0 20px hsl(180 100% 55% / 0.3)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
