import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

import * as serviceWorker from './serviceWorker';

import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';

import 'leaflet/dist/leaflet.css';

export const rootPath = '/api';

console.log('env', process.env.MIX_DEFAULT_LANG)

const app = (
    <Provider store={store}>
        <BrowserRouter basename={process.env.MIX_ASSET_URL ? "/bbq" : "/"}>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(hot(app), document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
