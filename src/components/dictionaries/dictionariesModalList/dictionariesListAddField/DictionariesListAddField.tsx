// react
import { FC, useState, KeyboardEvent } from "react";

// style
import "./dictionariesListAddField.scss";

// functions
import { addVocabulary } from "@data/vocabulary";

type DictionariesListAddFieldProps = {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

const DictionariesListAddField: FC<DictionariesListAddFieldProps> = ({
  setTrigger,
}) => {
  const [value, setValue] = useState<string>("");
  const handleClick = () => {
    if (value === "" || value === undefined) return;
    setTrigger((prev) => !prev);
    setValue("");
    addVocabulary(value, { init: "init" });
  };

  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };
  return (
    <div className="dict-list-item">
      <input
        value={value}
        type="text"
        className="dict-list-item-add-field-input"
        onKeyDown={handleEnterPress}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="dict-list-item-add-field-button" onClick={handleClick}>
        add
      </button>
    </div>
  );
};

export default DictionariesListAddField;
