// styles and icons
import './navBar.scss';

// react
import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// components
import NavBarItem from './navBarItem/navBarItem';

// types
import { navbarCategory } from '@/types/general/generalTypes';

export enum navBarCategorys {
  HOME = 'Home',
  PORTFOLIO = 'Portfolio',
  AFTERCARE = 'Aftercare',
  ABOUT_ME = 'About me',
}

export const navBarCategoryUrl: Record<navBarCategorys, string> = {
  [navBarCategorys.HOME]: '/home',
  [navBarCategorys.PORTFOLIO]: '/portfolio',
  [navBarCategorys.AFTERCARE]: '/aftercare',
  [navBarCategorys.ABOUT_ME]: '/about-me',
};

const NavBar: FC = () => {
  const [navData, setNavData] = useState<navbarCategory[]>([]);
  const location = useLocation();

  useEffect(() => {
    const navbar: navbarCategory[] = [
      {
        id: 1,
        name: navBarCategorys.HOME,
        url: navBarCategoryUrl[navBarCategorys.HOME],
      },
      {
        id: 2,
        name: navBarCategorys.PORTFOLIO,
        url: navBarCategoryUrl[navBarCategorys.PORTFOLIO],
      },
      {
        id: 3,
        name: navBarCategorys.AFTERCARE,
        url: navBarCategoryUrl[navBarCategorys.AFTERCARE],
      },
      {
        id: 4,
        name: navBarCategorys.ABOUT_ME,
        url: navBarCategoryUrl[navBarCategorys.ABOUT_ME],
      },
    ];

    setNavData(navbar);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-header"></div>
        <div className="navbar-content">
          {navData.map((item) => (
            <NavBarItem
              id={item.id}
              name={item.name}
              url={item.url}
              key={item.id}
              active={location.pathname === item.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
