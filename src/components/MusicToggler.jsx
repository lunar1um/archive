import { useState, useRef } from "react";
import { Icon } from "./IconRender";
import { ParticleEffect } from "./ParticleEffect";

export function MusicToggler() {
  const [running, setRunning] = useState(false);
  const audioRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMusic = () => {
    new Audio("/assets/click.wav").play();

    buttonRef.current.classList.add("animate-squish");

    setTimeout(() => {
      buttonRef.current.classList.remove("animate-squish");
    }, 300);

    if (!audioRef.current) {
      audioRef.current = new Audio("/assets/bg-music.mp3");
      audioRef.current.loop = true;
    }

    if (running) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }

    setRunning(!running);
  };

  return (
    <div className="absolute top-4 left-4 z-3 opacity-0 [animation-delay:4500ms] animate-slide-in-left">
      <button
        onClick={toggleMusic}
        className="relative w-10 h-10 flex items-center justify-center transition hover:drop-shadow-[0_0_6px_rgba(200,200,255,0.6)] hover:scale-110"
        aria-label="toggle music"
        ref={buttonRef}
      >
        <Icon name="music" />
        <ParticleEffect emit={running} />
      </button>
    </div>
  );
}
