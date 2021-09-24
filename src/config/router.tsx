import * as React from 'react';
import { HashRouter, Route, Router, BrowserRouter, Switch } from 'react-router-dom';
import { PathConfig } from './pathconfig';
import { TestPage } from '../component/test';
import { AboutPage } from '../component/about';
import { DragTestPage } from '../component/drag';
import { PixiTestPage } from '../component/pixi';


export let router = (
    <HashRouter>
        <Switch>
            <Route exact path={PathConfig.Home} component={TestPage}></Route>
            <Route exact path={PathConfig.About} component={AboutPage}></Route>
            <Route exact path={PathConfig.Drag} component={DragTestPage}></Route>
            <Route exact path={PathConfig.Pixi} component={PixiTestPage}></Route>
        </Switch>
    </HashRouter>
)