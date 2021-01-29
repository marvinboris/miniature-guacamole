import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

class Layout extends Component {
    render() {
        const {
            children,
            content: {
                cms: {
                    global: { app_name, company_name, logo },
                    pages: { auth: { footer: { copyright, all_rights } } }
                }
            },
            dark = false
        } = this.props;
        let footerContent;

        footerContent = <>
            <span className={"text-700 text-" + (dark ? "yellow" : "dark")}>&copy;</span> {copyright} {new Date().getFullYear()} <span className={"text-700 text-" + (dark ? "yellow" : "dark")}>{app_name}</span>. {all_rights} <span className={"text-700 text-" + (dark ? "blue" : "dark")}>{company_name}</span>.
        </>;

        return <div className="vh-100 d-flex flex-column">
            <div className={"flex-fill overflow-hidden bg-" + (dark ? "darkblue" : "soft")}>
                <div className="h-100">
                    <Container fluid className="h-100">
                        <Row className="justify-content-center h-100">
                            <Col xl={10} className="d-flex flex-column justify-content-center h-100">
                                <Row className="justify-content-center">
                                    <Col xl={3}>
                                        <img src={logo} alt="Logo" className="img-fluid mx-auto w-60 mb-5 d-none d-sm-block" style={{ opacity: .5 }} />

                                        <div className="mt-3">{children}</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <div className={`border-top ${dark ? "text-light border-yellow-50" : "bg-black-10 text-black border-dark-50"} pt-3 pb-3 d-flex justify-content-center`}>
                <div>
                    <div>
                        {footerContent}
                    </div>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps)(Layout));