import React from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitterSquare, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import './TeamMemberCard.css';

export default ({ name, title, animation = "fade-up", src }) => (
    <Col data-aos={animation} xl={3} lg={4} md={6} className="TeamMemberCard">
        <Card className="border-0 rounded-0 bg-transparent overflow-hidden position-relative">
            <div className="position-absolute w-100 h-100" style={{ background: `url('${src}') no-repeat center`, backgroundSize: 'cover' }} />
            <div className="card-img-top embed-responsive embed-responsive-1by1 bg-black" style={{ opacity: .3 }} />
            <CardBody className="bg-green-80 text-white position-relative">
                <div className="bg-yellow rounded-right position-absolute" style={{ width: 10, height: 40, top: '50%', left: 0, transform: 'translateY(-50%)' }} />
                <div className="ml-5 ml-xl-4">
                    <div className="font-weight-normal text-montserrat-alt h4 position-relative d-flex align-items-center">
                        <span className="pr-2">{name}</span>

                        <div className="position-absolute border-bottom border-white-20" style={{ top: 13, left: -66, width: 61 }}>
                            <FontAwesomeIcon icon="circle" className="text-xx-small position-absolute" style={{ right: 0, top: 0, transform: 'translateY(-50%)' }} />
                        </div>

                        <div className="position-relative border-bottom border-white-20 flex-fill" style={{ marginRight: -20 }}>
                            <FontAwesomeIcon icon="play" className="text-xx-small text-yellow position-absolute" style={{ left: 0, top: 0, transform: 'translateY(-50%)' }} />
                        </div>
                    </div>
                    <div className="card-text text-white text-montserrat-alt pb-1 mb-3">
                        {title}
                    </div>
                    <div>
                        <FontAwesomeIcon size="lg" className="mr-2" icon={faFacebookSquare} />
                        <FontAwesomeIcon size="lg" className="mr-2" icon={faTwitterSquare} />
                        <FontAwesomeIcon size="lg" className="mr-2" icon={faInstagram} />
                        <FontAwesomeIcon size="lg" className="mr-2" icon={faWhatsapp} />
                    </div>
                </div>
            </CardBody>
        </Card>
    </Col>
);