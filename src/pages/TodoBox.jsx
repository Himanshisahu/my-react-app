import React, { useState } from "react";
import Draggable from "react-draggable";
import { savePosition, getPosition } from "../utils/storage";

const todoBoxStyle = {
  position: "absolute",
  width: "150px",
  height: "100px",
  backgroundColor: "#fefefe",
  border: "1px solid #ccc",
  padding: "10px",
  zIndex: 1000,
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
};

const TodoBox = ({ id, content, existingBoxes }) => {
  const initialPos = getPosition(id) || { x: 0, y: 0 };
  const [position, setPosition] = useState(initialPos);

  const handleDrag = (e, data) => {
    const newPos = { x: data.x, y: data.y };

    // Check for overlap
    const isOverlapping = existingBoxes.some((box) => {
      if (box.id === id) return false;
      const dx = Math.abs(box.position.x - newPos.x);
      const dy = Math.abs(box.position.y - newPos.y);
      return dx < 150 && dy < 100; // adjust based on box size
    });

    if (!isOverlapping) {
      setPosition(newPos);
      savePosition(id, newPos);
    }
  };

  return (
    <Draggable defaultPosition={position} onStop={handleDrag}>
      <div style={todoBoxStyle}>
        <p>{content}</p>
      </div>
    </Draggable>
  );
};

export default TodoBox;
