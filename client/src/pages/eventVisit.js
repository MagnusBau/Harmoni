// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {createHashHistory} from "history";
import {Event, eventService} from "../services/eventService";
import {Artist, artistService} from "../services/artistService";
import {userService} from "../services/userService";
import {Ticket, ticketService} from "../services/ticketService";


export class eventVisit extends Component <{match: {params: {eventId: number}}}> {
    errorMessage:string="";
    currentEvent: number = 0;
    event: Event = null;
    artists: Artist[] = [];
    tickets: Ticket[] = [];

    mounted() {
        this.currentEvent = this.props.match.params.eventId;
        eventService
            .getEventById(this.currentEvent)
            .then(event =>{
                this.event = event;
                if(event.body.error) this.errorMessage = event.body.error;
            })
            .catch((error: Error) => console.log(error.message));
        artistService
            .getArtistByEvent(this.currentEvent)
            .then(artists =>{
                this.artists = artists[0];
                if(artists.body.error) this.errorMessage = artists.body.error;
            })
            .catch((error: Error) => console.log(error.message));
        ticketService
            .getAllTicket(this.currentEvent)
            .then(tickets =>{
                this.tickets = tickets[0];
                if(tickets.body.error) this.errorMessage = tickets.body.error;
            })
            .catch((error: Error) => console.log(error.message));
    }
    render() {
        if (!this.event) return null;
        return (
            <div>
                <h3>{this.event[0].title}</h3>
                <table className="table w-50">
                    <thead><tr><th>Beskrivelse</th></tr></thead>
                    <tbody>
                    <tr className="d-flex">
                        <td className="col-5">{this.event[0].description}</td>
                    </tr>
                    </tbody>
                </table>
                <table className="table w-50">
                    <thead><tr><th>Artister</th></tr></thead>
                    <tbody>
                        {this.artists.map((artist =>
                            <tr className="d-flex">
                                <td className="col-5">{artist.artist_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="table w-50">
                    <thead><tr><th>Tid og sted</th></tr></thead>
                    <tbody>
                        <tr className="d-flex">
                            <td className="col-5">{this.event[0].location}</td>
                            <td className="col-5">{this.event[0].start_time} - {this.event[0].end_time}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table w-50">
                    <thead><tr><th>Billetter</th></tr></thead>
                    <tbody>
                        <tr className="d-flex">
                            <td className="col-4">Type</td>
                            <td className="col-4">Antall</td>
                            <td className="col-4">Pris</td>
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
                <table className="table w-50">
                    <thead><tr><th>Arrangør</th></tr></thead>
                    <tr className="d-flex">
                        <td>{this.event[0].organizer}</td>
                    </tr>
                </table>
            </div>
        )
    }
}