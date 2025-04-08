// react
import { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// database
import { getVocabularys } from "../../../data/vocabulary";

// styles
import "./dictionariesNavList.scss";
import TabSwitcher from "../../general/tabSwitcher/tabSwitcher";

type DictionariesNavListType = {
  activeDictionary: string;
  setActiveDictionary: (name: string) => void;
};

const DictionariesNavList: FC<DictionariesNavListType> = ({
  activeDictionary,
  setActiveDictionary,
}) => {
  const navigate = useNavigate();

  const dictionariesTabs = Object.keys(getVocabularys()).map((vocabulary) => {
    return {
      name: vocabulary,
      onClick: () => {
        navigate("?id=" + vocabulary);
        setActiveDictionary(vocabulary);
      },
    };
  });

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    for (let i = 0; i < dictionariesTabs.length; i++) {
      if (id == dictionariesTabs[i].name) {
        setActiveDictionary(id);
      } else {
        setActiveDictionary(dictionariesTabs[0].name);
      }
    }
  }, []);

  return (
    <TabSwitcher
      tabs={dictionariesTabs}
      activeTab={activeDictionary}
      setActiveTab={(name) => setActiveDictionary(name)}
    />
  );
};

export default DictionariesNavList;
