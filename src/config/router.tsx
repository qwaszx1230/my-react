import * as React from 'react';
import { HashRouter, Route, Router, BrowserRouter, Switch } from 'react-router-dom';
import { PathConfig } from './pathconfig';
import { TestPage } from '../component/test';
import { AboutPage } from '../component/about';


export let router = (
    <HashRouter>
        <Switch>
            <Route exact path={PathConfig.Home} component={TestPage}></Route>
            <Route exact path={PathConfig.About} component={AboutPage}></Route>
        </Switch>
    </HashRouter>
)