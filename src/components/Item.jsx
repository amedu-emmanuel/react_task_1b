import React from "react";
import { useDrag } from "react-dnd";

const Item = ({ text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item:{id:text.id},
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));
  return <div ref={drag} style={{border:isDragging?"5px solid pink": "0px"}}>{text.text}</div>;
};

export default Item;
