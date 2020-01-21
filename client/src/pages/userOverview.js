// @flow
import * as React from 'react';
import {Component} from "react-simplified";
import {Event, eventService} from "../services/eventService";
import { createHashHistory } from 'history';
import {userService} from "../services/userService";
import {Button, ModalWidget} from '../components/widgets';

const history = createHashHistory();
import {Ticket, ticketService} from "../services/ticketService";
import {EventEquipment, equipmentService} from "../services/equipmentService";
import AddEquipment from "../components/Equipment/add_equipment";
import TicketView from "../components/Ticket/ticket_types";
import EventView from "../components/Event/event_view";
import {EventEdit} from "../components/Event/event_edit";
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
        eventService.getEventByUser(userService.getUserId()).then(respons => {
            console.log(respons);
            if(respons != null) {
                this.events = [];
                respons.map(e => {
                    console.log(e);
                    this.events.push(e);
                });
            } else {
                console.log("shait");
            }
        });

        eventService.getEndedEventsByUser(userService.getUserId()).then(response => {
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
            .deleteEndedEvents(userService.getUserId())
            .then(window.location.reload())
            .then(console.log("Arrangement slettet!"))
            .catch((error: Error) => console.log(error.message));
    }

    viewEvent = (event) => {
        history.push("/event/" + event.target.getAttribute('eventId') + "/overview");
    };


    render(){
        let artistBox = (<div></div>);
        if(userService.getArtistName() != null && userService.getArtistName() !== "null") {
            artistBox = (

                <div className="row">
                    <div className="col-md-12">
                        <h5>Artist</h5>
                        <div className="list-group" className="">
                            <li className="list-group-item">
                                <h5>Artist Navn:</h5>
                                {userService.getArtistName()}
                            </li>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            //TODO en eller annen header for hvilken user som er logget inn
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h5>Profil</h5>
                                <div className="list-group" className="">
                                    <li className="list-group-item">
                                        <h5>Username:</h5>{userService.getUsername()}
                                    </li>
                                    <li className="list-group-item">
                                        <h5>Name:</h5> {userService.getFirstName() + " " + userService.getLastName()}
                                    </li>
                                    <li className="list-group-item">
                                        <h5>Email:</h5> {userService.getEmail()}
                                    </li>
                                    <li className="list-group-item">
                                        <h5>Phone:</h5> {userService.getPhone()}
                                    </li>
                                    <li className="list-group-item list-group-item-action list-group-item-primary" onClick={(e) => {
                                        history.push("/user/" + userService.getUserId() + "/edit");
                                    }}>
                                        Endre Profil
                                    </li>
                                </div>
                            </div>
                        </div>
                        {artistBox}
                    </div>
                    <div className="col-md-6">
                        <h5>Dine aktive arrangementer</h5>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="list-group" className="">
                                    <li className="list-group-item list-group-item-action list-group-item-primary" onClick={(e) => {
                                        history.push("/event/new");
                                    }}>
                                        Legg til nytt arrangement
                                    </li>
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
                            <div className="col-md-12">
                                <div className="list-group" className="">
                                    {this.endedEvents.map(e => (
                                        //TODO hente inn en <a> og sender valgt event til eventoverview
                                        <li key={"event" + e.event_id} onClick={this.viewEvent} eventId={e.event_id} className="list-group-item list-group-item-action list-group-item-secondary">
                                            {e.title} {e.end_time}
                                        </li>
                                    ))}
                                </div>
                            </div>
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
