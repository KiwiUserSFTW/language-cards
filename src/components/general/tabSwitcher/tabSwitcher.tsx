// react
import { FC } from "react";

// styles
import "./tabSwitcher.scss";

export type TabSwitcherType = {
  tabs: tabType[];
  activeTab: string;
  setActiveTab: (name: string) => void;
};

type tabType = {
  name: string;
  button?: boolean;
  onClick: () => void;
};

const TabSwitcher: FC<TabSwitcherType> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="tab-container">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          onClick={() => {
            if (activeTab === tab.name) return;
            tab.onClick();
            if (tab.button) return;
            setActiveTab(tab.name);
          }}
          className={`tab ${activeTab === tab.name ? "active" : ""} ${
            tab.button ? "tab-button" : ""
          }`}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

export default TabSwitcher;
