import { useMemo } from "react";

// Constellations defined as arrays of {x, y} percentage positions + connections
const CONSTELLATIONS = [
  {
    name: "Ursa Major",
    stars: [
      { x: 18, y: 20 },
      { x: 21, y: 18 },
      { x: 25, y: 17 },
      { x: 28, y: 19 },
      { x: 27, y: 23 },
      { x: 30, y: 26 },
      { x: 24, y: 25 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [6, 0],
    ],
  },
  {
    name: "Ursa Minor",
    stars: [
      { x: 72, y: 8 },
      { x: 74, y: 11 },
      { x: 76, y: 14 },
      { x: 78, y: 13 },
      { x: 79, y: 16 },
      { x: 77, y: 18 },
      { x: 74, y: 17 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 2],
    ],
  },
  {
    name: "Orion",
    stars: [
      { x: 50, y: 55 },
      { x: 54, y: 55 },
      { x: 52, y: 60 },
      { x: 51, y: 63 },
      { x: 53, y: 63 },
      { x: 49, y: 67 },
      { x: 55, y: 67 },
      { x: 52, y: 57 },
    ],
    connections: [
      [0, 7], [1, 7], [7, 2], [2, 3], [2, 4], [3, 5], [4, 6],
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
