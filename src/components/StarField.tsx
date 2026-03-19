import { useMemo } from "react";

const CONSTELLATIONS = [
  {
    name: "Ursa Major",
    stars: [
      { x: 18, y: 22 }, { x: 22, y: 22 }, { x: 23, y: 18 }, { x: 19, y: 18 },
      { x: 26, y: 17 }, { x: 29, y: 15 }, { x: 32, y: 14 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [4, 5], [5, 6]],
  },
  {
    name: "Ursa Minor",
    stars: [
      { x: 74, y: 16 }, { x: 77, y: 16 }, { x: 78, y: 13 }, { x: 75, y: 13 },
      { x: 73, y: 11 }, { x: 71, y: 9 }, { x: 70, y: 7 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
  },
  {
    name: "Orion",
    stars: [
      { x: 48, y: 52 }, { x: 56, y: 52 }, { x: 50, y: 58 }, { x: 52, y: 58 },
      { x: 54, y: 58 }, { x: 49, y: 65 }, { x: 56, y: 65 },
    ],
    connections: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]],
  },
];

const STAR_COUNT = 100;

interface Props {
  starColor?: string;
  constellationColor?: string;
}

export default function StarField({
  starColor = "hsl(210 80% 85%)",
  constellationColor = "hsl(210 60% 70% / 0.12)",
}: Props) {
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

      <svg className="absolute inset-0 w-full h-full">
        {CONSTELLATIONS.map((c) => (
          <g key={c.name}>
            {c.connections.map(([a, b], i) => (
              <line
                key={`${c.name}-line-${i}`}
                x1={`${c.stars[a].x}%`}
                y1={`${c.stars[a].y}%`}
                x2={`${c.stars[b].x}%`}
                y2={`${c.stars[b].y}%`}
                stroke={constellationColor}
                strokeWidth="1"
              />
            ))}
            {c.stars.map((s, i) => (
              <circle
                key={`${c.name}-star-${i}`}
                cx={`${s.x}%`}
                cy={`${s.y}%`}
                r={i === 0 ? 3 : 2}
                fill={starColor}
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
