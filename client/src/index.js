//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { AddEquipment} from "./pages/addEquipment";

const root = document.getElementById('app');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Route path="/event/:eventId/equipment" component={AddEquipment} />
            </div>
        </HashRouter>,
        root
    );
