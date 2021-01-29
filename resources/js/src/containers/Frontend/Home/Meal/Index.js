import React from 'react';

import View from '../../../../components/Backend/UI/View/View';

import './Meal.css';

export default ({ children, img, title }) => <div className="Meal col-lg-4 col-md-6 p-3 d-flex flex-column">
    <div className="content">
        <View title={title} content={<img className="img-fluid" src={img} />}>
            <div className="embed-responsive embed-responsive-4by3 position-relative">
                <div className="position-absolute w-100 h-100" style={{ background: `url('${img}') no-repeat center`, backgroundSize: "cover", top: 0, left: 0 }} />
            </div>

            <div className="text text-center py-4 px-5 flex-fill d-flex flex-column justify-content-center">
                <div className="title h5">{title}</div>

                <div className="children text-small">{children}</div>
            </div>
        </View>
    </div>

</div>;