// react
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// styles
import "./cards.scss";

// functions
const getRandomCard = (cardsList: Record<string, string>) => {
  const entries = Object.entries(cardsList);
  return entries[Math.floor(Math.random() * entries.length)];
};

import { getVocabulary } from "../../data/vocabulary";

// components
import Card from "./card/card";

// types
import { cardsDataType } from "../../data/vocabulary";
import DictionariesNavList from "../dictionaries/dictionariesNavList/dictionariesNavList";

const Cards: FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedId = queryParams.get("id") || " ";

  const [cardsList, setCardsList] = useState<cardsDataType>({
    name: "apple",
    answer: "apple",
  });
  const [currentCard, setCurrentCard] = useState<{
    value: string;
    answer: string;
  }>({
    value: "apple",
    answer: "яблуко",
  });

  const updateCards = (value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [value]: deletedValue, ...newList } = cardsList;
    setCardsList(newList);
  };

  // pick next random card
  useEffect(() => {
    const [value, answer] = getRandomCard(cardsList);
    setCurrentCard({ value, answer });
  }, [cardsList]);

  const [dictionary, setDictionary] = useState(selectedId);

  useEffect(() => {
    if (dictionary) {
      const vocab = getVocabulary(dictionary);
      setCardsList(vocab);
    }
  }, [dictionary]);

  return (
    <div className="cards">
      <DictionariesNavList
        activeDictionary={dictionary}
        setActiveDictionary={(name) => setDictionary(name)}
      />
      <Card
        value={currentCard.value}
        answer={currentCard.answer}
        updateCards={(value) => updateCards(value)}
      />
    </div>
  );
};

export default Cards;
