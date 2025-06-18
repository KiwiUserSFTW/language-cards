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
};

const DictionaryModalEditor: FC<DictionaryModalEditorProps> = ({ itemKey }) => {
  const [dict, setDict] = useState<Record<string, string>>({
    apple: "яблуко",
  });

  console.log("itemKey", itemKey);
  const initDictionary = getVocabulary(itemKey);

  const handleChange = (name: string, newValue: string) => {
    setDict((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleClick = () => {
    replaceVocabulary(itemKey, dict);
    updateLocalStorageData();
  };

  useEffect(() => {
    if (!initDictionary) return;
    setDict(initDictionary);
  }, []);

  return (
    <div className="dict-list-item-editor">
      {Object.entries(initDictionary).map(([name]) => {
        return (
          <div className="dict-list-item-editor-element" key={name}>
            <div className="dict-list-item-editor-element-name">{name}</div>
            <div className="dict-list-item-editor-element-answer">
              <input
                type="text"
                value={dict[name] ?? ""}
                onChange={(e) => handleChange(name, e.target.value)}
              />
            </div>
            <div className="dict-list-item-editor-element-delete">
              <button>delete</button>
            </div>
          </div>
        );
      })}
      <div className="dict-list-item-editor-save">
        <button onClick={handleClick}> save changes </button>
      </div>
    </div>
  );
};

export default DictionaryModalEditor;
