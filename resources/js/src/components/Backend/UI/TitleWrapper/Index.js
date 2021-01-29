import React from 'react';

export default ({ children, dark = false }) =>
    <div className={"bg-" + (dark ? "grayblue" : "soft") + " py-4 pl-5 pr-4 position-relative"}>
        {children}
    </div>;