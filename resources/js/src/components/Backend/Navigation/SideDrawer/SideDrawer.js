import React from 'react';
import { Col, Badge, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCog, faUserTag, faTools, faUser, faUserCog, faLanguage, faBell, faWrench, faBorderNone, faExclamationCircle, faWallet, faHandHoldingUsd, faMoneyBillWaveAlt, faMoneyCheckAlt, faMoneyCheck, faSearchDollar, faDollarSign, faFile, faCircleNotch, faLayerGroup, faChalkboardTeacher, faCalendar, faUserGraduate, faSchool, faClock, faFilm, faListOl, faCopy, faMarker, faBook } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import SideDrawerItem from './SideDrawerItem/SideDrawerItem';

import './SideDrawer.css';

export default ({ data, role = 'user', notifications = [], toggle, isOpen, selectItem, selectedItem, cms, dark = false }) => {
    let { first_name, last_name, name, photo, role: role_ } = data;

    if (!name) name = `${first_name} ${last_name}`;
    if (!photo) photo = "https://placehold.it/100x100";

    let addOns = null;
    let sideDrawerItems = null;
    const {
        pages: {
            backend: {
                sidebar: {
                    user, admin,
                    menu: {
                        dashboard, admins, users, roles, features, languages, cms: cms_, notifications: notifications_, settings,
                        cycles, levels, classrooms, years, students, subjects, sessions, trimesters, sequences, exam_types, exams, marks }
                }
            }
        }
    } = cms;

    const roles_ = {
        user,
        admin,
    };

    const sideDrawerItem = (fixed = false, id = null, dropdown = null, icon, path, custom = false, addon = []) => {
        if (id) return <SideDrawerItem id={id} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} href={path}>{id}</SideDrawerItem>;

        if (fixed) {
            let items = [];

            if (!custom) {
                items.push({ link: '/add', text: dropdown.add });
                items.push({ link: '/', text: dropdown.index });
                items = items.concat(addon);
            }
            else items = custom;

            return <SideDrawerItem id={dropdown.title} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} dropdown path={path} items={items}>{dropdown.title}</SideDrawerItem>;
        }

        const feature = role_.features.find(f => '/user/' + f.prefix === path);

        if (!feature) return null;
        let { permissions } = feature;
        let items = [];

        if (!custom) {
            if (permissions && permissions.includes('c')) items.push({ link: '/add', text: dropdown.add });
            items.push({ link: '/', text: dropdown.index });
            items = items.concat(addon);
        }
        else items = custom;

        return <SideDrawerItem id={dropdown.title} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} dropdown path={path} items={items}>{dropdown.title}</SideDrawerItem>;
    };

    switch (role) {
        case 'user':
            addOns = <div className="text-left">
                <div className="text-yellow small"><FontAwesomeIcon icon={faCircle} size="sm" fixedWidth className="mr-1" />{role_.name}</div>
            </div>;
            sideDrawerItems = <>
                {sideDrawerItem(true, dashboard, null, faTachometerAlt, "/user/dashboard")}
                {sideDrawerItem(false, null, users, faUser, "/user/users")}
                {sideDrawerItem(false, null, roles, faUserTag, "/user/roles")}
                {sideDrawerItem(false, null, features, faTools, "/user/features")}
                {sideDrawerItem(false, null, languages, faLanguage, "/user/languages")}

                {sideDrawerItem(false, null, cycles, faCircleNotch, "/user/cycles")}
                {sideDrawerItem(false, null, levels, faLayerGroup, "/user/levels")}
                {sideDrawerItem(false, null, classrooms, faChalkboardTeacher, "/user/classrooms")}
                {sideDrawerItem(false, null, years, faCalendar, "/user/years")}
                {sideDrawerItem(false, null, students, faUserGraduate, "/user/students")}
                {sideDrawerItem(false, null, subjects, faBook, "/user/subjects")}
                {sideDrawerItem(false, null, sessions, faSchool, "/user/sessions")}
                {sideDrawerItem(false, null, trimesters, faClock, "/user/trimesters")}
                {sideDrawerItem(false, null, sequences, faFilm, "/user/sequences")}
                {sideDrawerItem(false, null, exam_types, faListOl, "/user/exam-types")}
                {sideDrawerItem(false, null, exams, faCopy, "/user/exams")}
                {sideDrawerItem(false, null, marks, faMarker, "/user/marks")}

                {sideDrawerItem(false, null, cms_, faWrench, "/user/cms", [
                    { link: '/global', text: cms_.global },
                    { link: '/general', text: cms_.general },
                    { link: '/messages', text: cms_.messages },
                    { link: '/components', text: cms_.components },
                    { link: '/auth', text: cms_.auth },
                    { link: '/backend', text: cms_.backend },
                ])}
                <SideDrawerItem id={notifications_} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={faBell} href="/user/notifications">
                    {notifications_}{' '}
                    <Badge color="yellow" className="position-relative rounded-circle text-x-small text-700 d-inline-flex justify-content-center align-items-center" style={{ width: 18, height: 18, top: -7 }}><b className="text-white">{notifications.length}</b></Badge>
                </SideDrawerItem>
                {sideDrawerItem(true, null, settings, faCog, "/user/settings", [
                    { link: '/language', text: settings.language },
                ])}
            </>;
            break;

        case 'admin':
            sideDrawerItems = <>
                {sideDrawerItem(true, dashboard, null, faTachometerAlt, "/admin/dashboard")}
                {sideDrawerItem(true, null, admins, faUserCog, "/admin/admins")}
                {sideDrawerItem(true, null, users, faUser, "/admin/users")}
                {sideDrawerItem(true, null, roles, faUserTag, "/admin/roles")}
                {sideDrawerItem(true, null, features, faTools, "/admin/features")}
                {sideDrawerItem(true, null, languages, faLanguage, "/admin/languages")}

                {sideDrawerItem(true, null, cycles, faCircleNotch, "/admin/cycles")}
                {sideDrawerItem(true, null, levels, faLayerGroup, "/admin/levels")}
                {sideDrawerItem(true, null, classrooms, faChalkboardTeacher, "/admin/classrooms")}
                {sideDrawerItem(true, null, years, faCalendar, "/admin/years")}
                {sideDrawerItem(true, null, students, faUserGraduate, "/admin/students")}
                {sideDrawerItem(true, null, subjects, faBook, "/admin/subjects")}
                {sideDrawerItem(true, null, sessions, faSchool, "/admin/sessions")}
                {sideDrawerItem(true, null, trimesters, faClock, "/admin/trimesters")}
                {sideDrawerItem(true, null, sequences, faFilm, "/admin/sequences")}
                {sideDrawerItem(true, null, exam_types, faListOl, "/admin/exam-types")}
                {sideDrawerItem(true, null, exams, faCopy, "/admin/exams")}
                {sideDrawerItem(true, null, marks, faMarker, "/admin/marks")}

                {sideDrawerItem(true, null, cms_, faWrench, "/admin/cms", [
                    { link: '/global', text: cms_.global },
                    { link: '/general', text: cms_.general },
                    { link: '/messages', text: cms_.messages },
                    { link: '/components', text: cms_.components },
                    { link: '/auth', text: cms_.auth },
                    { link: '/backend', text: cms_.backend },
                ])}
                <SideDrawerItem id={notifications_} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={faBell} href="/admin/notifications">
                    {notifications_}{' '}
                    <Badge color="yellow" className="position-relative rounded-circle text-x-small text-700 d-inline-flex justify-content-center align-items-center" style={{ width: 18, height: 18, top: -7 }}><b className="text-white">{notifications.length}</b></Badge>
                </SideDrawerItem>
                {sideDrawerItem(true, null, settings, faCog, "/admin/settings", [
                    { link: '/language', text: settings.language },
                ])}
            </>;
            break;
    }



    return (
        <Collapse isOpen={isOpen} className={`SideDrawer nav-left-sidebar bg-${dark ? "grayblue text-white border-right border-darkblue" : "soft text-secondary"} shadow-sm position-fixed d-md-block`} style={{ width: 280 }}>
            <div className="menu-list mh-100 d-flex flex-column">
                <Col xs={12} className="pb-4">
                    <div className={`py-3 mb-4 d-flex align-items-center border-top border-bottom border-${dark ? "white" : "secondary"}-20`}>
                        <div className="px-2 position-relative d-flex justify-content-center">
                            <div className="border-3 border-yellow d-flex justify-content-center align-items-center border rounded-circle" style={{ width: 68, height: 68 }}>
                                <img src={photo} className="rounded-circle" style={{ width: 54, height: 54, objectFit: 'cover', objectPosition: 'center' }} alt="User profile" />
                            </div>

                            {/* <FontAwesomeIcon icon={faEdit} className="position-absolute text-yellow" size="2x" style={{ top: 0, right: 0 }} /> */}
                        </div>
                        <div className="p-0 h-100 flex-fill">
                            <div className="align-items-center m-0 h-100">
                                <Col xs={12} className="p-0 text-large">
                                    <strong>{name}</strong>
                                </Col>
                                <Col xs={12} className="p-0 text-300 small">{roles_[role]}</Col>
                                {addOns}
                            </div>
                        </div>
                    </div>
                </Col>
                <nav className="flex-fill">
                    <div>
                        <ul className="navbar-nav w-100 flex-column">
                            {sideDrawerItems}
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="backdrop w-100 bg-soft-50 position-fixed d-md-none" onClick={toggle} style={{ top: 70, zIndex: -1 }} />
        </Collapse>
    )
};