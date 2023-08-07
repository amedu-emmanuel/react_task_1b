import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";

import Card from "./Card";

const style = {

};

export const Container = ({ data }) => {
    const [cards, setCards] = useState(data);

  useEffect(() => {
    setCards(data);
  }, [data]);

  console.log(cards)
  

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        username={card.username}
        like={card.like}
        text={card.title}
        photo={card.photo}
        moveCard={moveCard}
      />
    );
  }, []);

  return (
    <>
      {cards && (
        <div style={style}>{cards?.map((card, i) => renderCard(card, i))}</div>
      )}
    </>
  );
};
