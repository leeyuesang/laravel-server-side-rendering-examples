import App from './app';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import {Provider} from "react-redux";
import {ConnectedRouter} from "react-router-redux";
import store, {history} from "../redux/configureStore";
import I18n from "redux-i18n";
import {translations} from "translation";
import {CookiesProvider} from 'react-cookie';

// Grab the state from a global variable injected into the server-generated HTML
const { packages } = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

render(
    <BrowserRouter>
        <App packages={packages} />
    </BrowserRouter>,
    document.getElementById('app')
);
render(<CookiesProvider >
    <Provider store={store} >
        <I18n translations={translations} initialLang="ko" fallbackLang="en" >
            <ConnectedRouter history={history} >

                <App/>
            </ConnectedRouter>
        </I18n>
    </Provider>
</CookiesProvider>);
