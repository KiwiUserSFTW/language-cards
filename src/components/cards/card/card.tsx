// react
import { FC, useState, KeyboardEvent } from "react";

// styles
import "./card.scss";

type CardPropsType = {
  value: string;
  answer: string;
  updateCards: (value: string) => void;
};

// utils
import { AnswerChecker } from "../../../utils/AnswerChecker";

enum animationColors {
  BLUE = "shadow-blue",
  YELLOW = "shadow-yellow",
  RED = "shadow-red",
  NO_ANIMATION = "",
}

const Card: FC<CardPropsType> = ({ value, answer, updateCards }) => {
  const [input, setInput] = useState("");
  const [cardsAnimation, setCardsAnimation] = useState<string>(
    animationColors.NO_ANIMATION
  );

  const checker = new AnswerChecker();

  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleClick = () => {
    const answerIsRight = checker.isSimilar(input, answer);
    const confirm = () => {
      updateCards(value);
      setInput("");
    };
    if (input === answer) {
      confirm();
      setCardsAnimation(animationColors.BLUE);
    } else if (input !== answer && answerIsRight) {
      confirm();
      setCardsAnimation(animationColors.YELLOW);
    } else {
      setCardsAnimation(animationColors.RED);
    }
    setTimeout(() => {
      setCardsAnimation(animationColors.NO_ANIMATION);
    }, 1000);
  };

  return (
    <div className={`card shadow ${cardsAnimation}`}>
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
