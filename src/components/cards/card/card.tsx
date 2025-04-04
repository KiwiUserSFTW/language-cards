// react
import { FC, useState, KeyboardEvent } from "react";

// styles
import "./card.scss";

type CardPropsType = {
  value: string;
  answer: string;
  updateCards: (value: string) => void;
};

const Card: FC<CardPropsType> = ({ value, answer, updateCards }) => {
  const [input, setInput] = useState("");
  const [updateCardsAnimation, setUpdateCardsAnimation] = useState<
    boolean | null
  >(null);

  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleClick = () => {
    if (input === answer) {
      updateCards(value);
      setInput("");
      setUpdateCardsAnimation(true);
    } else {
      setUpdateCardsAnimation(false);
    }
    setTimeout(() => {
      setUpdateCardsAnimation(null);
    }, 1000);
  };

  const animationValidate = () => {
    if (updateCardsAnimation) {
      return "shadow-blue";
    } else if (updateCardsAnimation === false) {
      return "shadow-red";
    } else {
      return " ";
    }
  };
  return (
    <div className={`card shadow ${animationValidate()}`}>
      <p className="card-title">{value}</p>
      <div className="card-answer-input">
        <input
          value={input}
          onKeyDown={handleEnterPress}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button onClick={handleClick}> → </button>
      </div>
    </div>
  );
};

export default Card;
