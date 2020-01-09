//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { AddEquipment} from "./pages/addEquipment";
import { UserLogin} from "./pages/user";

const root = document.getElementById('app');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Route exact path="/login" component={UserLogin} />
            </div>
        </HashRouter>,
        root
    );
