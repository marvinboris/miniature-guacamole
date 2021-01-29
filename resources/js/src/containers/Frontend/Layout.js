import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {
    render() {
        const {
            children
        } = this.props;

        return <div className="min-vh-100 d-flex flex-column">
            <Toolbar />

            <main className="flex-fill bg-white">
                {children}
            </main>

            <Footer />
        </div>;
    }
}

export default withRouter(Layout);