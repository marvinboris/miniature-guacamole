import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faLocationArrow, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTelegramPlane, faTwitter } from '@fortawesome/free-brands-svg-icons';

import Logo from '../UI/Logo/Logo';
import Location from '../UI/Location/Location';

import './Footer.css';


const Stack = ({ icon, className = '' }) => <span className="fa-stack">
    <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" />
    <FontAwesomeIcon icon={icon} className={`fa-stack-1x fa-inverse ${className}`} />
</span>;

const footer = () => (
    <div className="Footer">
        <footer className="container-fluid px-5 bg-black text-light py-5">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="h-100 d-flex flex-column justify-content-between">
                    <div><Logo big /></div>

                    <div className="mt-5">
                        <div className="mb-4 d-flex align-items-center">
                            <div className="text-red mr-2">
                                <FontAwesomeIcon size="2x" icon={faLocationArrow} />
                            </div>

                            <div>824 Bel Meadow Drive, California, USA</div>
                        </div>

                        <div className="d-flex align-items-center">
                            <div className="text-red mr-2">
                                <FontAwesomeIcon size="2x" icon={faPhone} />
                            </div>

                            <div>+008 565 565 7788</div>
                        </div>
                    </div>
                </div>

                <div className="text-white">
                    <div>
                        <div className="h3 mb-4">Opening Hours</div>

                        <div className="text-secondary">
                            <div className="mb-2">Mon: 9.00AM To 7.00PM</div>
                            <div className="mb-2">Tue: 9.00AM To 7.00PM</div>
                            <div className="mb-2">Wed: 9.00AM To 7.00PM</div>
                            <div className="mb-2">Thu: 9.00AM To 7.00PM</div>
                            <div className="mb-2">Fri: 9.00AM To 7.00PM</div>
                            <div>Sat: 9.00AM To 7.00PM</div>
                        </div>
                    </div>
                </div>

                <div className="h-100 text-center" style={{ minWidth: 250 }}>
                    <div className="embed-responsive embed-responsive-21by9 position-relative">
                        <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0 }}>
                            <Location />
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <footer className="container-fluid px-5 bg-dark text-light py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-8 d-flex">
                        <div>&copy; {(new Date()).getFullYear()} All rights reserved.</div>
                    </div>

                    <div>
                        <div className="text-green">
                            <Stack icon={faFacebookF} />
                            <Stack icon={faInstagram} />
                            <Stack icon={faTelegramPlane} />
                            <Stack icon={faTwitter} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
);

export default footer;
