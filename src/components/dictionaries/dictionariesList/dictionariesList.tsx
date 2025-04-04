// react
import { FC, ReactNode, useEffect, useState } from "react";

// styles
import "./dictionariesList.scss";

// database
import {
  deleteVocabulary,
  getVocabularys,
  updateLocalStorageData,
} from "../../../data/vocabulary";

const DictionariesList: FC = () => {
  const dictlist = Object.keys(getVocabularys());

  const [vocabularys, setVocabularys] = useState<ReactNode>();
  console.log(dictlist, "DICTIONARIES LIST");
  // TODO CONFIRM MODAL WINDOW
  const handleClick = (key: string) => {
    alert("element deleted");
    setVocabularys(dictlist);
    deleteVocabulary(key);
    // DATABASE COMMENT FOR TESTING
    updateLocalStorageData();
  };
  const listRender = () => {
    const renderedList = dictlist.map((item) => (
      <div className="dict-list-item">
        {item}
        <div className="buttons" key={item}>
          <button onClick={() => handleClick(item)}> delete </button>
          <button onClick={() => handleClick(item)}> edit </button>
        </div>
      </div>
    ));
    setVocabularys(renderedList);
  };

  useEffect(() => {
    listRender();
  }, [vocabularys]);

  return <div className="dict-list">{vocabularys}</div>;
};

export default DictionariesList;
