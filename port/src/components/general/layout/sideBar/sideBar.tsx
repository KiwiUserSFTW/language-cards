// styles
import "./Sidebar.scss";

// react
import { FC, useState, useEffect, useRef } from "react";

// router
import SideBarItem from "./sideBarItem/sideBarItem";

interface SidebarProps {
  items: { id: number; label: string; route: string }[];
}

const Sidebar: FC<SidebarProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!sidebarRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        Menu
      </button>
      <div className="sidebar-content">
        <div className="sidebar-header">Sinari</div>
        <SideBarItem
          items={items}
          handleClick={() => setIsOpen(false)}
        />
      </div>
      <div className="sidebar-footer">
        <p>
          instagram
        </p>
        <p>
          telegram
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
