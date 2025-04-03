// styles
import './navBarItem.scss';

// react
import { FC } from "react";
import { Link } from "react-router-dom";

// types
import { navbarCategory } from "@/types/general/generalTypes";

type navBarItemProps = navbarCategory & {
    active: boolean;
};

const NavBarItem: FC<navBarItemProps> = ({ name, id, url, active }) => {


    return (
        <Link
            className={`navBarItem ${active ? 'active' : ''}`}
            to={url}
            key={id}
        >
            <div className="navBarItem-container">
                <p>{name}</p>
            </div>
        </Link>
    );
};

export default NavBarItem;