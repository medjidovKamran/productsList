import React from 'react';
import {Layout, Menu} from "antd";
import reactLogo from "../assets/image/reactLogo.svg";
import postgresql from "../assets/image/postgresqlLogo.png";
import reduxLogo from "../assets/image/reduxLogo.svg";

const {Header: HeaderAndt} = Layout

const Header = () => {
    return (
        <HeaderAndt>
            <Menu theme="dark">
                <img key="react" className="menu-logo" src={reactLogo} alt="react"/>
                <img key="postgresql" className="menu-logo" src={postgresql} alt="postgresql"/>
                <img key="redux" className="menu-logo" src={reduxLogo} alt="redux"/>
            </Menu>
        </HeaderAndt>
    );
};

export default Header;

