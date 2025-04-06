// react
import { FC, useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

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
import NavBar from "../general/navbar/navbar";

const Cards: FC = () => {
  const navigate = useNavigate();
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

  // TABS
  const dictionariesTabs = Object.keys(getVocabularys()).map((vocabulary) => {
    return {
      name: vocabulary,
      onClick: () => {
        navigate("?id=" + vocabulary);
        setDictionary(vocabulary);
      },
    };
  });

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    for (let i = 0; i < dictionariesTabs.length; i++) {
      if (id == dictionariesTabs[i].name) {
        setDictionary(id);
      } else {
        setDictionary(dictionariesTabs[0].name);
      }
    }
  }, []);
  return (
    <div className="cards">
      <NavBar />
      <TabSwitcher
        tabs={dictionariesTabs}
        activeTab={dictionary}
        setActiveTab={(name) => setDictionary(name)}
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
