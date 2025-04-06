// react
import { FC, useState } from "react";

// styles
import "./navbar.scss";

type NavBarType = {
  sections: {
    name: string;
    url: string;
  }[];
};
const NavBar: FC<NavBarType> = ({sections}) => {

    return (
        <>
        {sections}
        </>
    )
};

export default NavBar;
