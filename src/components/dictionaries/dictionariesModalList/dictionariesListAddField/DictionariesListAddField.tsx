// react
import { FC, useState } from "react";

// style
import "./dictionariesListAddField.scss";

// components
import Input from "@components/general/input/input";

// functions
import { addVocabulary } from "@data/vocabulary";

// translation
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        placeholder={t('general.input.placeholder.name')}
        handleAccept={handleClick}
      />
      <Button
        size={buttonSize.MEDIUM}
        type={buttonType.SUCCESS}
        value={t("general.button.add")}
        handleClick={handleClick}
      />
    </div>
  );
};

export default DictionariesListAddField;
