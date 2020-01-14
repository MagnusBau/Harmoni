// @flow

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';
import {Route, Switch} from "react-router";
import Home from "./pages/Home";
import {AddEquipment} from "./pages/addEquipment";
import {UserLogin, UserRegister, TokenBoi} from "./pages/user";
import { AddEvent} from "./pages/addEvent";
import {addTicketType, editTicketType, listTicketType} from "./components/ticket_add";
import {RiderList, RiderEdit} from "./pages/rider";

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
                    <Route path="/event/edit/:eventId/equipment" component={AddEquipment} />
                    <Route path="/event/new" component={AddEvent}/>
                    <Route exact path="/event/edit/:eventId/ticket" component={listTicketType}/>
                    <Route exact path="/event/edit/:eventId/ticket" component={addTicketType}/>
                    <Route exact path="/event/edit/:eventId/ticket/:ticketId/edit" component={editTicketType}/>
                    <Route exact path="/login" component={UserLogin} />
                    <Route exact path="/register" component={UserRegister} />
                    <Route exact path="/tokenboi" component={TokenBoi} />
                    <Route exact path="/event/edit/:eventId/document/:documentId/riders" component={RiderList} />
                    <Route exact path="/event/edit/:eventId/document/:documentId/riders/edit/:riderId" component={RiderEdit} />
                </Switch>
                <Footer />
            </div>
        </HashRouter>,
        root
    );
