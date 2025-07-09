// styles
import "./dictionaryModalEditor.scss";

// react
import { FC, useEffect, useState } from "react";

// translation
import { useTranslation } from "react-i18next";

// data
import {
  getVocabulary,
  replaceVocabulary,
  updateLocalStorageData,
} from "@data/vocabulary";
import Input from "@components/general/input/input";
import Button, {
  buttonSize,
  buttonType,
} from "@components/general/button/button";

type DictionaryModalEditorProps = {
  itemKey: string;
  setOpen: (value: boolean) => void;
};

const DictionaryModalEditor: FC<DictionaryModalEditorProps> = ({
  itemKey,
  setOpen,
}) => {
  const [dict, setDict] = useState<Record<string, string>>({
    apple: "яблуко",
  });

  const { t } = useTranslation();

  const initDictionary = getVocabulary(itemKey);
  const [addFormValues, setAddFormValues] = useState<{
    name: string;
    answer: string;
  }>({
    name: "",
    answer: "",
  });

  const handleAddFormChange = (key: string, value: string) => {
    setAddFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddFormApply = () => {
    if (addFormValues.name === "" || addFormValues.answer === "") {
      console.error(
        `one of the entries is empty, addFormValues.name=${addFormValues.name}, value=${addFormValues.answer} `
      );
      return;
    }
    setAddFormValues({
      name: "",
      answer: "",
    });
    handleChange(addFormValues.name, addFormValues.answer);
  };
  const handleChange = (name: string, newValue: string) => {
    setDict((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleDelete = (deletedElem: string) => {
    if (Object.keys(dict).length <= 1) {
      console.error("only one value exist, deleting not possible");
      return;
    }
    // eslint-disable-next-line no-use-before-define
    const { [deletedElem]: _deletedElem, ...newState } = dict;
    setDict(newState);
  };

  const handleClick = () => {
    setOpen(false);
    replaceVocabulary(itemKey, dict);
    updateLocalStorageData();
  };

  useEffect(() => {
    if (!initDictionary) return;
    setDict(initDictionary);
  }, []);

  return (
    <div className="dict-editor">
      {Object.entries(dict).map(([name]) => {
        return (
          <div className="dict-editor-element" key={name}>
            <div className="dict-editor-element-name">{name}</div>
            <div className="dict-editor-element-input">
              <Input
                value={dict[name] ?? ""}
                setValue={(value) => handleChange(name, value)}
              />
            </div>
            <div className="dict-editor-element-button">
              <Button
                type={buttonType.DELETE}
                size={buttonSize.BASE}
                value={t("general.button.delete")}
                handleClick={() => handleDelete(name)}
              />
            </div>
          </div>
        );
      })}
      <div className="dict-editor-element">
        <div className="dict-editor-element-form">
          <Input
            setValue={(value) => handleAddFormChange("name", value)}
            value={addFormValues.name}
            handleAccept={handleAddFormApply}
            placeholder={t('general.input.placeholder.name')}
          />
          <Input
            setValue={(value) => handleAddFormChange("answer", value)}
            value={addFormValues.answer}
            handleAccept={handleAddFormApply}
            placeholder={t('general.input.placeholder.answer')}
          />
          <div className="dict-editor-element-button">
            <Button
              size={buttonSize.BASE}
              type={buttonType.ADD}
              value={t("general.button.add")}
              handleClick={handleAddFormApply}
            />
          </div>
        </div>
      </div>
      <div className="dict-editor-form-save">
        <button onClick={handleClick}>
          {" "}
          {t("cards.modalEditor.saveButton")}{" "}
        </button>
      </div>
    </div>
  );
};

export default DictionaryModalEditor;
