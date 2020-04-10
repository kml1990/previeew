import React from 'react';
import ReactDOM from 'react-dom';
import 'reflect-metadata';
import { DependencyProvider } from './common/di/DependencyContext';
import dependenciesContainer from './common/di/DependencyContainer';
import App from './components/app/App';
import BackdropProvider from './components/common/Backdrop/BackdropContext';
import * as serviceWorker from './serviceWorker';

import './index.scss';

ReactDOM.render(
    <DependencyProvider container={dependenciesContainer}>
        <BackdropProvider>
            <App />
        </BackdropProvider>
    </DependencyProvider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
