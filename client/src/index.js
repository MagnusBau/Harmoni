// @flow
import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from 'react-router-dom';
import {Redirect, Route, Switch} from "react-router";
import Home from "./pages/Home";
import EventOverview from "./pages/Event.js";
import {AddEquipment} from "./pages/addEquipment";
import {UserRegister, TokenBoi} from "./pages/user";
import {AddEvent} from "./pages/addEvent";
import {EditEvent} from "./pages/editEvent";
import {TicketAdd, TicketEdit, listTicketType} from "./components/ticket_add";
//import {RiderList, RiderEdit, addRiderType, RiderComp} from "./pages/rider";
import UserOverview from "./pages/userOverview";
import UserEdit from "./pages/userEdit";
import {eventVisit} from "./pages/eventVisit";
import { CancelEventButton } from './components/Buttons/CancelEventButton';
import { DeleteEventButton } from './components/Buttons/DeleteEventButton';
import { FileMain, FileEdit} from './pages/file'
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import {AddEventArtist} from "./pages/addEventArtist";
import {NotFoundPage} from "./pages/notFoundPage";
import {EventSearch} from "./pages/eventSearch";

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
                    <Route exact path="/event/:eventId/edit/cancel" component={CancelEventButton}/>
                    <Route exact path="/event/:eventId/edit/delete" component={DeleteEventButton}/>
                    <Route exact path="/event/:eventId/edit/file" component={FileMain} />
                    <Route exact path="/event/:eventId/edit/file/:filepath" component={FileEdit} />
                    <Route exact path="/register" component={UserRegister} />
                    <Route exact path="/" component={TokenBoi} />
                    <Route exact path="/user/:userId/overview" component={UserOverview} />
                    <Route exact path="/user/:userId/edit" component={UserEdit}/>
                    <Route exact path="/event/:eventId/edit/ticket/:ticketId/edit" component={TicketEdit}/>
                    <Route exact path="/event/ticket" component={TicketAdd}/>
                    <Route exact path="/event/search/:input" component={EventSearch}/>
                    <Route exact path="/404" component={NotFoundPage}/>
                    <Redirect to="/404"/>
                    <Route exact path="/event/:eventId/view" component={eventVisit}/>
                </Switch>
                <Footer/>
            </div>
        </HashRouter>,
        root
    );

            