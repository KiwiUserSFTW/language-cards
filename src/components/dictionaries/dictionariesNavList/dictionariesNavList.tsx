// react
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// database
import { getVocabularys } from "../../../data/vocabulary";

// styles
import "./dictionariesNavList.scss";
import TabSwitcher from "../../general/tabSwitcher/tabSwitcher";
import Modal from "../../general/modal/modal";

// components
import DictionariesList from "../dictionariesModalList/dictionariesList";

type DictionariesNavListType = {
  activeDictionary: string;
  setActiveDictionary: (name: string) => void;
};

const DictionariesNavList: FC<DictionariesNavListType> = ({
  activeDictionary,
  setActiveDictionary,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    name: "add or edit dictionarys",
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
      } else {
        setActiveDictionary(dictionariesTabs[0].name);
      }
    }
  }, []);

  return (
    <div>
      <Modal open={modalIsOpen} setOpen={setModalIsOpen}>
        {<DictionariesList />}
      </Modal>
      <TabSwitcher
        tabs={dictionariesTabs}
        activeTab={activeDictionary}
        setActiveTab={(name) => setActiveDictionary(name)}
      />
    </div>
  );
};

export default DictionariesNavList;
