// styles
import './sideBarItem.scss';

// react
import { FC } from "react";
import { useNavigate } from 'react-router';

// router
type sideBarItemProprs = {
    items: { id: number; label: string; route: string }[];
    handleClick: () => void;
}

const SideBarItem: FC<sideBarItemProprs> = ({ items, handleClick }) => {
    const navigate = useNavigate();

    const handleItemClick = (route: string) => {
        navigate(route)
        handleClick()
    }

    return (
        <div>
            <ul className="sidebar-menu">
                {items.map((item) => (
                    <p
                        key={item.id}
                        className="sidebar-menu-item"
                        onClick={() => handleItemClick(item.route)}
                    >
                        {item.label}
                    </p>
                ))}
            </ul>
        </div>
    )
}

export default SideBarItem;