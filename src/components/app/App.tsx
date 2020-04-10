import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Routes } from '../../common/routes/Routes';
import DeviceSettingsProvider from '../device_settings/SettingsContext'
import Home from '../home/Home';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

import './App.scss';

const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <DeviceSettingsProvider>
                    <Header className="App__header" />
                    <Sidebar className="App__sidebar" />
                    <div className="App__content">
                        <Switch>
                            <Route className="App" exact path={Routes.HOME} component={Home} />
                        </Switch>
                    </div>
                </DeviceSettingsProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
