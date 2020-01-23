// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from "history";
import {Event, eventService} from "../services/eventService";
import {Artist, artistService} from "../services/artistService";
import {userService} from "../services/userService";
import {Ticket, ticketService} from "../services/ticketService";
import {EventViewHeader, PageHeader} from "../components/Header/headers";


export class eventVisit extends Component <{match: {params: {eventId: number}}}> {
    errorMessage:string="";
    currentEvent: number = 0;
    event: Event = null;
    organizer: string="";
    artists: Artist[] = [];
    tickets: Ticket[] = [];

    mounted() {
        this.currentEvent = this.props.match.params.eventId;
        eventService
            .getEventById(this.currentEvent)
            .then(event =>{
                this.event = event;
                /*if(event.body.error)
                    this.errorMessage = event.body.error;
                    */
                userService
                    .getOrganizerUsername(event[0].organizer)
                    .then(organizer => {
                        console.log("Username: " + organizer[0][0].username);
                        this.organizer = organizer[0][0].username})
            })
            .catch((error: Error) => error.message);
        artistService
            .getArtistByEvent(this.currentEvent)
            .then(artists =>{
                this.artists = artists[0];
                if(artists.body.error) this.errorMessage = artists.body.error;
            })
            .catch((error: Error) => error.message);
        ticketService
            .getAllTicket(this.currentEvent)
            .then(tickets =>{
                this.tickets = tickets[0];
                if(tickets.body.error) this.errorMessage = tickets.body.error;
            })
            .catch((error: Error) => error.message);
    }
    render() {
        if (!this.event) return null;
        return (
            <div className="container mt-4" id="eventView">
                <div className="row">
                    <div className="col-lg-12" id="eventCol">
                        <img id="eventImg" src="./img/several-people-at-a-party-1540338.jpg" alt=""/>
                    </div>
                </div>
                <div className="row"><h1 id="eventTitle">{this.event[0].title}</h1></div>
                <div className="row">
                    <div className="col-lg-6" id="eventContent">
                        <div>
                            <EventViewHeader label="Beskrivelse"/>
                            <p>{this.event[0].description}</p>
                        </div>
                        <div>
                            <EventViewHeader label="Arrangør"/>
                            <p>{this.organizer}</p>
                        </div>
                        <div>
                            <EventViewHeader label="Tid"/>
                            <div>
                                <p><b>Start:</b> {this.event[0].start_time}</p>
                                <p><b>Slutt:</b> {this.event[0].end_time}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6" id="eventContent">
                        <div>
                            <EventViewHeader label="Artister"/>
                            <p>{this.artists.map((artist =>
                                {artist.artist_name}
                            ))}
                            </p>
                        </div>

                        <div>
                            <EventViewHeader label="Billetter"/>
                            <table className="table table-borderless">
                                <tbody>
                                <tr className="d-flex">
                                    <th className="col-4">Type</th>
                                    <th className="col-4">Antall</th>
                                    <th className="col-4">Pris</th>
                                </tr>
                                {this.tickets.map((ticket =>
                                        <tr className="d-flex">
                                            <td className="col-4">{ticket.title}</td>
                                            <td className="col-4">{ticket.count}stk</td>
                                            <td className="col-4">{ticket.price}kr</td>
                                        </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}