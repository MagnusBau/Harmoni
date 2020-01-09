//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { AddEvent} from "./pages/addEvent";

const root = document.getElementById('app');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Route exact path="/" component={AddEvent}/>
            </div>
        </HashRouter>,
        root
    );
