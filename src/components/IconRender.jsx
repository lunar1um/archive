import icons from "./Icons.jsx";

export function Icon({ name }) {
  const IconComponent = icons[name];
  if (!IconComponent) return null;

  return IconComponent;
}
