// styles
import "./dictionariesListItem.scss";

// react
import { FC, useState } from "react";

// components
import DictionaryModalEditor from "@components/dictionaries/dictionaryModalEditor/dictionaryModalEditor";
import Modal from "@components/general/modal/modal";

// types
import Button, {
  buttonSize,
  buttonType,
} from "@components/general/button/button";

type DictionariesListItemPropsType = {
  dictlist: string[];
  handleDelete: (item: string) => void;
};

const DictionariesListItem: FC<DictionariesListItemPropsType> = ({
  dictlist,
  handleDelete,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [itemKey, setItemKey] = useState("init-vocabulary");
  const handleEdit = (itemKey: string) => {
    setItemKey(itemKey);

    setModalIsOpen(true);
  };

  return (
    <>
      {dictlist.map((item) => (
        <div className="dict-list-item" key={item}>
          <div className="dict-list-item-title">{item}</div>
          <div className="buttons">
            <Button
              size={buttonSize.MEDIUM}
              type={buttonType.DANGER}
              value="delete"
              handleClick={() => handleDelete(item)}
            />
            <Button
              size={buttonSize.MEDIUM}
              type={buttonType.SUCCESS}
              value="edit"
              handleClick={() => handleEdit(item)}
            />
          </div>
        </div>
      ))}
      <Modal open={modalIsOpen} setOpen={setModalIsOpen}>
        <DictionaryModalEditor itemKey={itemKey} setOpen={setModalIsOpen} />
      </Modal>
    </>
  );
};

export default DictionariesListItem;
