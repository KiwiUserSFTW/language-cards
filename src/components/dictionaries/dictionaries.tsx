// react
import { FC } from "react";

// styles
import "./dictionaries.scss";

// database
import { addVocabulary } from "../../data/vocabulary";

const Dictionaries: FC = () => {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const fileName = file.name.split(".")[0];
    const text = await file.text();
    const json = JSON.parse(text);

    addVocabulary(fileName, json);
  };
  return (
    <div className="dictionary">
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
      <button className="dictionary-remove">remove old one</button>
    </div>
  );
};

export default Dictionaries;
