import bgCosmic from "@/assets/bg-cosmic.jpg";
import bgDino from "@/assets/bg-dino.jpg";
import bgSaturn from "@/assets/bg-saturn.jpg";
import bgStarship from "@/assets/bg-starship.jpg";
import bgElectric from "@/assets/bg-electric.jpg";

export interface SoundConfig {
  /** Oscillator type for note playback */
  oscType: OscillatorType;
  /** Pentatonic scale frequencies */
  scale: number[];
  /** Note duration in seconds */
  noteDuration: number;
  /** Note volume (0-1) */
  noteVolume: number;
  /** Cursor oscillator type */
  cursorOscType: OscillatorType;
  /** Cursor base frequency */
  cursorBaseFreq: number;
  /** Cursor max frequency offset */
  cursorFreqRange: number;
  /** Cursor max volume */
  cursorMaxVol: number;
}

export interface SceneConfig {
  id: string;
  name: string;
  icon: string;
  cursor: string;
  cursorSize: string;
  description: string;
  backgroundImage: string;
  /** Emoji for flying ambient objects (satellite-like) */
  flyingEmoji: string;
  objectsLeft: { emoji: string; label: string }[];
  objectsRight: { emoji: string; label: string }[];
  letterColors: string[];
  particleColors: string[];
  starColor: string;
  constellationColor: string;
  showBlackHoles: boolean;
  sound: SoundConfig;
}

// C major pentatonic
const SCALE_COSMIC = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];
// A minor pentatonic (darker, primal)
const SCALE_DINO = [110.0, 130.81, 146.83, 164.81, 196.0, 220.0, 261.63, 293.66, 329.63, 392.0];
// F# major pentatonic (dreamy)
const SCALE_SATURN = [369.99, 415.3, 466.16, 554.37, 622.25, 739.99, 830.61, 932.33, 1108.73, 1244.51];
// E blues scale (punchy)
const SCALE_STARSHIP = [164.81, 196.0, 207.65, 220.0, 246.94, 329.63, 392.0, 415.3, 440.0, 493.88];
// Chromatic high (electronic)
const SCALE_ELECTRIC = [523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880.0];

export const SCENES: SceneConfig[] = [
  {
    id: "cosmic",
    name: "Cosmic Playground",
    icon: "🌌",
    cursor: "🚀",
    cursorSize: "text-6xl",
    description: "The classic galaxy experience",
    flyingEmoji: "🛰️",
    backgroundImage: bgCosmic,
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
    particleColors: [
      "#ff6bcb", "#00e5ff", "#ffeb3b", "#76ff03", "#ff9100", "#e040fb", "#ff4081", "#00bcd4",
    ],
    starColor: "hsl(210 80% 85%)",
    constellationColor: "hsl(210 60% 70% / 0.12)",
    showBlackHoles: true,
    sound: {
      oscType: "sine",
      scale: SCALE_COSMIC,
      noteDuration: 0.6,
      noteVolume: 0.3,
      cursorOscType: "sine",
      cursorBaseFreq: 180,
      cursorFreqRange: 600,
      cursorMaxVol: 0.18,
    },
  },
  {
    id: "dino",
    name: "Dino Nebula",
    icon: "🦕",
    cursor: "🦖",
    cursorSize: "text-7xl",
    description: "Stellar dinosaurs roam the cosmos",
    flyingEmoji: "☄️",
    backgroundImage: bgDino,
    objectsLeft: [
      { emoji: "🦕", label: "sauropod" },
      { emoji: "🦖", label: "t-rex" },
      { emoji: "🌋", label: "volcano" },
      { emoji: "🥚", label: "egg" },
    ],
    objectsRight: [
      { emoji: "🦴", label: "bone" },
      { emoji: "🌿", label: "fern" },
      { emoji: "🪺", label: "nest" },
      { emoji: "🐾", label: "paw" },
      { emoji: "💎", label: "gem" },
      { emoji: "🪨", label: "rock" },
    ],
    letterColors: [
      "#76ff03", "#b388ff", "#ea80fc", "#00e676", "#f48fb1", "#69f0ae",
      "#ab47bc", "#7c4dff", "#00c853", "#ff80ab",
    ],
    particleColors: [
      "#76ff03", "#00e676", "#69f0ae", "#b388ff", "#ea80fc", "#00c853", "#ab47bc", "#7c4dff",
    ],
    starColor: "hsl(280 70% 80%)",
    constellationColor: "hsl(290 50% 60% / 0.15)",
    showBlackHoles: false,
    sound: {
      oscType: "sawtooth",
      scale: SCALE_DINO,
      noteDuration: 0.4,
      noteVolume: 0.22,
      cursorOscType: "sawtooth",
      cursorBaseFreq: 50,
      cursorFreqRange: 80,
      cursorMaxVol: 0.2,
    },
  },
  {
    id: "saturn",
    name: "Saturn Dreams",
    icon: "🪐",
    cursor: "🛸",
    cursorSize: "text-7xl",
    description: "Discover life on Saturn's rings",
    flyingEmoji: "🛸",
    backgroundImage: bgSaturn,
    objectsLeft: [
      { emoji: "🛸", label: "ufo" },
      { emoji: "👾", label: "alien" },
      { emoji: "🌙", label: "moon" },
      { emoji: "✨", label: "sparkle" },
    ],
    objectsRight: [
      { emoji: "🦋", label: "butterfly" },
      { emoji: "🫧", label: "bubbles" },
      { emoji: "🎵", label: "music" },
      { emoji: "🌸", label: "blossom" },
      { emoji: "🧚", label: "fairy" },
      { emoji: "🪻", label: "lavender" },
    ],
    letterColors: [
      "#ffd54f", "#ffab40", "#ff9100", "#ffcc80", "#ffe082", "#ffc107",
      "#ffb300", "#ff8f00", "#ffca28", "#ffd740",
    ],
    particleColors: [
      "#ffd54f", "#ffab40", "#ff9100", "#ffc107", "#ffe082", "#ffb300", "#ffca28", "#ffd740",
    ],
    starColor: "hsl(40 80% 80%)",
    constellationColor: "hsl(40 60% 60% / 0.12)",
    showBlackHoles: false,
    sound: {
      oscType: "triangle",
      scale: SCALE_SATURN,
      noteDuration: 1.0,
      noteVolume: 0.25,
      cursorOscType: "triangle",
      cursorBaseFreq: 800,
      cursorFreqRange: 1200,
      cursorMaxVol: 0.12,
    },
  },
  {
    id: "starship",
    name: "Starship Sands",
    icon: "🚀",
    cursor: "💥",
    cursorSize: "text-7xl",
    description: "Galactic ships cross the stellar desert",
    flyingEmoji: "🚀",
    backgroundImage: bgStarship,
    objectsLeft: [
      { emoji: "🚀", label: "rocket" },
      { emoji: "🛸", label: "ufo" },
      { emoji: "🛰️", label: "satellite" },
      { emoji: "🌵", label: "cactus" },
    ],
    objectsRight: [
      { emoji: "🔥", label: "fire" },
      { emoji: "⚡", label: "lightning" },
      { emoji: "🌪️", label: "tornado" },
      { emoji: "🏜️", label: "desert" },
      { emoji: "🌅", label: "sunset" },
      { emoji: "🐪", label: "camel" },
    ],
    letterColors: [
      "#ff7043", "#ff5722", "#ff9800", "#e64a19", "#f4511e", "#ff6e40",
      "#ff3d00", "#dd2c00", "#bf360c", "#ff8a65",
    ],
    particleColors: [
      "#ff7043", "#ff5722", "#ff9800", "#e64a19", "#f4511e", "#ff6e40", "#ff3d00", "#ff8a65",
    ],
    starColor: "hsl(20 70% 75%)",
    constellationColor: "hsl(20 50% 50% / 0.12)",
    showBlackHoles: false,
    sound: {
      oscType: "square",
      scale: SCALE_STARSHIP,
      noteDuration: 0.3,
      noteVolume: 0.18,
      cursorOscType: "sawtooth",
      cursorBaseFreq: 120,
      cursorFreqRange: 400,
      cursorMaxVol: 0.15,
    },
  },
  {
    id: "electric",
    name: "Electric Universe",
    icon: "⚛️",
    cursor: "✦",
    cursorSize: "text-5xl",
    description: "A world of ions and energy",
    flyingEmoji: "🔬",
    backgroundImage: bgElectric,
    objectsLeft: [
      { emoji: "⚡", label: "bolt" },
      { emoji: "🔋", label: "battery" },
      { emoji: "💡", label: "bulb" },
      { emoji: "⚛️", label: "atom" },
    ],
    objectsRight: [
      { emoji: "🧲", label: "magnet" },
      { emoji: "🌀", label: "spiral" },
      { emoji: "🔮", label: "crystal" },
      { emoji: "💠", label: "diamond" },
      { emoji: "🌐", label: "globe" },
      { emoji: "🔬", label: "microscope" },
    ],
    letterColors: [
      "#00e5ff", "#18ffff", "#00b8d4", "#00bcd4", "#26c6da", "#4dd0e1",
      "#80deea", "#00acc1", "#0097a7", "#84ffff",
    ],
    particleColors: [
      "#00e5ff", "#18ffff", "#00b8d4", "#26c6da", "#4dd0e1", "#80deea", "#00acc1", "#84ffff",
    ],
    starColor: "hsl(190 90% 80%)",
    constellationColor: "hsl(190 70% 60% / 0.15)",
    showBlackHoles: false,
    sound: {
      oscType: "square",
      scale: SCALE_ELECTRIC,
      noteDuration: 0.15,
      noteVolume: 0.14,
      cursorOscType: "square",
      cursorBaseFreq: 1500,
      cursorFreqRange: 2000,
      cursorMaxVol: 0.1,
    },
  },
  {
    id: "classic",
    name: "Deep Space",
    icon: "🔭",
    cursor: "🌟",
    cursorSize: "text-6xl",
    description: "The original dark cosmos experience",
    backgroundImage: "",
    flyingEmoji: "🛰️",
    objectsLeft: [
      { emoji: "🪐", label: "planet" },
      { emoji: "🌍", label: "earth" },
      { emoji: "🌙", label: "moon" },
      { emoji: "☄️", label: "comet" },
    ],
    objectsRight: [
      { emoji: "⭐", label: "star" },
      { emoji: "💫", label: "dizzy" },
      { emoji: "✨", label: "sparkle" },
      { emoji: "🌟", label: "glow" },
      { emoji: "🛸", label: "ufo" },
      { emoji: "👽", label: "alien" },
    ],
    letterColors: [
      "#b0c4ff", "#8ecaff", "#c3a6ff", "#a0d4ff", "#d0b8ff", "#7ec8e3",
      "#9db8ff", "#b8d0ff", "#a8b4ff", "#c8d8ff",
    ],
    particleColors: [
      "#b0c4ff", "#8ecaff", "#c3a6ff", "#a0d4ff", "#d0b8ff", "#7ec8e3", "#9db8ff", "#c8d8ff",
    ],
    starColor: "hsl(220 70% 85%)",
    constellationColor: "hsl(220 50% 60% / 0.15)",
    showBlackHoles: true,
    sound: {
      oscType: "sine",
      scale: SCALE_COSMIC,
      noteDuration: 0.8,
      noteVolume: 0.25,
      cursorOscType: "sine",
      cursorBaseFreq: 300,
      cursorFreqRange: 800,
      cursorMaxVol: 0.12,
    },
  },
];

export const DEFAULT_SCENE = SCENES[0];
