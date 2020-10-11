import React from 'react';
import {Layout, Menu} from "antd";
import reactLogo from "../assets/image/reactLogo.svg";
import postgresql from "../assets/image/postgresqlLogo.png";
import reduxLogo from "../assets/image/reduxLogo.svg";

const {Header: HeaderAndt} = Layout

const Header = () => {
    return (
        <HeaderAndt>
            <Menu theme="dark" mode="horizontal">
                <img className="menu-logo" src={reactLogo} alt="react"/>
                <img className="menu-logo" src={postgresql} alt="postgresql"/>
                <img className="menu-logo" src={reduxLogo} alt="redux"/>
            </Menu>
        </HeaderAndt>
    );
};

export default Header;

