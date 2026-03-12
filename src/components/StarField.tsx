import { useMemo } from "react";

// Constellations defined as arrays of {x, y} percentage positions + connections
const CONSTELLATIONS = [
  {
    // Big Dipper (Ursa Major) — proper bowl + handle shape
    name: "Ursa Major",
    stars: [
      { x: 18, y: 22 },  // bowl bottom-left
      { x: 22, y: 22 },  // bowl bottom-right
      { x: 23, y: 18 },  // bowl top-right
      { x: 19, y: 18 },  // bowl top-left
      { x: 26, y: 17 },  // handle 1
      { x: 29, y: 15 },  // handle 2
      { x: 32, y: 14 },  // handle 3
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 0], // bowl
      [2, 4], [4, 5], [5, 6],         // handle
    ],
  },
  {
    // Little Dipper (Ursa Minor) — smaller bowl + handle, Polaris at tip
    name: "Ursa Minor",
    stars: [
      { x: 74, y: 16 },  // bowl bottom-left
      { x: 77, y: 16 },  // bowl bottom-right
      { x: 78, y: 13 },  // bowl top-right
      { x: 75, y: 13 },  // bowl top-left
      { x: 73, y: 11 },  // handle 1
      { x: 71, y: 9 },   // handle 2
      { x: 70, y: 7 },   // Polaris
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 0], // bowl
      [3, 4], [4, 5], [5, 6],         // handle to Polaris
    ],
  },
  {
    // Orion — shoulders, belt, feet
    name: "Orion",
    stars: [
      { x: 48, y: 52 },  // left shoulder (Betelgeuse)
      { x: 56, y: 52 },  // right shoulder (Bellatrix)
      { x: 50, y: 58 },  // belt left (Alnitak)
      { x: 52, y: 58 },  // belt center (Alnilam)
      { x: 54, y: 58 },  // belt right (Mintaka)
      { x: 49, y: 65 },  // left foot (Saiph)
      { x: 56, y: 65 },  // right foot (Rigel)
    ],
    connections: [
      [0, 1],             // shoulders
      [0, 2],             // left shoulder to belt
      [1, 4],             // right shoulder to belt
      [2, 3], [3, 4],     // belt
      [2, 5],             // belt to left foot
      [4, 6],             // belt to right foot
    ],
  },
];

const STAR_COUNT = 100;

export default function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        pulse: Math.random() > 0.6,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Random stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className={`absolute rounded-full bg-foreground ${s.pulse ? "animate-twinkle" : ""}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.pulse ? undefined : 0.4 + Math.random() * 0.4,
            "--twinkle-duration": `${s.duration}s`,
            "--twinkle-delay": `${s.delay}s`,
            boxShadow: s.size > 2.5 ? `0 0 ${s.size * 2}px hsl(200 80% 80% / 0.4)` : undefined,
          } as React.CSSProperties}
        />
      ))}

      {/* Constellations */}
      <svg className="absolute inset-0 w-full h-full">
        {CONSTELLATIONS.map((c) => (
          <g key={c.name}>
            {/* Connection lines */}
            {c.connections.map(([a, b], i) => (
              <line
                key={`${c.name}-line-${i}`}
                x1={`${c.stars[a].x}%`}
                y1={`${c.stars[a].y}%`}
                x2={`${c.stars[b].x}%`}
                y2={`${c.stars[b].y}%`}
                stroke="hsl(210 60% 70% / 0.12)"
                strokeWidth="1"
              />
            ))}
            {/* Constellation stars — brighter */}
            {c.stars.map((s, i) => (
              <circle
                key={`${c.name}-star-${i}`}
                cx={`${s.x}%`}
                cy={`${s.y}%`}
                r={i === 0 ? 3 : 2}
                fill="hsl(210 80% 85%)"
                className="animate-twinkle"
                style={{
                  "--twinkle-duration": `${2.5 + Math.random() * 2}s`,
                  "--twinkle-delay": `${Math.random() * 3}s`,
                } as React.CSSProperties}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
