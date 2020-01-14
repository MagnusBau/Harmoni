// @flow'
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import {AddRole} from './pages/addRole';

const root = document.getElementById('app');
if(root){
    ReactDOM.render(
        <HashRouter>
            <div>
                <Route exact path='/role/:eventId' component={AddRole} />
            </div>
        </HashRouter>,
        root
    )
}