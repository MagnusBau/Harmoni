// @flow

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';
import {Route, Switch} from "react-router";
import Home from "./pages/Home";
import { AddEquipment} from "./pages/addEquipment";
import { AddEvent} from "./pages/addEvent";
import {EditEvent} from "./pages/editEvent";

import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

const root = document.getElementById("root");
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/event/:eventId/equipment" component={AddEquipment} />
                    <Route path="/event/new" component={AddEvent}/>
                    <Route path="/event/edit/:event_id" component={EditEvent}/>
                </Switch>
                <Footer />
            </div>
        </HashRouter>,
        root
    );
