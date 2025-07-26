import { useEffect, useState } from "react";
const splashes = [
  "how did you get here?",
  "haha info dump!!",
  "i feel so sigma!",
  "oh, welcome!",
  "goog...",
  "dark mode is recommended",
  "giggity giggity",
  "i use arch btw",
  "LET'S GO GAMBLING 🗣️🔥🔥",
  "cpu intensive!",
  "emotional daaaamage",
  "yo:gurt",
];

export function Splash() {
  const [splash, setSplash] = useState("");

  useEffect(() => {
    const randomSplash = splashes[Math.floor(Math.random() * splashes.length)];
    setSplash(randomSplash);
  }, []);

  return (
    <div className="opacity-0 md:[animation-delay:4000ms] md:animate-fade-in z-10">
      <div
        title="minceraft reference..."
        className="absolute top-0 right-0 translate-x-1/3 translate-y-3 rotate-[-10deg] text-yellow-400 font-bold text-lg select-none pointer-events-none drop-shadow-[0_0_2px_black] whitespace-nowrap font-jetbrains-mono animate-subtle-pulse hidden md:block"
      >
        {splash}
      </div>
    </div>
  );
}
