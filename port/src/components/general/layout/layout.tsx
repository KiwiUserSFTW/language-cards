// styles
import './layout.scss';

// react
import { FC } from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "./header/header";

const Layout: FC = () => {

    return (
        <div className="layout">

            <Header />
            <main className="content">
                <Outlet />
            </main>
            <footer className="footer">
                <div className="footer-content">
                    {/* <div>Instagram: @gmail.com</div>
                    <div>Telegram: Some Telegram Here</div>
                    <div>Privacy: dmain®</div>
                    <div>
                        <a href="instagram.com">Some link here</a>
                    </div> */}
                </div>
            </footer>
        </div>
    );
};

export default Layout;
