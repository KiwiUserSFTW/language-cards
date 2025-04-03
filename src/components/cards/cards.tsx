// react
import { FC, useEffect, useState } from "react";

// styles
import "./cards.scss";

// functions
const getRandomCard = (cardsList: Record<string, string>) => {
  const entries = Object.entries(cardsList);
  return entries[Math.floor(Math.random() * entries.length)];
};

// components
import Card from "./card/card";

// types
import { cardsDataType } from "./cardsMockData/cardsMockData";

// mockData
import { cardsData } from "./cardsMockData/cardsMockData";

const Cards: FC = () => {
  const [cardsList, setCardsList] = useState<cardsDataType>(cardsData);
  const [currentCard, setCurrentCard] = useState<{
    value: string;
    answer: string;
  }>({
    value: "apple",
    answer: "яблуко",
  });

  const updateCards = (value: string) => {
    const { [value]: deletedValue, ...newState } = cardsList;
    setCardsList(newState);
  };

  useEffect(() => {
    setCardsList({ ...cardsList, newValue: "translate" });
  }, []);

  useEffect(() => {
    const [value, answer] = getRandomCard(cardsList);
    setCurrentCard({ value, answer });
  }, [cardsList]);
  return (
    <div className="cards">
      <Card
        value={currentCard.value}
        answer={currentCard.answer}
        updateCards={(value) => updateCards(value)}
      />
    </div>
  );
};

export default Cards;
