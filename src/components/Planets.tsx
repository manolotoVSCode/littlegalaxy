import { motion } from "framer-motion";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import saturnImg from "@/assets/saturn-logo.png";
import moonImg from "@/assets/planet-moon.png";
import marsImg from "@/assets/planet-mars.png";

const PLANETS = [
  { img: saturnImg, alt: "Saturn", x: 5, y: 12, size: 80, sizeSmall: 40, duration: 40 },
  { img: moonImg, alt: "Moon", x: 92, y: 15, size: 40, sizeSmall: 22, duration: 35 },
  { img: marsImg, alt: "Mars", x: 12, y: 78, size: 36, sizeSmall: 20, duration: 38 },
];

export default function Planets() {
  const isSmall = useIsSmallScreen();

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {PLANETS.map((p, i) => {
        const s = isSmall ? p.sizeSmall : p.size;
        return (
          <motion.img
            key={i}
            src={p.img}
            alt={p.alt}
            className="absolute select-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: s,
              height: s,
            }}
            animate={{
              y: [0, -6, 0, 6, 0],
              x: [0, 3, 0, -3, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
