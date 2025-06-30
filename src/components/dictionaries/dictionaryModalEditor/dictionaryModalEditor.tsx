// styles
import "./dictionaryModalEditor.scss";

// react
import { FC, useEffect, useState } from "react";

// data
import {
  getVocabulary,
  replaceVocabulary,
  updateLocalStorageData,
} from "@data/vocabulary";

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

  const handeAddFormApply = () => {
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
              <input
                type="text"
                value={dict[name] ?? ""}
                onChange={(e) => handleChange(name, e.target.value)}
              />
            </div>
            <div className="dict-editor-element-button">
              <button className="delete">delete</button>
            </div>
          </div>
        );
      })}
      <div className="dict-editor-element">
        <div className="dict-editor-element-form">
          <input
            name="name"
            aria-label="name"
            type="text"
            value={addFormValues.name}
            placeholder="type name"
            onChange={(e) => handleAddFormChange("name", e.target.value)}
          />
          <input
            name="type"
            type="text"
            value={addFormValues.answer}
            placeholder="type answer"
            onChange={(e) => handleAddFormChange("answer", e.target.value)}
          />
          <div className="dict-editor-element-button">
            <button className="add" onClick={handeAddFormApply}>
              add
            </button>
          </div>
        </div>
      </div>
      <div className="dict-editor-form-save">
        <button onClick={handleClick}> save changes </button>
      </div>
    </div>
  );
};

export default DictionaryModalEditor;
