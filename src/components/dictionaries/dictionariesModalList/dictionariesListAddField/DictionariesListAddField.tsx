// react
import { FC, useState } from "react";

// style
import "./dictionariesListAddField.scss";

// functions
import { addVocabulary } from "@data/vocabulary";
import Input from "@components/general/input/input";

// types
import Button, {
  buttonSize,
  buttonType,
} from "@components/general/button/button";

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

  return (
    <div className="dict-list-item">
      <Input
        value={value}
        setValue={setValue}
        placeholder="type name here"
        handleAccept={handleClick}
      />
      <Button
        size={buttonSize.MEDIUM}
        type={buttonType.SUCCESS}
        value="add"
        handleClick={handleClick}
      />
    </div>
  );
};

export default DictionariesListAddField;
