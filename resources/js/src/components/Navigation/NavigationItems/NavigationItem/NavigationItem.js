import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navigationItem = ({ icon, children, href = '', className = '', different, font, button }) => {
    const prevent = e => {
        e.preventDefault();
    };

    return (
        <NavItem>
            {button ?
                <NavLink className={`nav-link px-2 ${'text-' + font} ${className}`} to='#' exact onChange={prevent}>{icon ? <FontAwesomeIcon icon={icon} className="mr-1" /> : null}{children}</NavLink>
                :
                <NavLink className={`nav-link px-2 ${'text-' + font} ${className}`} to={href} exact activeClassName={!different ? "text-green active text-large" : ""}>{icon ? <FontAwesomeIcon icon={icon} className="mr-1" /> : null}{children}</NavLink>}
        </NavItem>
    );
}

export default navigationItem;