export interface SceneConfig {
  id: string;
  name: string;
  icon: string;
  cursor: string;
  description: string;
  background: string;
  objectsLeft: { emoji: string; label: string }[];
  objectsRight: { emoji: string; label: string }[];
  letterColors: string[];
  particleColors: string[];
  starColor: string;
  constellationColor: string;
}

export const SCENES: SceneConfig[] = [
  {
    id: "cosmic",
    name: "Cosmic Playground",
    icon: "🌌",
    description: "The classic galaxy experience",
    background:
      "linear-gradient(135deg, hsl(225 80% 6%), hsl(230 70% 10%), hsl(240 60% 12%), hsl(220 80% 8%))",
    objectsLeft: [
      { emoji: "🪐", label: "planet" },
      { emoji: "👽", label: "alien" },
      { emoji: "⭐", label: "star" },
      { emoji: "🌍", label: "earth" },
    ],
    objectsRight: [
      { emoji: "🌈", label: "rainbow" },
      { emoji: "💫", label: "dizzy" },
      { emoji: "🎆", label: "fireworks" },
      { emoji: "🦄", label: "unicorn" },
      { emoji: "🎉", label: "party" },
      { emoji: "🌺", label: "flower" },
    ],
    letterColors: [
      "#ff6bcb", "#00e5ff", "#ffeb3b", "#76ff03", "#ff9100", "#e040fb",
      "#ff4081", "#00bcd4", "#ffc107", "#8bc34a",
    ],
    starColor: "hsl(210 80% 85%)",
    constellationColor: "hsl(210 60% 70% / 0.12)",
  },
  {
    id: "dino",
    name: "Dino Nebula",
    icon: "🦕",
    description: "Stellar dinosaurs roam the cosmos",
    background:
      "linear-gradient(135deg, hsl(280 60% 8%), hsl(300 50% 10%), hsl(330 40% 12%), hsl(260 70% 7%))",
    objectsLeft: [
      { emoji: "🦕", label: "sauropod" },
      { emoji: "🦖", label: "t-rex" },
      { emoji: "🌋", label: "volcano" },
      { emoji: "🥚", label: "egg" },
    ],
    objectsRight: [
      { emoji: "🌠", label: "shooting star" },
      { emoji: "☄️", label: "comet" },
      { emoji: "💎", label: "gem" },
      { emoji: "🔮", label: "crystal ball" },
      { emoji: "✨", label: "sparkles" },
      { emoji: "🪨", label: "rock" },
    ],
    letterColors: [
      "#ff6bcb", "#b388ff", "#ea80fc", "#ce93d8", "#f48fb1", "#e040fb",
      "#ab47bc", "#7c4dff", "#d500f9", "#ff80ab",
    ],
    starColor: "hsl(280 70% 80%)",
    constellationColor: "hsl(290 50% 60% / 0.15)",
  },
  {
    id: "saturn",
    name: "Saturn Dreams",
    icon: "🪐",
    description: "Discover life on Saturn's rings",
    background:
      "linear-gradient(135deg, hsl(35 60% 6%), hsl(40 50% 10%), hsl(30 70% 8%), hsl(45 40% 7%))",
    objectsLeft: [
      { emoji: "🪐", label: "saturn" },
      { emoji: "💫", label: "sparkle" },
      { emoji: "🛸", label: "ufo" },
      { emoji: "👾", label: "alien" },
    ],
    objectsRight: [
      { emoji: "🌙", label: "moon" },
      { emoji: "🦋", label: "butterfly" },
      { emoji: "🫧", label: "bubbles" },
      { emoji: "🎵", label: "music" },
      { emoji: "🌸", label: "blossom" },
      { emoji: "🪻", label: "lavender" },
    ],
    letterColors: [
      "#ffd54f", "#ffab40", "#ff9100", "#ffcc80", "#ffe082", "#ffc107",
      "#ffb300", "#ff8f00", "#ffca28", "#ffd740",
    ],
    starColor: "hsl(40 80% 80%)",
    constellationColor: "hsl(40 60% 60% / 0.12)",
  },
  {
    id: "starship",
    name: "Starship Sands",
    icon: "🚀",
    description: "Galactic ships cross the stellar desert",
    background:
      "linear-gradient(135deg, hsl(15 50% 7%), hsl(20 60% 10%), hsl(25 40% 12%), hsl(10 50% 6%))",
    objectsLeft: [
      { emoji: "🚀", label: "rocket" },
      { emoji: "🛸", label: "ufo" },
      { emoji: "🛰️", label: "satellite" },
      { emoji: "🌵", label: "cactus" },
    ],
    objectsRight: [
      { emoji: "🔥", label: "fire" },
      { emoji: "💥", label: "boom" },
      { emoji: "⚡", label: "lightning" },
      { emoji: "🌪️", label: "tornado" },
      { emoji: "🏜️", label: "desert" },
      { emoji: "🌅", label: "sunset" },
    ],
    letterColors: [
      "#ff7043", "#ff5722", "#ff9800", "#e64a19", "#f4511e", "#ff6e40",
      "#ff3d00", "#dd2c00", "#bf360c", "#ff8a65",
    ],
    starColor: "hsl(20 70% 75%)",
    constellationColor: "hsl(20 50% 50% / 0.12)",
  },
  {
    id: "electric",
    name: "Electric Universe",
    icon: "⚡",
    description: "A world of ions and energy",
    background:
      "linear-gradient(135deg, hsl(190 70% 5%), hsl(200 80% 8%), hsl(180 60% 10%), hsl(210 70% 6%))",
    objectsLeft: [
      { emoji: "⚡", label: "bolt" },
      { emoji: "🔋", label: "battery" },
      { emoji: "💡", label: "bulb" },
      { emoji: "⚛️", label: "atom" },
    ],
    objectsRight: [
      { emoji: "🧲", label: "magnet" },
      { emoji: "🌀", label: "spiral" },
      { emoji: "💜", label: "purple heart" },
      { emoji: "🔵", label: "blue circle" },
      { emoji: "🟣", label: "purple circle" },
      { emoji: "💠", label: "diamond" },
    ],
    letterColors: [
      "#00e5ff", "#18ffff", "#00b8d4", "#00bcd4", "#26c6da", "#4dd0e1",
      "#80deea", "#00acc1", "#0097a7", "#84ffff",
    ],
    starColor: "hsl(190 90% 80%)",
    constellationColor: "hsl(190 70% 60% / 0.15)",
  },
];

export const DEFAULT_SCENE = SCENES[0];
