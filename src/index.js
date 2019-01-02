import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import dotenv from 'dotenv';
import { init } from '@sentry/browser';

// load values from the .env file in this directory into process.env
dotenv.load();
init({ //calling sentry.init even before the React App is rendered
 dsn: process.env.REACT_APP_SENTRY_DSN,
    maxBreadcrumbs: 50,
    debug: true,
    beforeSend (event) {
     if (event.exception)
         sentry.showReportDialog();
     return event;
    }
});

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Router>
                <Component />
            </Router>
        </AppContainer>,
        document.getElementById('root')
    );

render(App);

//Webpack Hot Module Replacement API
if (module.hot)
    module.hot.accept('./App', () => render(App));
