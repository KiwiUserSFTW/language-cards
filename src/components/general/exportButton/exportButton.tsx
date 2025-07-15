// react
import { FC } from "react";

// styles
import "./exportButton.scss";

// api
import { getVocabulary } from "@data/vocabulary";

type ExportButtonType = {
  vocabKey: string;
};
const ExportButton: FC<ExportButtonType> = ({ vocabKey }) => {
  const handleClck = () => {
    
  };

  return (
    <img
      className="exportButton"
      src=""
      alt="export"
      onClick={() => handleClck()}
    />
  );
};

export default ExportButton;
