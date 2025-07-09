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
    <img
      className="exportButton"
      src="https://img.icons8.com/material-outlined/720/FFFFFF/download--v1.png"
      alt="export"
      onClick={() => handleClck()}
    />
  );
};

export default ExportButton;
