import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Routes } from '../../common/routes/Routes';
import Home from '../home/Home';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

import './App.scss';

export type OnMenuToggleCallback = () => void;

const App: React.FC = () => {
    const [menuExpanded, setMenuExpanded] = useState<boolean>(false);

    const onMenuToggle = () => {
        setMenuExpanded(!menuExpanded);
    }

    const appClass = menuExpanded ? 'App--menuExpanded' : 'App--menuHidden';
    return (
        <div className={`App ${appClass}`}>
            <BrowserRouter>
                <Sidebar className="App__sidebar" onMenuToggle={onMenuToggle} />
                <div className="App__content">
                    <Header className="App__header" />
                    <Switch>
                        <Route exact path={Routes.HOME} component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
