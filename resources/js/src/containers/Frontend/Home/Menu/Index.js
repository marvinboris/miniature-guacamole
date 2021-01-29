import React from 'react';

import './Menu.css';

export default ({ price, img, title }) =>
    <div className="Menu col-xl-3 col-lg-4 col-md-6 d-flex flex-column pb-3">
        <div className="content">
            <div className="embed-responsive embed-responsive-1by1 position-relative rounded-lg overflow-hidden">
                <div className="position-absolute w-100 h-100" style={{ background: `url('${img}') no-repeat center`, backgroundSize: "cover", top: 0, left: 0 }} />
            </div>

            <div className="bg-white text-center py-4 px-5 flex-fill d-flex flex-column justify-content-center">
                <div className="h5">{title}</div>

                <div className="text-green text-700 text-large">XAF {(+price).toFixed(2)}</div>
            </div>
        </div>
    </div>;