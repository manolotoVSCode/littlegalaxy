import { motion } from "framer-motion";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import nebula1 from "@/assets/nebula-1.png";
import nebula2 from "@/assets/nebula-2.png";

const NEBULAS = [
  { img: nebula1, x: 60, y: 10, size: 500, sizeSmall: 250, opacity: 0.18, duration: 30 },
  { img: nebula2, x: -5, y: 55, size: 450, sizeSmall: 220, opacity: 0.15, duration: 35 },
];

export default function Nebulas() {
  const isSmall = useIsSmallScreen();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {NEBULAS.map((n, i) => {
        const s = isSmall ? n.sizeSmall : n.size;
        return (
          <motion.img
            key={i}
            src={n.img}
            alt=""
            className="absolute select-none"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              width: s,
              height: "auto",
              opacity: n.opacity,
              filter: "blur(2px)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [n.opacity, n.opacity * 1.3, n.opacity],
            }}
            transition={{
              duration: n.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
