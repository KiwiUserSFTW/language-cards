// react
import { FC, useEffect, useState } from "react";

// styles
import "./dictionariesList.scss";

// database
import {
  deleteVocabulary,
  getVocabularys,
  updateLocalStorageData,
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
    </div>
  );
};

export default DictionariesList;
