import { useEffect, useState } from "react";

export function TypingText({ text = "", speed = 50, onDone, className = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= text.length) {
      if (onDone) setTimeout(onDone, 1000);
      return;
    }

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, text, speed, onDone]);

  return (
    <span className={className}>
      {text.slice(0, index)}
      <span className="animate-pulse">|</span>
    </span>
  );
}
