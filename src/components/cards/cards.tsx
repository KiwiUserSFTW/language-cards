// react
import { FC, useEffect, useState } from "react";

// styles
import "./cards.scss";

// functions
const getRandomCard = (cardsList: Record<string, string>) => {
  const entries = Object.entries(cardsList);
  return entries[Math.floor(Math.random() * entries.length)];
};

// functions
import { getVocabulary } from "@data/vocabulary";

const createCardsList = (dictId: string) => {
  return getVocabulary(dictId);
};

// components
import Card from "./card/card";
import DictionariesNavList from "@components/dictionaries/dictionariesNavList/dictionariesNavList";
import LanguageSwithcer from "@components/general/languageSwitcher/languageSwitcher";

// custom hooks
import useQuery from "@cutomHooks/useQuery";

// types
import { cardsDataType } from "@data/vocabulary";

const Cards: FC = () => {
  const query = useQuery();
  const selectedId = query.get("id") || " ";
  const [dictionary, setDictionary] = useState(selectedId);

  const [cardsList, setCardsList] = useState<cardsDataType>({
    apple: "яблуко",
    banana: "банан",
  });
  const [currentCard, setCurrentCard] = useState<{
    value: string;
    answer: string;
  }>({
    value: "apple",
    answer: "яблуко",
  });

  const updateCards = (value: string) => {
    if (Object.keys(cardsList).length <= 1) {
      setCardsList(createCardsList(dictionary));
      return;
    }
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
    if (dictionary !== " ") {
      setCardsList(createCardsList(dictionary));
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
      <LanguageSwithcer />
    </div>
  );
};

export default Cards;
