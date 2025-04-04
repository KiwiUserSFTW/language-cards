// react
import { FC, ReactNode, useState } from "react";

// styles
import "./dictionariesList.scss";

// database
import { getVocabularys } from "../../../data/vocabulary";

const DictionariesList: FC = () => {
  const Dictlist = Object.keys(getVocabularys());

  const [vocabularys, setVocabularys] = useState(Dictlist);

  // TODO CONFIRM MODAL WINDOW
  const handleClick = () => {
    alert("element deleted");
  };
  const listRender = (): ReactNode => {
    return vocabularys.map((item) => (
      <div className="dict-list-item">
        {item}
        <div className="buttons">
          <button onClick={() => handleClick()}> delete </button>
          <button onClick={() => handleClick()}> edit </button>
        </div>
      </div>
    ));
  };
  return <div className="dict-list">{listRender()}</div>;
};

export default DictionariesList;
