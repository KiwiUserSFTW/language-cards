// react
import { FC, useState } from "react";

// styles
import "./languageSwithcer.scss";

// translate
import i18next from "i18next";

// custom hooks
import { useTranslation } from "react-i18next";

enum languages {
  UK = "uk",
  EN = "en",
  AR = "ar",
  IT = "it",
  DE = "de",
}

const languageNamesMap: Record<languages, string> = {
  [languages.UK]: "uk",
  [languages.EN]: "en",
  [languages.AR]: "ar",
  [languages.IT]: "it",
  [languages.DE]: "de",
};

// types
type languageKey = keyof typeof languages;

const LanguageSwithcer: FC = () => {
  const { t, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState<languages>(
    // langParam || languages.EN
    languages[i18n.language.toUpperCase() as languageKey]
  );

  const handleClick = (id: languageKey) => {
    i18next.changeLanguage(languages[id]);
    setActiveTab(languages[id]);
  };
  return (
    <div className="language-switcher">
      {(Object.keys(languages) as languageKey[]).map((id) => (
        <div
          className={`language-switcher-tab ${
            activeTab === languages[id] ? "active" : ""
          }`}
          key={id}
          onClick={() => handleClick(id)}
        >
          {languageNamesMap[languages[id]]}
        </div>
      ))}
    </div>
  );
};
export default LanguageSwithcer;
