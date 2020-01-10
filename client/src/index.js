// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import {addTicketType, editTicketType, listTicketType} from "./components/ticket_add"
const root = document.getElementById('root');
if (root) {
    if (root)
        ReactDOM.render(
            <HashRouter>
                <div>
                    <Route exact path="/" component={listTicketType}/>
                    <Route exact path="/" component={addTicketType}/>
                    <Route exact path="/:id" component={editTicketType}/>




                </div>
            </HashRouter>,
            root
        );
}

