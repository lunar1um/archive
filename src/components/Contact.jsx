import { Icon } from "./IconRender";

export function Contact({ link, title, name, icon }) {
  return (
    <a
      href={link}
      target="_blank"
      className="flex flex-col items-center gap-1 hover:scale-105 transition font-manrope"
      title={title !== null ? title : ""}
      onClick={() => {
        new Audio("/assets/click.wav").play();
      }}
    >
      <Icon name={icon} />
      <span>{name}</span>
    </a>
  );
}
