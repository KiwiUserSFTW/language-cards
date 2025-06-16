// styles
import "./dictionariesListItem.scss";

// react
import { FC } from "react";

type DictionariesListItemPropsType = {
  dictlist: string[];
  handleDelete: (item: string) => void;
};

const DictionariesListItem: FC<DictionariesListItemPropsType> = ({
  dictlist,
  handleDelete,
}) => {
  return (
    <>
      {dictlist.map((item) => (
        <div className="dict-list-item" key={item}>
          <div className="dict-list-item-title">{item}</div>
          <div className="buttons">
            <button onClick={() => handleDelete(item)}> delete </button>
            <button onClick={() => console.log("edit")}> edit </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default DictionariesListItem;
