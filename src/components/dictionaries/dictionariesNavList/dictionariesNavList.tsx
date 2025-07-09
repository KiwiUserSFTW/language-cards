// react
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// database
import { getVocabularys } from "@data/vocabulary";

// styles
import "./dictionariesNavList.scss";
import TabSwitcher from "../../general/tabSwitcher/tabSwitcher";
import Modal from "../../general/modal/modal";

// components
import DictionariesModalList from "../dictionariesModalList/dictionariesModalList";

// translation
import { useTranslation } from "react-i18next";

type DictionariesNavListType = {
  activeDictionary: string;
  setActiveDictionary: (name: string) => void;
};

const DictionariesNavList: FC<DictionariesNavListType> = ({
  activeDictionary,
  setActiveDictionary,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { t } = useTranslation();
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

  const extraDictionaryTabButton = {
    name: t("cards.navList.addEditField"),
    onClick: () => setModalIsOpen(!modalIsOpen),
    button: true,
  };
  // add button
  dictionariesTabs.push(extraDictionaryTabButton);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    for (let i = 0; i < dictionariesTabs.length; i++) {
      if (id == dictionariesTabs[i].name) {
        setActiveDictionary(id);
        return;
      } else {
        setActiveDictionary(dictionariesTabs[0].name);
      }
    }
  }, []);

  return (
    <div>
      <Modal open={modalIsOpen} setOpen={setModalIsOpen}>
        {<DictionariesModalList />}
      </Modal>
      <div className="dict-nav-list">
        <TabSwitcher
          tabs={dictionariesTabs}
          activeTab={activeDictionary}
          setActiveTab={(name) => setActiveDictionary(name)}
        />
      </div>
    </div>
  );
};

export default DictionariesNavList;
