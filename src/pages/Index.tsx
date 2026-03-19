import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import StarField from "@/components/StarField";
import ShootingStars from "@/components/ShootingStars";
import BlackHoles from "@/components/BlackHoles";
import Planets from "@/components/Planets";
import Nebulas from "@/components/Nebulas";
import Satellite from "@/components/Satellite";
import SpaceObject from "@/components/SpaceObject";
import RocketCursor from "@/components/RocketCursor";
import StartOverlay from "@/components/StartOverlay";
import LoadingOverlay from "@/components/LoadingOverlay";
import AppDownloadPopup from "@/components/AppDownloadPopup";
import NameStar from "@/components/NameStar";
import FullscreenHint from "@/components/FullscreenHint";
import { useSoundEngine } from "@/hooks/useSoundEngine";
import { DEFAULT_SCENE, type SceneConfig } from "@/config/scenes";

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
  const [scene, setScene] = useState<SceneConfig>(DEFAULT_SCENE);
  const [pendingScene, setPendingScene] = useState<SceneConfig | null>(null);
  const [bgLoaded, setBgLoaded] = useState<string | null>(null);
  const [isLoadingScene, setIsLoadingScene] = useState(false);
  const [objects, setObjects] = useState<SpawnedObject[]>([]);
  const { playNote, playPop, unlock } = useSoundEngine(scene.sound);
  const startedRef = useRef(false);

  useEffect(() => {
    startedRef.current = started;
  }, [started]);

  const spawnObject = useCallback(
    (variant: "left" | "right" | "letter", clientX?: number, clientY?: number, letter?: string) => {
      if (!started) return;
      const x = clientX ?? Math.random() * (window.innerWidth - 100);
      const y = clientY ?? Math.random() * (window.innerHeight - 100);
      const id = `obj-${objId++}`;
      const isSmall = window.innerWidth < 640;

      const pool = variant === "right" ? scene.objectsRight : scene.objectsLeft;
      const obj = pool[Math.floor(Math.random() * pool.length)];
      const isLetter = variant === "letter" && letter;
      const baseSize = isLetter ? 70 + Math.random() * 50 : 60 + Math.random() * 60;
      const size = isSmall ? baseSize * 0.5 : baseSize;
      const color = scene.letterColors[Math.floor(Math.random() * scene.letterColors.length)];
      const rotation = variant === "right" ? (Math.random() - 0.5) * 60 : 0;
      const floatDir = variant === "right" ? (Math.random() - 0.5) * 150 : 0;

      const newObj: SpawnedObject = {
        id,
        x,
        y,
        variant,
        letter,
        emoji: obj.emoji,
        emojiLabel: obj.label,
        color,
        size,
        rotation,
        floatDir,
      };

      setObjects((prev) => [...prev.slice(-8), newObj]);
      playNote();

      window.setTimeout(() => {
        setObjects((prev) => prev.filter((o) => o.id !== id));
      }, 5000);
    },
    [started, playNote, scene]
  );

  const handleRemove = useCallback((id: string) => {
    setObjects((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const handleReturnToSelector = useCallback(() => {
    setStarted(false);
    setPendingScene(null);
    setIsLoadingScene(false);
    setBgLoaded(null);
    setObjects([]);
  }, []);

  const revealScene = useCallback((selectedScene: SceneConfig) => {
    setScene(selectedScene);
    setBgLoaded(selectedScene.backgroundImage || null);
    setStarted(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsLoadingScene(false);
      });
    });
  }, []);

  const handleStart = useCallback((selectedScene: SceneConfig) => {
    unlock();
    setPendingScene(selectedScene);
    setIsLoadingScene(true);
    setBgLoaded(null);
    setObjects([]);

    if (!selectedScene.backgroundImage) {
      revealScene(selectedScene);
      return;
    }

    const img = new Image();
    img.src = selectedScene.backgroundImage;

    const finalize = () => revealScene(selectedScene);

    if (typeof img.decode === "function") {
      img.decode().then(finalize).catch(() => {
        if (img.complete) finalize();
        else img.onload = finalize;
      });
    } else {
      img.onload = finalize;
    }
  }, [revealScene, unlock]);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement && startedRef.current) {
        handleReturnToSelector();
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [handleReturnToSelector]);

  useEffect(() => {
    if (!started) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        } else {
          handleReturnToSelector();
        }
        return;
      }

      e.preventDefault();
      if (LETTER_KEYS.test(e.key)) {
        spawnObject("letter", undefined, undefined, e.key);
      } else {
        spawnObject("left");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [started, spawnObject, handleReturnToSelector]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
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

  const loadingBackground = isLoadingScene ? pendingScene?.backgroundImage ?? null : null;
  const activeBackground = loadingBackground || (started ? scene.backgroundImage : null);
  const showBg = !!activeBackground && (!started || loadingBackground !== null || bgLoaded === scene.backgroundImage);

  return (
    <div
      className="fixed inset-0 overflow-hidden cursor-none"
      onClick={started ? handleClick : undefined}
      onContextMenu={started ? handleContextMenu : undefined}
      onTouchStart={started ? handleTouch : undefined}
    >
      <div className="absolute inset-0 bg-background" />

      {showBg && activeBackground && (
        <div
          className="absolute inset-0 z-[0] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${activeBackground})` }}
        />
      )}

      {(started || isLoadingScene) && <div className="absolute inset-0 z-[0] bg-black/30" />}

      {started && (
        <>
          <StarField starColor={scene.starColor} constellationColor={scene.constellationColor} />
          <Nebulas />
          <ShootingStars />
          {scene.showBlackHoles && <BlackHoles />}
          <Planets />
          <Satellite emoji={scene.flyingEmoji} />
        </>
      )}

      <AnimatePresence>
        {!started && !isLoadingScene && <StartOverlay onStart={handleStart} />}
      </AnimatePresence>

      <AnimatePresence>
        {isLoadingScene && pendingScene && <LoadingOverlay scene={pendingScene} />}
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

      {started && (
        <RocketCursor
          cursorEmoji={scene.cursor}
          cursorSize={scene.cursorSize}
          particleColors={scene.particleColors}
          soundConfig={scene.sound}
        />
      )}
    </div>
  );
};

export default Index;
