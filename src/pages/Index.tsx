import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import StarField from "@/components/StarField";
import ShootingStars from "@/components/ShootingStars";
import BlackHoles from "@/components/BlackHoles";
import SpaceObject from "@/components/SpaceObject";
import RocketCursor from "@/components/RocketCursor";
import StartOverlay from "@/components/StartOverlay";
import NameStar from "@/components/NameStar";
import { useSoundEngine } from "@/hooks/useSoundEngine";

interface SpawnedObject {
  id: string;
  x: number;
  y: number;
  variant: "left" | "right" | "letter";
  letter?: string;
}

let objId = 0;

const LETTER_KEYS = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]$/;

const Index = () => {
  const [started, setStarted] = useState(false);
  const [objects, setObjects] = useState<SpawnedObject[]>([]);
  const { playNote, playPop, unlock } = useSoundEngine();

  const spawnObject = useCallback(
    (variant: "left" | "right" | "letter", clientX?: number, clientY?: number, letter?: string) => {
      if (!started) return;
      const x = clientX ?? Math.random() * (window.innerWidth - 100);
      const y = clientY ?? Math.random() * (window.innerHeight - 100);
      const id = `obj-${objId++}`;
      setObjects((prev) => [...prev.slice(-15), { id, x, y, variant, letter }]);
      playNote();
    },
    [started, playNote]
  );

  const handleRemove = useCallback((id: string) => {
    setObjects((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const handleStart = useCallback(() => {
    unlock();
    setStarted(true);
  }, [unlock]);

  // Key handler — letters spawn fancy letters, others spawn objects
  useEffect(() => {
    if (!started) return;
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (LETTER_KEYS.test(e.key)) {
        spawnObject("letter", undefined, undefined, e.key);
      } else {
        spawnObject("left");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [started, spawnObject]);

  // Click handler — left vs right
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Right click handled in context menu
      spawnObject("left", e.clientX, e.clientY);
    },
    [spawnObject]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      spawnObject("right", e.clientX, e.clientY);
    },
    [spawnObject]
  );

  const handleTouch = useCallback(
    (e: React.TouchEvent) => {
      const p = e.touches[0];
      spawnObject("left", p.clientX, p.clientY);
    },
    [spawnObject]
  );

  return (
    <div
      className="fixed inset-0 animate-bg-shift overflow-hidden cursor-none"
      style={{
        background:
          "linear-gradient(135deg, hsl(220 80% 12%), hsl(270 70% 20%), hsl(300 60% 18%), hsl(240 80% 15%))",
      }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouch}
    >
      <StarField />

      <AnimatePresence>
        {!started && <StartOverlay onStart={handleStart} />}
      </AnimatePresence>

      {started && (
        <>
          <NameStar name="Roberto" x="15%" y="25%" />
          <NameStar name="Gabriela" x="75%" y="35%" />
        </>
      )}

      <AnimatePresence>
        {objects.map((obj) => (
          <SpaceObject
            key={obj.id}
            id={obj.id}
            x={obj.x}
            y={obj.y}
            variant={obj.variant}
            letter={obj.letter}
            onDone={handleRemove}
            onTap={playPop}
          />
        ))}
      </AnimatePresence>

      {started && <RocketCursor />}
    </div>
  );
};

export default Index;
