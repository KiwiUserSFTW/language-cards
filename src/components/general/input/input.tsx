// react
import { FC, KeyboardEvent } from "react";

// styles
import "./input.scss";

type InputProps = {
  value: string;
  setValue: (value: string) => void;
  handleAccept?: () => void;
  placeholder?: string;
};

const Input: FC<InputProps> = ({
  handleAccept,
  value,
  setValue,
  placeholder,
}) => {
  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && handleAccept) {
      e.preventDefault();
      handleAccept();
    }
  };

  return (
    <input
      value={value}
      type="text"
      className="input"
      onKeyDown={handleEnterPress}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
