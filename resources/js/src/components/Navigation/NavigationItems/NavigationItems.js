import React from 'react';
import { Container, Navbar, Collapse, Nav } from 'reactstrap';
import { faEnvelope, faListAlt, faUser } from '@fortawesome/free-regular-svg-icons';
import { faHome, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import Location from '../../UI/Location/Location';
import View from '../../Backend/UI/View/View';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({ light = false, font }) => {
    return (
        <Navbar className="py-4" dark={!light} light={light} expand>
            <Container>
                <Collapse navbar>
                    <Nav className="d-block d-lg-flex align-items-center" navbar>
                        <NavigationItem font={font} icon={faHome} href="/">Home</NavigationItem>
                        <NavigationItem font={font} icon={faUser} href="/about-us">About Us</NavigationItem>
                        <NavigationItem font={font} icon={faListAlt} href="/menu">Menu</NavigationItem>
                        <NavigationItem font={font} icon={faLocationArrow} button>
                            <View title="Location of the week" content={<Location />}>Location</View>
                        </NavigationItem>
                        <NavigationItem font={font} icon={faEnvelope} href="/contact">Contact</NavigationItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
}

export default navigationItems;