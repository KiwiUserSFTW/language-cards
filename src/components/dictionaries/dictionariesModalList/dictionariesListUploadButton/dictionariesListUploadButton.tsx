// styles
import "./dictionariesListUploadButton.scss";

// react
import { FC } from "react";

type DictionariesListUploadButtonPropsType = {
  handleUpload: (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => void;
};

const DictionariesListUploadButton: FC<
  DictionariesListUploadButtonPropsType
> = ({ handleUpload }) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    // event.preventDefault();

    handleUpload(event);
  };

  return (
    <div
      className="dict-list-item"
      key="extra-button"
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <div className="dictionary-import">
        <label htmlFor="input">Upload new dictionary (json)</label>
        <p> choose from files or drop file here </p>
        <input
          id="input"
          name="input"
          type="file"
          accept=".json"
          multiple
          onChange={(e) => handleUpload(e)}
        />
      </div>
    </div>
  );
};

export default DictionariesListUploadButton;
