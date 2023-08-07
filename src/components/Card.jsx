import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaArrowUp } from "react-icons/fa";

const style = {
  cursor: "move",
};

const Card = ({ id, text, photo, index, moveCard, username, like }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "div",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the item's height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally, it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "div",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      key={id}
      ref={ref}
      style={{ ...style, opacity }}
      data-handler-id={handlerId}
      className="w-full text-white bg-black"
    >
      {/* {text} */}
      <div className="grid items-center h-20 grid-cols-12 gap-4 px-4 my-4 font-light text-gray-400 bg-black border border-gray-500 rounded-lg">
        <p className="col-span-1">{index + 1}</p>
        <div className="flex items-center justify-start col-span-1 ">
          <img src={photo} alt="" className="w-24 h-12 rounded-md " />
        </div>
        <div className="flex items-center justify-start col-span-5 ">
          <p>{text}</p>
        </div>

        <div className="flex items-center col-span-4 gap-3">
          <p className="w-6 h-6 bg-red-200 rounded-full"></p>
          <p className="text-red-500 ">{username}</p>
        </div>
        <div className="flex items-center col-span-1 gap-4">
          <p>{like}</p>
          <p>
            <FaArrowUp className="text-yellow-400 " />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
