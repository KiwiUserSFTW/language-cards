// styles and icons
import './header.scss';

// react
import { FC } from 'react';
// components
import NavBar from '../navBar/navBar';

import logo from '@assets/logo.jpg';

// Headroom
import Headroom from 'react-headroom';
import { useNavigate } from 'react-router';

import { navBarCategoryUrl, navBarCategorys } from '../navBar/navBar';

const Header: FC = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;

  const handleClick = () => {
    const homeUrl = navBarCategoryUrl[navBarCategorys.HOME];
    if (location != homeUrl) navigate(homeUrl);
  };
  return (
    <>
      <Headroom>
        <header className="header">
          <div className="header-container">
            <div className="header-tittle" onClick={handleClick}>
              <p>Šinari tattoo</p>
            </div>
            <div className="header-logo">
              <img src={logo} alt="Logo" onClick={handleClick} />
            </div>
            <div className="header-navbar">
              <NavBar />
            </div>
          </div>
        </header>
      </Headroom>
    </>
  );
};

export default Header;
