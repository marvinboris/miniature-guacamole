import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse } from 'reactstrap';
import { faCaretDown, faCircle, faDoorOpen, faEnvelope, faHeadset, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faTwitterSquare, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import NavigationItems from '../NavigationItems/NavigationItems';
import CenterButton from '../../UI/Button/CenterButton/CenterButton';
import Logo from '../../UI/Logo/Logo';

import './Toolbar.css';

import MenuBar from '../../../assets/images/menu-bar.svg';

export default ({ isAuth, name, drawerToggleClicked, logoutHandler, role, cartItemsNumber, notifications }) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const content = <div className="container d-flex justify-content-between align-items-center">
        <div className="mr-5">
            <Logo big />
        </div>

        <div className="d-flex justify-content-between align-items-center">
            <div className="mr-5 pr-5">
                <a href="tel:(+237) 693886386" className="d-flex align-items-center text-dark text-small text-decoration-none">
                    <div className="embed-responsive embed-responsive-1by1 rounded-circle border border-2 mr-2 border-dark d-flex justify-content-center align-items-center" style={{ width: 28 }}>
                        <FontAwesomeIcon icon={faPhone} />
                    </div>

                    <span>(+237) 693886386</span>
                </a>
            </div>

            <NavigationItems font="dark" toggleNavbar={toggleNavbar} />
        </div>
    </div>;

    return <div className="Toolbar sticky-top">
        <div className="bg-white shadow-sm">
            {content}
        </div>

        <div className="d-lg-none">
            <Collapse isOpen={!collapsed} navbar>
                <NavigationItems font="dark" toggleNavbar={toggleNavbar} />
            </Collapse>
        </div>
    </div>;
}