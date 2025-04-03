// react
import { FC, useState } from 'react';

// styles
import './Swithcer.css';

// i18n
import { useTranslation } from 'react-i18next';

// types
enum languages {
  uk = 'uk',
  en = 'en',
  de = 'de',
}

const languagesNames = {
  [languages.uk]: 'ukraine',
  [languages.en]: 'english',
  [languages.de]: 'german',
};
const Swithcer: FC = () => {
  const { t, i18n } = useTranslation();

  const initLanguage = i18n.language;

  const [languageSection, setLanguageSection] = useState<languages>(
    initLanguage as languages
  );

  const handleClick = (languageName: languages) => {
    setLanguageSection(languageName);
    i18n.changeLanguage(languageName);
  };

  const languageSections = [
    { name: languages.en, id: 0, text: languagesNames[languages.en] },
    { name: languages.uk, id: 1, text: languagesNames[languages.uk] },
    { name: languages.de, id: 2, text: languagesNames[languages.de] },
  ];

  const renderSections = () => {
    return languageSections.map((section) => {
      return (
        <div
          className={`section ${
            languageSection === section.name ? 'active' : ''
          }`}
          key={section.id}
          onClick={() => handleClick(section.name)}
        >
          {section.text}
        </div>
      );
    });
  };
  return <div className="sections">{renderSections()}</div>;
};

export default Swithcer;
