import { useEffect, useState, useRef } from "react";
import { Icon } from "./IconRender";

export function ThemeToggler() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const buttonRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    new Audio("/assets/click.wav").play();

    buttonRef.current.classList.add("animate-squish");

    setTimeout(() => {
      buttonRef.current.classList.remove("animate-squish");
    }, 300);

    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="absolute top-4 right-4 z-3 opacity-0 [animation-delay:4500ms] animate-slide-in-right">
      <button
        className="w-10 h-10 flex items-center justify-center"
        aria-label="Toggle dark mode"
        onClick={toggleTheme}
        ref={buttonRef}
      >
        <Icon name="moon" />
        <Icon name="sun" />
      </button>
    </div>
  );
}
