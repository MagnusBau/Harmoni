// @flow
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';
import {Route, Switch} from "react-router";
import Home from "./pages/Home";

import EventOverview from "./pages/Event.js";
import {AddEquipment} from "./pages/addEquipment";
import {UserLogin, UserRegister, TokenBoi} from "./pages/user";
import { AddEvent} from "./pages/addEvent";
import {EditEvent} from "./pages/editEvent";
import {addTicketType, editTicketType, listTicketType} from "./components/ticket_add";
import {RiderList, RiderEdit, addRiderType, RiderComp} from "./pages/riderOLD";
import UserOverview from "./pages/userOverview";

import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import {AddEventArtist} from "./pages/addEventArtist";
import {CancelEvent} from "./pages/tempCancelEvent";

const root = document.getElementById("root");
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/event/:eventId/overview" component={EventOverview}/>
                    <Route path="/event/:eventId/edit/equipment" component={AddEquipment} />
                    <Route path="/event/new" component={AddEvent}/>
                    <Route exact path="/event/edit/:event_id" component={EditEvent}/>
                    <Route exact path="/event/:eventId/edit/ticket" component={listTicketType}/>
                    <Route exact path="/event/:eventId/edit/artist" component={AddEventArtist}/>
                    <Route exact path="/event/ticket" component={addTicketType}/>
                    <Route exact path="/event/:eventId/edit/ticket/:ticketId/edit" component={editTicketType}/>
                    <Route exact path="/event/:eventId/edit/cancel" component={CancelEvent}/>
                    <Route path="/user/:userId/overview" component={UserOverview}/>
                    <Route exact path="/login" component={UserLogin} />
                    <Route exact path="/register" component={UserRegister} />
                </Switch>
                <Footer/>
            </div>
        </HashRouter>,
        root
    );

            