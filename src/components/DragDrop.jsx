import React from "react";
import Item from "./Item";
import { useState } from "react";
import { useDrop } from "react-dnd";

const listword = [
  { id: 1, text: "oarnonfaoniefoan" },
  { id: 2, text: "sdsdsdsadac" },
  { id: 3, text: "advadvadvaedav" },
  { id: 4, text: "advadvadvadv" },
  { id: 4, text: "advfadfafaf" },
];

const DragDrop = () => {
  const [board, setBoard] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => addList(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const addList = (id) => {
    const mylist = listword.filter(p=>id===p.id)
    setBoard(board=>[...board, mylist[0]])
  };

  return (
    <div>
      <div>
        {listword.map((p) => {
          return <Item text={p} />;
        })}
      </div>
      <div ref={drop} className="w-48 h-48 border border-white">
        {board.map((p) => {
          return <Item text={p} />;
        })}
      </div>
    </div>
  );
};

export default DragDrop;
