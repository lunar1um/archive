import { Icon } from "./IconRender";

export function Card({ title, desc, icon, onClick }) {
  return (
    <a
      onClick={() => {
        new Audio("/assets/click.wav").play();
        onClick();
      }}
      className="flex items-center gap-4 bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 transition backdrop-blur-md rounded-xl px-4 py-2 lg:px-6 lg:py-4 shadow-md hover:shadow-lg border border-white/20 dark:border-gray-600 active:translate-y-[3px]"
    >
      <Icon name={icon} />
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 select-none">
          {title}
        </h3>
        <p className="text-sm lg:text-md text-gray-700 dark:text-gray-300 font-manrope select-none">
          {desc}
        </p>
      </div>
    </a>
  );
}
