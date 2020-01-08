// @flow'
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import {AddRole} from './pages/roleStuff';

const root = document.getElementById('app');
if(root){
    ReactDOM.render(
        <HashRouter>
            <div>
                <Route exact path='/' component={AddRole} />
            </div>
        </HashRouter>,
        root
    )
}