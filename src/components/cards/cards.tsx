// react
import { FC, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// styles
import "./cards.scss";

// functions
const getRandomCard = (cardsList: Record<string, string>) => {
  const entries = Object.entries(cardsList);
  return entries[Math.floor(Math.random() * entries.length)];
};

import { getVocabulary, getVocabularys } from "../../data/vocabulary";

// components
import Card from "./card/card";
import TabSwitcher from "../general/tabSwitcher/tabSwitcher";

// types
import { cardsDataType } from "../../data/vocabulary";

const Cards: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedId = queryParams.get("id") || "none";
  const [dictionary, setDictionary] = useState(selectedId);

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

  useEffect(() => {
    if (dictionary) {
      const vocab = getVocabulary(dictionary);
      setCardsList(vocab);
    }
  }, [dictionary]);

  const dictionariesTabs = Object.keys(getVocabularys()).map((vocabulary) => {
    return {
      name: vocabulary,
      onClick: () => {
        navigate("?id=" + vocabulary);
        setDictionary(vocabulary);
      },
    };
  });
  return (
    <div className="cards">
      <TabSwitcher tabs={dictionariesTabs} />
      <Card
        value={currentCard.value}
        answer={currentCard.answer}
        updateCards={(value) => updateCards(value)}
      />
    </div>
  );
};

export default Cards;
