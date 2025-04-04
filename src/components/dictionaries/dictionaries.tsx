// react
import { FC, useState } from "react";

// styles
import "./dictionaries.scss";

// database
import { addVocabulary, updateLocalStorageData } from "../../data/vocabulary";
import Modal from "../general/modal/modal";

const Dictionaries: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const fileName = file.name.split(".")[0];
    const text = await file.text();
    const json = JSON.parse(text);

    addVocabulary(fileName, json);
    updateLocalStorageData();
  };

  const handleClick = () => {
    setOpenModal(openModal ? false : true);
    // alert("modal window with list");
  };
  return (
    <div className="dictionary">
      <Modal open={openModal} setOpen={setOpenModal}>
        {" "}
        CONTENT
      </Modal>
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
      <button className="dictionary-remove" onClick={() => handleClick()}>
        remove old one
      </button>
    </div>
  );
};

export default Dictionaries;
