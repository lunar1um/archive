import { useEffect, useState } from "react";

let idCounter = 0;
const shootingStarColors = ["#F2C185", "#8CB7B8", "#F2A057", "#8CB7B8"];

export function ShootingStar() {
  const MAX_STARS = 8;
  const VIEWBOX_WIDTH = 800;
  const VIEWBOX_HEIGHT = 800;

  const [stars, setStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stars.length < MAX_STARS && Math.random() < 0.7) {
        const length = 120 + Math.random() * 100;
        const arcOffset = Math.random() * 60 - 30;

        const newStar = {
          id: idCounter++,
          x: Math.random() * VIEWBOX_WIDTH,
          y: Math.random() * VIEWBOX_HEIGHT,
          arcOffset,
          length,
          color:
            shootingStarColors[
              Math.floor(Math.random() * shootingStarColors.length)
            ],
        };

        setStars((prev) => [...prev, newStar]);

        setTimeout(() => {
          setStars((prev) => prev.filter((s) => s.id !== newStar.id));
        }, 700);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [stars]);

  return (
    <>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="4"
            floodColor="#fff"
            floodOpacity="0.5"
          />
        </filter>
      </defs>

      {stars.map((star) => (
        <g
          key={star.id}
          transform={`translate(${star.x}, ${star.y})`}
          style={{ opacity: 1, animation: "fadeOut 0.7s ease-out forwards" }}
        >
          <path
            d={`M 0 0 q ${star.length / 2 + star.arcOffset} ${star.length / 2 - star.arcOffset} ${star.length} ${star.length}`}
            stroke={star.color}
            fill="transparent"
            strokeDasharray="300"
            strokeDashoffset="300"
            strokeWidth="2"
            strokeLinecap="round"
            className="shootingStar"
            filter="url(#glow)"
          />
        </g>
      ))}
    </>
  );
}
