import { useRef } from "react";
import Draggable from "react-draggable";
import { Window } from "./Window";
const isMobile = window.innerWidth < 1200;

export function DraggableWindow({
  win,
  onClose,
  onDragStart,
  onDragStop,
  closing,
}) {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={win.position}
      onStart={onDragStart}
      onStop={(_, data) => onDragStop({ x: data.x, y: data.y })}
      handle=".window-handle"
      disabled={isMobile}
    >
      <div
        ref={nodeRef}
        className="absolute"
        style={{ zIndex: win.z }}
        onMouseDown={onDragStart}
      >
        <Window title={win.title} onClose={onClose} closing={closing}>
          {win.content}
        </Window>
      </div>
    </Draggable>
  );
}
