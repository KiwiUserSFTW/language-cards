// react
import { FC, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// styles
import "./tabSwitcher.scss";

type TabSwitcherType = {
  tabs: tabType[];
};

type tabType = {
  name: string;
  onClick: () => void;
};

const TabSwitcher: FC<TabSwitcherType> = ({ tabs: tabsData }) => {
  const [tabs, setTabs] = useState(tabsData);
  const [activeTab, setActiveTab] = useState(tabsData[0].name);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    for (let i = 0; i < tabs.length; i++) {
      if (id == tabs[i].name) {
        setActiveTab(id);
      }
    }
  }, []);
  return (
    <div className="tab-container">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          onClick={() => {
            if (activeTab === tab.name) return;
            tab.onClick();
            setActiveTab(tab.name);
          }}
          className={`tab ${activeTab === tab.name ? "active" : ""}`}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

export default TabSwitcher;
