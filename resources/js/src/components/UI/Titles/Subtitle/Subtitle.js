import React from 'react';

export default ({ children, className, dark = false }) =>
    <div className={`text-${dark ? "light" : "secondary"} lead small ml-4 pl-3 ${className}`}>
        {children}
    </div>;