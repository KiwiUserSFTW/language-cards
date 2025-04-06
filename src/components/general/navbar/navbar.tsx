// react
import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// styles
import "./navbar.scss";
import TabSwitcher from "../tabSwitcher/tabSwitcher";

enum navBarTabsNames {
  DECTIANIRIES = "Dictionaries",
  Cards = "Cards",
}
const NavBar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(navBarTabsNames.Cards);

  const navBarTabs = [
    {
      name: navBarTabsNames.DECTIANIRIES,
      onClick: () => navigate(`/${navBarTabsNames.DECTIANIRIES.toLowerCase()}`),
    },
    {
      name: navBarTabsNames.Cards,
      onClick: () => navigate(`/${navBarTabsNames.Cards.toLowerCase()}`),
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath.includes(navBarTabsNames.DECTIANIRIES.toLowerCase())) {
      setActiveTab(navBarTabsNames.DECTIANIRIES);
    } else if (currentPath.includes(navBarTabsNames.Cards.toLowerCase())) {
      setActiveTab(navBarTabsNames.Cards);
    }
  }, [location.pathname]);
  return (
    <div className="navBar">
      <TabSwitcher
        tabs={navBarTabs}
        activeTab={activeTab}
        setActiveTab={(name) =>
          setActiveTab(navBarTabsNames[name as keyof typeof navBarTabsNames])
        }
      />
    </div>
  );
};

export default NavBar;
