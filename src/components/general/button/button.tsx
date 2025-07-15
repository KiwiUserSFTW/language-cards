// react
import { FC } from "react";

// styles
import "./button.scss";

export enum buttonSize {
  BASE = "base",
  MEDIUM = "medium",
}

export enum buttonType {
  ADD = "success",
  DELETE = "danger",
  EDIT = "edit",
  EXPORT = "export",
}

export const buttonColor = {
  [buttonType.ADD]: "success",
  [buttonType.EDIT]: "success",
  [buttonType.DELETE]: "danger",
  [buttonType.EXPORT]: "none",
};

type ButtonProps = {
  size: buttonSize;
  type: buttonType;
  value?: string;
  onlyIcon?: boolean;
  handleClick: () => void;
};

const iconUrls = {
  [buttonType.ADD]: "https://img.icons8.com/pulsar-gradient/420/40C057/add.png",
  [buttonType.DELETE]:
    "https://img.icons8.com/pulsar-gradient/420/FFFFFF/delete-forever.png",
  [buttonType.EDIT]:
    "https://img.icons8.com/pulsar-gradient/420/create-new.png",
  [buttonType.EXPORT]:
    "https://img.icons8.com/material-outlined/720/FFFFFF/download--v1.png",
};
const Button: FC<ButtonProps> = ({
  size,
  type,
  value,
  onlyIcon,
  handleClick,
}) => {
  return (
    <div className="buttons">
      <button
        className={`button ${size} ${buttonColor[type]}`}
        onClick={() => handleClick()}
      >
        <div className={`${onlyIcon ? "button-icon-only" : "button-name"}`}>{value}</div>
        <div>
          <img
            className={`${onlyIcon ? "button-icon-only" : "button-icon"}`}
            width="50"
            height="50"
            src={iconUrls[type]}
            alt="delete-forever"
          />
        </div>
      </button>
    </div>
  );
};

export default Button;
