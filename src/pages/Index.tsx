import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import StarField from "@/components/StarField";
import SpaceObject from "@/components/SpaceObject";
import RocketCursor from "@/components/RocketCursor";
import StartOverlay from "@/components/StartOverlay";
import { useSoundEngine } from "@/hooks/useSoundEngine";

interface SpawnedObject {
  id: string;
  x: number;
  y: number;
}

let objId = 0;

const Index = () => {
  const [started, setStarted] = useState(false);
  const [objects, setObjects] = useState<SpawnedObject[]>([]);
  const { playNote, playPop, unlock } = useSoundEngine();

  const spawnObject = useCallback(
    (clientX?: number, clientY?: number) => {
      if (!started) return;
      const x = clientX ?? Math.random() * (window.innerWidth - 100);
      const y = clientY ?? Math.random() * (window.innerHeight - 100);
      const id = `obj-${objId++}`;
      setObjects((prev) => [...prev.slice(-15), { id, x, y }]);
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

  // Key handler
  useEffect(() => {
    if (!started) return;
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      spawnObject();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [started, spawnObject]);

  // Click/touch handler on background
  const handleBgInteraction = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const p = "touches" in e ? e.touches[0] : e;
      spawnObject(p.clientX, p.clientY);
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
      onClick={handleBgInteraction}
      onTouchStart={handleBgInteraction}
    >
      <StarField />

      <AnimatePresence>
        {!started && <StartOverlay onStart={handleStart} />}
      </AnimatePresence>

      <AnimatePresence>
        {objects.map((obj) => (
          <SpaceObject
            key={obj.id}
            id={obj.id}
            x={obj.x}
            y={obj.y}
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
