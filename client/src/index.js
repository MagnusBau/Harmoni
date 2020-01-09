// ENTRY-POINT HERE

// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import { CancelEvent } from './pages/tempCancelEvent'

const root = document.getElementById('root');
if (root) {

    ReactDOM.render(
            <HashRouter>
                <div>
                    <Route exact path="/" component={CancelEvent}/>
                </div>
            </HashRouter>,
            root
    );
}