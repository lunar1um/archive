import { Icon } from "./IconRender";
import { Splash } from "./Splash";
import { TypingText } from "./TypingText";

export function TitleTyping({ onDone }) {
  return (
    <div className="space-y-4 relative inline-block">
      <h1 className="text-[28px] lg:text-3xl font-semibold text-center text-gray-700 dark:text-gray-100 mb-6 flex items-center justify-center gap-3 select-none">
        <Icon name="star" />
        <TypingText
          text="lunar's archive"
          speed={40}
          onDone={onDone}
          className="inline"
        />
      </h1>
      <Splash />
    </div>
  );
}
