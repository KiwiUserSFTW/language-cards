// styles
import "./dictionariesListUploadButton.scss";

// react
import { FC } from "react";

type DictionariesListUploadButtonPropsType = {
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DictionariesListUploadButton: FC<
  DictionariesListUploadButtonPropsType
> = ({ handleUpload }) => {
  return (
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
  );
};

export default DictionariesListUploadButton;
