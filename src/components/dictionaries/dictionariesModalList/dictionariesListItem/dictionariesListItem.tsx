// styles
import "./dictionariesListItem.scss";

// react
import { FC, useState } from "react";

// components
import DictionaryModalEditor from "@components/dictionaries/dictionaryModalEditor/dictionaryModalEditor";
import Modal from "@components/general/modal/modal";

// translation
import { useTranslation } from "react-i18next";

// api
import { getVocabulary } from "@data/vocabulary";

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
  const { t } = useTranslation();

  const handleEdit = (itemKey: string) => {
    setItemKey(itemKey);

    setModalIsOpen(true);
  };
  const handleExport = (vocabKey: string) => {
    const file = JSON.stringify(getVocabulary(vocabKey), null, 2);

    const blob = new Blob([file], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${vocabKey}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };
  return (
    <>
      {dictlist.map((item) => (
        <div className="dict-list-item" key={item}>
          <div className="dict-list-item-title">{item}</div>
          <div className="buttons">
            <Button
              size={buttonSize.MEDIUM}
              type={buttonType.EXPORT}
              onlyIcon={true}
              handleClick={() => handleExport(item)}
            />
            <Button
              size={buttonSize.MEDIUM}
              type={buttonType.DELETE}
              value={t("general.button.delete")}
              handleClick={() => handleDelete(item)}
            />
            <Button
              size={buttonSize.MEDIUM}
              type={buttonType.EDIT}
              value={t("general.button.edit")}
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
