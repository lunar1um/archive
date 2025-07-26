import { useEffect, useRef } from "react";

export function ParticleEffect({ emit }) {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (emit && containerRef.current) {
      intervalRef.current = setInterval(createNote, 1000);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current);
  }, [emit]);

  const createNote = () => {
    const note = document.createElement("div");
    note.className = "music-note";
    note.textContent = "🎵";
    note.style.left = `${Math.random() * 80 + 10}%`;
    note.style.fontSize = `${Math.random() * 8 + 12}px`;

    containerRef.current.appendChild(note);

    setTimeout(() => note.remove(), 1200);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
    ></div>
  );
}
