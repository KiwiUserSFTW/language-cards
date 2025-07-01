// react
import { FC } from "react";

// styles
import "./button.scss";

export enum buttonSize {
  BASE = "base",
  MEDIUM = "medium",
}

export enum buttonType {
  SUCCESS = "success",
  DANGER = "danger",
}

type ButtonProps = {
  size: buttonSize;
  type: buttonType;
  value: string;
  handleClick: () => void;
};

const Button: FC<ButtonProps> = ({ size, type, value, handleClick }) => {
  return (
    <button className={`button ${type} ${size}`} onClick={() => handleClick()}>
      {value}
    </button>
  );
};

export default Button;
