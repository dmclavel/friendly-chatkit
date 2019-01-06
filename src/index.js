import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import dotenv from 'dotenv';
import { init, showReportDialog } from '@sentry/browser';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './store/reducers/rootReducer';

// load values from the .env file in this directory into process.env
dotenv.load();
if (process.env.NODE_ENV === 'production') {
    init({ //calling sentry.init even before the React App is rendered
        dsn: process.env.REACT_APP_SENTRY_DSN,
        maxBreadcrumbs: 50,
        debug: true,
        beforeSend (event) {
            if (event.exception)
                showReportDialog();
            return event;
        }
    });
}

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const render = Component =>
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <Router>
                    <Component />
                </Router>
            </AppContainer>
        </Provider>,
        document.getElementById('root')
    );

render(App);

//Webpack Hot Module Replacement API
if (module.hot)
    module.hot.accept('./App', () => render(App));
