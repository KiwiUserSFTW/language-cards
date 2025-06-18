// react
import { FC, useEffect, useState } from "react";

// styles
import "./dictionariesModalList.scss";

// database
import {
  deleteVocabulary,
  getVocabularys,
  updateLocalStorageData,
  addVocabulary,
} from "@data/vocabulary";
import DictionariesListUploadButton from "./dictionariesListUploadButton/dictionariesListUploadButton";
import DictionariesListItem from "./dictionariesListItem/dictionariesListItem";

const DictionariesModalList: FC = () => {
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

  enum uploadEvents {
    DATATRANSFER = "dataTransfer",
    TARGET = "target",
  }
  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    const files =
      uploadEvents.DATATRANSFER in event
        ? event.dataTransfer?.files
        : event.target.files;

    const file = files?.[0];
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
      <DictionariesListItem dictlist={dictlist} handleDelete={handleDelete} />
      <DictionariesListUploadButton handleUpload={handleUpload} />
    </div>
  );
};

export default DictionariesModalList;
