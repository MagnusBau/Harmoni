// @flow
import * as React from 'react';
import {Component} from "react-simplified";
import {Event, eventService} from "../services/eventService";
import { createHashHistory } from 'history';
import {userService} from "../services/userService";
import {Button, ModalWidget} from '../components/widgets';

const history = createHashHistory();
/**
 * Class for the view of one event
 *
 * @author Victoria Blichfeldt
 */
//TODO fikse bug med at arrangement overview ikke alltid oppdateres etter at redigering er utført
//TODO flette utstyr og dokumenter når det er ferdig
export default class UserOverview extends Component {
    currentUser: number = 0;
    events: Event[] = [];
    endedEvents: Event[] = [];

    state = {
        showModal: false,
        setShowModal: false
    };

    show = () => {
        this.setState({ setShowModal: true });
    };

    close = () => {
        this.setState({ setShowModal: false });
    };

    constructor(props){
        super(props);
        this.state = {isEditingEvent: false}
    }

    mounted() {
//TODO get events by user
        eventService.getEventByUser(userService.getUserID()).then(respons => {
            console.log(respons);
            if(respons) {
                this.events = [];
                respons.map(e => {
                    console.log(e);
                    this.events.push(e);
                });
            }
            console.log("shait");
        });

        eventService.getEndedEventsByUser(userService.getUserID()).then(response => {
            if(response) {
                this.endedEvents = [];
                response.map(events => {
                    this.endedEvents.push(events);
                })
            }
        });

    }

    deleteEndedEvents() {

        eventService
            .deleteEndedEvents(userService.getUserID())
            .then(window.location.reload())
            .then(console.log("Arrangement slettet!"))
            .catch((error: Error) => console.log(error.message));
    }

    viewEvent = (event) => {
        history.push("/event/" + event.target.getAttribute('eventId') + "/overview");
    };


    render(){


        return (
            //TODO en eller annen header for hvilken user som er logget inn
            <div className="container">
                <div className="card">
                    <img className="card-img-top img-fluid" src="" alt=""/>
                    <a href="#/event/new">
                        <div className="card-body">
                            <h5>
                                Legg til nytt arrangement
                                <img src="./img/icons/plus.svg" alt="login" width="30" height="30"/>
                            </h5>
                        </div>
                    </a>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="list-group" className="">
                            {this.events.map(e => (
                                //TODO hente inn en <a> og sender valgt event til eventoverview
                                <li key={"event" + e.event_id} onClick={this.viewEvent} eventId={e.event_id} className="list-group-item list-group-item-action">
                                    {e.title} {e.start_time}
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
                <h5>Dine arkiverte arrangementer</h5>
                <div className="row">
                    <div className="col-md-6">
                        <div className="list-group" className="">
                            {this.endedEvents.map(e => (
                                //TODO hente inn en <a> og sender valgt event til eventoverview
                                <li key={"event" + e.event_id} onClick={this.viewEvent} eventId={e.event_id} className="list-group-item list-group-item-action">
                                    {e.title} {e.end_time}
                                </li>
                            ))}
                        </div>

                        <Button.Red onClick={this.show}>Slett arkiverte arrangementer</Button.Red>

                        <ModalWidget
                            show={this.state.setShowModal}
                            onHide={this.close}
                            title="Advarsel"
                            body="Er du sikker på at du vil slette arkiverte arrangementer?"
                        >
                            <Button.Light onClick={this.close}>Lukk</Button.Light>
                            <Button.Red onClick={this.deleteEndedEvents}>Slett</Button.Red>
                        </ModalWidget>

                    </div>
                </div>
            </div>
        )
    }
}
