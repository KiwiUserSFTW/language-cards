// react
import { FC, useEffect, useState } from "react";

// styles
import "./dictionariesList.scss";

// database
import {
  deleteVocabulary,
  getVocabularys,
  updateLocalStorageData,
  addVocabulary,
} from "../../../data/vocabulary";

const DictionariesList: FC = () => {
  const [dictlist, setDictList] = useState<string[]>([]);

  useEffect(() => {
    const vocab = getVocabularys();
    setDictList(Object.keys(vocab));
  }, []);

  // TODO CONFIRM MODAL WINDOW
  const handleDelete = (key: string) => {
    deleteVocabulary(key);
    updateLocalStorageData();
    setDictList((prev) => prev.filter((item) => item !== key));
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const fileName = file.name.split(".")[0];
    const text = await file.text();
    const json = JSON.parse(text);

    addVocabulary(fileName, json);
    updateLocalStorageData();
    setDictList((prev) => [...prev, fileName]);
  };

  return (
    <div className="dict-list">
      {dictlist.map((item) => (
        <div className="dict-list-item" key={item}>
          {item}
          <div className="buttons">
            <button onClick={() => handleDelete(item)}> delete </button>
            <button onClick={() => console.log("edit")}> edit </button>
          </div>
        </div>
      ))}
      <div className="dict-list-item" key="extra-button">
        <div className="dictionary-import">
          <label htmlFor="input">Upload new dictionary (json)</label>
          <input
            id="input"
            name="input"
            type="file"
            accept=".json"
            multiple
            onChange={(event) => handleUpload(event)}
          />
        </div>
      </div>
    </div>
  );
};

export default DictionariesList;
