// @flow
import * as React from 'react';
import {Component} from "react-simplified";
import {Event, eventService} from "../services/eventService";
import { createHashHistory } from 'history';
import {userService} from "../services/userService";
import {Button} from '../components/Buttons/buttons';
import { ModalWidget } from "../components/widgets";
const history = createHashHistory();
import {Ticket, ticketService} from "../services/ticketService";
import {EventEquipment, equipmentService} from "../services/equipmentService";
import AddEquipment from "../components/Equipment/add_equipment";
import TicketView from "../components/Ticket/ticket_types";
import EventView from "../components/Event/event_view";
import {EventEdit} from "../components/Event/event_edit";
import {artistService} from "../services/artistService";
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
    artistEvents: Event[] = [];

    constructor(props){
        super(props);

        this.state = {
            setShowModal: false,
            isEditingEvent: false,
            artistId: -1
        }
    }

    show(e) {
        if (e.target.id === "showWarning") {
            this.setState({setShowModal: true});
        } else if (e.target.id === 'closeWarning') {
            this.setState({setShowModal: false});
        }
    }

    mounted() {
//TODO get events by user
        eventService.getEventByUser(userService.getUserId()).then(respons => {
            if(respons != null) {
                this.events = [];
                respons.map(e => {
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

        artistService.getArtistByUser(userService.getUserId()).then(artists => {
            if (artists) {
                this.setState({artistId: (artists[0].length > 0) ? artists[0][0].artist_id : -1});
                eventService.getEventsByArtist(this.state.artistId)
                    .then(events => this.artistEvents = events[0] ? events[0] : []);
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
                                    <li key="eventNEW" className="list-group-item list-group-item-action list-group-item-primary" onClick={(e) => {
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
                        {this.state.artistId && this.artistEvents.length > 0 ?
                            <div>
                                <h5>Dine kontrakter</h5>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="list-group">
                                            {this.artistEvents.map(e => (
                                                <li key={"event" + e.event_id} onClick={this.viewEvent} eventId={e.event_id} className="list-group-item list-group-item-action list-group-item-secondary">
                                                    {e.title} {e.end_time}
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : null}
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

                        <button id="showWarning" type="button" className="btn btn-outline-danger" onClick={this.show}>Slett arrangement</button>

                        <ModalWidget
                            show={this.state.setShowModal}
                            onHide={() => this.setState({setShowModal: false})}
                            title='Advarsel'
                            body="Er du sikker på at du vil slette de arkiverte arrangementene?"
                        >
                            <button id="closeWarning" type="button" className="btn btn-outline-light" onClick={() => this.setState({setShowModal: false})}>Lukk</button>
                            <button className="btn btn-outline-danger" type="button" onClick={this.deleteEndedEvents}>Slett</button>
                        </ModalWidget>

                    </div>
                </div>
            </div>
        )
    }
}
