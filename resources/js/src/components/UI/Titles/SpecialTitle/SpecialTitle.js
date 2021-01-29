import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ icon, children, className, user, dark = false }) =>
    <div className={`${user ? "h4" : "h2"} mb-2 text-${dark ? "light" : "secondary"} ${className}`}>
        <FontAwesomeIcon icon={icon} className={`mr-2 text-${dark ? "orange" : "reset"}`} fixedWidth />{children}
    </div>;