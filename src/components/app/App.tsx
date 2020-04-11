import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Routes } from '../../common/routes/Routes';
import SettingsProvider from '../common/context/SettingsContext'
import Home from '../home/Home';
import Header from '../common/header/Header';
import Sidebar from '../common/sidebar/Sidebar';

import './App.scss';

const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <SettingsProvider>
                    <Header className="App__header" />
                    <Sidebar className="App__sidebar" />
                    <div className="App__content">
                        <Switch>
                            <Route className="App" exact path={Routes.HOME} component={Home} />
                        </Switch>
                    </div>
                </SettingsProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
