export function Window({ title, children, onClose, closing }) {
  return (
    <div
      className={`
        w-screen
        lg:w-[520px]
        pointer-events-auto
        bottom-0 lg:bottom-auto
        fixed
        ${closing ? "animate-window-out" : "animate-window-in"}
      `}
    >
      <div
        className="
          bg-white/30 dark:bg-white/10
          border border-white/20 dark:border-gray-700
          backdrop-blur-md
          rounded-none lg:rounded-xl
          shadow-lg
          w-full h-full
          max-h-screen lg:max-h-none
          flex flex-col
        "
      >
        <div
          className="
            window-handle
            flex justify-between items-center
            px-4 py-2
            bg-white/20 dark:bg-white/5
            border-b border-white/20 dark:border-gray-600
            lg:rounded-t-xl
          "
        >
          <span className="pointer-events-auto select-none font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </span>
          <button
            onClick={() => {
              new Audio("/assets/whoosh.wav").play();
              onClose();
            }}
            className="text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-red-400 transition hover:scale-120"
          >
            <span className="lg:hidden text-xl">←</span>
            <span className="hidden lg:inline text-lg">&times;</span>
          </button>
        </div>

        <div className="flex-1 p-4 overflow-auto max-h-[500px]">{children}</div>
      </div>
    </div>
  );
}
