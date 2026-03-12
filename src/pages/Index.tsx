import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import StarField from "@/components/StarField";
import ShootingStars from "@/components/ShootingStars";
import BlackHoles from "@/components/BlackHoles";
import Planets from "@/components/Planets";
import Nebulas from "@/components/Nebulas";
import Satellite from "@/components/Satellite";
import SpaceObject, { OBJECTS_LEFT, OBJECTS_RIGHT, LETTER_COLORS } from "@/components/SpaceObject";
import RocketCursor from "@/components/RocketCursor";
import StartOverlay from "@/components/StartOverlay";
import NameStar from "@/components/NameStar";
import FullscreenHint from "@/components/FullscreenHint";
import { useSoundEngine } from "@/hooks/useSoundEngine";

interface SpawnedObject {
  id: string;
  x: number;
  y: number;
  variant: "left" | "right" | "letter";
  letter?: string;
  emoji?: string;
  emojiLabel?: string;
  color?: string;
  size: number;
  rotation: number;
  floatDir: number;
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
      const isSmall = window.innerWidth < 640;
      const isLetter = variant === "letter" && letter;

      // Pre-compute random values so they don't change on re-render
      const pool = variant === "right" ? OBJECTS_RIGHT : OBJECTS_LEFT;
      const obj = pool[Math.floor(Math.random() * pool.length)];
      const baseSize = isLetter ? 70 + Math.random() * 50 : 60 + Math.random() * 60;
      const size = isSmall ? baseSize * 0.5 : baseSize;
      const color = LETTER_COLORS[Math.floor(Math.random() * LETTER_COLORS.length)];
      const rotation = variant === "right" ? (Math.random() - 0.5) * 60 : 0;
      const floatDir = variant === "right" ? (Math.random() - 0.5) * 150 : 0;

      const newObj: SpawnedObject = {
        id, x, y, variant, letter,
        emoji: obj.emoji, emojiLabel: obj.label,
        color, size, rotation, floatDir,
      };

      setObjects((prev) => [...prev.slice(-8), newObj]);
      playNote();

      // Auto-remove after 5s to prevent accumulation
      setTimeout(() => {
        setObjects((prev) => prev.filter((o) => o.id !== id));
      }, 5000);
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
          "linear-gradient(135deg, hsl(225 80% 6%), hsl(230 70% 10%), hsl(240 60% 12%), hsl(220 80% 8%))",
      }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouch}
    >
      <StarField />
      <Nebulas />
      <ShootingStars />
      <BlackHoles />
      <Planets />
      <Satellite />

      <AnimatePresence>
        {!started && <StartOverlay onStart={handleStart} />}
      </AnimatePresence>

      {started && (
        <>
          <FullscreenHint />
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
            emoji={obj.emoji}
            emojiLabel={obj.emojiLabel}
            color={obj.color}
            size={obj.size}
            rotation={obj.rotation}
            floatDir={obj.floatDir}
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
